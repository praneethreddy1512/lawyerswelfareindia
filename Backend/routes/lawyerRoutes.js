const express = require('express');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { uploadBuffer } = require('../utils/cloudinaryUpload');
const Lawyer = require('../models/Lawyer');
const generateToken = require('../utils/generateToken');
const { sendWelcomeEmail } = require('../utils/emailService');

const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Memory storage for Cloudinary uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });


// POST /api/lawyers/register
router.post('/register', upload.fields([
  { name: 'passportPhoto', maxCount: 1 },
  { name: 'certificates', maxCount: 1 }
]), async (req, res) => {
  try {
    const {
      name,
      age,
      sex,
      specialization,
      phone,
      alternateMobile,
      email,
      password,
      houseAddress,
      officeAddress,
      nominee,
      familyMember1,
      familyMember2,
      acceptTerms,
      subscribeUpdates
    } = req.body;

    const passportFile = req.files?.passportPhoto?.[0];
    const certFile = req.files?.certificates?.[0];

    if (!name || !phone || !email || !password) {
      return res.status(400).json({ message: 'name, phone, email, password are required' });
    }

    const existing = await Lawyer.findOne({ $or: [{ email }, { phone }] });
    if (existing) {
      return res.status(409).json({ message: 'Lawyer with this email or phone already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Parse nominee
    let nomineeObj = nominee ? (typeof nominee === 'string' ? JSON.parse(nominee) : nominee) : undefined;

    if (!nomineeObj || !nomineeObj.bankAccountNumber || !nomineeObj.confirmBankAccountNumber || !nomineeObj.ifscCode || !nomineeObj.bankHolderName) {
      return res.status(400).json({ message: 'Nominee bank details are required.' });
    }

    if (nomineeObj.bankAccountNumber !== nomineeObj.confirmBankAccountNumber) {
      return res.status(400).json({ message: 'Nominee account numbers do not match.' });
    }

    delete nomineeObj.confirmBankAccountNumber;

    const lawyerData = {
      name,
      age,
      sex,
      specialization,
      phone,
      alternateMobile,
      email,
      passwordHash,
      passportPhoto: null,
      certificates: null,
      houseAddress,
      officeAddress,
      nominee: nomineeObj,
      familyMember1: familyMember1 ? JSON.parse(familyMember1) : undefined,
      familyMember2: familyMember2 ? JSON.parse(familyMember2) : undefined,
      acceptTerms: !!acceptTerms,
      subscribeUpdates: !!subscribeUpdates
    };

    // Upload passport
    if (passportFile) {
      try {
        const uploadRes = await uploadBuffer(passportFile.buffer, {
          folder: 'lawyers/passports',
          transformation: [{ width: 500, height: 500, crop: 'fill' }],
          resource_type: 'image'
        });

        lawyerData.passportPhoto = uploadRes.secure_url;
        lawyerData.passportPhotoPublicId = uploadRes.public_id;
      } catch (e) {
        console.error('Passport upload error:', e);
        return res.status(500).json({ message: 'Failed to upload passport photo' });
      }
    }

    // Upload certificates
    if (certFile) {
      try {
        const uploadRes = await uploadBuffer(certFile.buffer, {
          folder: 'lawyers/certificates',
          resource_type: 'auto',
          allowed_formats: ['pdf', 'png', 'jpg', 'jpeg']
        });

        lawyerData.certificates = uploadRes.secure_url;
        lawyerData.certificatesPublicId = uploadRes.public_id;
      } catch (e) {
        console.error('Certificate upload error:', e);
        return res.status(500).json({ message: 'Failed to upload certificate' });
      }
    }

    const lawyer = await Lawyer.create(lawyerData);

    const token = generateToken({ id: lawyer._id, role: 'lawyer' });

    // Send welcome emails
    try {
      const lawyerObj = lawyer.toObject();
      await sendWelcomeEmail(lawyerObj);
    } catch (e) {
      console.error('Email sending failed:', e);
    }

    return res.status(201).json({
      success: true,
      data: {
        _id: lawyer._id,
        name: lawyer.name,
        phone: lawyer.phone,
        email: lawyer.email,
        token
      }
    });

  } catch (error) {
    console.error('Error in lawyer/register:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});


// LOGIN — /api/lawyers/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const lawyer = await Lawyer.findOne({ email });
    if (!lawyer) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, lawyer.passwordHash);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken({ id: lawyer._id, role: 'lawyer' });

    return res.json({
      _id: lawyer._id,
      name: lawyer.name,
      email: lawyer.email,
      token
    });

  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
});


// GET All Lawyers
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const lawyers = await Lawyer.find(filter).sort({ createdAt: -1 });
    return res.json(lawyers);

  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});


// APPROVE Lawyer (Admin)
router.patch('/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const { caseType, message } = req.body;

    if (!caseType) {
      return res.status(400).json({ message: 'Case type is required' });
    }

    const lawyer = await Lawyer.findById(id);
    if (!lawyer) return res.status(404).json({ message: 'Lawyer not found' });

    lawyer.status = 'approved';
    lawyer.approvedCase = caseType;
    lawyer.approvedMessage = message || '';
    lawyer.approvedDate = new Date();

    await lawyer.save();

    return res.json({ message: 'Lawyer Approved', lawyer });

  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
});


// Mark Lawyer Deceased
router.post('/:id/deceased', async (req, res) => {
  try {
    const { id } = req.params;
    const { reason, caseType } = req.body;

    const lawyer = await Lawyer.findById(id);
    if (!lawyer) return res.status(404).json({ message: 'Lawyer not found' });

    lawyer.status = 'deceased';
    lawyer.deceasedReason = reason;
    lawyer.deceasedCase = caseType;
    lawyer.deceasedDate = new Date();

    await lawyer.save();

    return res.json({ message: 'Lawyer marked deceased' });

  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
});


// GET Lawyer by ID (Protected)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role === 'lawyer' && req.user.id !== req.params.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const lawyer = await Lawyer.findById(req.params.id).lean();
    if (!lawyer) return res.status(404).json({ message: 'Lawyer not found' });

    delete lawyer.passwordHash;

    return res.json(lawyer);

  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
});


