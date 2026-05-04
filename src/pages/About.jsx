import React from 'react';
import { motion } from 'framer-motion';
import { Award, Book, Globe, Heart, ShieldCheck, Zap } from 'lucide-react';


export default function About() {
  return (
    <div className="pt-20 pb-24 bg-background min-h-screen relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Modern Hero Section */}
        <section className="py-16 md:py-24 border-b border-gray-100 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Shri Digambar Jain Mandir</span>
              <h1 className="text-4xl md:text-7xl font-bold text-text-main mb-8 font-serif leading-tight">
                Where Ancient <span className="text-primary">Wisdom</span> Meets Science
              </h1>
              <p className="text-xl text-text-muted leading-relaxed mb-10">
                Jambudweep Hastinapur is not just a temple; it is a global center for <strong className="text-primary-dark">Jain Cosmographic Research</strong> and spiritual awakening, envisioned by the greatest Jain saint of our time.
              </p>
              <div className="flex gap-4">
                <button className="bg-primary text-white px-8 py-4 rounded-full font-bold shadow-xl hover:bg-primary-dark transition">Explore History</button>
                <button className="bg-white text-text-main border border-gray-200 px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition">Watch Documentary</button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="relative rounded-3xl md:rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white aspect-[3/4]">
                <img loading="lazy" 
                  src="/jambudweep/gyanmati_mataji_writing.jpg" 
                  alt="Pujya Ganinipramukh Aryika Shri Gyanmati Mataji writing Jain scriptures" 
                  className="w-full h-full object-cover object-top" 
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <p className="font-serif italic text-lg">"The creator of modern Jambudweep"</p>
                  <p className="text-sm font-bold uppercase tracking-widest text-secondary mt-2">Ganinipramukh Gyanmati Mataji</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Cosmic Vision Section */}
        <section className="mb-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-text-main mb-4 font-serif italic">The Cosmic Vision</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto mb-8"></div>
            <p className="max-w-2xl mx-auto text-text-muted">Understanding the geography of the universe through the lens of ancient Jain scriptures.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: "7 Kshetras", desc: "A precise physical model of the seven regions of the middle universe (Madhyalok).", color: "bg-blue-50 text-blue-600" },
              { icon: Zap, title: "Sumeru Parvat", desc: "The 101-foot high architectural marvel representing the center of the universe.", color: "bg-amber-50 text-amber-600" },
              { icon: ShieldCheck, title: "Ahimsa Idol", desc: "Home to the world's tallest 108ft single-stone statue of Lord Rishabhdev.", color: "bg-emerald-50 text-emerald-600" }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[3rem] shadow-sm border border-gray-100 group hover:shadow-xl transition-all"
              >
                <div className={`${feature.color} w-16 h-16 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <feature.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-text-main mb-4 font-serif">{feature.title}</h3>
                <p className="text-text-muted leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Institutional Pillars Grid */}
        <section className="mb-32 bg-primary-dark text-white rounded-3xl md:rounded-[5rem] p-6 md:p-12 lg:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-secondary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Institutional Wings</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 font-serif leading-tight">Preserving Knowledge for Generations</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="bg-white/10 p-4 rounded-2xl h-fit"><Book className="text-secondary" /></div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Veer Gyanoday Granthmala</h4>
                    <p className="text-white/60">Publishing over 300 authoritative volumes on Jain philosophy and history.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="bg-white/10 p-4 rounded-2xl h-fit"><Globe className="text-secondary" /></div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Trilok Shodh Sansthan</h4>
                    <p className="text-white/60">The research engine dedicated to the science of the three-worlds (Trilok).</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="bg-white/10 p-4 rounded-2xl h-fit"><Heart className="text-secondary" /></div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Social Welfare</h4>
                    <p className="text-white/60">Running schools, clinics, and animal shelters under the principle of Compassion.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img loading="lazy" src="/jambudweep/chandnamati_mataji.png" className="rounded-3xl h-80 w-full object-cover shadow-2xl" alt="Scholarship" />
              <img loading="lazy" src="/jambudweep/ravindrakirti_swami.png" className="rounded-3xl h-80 w-full object-cover shadow-2xl mt-8" alt="Management" />
            </div>
          </div>
        </section>

        {/* Golden Timeline (Swarnim Itihas) */}
        <section className="mb-32">
          <div className="text-center mb-20">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Milestones</span>
            <h2 className="text-4xl font-bold text-text-main mb-4 font-serif italic">Golden History</h2>
            <p className="text-text-muted">संस्थान के स्वर्णिम इतिहास की एक झलक</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              { year: "1981", event: "'Jambudweep Gyan Jyoti Seminar' at Hastinapur." },
              { year: "1982", event: "'Gyan Jyoti Rath' tour inaugurated by PM Indira Gandhi." },
              { year: "1997", event: "President Dr. Shankar Dayal Sharma inaugurates Chovisi Vidhan." },
              { year: "1998", event: "PM Atal Bihari Vajpayee inaugurates Rishabhdev Samavsaran Rath." },
              { year: "2008", event: "President Pratibha Patil inaugurates World Peace Conference." },
              { year: "2010", event: "Diamond Jubilee and 31ft idol Panchkalyanak celebrations." }
            ].map((milestone, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-8 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:border-primary/20 transition-all"
              >
                <div className="text-2xl font-bold text-primary font-serif w-24 shrink-0">{milestone.year}</div>
                <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                <div className="text-text-main font-medium">{milestone.event}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* World Record Section - Statue of Ahimsa */}
        <section className="mb-32 bg-secondary/5 rounded-3xl md:rounded-[4rem] p-6 md:p-12 lg:p-24 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <img loading="lazy" src="/use-assets/22.jpg" className="rounded-3xl md:rounded-[3rem] shadow-2xl h-[500px] w-full object-cover" alt="108ft Statue of Ahimsa at Mangi Tungi - A World Record Monument" />
          </div>
          <div className="lg:w-1/2">
            <div className="flex items-center gap-4 text-secondary mb-6">
              <Award size={32} />
              <span className="font-bold tracking-widest uppercase text-sm">Guinness World Record</span>
            </div>
            <h2 className="text-4xl font-bold text-text-main mb-8 font-serif leading-tight">Tallest Jain Idol: 108ft Statue of Ahimsa</h2>
            <p className="text-lg text-text-muted leading-relaxed mb-10">
              The monumental 108-foot idol of Lord Rishabhdev at Mangi-Tungi (Nashik) is a global symbol of peace and non-violence, realized through the tireless efforts of the Sansthan under Mataji's inspiration.
            </p>
            <div className="flex items-center gap-6 p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
              <div className="text-4xl font-bold text-primary font-serif">108'</div>
              <div className="text-sm text-text-muted">Feet tall single stone carving, a marvel of spiritual engineering.</div>
            </div>
          </div>
        </section>

        {/* Legacy of Leadership - National Recognition */}
        <section className="pb-24">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">National Recognition</span>
            <h2 className="text-4xl font-bold text-text-main mb-6 font-serif leading-tight">A Voice for Universal Peace</h2>
            <p className="text-lg text-text-muted max-w-3xl mx-auto">
              Ganinipramukh Shri Gyanmati Mataji's vision has been recognized and honored by the highest offices in India. Over the decades, numerous Presidents, Prime Ministers, and Chief Ministers have sought her blessings.
            </p>
          </div>
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="break-inside-avoid bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all border-[4px] border-white"
              >
                <img loading="lazy" src={`/use-assets/user-leaders/leader-${num}.png`} alt={`National Leader Interaction ${num}`} className="w-full h-auto" />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
