export default function BookCard({ book, onAdd }) {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h2 className="font-bold text-lg">{book.title}</h2>
      <p className="text-gray-600">{book.author}</p>
      <button
        onClick={() => onAdd(book)}
        className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
      >
        ➕ Add to My Books
      </button>
    </div>
  );
}
