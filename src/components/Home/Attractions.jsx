import React from 'react';
import { motion } from 'framer-motion';

const attractions = [
  {
    title: "Jambudvipa Model",
    desc: "A massive 250ft diameter circular representation of the Jain universe.",
    image: "/use-assets/22.jpg"
  },
  {
    title: "Mount Sumeru",
    desc: "A 101ft tall architectural marvel made of light pink marble.",
    image: "/use-assets/sumeru_parvat_6.mp4"
  },
  {
    title: "Lotus Temple (Kamal Mandir)",
    desc: "A stunning architectural symbol of purity, shaped like a blooming lotus.",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/23/Lotus_Temple_at_Jambudweep.JPG"
  }
];

export default function Attractions() {
  return (
    <section className="py-16 bg-white bg-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-3 block">Sacred Landmarks</span>
          <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-4 font-serif">Major Attractions</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">Explore the diverse spiritual structures within our 30-acre campus.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {attractions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-[400px] rounded-[2.5rem] overflow-hidden mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-500">
                {item.image.toLowerCase().endsWith('.mp4') ? (
                  <video autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={item.image} />
                ) : (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/70 text-sm font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
