import React, { useState, useEffect } from 'react';
import { BookOpen, Star, User, LogOut, Plus, Eye, Bookmark, CheckCircle } from 'lucide-react';

// Dummy API data
const DUMMY_BOOKS = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop",
    description: "A classic American novel set in the Jazz Age",
    genre: "Classic Literature",
    pages: 180,
    publishedYear: 1925,
    rating: 4.2
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop",
    description: "A gripping tale of racial injustice and childhood innocence",
    genre: "Classic Literature",
    pages: 324,
    publishedYear: 1960,
    rating: 4.5
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    cover: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&h=450&fit=crop",
    description: "A dystopian social science fiction novel",
    genre: "Science Fiction",
    pages: 328,
    publishedYear: 1949,
    rating: 4.4
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop",
    description: "A romantic novel of manners",
    genre: "Romance",
    pages: 432,
    publishedYear: 1813,
    rating: 4.3
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop",
    description: "A controversial novel about teenage rebellion",
    genre: "Coming of Age",
    pages: 277,
    publishedYear: 1951,
    rating: 3.8
  },
  {
    id: 6,
    title: "Lord of the Flies",
    author: "William Golding",
    cover: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=450&fit=crop",
    description: "A novel about the descent into savagery",
    genre: "Adventure",
    pages: 224,
    publishedYear: 1954,
    rating: 4.0
  }
];

// Book statuses
const BOOK_STATUS = {
  WANT_TO_READ: 'want_to_read',
  CURRENTLY_READING: 'currently_reading',
  COMPLETED: 'completed'
};

const STATUS_LABELS = {
  [BOOK_STATUS.WANT_TO_READ]: 'Want to Read',
  [BOOK_STATUS.CURRENTLY_READING]: 'Currently Reading',
  [BOOK_STATUS.COMPLETED]: 'Completed'
};

const STATUS_COLORS = {
  [BOOK_STATUS.WANT_TO_READ]: 'bg-blue-100 text-blue-800',
  [BOOK_STATUS.CURRENTLY_READING]: 'bg-yellow-100 text-yellow-800',
  [BOOK_STATUS.COMPLETED]: 'bg-green-100 text-green-800'
};

// BookCard Component
const BookCard = ({ book, onAddToMyBooks, isLoggedIn }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToMyBooks = async () => {
    if (!isLoggedIn) return;
    
    setIsAdding(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    onAddToMyBooks(book);
    setIsAdding(false);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />);
    }
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="relative">
        <img 
          src={book.cover} 
          alt={book.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium text-gray-700">
          {book.genre}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{book.title}</h3>
        <p className="text-gray-600 font-medium mb-2">by {book.author}</p>
        
        <div className="flex items-center mb-3">
          {renderStars(book.rating)}
          <span className="ml-2 text-sm text-gray-500">({book.rating})</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{book.description}</p>
        
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span>{book.pages} pages</span>
          <span>{book.publishedYear}</span>
        </div>
        
        {isLoggedIn ? (
          <button
            onClick={handleAddToMyBooks}
            disabled={isAdding}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAdding ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Plus className="w-5 h-5 mr-2" />
                Add to My Books
              </>
            )}
          </button>
        ) : (
          <div className="text-center text-gray-500 py-3 border-2 border-dashed border-gray-300 rounded-lg">
            Login to add books
          </div>
        )}
      </div>
    </div>
  );
};

