import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  History, 
  MapPin, 
  Award, 
  Camera, 
  BookOpen, 
  Zap, 
  Milestone, 
  ChevronRight, 
  Maximize2, 
  X,
  Play
} from 'lucide-react';

// --- UI HELPER COMPONENTS ---
const CroppedImage = ({ src, alt, crop, className = "" }) => {
  // crop format: { x: percentage (0-100), y: percentage (0-100), zoom: multiplier }
  // x/y: Center point of the crop relative to the original image.
  return (
    <div 
      className={`overflow-hidden relative bg-gray-50 ${className}`}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: crop.zoom === 1 ? 'cover' : `${crop.zoom * 100}%`,
        backgroundPosition: `${crop.x}% ${crop.y}%`,
        backgroundRepeat: 'no-repeat'
      }}
      role="img"
      aria-label={alt}
    />
  );
};

// Extracted Data from Scanned Pages
const jambudweepTimeline = [
  {
    year: "Ancient Era",
    title: "The Cradle of Tirthankaras",
    desc: "Hastinapur served as the birthplace of the 16th, 17th, and 18th Tirthankaras (Shantinath, Kunthunath, and Arhanath). It is the sacred land where Emperor Bharat established the capital of Bharatvarsh."
  },
  {
    year: "1965",
    title: "The Divine Vision",
    desc: "While in meditation at Shravanabelagola, Ganinipramukh Shri Gyanmati Mataji had a profound vision of the 'Madhyalok' (middle universe). She later found this vision perfectly matched the descriptions in the ancient scripture 'Tiloyapannatti'."
  },
  {
    year: "1972",
    title: "Foundation Stone",
    desc: "The foundation stone of the Jambudweep project was laid in June 1972, initiating the creation of the world's first three-dimensional model of Jain cosmology."
  },
  {
    year: "1982",
    title: "Jambudweep Gyanjyoti",
    desc: "Prime Minister Indira Gandhi flagged off the 'Jambudweep Gyanjyoti' chariot from the Red Fort, Delhi. This historic 1045-day national journey spread the message of universal peace and Jain cosmology across India."
  },
  {
    year: "1985",
    title: "Grand Dedication",
    desc: "The massive 250ft diameter Jambudweep model and the 101ft Mount Sumeru were completed and dedicated to the world. The 'Akhand Gyanjyoti' was established by P.V. Narasimha Rao."
  },
  {
    year: "2008",
    title: "Presidential Visit",
    desc: "Her Excellency President Pratibha Patil visited Jambudweep for the World Peace Non-Violence Conference, acknowledging the site as a global center for spiritual and scientific research."
  }
];

const monuments = [
  {
    id: "sumeru",
    title: "Mount Sumeru",
    subtitle: "Center of the Universe",
    desc: "A 101-foot architectural marvel crafted from light pink marble, representing the axis of the Jain universe with 136 internal steps and 16 Jinayalyas.",
    image: "/use-assets/18.jpg",
    stats: "101 FT Tall",
    crop: { x: 50, y: 50, zoom: 1.5 }
  },
  {
    id: "kamal",
    title: "Lotus Temple",
    subtitle: "Symbol of Purity",
    desc: "The unique Kamal Mandir, sitting gracefully in a water body, houses a 10.25ft idol of Bhagwan Mahavir, symbolizing the blossoming of spiritual consciousness.",
    image: "/use-assets/lotus_temple_wiki.jpeg",
    stats: "Floating Design",
    crop: { x: 50, y: 50, zoom: 1.5 }
  },
  {
    id: "terah",
    title: "Terahdweep Jinayalaya",
    subtitle: "Cosmic Representation",
    desc: "A stunning miniature model of the 13 islands of the Jain universe, featuring 458 individual temples and intricate geographical details.",
    image: "/use-assets/1.jpg",
    stats: "458 Temples",
    crop: { x: 50, y: 50, zoom: 1.5 }
  },
  {
    id: "ashtapad",
    title: "Ashtapad Jinayalaya",
    subtitle: "72 Eternal Temples",
    desc: "A magnificent mountain-like structure representing the sacred Ashtapad, housing 72 temples that honor the Tirthankaras of the past, present, and future.",
    image: "/jambudweep/page_14.png",
    stats: "Mountain Peak",
    crop: { x: 56, y: 28, zoom: 4.5 }
  },
  {
    id: "teenlok",
    title: "Teenlok Tower",
    subtitle: "The Vertical Universe",
    desc: "A vertical architectural marvel representing the three worlds. Features a high-speed lift carrying pilgrims to the Siddhashila (highest peak) in seconds.",
    image: "/jambudweep/page_11.png",
    stats: "High-Speed Lift",
    crop: { x: 77, y: 55, zoom: 3.5 }
  },
  {
    id: "navgrah",
    title: "Navgrah Shanti Jinayalaya",
    subtitle: "Planetary Harmony",
    desc: "The first temple of its kind in North India, featuring nine lotus-shaped pedestals dedicated to the nine planets and their corresponding spiritual masters.",
    image: "/jambudweep/page_14.png",
    stats: "Astro-Spirituality",
    crop: { x: 55, y: 68, zoom: 4.5 }
  }
];

