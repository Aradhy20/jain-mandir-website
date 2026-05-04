import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Building, GraduationCap, HeartPulse } from 'lucide-react';

const causes = [
  {
    icon: <Building className="text-primary" size={32} />,
    title: "Temple Maintenance",
    desc: "Help us preserve the structural and spiritual integrity of Jambudweep, Mount Sumeru, and the Kamal Mandir."
  },
  {
    icon: <GraduationCap className="text-primary" size={32} />,
    title: "Educational Support",
    desc: "Funding for our schools and research wings like the <strong className='text-primary-dark'>Jambudweep Institute of Cosmographic Research (DJICR)</strong>."
  },
  {
    icon: <HeartPulse className="text-primary" size={32} />,
    title: "Medical Welfare",
    desc: "Supporting the <strong className='text-primary-dark'>Shri Rishabhdev Janseva Sansthan</strong>, which manages charitable hospitals and medical camps."
  },
  {
    icon: <Heart className="text-primary" size={32} />,
    title: "Social Compassion",
    desc: "General welfare programs, including relief work and spreading the message of Ahimsa (Non-Violence)."
  }
];

export default function Donations() {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Seva & Support</span>
          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-6 font-serif">Contribute to the Mission</h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">Your support helps the <strong className="text-primary-dark">Digambar Jain Trilok Shodh Sansthan</strong> in its global mission of peace and education.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {causes.map((cause, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-6">
                {cause.icon}
              </div>
              <h3 className="text-xl font-bold text-text-main mb-4">{cause.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{cause.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-surface p-6 md:p-12 lg:p-20 rounded-3xl md:rounded-[3rem] md:rounded-[4rem] shadow-sm border border-primary/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-text-main mb-6 font-serif">Bank Transfer Details</h2>
              <p className="text-text-muted mb-8 leading-relaxed">
                You can make a direct contribution via bank transfer. Please share a screenshot of the transaction with us via email for acknowledgment.
              </p>
              <div className="space-y-4 text-base md:text-lg">
                <div className="flex flex-col sm:flex-row justify-between border-b border-gray-100 pb-2 gap-1">
                  <span className="text-text-muted">Account Name</span>
                  <span className="font-bold text-text-main text-right">Shri Digambar Jain Trilok Shodh Sansthan</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between border-b border-gray-100 pb-2 gap-1">
                  <span className="text-text-muted">Bank Name</span>
                  <span className="font-bold text-text-main text-right">State Bank of India</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between border-b border-gray-100 pb-2 gap-1">
                  <span className="text-text-muted">Account Number</span>
                  <span className="font-bold text-text-main text-right tracking-widest">10243685412</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between border-b border-gray-100 pb-2 gap-1">
                  <span className="text-text-muted">IFSC Code</span>
                  <span className="font-bold text-text-main text-right">SBIN0001234</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between border-b border-gray-100 pb-2 gap-1">
                  <span className="text-text-muted">Branch</span>
                  <span className="font-bold text-text-main text-right">Hastinapur, Meerut</span>
                </div>
              </div>
              <p className="mt-10 text-xs text-text-muted italic bg-primary/5 p-4 rounded-xl border border-primary/10">
                * All donations to the Sansthan are tax-exempt under Section 80G of the Income Tax Act. A formal receipt will be issued for all contributions.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-xl border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
              <div className="w-48 h-48 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 border-2 border-dashed border-gray-200 group-hover:border-primary transition-colors">
                <div className="text-center p-4">
                  <Heart className="text-primary/20 mx-auto mb-2" size={48} />
                  <span className="text-[10px] text-gray-400 font-mono uppercase tracking-tighter leading-none block">Scan to Support via UPI</span>
                </div>
              </div>
              <p className="text-xl font-bold text-text-main mb-2">Scan & Donate</p>
              <p className="text-sm text-text-muted text-center max-w-[200px]">Use any UPI app (GPay, PhonePe, Paytm) to contribute instantly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
