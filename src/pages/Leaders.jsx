import React from 'react';
import { motion } from 'framer-motion';
import leadersData from '../data/leadersData.json';
import { Book, Award, Milestone } from 'lucide-react';

export default function Leaders() {
  const { about_mataji, leaders, institution } = leadersData;

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mataji Section */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] blur-xl"></div>
              <img 
                src="/jambudweep/gyanmati_mataji.png" 
                alt="Gyanmati Mataji" 
                className="relative rounded-[3rem] shadow-2xl w-full h-[650px] object-cover border-8 border-white" 
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Visionary Founder</span>
                <h1 className="text-3xl md:text-4xl font-bold text-text-main mb-2 font-serif leading-tight">{about_mataji.name_hi}</h1>
                <h2 className="text-xl text-primary-dark font-medium">{about_mataji.name_en}</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-lg text-text-main leading-relaxed italic border-l-4 border-primary pl-6 py-2">
                  "{about_mataji.bio_hi}"
                </p>
                <p className="text-text-muted leading-relaxed">
                  {about_mataji.bio_en}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                  <Award className="text-secondary shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold text-text-main mb-1">Academic Honor</h4>
                    <p className="text-sm text-text-muted">Honorary D.Litt. (1995)</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                  <Book className="text-secondary shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold text-text-main mb-1">Master Work</h4>
                    <p className="text-sm text-text-muted">Shatkhandagam Commentary</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Other Leaders Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Spiritual Guidance</span>
            <h2 className="text-4xl font-bold text-text-main mb-6 font-serif">Pujya Guru & Leadership</h2>
            <div className="w-24 h-1 bg-secondary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {leaders.map((leader, index) => (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="w-40 h-40 mx-auto mb-8 rounded-full overflow-hidden border-4 border-surface shadow-lg">
                  <img 
                    src={leader.image} 
                    alt={leader.name_en} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-text-main mb-1 font-serif">{leader.name_hi}</h3>
                  <p className="text-sm text-primary font-bold uppercase tracking-wider mb-6">{leader.role_en}</p>
                  <p className="text-text-muted text-sm leading-relaxed mb-6">{leader.bio_hi}</p>
                  
                  <div className="space-y-3 text-left border-t pt-6">
                    {leader.birth && (
                      <div className="flex gap-3 text-xs">
                        <span className="font-bold text-primary shrink-0 uppercase">Birth:</span>
                        <span className="text-text-muted">{leader.birth}</span>
                      </div>
                    )}
                    {leader.diksha && (
                      <div className="flex gap-3 text-xs">
                        <span className="font-bold text-primary shrink-0 uppercase">Diksha:</span>
                        <span className="text-text-muted">{leader.diksha}</span>
                      </div>
                    )}
                    {leader.president_since && (
                      <div className="flex gap-3 text-xs">
                        <span className="font-bold text-primary shrink-0 uppercase">President:</span>
                        <span className="text-text-muted">Since {leader.president_since}</span>
                      </div>
                    )}
                    {leader.peethadheesh_coronation && (
                      <div className="flex gap-3 text-xs">
                        <span className="font-bold text-primary shrink-0 uppercase">Pithadheesh:</span>
                        <span className="text-text-muted">{leader.peethadheesh_coronation}</span>
                      </div>
                    )}
                    {leader.specialty_hi && (
                      <div className="flex gap-3 text-xs italic bg-primary/5 p-3 rounded-lg">
                        <span className="text-primary-dark">{leader.specialty_hi}</span>
                      </div>
                    )}
                    {leader.titles_hi && (
                      <div className="flex gap-3 text-xs italic bg-secondary/5 p-3 rounded-lg">
                        <span className="text-secondary-dark font-medium">{leader.titles_hi}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Institution Section */}
        <section className="bg-primary/5 rounded-[4rem] p-12 md:p-20 text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-primary-dark mb-4 font-serif">{institution.name_hi}</h2>
            <h3 className="text-xl text-text-main mb-8 font-medium">{institution.name_en}</h3>
            <p className="text-lg text-text-muted max-w-3xl mx-auto mb-12">
              {institution.mission_hi}<br/>
              <span className="text-sm italic">{institution.mission_en}</span>
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {institution.projects.map((project, i) => (
                <span key={i} className="bg-white text-primary font-bold px-6 py-3 rounded-full shadow-sm border border-primary/10">
                  {project}
                </span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Managing Committee */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-text-main mb-8 font-serif">Trust Committee</h3>
            <div className="space-y-6">
              <div className="pb-6 border-b border-gray-100">
                <span className="text-primary text-xs font-bold uppercase tracking-widest block mb-2">General Secretary</span>
                <p className="text-xl font-bold text-text-main">{leadersData.trust_committee.general_secretary.name_hi}</p>
                <p className="text-sm text-text-muted">{leadersData.trust_committee.general_secretary.name_en}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {leadersData.trust_committee.members.map((m, i) => (
                  <div key={i}>
                    <p className="font-bold text-text-main">{m.name_hi}</p>
                    <p className="text-xs text-text-muted">{m.name_en}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-text-main mb-8 font-serif">Administrative Heads</h3>
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold">M</span>
                </div>
                <div>
                  <span className="text-primary text-xs font-bold uppercase tracking-widest block mb-1">Manager</span>
                  <p className="text-xl font-bold text-text-main">{leadersData.administration.manager.name_hi}</p>
                  <p className="text-sm text-text-muted">{leadersData.administration.manager.name_en}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center shrink-0">
                  <span className="text-secondary font-bold">A</span>
                </div>
                <div>
                  <span className="text-secondary text-xs font-bold uppercase tracking-widest block mb-1">Chief Accountant</span>
                  <p className="text-xl font-bold text-text-main">{leadersData.administration.accountant.name_hi}</p>
                  <p className="text-sm text-text-muted">{leadersData.administration.accountant.name_en}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
