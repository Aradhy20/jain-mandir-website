import React, { useState, useEffect } from 'react';
import client from '../api/client';
import { Plus, Edit2, Trash2, X, Newspaper } from 'lucide-react';

const ManageNews = () => {
    const [news, setNews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        news_date: '',
        image_url: ''
    });

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await client.get('/news');
            setNews(response.data);
        } catch (err) {
            console.error('Error fetching news:', err);
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({
            title: item.title,
            content: item.content,
            news_date: item.news_date ? item.news_date.split(' ')[0] : '',
            image_url: item.image_url || ''
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this news item?')) {
            try {
                await client.delete(`/news/${id}`);
                fetchNews();
            } catch (err) {
                console.error('Error deleting news:', err);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingItem) {
                await client.put(`/news/${editingItem.id}`, formData);
            } else {
                await client.post('/news', formData);
            }
            setIsModalOpen(false);
            setEditingItem(null);
            setFormData({ title: '', content: '', news_date: '', image_url: '' });
            fetchNews();
        } catch (err) {
            console.error('Error saving news:', err);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white">Manage News</h2>
                    <p className="text-white/40">Keep the community updated with the latest news</p>
                </div>
                <button
                    onClick={() => {
                        setEditingItem(null);
                        setFormData({ title: '', content: '', news_date: '', image_url: '' });
                        setIsModalOpen(true);
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-orange-500/20"
                >
                    <Plus size={20} />
                    <span>Post News</span>
                </button>
            </div>

            <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-white/5 text-white/60 text-sm uppercase">
                        <tr>
                            <th className="px-6 py-4 font-medium">Title</th>
                            <th className="px-6 py-4 font-medium">Date</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {news.map((item) => (
                            <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-6 py-4 font-medium text-white">{item.title}</td>
                                <td className="px-6 py-4 text-white/60">{item.news_date || 'Recent'}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleEdit(item)} className="p-2 text-white/60 hover:text-orange-400 hover:bg-orange-400/10 rounded-lg">
                                            <Edit2 size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(item.id)} className="p-2 text-white/60 hover:text-red-400 hover:bg-red-400/10 rounded-lg">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-2xl">
                        <div className="flex justify-between items-center p-6 border-b border-white/10">
                            <h3 className="text-xl font-bold text-white">{editingItem ? 'Edit News' : 'Post News'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm text-white/60 mb-2">Title</label>
                                <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm text-white/60 mb-2">Date</label>
                                <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.news_date} onChange={(e) => setFormData({ ...formData, news_date: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm text-white/60 mb-2">Image URL</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm text-white/60 mb-2">Content</label>
                                <textarea rows="6" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })}></textarea>
                            </div>
                            <div className="flex justify-end gap-4 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-white/60">Cancel</button>
                                <button type="submit" className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold">{editingItem ? 'Update' : 'Post'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageNews;
