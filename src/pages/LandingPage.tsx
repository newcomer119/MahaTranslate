import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe2, Languages, Mic, MessageSquare, Mail, MapPin, Phone } from 'lucide-react';

const features = [
  {
    icon: <Languages className="w-6 h-6" />,
    title: 'Multiple Languages',
    description: 'Support for Hindi and English translations',
  },
  {
    icon: <Mic className="w-6 h-6" />,
    title: 'Speech Recognition',
    description: 'Advanced speech-to-text capabilities for easy input',
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'Real-time Translation',
    description: 'Instant translations powered by advanced AI models',
  },
];

const trustedBy = [
  'Maharashtra Government',
  'Mumbai Police',
  'BMC',
  'State Universities',
  'District Courts',
];

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B0B1F] text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        {/* Background Stars */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full bg-[url('https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?q=80&w=2072&auto=format&fit=crop')] opacity-20 bg-cover bg-center" />
        </div>

        {/* Navigation */}
        <nav className="relative z-10 container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe2 className="w-8 h-8 text-indigo-400" />
              <span className="text-xl font-bold">MahaTranslate</span>
            </div>
            <button
              onClick={() => navigate('/translate')}
              className="px-4 py-2 bg-indigo-600 rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Start Free
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent">
              The World's Leading Language
              <br />
              Translation Platform
            </h1>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Breaking language barriers in Maharashtra with AI-powered translation technology,
              empowering businesses and citizens with advanced solutions.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/translate')}
                className="px-8 py-4 bg-indigo-600 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate('/docs')}
                className="px-8 py-4 bg-white/10 rounded-full text-lg font-semibold hover:bg-white/20 transition-colors"
              >
                Learn More
              </button>
            </div>
          </motion.div>
        </div>

        {/* Trusted By Section */}
        <div className="relative z-10 container mx-auto px-4 pb-20">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-6">TRUSTED BY</p>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {trustedBy.map((org, index) => (
                <motion.span
                  key={org}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-gray-400 text-lg font-medium"
                >
                  {org}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="relative bg-[#0F0F2D] py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Transform Ideas into Market Solutions</h2>
            <p className="text-gray-400">
              Explore features for managing translations, tracking performance, and analyzing data efficiently.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm"
              >
                <div className="w-12 h-12 bg-indigo-600/20 rounded-full flex items-center justify-center mb-4 text-indigo-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="relative bg-[#0B0B1F] py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
              <p className="text-gray-400">
                Get in touch with our team for any questions or support needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-indigo-400" />
                    <p className="text-gray-400">Mumbai, Maharashtra, India</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-indigo-400" />
                    <p className="text-gray-400">+91 (22) 1234-5678</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-indigo-400" />
                    <p className="text-gray-400">contact@mahatranslate.gov.in</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      className="w-full px-4 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32 resize-none"
                      placeholder="Your message"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-indigo-600 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;