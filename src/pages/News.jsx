import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays } from 'lucide-react';

const newsItems = [
  { 
    id: 1, 
    title: 'New Jambudweep Interactive Model Inaugurated', 
    date: 'April 15, 2026',
    excerpt: 'The newly constructed interactive model of Mount Sumeru is now open to the public, offering guided digital tours.', 
    image: '/use-assets/11.jpg' 
  },
  { 
    id: 2, 
    title: 'Understanding Ahimsa in Modern Life', 
    date: 'April 02, 2026',
    excerpt: 'How non-violence translates to our daily digital interactions and food choices in the modern era.', 
    image: '/use-assets/16.jpg' 
  },
  { 
    id: 3, 
    title: 'The Significance of Fasting (Upvas)', 
    date: 'March 28, 2026',
    excerpt: 'Exploring the spiritual and physical benefits of traditional Jain fasting rituals during Paryushan.', 
    image: '/use-assets/18.jpg' 
  }
];

export default function News() {
  return (
    <div className="pt-24 pb-20 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-primary-dark mb-6"
          >
            News & Articles
          </motion.h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Stay updated with the latest events at the Mandir and read insightful articles on Jain philosophy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-surface rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col h-full group"
            >
              <div className="h-56 overflow-hidden">
                <img loading="lazy" 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center text-sm text-gray-500 mb-4 gap-2">
                  <CalendarDays size={16} />
                  {item.date}
                </div>
                <h3 className="text-2xl font-bold text-text-main mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-text-muted mb-8 flex-grow">{item.excerpt}</p>
                <button className="flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors mt-auto">
                  Read Full Article <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
