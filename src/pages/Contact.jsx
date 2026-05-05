import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Globe, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to send message. Please check if the backend is running.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Visit Us</span>
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-6 font-serif">Get in Touch</h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">Plan your spiritual journey to Jambudweep, Hastinapur.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[3rem] shadow-sm border border-gray-100 space-y-8"
          >
            <div className="flex gap-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="text-primary" size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-text-main mb-2">Location</h4>
                <p className="text-text-muted leading-relaxed">
                  Shri Digambar Jain Atishaya Kshetra, Jambudweep<br/>
                  Jain Temple Road, Hastinapur,<br/>
                  District Meerut, Uttar Pradesh<br/>
                  PIN - 250404, India
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="text-primary" size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-text-main mb-2">Contact Numbers</h4>
                <p className="text-text-muted leading-relaxed">
                  Landline: (01233) 280184, 280236<br/>
                  Main Office: +91 121 281846<br/>
                  Mobile: +91 94127 08203, +91 94110 25124
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Globe className="text-primary" size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-text-main mb-2">Digital Presence</h4>
                <div className="space-y-1">
                  <a href="http://www.jambudweep.org" target="_blank" rel="noopener noreferrer" className="block text-primary hover:underline">www.jambudweep.org</a>
                  <a href="http://www.encyclopediaofjainism.com" target="_blank" rel="noopener noreferrer" className="block text-primary hover:underline">www.encyclopediaofjainism.com</a>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
              <div className="flex gap-4">
                <Mail className="text-primary" size={20} />
                <p className="text-text-muted text-sm">ravindrajain@jambudweep.org</p>
              </div>
              <div className="flex gap-4">
                <Mail className="text-primary" size={20} />
                <p className="text-text-muted text-sm">jambudweeptirth@gmail.com</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-surface p-6 md:p-10 rounded-3xl md:rounded-[3rem] shadow-xl border border-primary/5"
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-text-main mb-8 font-serif">Send us a Message</h3>
                  
                  <div>
                    <label className="block text-sm font-semibold text-text-main mb-2">Full Name</label>
                    <input 
                      required 
                      name="name"
                      type="text" 
                      className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/5 transition outline-none" 
                      placeholder="Your Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-main mb-2">Email Address</label>
                    <input 
                      required 
                      name="email"
                      type="email" 
                      className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/5 transition outline-none" 
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-main mb-2">Message</label>
                    <textarea 
                      required 
                      rows="4" 
                      name="message"
                      className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/5 transition outline-none resize-none" 
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <button 
                    disabled={loading}
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8">
                    <CheckCircle size={48} />
                  </div>
                  <h3 className="text-3xl font-bold text-text-main mb-4 font-serif">Message Sent!</h3>
                  <p className="text-text-muted mb-10 leading-relaxed">
                    Thank you for reaching out. Our team will get back to you shortly.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-primary font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Full Width Map Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl md:rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white h-[450px]"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3487.653456789!2d78.0075343!3d29.1643924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390b8bfad21438b9%3A0x4ade9850fb6729e8!2sDigamber%20Jain%20Mandir%20-%20Jambu%20Dweep%20Rachna!5e0!3m2!1sen!2sin!4v1714900000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </div>
  );
}
