import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Cpu, Zap, Shield, Binary } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/', current: location.pathname === '/' },
    { name: 'Categories', href: '/categories', current: location.pathname === '/categories' },
    { name: 'Leaderboard', href: '/leaderboard', current: location.pathname === '/leaderboard' },
    { name: 'Resources', href: '/resources', current: location.pathname === '/resources' },
    { name: 'About', href: '/about', current: location.pathname === '/about' },
  ];

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled
            ? "bg-gray-900/95 backdrop-blur-xl border-b border-cyan-400/30 shadow-[0_0_25px_rgba(0,255,255,0.5)]"
            : "bg-gray-900/80 backdrop-blur-lg border-b border-cyan-400/20"
          }
        `}
        style={{fontFamily: "'Orbitron', sans-serif"}}
      >
        {/* Animated circuit line */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_rgba(0,255,255,0.7)] animate-pulse"></div>
        
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16">
            {/* Logo with tech elements */}
            <Link
              to="/"
              className="flex items-center space-x-2 group"
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-cyan-400/20 rounded-full blur group-hover:bg-cyan-400/30 transition-all group-hover:blur-md"></div>
                <Shield className="w-8 h-8 text-cyan-400 relative z-10" />
              </div>
              <span className="text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text font-bold text-2xl tracking-tighter drop-shadow-[0_0_8px_rgba(0,255,255,0.7)]">
                CYBERVEER
              </span>
              <Binary className="w-5 h-5 text-pink-500 animate-pulse" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    px-4 py-2 text-sm font-medium relative transition-all duration-300 group
                    hover:text-cyan-300
                    ${item.current ? "text-cyan-300" : "text-gray-300"}
                  `}
                >
                  {item.name}
                  <span className={`
                    absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300
                    group-hover:w-full shadow-[0_0_8px_rgba(0,255,255,0.7)]
                    ${item.current ? "w-full" : ""}
                  `}></span>
                  <span className={`
                    absolute -bottom-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full opacity-0
                    group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_rgba(0,255,255,0.7)]
                    ${item.current ? "opacity-100" : ""}
                  `}></span>
                </Link>
              ))}

              {/* Profile Button */}
              <Link to="/profile">
                <button
                  className="ml-4 px-4 py-2 border border-cyan-400/60 bg-gray-800/60 hover:bg-gray-800 text-cyan-300 hover:text-white hover:border-cyan-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.6)] transition-all group relative overflow-hidden rounded-md flex items-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                  <User className="w-4 h-4 mr-2 relative z-10" />
                  <span className="relative z-10">ACCESS</span>
                </button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-cyan-300 hover:text-white hover:bg-cyan-400/20 border border-cyan-400/30 rounded-md"
                aria-label="Toggle navigation menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-2 border border-cyan-400/30 bg-gray-900/95 backdrop-blur-xl rounded-lg shadow-[0_0_20px_rgba(0,255,255,0.4)] animate-slide-in overflow-hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`
                      block px-3 py-3 text-base font-medium rounded-md transition-all relative
                      hover:text-cyan-300 hover:bg-cyan-400/10
                      ${item.current
                        ? "text-cyan-300 bg-cyan-400/10 border-l-4 border-cyan-400"
                        : "text-gray-300"
                      }
                    `}
                  >
                    {item.name}
                    {item.current && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(0,255,255,0.7)]"></div>
                    )}
                  </Link>
                ))}

                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center px-3 py-3 text-base font-medium text-gray-300 hover:text-cyan-300 hover:bg-cyan-400/10 rounded-md mt-2 border-t border-cyan-400/20 pt-4"
                >
                  <User className="w-5 h-5 mr-3" />
                  ACCESS PORTAL
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap');
          
          :root {
            --neon-cyan: #00f3ff;
            --neon-pink: #ff00ff;
            --neon-purple: #bd00ff;
            --dark-bg: #0a0a1f;
          }
          
          body {
            background-color: var(--dark-bg);
            color: #e0e0e0;
            font-family: 'Orbitron', sans-serif;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }
          
          /* Cyberpunk background effect */
          body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
              radial-gradient(circle at 20% 30%, rgba(41, 9, 66, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(0, 180, 216, 0.3) 0%, transparent 50%),
              linear-gradient(45deg, #0a0a1f 0%, #0d1b2a 100%);
            z-index: -1;
          }
          
          /* Grid overlay for cyberpunk effect */
          body::after {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
              linear-gradient(rgba(0, 243, 255, 0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 243, 255, 0.07) 1px, transparent 1px);
            background-size: 20px 20px;
            z-index: -1;
            pointer-events: none;
          }
          
          /* Cyberpunk scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(10, 10, 31, 0.8);
          }
          
          ::-webkit-scrollbar-thumb {
            background: var(--neon-cyan);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: var(--neon-pink);
            box-shadow: 0 0 10px var(--neon-pink);
          }
          
          /* Animation for cyberpunk elements */
          @keyframes glow {
            0% { box-shadow: 0 0 5px var(--neon-cyan); }
            50% { box-shadow: 0 0 20px var(--neon-cyan), 0 0 30px var(--neon-cyan); }
            100% { box-shadow: 0 0 5px var(--neon-cyan); }
          }
          
          @keyframes flicker {
            0% { opacity: 1; }
            50% { opacity: 0.7; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </>
  );
};

export default Navbar;