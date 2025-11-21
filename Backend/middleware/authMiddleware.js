const jwt = require('jsonwebtoken');
const Lawyer = require('../models/Lawyer');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = process.env.JWT_SECRET || 'changeme';
    const decoded = jwt.verify(token, secret);

    // Attach decoded token (contains id + role)
    req.user = decoded;

    // Attach full lawyer object for convenience
    if (decoded.id && decoded.role === 'lawyer') {
      const lawyer = await Lawyer.findById(decoded.id);
      if (lawyer) req.currentLawyer = lawyer;
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
