const express = require('express');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { uploadBuffer } = require('../utils/cloudinaryUpload');
const Lawyer = require('../models/Lawyer');
const generateToken = require('../utils/generateToken');

const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// use memory storage
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
      qualification,
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

    if (!name || !phone || !email || !password) {
      return res.status(400).json({ message: 'name, phone, email, password are required' });
    }

    const existing = await Lawyer.findOne({ $or: [{ email }, { phone }] });
    if (existing) {
      return res.status(409).json({ message: 'Lawyer with this email or phone already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const lawyerData = {
      name,
      age,
      sex,
      qualification,
      phone,
      alternateMobile,
      email,
      passwordHash,
      passportPhoto: null,
      certificates: null,
      houseAddress,
      officeAddress,
      nominee: nominee ? (typeof nominee === 'string' ? JSON.parse(nominee) : nominee) : undefined,
      familyMember1: familyMember1 ? (typeof familyMember1 === 'string' ? JSON.parse(familyMember1) : familyMember1) : undefined,
      familyMember2: familyMember2 ? (typeof familyMember2 === 'string' ? JSON.parse(familyMember2) : familyMember2) : undefined,
      acceptTerms: !!acceptTerms,
      subscribeUpdates: !!subscribeUpdates
    };

    const passportFile = req.files?.passportPhoto?.[0];
    const certFile = req.files?.certificates?.[0];

    if (passportFile) {
      try {
        const uploadRes = await uploadBuffer(passportFile.buffer, {
          folder: 'lawyers/passports',
          transformation: [{ width: 500, height: 500, crop: 'fill' }],
          resource_type: 'image'
        });
        lawyerData.passportPhoto = uploadRes.secure_url;
        lawyerData.passportPhotoPublicId = uploadRes.public_id;
      } catch (error) {
        return res.status(500).json({ message: 'Failed to upload passport photo' });
      }
    }

    if (certFile) {
      try {
        const uploadRes = await uploadBuffer(certFile.buffer, {
          folder: 'lawyers/certificates',
          resource_type: 'auto',
          allowed_formats: ['pdf', 'png', 'jpg', 'jpeg']
        });
        lawyerData.certificates = uploadRes.secure_url;
        lawyerData.certificatesPublicId = uploadRes.public_id;
      } catch (error) {
        return res.status(500).json({ message: 'Failed to upload certificate' });
      }
    }

    const lawyer = await Lawyer.create(lawyerData);
    const token = generateToken({ id: lawyer._id, role: 'lawyer' });

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
    return res.status(500).json({ message: 'Server error during registration' });
  }
});

// POST /api/lawyers/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'email and password are required' });

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
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/lawyers
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

// GET /api/lawyers/:id
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // Only admin OR the same lawyer
    if (req.user.role === 'lawyer' && req.user.id !== id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const lawyer = await Lawyer.findById(id).select('-passwordHash');
    if (!lawyer) return res.status(404).json({ message: 'Lawyer not found' });

    return res.json(lawyer);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/lawyers/:id/profile
router.patch('/:id/profile', authMiddleware, upload.fields([
  { name: 'passportPhoto', maxCount: 1 },
  { name: 'certificates', maxCount: 1 }
]), async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== 'admin' && req.user.id !== id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const lawyer = await Lawyer.findById(id);
    if (!lawyer) return res.status(404).json({ message: 'Lawyer not found' });

    const updateData = {};

    // Basic fields
    const fields = [
      'name', 'age', 'sex', 'qualification', 'phone', 'email',
      'alternateMobile', 'houseAddress', 'officeAddress'
    ];

    fields.forEach(f => {
      if (req.body[f] !== undefined) updateData[f] = req.body[f];
    });

    // Nested objects
    ['nominee', 'familyMember1', 'familyMember2'].forEach(key => {
      if (req.body[key]) {
        updateData[key] =
          typeof req.body[key] === 'string'
            ? JSON.parse(req.body[key])
            : req.body[key];
      }
    });

    // Password update
    if (req.body.password && req.body.password.length >= 6) {
      updateData.passwordHash = await bcrypt.hash(req.body.password, 10);
    }

    // File uploads
    const passportFile = req.files?.passportPhoto?.[0];
    const certFile = req.files?.certificates?.[0];

    if (passportFile) {
      const uploadRes = await uploadBuffer(passportFile.buffer, {
        folder: 'lawyers/passports',
        transformation: [{ width: 500, height: 500, crop: 'fill' }],
        resource_type: 'image'
      });
      updateData.passportPhoto = uploadRes.secure_url;
      updateData.passportPhotoPublicId = uploadRes.public_id;
    }

    if (certFile) {
      const uploadRes = await uploadBuffer(certFile.buffer, {
        folder: 'lawyers/certificates',
        resource_type: 'auto'
      });
      updateData.certificates = uploadRes.secure_url;
      updateData.certificatesPublicId = uploadRes.public_id;
    }

    const updatedLawyer = await Lawyer.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, select: '-passwordHash' }
    );

    return res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedLawyer
    });

  } catch (error) {
    return res.status(500).json({ message: 'Error updating profile' });
  }
});

// PATCH /api/lawyers/:id/approve
router.patch('/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const { caseType, message } = req.body;

    if (!caseType) {
      return res.status(400).json({ message: 'Case type is required for approval' });
    }

    const lawyer = await Lawyer.findById(id);
    if (!lawyer) return res.status(404).json({ message: 'Lawyer not found' });

    lawyer.status = 'approved';
    lawyer.approvedCaseType = caseType;
    lawyer.approvedMessage = message || '';
    lawyer.approvedDate = new Date();

    await lawyer.save();
    return res.json({ message: 'Lawyer approved', lawyer });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/lawyers/:id/deceased
router.post('/:id/deceased', async (req, res) => {
  try {
    const { id } = req.params;
    const { reason, caseType } = req.body;

    const lawyer = await Lawyer.findById(id);
    if (!lawyer) return res.status(404).json({ message: 'Lawyer not found' });

    lawyer.status = 'deceased';
    lawyer.deceasedReason = reason;
    lawyer.deceasedCaseType = caseType;
    lawyer.deceasedDate = new Date();

    await lawyer.save();
    return res.json({ message: 'Lawyer marked deceased' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
