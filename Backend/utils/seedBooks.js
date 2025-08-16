// utils/seedBooks.js
const mongoose = require('mongoose');
const Book = require('../models/Book');
require('dotenv').config();

const books = [
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    coverImage: "https://placehold.co/300x400/FF5733/FFFFFF?text=The+Pragmatic+Programmer",
    availability: true
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    coverImage: "https://placehold.co/300x400/3498DB/FFFFFF?text=Clean+Code",
    availability: true
  },
  {
    title: "Design Patterns",
    author: "Gang of Four",
    coverImage: "https://placehold.co/300x400/2ECC71/FFFFFF?text=Design+Patterns",
    availability: true
  },
  {
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    coverImage: "https://placehold.co/300x400/F39C12/FFFFFF?text=You+Dont+Know+JS",
    availability: true
  },
  {
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    coverImage: "https://placehold.co/300x400/9B59B6/FFFFFF?text=Eloquent+JavaScript",
    availability: true
  },
  {
    title: "React Up and Running",
    author: "Stoyan Stefanov",
    coverImage: "https://placehold.co/300x400/E74C3C/FFFFFF?text=React+Up+Running",
    availability: true
  },
  {
    title: "Node.js in Action",
    author: "Mike Cantelon",
    coverImage: "https://placehold.co/300x400/1ABC9C/FFFFFF?text=Node.js+in+Action",
    availability: true
  },
  {
    title: "MongoDB in Action",
    author: "Kyle Banker",
    coverImage: "https://placehold.co/300x400/34495E/FFFFFF?text=MongoDB+in+Action",
    availability: true
  }
];

const seedBooks = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing books
    await Book.deleteMany({});
    console.log('Cleared existing books');

    // Insert new books
    await Book.insertMany(books);
    console.log('Books seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding books:', error);
    process.exit(1);
  }
};

seedBooks();