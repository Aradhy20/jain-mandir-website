import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ChevronRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#1c1216] via-[#140c10] to-[#0a0507] text-white overflow-hidden border-t-2 border-secondary/40">
      {/* Subtle atmospheric temple backdrop */}
      <div 
        className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none mix-blend-luminosity" 
        style={{ backgroundImage: "url('/use-assets/18.jpg')" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0507] via-transparent to-[#1c1216]/90 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand & Mission */}
          <div className="space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="p-1.5 bg-white/10 backdrop-blur-md rounded-xl border border-secondary/30 shadow-lg shrink-0">
                <img width="42" height="42" src="/use-assets/logo.jpg" alt="Jambudweep Logo" className="h-10 w-10 object-contain rounded" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-2xl tracking-wide text-white drop-shadow">
                  Jambu<span className="text-secondary font-medium">dweep</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-secondary font-semibold">Hastinapur Kshetra</span>
              </div>
            </div>
            <p className="text-gray-300/85 text-sm leading-relaxed">
              Dedicated to preserving the eternal principles of Jainism: Ahimsa (non-violence), Anekantavada (many-sidedness), and Aparigraha (non-attachment). Join us in our spiritual journey.
            </p>
            <div className="flex space-x-3 pt-1">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Facebook"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-secondary hover:text-gray-950 hover:border-secondary transition-all hover:scale-105 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-secondary hover:text-gray-950 hover:border-secondary transition-all hover:scale-105 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="YouTube"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-secondary hover:text-gray-950 hover:border-secondary transition-all hover:scale-105 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-lg text-white mb-6 relative inline-block after:content-[''] after:absolute after:w-10 after:h-0.5 after:bg-secondary after:bottom-0 after:left-0 after:-mb-2 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="group flex items-center text-gray-300/80 hover:text-secondary transition-colors duration-200">
                  <ChevronRight size={14} className="text-secondary/60 mr-2 group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
                  <span>About Our Temple</span>
                </Link>
              </li>
              <li>
                <Link to="/events" className="group flex items-center text-gray-300/80 hover:text-secondary transition-colors duration-200">
                  <ChevronRight size={14} className="text-secondary/60 mr-2 group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
                  <span>Daily Darshan & Aarti</span>
                </Link>
              </li>
              <li>
                <Link to="/donations" className="group flex items-center text-gray-300/80 hover:text-secondary transition-colors duration-200">
                  <ChevronRight size={14} className="text-secondary/60 mr-2 group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
                  <span>Seva & Support</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="group flex items-center text-gray-300/80 hover:text-secondary transition-colors duration-200">
                  <ChevronRight size={14} className="text-secondary/60 mr-2 group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
                  <span>Photo Gallery</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="group flex items-center text-gray-300/80 hover:text-secondary transition-colors duration-200">
                  <ChevronRight size={14} className="text-secondary/60 mr-2 group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Darshan Timings */}
          <div>
            <h4 className="font-serif font-bold text-lg text-white mb-6 relative inline-block after:content-[''] after:absolute after:w-10 after:h-0.5 after:bg-secondary after:bottom-0 after:left-0 after:-mb-2 tracking-wide">
              Darshan Timings
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between items-center bg-white/[0.04] px-3.5 py-2.5 rounded-xl border border-white/5">
                <span className="text-gray-300 font-medium">Morning Darshan</span>
                <span className="font-semibold text-white tracking-wide">05:30 AM - 12:00 PM</span>
              </li>
              <li className="flex justify-between items-center bg-white/[0.04] px-3.5 py-2.5 rounded-xl border border-white/5">
                <span className="text-gray-300 font-medium">Evening Darshan</span>
                <span className="font-semibold text-white tracking-wide">04:00 PM - 09:00 PM</span>
              </li>
              <li className="flex justify-between items-center bg-secondary/[0.09] px-3.5 py-2.5 rounded-xl border border-secondary/25 shadow-inner">
                <div className="flex items-center gap-2">
                  <Clock size={15} className="text-secondary" />
                  <span className="text-secondary font-semibold">Morning Aarti</span>
                </div>
                <span className="font-bold text-secondary tracking-wider text-sm">06:00 AM</span>
              </li>
              <li className="flex justify-between items-center bg-secondary/[0.09] px-3.5 py-2.5 rounded-xl border border-secondary/25 shadow-inner">
                <div className="flex items-center gap-2">
                  <Clock size={15} className="text-secondary" />
                  <span className="text-secondary font-semibold">Evening Aarti</span>
                </div>
                <span className="font-bold text-secondary tracking-wider text-sm">07:30 PM</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif font-bold text-lg text-white mb-6 relative inline-block after:content-[''] after:absolute after:w-10 after:h-0.5 after:bg-secondary after:bottom-0 after:left-0 after:-mb-2 tracking-wide">
              Contact Info
            </h4>
            <ul className="space-y-4 text-sm text-gray-300/90">
              <li className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary border border-secondary/30 shrink-0 mt-0.5 shadow-sm">
                  <MapPin size={16} />
                </div>
                <span className="leading-relaxed">Jain Temple Road, Hastinapur, Meerut, Uttar Pradesh - 250404</span>
              </li>
              <li className="flex items-center gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary border border-secondary/30 shrink-0 shadow-sm">
                  <Phone size={16} />
                </div>
                <div className="flex flex-wrap items-center gap-x-2">
                  <a href="tel:+919412708203" className="hover:text-secondary transition-colors font-medium">+91-9412708203</a>
                  <span className="text-gray-500">,</span>
                  <a href="tel:+919411025124" className="hover:text-secondary transition-colors font-medium">+91-9411025124</a>
                </div>
              </li>
              <li className="flex items-center gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary border border-secondary/30 shrink-0 shadow-sm">
                  <Mail size={16} />
                </div>
                <a href="mailto:ravindrajain@jambudweep.org" className="hover:text-secondary transition-colors break-all">
                  ravindrajain@jambudweep.org
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/40 py-5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} Shri Digambar Jain Atishaya Kshetra, Jambudweep. All Rights Reserved.
          </p>
          <div className="flex space-x-6 text-xs text-gray-400">
            <Link to="#" className="hover:text-secondary transition-colors">Privacy Policy</Link>
            <span className="text-gray-700">•</span>
            <Link to="#" className="hover:text-secondary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
