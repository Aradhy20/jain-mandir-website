import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureSection() {
  return (
    <section className="py-24 bg-gray-900 relative">
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-20"
          src="/use-assets/Sumeru parvat 5.MP4"
        ></video>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            The Structure of <span className="text-primary italic">Sumeru Parvat</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300 mb-10 leading-relaxed"
          >
            At the exact center of Jambudweep lies Mount Sumeru, standing at an immense height of 100,000 yojanas in Jain cosmology. Our physical architectural model faithfully recreates this cosmic axis, allowing visitors to spiritually ascend through the realms.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-morphism p-8 rounded-2xl text-center text-white"
          >
            <div className="text-4xl font-serif text-primary mb-4">4</div>
            <h3 className="text-xl font-bold mb-2">Bhadrashal Vans</h3>
            <p className="text-gray-400 text-sm">The four majestic celestial forests located at the base of Mount Sumeru, filled with eternal Jain temples.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="glass-morphism p-8 rounded-2xl text-center text-white"
          >
            <div className="text-4xl font-serif text-primary mb-4">16</div>
            <h3 className="text-xl font-bold mb-2">Eternal Jinalayas</h3>
            <p className="text-gray-400 text-sm">Akritrima Chaityalayas (uncreated temples) situated across the various levels of the sacred mountain.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="glass-morphism p-8 rounded-2xl text-center text-white"
          >
            <div className="text-4xl font-serif text-primary mb-4">Panduk Shila</div>
            <h3 className="text-xl font-bold mb-2">The Peak</h3>
            <p className="text-gray-400 text-sm">The holy crescent rock at the summit where the celestial beings anoint every newborn Tirthankara.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
