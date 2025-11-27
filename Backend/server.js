const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const connectDB = require('./config/db');

connectDB();

const app = express();

// CORS: allow only configured frontend origin and enable credentials for cookies/auth
const allowedOrigins = [
  "https://www.lawyerswelfare.com",
  "https://lawyerswelfare.com",
  process.env.FRONTEND_URL,  // optional - in case you set one
  "http://localhost:3000"
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests without origin (Postman, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.log("❌ CORS Blocked Origin:", origin);
      return callback(new Error("CORS Not Allowed for: " + origin));
    }
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Serve local uploads directory so fallback file uploads are reachable at /uploads/<filename>
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Images are stored in Cloudinary when configured; local /uploads is a fallback when Cloudinary isn't configured

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/lawyers', require('./routes/lawyerRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/debug', require('./routes/debugRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
