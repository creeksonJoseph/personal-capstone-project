import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <aside className="hidden md:flex w-72 bg-primary flex-col py-8 px-6 text-white sticky top-0 z-30 h-full overflow-y-auto">
      <div className="flex flex-col gap-8 flex-1">
        {/* Branding */}
        <div className="flex items-center gap-4">
          <div className="bg-white p-1 rounded-lg">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded size-10"
              data-alt="Official school crest logo with shield"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDAbLNjFnIWIrBPLVQ2wCUaPCcJpFjqz7watUQMrnddbb1NHvsGk9lNhjlMUX6NIOaCVKMro1aURWouBcx0o6x9QZzbskmMx2VbwKZ9fe_rykZhENTCnRJcNDWoY4kqwtuOjUcCYZCckY-aK8bHqDrlD45hlEqrKzCVIz8E7XY3-nXJgNjIab3Qrie4kxKs1milll--qiTyKqCBscJWsIec73gTCTp842-Thejfjwf-Q-IO7ky-RsvXi599gWunIQPIIPUmuuifbq8")',
              }}
            ></div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold leading-tight">
              Birch Hill School
            </h1>
            <p className="text-white/70 text-xs font-normal">
              CMS Administrator
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
                isActive
                  ? "bg-white/20 text-white"
                  : "hover:bg-white/10 text-white/80 group-hover:text-white"
              }`
            }
          >
            <span className="material-symbols-outlined">dashboard</span>
            <p className="text-sm font-medium">Dashboard</p>
          </NavLink>
          <NavLink
            to="/admin/create-post"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
                isActive
                  ? "bg-white/20 text-white"
                  : "hover:bg-white/10 text-white/80 group-hover:text-white"
              }`
            }
          >
            <span className="material-symbols-outlined">edit_note</span>
            <p className="text-sm font-medium">Create Blog Post</p>
          </NavLink>
          <NavLink
            to="/admin/all-posts"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
                isActive
                  ? "bg-white/20 text-white"
                  : "hover:bg-white/10 text-white/80 group-hover:text-white"
              }`
            }
          >
            <span className="material-symbols-outlined">article</span>
            <p className="text-sm font-medium">All Posts</p>
          </NavLink>
          <NavLink
            to="/admin/gallery"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
                isActive
                  ? "bg-white/20 text-white"
                  : "hover:bg-white/10 text-white/80 group-hover:text-white"
              }`
            }
          >
            <span className="material-symbols-outlined">photo_library</span>
            <p className="text-sm font-medium">Photo Gallery</p>
          </NavLink>
        </nav>
      </div>

      {/* Logout Section */}
      <div className="mt-auto">
        <div className="h-px bg-white/20 my-2"></div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors group text-white/80 group-hover:text-white w-full text-left"
        >
          <span className="material-symbols-outlined">logout</span>
          <p className="text-sm font-medium">Log Out</p>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
