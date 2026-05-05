import React, { useState, useEffect } from 'react';
import client from '../api/client';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image_url: '',
        author: '',
        published_at: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await client.get('/blogs');
            setBlogs(response.data);
        } catch (err) {
            console.error('Error fetching blogs:', err);
        }
    };

    const handleEdit = (blog) => {
        setEditingBlog(blog);
        setFormData({
            title: blog.title,
            content: blog.content,
            image_url: blog.image_url || '',
            author: blog.author || '',
            published_at: blog.published_at ? blog.published_at.split(' ')[0] : ''
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await client.delete(`/blogs/${id}`);
                fetchBlogs();
            } catch (err) {
                console.error('Error deleting blog:', err);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingBlog) {
                await client.put(`/blogs/${editingBlog.id}`, formData);
            } else {
                await client.post('/blogs', formData);
            }
            setIsModalOpen(false);
            setEditingBlog(null);
            setFormData({ title: '', content: '', image_url: '', author: '', published_at: '' });
            fetchBlogs();
        } catch (err) {
            console.error('Error saving blog:', err);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white">Manage Blogs</h2>
                    <p className="text-white/40">Create and edit articles for the website</p>
                </div>
                <button
                    onClick={() => {
                        setEditingBlog(null);
                        setFormData({ title: '', content: '', image_url: '', author: '', published_at: '' });
                        setIsModalOpen(true);
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-orange-500/20"
                >
                    <Plus size={20} />
                    <span>New Blog</span>
                </button>
            </div>

            {/* Blogs Table */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-white/5 text-white/60 text-sm uppercase">
                        <tr>
                            <th className="px-6 py-4 font-medium">Title</th>
                            <th className="px-6 py-4 font-medium">Author</th>
                            <th className="px-6 py-4 font-medium">Date</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {blogs.map((blog) => (
                            <tr key={blog.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-white">{blog.title}</div>
                                    <div className="text-xs text-white/40 truncate max-w-xs">{blog.slug}</div>
                                </td>
                                <td className="px-6 py-4 text-white/60">{blog.author || 'Anonymous'}</td>
                                <td className="px-6 py-4 text-white/60">{blog.published_at || 'Not set'}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleEdit(blog)}
                                            className="p-2 text-white/60 hover:text-orange-400 hover:bg-orange-400/10 rounded-lg transition-all"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(blog.id)}
                                            className="p-2 text-white/60 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {blogs.length === 0 && (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center text-white/20">
                                    No blogs found. Start by creating one!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b border-white/10">
                            <h3 className="text-xl font-bold text-white">
                                {editingBlog ? 'Edit Blog' : 'Create New Blog'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="col-span-2">
                                    <label className="block text-sm text-white/60 mb-2">Title</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Author</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                                        value={formData.author}
                                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Publish Date</label>
                                    <input
                                        type="date"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                                        value={formData.published_at}
                                        onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm text-white/60 mb-2">Image URL</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                                        value={formData.image_url}
                                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm text-white/60 mb-2">Content</label>
                                    <textarea
                                        required
                                        rows="6"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 text-white/60 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-orange-500/20"
                                >
                                    {editingBlog ? 'Update Blog' : 'Create Blog'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageBlogs;
