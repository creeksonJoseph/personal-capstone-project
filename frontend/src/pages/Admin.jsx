import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import { usePosts } from "../hooks/posts/usePosts";

const Admin = () => {
  // Fetch posts from backend
  const { posts, loading } = usePosts();

  // Calculate dashboard stats from real data
  const totalPosts = posts.length;
  const publishedPosts = posts.filter(
    (blog) => blog.status === "published",
  ).length;
  const draftPosts = posts.filter((blog) => blog.status === "draft").length;
  const archivedPosts = posts.filter((blog) => blog.status === "archived").length;
  
  // TODO: Replace with real gallery images count from backend
  const totalGalleryImages = 0; // Placeholder until gallery API is connected

  return (
    <AdminLayout>
      {/* Page Content */}
      <div className="p-8 space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-charcoal">Dashboard</h1>
            <p className="text-charcoal/60 mt-1">
              Welcome back! Here's what's happening at Birch Hill School.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg">
              <span className="material-symbols-outlined text-sm">
                calendar_today
              </span>
              <span className="text-sm font-medium">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-charcoal/60">Loading dashboard...</p>
            </div>
          </div>
        ) : (
          <>
        {/* Stats Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Posts Card */}
          <div className="bg-white border border-sky-blue/20 p-6 rounded-xl shadow-sm flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <p className="text-charcoal/70 text-base font-medium">
                Total Posts
              </p>
              <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-lg">
                description
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold tracking-tight">{totalPosts}</p>
            </div>
            <p className="text-xs text-charcoal/50 italic">
              Total published articles in school blog
            </p>
          </div>

          {/* Published Posts Card */}
          <div className="bg-white border border-sky-blue/20 p-6 rounded-xl shadow-sm flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <p className="text-charcoal/70 text-base font-medium">
                Published Posts
              </p>
              <span className="material-symbols-outlined text-green-600 bg-green-50 p-1.5 rounded-lg">
                check_circle
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold tracking-tight">
                {publishedPosts}
              </p>
            </div>
            <p className="text-xs text-charcoal/50 italic">
              Posts available to public
            </p>
          </div>

          {/* Gallery Images Card */}
          <div className="bg-white border border-sky-blue/20 p-6 rounded-xl shadow-sm flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <p className="text-charcoal/70 text-base font-medium">
                Gallery Images
              </p>
              <span className="material-symbols-outlined text-accent-blue-dark bg-accent-blue/10 p-1.5 rounded-lg">
                photo_library
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold tracking-tight">
                {totalGalleryImages}
              </p>
            </div>
            <p className="text-xs text-charcoal/50 italic">
              Total images in photo gallery
            </p>
          </div>

          {/* Draft Posts Card */}
          <div className="bg-white border border-sky-blue/20 p-6 rounded-xl shadow-sm flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <p className="text-charcoal/70 text-base font-medium">
                Draft Posts
              </p>
              <span className="material-symbols-outlined text-yellow-600 bg-yellow-50 p-1.5 rounded-lg">
                draft
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold tracking-tight">{draftPosts}</p>
            </div>
            <p className="text-xs text-charcoal/50 italic">
              Posts saved as drafts
            </p>
          </div>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Posts */}
          <div className="bg-white border border-sky-blue/20 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-charcoal">Recent Posts</h2>
              <Link
                to="/admin/all-posts"
                className="text-primary text-sm font-medium hover:text-primary/80"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {posts.slice(0, 3).map((blog) => (
                <div
                  key={blog.id}
                  className="flex gap-4 p-3 hover:bg-off-white rounded-lg transition-colors"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary">
                      article
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-charcoal truncate">
                      {blog.title}
                    </p>
                    <p className="text-xs text-charcoal/60 mt-1">{blog.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to="/admin/create-post"
                      className="p-1 text-charcoal/50 hover:text-primary"
                    >
                      <span className="material-symbols-outlined text-sm">
                        edit
                      </span>
                    </Link>
                    <button
                      className="p-1 text-charcoal/50 hover:text-red-600"
                      onClick={() => requestDeletePost(blog.id)}
                    >
                      <span className="material-symbols-outlined text-sm">
                        delete
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-sky-blue/20 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-charcoal mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/admin/create-post"
                className="flex flex-col items-center gap-2 p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
              >
                <span className="material-symbols-outlined text-primary text-2xl">
                  edit_note
                </span>
                <span className="text-sm font-medium text-charcoal">
                  Create Post
                </span>
              </Link>
              <Link
                to="/admin/gallery"
                className="flex flex-col items-center gap-2 p-4 bg-accent-blue/5 rounded-lg hover:bg-accent-blue/10 transition-colors"
              >
                <span className="material-symbols-outlined text-accent-blue-dark text-2xl">
                  photo_library
                </span>
                <span className="text-sm font-medium text-charcoal">
                  Manage Gallery
                </span>
              </Link>
              <Link
                to="/admin/all-posts"
                className="flex flex-col items-center gap-2 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <span className="material-symbols-outlined text-purple-600 text-2xl">
                  article
                </span>
                <span className="text-sm font-medium text-charcoal">
                  All Posts
                </span>
              </Link>
              <Link
                to="/admin/gallery"
                className="flex flex-col items-center gap-2 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <span className="material-symbols-outlined text-green-600 text-2xl">
                  add_photo_alternate
                </span>
                <span className="text-sm font-medium text-charcoal">
                  Upload Images
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Draft Posts */}
        <div className="bg-white border border-sky-blue/20 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-charcoal mb-6">Draft Posts</h2>
          <div className="space-y-4">
            {posts
              .filter((blog) => blog.status === "draft")
              .map((blog) => (
                <div
                  key={blog.id}
                  className="flex gap-4 p-3 hover:bg-off-white rounded-lg transition-colors"
                >
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-yellow-600">
                      draft
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-charcoal truncate">
                      {blog.title}
                    </p>
                    <p className="text-xs text-charcoal/60 mt-1">{blog.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to="/admin/create-post"
                      className="p-1 text-charcoal/50 hover:text-primary"
                    >
                      <span className="material-symbols-outlined text-sm">
                        edit
                      </span>
                    </Link>
                    <button
                      className="p-1 text-charcoal/50 hover:text-red-600"
                      onClick={() => requestDeletePost(blog.id)}
                    >
                      <span className="material-symbols-outlined text-sm">
                        delete
                      </span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-auto p-8 border-t border-sky-blue/20 text-center bg-white">
        <p className="text-xs text-charcoal/50">
          © 2026 Birch Hill Educational Center CMS. System version 1.0.0.
        </p>
      </footer>
    </AdminLayout>
  );
};

export default Admin;