// MyBookCard Component
const MyBookCard = ({ book, userRating, status, onUpdateStatus, onUpdateRating }) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [currentRating, setCurrentRating] = useState(userRating || 0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
    onUpdateStatus(book.id, newStatus);
  };

  const handleRatingChange = (rating) => {
    setCurrentRating(rating);
    onUpdateRating(book.id, rating);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case BOOK_STATUS.WANT_TO_READ:
        return <Bookmark className="w-4 h-4" />;
      case BOOK_STATUS.CURRENTLY_READING:
        return <Eye className="w-4 h-4" />;
      case BOOK_STATUS.COMPLETED:
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Bookmark className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="flex">
        <div className="w-32 h-48 flex-shrink-0">
          <img 
            src={book.cover} 
            alt={book.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{book.title}</h3>
              <p className="text-gray-600 font-medium">by {book.author}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${STATUS_COLORS[currentStatus]}`}>
              {getStatusIcon(currentStatus)}
              <span className="ml-1">{STATUS_LABELS[currentStatus]}</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{book.description}</p>
          
          {/* Status Update */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Reading Status</label>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(STATUS_LABELS).map(([statusKey, label]) => (
                <button
                  key={statusKey}
                  onClick={() => handleStatusChange(statusKey)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center ${
                    currentStatus === statusKey
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {getStatusIcon(statusKey)}
                  <span className="ml-1">{label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Rating */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRatingChange(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star 
                    className={`w-6 h-6 ${
                      star <= (hoverRating || currentRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              {currentRating > 0 && (
                <span className="ml-2 text-sm text-gray-600">({currentRating}/5)</span>
              )}
            </div>
          </div>
          
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{book.pages} pages</span>
            <span>Published {book.publishedYear}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Navbar Component
const Navbar = ({ currentPage, onPageChange, isLoggedIn, onAuthToggle, userName }) => {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-xl font-bold text-gray-900">BookTracker</h1>
          </div>
          
          <div className="flex space-x-8">
            <button
              onClick={() => onPageChange('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'home'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onPageChange('mybooks')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'mybooks'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
              }`}
            >
              My Books
            </button>
          </div>
          
          <div className="flex items-center">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center text-gray-700">
                  <User className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">{userName}</span>
                </div>
                <button
                  onClick={onAuthToggle}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthToggle}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
              >
                <User className="w-4 h-4 mr-2" />
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Main App Component
const BookTracker = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName] = useState('John Doe');
  const [myBooks, setMyBooks] = useState([]);
  const [books] = useState(DUMMY_BOOKS);

  // Load saved data on component mount
  useEffect(() => {
    // Simulate loading saved books from localStorage (not using actual localStorage per instructions)
    const savedBooks = [
      {
        bookId: 1,
        status: BOOK_STATUS.CURRENTLY_READING,
        userRating: 4,
        dateAdded: new Date().toISOString()
      },
      {
        bookId: 3,
        status: BOOK_STATUS.COMPLETED,
        userRating: 5,
        dateAdded: new Date().toISOString()
      }
    ];
    
    if (isLoggedIn) {
      setMyBooks(savedBooks);
    }
  }, [isLoggedIn]);

  const handleAuthToggle = () => {
    setIsLoggedIn(!isLoggedIn);
    if (!isLoggedIn) {
      // Simulate login - load saved books
      const savedBooks = [
        {
          bookId: 1,
          status: BOOK_STATUS.CURRENTLY_READING,
          userRating: 4,
          dateAdded: new Date().toISOString()
        },
        {
          bookId: 3,
          status: BOOK_STATUS.COMPLETED,
          userRating: 5,
          dateAdded: new Date().toISOString()
        }
      ];
      setMyBooks(savedBooks);
    } else {
      // Simulate logout
      setMyBooks([]);
      setCurrentPage('home');
    }
  };

  const handleAddToMyBooks = (book) => {
    const newMyBook = {
      bookId: book.id,
      status: BOOK_STATUS.WANT_TO_READ,
      userRating: 0,
      dateAdded: new Date().toISOString()
    };
    
    setMyBooks(prev => {
      const exists = prev.find(mb => mb.bookId === book.id);
      if (exists) return prev;
      return [...prev, newMyBook];
    });
  };

  const handleUpdateStatus = (bookId, newStatus) => {
    setMyBooks(prev => 
      prev.map(mb => 
        mb.bookId === bookId 
          ? { ...mb, status: newStatus }
          : mb
      )
    );
  };

  const handleUpdateRating = (bookId, newRating) => {
    setMyBooks(prev => 
      prev.map(mb => 
        mb.bookId === bookId 
          ? { ...mb, userRating: newRating }
          : mb
      )
    );
  };

  const getMyBooksWithDetails = () => {
    return myBooks.map(myBook => {
      const bookDetails = books.find(book => book.id === myBook.bookId);
      return {
        ...bookDetails,
        ...myBook
      };
    });
  };

  const getStatusCounts = () => {
    const counts = {
      [BOOK_STATUS.WANT_TO_READ]: 0,
      [BOOK_STATUS.CURRENTLY_READING]: 0,
      [BOOK_STATUS.COMPLETED]: 0
    };
    
    myBooks.forEach(book => {
      counts[book.status]++;
    });
    
    return counts;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isLoggedIn={isLoggedIn}
        onAuthToggle={handleAuthToggle}
        userName={userName}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'home' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Discover Your Next Great Read</h2>
              <p className="text-gray-600">Browse through our collection of books and add them to your reading list</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map(book => (
                <BookCard
                  key={book.id}
                  book={book}
                  onAddToMyBooks={handleAddToMyBooks}
                  isLoggedIn={isLoggedIn}
                />
              ))}
            </div>
          </div>
        )}
        
        {currentPage === 'mybooks' && (
          <div>
            {!isLoggedIn ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Login</h2>
                <p className="text-gray-600 mb-6">You need to be logged in to view your book collection</p>
                <button
                  onClick={handleAuthToggle}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center mx-auto"
                >
                  <User className="w-5 h-5 mr-2" />
                  Login Now
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">My Books</h2>
                  <p className="text-gray-600">Track your reading progress and rate your books</p>
                </div>
                
                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {Object.entries(getStatusCounts()).map(([status, count]) => (
                    <div key={status} className="bg-white rounded-lg shadow p-6">
                      <div className="flex items-center">
                        <div className={`p-3 rounded-full ${STATUS_COLORS[status]} mr-4`}>
                          {(() => {
                            switch (status) {
                              case BOOK_STATUS.WANT_TO_READ:
                                return <Bookmark className="w-6 h-6" />;
                              case BOOK_STATUS.CURRENTLY_READING:
                                return <Eye className="w-6 h-6" />;
                              case BOOK_STATUS.COMPLETED:
                                return <CheckCircle className="w-6 h-6" />;
                              default:
                                return <Bookmark className="w-6 h-6" />;
                            }
                          })()}
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{count}</p>
                          <p className="text-gray-600 text-sm">{STATUS_LABELS[status]}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Books List */}
                {myBooks.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-xl shadow">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Books Yet</h3>
                    <p className="text-gray-600 mb-6">Start building your library by adding books from the Home page</p>
                    <button
                      onClick={() => setCurrentPage('home')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Browse Books
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {getMyBooksWithDetails().map(book => (
                      <MyBookCard
                        key={book.id}
                        book={book}
                        userRating={book.userRating}
                        status={book.status}
                        onUpdateStatus={handleUpdateStatus}
                        onUpdateRating={handleUpdateRating}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default BookTracker;