const facilities = [
  {
    title: "Raja Shreyans Bhojnalaya",
    desc: "A massive dining hall with a capacity of 500 pilgrims, serving pure satvik meals with traditional hospitality.",
    image: "/jambudweep/page_17.png",
    crop: { x: 17, y: 55, zoom: 5.5 }
  },
  {
    title: "Deluxe Guest Houses",
    desc: "Over 200 modern rooms and 50+ deluxe flats providing comfortable stay for international and local pilgrims.",
    image: "/jambudweep/page_17.png",
    crop: { x: 42, y: 28, zoom: 5.5 }
  },
  {
    title: "Namokar Mantra Bank",
    desc: "A spiritual treasury where devotees have submitted over 12.5 million handwritten Namokar Mantras.",
    image: "/jambudweep/page_14.png",
    crop: { x: 25, y: 68, zoom: 5.0 }
  }
];

const satelliteTirths = [
  {
    title: "Statue of Ahimsa (Mangi-Tungi)",
    location: "Nashik, Maharashtra",
    desc: "Guinness World Record: The world's tallest 108ft statue of Bhagwan Adinath, carved from a single grey granite stone.",
    image: "/jambudweep/statue_of_ahimsa_premium.png",
    crop: { x: 50, y: 50, zoom: 1 }
  },
  {
    title: "Ayodhya Tirth Development",
    location: "Ayodhya, UP",
    desc: "The birthplace of five Tirthankaras, featuring a 31ft Adinath statue and a magnificent Trikal Chaubisi complex.",
    image: "/use-assets/ayodhya_tirth_hero.jpeg",
    crop: { x: 50, y: 50, zoom: 1 }
  },
  {
    title: "Kailash Parvat (Prayag)",
    location: "Prayagraj, UP",
    desc: "A 50ft model of the sacred Kailash mountain, including a cave temple and the Tapovan of Lord Adinath.",
    image: "/jambudweep/page_20.png",
    crop: { x: 25, y: 35, zoom: 2.5 }
  },
  {
    title: "Sammed Shikhar Replica",
    location: "Madhorajpura, Jaipur",
    desc: "A grand replica of the holiest Jain mountain, featuring 24 shrines and the Diksha Tirth of Mataji.",
    image: "/jambudweep/page_24.png",
    crop: { x: 50, y: 45, zoom: 2.5 }
  }
];


const spiritualExperiences = [
  {
    title: "Nauka Vihar (Sacred Boating)",
    desc: "Perform a unique 'Parikrama' of the Jambudweep model by boat in the surrounding Lavana Ocean.",
    icon: Globe,
    image: "/use-assets/nauka_vihar_clean.png",
    crop: { x: 50, y: 50, zoom: 1 }
  },
  {
    title: "Airavat Elephant Parikrama",
    desc: "A giant structural elephant that carries devotees on its back, offering a royal spiritual perspective.",
    icon: Milestone,
    image: "/use-assets/airavat_elephant_clean.png",
    crop: { x: 50, y: 50, zoom: 1 }
  },
  {
    title: "Dhyan Mandir (Grass Dome)",
    desc: "A serene, grass-covered meditation dome designed for deep silence and inner research.",
    icon: Zap,
    image: "/use-assets/12.jpg",
    crop: { x: 50, y: 50, zoom: 1 }
  }
];

