
import React, { useState } from 'react';
import { CONTACT_INFO, SOCIAL_LINKS } from '../constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Booking Inquiry',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    
    // Construct the email body including the user's email
    const emailBody = `Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}`;

    // Construct mailto link with encoded parameters
    const mailtoUrl = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject + ' - ' + name)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open default email client
    window.location.href = mailtoUrl;
  };

  return (
    <div className="max-w-7xl mx-auto pt-8 animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Contact & Booking</h2>
        <p className="text-gray-400">Get in touch for features, shows, and interviews.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {/* Direct Contact Card */}
        <div className="bg-glass backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-ghanaGold transition-colors">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-ghanaGold">
            <i className="fas fa-address-card"></i> Management
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-ghanaRed shrink-0">
                <i className="fas fa-envelope"></i>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Email For Bookings</div>
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-white font-medium hover:text-ghanaGold break-all">
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-ghanaGreen shrink-0">
                <i className="fab fa-whatsapp"></i>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">WhatsApp / Phone</div>
                <a href={CONTACT_INFO.whatsapp} target="_blank" rel="noreferrer" className="text-white font-medium hover:text-ghanaGold">
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-ghanaGold shrink-0">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Base Location</div>
                <div className="text-white font-medium">
                  {CONTACT_INFO.location}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Message Form */}
        <div className="bg-glass backdrop-blur-md rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
            <i className="fas fa-paper-plane"></i> Send a Message
          </h3>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs uppercase text-gray-400 mb-1">Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-ghanaGold transition-colors"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-gray-400 mb-1">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-ghanaGold transition-colors"
                placeholder="Your Email Address"
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-gray-400 mb-1">Subject</label>
              <select 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-ghanaGold transition-colors"
              >
                <option>Booking Inquiry</option>
                <option>Feature Request</option>
                <option>Press / Interview</option>
                <option>Fan Mail</option>
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase text-gray-400 mb-1">Message</label>
              <textarea 
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-ghanaGold transition-colors"
                placeholder="How can we work together?"
                required
              ></textarea>
            </div>
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-ghanaGreen to-ghanaGreen/80 hover:from-ghanaGreen hover:to-white/20 text-white font-bold py-3 rounded-lg shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 duration-200"
            >
              Send Email
            </button>
          </form>
        </div>
      </div>

      <div className="text-center mt-12">
        <h3 className="text-lg font-medium mb-6">Connect on Social Media</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {SOCIAL_LINKS.filter(l => !['Email', 'WhatsApp'].includes(l.platform)).map((link, idx) => (
            <a 
              key={idx}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-ghanaGold transition-all active:scale-95 duration-200"
            >
              <i className={`${link.iconClass} text-ghanaGold`}></i>
              <span>{link.platform}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
