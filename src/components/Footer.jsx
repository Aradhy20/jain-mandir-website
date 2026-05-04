import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/use-assets/21.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay' }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src="/use-assets/10.jpg" alt="" className="h-10 w-10 rounded-full" />
              <span className="font-serif font-bold text-2xl text-primary">Jain Mandir</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Dedicated to preserving the core principles of Jainism: Ahimsa (non-violence), Anekantavada (many-sidedness), and Aparigraha (non-attachment). Join us in our spiritual journey.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors font-bold text-xs">FB</a>
              <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors font-bold text-xs">IG</a>
              <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors font-bold text-xs">YT</a>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-0.5 after:bg-primary after:bottom-0 after:left-0 after:-mb-2">Quick Links</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link to="/about" className="hover:text-primary transition">About Our Temple</Link></li>
              <li><Link to="/events" className="hover:text-primary transition">Daily Darshan & Aarti</Link></li>
              <li><Link to="/donations" className="hover:text-primary transition">Seva & Support</Link></li>
              <li><Link to="/gallery" className="hover:text-primary transition">Photo Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-0.5 after:bg-primary after:bottom-0 after:left-0 after:-mb-2">Darshan Timings</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex justify-between border-b border-gray-800 pb-2">
                <span>Morning Darshan</span>
                <span className="font-medium text-white">05:30 AM - 12:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-gray-800 pb-2">
                <span>Evening Darshan</span>
                <span className="font-medium text-white">04:00 PM - 09:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-gray-800 pb-2">
                <span>Morning Aarti</span>
                <span className="font-medium text-primary">06:00 AM</span>
              </li>
              <li className="flex justify-between border-b border-gray-800 pb-2">
                <span>Evening Aarti</span>
                <span className="font-medium text-primary">07:30 PM</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-0.5 after:bg-primary after:bottom-0 after:left-0 after:-mb-2">Contact Info</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span>Jambudweep, Hastinapur, District Meerut, Uttar Pradesh - 250404</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <span>+91 121 281846</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <span>jambudweeptirth@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
      
      <div className="bg-gray-950 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Shri Digambar Jain Mandir. All Rights Reserved.
          </p>
          <div className="flex space-x-4 text-sm text-gray-500">
            <Link to="#" className="hover:text-primary transition">Privacy Policy</Link>
            <Link to="#" className="hover:text-primary transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
