import { useState } from "react";
import MyBookCard from "../component/book/Mybookcard";

export default function MyBooks() {
  const [myBooks, setMyBooks] = useState([
    { id: 1, title: "The Hobbit", status: "Reading", rating: 4 },
  ]);

  const handleUpdate = (book, action) => {
    console.log("Update:", book, action);
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {myBooks.map((book) => (
        <MyBookCard key={book.id} book={book} onUpdate={handleUpdate} />
      ))}
    </div>
  );
}
