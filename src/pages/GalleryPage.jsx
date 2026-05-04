import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';

const allImages = [
  '/use-assets/1.jpg', '/use-assets/2.jpg', '/use-assets/3.jpg',
  '/use-assets/4.jpg', '/use-assets/5.jpg', '/use-assets/6.jpg',
  '/use-assets/7.jpg', '/use-assets/8.jpg', '/use-assets/9.jpg',
  '/use-assets/10.jpg', '/use-assets/11.jpg', '/use-assets/12.jpg',
  '/use-assets/13.jpg', '/use-assets/14.jpg', '/use-assets/15.jpg',
  '/use-assets/16.jpg', '/use-assets/17.jpg', '/use-assets/18.jpg',
  '/use-assets/19.jpg', '/use-assets/20.jpg', '/use-assets/21.jpg',
  '/use-assets/22.jpg', '/use-assets/23.jpg', '/use-assets/24.jpg'
];

export default function GalleryPage() {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="pt-24 pb-20 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary-dark mb-6 font-serif"
          >
            Complete Photo Gallery
          </motion.h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Explore the beautiful architecture, events, and serene moments captured at the Shri Digambar Jain Mandir.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {allImages.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 10) * 0.05 }}
              onClick={() => setSelectedImg(src)}
              className="break-inside-avoid rounded-2xl overflow-hidden shadow-lg group relative bg-gray-100 cursor-pointer"
            >
              <img 
                src={src} 
                alt={`Architecture and events at Shri Digambar Jain Mandir - Photo ${index + 1}`} 
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md border border-white/30 p-3 rounded-full text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <Maximize2 size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImg(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-primary transition p-2"
              onClick={() => setSelectedImg(null)}
              aria-label="Close lightbox"
            >
              <X size={40} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImg} 
              alt="Expanded view"
              className="max-h-[90vh] max-w-full rounded-lg shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
