import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Share2, Download, Play, Pause } from 'lucide-react';

const galleryData = [
  { id: 1, src: '/use-assets/1.jpg', category: 'Architecture', title: 'Jambudweep Main Entrance', desc: 'The grand entrance to the 30-acre spiritual campus.' },
  { id: 2, src: '/use-assets/2.jpg', category: 'Architecture', title: 'Ancient Pillars', desc: 'Detailed stone carvings representing the eternal heritage.' },
  { id: 3, src: '/use-assets/3.jpg', category: 'Campus', title: 'Serene Pathways', desc: 'Peaceful walking paths within the Jambudweep complex.' },
  { id: 4, src: '/use-assets/4.jpg', category: 'Spiritual', title: 'Devotional Assembly', desc: 'A gathering of devotees engaged in deep prayer.' },
  { id: 5, src: '/use-assets/5.jpg', category: 'Architecture', title: 'Carved Ceilings', desc: 'Intricate marble work adorning the main temple ceilings.' },
  { id: 6, src: '/use-assets/6.jpg', category: 'Spiritual', title: 'Daily Rituals', desc: 'Sacred ceremonies performed by the temple priests.' },
  { id: 7, src: '/use-assets/7.jpg', category: 'Events', title: 'Festival Celebration', desc: 'Joyous moments during the annual religious festivals.' },
  { id: 8, src: '/use-assets/8.jpg', category: 'Campus', title: 'Sacred Sarovar', desc: 'The holy rivers and lakes surrounding the Jambudweep model.' },
  { id: 9, src: '/use-assets/9.jpg', category: 'Architecture', title: 'Temple Spire', desc: 'The towering shikhara reaching towards the heavens.' },
  { id: 10, src: '/use-assets/10.jpg', category: 'Spiritual', title: 'Guru Blessings', desc: 'Devotees receiving wisdom and blessings from the Mataji.' },
  { id: 11, src: '/use-assets/11.jpg', category: 'Architecture', title: 'Lotus Temple (Kamal Mandir)', desc: 'A stunning architectural symbol of purity, shaped like a blooming lotus.' },
  { id: 12, src: '/use-assets/12.jpg', category: 'Campus', title: 'Meditation Temple', desc: 'A serene grass-covered dome designed for deep contemplation.' },
  { id: 13, src: '/use-assets/13.jpg', category: 'Architecture', title: 'Navgrah Jinayalaya', desc: 'The sacred temple dedicated to the nine celestial bodies.' },
  { id: 14, src: '/use-assets/14.jpg', category: 'Architecture', title: 'Sumeru Parvat Detail', desc: 'Close-up of the 101ft tall model of Mount Sumeru.' },
  { id: 15, src: '/use-assets/15.jpg', category: 'Spiritual', title: 'Sacred Rituals', desc: 'Devotees participating in the daily spiritual practices.' },
  { id: 16, src: '/use-assets/16.jpg', category: 'Events', title: 'Cultural Program', desc: 'Traditional performances during the foundation day.' },
  { id: 17, src: '/use-assets/17.jpg', category: 'Architecture', title: 'Institute Facade', desc: 'The administrative and research hub of Trilok Shodh Sansthan.' },
  { id: 18, src: '/use-assets/18.jpg', category: 'Campus', title: 'Pilgrim Rest House', desc: 'Modern facilities for visitors from around the world.' },
  { id: 19, src: '/use-assets/19.jpg', category: 'Architecture', title: 'Symmetrical Beauty', desc: 'Perfect balance in modern Jain temple design.' },
  { id: 20, src: '/use-assets/20.jpg', category: 'Architecture', title: 'Pillar Detail', desc: 'Close-up of the symbolic motifs carved in stone.' },
  { id: 21, src: '/use-assets/21.jpg', category: 'Spiritual', title: 'Panchkalyanak Scene', desc: 'A capturing moment of peace and devotion during a grand ritual.' },
  { id: 22, src: '/use-assets/22.jpg', category: 'Architecture', title: '108ft Statue of Ahimsa', desc: 'The world\'s tallest single-stone statue of Lord Rishabhdev.' },
  { id: 23, src: '/use-assets/23.jpg', category: 'Spiritual', title: 'Holy Chant', desc: 'The resonance of spiritual energy in the main hall.' },
  { id: 24, src: '/use-assets/24.jpg', category: 'Spiritual', title: 'Eternal Peace', desc: 'Capturing the essence of Jain spiritual life.' },
  { id: 25, src: '/jambudweep/page_1.png', category: 'Architecture', title: 'Historical Map', desc: 'Ancient geographical map mapping the Jambudweep continent.' },
  { id: 26, src: '/use-assets/gallery-user/1.webp', category: 'Architecture', title: 'Temple Entrance', desc: 'The majestic entrance gateway of the Jambudweep complex.' },
  { id: 27, src: '/use-assets/gallery-user/2.webp', category: 'Architecture', title: 'Main Temple Facade', desc: 'Beautifully carved stone facade showcasing intricate Jain architecture.' },
  { id: 28, src: '/use-assets/gallery-user/3.webp', category: 'Campus', title: 'Lotus Temple View', desc: 'The stunning Kamal Mandir (Lotus Temple) representing purity.' },
  { id: 29, src: '/use-assets/gallery-user/4.webp', category: 'Architecture', title: 'Statue of Ahimsa View', desc: 'The monumental world-record statue of Lord Rishabhdev.' },
  { id: 32, src: '/use-assets/gallery-user/7.webp', category: 'Events', title: 'Night Illumination', desc: 'The temple complex glowing beautifully under the night sky.' }
];

