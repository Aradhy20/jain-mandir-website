import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Star, BookOpen, Users } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Daily Darshan',
    description: 'Experience the divine presence with our peaceful daily viewing sessions of Lord Rishabhdev.',
    icon: <Sun size={32} />,
    image: '/use-assets/daily_darshan.png'
  },
  {
    id: 2,
    title: 'Evening Aarti',
    description: 'Join us for the mesmerizing evening prayers that illuminate the soul with a thousand lamps.',
    icon: <Star size={32} />,
    image: '/use-assets/evening_aarti.png'
  },
  {
    id: 3,
    title: 'Pathshala',
    description: 'Weekly educational sessions at the Jambudweep Library for the younger generation.',
    icon: <BookOpen size={32} />,
    image: '/use-assets/library.png'
  },
  {
    id: 4,
    title: 'Community Seva',
    description: 'Volunteer programs and spiritual discourses at the Acharya Shantisagar Pravachan Hall.',
    icon: <Users size={32} />,
    image: '/use-assets/pravachan_hall.png'
  }
];

export default function ServicesGrid() {
  return (
    <section className="py-16 bg-background bg-dots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Our Offerings</span>
          <h2 className="text-4xl font-bold text-text-main">Temple Services</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="h-48 overflow-hidden relative">
                <img loading="lazy" 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white p-3 bg-primary/90 rounded-full">
                  {service.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-main mb-3">{service.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{service.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <a href="#" className="flex items-center text-primary font-semibold text-sm hover:text-primary-dark transition">
                    Learn More <span className="ml-2">→</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