const institutions = [
  {
    title: "Shantisagar Pravachan Hall",
    desc: "A grand, naturally lit auditorium with a seating capacity of 1000 devotees, serving as the spiritual heart for daily discourses and seminars.",
    icon: BookOpen,
    image: "/use-assets/pravachan_hall.png",
    crop: { x: 50, y: 50, zoom: 1 }
  },
  {
    title: "Jambudweep Pustakalaya & Shodh Peeth",
    desc: "A massive multi-story library housing over 15,000 ancient manuscripts, Agamas, and modern spiritual texts to support global Jain scholars.",
    icon: BookOpen,
    image: "/use-assets/library.png",
    crop: { x: 50, y: 50, zoom: 1 }
  },
  {
    title: "Namokar Mahamantra Bank",
    desc: "Established in 1995, this sacred repository holds millions of hand-written Namokar Mantras submitted by devotees globally to promote universal peace.",
    icon: BookOpen,
    image: "/use-assets/namokar_bank.png",
    crop: { x: 50, y: 50, zoom: 1 }
  }
];

const galleryImages = [
  { id: 1, src: '/use-assets/16.jpg', title: 'Aerial View of Campus', category: 'Campus', crop: { x: 50, y: 50, zoom: 1 } },
  { id: 2, src: '/use-assets/18.jpg', title: 'Majestic Mount Sumeru', category: 'Architecture', crop: { x: 50, y: 50, zoom: 1 } },
  { id: 3, src: '/use-assets/lotus_temple_wiki.jpeg', title: 'Kamal Mandir (Lotus Temple)', category: 'Architecture', crop: { x: 50, y: 50, zoom: 1 } },
  { id: 4, src: '/use-assets/1.jpg', title: 'Terahdweep Representation', category: 'Cosmology', crop: { x: 50, y: 50, zoom: 1 } },
  { id: 5, src: '/use-assets/13.jpg', title: 'Sacred Architecture', category: 'Architecture', crop: { x: 50, y: 50, zoom: 1 } },
  { id: 6, src: '/jambudweep/statue_of_ahimsa_premium.png', title: 'Statue of Ahimsa', category: 'Architecture', crop: { x: 50, y: 50, zoom: 1 } },
  { id: 7, src: '/use-assets/22.jpg', title: 'Mangi Tungi Monument', category: 'Historical', crop: { x: 50, y: 50, zoom: 1 } },
  { id: 8, src: '/use-assets/15.jpg', title: 'Campus Grounds', category: 'Campus', crop: { x: 50, y: 50, zoom: 1 } }
];