const categories = ['All', 'Architecture', 'Temple', 'Events', 'Spiritual', 'Campus'];

export default function GalleryPage() {
  const [filter, setFilter] = useState('All');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isSlideshowActive, setIsSlideshowActive] = useState(false);

  const filteredImages = filter === 'All' 
    ? galleryData 
    : galleryData.filter(img => img.category === filter);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % filteredImages.length);
  }, [filteredImages.length]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  }, [filteredImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  // Slideshow logic
  useEffect(() => {
    let interval;
    if (isSlideshowActive && selectedIndex !== null) {
      interval = setInterval(handleNext, 4000);
    }
    return () => clearInterval(interval);
  }, [isSlideshowActive, selectedIndex, handleNext]);

  return (
    <div className="pt-24 pb-20 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-4 block"
          >
            Visual Chronicles
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-primary-dark mb-8 font-serif"
          >
            Divine <span className="italic text-text-main">Gallery</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-muted max-w-2xl mx-auto leading-relaxed"
          >
            Explore the spiritual serenity and architectural grandeur of Jambudweep Hastinapur through our curated collection.
          </motion.p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                filter === cat 
                  ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105' 
                  : 'bg-surface text-text-muted hover:bg-gray-100 hover:text-primary border border-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedIndex(index)}
                className="break-inside-avoid group relative rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 bg-surface"
              >
                <img 
                  src={image.src} 
                  alt={image.title}
                  loading="lazy"
                  className="w-full h-auto object-cover group-hover:scale-110 group-hover:blur-[2px] transition-all duration-700" 
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0">
                  <span className="text-secondary font-bold text-[10px] uppercase tracking-widest mb-2">{image.category}</span>
                  <h3 className="text-xl font-bold text-white mb-2">{image.title}</h3>
                  <div className="h-0.5 w-12 bg-secondary rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
                
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                  <div className="bg-white/20 backdrop-blur-md border border-white/30 p-2.5 rounded-full text-white">
                    <Maximize2 size={18} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Premium Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-xl flex items-center justify-center"
          >
            {/* Close Button */}
            <button 
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110] p-2 hover:bg-white/10 rounded-full"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close"
            >
              <X size={32} />
            </button>

            {/* Controls */}
            <div className="absolute left-4 right-4 md:left-8 md:right-8 top-1/2 -translate-y-1/2 flex justify-between z-[110] pointer-events-none">
              <button 
                className="pointer-events-auto bg-white/5 hover:bg-primary/20 text-white p-4 rounded-full backdrop-blur-md border border-white/10 transition-all hover:scale-110 active:scale-95"
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                aria-label="Previous"
              >
                <ChevronLeft size={32} />
              </button>
              <button 
                className="pointer-events-auto bg-white/5 hover:bg-primary/20 text-white p-4 rounded-full backdrop-blur-md border border-white/10 transition-all hover:scale-110 active:scale-95"
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                aria-label="Next"
              >
                <ChevronRight size={32} />
              </button>
            </div>

            {/* Image Container */}
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-20 overflow-hidden" onClick={() => setSelectedIndex(null)}>
              <motion.div
                key={filteredImages[selectedIndex].id}
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 1.1, x: -20 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative max-w-full max-h-full flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img loading="lazy" 
                  src={filteredImages[selectedIndex].src} 
                  alt={filteredImages[selectedIndex].title}
                  className="max-h-[60vh] md:max-h-[75vh] w-auto rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10"
                />
                
                {/* Meta Information */}
                <div className="mt-8 text-center max-w-2xl px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-secondary font-bold text-xs uppercase tracking-[0.3em] mb-3 block">
                      {filteredImages[selectedIndex].category}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif">
                      {filteredImages[selectedIndex].title}
                    </h2>
                    <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8">
                      {filteredImages[selectedIndex].desc}
                    </p>
                    
                    {/* Interaction Bar */}
                    <div className="flex items-center justify-center gap-6">
                      <button 
                        onClick={() => setIsSlideshowActive(!isSlideshowActive)}
                        className={`flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 transition-all ${
                          isSlideshowActive ? 'bg-primary text-white border-primary' : 'bg-white/5 text-white/70 hover:bg-white/10'
                        }`}
                      >
                        {isSlideshowActive ? <Pause size={18} /> : <Play size={18} />}
                        <span className="text-xs font-bold uppercase tracking-widest">{isSlideshowActive ? 'Pause' : 'Slideshow'}</span>
                      </button>
                      <button className="p-3 bg-white/5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all">
                        <Download size={20} />
                      </button>
                      <button className="p-3 bg-white/5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all">
                        <Share2 size={20} />
                      </button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Progress Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-1.5 z-[110]">
              {filteredImages.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1 rounded-full transition-all duration-300 ${
                    idx === selectedIndex ? 'w-8 bg-primary' : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
