import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Image as ImageIcon, Calendar, Newspaper, LogOut, Home } from 'lucide-react';

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
    };

    const navItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
        { name: 'Blogs', icon: <FileText size={20} />, path: '/admin/blogs' },
        { name: 'Gallery', icon: <ImageIcon size={20} />, path: '/admin/gallery' },
        { name: 'Events', icon: <Calendar size={20} />, path: '/admin/events' },
        { name: 'News', icon: <Newspaper size={20} />, path: '/admin/news' },
    ];

    return (
        <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-[#111111] border-r border-white/10 flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
                        Admin Panel
                    </h1>
                    <p className="text-xs text-white/40 mt-1">Jambudweep Management</p>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/5 group"
                        >
                            <span className="text-white/60 group-hover:text-orange-400">
                                {item.icon}
                            </span>
                            <span className="text-sm font-medium">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10 space-y-2">
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/5 text-white/60 hover:text-white"
                    >
                        <Home size={20} />
                        <span className="text-sm font-medium">View Website</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-red-500/10 text-red-500"
                    >
                        <LogOut size={20} />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] p-8">
                <div className="max-w-6xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