export default function Jambudweep() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [filter, setFilter] = useState('All');

  const filteredGallery = filter === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  const categories = ['All', 'Campus', 'Historical', 'Architecture', 'Cosmology', 'Events'];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      
      {/* 🏛 Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img loading="lazy" 
            src="/use-assets/16.jpg" 
            alt="Aerial view" 
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/60 via-primary-dark/40 to-background"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-secondary font-bold tracking-[0.4em] uppercase text-sm mb-6 block drop-shadow-lg">
              The Cosmic Center of Jainism
            </span>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 font-serif tracking-tight drop-shadow-2xl">
              Jambudweep <br />
              <span className="text-secondary italic">Hastinapur</span>
            </h1>
            <p className="text-white/90 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-12 font-light drop-shadow-lg">
              A 30-acre spiritual masterpiece where ancient cosmology meets architectural grandeur. Explore the cradle of Tirthankaras.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button 
                onClick={() => document.getElementById('history-timeline')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-secondary text-primary-dark font-bold px-10 py-4 rounded-full shadow-2xl hover:bg-white transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                Explore The History <ChevronRight size={20} />
              </button>
              <button 
                onClick={() => document.getElementById('visual-gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold px-10 py-4 rounded-full hover:bg-white/20 transition-all flex items-center gap-2"
              >
                <Play size={20} /> Virtual Darshan
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest">Scroll to Discover</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
        </div>
      </section>

      {/* 📜 About & Golden History Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Antiquity of Hastinapur</span>
              <h2 className="text-4xl md:text-3xl md:text-5xl font-bold text-text-main mb-8 font-serif leading-tight">
                Where the <span className="text-secondary">Golden Pages</span> <br /> of History Were Written
              </h2>
              <p className="text-text-muted text-lg mb-8 leading-relaxed">
                Hastinapur is more than just a place; it is the physical manifestation of spiritual greatness. As the birthplace of three Tirthankaras and the capital of Emperor Bharat, every stone here tells a story of sacrifice, wisdom, and eternal peace.
              </p>
              <div className="space-y-6">
                <div className="flex gap-6 items-start">
                  <div className="p-3 bg-secondary/10 rounded-2xl text-secondary">
                    <Globe size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-text-main mb-1">Center of World Peace</h4>
                    <p className="text-text-muted">Historically recognized as the cradle of great men, bridging ancient wisdom with the modern world.</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-text-main mb-1">Cosmographic Research</h4>
                    <p className="text-text-muted">A dedicated institute providing physical form to complex Jain mathematical models of the universe.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative rounded-3xl md:rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-background">
                  <img loading="lazy" src="/jambudweep/page_2.png" alt="History" className="w-full h-auto" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 to-transparent"></div>
                </div>
                {/* Floating Quote */}
                <div className="absolute -bottom-10 -left-10 bg-secondary p-8 rounded-[2.5rem] shadow-2xl max-w-sm hidden md:block border-4 border-white">
                  <p className="text-primary-dark font-serif italic text-lg leading-relaxed">
                    "India is the cradle of great men. Hastinapur is the cradle of Tirthankaras."
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* 🗺 Jambudweep Darshan (Grand Map) Section */}
        <section className="py-32 bg-background border-t border-gray-100 overflow-hidden relative">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
              >
                The Cosmological Masterpiece
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl md:text-6xl font-bold text-text-main mb-6 font-serif"
              >
                Jambudweep <span className="text-secondary">Darshan</span>
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
                className="text-text-muted text-lg max-w-3xl mx-auto leading-relaxed"
              >
                Witness the grand 250-foot diameter physical representation of the Jain middle universe (Madhyalok). This architectural masterpiece precisely depicts the continents, oceans, and mountains described in ancient scriptures using intricate white and colored marble stones. At its center stands the majestic 101-foot Mount Sumeru.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative rounded-3xl md:rounded-[4rem] overflow-hidden shadow-2xl border-[8px] border-white group"
            >
              <div className="aspect-[16/9] w-full relative bg-gray-100">
                <CroppedImage 
                  src="/jambudweep/page_3.png" 
                  alt="Jambudweep Darshan Map" 
                  crop={{ x: 50, y: 50, zoom: 1.0 }}
                  className="w-full h-full transform transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              
              {/* Interactive overlay elements */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-10">
                <div className="flex items-center gap-4 mb-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                    <Globe size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-white">The Middle Universe</h3>
                    <p className="text-white/80">A 250-meter diameter circular structural model.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 📡 Satellite Tirthas Section */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-24">
              <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">National Impact</span>
              <h2 className="text-3xl md:text-5xl font-serif text-primary-dark mb-6">Pan-India Spiritual Missions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto italic">
                Extending the architectural and spiritual excellence of Jambudweep to the most sacred birthplaces and penance grounds of India.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {satelliteTirths.map((tirth, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col md:flex-row bg-background rounded-3xl md:rounded-[3rem] overflow-hidden group shadow-lg hover:shadow-2xl transition-all border border-gray-100"
                >
                  <div className="md:w-1/2 h-80 overflow-hidden relative">
                    <CroppedImage 
                      src={tirth.image} 
                      alt={tirth.title}
                      crop={tirth.crop}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
                    <span className="text-primary-green font-bold text-xs uppercase tracking-widest mb-2">{tirth.location}</span>
                    <h3 className="text-2xl font-serif text-primary-dark mb-4">{tirth.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{tirth.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 🏛 Nearby Sacred Sites Section */}
        <section className="py-32 bg-background border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-24">
              <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Explore Hastinapur</span>
              <h2 className="text-3xl md:text-5xl font-serif text-primary-dark mb-6">Nearby Sacred Sites</h2>
              <p className="text-gray-600 max-w-2xl mx-auto italic">
                Hastinapur is a cluster of divine energy. Visit these ancient and modern architectural marvels located just minutes away from Jambudweep.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Prachin Bada Mandir",
                  desc: "The oldest Jain temple in Hastinapur, built in 1801, housing the main shrine of Lord Shantinatha.",
                  image: "/use-assets/bada_mandir.png"
                },
                {
                  title: "Kailash Parvat",
                  desc: "A 131-foot high modern architectural marvel dedicated to Bhagwan Rishabhanatha.",
                  image: "/use-assets/kailash_parvat.png"
                },
                {
                  title: "Ashtapad Tirth",
                  desc: "A towering temple complex representing the sacred mountain where Lord Rishabhdev attained Nirvana.",
                  image: "/use-assets/ashtapad_tirth.png"
                }
              ].map((site, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
                >
                  <div className="h-64 overflow-hidden relative">
                    <img src={site.image} alt={site.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-serif text-primary-dark mb-4">{site.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{site.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 📚 Knowledge & Devotion Centers */}
        <section className="py-24 bg-background relative border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-3xl md:text-5xl font-serif text-primary-dark mb-6">Knowledge & Devotion Centers</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Institutions dedicated to the preservation of ancient wisdom, scholarly research, and continuous spiritual practice.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {institutions.map((inst, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-56 rounded-2xl overflow-hidden mb-6">
                    <CroppedImage 
                      src={inst.image} 
                      alt={inst.title}
                      crop={inst.crop}
                      className="w-full h-full transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <h3 className="text-2xl font-serif text-primary-dark mb-3 group-hover:text-primary transition-colors">{inst.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{inst.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 🏡 Pilgrim Facilities Section */}
        <section className="py-32 bg-primary-dark text-white rounded-3xl md:rounded-[5rem] mx-4 md:mx-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <img loading="lazy" src="/use-assets/16.jpg" alt="background" className="w-full h-full object-cover" />
          </div>
          <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="lg:w-1/2">
                <span className="text-secondary font-bold tracking-widest uppercase text-xs mb-4 block">Pilgrim Comfort</span>
                <h2 className="text-3xl md:text-5xl md:text-7xl font-serif mb-8">Sacred <span className="text-secondary">Hospitality</span></h2>
                <p className="text-white/60 text-lg mb-12 leading-relaxed">
                  Experience a stay that balances spiritual discipline with modern comfort. Our facilities are designed to support your inward journey.
                </p>
                <div className="space-y-10">
                  {facilities.map((item, idx) => (
                    <div key={idx} className="flex gap-8 items-start">
                      <div className="w-28 h-28 flex-shrink-0 rounded-[2rem] overflow-hidden border-2 border-white/10">
                        <CroppedImage src={item.image} alt={item.title} crop={item.crop} className="w-full h-full" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-serif text-secondary mb-2">{item.title}</h4>
                        <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="aspect-[4/5] rounded-3xl md:rounded-[4rem] overflow-hidden border-[12px] border-white/5 shadow-3xl">
                  <CroppedImage 
                  src="/jambudweep/page_17.png" 
                  alt="Guest House" 
                  crop={{ x: 16, y: 30, zoom: 5.5 }}
                  className="w-full h-full"
                />
                </div>
                <div className="absolute -bottom-10 -right-10 bg-secondary p-6 md:p-10 rounded-3xl md:rounded-[3rem] text-primary-dark shadow-2xl border-4 border-primary-dark">
                  <p className="text-3xl md:text-5xl font-serif font-bold">200+</p>
                  <p className="text-xs uppercase font-bold tracking-[0.2em]">Modern Suites</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* ⏳ Timeline Section */}
      <section id="history-timeline" className="py-32 bg-background border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-3xl md:text-5xl font-bold text-primary-dark font-serif mb-6">The Journey of Enlightenment</h2>
            <div className="w-24 h-1 bg-secondary mx-auto"></div>
          </div>

          <div className="relative">
            {/* Horizontal Line */}
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-200 -translate-y-1/2 hidden lg:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {jambudweepTimeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative bg-white p-6 md:p-10 rounded-3xl md:rounded-[3rem] shadow-sm border border-gray-100 group hover:shadow-2xl transition-all duration-500"
                >
                  <div className="absolute -top-6 left-10 bg-secondary text-primary-dark px-6 py-2 rounded-full font-bold shadow-lg group-hover:scale-110 transition-transform">
                    {item.year}
                  </div>
                  <h3 className="text-2xl font-bold text-text-main mb-4 mt-4 font-serif">{item.title}</h3>
                  <p className="text-text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🎡 Spiritual Experiences Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Interactive Devotion</span>
            <h2 className="text-4xl md:text-3xl md:text-5xl font-bold text-text-main font-serif">Immersive <span className="text-secondary">Experiences</span></h2>
            <p className="text-text-muted mt-6 max-w-2xl mx-auto text-lg">
              Beyond viewing, Jambudweep offers unique ways to connect with ancient wisdom through physical interaction and participation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {spiritualExperiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative h-64 rounded-[2.5rem] overflow-hidden mb-6 shadow-lg border border-gray-100">
                  <CroppedImage 
                    src={exp.image} 
                    alt={exp.title}
                    crop={exp.crop}
                    className="w-full h-full transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors pointer-events-none"></div>
                  <div className="absolute top-6 left-6 p-3 bg-white/90 backdrop-blur-md rounded-2xl text-primary shadow-sm">
                    <exp.icon size={20} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-text-main mb-3 group-hover:text-primary transition-colors">{exp.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{exp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🛕 Architectural Wonders (Monuments) */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Architectural Marvels</span>
              <h2 className="text-4xl md:text-3xl md:text-5xl font-bold text-text-main font-serif">A Physical Map of <br /> the <span className="text-secondary">Jain Universe</span></h2>
            </div>
            <p className="text-text-muted text-lg max-w-sm">
              Discover the monumental symbols of cosmology that have turned Hastinapur into a global hub for spiritual inquiry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {monuments.map((monument, index) => (
              <motion.div
                key={monument.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group relative h-[600px] rounded-3xl md:rounded-[4rem] overflow-hidden shadow-xl"
              >
                <CroppedImage 
                  src={monument.image} 
                  alt={monument.title}
                  crop={monument.crop}
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/20 to-transparent"></div>
                
                <div className="absolute top-10 left-10">
                  <div className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-2xl shadow-lg flex items-center gap-2">
                    <Milestone size={16} className="text-primary" />
                    <span className="text-xs font-bold text-text-main uppercase tracking-widest">{monument.stats}</span>
                  </div>
                </div>

                <div className="absolute bottom-12 left-12 right-12 text-white">
                  <span className="text-secondary font-bold text-sm uppercase tracking-[0.3em] mb-4 block">{monument.subtitle}</span>
                  <h3 className="text-4xl font-bold mb-6 font-serif">{monument.title}</h3>
                  <p className="text-white/70 text-lg mb-8 max-w-md line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                    {monument.desc}
                  </p>
                  <button className="flex items-center gap-3 text-secondary font-bold uppercase tracking-widest hover:text-white transition-colors group/btn">
                    Discover More
                    <div className="w-12 h-[2px] bg-secondary group-hover/btn:w-20 transition-all"></div>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🖼 Premium Gallery (Pinterest Style) */}
      <section id="visual-gallery" className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-3xl md:text-5xl font-bold text-primary-dark font-serif mb-8 text-center">Visual Chronicles</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${
                    filter === cat 
                      ? 'bg-primary text-white shadow-xl' 
                      : 'bg-white text-text-muted hover:bg-gray-100 border border-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            <AnimatePresence>
              {filteredGallery.map((img) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -10 }}
                  className="break-inside-avoid relative rounded-[2.5rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 group bg-white"
                  onClick={() => setSelectedImg(img)}
                >
                  <CroppedImage 
                    src={img.src} 
                    alt={img.title} 
                    crop={img.crop}
                    className="w-full aspect-[4/5]" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                    <span className="text-secondary font-bold text-[10px] uppercase tracking-widest mb-2">{img.category}</span>
                    <h4 className="text-white font-bold text-lg">{img.title}</h4>
                  </div>
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-white/20 backdrop-blur-md p-2.5 rounded-full text-white border border-white/20">
                      <Maximize2 size={16} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 🧑🤝🧑 Presidential Legacy Section */}
      <section className="py-32 bg-primary-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-primary/10 blur-[80px] rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="grid grid-cols-2 gap-4">
                <img loading="lazy" src="/use-assets/14.jpg" alt="Campus View" className="rounded-3xl shadow-2xl border-4 border-white/10 h-64 object-cover" />
                <div className="flex flex-col gap-4 mt-8">
                  <div className="bg-secondary p-8 rounded-3xl text-primary-dark text-center shadow-2xl">
                    <span className="text-4xl font-bold block mb-1">2008</span>
                    <span className="text-xs font-bold uppercase tracking-widest">Historic Year</span>
                  </div>
                  <img loading="lazy" src="/use-assets/11.jpg" alt="Architectural Marvel" className="rounded-3xl shadow-2xl border-4 border-white/10 h-full object-cover" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <span className="text-secondary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Presidential Endorsement</span>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 font-serif leading-tight">
                A Landmark for <br /> <span className="text-secondary italic">Global Peace</span>
              </h2>
              <p className="text-white/70 text-xl leading-relaxed mb-10">
                In a historic first for the Meerut district, Her Excellency **President Pratibha Devisingh Patil** graced Jambudweep in 2008. Her visit for the 'World Peace Non-Violence Conference' cemented the site's reputation as a sanctuary for universal harmony.
              </p>
              <blockquote className="border-l-4 border-secondary pl-8 py-2 italic text-2xl text-white/90 mb-10 font-serif">
                "The message of Ahimsa is the most powerful tool for humanity, and Jambudweep is its physical flame."
              </blockquote>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center border border-secondary/30">
                  <Award size={32} className="text-secondary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Inauguration of Ahimsa Sammelan</h4>
                  <p className="text-white/50 text-sm">21st December 2008 • Hastinapur</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ⚡ Footer CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-main font-serif mb-6">Plan Your Spiritual Pilgrimage</h2>
            <p className="text-text-muted text-lg mb-12">
              Experience the cosmic serenity of Hastinapur in person. Jambudweep is open daily for devotees and seekers from around the world.
            </p>
            <div className="bg-background p-6 md:p-10 rounded-3xl md:rounded-[4rem] shadow-inner border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6 text-left">
                <div className="p-4 bg-primary rounded-2xl text-white shadow-lg shadow-primary/20">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-text-main">Visit Our Campus</h4>
                  <p className="text-text-muted text-sm italic">Hastinapur, Uttar Pradesh, India</p>
                </div>
              </div>
              <a 
                href="https://maps.app.goo.gl/nC3Arkoe1jCwaz7v8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary-dark text-white px-10 py-4 rounded-full font-bold shadow-2xl hover:bg-primary transition-all text-center"
              >
                Get Directions
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative max-w-5xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img loading="lazy" src={selectedImg.src} alt={selectedImg.title} className="max-h-[70vh] w-auto rounded-2xl shadow-2xl border border-white/10" />
              <div className="mt-8 text-center">
                <span className="text-secondary font-bold text-xs uppercase tracking-[0.4em] mb-3 block">{selectedImg.category}</span>
                <h2 className="text-4xl font-bold text-white font-serif mb-2">{selectedImg.title}</h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
