import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const newsItems = [
  { id: 1, date: 'Oct 15, 2026', title: 'Mahavir Jayanti Celebrations Scheduled', type: 'News' },
  { id: 2, date: 'Oct 10, 2026', title: 'New Pathway Construction Completed', type: 'Update' },
  { id: 3, date: 'Oct 05, 2026', title: 'Community Medical Camp Success', type: 'Event' }
];

const blogItems = [
  { id: 1, title: 'Understanding Ahimsa in Modern Life', excerpt: 'How non-violence translates to our daily digital interactions and food choices...', image: '/use-assets/5.jpg' },
  { id: 2, title: 'The Significance of Fasting', excerpt: 'Exploring the spiritual and physical benefits of traditional Jain fasting rituals...', image: '/use-assets/6.jpg' }
];

export default function NewsBlogs() {
  return (
    <section className="py-16 bg-surface bg-dots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Latest News */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold border-b-2 border-primary inline-block pb-2 mb-8 text-text-main">Latest Updates</h2>
            <div className="space-y-6 flex flex-col">
              {newsItems.map(item => (
                <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-background border border-gray-100 hover:shadow-md transition">
                  <div className="bg-primary/10 text-primary w-20 flex-shrink-0 rounded-lg flex flex-col items-center justify-center font-bold text-sm h-20">
                    <span className="text-xl leading-none">{item.date.split(' ')[1].replace(',', '')}</span>
                    <span className="text-xs uppercase mt-1">{item.date.split(' ')[0]}</span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider">{item.type}</span>
                    <h4 className="text-lg font-bold text-text-main hover:text-primary cursor-pointer">{item.title}</h4>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/news" className="mt-6 inline-block text-primary font-semibold hover:underline">Read All News &rarr;</Link>
          </motion.div>

          {/* Top Blogs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold border-b-2 border-primary inline-block pb-2 mb-8 text-text-main">Spiritual Blog</h2>
            <div className="space-y-8">
              {blogItems.map(blog => (
                <div key={blog.id} className="flex flex-col sm:flex-row gap-6 group">
                  <div className="w-full sm:w-48 h-32 flex-shrink-0 overflow-hidden rounded-xl">
                    <img loading="lazy" src={blog.image} alt="Blog" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-text-main group-hover:text-primary transition mb-2">{blog.title}</h4>
                    <p className="text-text-muted text-sm leading-relaxed mb-3">{blog.excerpt}</p>
                    <Link to="/news" className="text-primary font-bold text-sm uppercase tracking-wider">Read Article</Link>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
