import React from 'react';
import { motion } from 'framer-motion';

const members = [
  { id: 1, name: 'Shri Rajendra Kumar', role: 'President', image: '/use-assets/1.jpg' },
  { id: 2, name: 'Smt. Anjali Jain', role: 'Secretary', image: '/use-assets/2.jpg' },
  { id: 3, name: 'Dr. Alok Vardhan', role: 'Treasurer', image: '/use-assets/3.jpg' },
  { id: 4, name: 'Shri Navin Chand', role: 'Core Member', image: '/use-assets/4.jpg' },
  { id: 5, name: 'Shri Manoj Jain', role: 'Trustee', image: '/use-assets/5.jpg' },
  { id: 6, name: 'Smt. Sarita Devi', role: 'Trustee', image: '/use-assets/6.jpg' }
];

export default function Members() {
  return (
    <div className="pt-24 pb-20 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-primary-dark mb-6"
          >
            Trust Members
          </motion.h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Meet the dedicated individuals who selflessly manage and maintain the holy premises of the Jambudweep Darshan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-surface rounded-2xl shadow-lg border border-gray-100 p-8 text-center hover:shadow-2xl transition-shadow duration-300 group"
            >
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary transition-colors">
                <img loading="lazy" 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-text-main mb-2">{member.name}</h3>
              <p className="text-primary font-semibold tracking-wide uppercase text-sm">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
