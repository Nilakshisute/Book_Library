const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/books');
const myBooksRoutes = require('./routes/mybook');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// // Middleware
// app.use(cors({
//   origin: ['http://localhost:5173', 'https://book-library-w5e5.vercel.app/'],
//   credentials: true 
// }));

const allowedOrigins = [
  "http://localhost:5173",
  "https://book-library-w5e5.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/mybooks', myBooksRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Books Library API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});