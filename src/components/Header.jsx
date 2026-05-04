import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, PhoneCall } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Leaders', path: '/leaders' },
  { name: 'Jambudweep', path: '/jambudweep' },
  { name: 'Events', path: '/events' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'News', path: '/news' },
  { name: 'Contact', path: '/contact' }
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 transition-all duration-300 glass-morphism shadow-sm" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3" aria-label="Shri Digambar Jain Mandir Home">
            <img src="/use-assets/10.jpg" alt="" className="h-12 w-12 rounded-full object-cover shadow-md border-2 border-primary" />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl lg:text-2xl text-primary-dark leading-tight">Shri Digambar</span>
              <span className="text-xs lg:text-sm font-medium tracking-widest text-text-muted">Jain Mandir</span>
            </div>
          </Link>
          
          <nav className="hidden xl:flex space-x-6 items-center" aria-label="Main Navigation">
            {links.map((item) => (
              <NavLink 
                key={item.name} 
                to={item.path}
                className={({ isActive }) => 
                  `text-sm font-semibold transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-text-main'}`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <Link to="/donations" className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full font-medium transition flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300" aria-label="Support the Mandir - Donate Now">
              <PhoneCall size={16} /> Donate
            </Link>
          </nav>

          <div className="xl:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-text-main hover:text-primary transition focus:outline-none p-2"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-surface border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {links.map((item) => (
                <NavLink 
                  key={item.name} 
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => 
                    `block px-3 py-3 rounded-md text-base font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-text-main hover:bg-gray-50'}`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              <Link 
                to="/donations" 
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-center bg-primary text-white rounded-xl font-bold mt-4"
              >
                Donate Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
