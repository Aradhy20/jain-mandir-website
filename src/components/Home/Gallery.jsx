import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const galleryImages = [
  { src: '/use-assets/11.jpg', span: 'md:col-span-2 md:row-span-2' },
  { src: '/use-assets/12.jpg', span: 'md:col-span-1 md:row-span-1' },
  { src: '/use-assets/13.jpg', span: 'md:col-span-1 md:row-span-1' },
  { src: '/use-assets/14.jpg', span: 'md:col-span-1 md:row-span-2' },
  { src: '/use-assets/15.jpg', span: 'md:col-span-2 md:row-span-1' },
  { src: '/use-assets/16.jpg', span: 'md:col-span-1 md:row-span-1' },
  { src: '/use-assets/17.jpg', span: 'md:col-span-1 md:row-span-1' },
  { src: '/use-assets/18.jpg', span: 'md:col-span-1 md:row-span-1' },
  { src: '/use-assets/19.jpg', span: 'md:col-span-2 md:row-span-2' },
  { src: '/use-assets/20.jpg', span: 'md:col-span-1 md:row-span-1' },
  { src: '/use-assets/21.jpg', span: 'md:col-span-1 md:row-span-1' },
  { src: '/use-assets/22.jpg', span: 'md:col-span-1 md:row-span-1' }
];

export default function Gallery() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-3 block">Visual Journey</span>
            <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-4 font-serif italic">Divine Glimpses</h2>
            <p className="text-text-muted text-lg">A window into the spiritual serenity and architectural grandeur of Hastinapur.</p>
          </div>
          <Link to="/gallery" className="group flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm hover:gap-4 transition-all duration-300">
            Explore All <span className="text-xl">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4">
          {galleryImages.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
              className={`${item.span} group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500`}
            >
              <img loading="lazy" 
                src={item.src} 
                alt={`Temple Gallery ${index + 1}`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <span className="text-white font-medium tracking-wide">Hastinapur Darshan</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
