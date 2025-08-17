export default function MyBookCard({ book, onUpdate }) {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h2 className="font-bold text-lg">{book.title}</h2>
      <p className="text-gray-600">Status: {book.status}</p>
      <p className="text-gray-600">Rating: {book.rating}/5</p>

      <div className="flex space-x-2 mt-2">
        <button
          onClick={() => onUpdate(book, "status")}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Update Status
        </button>
        <button
          onClick={() => onUpdate(book, "rating")}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Rate
        </button>
      </div>
    </div>
  );
}
