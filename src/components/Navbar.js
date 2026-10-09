import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Certificates', path: '/certificates' },
    { name: 'Resume', path: '/resume' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <nav className="max-w-7xl mx-auto bg-white/90 backdrop-blur-md border border-zinc-200/90 rounded-full px-4 sm:px-6 shadow-sm transition-all duration-300">
        <div className="flex justify-between items-center h-14 sm:h-16">
          
          {/* Brand Logo with Monogram Badge */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 shrink-0 group"
          >
           
            <span className="text-base sm:text-lg font-black tracking-tight text-zinc-900">
               &lt;Sahil /&gt;
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-cyan-900 bg-cyan-100/80 border border-cyan-200/80 shadow-2xs'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Admin Button */}
            <Link
              to="/login"
              className="ml-3 px-5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full transition-all text-xs xl:text-sm font-bold shrink-0 shadow-xs active:scale-[0.98]"
            >
              Admin Access
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/login"
              className="px-3.5 py-1 text-xs bg-zinc-900 text-white rounded-full font-bold sm:hidden"
            >
              Login
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white/95 border-t border-zinc-100 py-3 px-2 space-y-1 my-2 rounded-2xl shadow-lg backdrop-blur-xl">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'text-cyan-900 bg-cyan-50 border border-cyan-200/80'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="pt-2 border-t border-zinc-100 mt-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block text-center w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full transition-colors text-xs font-bold shadow-xs"
              >
                Admin Access
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;