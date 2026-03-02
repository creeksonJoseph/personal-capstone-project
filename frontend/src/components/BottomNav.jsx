import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const BottomNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const closeMenu = () => setIsMenuOpen(false);

  // Common link styles
  const linkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
      isActive
        ? "text-primary bg-primary/5"
        : "text-charcoal/60 hover:text-primary hover:bg-off-white"
    }`;

  const drawerLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive
        ? "bg-primary/10 text-primary border-r-4 border-primary"
        : "text-charcoal/80 hover:bg-off-white hover:text-charcoal"
    }`;

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-sky-blue/20 px-4 py-2 flex justify-between items-center z-40 md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {/* Home */}
        <NavLink to="/" className={linkClass}>
          <span className="material-symbols-outlined text-2xl">home</span>
          <span className="text-[10px] font-medium mt-0.5">Home</span>
        </NavLink>

        {/* Dashboard */}
        <NavLink to="/admin" end className={linkClass}>
          <span className="material-symbols-outlined text-2xl">dashboard</span>
          <span className="text-[10px] font-medium mt-0.5">Dash</span>
        </NavLink>

        {/* Create Post (Center Prominent) */}
        <NavLink to="/admin/create-post" className="flex flex-col items-center justify-center -mt-8">
          <div className="bg-primary text-white p-3 rounded-full shadow-lg border-4 border-white flex items-center justify-center hover:bg-primary/90 transition-colors">
            <span className="material-symbols-outlined text-2xl">add</span>
          </div>
          <span className="text-[10px] font-medium mt-1 text-charcoal/60">Create</span>
        </NavLink>

        {/* Gallery */}
        <NavLink to="/admin/gallery" className={linkClass}>
          <span className="material-symbols-outlined text-2xl">photo_library</span>
          <span className="text-[10px] font-medium mt-0.5">Gallery</span>
        </NavLink>

        {/* Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
            isMenuOpen ? "text-primary" : "text-charcoal/60 hover:text-primary"
          }`}
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
          <span className="text-[10px] font-medium mt-0.5">Menu</span>
        </button>
      </nav>

      {/* Slide-up Menu Drawer */}
      {/* Backdrop */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 md:hidden animate-fade-in"
          onClick={closeMenu}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed bottom-0 left-0 w-full bg-white rounded-t-2xl z-50 md:hidden transition-transform duration-300 ease-out transform ${
          isMenuOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: '80vh' }}
      >
        <div className="p-4">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
          
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-charcoal/40 uppercase tracking-wider mb-2 px-4">
              Navigation
            </h3>
            
            <NavLink to="/admin/all-posts" onClick={closeMenu} className={drawerLinkClass}>
              <span className="material-symbols-outlined">article</span>
              <span className="font-medium">All Posts</span>
            </NavLink>
            
            <NavLink to="/admin/gallery" onClick={closeMenu} className={drawerLinkClass}>
              <span className="material-symbols-outlined">photo_library</span>
              <span className="font-medium">Photo Gallery</span>
            </NavLink>

            <div className="h-px bg-gray-100 my-4" />

            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <span className="material-symbols-outlined">logout</span>
              <span className="font-medium">Log Out</span>
            </button>
          </div>
          
          <div className="pt-8 pb-4 text-center">
             <button 
               onClick={closeMenu}
               className="text-primary font-medium text-sm"
             >
               Close Menu
             </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomNav;
