import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import client from '../api/client';
import { FileText, Image as ImageIcon, Calendar, Newspaper, ArrowRight } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        blogs: 0,
        gallery: 0,
        events: 0,
        news: 0
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [blogs, gallery, events, news] = await Promise.all([
                client.get('/blogs'),
                client.get('/gallery'),
                client.get('/events'),
                client.get('/news')
            ]);
            setStats({
                blogs: blogs.data.length,
                gallery: gallery.data.length,
                events: events.data.length,
                news: news.data.length
            });
        } catch (err) {
            console.error('Error fetching stats:', err);
        }
    };

    const statCards = [
        { name: 'Blogs', count: stats.blogs, icon: <FileText className="text-blue-400" />, path: '/admin/blogs', color: 'blue' },
        { name: 'Gallery Items', count: stats.gallery, icon: <ImageIcon className="text-purple-400" />, path: '/admin/gallery', color: 'purple' },
        { name: 'Events', count: stats.events, icon: <Calendar className="text-orange-400" />, path: '/admin/events', color: 'orange' },
        { name: 'News Items', count: stats.news, icon: <Newspaper className="text-green-400" />, path: '/admin/news', color: 'green' },
    ];

    return (
        <div className="space-y-10">
            <div>
                <h2 className="text-4xl font-bold text-white tracking-tight">Dashboard Overview</h2>
                <p className="text-white/40 mt-2">Welcome back! Here's what's happening on your website.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card) => (
                    <div key={card.name} className="bg-[#111111] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
                                {card.icon}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-white/60 text-sm font-medium">{card.name}</h3>
                            <p className="text-3xl font-bold text-white">{card.count}</p>
                        </div>
                        <Link 
                            to={card.path}
                            className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors"
                        >
                            Manage <ArrowRight size={14} />
                        </Link>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity / Quick Tips */}
                <div className="bg-[#111111] border border-white/10 rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <Link to="/admin/blogs" className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-transparent hover:border-white/10">
                            <div className="font-bold text-white mb-1">Write Blog</div>
                            <div className="text-xs text-white/40">Share a new article</div>
                        </Link>
                        <Link to="/admin/gallery" className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-transparent hover:border-white/10">
                            <div className="font-bold text-white mb-1">Add Photo</div>
                            <div className="text-xs text-white/40">Upload to gallery</div>
                        </Link>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-orange-500/10 to-red-600/10 border border-orange-500/20 rounded-2xl p-8 flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-white mb-2">Need Help?</h3>
                    <p className="text-white/60 mb-6 text-sm">
                        If you have any issues managing the website, please contact the development team.
                    </p>
                    <button className="bg-white text-black px-6 py-3 rounded-xl font-bold text-sm w-fit hover:bg-white/90 transition-colors">
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
