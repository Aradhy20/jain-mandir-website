import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Construction, BookOpen } from 'lucide-react';
import eventsData from '../data/eventsData.json';

export default function Events() {
  const { festivals, ongoing_projects } = eventsData;

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Holy Calendar</span>
            <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-6 font-serif">Events & Festivals</h1>
            <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Join us for the upcoming 2024-2025 celebrations and witness our ongoing spiritual projects.
            </p>
          </motion.div>
        </div>

        {/* Upcoming Festivals */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-text-main mb-10 font-serif border-l-4 border-primary pl-6">Upcoming Mahotsav (2024-2025)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {festivals.map((event, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
              >
                <div className="bg-secondary/10 text-secondary w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                  <Calendar size={24} />
                </div>
                <h3 className="text-xl font-bold text-text-main mb-2 font-serif">{event.name_hi}</h3>
                <h4 className="text-sm text-primary font-bold uppercase tracking-wider mb-4">{event.name_en}</h4>
                <div className="flex items-center gap-2 text-text-muted font-bold mb-6 text-sm">
                  <Clock size={16} className="text-secondary" />
                  {event.dates}
                </div>
                <p className="text-text-muted text-sm leading-relaxed mb-6">{event.description_hi}</p>
                <div className="text-xs font-bold text-primary bg-primary/5 px-3 py-1 rounded-full w-fit">
                  {event.status}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Ongoing Projects */}
        <section>
          <h2 className="text-3xl font-bold text-text-main mb-10 font-serif border-l-4 border-secondary pl-6">Institutional Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {ongoing_projects.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-primary-dark text-white rounded-[3rem] p-10 md:p-14 relative overflow-hidden group shadow-2xl"
              >
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  {index === 0 ? <Construction size={120} /> : <BookOpen size={120} />}
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2 font-serif">{project.title_hi}</h3>
                  <h4 className="text-secondary font-bold tracking-widest uppercase text-xs mb-6">{project.title_en}</h4>
                  <p className="text-white/80 leading-relaxed mb-8">{project.description_hi}</p>
                  <div className="flex items-center gap-2 text-secondary font-bold text-sm">
                    <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                    {project.status}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