// UPDATE Lawyer Profile (PATCH)
router.patch('/:id/profile', authMiddleware, upload.fields([
  { name: 'passportPhoto', maxCount: 1 },
  { name: 'certificates', maxCount: 1 }
]), async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const lawyer = await Lawyer.findById(req.params.id);
    if (!lawyer) return res.status(404).json({ message: 'Lawyer not found' });

    const editableFields = ['name','age','sex','specialization','phone','email','alternateMobile','houseAddress','officeAddress'];

    // Update simple fields
    editableFields.forEach(f => {
      if (req.body[f]) lawyer[f] = req.body[f];
    });

    // Update password
    if (req.body.password && req.body.password.length >= 6) {
      lawyer.passwordHash = await bcrypt.hash(req.body.password, 10);
    }

    // Update nested nominee/family data
    ['nominee','familyMember1','familyMember2'].forEach(nested => {
      if (req.body[nested]) {
        const parsed = JSON.parse(req.body[nested]);
        lawyer[nested] = parsed;
      }
    });

    // File uploads
    const passportFile = req.files?.passportPhoto?.[0];
    const certFile = req.files?.certificates?.[0];

    if (passportFile) {
      const uploadRes = await uploadBuffer(passportFile.buffer, {
        folder: 'lawyers/passports',
        resource_type: 'image'
      });
      lawyer.passportPhoto = uploadRes.secure_url;
      lawyer.passportPhotoPublicId = uploadRes.public_id;
    }

    if (certFile) {
      const uploadRes = await uploadBuffer(certFile.buffer, {
        folder: 'lawyers/certificates',
        resource_type: 'auto'
      });
      lawyer.certificates = uploadRes.secure_url;
      lawyer.certificatesPublicId = uploadRes.public_id;
    }

    await lawyer.save();

    const obj = lawyer.toObject();
    delete obj.passwordHash;

    return res.json({ success: true, message: 'Profile updated', data: obj });

  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
