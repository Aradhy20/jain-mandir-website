import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    video: "/use-assets/sumeru_parvat_3.mp4",
    title: "Sumeru Parvat",
    subtitle: "A divine representation of the center of the universe as per Jain cosmology."
  },
  {
    video: "/use-assets/kamal_mandir_2.mp4",
    title: "Kamal Mandir",
    subtitle: "The stunning Lotus Temple, a masterpiece of modern Jain architecture."
  },
  {
    video: "/use-assets/sumeru_parvat_2.mp4",
    title: "Sacred Heights",
    subtitle: "Experience the spiritual grandeur of the 101ft Mount Sumeru."
  },
  {
    video: "/use-assets/sumeru_parvat_5.mp4",
    title: "Divine Architecture",
    subtitle: "Every structure in Jambudweep is a testament to scriptural precision."
  },
  {
    video: "/use-assets/sumeru_parvat_6.mp4",
    title: "Spiritual Peace",
    subtitle: "Experience tranquility at the holy land of Hastinapur."
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen h-[100svh] w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
            src={slides[current].video}
          ></video>
          
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-secondary font-bold tracking-[0.3em] uppercase text-sm mb-4"
            >
              Welcome to Shri Digambar Jain Mandir
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-5xl md:text-8xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl font-serif"
            >
              {slides[current].title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-xl md:text-2xl text-gray-200 max-w-3xl drop-shadow-md mb-10 font-light italic"
            >
              {slides[current].subtitle}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-full font-semibold text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95">
                Explore Jambudweep
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-full font-semibold text-lg transition-all hover:-translate-y-1 active:scale-95">
                Watch Documentary
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 transition-all duration-500 rounded-full ${i === current ? 'w-12 bg-primary' : 'w-3 bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
}
