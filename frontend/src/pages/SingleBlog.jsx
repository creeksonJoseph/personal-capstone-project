import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BASE_URL } from "../config/api";

function SingleBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRelatedPosts = useCallback(async (categoryId, currentPostId) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/published/`);
      
      if (response.ok) {
        const data = await response.json();
        // Filter posts from the same category, excluding current post
        const related = data
          .filter(post => 
            post.id !== currentPostId && 
            post.categories.some(cat => cat.id === categoryId)
          )
          .slice(0, 3);
        setRelatedPosts(related);
      }
    } catch (error) {
      console.error("Error fetching related posts:", error);
    }
  }, []); // Empty dependency array as it doesn't depend on component scope variables that change

  const fetchBlogPost = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/posts/${id}/`);
      
      if (response.ok) {
        const data = await response.json();
        setBlog(data);
        
        // Fetch related posts from the same category
        if (data.categories && data.categories.length > 0) {
          fetchRelatedPosts(data.categories[0].id, data.id);
        }
      } else if (response.status === 404) {
        setError("not_found");
      } else {
        setError("error");
      }
    } catch (error) {
      console.error("Error fetching blog post:", error);
      setError("error");
    } finally {
      setLoading(false);
    }
  }, [id, fetchRelatedPosts]);

  useEffect(() => {
    fetchBlogPost();
  }, [fetchBlogPost]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="bg-off-white text-charcoal font-body min-h-screen">
        <Header activePage="blog" />
        <main className="px-4 md:px-20 py-16">
          <div className="max-w-[800px] mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-charcoal/60">Loading post...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error === "not_found" || !blog) {
    return (
      <div className="bg-off-white text-charcoal font-body min-h-screen">
        <Header activePage="blog" />
        <main className="px-4 md:px-20 py-16">
          <div className="max-w-[800px] mx-auto text-center">
            <h1 className="text-primary text-4xl md:text-5xl font-bold mb-6 font-display">
              Blog Post Not Found
            </h1>
            <p className="text-charcoal/80 text-xl mb-8">
              The blog post you are looking for does not exist.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 uppercase tracking-widest text-sm"
            >
              <span className="material-symbols-outlined text-lg">west</span>
              Return to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-off-white text-charcoal font-body transition-colors duration-200">
      <Header activePage="blog" />
      <main className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="max-w-[800px] mx-auto">
          <article>
            <h1 className="text-primary text-4xl md:text-6xl font-bold leading-tight mb-8 font-display">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 py-8 border-y border-gray-200 mb-12">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-sky-blue text-2xl">
                  calendar_today
                </span>
                <p className="text-charcoal text-sm font-bold tracking-tight">
                  {formatDate(blog.published_at || blog.created_at).toUpperCase()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-sky-blue text-2xl">
                  local_offer
                </span>
                <p className="text-charcoal text-sm font-bold tracking-tight">
                  {blog.categories && blog.categories.length > 0 
                    ? blog.categories[0].name.toUpperCase() 
                    : 'UNCATEGORIZED'}
                </p>
              </div>
            </div>

            {blog.featured_image_url && (
              <div className="mb-12">
                <div className="w-full aspect-[16/9] bg-center bg-no-repeat bg-cover rounded-2xl shadow-2xl overflow-hidden">
                  <img
                    src={blog.featured_image_url}
                    alt={blog.featured_image_alt || blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Render Lexical HTML content */}
            <div 
              className="prose max-w-none text-xl font-body text-charcoal space-y-8 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.content_html }}
            />

            {blog.post_images && blog.post_images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-14">
                {blog.post_images.map((image, index) => (
                  <div
                    key={index}
                    className="h-80 rounded-2xl overflow-hidden shadow-xl border-4 border-white"
                  >
                    <img
                      src={image.image}
                      className="w-full h-full object-cover"
                      alt={image.alt_text || `${blog.title} - Image ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="mt-16 pt-12 border-t border-gray-200">
              <Link
                to="/blog"
                className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 uppercase tracking-widest text-sm"
              >
                <span className="material-symbols-outlined text-lg">west</span>
                Return to Blog
              </Link>
            </div>
          </article>

          {relatedPosts.length > 0 && (
            <section className="mt-24">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-primary text-3xl font-bold font-display tracking-tight">
                  More From Our Blog
                </h2>
                <div className="h-[2px] flex-1 bg-primary/10 ml-8"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {relatedPosts.map((post) => (
                  <div key={post.id} className="group cursor-pointer">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-5 shadow-lg relative">
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors z-10"></div>
                      <img
                        src={post.featured_image_url || '/placeholder-blog.jpg'}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        alt={post.title}
                      />
                    </div>
                    <h3 className="text-primary text-xl font-bold mb-3 font-display group-hover:text-charcoal transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-charcoal text-sm line-clamp-3 font-body opacity-80 leading-relaxed">
                      {post.excerpt || post.title}
                    </p>
                    <Link
                      to={`/blog/${post.id}`}
                      className="text-primary font-bold text-sm inline-flex items-center gap-2 hover:translate-x-1 transition-transform mt-3"
                    >
                      Read More{" "}
                      <span className="material-symbols-outlined">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default SingleBlog;
