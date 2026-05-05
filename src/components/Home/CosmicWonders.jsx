import React from 'react';
import { motion } from 'framer-motion';
import { Globe, MapPin, Milestone, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const wonders = [
  {
    title: "The Lotus Temple (Kamal Mandir)",
    description: "A breathtaking architectural marvel shaped like a blooming lotus, representing the purity of the soul and the divine path to liberation. This temple sits elegantly in a pristine water body and houses a majestic 10.25-foot idol of Bhagwan Mahavir, creating an atmosphere of deep tranquility and spiritual awakening.",
    image: "/use-assets/lotus_temple_wiki.jpeg",
    icon: Globe,
    stats: "Inaugurated 1985"
  },
  {
    title: "Mount Sumeru (Sumeru Parvat)",
    description: "A 101-foot tall representation of the center of the universe as described in ancient Jain cosmology. Crafted from light pink marble, it features 136 internal steps and 16 distinct Jinayalyas (shrines). It serves as a monumental physical manifestation of the sacred Trilok, allowing devotees to physically climb and experience the spiritual ascent.",
    image: "/use-assets/18.jpg",
    icon: Zap,
    stats: "101 Feet Tall"
  },
  {
    title: "108ft Statue of Ahimsa",
    description: "The world's tallest single-stone statue of Lord Rishabhdev, located at Mangi-Tungi. This Guinness World Record monument symbolizes universal non-violence (Ahimsa) and stands as a testament to unparalleled devotion and modern engineering, inspired by the vision of Ganinipramukh Shri Gyanmati Mataji.",
    image: "/use-assets/22.jpg",
    icon: Milestone,
    stats: "World Record"
  },
  {
    title: "Meditation Temple (Dhyan Mandir)",
    description: "A serene, grass-covered dome designed specifically for deep contemplation and spiritual research. Embodying the tranquility of ancient Jain forests, it provides seekers with a vibrationally pure environment to practice mindfulness, disconnect from worldly attachments, and connect with their inner consciousness.",
    image: "/use-assets/image.png",
    icon: MapPin,
    stats: "Research Hub"
  }
];

export default function CosmicWonders() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
          >
            Spiritual Architecture
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-text-main mb-6 font-serif"
          >
            Explore the Wonders of <span className="text-primary">Jambudweep</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-24 h-1 bg-secondary mx-auto mb-8"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-text-muted text-lg max-w-2xl mx-auto"
          >
            Discover the monumental symbols of Jain cosmology that make Hastinapur a global center for spiritual research and awakening.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {wonders.map((wonder, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-3xl md:rounded-[3rem] overflow-hidden shadow-sm border border-gray-100 group hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
              <div className="relative h-80 overflow-hidden">
                <img loading="lazy" 
                  src={wonder.image} 
                  alt={wonder.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2">
                  <wonder.icon size={16} className="text-primary" />
                  <span className="text-xs font-bold text-text-main uppercase tracking-widest">{wonder.stats}</span>
                </div>
              </div>
              <div className="p-6 md:p-10 flex-grow">
                <h3 className="text-2xl font-bold text-text-main mb-4 font-serif group-hover:text-primary transition-colors">{wonder.title}</h3>
                <p className="text-text-muted leading-relaxed mb-6">
                  {wonder.description}
                </p>
                <Link to="/jambudweep" className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest group/btn cursor-pointer inline-flex w-fit">
                  Learn More
                  <div className="w-8 h-[2px] bg-primary group-hover/btn:w-12 transition-all"></div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
