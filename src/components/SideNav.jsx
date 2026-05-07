import React from 'react';
import { Github, Linkedin, Mail, FileText, Gamepad2 } from 'lucide-react';

const NavIcon = ({ href, label, children }) => (
  <a
    href={href}
    target={href.startsWith('http') ? '_blank' : undefined}
    rel="noreferrer"
    title={label}
    aria-label={label}
    className="group relative flex h-10 w-10 items-center justify-center border border-transparent text-[#5a6b75] transition-colors duration-200 hover:border-[#22d3ee55] hover:text-[#22d3ee]"
  >
    <span className="absolute left-0 top-1/2 h-px w-2 -translate-y-1/2 bg-[#13202a] group-hover:bg-[#22d3ee]" />
    {children}
    <span className="pointer-events-none absolute left-12 whitespace-nowrap border border-[#13202a] bg-[#0a1017] px-2 py-1 text-[9px] tracking-[0.25em] text-[#c5d6df] opacity-0 transition-opacity duration-150 group-hover:opacity-100">
      {label}
    </span>
  </a>
);

const SideNav = ({ links }) => {
  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-14 flex-col items-center justify-between border-r border-[#13202a] bg-[#05080d]/95 py-4">
      <div className="flex flex-col items-center gap-1">
        <div className="mb-2 flex h-8 w-8 items-center justify-center border border-[#22d3ee55] text-[#22d3ee]">
          <span className="text-[10px] tracking-[0.1em]">LG</span>
        </div>
        <div className="mb-2 h-6 w-px bg-[#13202a]" />

        <NavIcon href={links.github} label="GITHUB">
          <Github size={16} strokeWidth={1.5} />
        </NavIcon>
        <NavIcon href={links.linkedin} label="LINKEDIN">
          <Linkedin size={16} strokeWidth={1.5} />
        </NavIcon>
        <NavIcon href={links.email} label="EMAIL">
          <Mail size={16} strokeWidth={1.5} />
        </NavIcon>
        <NavIcon href={links.cv} label="CV / RESUME">
          <FileText size={16} strokeWidth={1.5} />
        </NavIcon>
        <NavIcon href={links.itch} label="ITCH.IO">
          <Gamepad2 size={16} strokeWidth={1.5} />
        </NavIcon>
      </div>

      <div className="flex flex-col items-center gap-2 text-[8px] tracking-[0.3em] text-[#3a4a54]">
        <span className="rotate-180 [writing-mode:vertical-rl]">SIDE / NAV</span>
      </div>
    </aside>
  );
};

export default SideNav;
