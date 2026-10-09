import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#f8f9fa] border-t border-zinc-200/80 py-8 text-center text-zinc-500 text-xs sm:text-sm font-sans">
      <div className="max-w-7xl mx-auto px-4">
        <p className="font-medium text-zinc-600">
          © {new Date().getFullYear()} Full Stack Developer Portfolio. Built with React, Tailwind CSS & Firebase.
        </p>
      </div>
    </footer>
  );
};

export default Footer;