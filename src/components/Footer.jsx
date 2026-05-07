import React from 'react';

const Footer = ({ system }) => {
  return (
    <footer className="relative z-10 border-t border-[#13202a] bg-[#05080d]/90">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-2 px-6 py-4 pl-20 text-[10px] tracking-[0.2em] text-[#5a6b75] md:flex-row md:items-center md:px-10 md:pl-24">
        <div className="flex items-center gap-3">
          <span className="text-[#22d3ee]">//</span>
          <span>TECHNICAL SPECIFICATIONS</span>
          <span className="text-[#3a4a54]">|</span>
          <span>{system.build}</span>
          <span className="text-[#3a4a54]">|</span>
          <span>{system.runtime}</span>
        </div>
        <div className="flex items-center gap-3">
          <span>OPERATOR: {system.operator}</span>
          <span className="text-[#3a4a54]">|</span>
          <span>{system.location}</span>
          <span className="text-[#3a4a54]">|</span>
          <span className="text-[#22d3ee]">© 2025</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
