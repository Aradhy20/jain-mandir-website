import React, { useState, useEffect } from 'react';
import client from '../api/client';
import { Plus, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';

const ManageGallery = () => {
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        image_url: '',
        category: '',
        description: ''
    });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await client.get('/gallery');
            setItems(response.data);
        } catch (err) {
            console.error('Error fetching gallery items:', err);
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({
            title: item.title || '',
            image_url: item.image_url,
            category: item.category || '',
            description: item.description || ''
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            try {
                await client.delete(`/gallery/${id}`);
                fetchItems();
            } catch (err) {
                console.error('Error deleting gallery item:', err);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingItem) {
                await client.put(`/gallery/${editingItem.id}`, formData);
            } else {
                await client.post('/gallery', formData);
            }
            setIsModalOpen(false);
            setEditingItem(null);
            setFormData({ title: '', image_url: '', category: '', description: '' });
            fetchItems();
        } catch (err) {
            console.error('Error saving gallery item:', err);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white">Manage Gallery</h2>
                    <p className="text-white/40">Upload and manage temple photos</p>
                </div>
                <button
                    onClick={() => {
                        setEditingItem(null);
                        setFormData({ title: '', image_url: '', category: '', description: '' });
                        setIsModalOpen(true);
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-orange-500/20"
                >
                    <Plus size={20} />
                    <span>Add Photo</span>
                </button>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                    <div key={item.id} className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden group relative">
                        <img 
                            src={item.image_url} 
                            alt={item.title} 
                            className="w-full h-48 object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-white">{item.title || 'Untitled'}</h3>
                                <span className="text-[10px] uppercase tracking-wider bg-white/10 text-white/60 px-2 py-1 rounded">
                                    {item.category || 'General'}
                                </span>
                            </div>
                            <p className="text-sm text-white/40 line-clamp-2">{item.description}</p>
                        </div>
                        
                        {/* Overlay Actions */}
                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => handleEdit(item)}
                                className="p-2 bg-black/60 backdrop-blur-md text-white hover:text-orange-400 rounded-lg transition-all"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="p-2 bg-black/60 backdrop-blur-md text-white hover:text-red-400 rounded-lg transition-all"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
                {items.length === 0 && (
                    <div className="col-span-full py-12 text-center bg-[#111111] border border-dashed border-white/10 rounded-2xl">
                        <ImageIcon size={48} className="mx-auto text-white/10 mb-4" />
                        <p className="text-white/20">No gallery items found.</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden">
                        <div className="flex justify-between items-center p-6 border-b border-white/10">
                            <h3 className="text-xl font-bold text-white">
                                {editingItem ? 'Edit Photo' : 'Add New Photo'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Title</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Image URL</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                                        value={formData.image_url}
                                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                        placeholder="https://example.com/photo.jpg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Category</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        placeholder="Temple, Festival, etc."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Description</label>
                                    <textarea
                                        rows="3"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                                    {editingItem ? 'Update Photo' : 'Add Photo'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageGallery;
