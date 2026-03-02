import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import ConfirmModal from '../components/ConfirmModal';
import { usePosts } from '../hooks/posts/usePosts';
import { useDeletePost } from '../hooks/posts/useDeletePost';
import { useToast } from '../context/ToastContext';

const AllPosts = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Use custom hooks
  const { posts, loading, refresh } = usePosts();
  const { showToast } = useToast();
  const { deletePost: handleDelete } = useDeletePost(refresh, showToast);

  const requestDeletePost = (id) => {
    setSelectedPostId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDeletePost = async () => {
    try {
      await handleDelete(selectedPostId);
    } catch (error) {
      console.error('Delete failed:', error);
    }
    setIsDeleteModalOpen(false);
    setSelectedPostId(null);
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedPostId(null);
  };

  const handleToggleStatus = async (postId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'published' ? 'archived' : 'published';
      
      // Find the post to get its current data
      const post = posts.find(p => p.id === postId);
      if (!post) return;
      
      const formData = new FormData();
      formData.append('title', post.title);
      formData.append('content', JSON.stringify(post.content));
      formData.append('content_html', post.content_html || '');
      formData.append('status', newStatus);
      
      // Add featured image if exists
      if (post.featured_image_url) {
        formData.append('featured_image', post.featured_image_url);
        formData.append('featured_image_alt', post.featured_image_alt || post.title);
      }
      
      // Add categories
      if (post.categories && post.categories.length > 0) {
        post.categories.forEach((category) => {
          formData.append('category_ids', category.id);
        });
      }
      
      // Add post images
      if (post.post_images && post.post_images.length > 0) {
        post.post_images.forEach((image) => {
          formData.append('post_image_urls', image.image);
        });
      }
      
      // Import updatePost from API
      const { updatePost } = await import('../api/posts');
      await updatePost(postId, formData);
      
      // Refresh the posts list
      refresh();
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  // Filter posts based on active tab and search query
  const filteredPosts = posts.filter((post) => {
    // Filter by tab
    let matchesTab = true;
    if (activeTab === 'published') matchesTab = post.status === 'published';
    if (activeTab === 'drafts') matchesTab = post.status === 'draft';
    if (activeTab === 'archive') matchesTab = post.status === 'archived';
    
    // Filter by search query
    let matchesSearch = true;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      matchesSearch = 
        post.title.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.categories.some(cat => cat.name.toLowerCase().includes(query));
    }
    
    return matchesTab && matchesSearch;
  });

  return (
    <AdminLayout>
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-charcoal">All Posts</h1>
            <p className="text-charcoal/60 mt-1">
              Manage all blog posts and their content
            </p>
          </div>
          <Link
            to="/admin/create-post"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined">add</span>
            Create New Post
          </Link>
        </div>

        {/* Tabs Section */}
        <div className="flex items-center justify-between border-b border-sky-blue/20 overflow-x-auto whitespace-nowrap">
          <div className="flex gap-8 px-2">
            <button
              className={`border-b-2 ${
                activeTab === 'all'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-charcoal/60 hover:text-charcoal'
              } pb-3 pt-2 px-1 font-bold flex items-center gap-2 transition-colors`}
              onClick={() => setActiveTab('all')}
            >
              <span className="material-symbols-outlined text-lg">
                list_alt
              </span>{' '}
              All Posts
            </button>
            <button
              className={`border-b-2 ${
                activeTab === 'published'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-charcoal/60 hover:text-charcoal'
              } pb-3 pt-2 px-1 font-medium transition-colors`}
              onClick={() => setActiveTab('published')}
            >
              Published
            </button>
            <button
              className={`border-b-2 ${
                activeTab === 'drafts'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-charcoal/60 hover:text-charcoal'
              } pb-3 pt-2 px-1 font-medium transition-colors`}
              onClick={() => setActiveTab('drafts')}
            >
              Drafts
            </button>
            <button
              className={`border-b-2 ${
                activeTab === 'archive'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-charcoal/60 hover:text-charcoal'
              } pb-3 pt-2 px-1 font-medium transition-colors`}
              onClick={() => setActiveTab('archive')}
            >
              Archive
            </button>
          </div>
        </div>

        {/* Search Section */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40">
            search
          </span>
          <input
            type="text"
            placeholder="Search posts by title, author, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-sky-blue/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
        </div>

        {/* Table Section */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-charcoal/60">Loading posts...</p>
            </div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="flex items-center justify-center h-64 bg-white border border-sky-blue/20 rounded-xl">
            <div className="text-center">
              <span className="material-symbols-outlined text-6xl text-charcoal/20 mb-4">
                inbox
              </span>
              <p className="text-charcoal/60 text-lg font-medium">
                No {activeTab === 'all' ? '' : activeTab} posts found
              </p>
              <p className="text-charcoal/40 text-sm mt-2">
                {activeTab === 'all'
                  ? 'Create your first post to get started'
                  : `No posts with "${activeTab}" status`}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-sky-blue/20 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-off-white border-b border-sky-blue/20">
                <tr>
                  <th className="px-6 py-4 text-sm font-bold text-charcoal w-[40%]">
                    Post Title
                  </th>
                  <th className="px-6 py-4 text-sm font-bold text-charcoal">
                    Author
                  </th>
                  <th className="px-6 py-4 text-sm font-bold text-charcoal">
                    Date
                  </th>
                  <th className="px-6 py-4 text-sm font-bold text-charcoal">
                    Category
                  </th>
                  <th className="px-6 py-4 text-sm font-bold text-charcoal">
                    Status
                  </th>
                  <th className="px-6 py-4 text-sm font-bold text-right text-charcoal">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-blue/20">
                {filteredPosts.map((blog) => (
                  <tr
                    key={blog.id}
                    className="hover:bg-off-white/30 transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <p className="text-charcoal font-bold text-base leading-snug">
                        {blog.title}
                      </p>
                      <p className="text-xs text-charcoal/60 mt-1">
                        {blog.description}
                      </p>
                    </td>
                    <td className="px-6 py-5 text-charcoal/60 text-sm">
                      {blog.author}
                    </td>
                    <td className="px-6 py-5 text-charcoal/60 text-sm">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-5">
                      {blog.categories.slice(0, 1).map((category) => (
                        <span
                          key={category.id}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary"
                        >
                          {category.name}
                        </span>
                      ))}
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                          blog.status === 'published'
                            ? 'bg-accent-blue/30 text-accent-blue-dark'
                            : blog.status === 'archived'
                            ? 'bg-gray-200 text-gray-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {blog.status.charAt(0).toUpperCase() +
                          blog.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/edit-post/${blog.id}`}
                          className="p-2 text-charcoal/60 hover:text-primary transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-lg">
                            edit
                          </span>
                        </Link>

                        <button
                          className={`p-2 transition-colors ${
                            blog.status === 'published'
                              ? 'text-charcoal/60 hover:text-yellow-600'
                              : 'text-charcoal/60 hover:text-green-600'
                          }`}
                          title={blog.status === 'published' ? 'Archive' : 'Publish'}
                          onClick={() => handleToggleStatus(blog.id, blog.status)}
                        >
                          <span className="material-symbols-outlined text-lg">
                            {blog.status === 'published' ? 'archive' : 'publish'}
                          </span>
                        </button>

                        <button
                          className="p-2 text-charcoal/60 hover:text-red-600 transition-colors"
                          title="Delete"
                          onClick={() => requestDeletePost(blog.id)}
                        >
                          <span className="material-symbols-outlined text-lg">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Table Footer */}
            <div className="px-6 py-4 border-t border-sky-blue/20 bg-off-white/20 flex items-center justify-between">
              <p className="text-xs text-charcoal/60">
                Showing 1-{filteredPosts.length} of {filteredPosts.length} entries
              </p>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDeletePost}
        onCancel={cancelDelete}
      />
    </AdminLayout>
  );
};

export default AllPosts;
