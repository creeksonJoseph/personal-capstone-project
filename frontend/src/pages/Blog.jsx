import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import { BASE_URL } from "../config/api";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublishedPosts();
  }, []);

  const fetchPublishedPosts = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/posts/published/`,
      );
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error("Error fetching published posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-off-white text-charcoal font-body transition-colors duration-200">
      <Header activePage="blog" />
      <main className="px-4 md:px-20 py-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-16 text-center">
            <h1 className="text-primary text-5xl md:text-6xl font-bold mb-4 font-display">
              School Stories & Updates
            </h1>
            <p className="text-charcoal/80 text-xl max-w-2xl mx-auto">
              Latest news and announcements from Birch Hills.
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-charcoal/60">Loading posts...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {posts.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Blog;
