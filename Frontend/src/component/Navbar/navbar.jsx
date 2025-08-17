import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">📚 Book Library</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/mybooks" className="hover:underline">My Books</Link>
        <Link to="/auth" className="hover:underline">Login / Register</Link>
      </div>
    </nav>
  );
}
