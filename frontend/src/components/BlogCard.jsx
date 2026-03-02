import React from "react";
import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getExcerpt = () => {
    // If specific description exists, use it
    if (blog.description && blog.description.trim().length > 0) {
      return blog.description;
    }
    
    // If we have HTML content, strip tags to create an excerpt
    if (blog.content_html) {
      // Create text-only version by stripping HTML tags
      const text = blog.content_html.replace(/<[^>]*>/g, '').trim();
      return text.length > 0 ? text : blog.title;
    }
    
    // Fallback to title
    return blog.title;
  };

  const hasImage = !!blog.featured_image_url;

  return (
    <article className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-primary/5 transition-transform hover:translate-y-[-4px] duration-300">
      {hasImage && (
        <div
          className="w-full aspect-video bg-center bg-cover"
          style={{
            backgroundImage: `url(${blog.featured_image_url})`,
          }}
        ></div>
      )}
      <div className={`p-8 flex flex-col flex-1 ${!hasImage ? 'py-12 bg-gray-50' : ''}`}>
        <div className="flex items-center gap-2 text-primary/60 mb-3">
          <span className="material-symbols-outlined text-sm">
            calendar_month
          </span>
          <span className="text-xs font-bold uppercase tracking-widest">
            {formatDate(blog.published_at || blog.created_at)}
          </span>
        </div>
        <h3 className="text-primary text-3xl font-bold leading-tight mb-4 font-display">
          {blog.title}
        </h3>
        <p className={`text-charcoal/80 text-lg leading-relaxed mb-6 flex-1 ${!hasImage ? 'line-clamp-6' : 'line-clamp-3'}`}>
          {getExcerpt()}
        </p>
        <Link
          to={`/blog/${blog.id}`}
          className="text-primary font-bold text-lg inline-flex items-center gap-2 hover:translate-x-1 transition-transform"
        >
          Read More{" "}
          <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>
    </article>
  );
}

export default BlogCard;
