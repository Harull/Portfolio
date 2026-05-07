import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HardDrive, Layers, User, Gamepad2, Calendar } from 'lucide-react';

const IdleScreen = () => {
  const [lines, setLines] = useState([]);
  const bootLines = [
    '> LG-DEV ARCHIVE // BOOT SEQUENCE',
    '> MEMORY CHECK ............. OK',
    '> CARTRIDGE BUS ............ OK',
    '> DISPLAY 720x400 .......... OK',
    '> AWAITING CARTRIDGE INSERTION',
  ];
  useEffect(() => {
    setLines([]);
    let i = 0;
    const id = setInterval(() => {
      setLines((l) => [...l, bootLines[i]]);
      i += 1;
      if (i >= bootLines.length) clearInterval(id);
    }, 260);
    return () => clearInterval(id);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex h-full flex-col justify-between p-5">
      <div className="space-y-1 text-[11px] leading-relaxed tracking-widest text-[#22d3ee]">
        {lines.map((l, idx) => (
          <div key={idx} className={idx === lines.length - 1 ? 'blink' : ''}>
            {l}
          </div>
        ))}
      </div>
      <div className="flex items-end justify-between text-[9px] tracking-[0.3em] text-[#3a4a54]">
        <span>STATUS: IDLE</span>
        <span>NO CARTRIDGE DETECTED</span>
      </div>
    </div>
  );
};

const AboutPanel = ({ project }) => {
  const [shotIdx, setShotIdx] = useState(0);
  useEffect(() => setShotIdx(0), [project?.id]);
  const shots = project.screenshots && project.screenshots.length > 0 ? project.screenshots : [project.cover];

  return (
    <div className="grid h-full grid-cols-1 gap-3 p-4 md:grid-cols-5">
      {/* Screenshot viewer */}
      <div className="relative col-span-1 flex flex-col gap-2 md:col-span-2">
        <div className="relative flex-1 overflow-hidden border border-[#13202a] bg-[#05080d]">
          <img
            src={shots[shotIdx]}
            alt={project.title}
            className="h-full w-full object-cover opacity-90"
          />
          <div className="absolute left-2 top-2 border border-[#22d3ee55] bg-[#05080d]/80 px-2 py-0.5 text-[9px] tracking-[0.25em] text-[#22d3ee]">
            {project.code}
          </div>
        </div>
        {shots.length > 1 && (
          <div className="flex gap-2">
            {shots.map((_, i) => (
              <button
                key={i}
                onClick={() => setShotIdx(i)}
                className={`h-1.5 flex-1 border border-[#13202a] ${
                  i === shotIdx ? 'bg-[#22d3ee]' : 'bg-[#0a1017]'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info block */}
      <div className="col-span-1 flex min-w-0 flex-col md:col-span-3">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-[10px] tracking-[0.3em] text-[#5a6b75]">// PROJECT FILE</div>
            <h3 className="text-[18px] tracking-[0.2em] text-[#22d3ee] text-glow">
              {project.title}
            </h3>
            <div className="text-[10px] tracking-[0.25em] text-[#7a8a94]">
              {project.subtitle}
            </div>
          </div>
          <div className="text-right text-[9px] tracking-[0.3em] text-[#22d3ee]">
            [{project.status}]
          </div>
        </div>

        <p className="mt-3 max-h-20 overflow-auto pr-2 text-[11px] leading-relaxed text-[#c5d6df]/85">
          {project.description}
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] tracking-[0.15em]">
          <div className="flex items-center gap-2 border border-[#13202a] bg-[#05080d]/60 px-2 py-1.5">
            <User size={12} strokeWidth={1.5} className="text-[#22d3ee]" />
            <span className="text-[#5a6b75]">ROLE</span>
            <span className="ml-auto truncate text-[#c5d6df]">{project.role}</span>
          </div>
          <div className="flex items-center gap-2 border border-[#13202a] bg-[#05080d]/60 px-2 py-1.5">
            <Gamepad2 size={12} strokeWidth={1.5} className="text-[#22d3ee]" />
            <span className="text-[#5a6b75]">PLAT</span>
            <span className="ml-auto truncate text-[#c5d6df]">{project.platform}</span>
          </div>
          <div className="flex items-center gap-2 border border-[#13202a] bg-[#05080d]/60 px-2 py-1.5">
            <Calendar size={12} strokeWidth={1.5} className="text-[#22d3ee]" />
            <span className="text-[#5a6b75]">YEAR</span>
            <span className="ml-auto truncate text-[#c5d6df]">{project.year}</span>
          </div>
          <div className="flex items-center gap-2 border border-[#13202a] bg-[#05080d]/60 px-2 py-1.5">
            <HardDrive size={12} strokeWidth={1.5} className="text-[#22d3ee]" />
            <span className="text-[#5a6b75]">ID</span>
            <span className="ml-auto truncate text-[#c5d6df]">{project.code}</span>
          </div>
        </div>

        <div className="mt-3">
          <div className="mb-1 flex items-center gap-2 text-[10px] tracking-[0.3em] text-[#5a6b75]">
            <Layers size={12} strokeWidth={1.5} className="text-[#22d3ee]" />
            TECH STACK
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="border border-[#22d3ee33] bg-[#0a1017] px-2 py-0.5 text-[10px] tracking-[0.15em] text-[#22d3ee]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DemoPanel = ({ project, isPaused }) => {
  // Build iframe URL with autoplay; when paused, we replace with poster view
  const src = `${project.demoUrl}?autoplay=${isPaused ? 0 : 1}&mute=1&controls=1&modestbranding=1&rel=0`;
  const iframeRef = useRef(null);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {!isPaused ? (
        <iframe
          ref={iframeRef}
          key={project.id + (isPaused ? '-p' : '-r')}
          title={`${project.title} demo`}
          src={src}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
          style={{ border: 0, background: '#000' }}
        />
      ) : (
        <div className="relative flex h-full w-full items-center justify-center bg-[#02050a]">
          <img
            src={project.cover}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="relative flex flex-col items-center gap-2 text-center">
            <div className="text-[11px] tracking-[0.4em] text-[#22d3ee] text-glow blink">PAUSED</div>
            <div className="text-[10px] tracking-[0.3em] text-[#7a8a94]">
              {project.code} // {project.title}
            </div>
          </div>
        </div>
      )}
      <div className="pointer-events-none absolute left-2 top-2 border border-[#22d3ee55] bg-[#05080d]/80 px-2 py-0.5 text-[9px] tracking-[0.25em] text-[#22d3ee]">
        DEMO // {project.code}
      </div>
    </div>
  );
};

const ConsoleScreen = ({ project, mode, isPaused }) => {
  const content = (() => {
    if (!project || mode === 'idle') return <IdleScreen />;
    if (mode === 'demo') return <DemoPanel project={project} isPaused={isPaused} />;
    return <AboutPanel project={project} />;
  })();

  return (
    <div className="screen-inner scanlines crt-flicker aspect-[16/9] min-h-[320px] w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={(project?.id || 'idle') + '-' + mode + '-' + isPaused}
          initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative z-[1] h-full w-full"
        >
          {content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ConsoleScreen;