import React, { useState } from 'react';
import { ArrowUpFromLine, Info, Play, CornerUpLeft, Pause, Power } from 'lucide-react';
import ConsoleScreen from './ConsoleScreen';

const ConsoleButton = ({ onClick, label, icon: Icon, active, round, title }) => (
  <button
    type="button"
    onClick={onClick}
    title={title || label}
    className={`console-btn ${active ? 'active' : ''} ${round ? 'console-round' : ''}`}
  >
    {Icon && <Icon size={round ? 14 : 12} strokeWidth={1.75} />}
    {!round && label && <span className="ml-1.5">{label}</span>}
  </button>
);

const Console = ({
  project,
  mode,
  isPaused,
  onInsert,
  onEject,
  onAbout,
  onDemo,
  onBack,
  onPause,
}) => {
  const [dragOver, setDragOver] = useState(false);

  const onDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const onDragLeave = () => setDragOver(false);
  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const id = e.dataTransfer.getData('text/cartridge-id');
    if (id) onInsert(id);
  };

  return (
    <div className="relative">
      {/* Meta bar above console */}
      <div className="mb-3 flex items-end justify-between">
        <div>
          <div className="text-[10px] tracking-[0.35em] text-[#5a6b75]">// SECTION 01</div>
          <h2 className="text-[15px] tracking-[0.25em] text-[#c5d6df]">
            CONSOLE <span className="text-[#22d3ee]">VIEWER</span>
          </h2>
        </div>
        <div className="text-right text-[10px] tracking-[0.2em] text-[#5a6b75]">
          <div>DRAG A CARTRIDGE FROM THE VAULT</div>
          <div className="text-[#22d3ee]">↓ DROP INTO SLOT TO LOAD</div>
        </div>
      </div>

      {/* Console shell */}
      <div className="console-shell corner-ticks mx-auto max-w-[1100px] p-5 md:p-7">
        {/* Top strip: cartridge slot + eject + power indicator */}
        <div className="mb-4 flex items-center gap-4">
          {/* Cartridge drop slot */}
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`slot-hatch relative flex h-10 flex-1 items-center justify-between border border-[#1c2b36] px-3 ${
              dragOver ? 'drop-zone-active' : ''
            }`}
          >
            <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] text-[#5a6b75]">
              <Power size={12} strokeWidth={1.5} className="text-[#22d3ee]" />
              <span>CARTRIDGE SLOT</span>
              <span className="text-[#3a4a54]">/</span>
              {project ? (
                <span className="text-[#22d3ee] text-glow">{project.code} // {project.title}</span>
              ) : (
                <span className="text-[#5a6b75] blink">AWAITING INPUT</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="pulse-dot" />
              <span className="text-[9px] tracking-[0.3em] text-[#7a8a94]">
                {project ? 'LOADED' : 'EMPTY'}
              </span>
            </div>
          </div>

          {/* Eject */}
          <ConsoleButton
            onClick={onEject}
            label="EJECT"
            icon={ArrowUpFromLine}
            title="Eject cartridge"
          />
        </div>

        {/* Main row: d-pad | screen | button cluster */}
        <div className="flex flex-col items-stretch gap-4 md:flex-row">
          {/* Left: d-pad decoration + back */}
          <div className="flex flex-row items-center justify-center gap-3 md:w-[120px] md:flex-col">
            <div className="relative h-[70px] w-[70px]">
              <div className="absolute left-1/2 top-0 h-6 w-5 -translate-x-1/2 rounded-sm border border-[#1c2b36] bg-[#0a1017]" />
              <div className="absolute bottom-0 left-1/2 h-6 w-5 -translate-x-1/2 rounded-sm border border-[#1c2b36] bg-[#0a1017]" />
              <div className="absolute left-0 top-1/2 h-5 w-6 -translate-y-1/2 rounded-sm border border-[#1c2b36] bg-[#0a1017]" />
              <div className="absolute right-0 top-1/2 h-5 w-6 -translate-y-1/2 rounded-sm border border-[#1c2b36] bg-[#0a1017]" />
              <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-sm border border-[#22d3ee55] bg-[#05080d]" />
            </div>
            <ConsoleButton
              onClick={onBack}
              label="BACK"
              icon={CornerUpLeft}
              title="Back"
            />
          </div>

          {/* Center: screen */}
          <div className="flex-1">
            <ConsoleScreen project={project} mode={mode} isPaused={isPaused} />
          </div>

          {/* Right: About / Demo / Pause */}
          <div className="flex flex-row items-center justify-center gap-3 md:w-[120px] md:flex-col">
            <ConsoleButton
              onClick={onAbout}
              label="ABOUT"
              icon={Info}
              active={mode === 'about'}
              title="About this project"
            />
            <ConsoleButton
              onClick={onDemo}
              label="DEMO"
              icon={Play}
              active={mode === 'demo'}
              title="Play demo video"
            />
            <ConsoleButton
              onClick={onPause}
              icon={Pause}
              round
              active={isPaused && mode === 'demo'}
              title="Pause demo"
            />
          </div>
        </div>

        {/* Bottom tech strip */}
        <div className="mt-4 flex items-center justify-between border-t border-[#13202a] pt-3 text-[9px] tracking-[0.3em] text-[#3a4a54]">
          <span>MODEL: LG-HC01 // HANDHELD</span>
          <span>CHIPSET: REACT · TAILWIND · FRAMER</span>
          <span>REV 2025.04</span>
        </div>
      </div>
    </div>
  );
};

export default Console;