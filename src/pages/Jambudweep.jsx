import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X, BookOpen } from 'lucide-react';
import jambudweepData from '../data/jambudweepData.json';

export default function Jambudweep() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const totalPages = jambudweepData.length;

  const currentData = jambudweepData[currentPage - 1];

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4">Jambudweep History & Darshan</h1>
          <p className="text-text-muted text-lg max-w-3xl mx-auto">Explore the sacred cosmology of Jainism. Learn the history of Mount Sumeru, the holy rivers, and the eternal Kshetras through this interactive gallery.</p>
        </div>

        <div className="bg-surface rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col lg:flex-row">
          
          {/* Image Viewer Side */}
          <div className="w-full lg:w-3/5 bg-gray-50 relative p-6 flex flex-col items-center justify-center min-h-[500px]">
            <button 
              onClick={() => setIsFullscreen(true)}
              className="absolute top-6 right-6 p-2 bg-white shadow-md hover:bg-gray-100 rounded-full transition z-10"
              title="View Fullscreen"
            >
              <Maximize2 size={20} className="text-gray-700" />
            </button>

            <AnimatePresence mode="wait">
              <motion.img
                key={currentPage}
                src={currentData.image}
                alt={`Jambudweep Page ${currentPage}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="max-h-[600px] object-contain drop-shadow-xl rounded-lg"
              />
            </AnimatePresence>
          </div>

          {/* Text & History Side */}
          <div className="w-full lg:w-2/5 p-8 lg:p-12 flex flex-col justify-between border-l border-gray-100">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="text-secondary" size={28} />
                <h3 className="text-2xl font-bold text-primary-dark font-serif">Original Text / Transcript</h3>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white p-6 rounded-xl border border-gray-100 shadow-inner max-h-[300px] overflow-y-auto"
                >
                  <p className="text-lg text-text-main leading-relaxed font-medium whitespace-pre-wrap">
                    {currentData.text && currentData.text.trim() !== "" 
                      ? currentData.text 
                      : "Sacred imagery without readable text."}
                  </p>
                  
                  {/* UX Note indicating OCR status */}
                  <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-400 font-mono">
                    System Note: This text was automatically extracted from the historical scan via OCR. Some characters may require verification.
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="mt-auto">
              <div className="flex items-center justify-between w-full border-t border-gray-200 pt-8">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`p-4 rounded-xl flex items-center justify-center transition-all ${
                    currentPage === 1 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-primary text-white hover:bg-primary-dark shadow-lg hover:-translate-y-1'
                  }`}
                >
                  <ChevronLeft size={24} />
                </button>
                
                <div className="text-center">
                  <span className="block text-sm text-text-muted font-medium uppercase tracking-wider mb-1">Page</span>
                  <span className="text-2xl font-bold text-primary-dark">
                    {currentPage} <span className="text-gray-300 mx-1">/</span> {totalPages}
                  </span>
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`p-4 rounded-xl flex items-center justify-center transition-all ${
                    currentPage === totalPages 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-primary text-white hover:bg-primary-dark shadow-lg hover:-translate-y-1'
                  }`}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/98 flex flex-col items-center justify-center p-4 backdrop-blur-sm"
          >
            <button 
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition text-white"
            >
              <X size={28} />
            </button>
            
            <img 
              src={currentData.image} 
              alt={`Jambudweep Fullscreen ${currentPage}`}
              className="max-h-[85vh] max-w-full object-contain drop-shadow-2xl"
            />
            
            <div className="absolute bottom-8 flex items-center gap-8 bg-black/50 px-8 py-4 rounded-full backdrop-blur-md border border-white/10">
              <button onClick={prevPage} disabled={currentPage === 1} className="text-white disabled:opacity-30 hover:text-secondary transition">
                <ChevronLeft size={36} />
              </button>
              <span className="text-white text-xl font-bold tracking-widest">{currentPage} / {totalPages}</span>
              <button onClick={nextPage} disabled={currentPage === totalPages} className="text-white disabled:opacity-30 hover:text-secondary transition">
                <ChevronRight size={36} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
