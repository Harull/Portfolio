import React, { useEffect, useState } from 'react';
import { Terminal, Cpu } from 'lucide-react';

const Header = ({ system, loadedCount, inserted }) => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const hhmmss = time.toISOString().substring(11, 19);

  return (
    <header className="relative z-10 border-b border-[#13202a] bg-[#05080d]/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-3 pl-20 md:px-10 md:pl-24">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center border border-[#22d3ee55] bg-[#0a1017] text-[#22d3ee]">
            <Terminal size={14} strokeWidth={1.5} />
          </div>
          <div className="leading-tight">
            <div className="text-[11px] tracking-[0.35em] text-[#22d3ee]">
              {system.brand}
            </div>
            <div className="text-[9px] tracking-[0.25em] text-[#5a6b75]">
              {system.subBrand}
            </div>
          </div>
        </div>

        {/* System status */}
        <div className="hidden items-center gap-4 md:flex">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-[#7a8a94]">
            <Cpu size={12} strokeWidth={1.5} className="text-[#22d3ee]" />
            <span>UTC {hhmmss}</span>
          </div>
          <div className="h-3 w-px bg-[#13202a]" />
          <div className="flex items-center gap-2 text-[10px] tracking-[0.2em]">
            <span className="pulse-dot" />
            <span className="text-[#7a8a94]">SYS:</span>
            <span className="text-[#22d3ee] text-glow">ONLINE</span>
            <span className="text-[#3a4a54]">|</span>
            <span className="text-[#c5d6df]">{String(loadedCount).padStart(2, '0')} UNITS LOADED</span>
          </div>
          {inserted && (
            <>
              <div className="h-3 w-px bg-[#13202a]" />
              <div className="text-[10px] tracking-[0.2em] text-[#22d3ee]">
                // {inserted.code} ACTIVE
              </div>
            </>
          )}
        </div>

        {/* Mobile status */}
        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] md:hidden">
          <span className="pulse-dot" />
          <span className="text-[#22d3ee]">ONLINE</span>
        </div>
      </div>
    </header>
  );
};

export default Header;