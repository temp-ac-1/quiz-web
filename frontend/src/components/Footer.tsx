import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Twitter, 
  Github, 
  Linkedin, 
  Mail, 
  Code2, 
  Heart,
  Cpu,
  Zap,
  Lock,
  Brain,
  Network,
  Code,
  Terminal
} from 'lucide-react';
import { Button } from '../components/ui/button';

const Footer = () => {
  return (
    <>
      {/* Full-width background container */}
      <div className="w-full relative overflow-hidden bg-gray-900/80 backdrop-blur-2xl border-t border-cyan-400/30">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 243, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 243, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            backgroundPosition: 'center center'
          }} />
        </div>

        {/* Glowing orb effects */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        {/* Inner content container */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20">
                  <Shield className="w-8 h-8 text-cyan-400" />
                </div>
                <span className="text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text font-bold text-3xl tracking-tighter">
                  CYBERVEER
                </span>
              </div>
              <p className="text-gray-400 mb-6 text-lg leading-relaxed">
                Level up your cybersecurity skills through immersive challenges, real-world scenarios, and cutting-edge learning experiences.
              </p>
              <div className="flex space-x-3">
                {[
                  { icon: Twitter, color: 'hover:text-cyan-400' },
                  { icon: Github, color: 'hover:text-purple-400' },
                  { icon: Linkedin, color: 'hover:text-blue-400' },
                  { icon: Mail, color: 'hover:text-pink-400' }
                ].map((Social, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`p-3 rounded-xl bg-gray-800/50 border border-cyan-400/20 text-gray-400 transition-all duration-300 hover:border-cyan-400/40 hover:scale-110 ${Social.color}`}
                  >
                    <Social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold text-cyan-300 mb-6 flex items-center">
                <Zap className="w-5 h-5 mr-3 text-cyan-400" />
                Navigation
              </h3>
              <ul className="space-y-4">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Categories', path: '/categories' },
                  { name: 'Leaderboard', path: '/leaderboard' },
                  { name: 'Resources', path: '/resources' },
                  { name: 'About', path: '/about' }
                ].map((item, index) => (
                  <li key={index}>
                    <Link 
                      to={item.path} 
                      className="text-gray-400 hover:text-cyan-400 transition-all duration-300 flex items-center group"
                    >
                      <span className="border-b border-transparent group-hover:border-cyan-400/50 transition-border">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-xl font-bold text-cyan-300 mb-6 flex items-center">
                <Cpu className="w-5 h-5 mr-3 text-cyan-400" />
                Domains
              </h3>
              <ul className="space-y-4">
                {[
                  { name: 'Network Security', path: '/quiz?category=network-security' },
                  { name: 'Cryptography', path: '/quiz?category=cryptography' },
                  { name: 'Ethical Hacking', path: '/quiz?category=ethical-hacking' },
                  { name: 'Web Security', path: '/quiz?category=web-security' },
                  { name: 'Cloud Security', path: '/quiz?category=cloud-security' }
                ].map((item, index) => (
                  <li key={index}>
                    <Link 
                      to={item.path} 
                      className="text-gray-400 hover:text-cyan-400 transition-all duration-300 flex items-center group"
                    >
                      <span className="border-b border-transparent group-hover:border-cyan-400/50 transition-border">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-xl font-bold text-cyan-300 mb-6 flex items-center">
                <Lock className="w-5 h-5 mr-3 text-cyan-400" />
                Stay Updated
              </h3>
              <p className="text-gray-400 mb-6">
                Join our community of cybersecurity enthusiasts and never miss an update.
              </p>
              <div className="space-y-4">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-400/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-all"
                />
                <Button className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white py-3 rounded-lg transition-all duration-300 border-0">
                  <Terminal className="w-4 h-4 mr-2" />
                  Subscribe Now
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-cyan-400/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <p className="text-gray-500 text-sm flex items-center">
                <Code2 className="w-4 h-4 mr-2 text-cyan-400" />
                Crafted with <Heart className="w-4 h-4 mx-2 text-pink-500" /> by CyberVeer Team
              </p>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {['Privacy Policy', 'Terms of Service', 'Contact'].map((item, index) => (
                <Link
                  key={index}
                  to={`/${item.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-500 hover:text-cyan-400 text-sm transition-all duration-300"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Animated cyber elements */}
        <div className="absolute bottom-8 left-8 text-cyan-400/10">
          <Brain size={48} />
        </div>
        <div className="absolute top-8 right-12 text-purple-500/10">
          <Network size={42} />
        </div>
      </div>

      <style>
        {`
          @keyframes gridMove {
            0% { background-position: 0 0; }
            100% { background-position: 50px 50px; }
          }
        `}
      </style>
    </>
  );
};

export default Footer;