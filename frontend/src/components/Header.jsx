import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/IMG_2494.PNG";
import { useAuth } from "../hooks/useAuth";

function Header({
  schoolName = "Birch Hill Educational Center",
  activePage = "home",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/", key: "home" },
    { name: "Our Story", path: "/story", key: "story" },
    { name: "Academics", path: "/academics", key: "academics" },
    { name: "Admissions", path: "/admissions", key: "admissions" },
    { name: "Blog", path: "/blog", key: "blog" },
    { name: "Gallery", path: "/gallery", key: "gallery" },
    { name: "Contact", path: "/contact", key: "contact" },
    ...(isAuthenticated
      ? [{ name: "Admin", path: "/admin", key: "admin" }]
      : []),
  ];

  return (
    <>
      <header
        className={`flex items-center px-6 md:px-12 py-5 bg-white border-b border-sky-blue/20 sticky top-0 z-40 transition-transform duration-300 ${isHidden ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3">
            <img src={logo} alt="School Logo" className="h-24 w-auto" />
            <h2 className="text-primary text-2xl font-bold tracking-tight">
              {schoolName}
            </h2>
          </div>
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => {
              if (item.key === "admin") {
                return (
                  <Link
                    key={item.key}
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
                    to={item.path}
                  >
                    {item.name}
                  </Link>
                );
              }
              return (
                <Link
                  key={item.key}
                  className={`hover:text-primary transition-colors ${
                    activePage === item.key
                      ? "text-primary border-b-2 border-primary pb-1"
                      : ""
                  }`}
                  to={item.path}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <button
          className="lg:hidden text-primary ml-auto"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
      </header>
      {/* Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform">
            <div className="p-6">
              <button
                className="mb-6 text-primary"
                onClick={() => setIsOpen(false)}
              >
                <span className="material-symbols-outlined text-3xl">
                  close
                </span>
              </button>
              <nav className="flex flex-col gap-6">
                {navItems.map((item) => {
                  if (item.key === "admin") {
                    return (
                      <Link
                        key={item.key}
                        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    );
                  }
                  return (
                    <Link
                      key={item.key}
                      className={`hover:text-primary transition-colors ${
                        activePage === item.key
                          ? "text-primary border-b-2 border-primary pb-1"
                          : ""
                      }`}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
