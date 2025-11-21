const mongoose = require('mongoose');

const lawyerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number },
    sex: { type: String },
    qualification: { type: String }, // e.g., LLB, LLM
    phone: { type: String, required: true, trim: true, unique: true },
    alternateMobile: { type: String },
    email: { type: String, required: true, trim: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },

    // Lawyer identity documents
    passportPhoto: { type: String },
    passportPhotoPublicId: { type: String },

    // Lawyer Certifications (Bar Council Certificate, Law Practice License, etc.)
    certificates: { type: String },
    certificatesPublicId: { type: String },

    houseAddress: { type: String },

    // Lawyer office address
    officeAddress: { type: String },

    // Nominee details
    nominee: {
      name: { type: String },
      age: { type: Number },
      sex: { type: String },
      email: { type: String },
      phone: { type: String },
      bankAccountNumber: { type: String, required: true },
      ifscCode: { type: String, required: true },
      bankHolderName: { type: String, required: true }
    },

    // Family Member 1
    familyMember1: {
      name: { type: String },
      age: { type: Number },
      sex: { type: String },
      email: { type: String },
      mobile: { type: String },
      address: { type: String }
    },

    // Family Member 2
    familyMember2: {
      name: { type: String },
      age: { type: Number },
      sex: { type: String },
      email: { type: String },
      mobile: { type: String },
      address: { type: String }
    },

    acceptTerms: { type: Boolean, default: false },
    subscribeUpdates: { type: Boolean, default: false },

    status: { type: String, default: 'pending' },

    // Lawyer approval details
    approvedCaseType: { type: String },   // Instead of approvedDisease
    approvedMessage: { type: String },
    approvedDate: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lawyer', lawyerSchema);
