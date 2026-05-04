import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const members = [
  { id: 1, name: 'Gyanmati Mataji', role: 'Visionary Founder', image: '/jambudweep/gyanmati_mataji.png' },
  { id: 2, name: 'Chandnamati Mataji', role: 'Margdarshika', image: '/jambudweep/chandnamati_mataji.png' },
  { id: 3, name: 'Ravinkirti Swami Ji', role: 'Peethadheesh', image: '/jambudweep/ravindrakirti_swami.png' },
  { id: 4, name: 'Muni Moti Sagar Ji', role: 'First Peethadheesh', image: '/jambudweep/motisagar_ji.png' }
];

export default function TrustMembers() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Our Guidance</span>
          <h2 className="text-4xl font-bold text-text-main mb-4 font-serif italic">Spiritual Leadership</h2>
          <p className="text-text-muted max-w-2xl mx-auto">The dedicated saints and visionaries who have preserved and expanded the legacy of Jambudweep.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background rounded-3xl p-6 text-center shadow border border-gray-100 hover:shadow-xl hover:border-primary/30 transition-all group"
            >
              <div className="w-full aspect-[3/4] md:aspect-[4/5] mx-auto rounded-2xl overflow-hidden mb-4 shadow-md">
                <img loading="lazy" 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <h3 className="text-xl font-bold text-text-main">{member.name}</h3>
              <p className="text-primary text-sm font-medium mt-1 uppercase tracking-widest">{member.role}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/leaders" className="text-primary font-bold hover:underline">Learn more about our leaders &rarr;</Link>
        </div>
      </div>
    </section>
  );
}
