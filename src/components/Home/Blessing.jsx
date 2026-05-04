import React from 'react';
import { motion } from 'framer-motion';

export default function Blessing() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary-dark rounded-3xl md:rounded-[4rem] p-6 md:p-12 lg:p-20 relative overflow-hidden shadow-2xl">
          {/* Background Image Overlay */}
          <div className="absolute inset-0 opacity-20 bg-[url('/use-assets/11.jpg')] bg-cover bg-center"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <span className="text-secondary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Divine Presence</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 font-serif leading-tight">
                "Spreading the Message of Peace & Ahimsa Across the World"
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-10 italic">
                Under the profound guidance of Pujya Ganinipramukh Aryika Shri Gyanmati Mataji, the Digambar Jain Trilok Shodh Sansthan continues its mission of spiritual awakening and the restoration of our sacred heritage.
              </p>
              <div className="flex items-center gap-6">
                <div className="w-16 h-1 bg-secondary"></div>
                <span className="text-white font-bold tracking-widest uppercase text-sm">Ganinipramukh Shri Gyanmati Mataji</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-secondary/20 rounded-full blur-2xl group-hover:bg-secondary/40 transition-all duration-700"></div>
                <img loading="lazy" 
                  src="/jambudweep/gyanmati_mataji.png" 
                  alt="Portrait of Pujya Ganinipramukh Aryika Shri Gyanmati Mataji - Spiritual Leader" 
                  className="relative w-80 h-80 md:w-96 md:h-96 rounded-3xl md:rounded-[3rem] object-cover object-top border-8 border-white/10 shadow-2xl group-hover:scale-105 transition-transform duration-500 scale-[0.98]" 
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
