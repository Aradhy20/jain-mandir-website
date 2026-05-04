import React from 'react';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section className="py-24 bg-surface relative overflow-hidden" id="about">
      {/* Decorative texture */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative"
          >
            <div className="absolute -inset-4 bg-primary/20 rounded-2xl transform rotate-3 z-0"></div>
            
            <div className="relative z-10 rounded-2xl shadow-2xl overflow-hidden border-4 border-white">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-[500px] object-cover scale-105"
                src="/use-assets/kamal_mandir_2.mp4"
              ></video>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-10 -right-10 hidden md:block z-20"
            >
              <img loading="lazy" 
                src="/use-assets/12.jpg"
                alt="Jambudweep Architecture - Meditation Temple" 
                className="w-64 h-64 rounded-2xl shadow-2xl border-8 border-white object-cover hover:scale-105 transition-transform duration-500" 
              />
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 mt-12 lg:mt-0"
          >
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">World-Class Research Institute</span>
            <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-6 leading-tight font-serif">
              A Global Hub for <span className="text-primary">Cosmographic Research</span> & Peace
            </h2>
            <p className="text-text-muted text-lg mb-6 leading-relaxed">
              Jambudweep is more than a temple—it is the world's premier institute for <strong className="text-primary-dark">Jain Cosmographic Research (Karananuyoga)</strong>. Spreading over 30 acres, this complex brings to life the ancient mathematical and geographical models of the universe, offering a unique bridge between spiritual wisdom and modern scientific inquiry.
            </p>
            <div className="bg-primary/5 border-l-4 border-primary p-6 mb-8 rounded-r-xl shadow-sm">
              <p className="text-primary-dark font-medium italic mb-2">"The Science of the Universe"</p>
              <p className="text-text-main text-sm">
                Established under the guidance of <strong className="text-primary-dark">Ganinipramukh Gyanmati Mataji</strong>, the institute has published over 300 authoritative volumes, documenting the precise physical and spiritual structures of the middle universe (Madhyalok).
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-3xl font-bold text-primary">1985</span>
                <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Inauguration of Jambudweep</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-3xl font-bold text-primary">101ft</span>
                <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Height of Sumeru Parvat</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
