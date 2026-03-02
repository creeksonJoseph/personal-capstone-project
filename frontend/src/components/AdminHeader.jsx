import { Link } from "react-router-dom";
import logo from "../assets/IMG_2494.PNG";

function AdminHeader() {
  return (
    <header className="flex items-center justify-between px-6 md:px-12 py-5 bg-white border-b border-sky-blue/20 sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <img src={logo} alt="School Logo" className="h-24 w-auto" />
        <h2 className="text-primary text-2xl font-bold tracking-tight">
          Birch Hill School
        </h2>
      </div>
      <nav className="flex items-center gap-6">
        <Link
          to="/"
          className="hover:text-primary transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined">home</span>
          <span>Homepage</span>
        </Link>
      </nav>
    </header>
  );
}

export default AdminHeader;
