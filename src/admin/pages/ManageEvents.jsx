import React, { useState, useEffect } from 'react';
import client from '../api/client';
import { Plus, Edit2, Trash2, X, Calendar } from 'lucide-react';

const ManageEvents = () => {
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        event_date: '',
        location: '',
        image_url: ''
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await client.get('/events');
            setEvents(response.data);
        } catch (err) {
            console.error('Error fetching events:', err);
        }
    };

    const handleEdit = (event) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            description: event.description,
            event_date: event.event_date ? event.event_date.split(' ')[0] : '',
            location: event.location || '',
            image_url: event.image_url || ''
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await client.delete(`/events/${id}`);
                fetchEvents();
            } catch (err) {
                console.error('Error deleting event:', err);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingEvent) {
                await client.put(`/events/${editingEvent.id}`, formData);
            } else {
                await client.post('/events', formData);
            }
            setIsModalOpen(false);
            setEditingEvent(null);
            setFormData({ title: '', description: '', event_date: '', location: '', image_url: '' });
            fetchEvents();
        } catch (err) {
            console.error('Error saving event:', err);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white">Manage Events</h2>
                    <p className="text-white/40">Schedule and manage temple events</p>
                </div>
                <button
                    onClick={() => {
                        setEditingEvent(null);
                        setFormData({ title: '', description: '', event_date: '', location: '', image_url: '' });
                        setIsModalOpen(true);
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-orange-500/20"
                >
                    <Plus size={20} />
                    <span>New Event</span>
                </button>
            </div>

            <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-white/5 text-white/60 text-sm uppercase">
                        <tr>
                            <th className="px-6 py-4 font-medium">Event Title</th>
                            <th className="px-6 py-4 font-medium">Date</th>
                            <th className="px-6 py-4 font-medium">Location</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {events.map((event) => (
                            <tr key={event.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-6 py-4 font-medium text-white">{event.title}</td>
                                <td className="px-6 py-4 text-white/60">{event.event_date || 'TBD'}</td>
                                <td className="px-6 py-4 text-white/60">{event.location || 'Temple'}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleEdit(event)} className="p-2 text-white/60 hover:text-orange-400 hover:bg-orange-400/10 rounded-lg">
                                            <Edit2 size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(event.id)} className="p-2 text-white/60 hover:text-red-400 hover:bg-red-400/10 rounded-lg">
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
                            <h3 className="text-xl font-bold text-white">{editingEvent ? 'Edit Event' : 'New Event'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm text-white/60 mb-2">Title</label>
                                <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Date</label>
                                    <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.event_date} onChange={(e) => setFormData({ ...formData, event_date: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm text-white/60 mb-2">Location</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-white/60 mb-2">Image URL</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm text-white/60 mb-2">Description</label>
                                <textarea rows="4" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
                            </div>
                            <div className="flex justify-end gap-4 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-white/60">Cancel</button>
                                <button type="submit" className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold">{editingEvent ? 'Update' : 'Create'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageEvents;
