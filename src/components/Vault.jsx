import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Disc3 } from 'lucide-react';

const Cartridge = ({ project, inserted, onInsert }) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDragStart = (e) => {
    e.dataTransfer.setData('text/cartridge-id', project.id);
    e.dataTransfer.effectAllowed = 'move';
    setIsDragging(true);
  };
  const onDragEnd = () => setIsDragging(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative"
    >
      <div
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDoubleClick={() => onInsert(project.id)}
        className={`cartridge corner-ticks group relative flex h-[260px] cursor-grab flex-col overflow-hidden active:cursor-grabbing ${
          isDragging ? 'dragging' : ''
        } ${inserted ? 'glow-cyan-strong' : ''}`}
        style={{ borderColor: inserted ? `${project.accent}99` : undefined }}
      >
        <span className="cartridge-notch" />

        {/* cover image */}
        <div className="relative h-[58%] w-full overflow-hidden border-b border-[#1c2b36]">
          <img
            src={project.cover}
            alt="\"
            onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
            className="h-full w-full object-cover opacity-75 transition-opacity duration-300 group-hover:opacity-95"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                `linear-gradient(180deg, rgba(5,8,13,0.15) 0%, rgba(5,8,13,0.85) 100%), radial-gradient(circle at 50% 0%, ${project.accent}22, transparent 60%)`,
            }}
          />
          <div className="absolute left-2 top-2 flex items-center gap-1 border border-[#22d3ee55] bg-[#05080d]/80 px-1.5 py-0.5 text-[9px] tracking-[0.3em] text-[#22d3ee]">
            <Disc3 size={10} strokeWidth={1.5} />
            {project.code}
          </div>
          <div className="absolute bottom-2 right-2 text-[9px] tracking-[0.3em] text-[#c5d6df]">
            {project.year}
          </div>
        </div>

        {/* label */}
        <div className="cartridge-label flex flex-1 flex-col justify-between px-3 py-2.5">
          <div>
            <div
              className="text-[13px] tracking-[0.18em]"
              style={{ color: project.accent }}
            >
              {project.title}
            </div>
            <div className="text-[9px] tracking-[0.25em] text-[#7a8a94]">
              {project.subtitle}
            </div>
          </div>
          <div className="flex items-center justify-between text-[9px] tracking-[0.25em] text-[#5a6b75]">
            <span>{project.platform.split('/')[0].trim()}</span>
            <span className={inserted ? 'text-[#22d3ee]' : ''}>
              {inserted ? '■ LOADED' : 'DRAG →'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Vault = ({ projects, insertedId, onInsert }) => {
  return (
    <div>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <div className="text-[10px] tracking-[0.35em] text-[#5a6b75]">// SECTION 02</div>
          <h2 className="text-[15px] tracking-[0.25em] text-[#c5d6df]">
            THE <span className="text-[#22d3ee]">VAULT</span>
          </h2>
        </div>
        <div className="flex items-center gap-3 text-[10px] tracking-[0.25em] text-[#5a6b75]">
          <span className="pulse-dot" />
          <span>{String(projects.length).padStart(2, '0')} CARTRIDGES ARCHIVED</span>
          <span className="text-[#3a4a54]">|</span>
          <span>DRAG / DOUBLE-CLICK TO LOAD</span>
        </div>
      </div>

      <div className="panel corner-ticks relative p-5 md:p-6">
        {/* decorative labels */}
        <div className="pointer-events-none absolute -top-2 left-4 bg-[#05080d] px-2 text-[9px] tracking-[0.35em] text-[#22d3ee]">
          VAULT.DAT
        </div>
        <div className="pointer-events-none absolute -top-2 right-4 bg-[#05080d] px-2 text-[9px] tracking-[0.35em] text-[#5a6b75]">
          SORT: CHRONOLOGICAL ↓
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-6">
          {projects.map((p) => (
            <Cartridge
              key={p.id}
              project={p}
              inserted={insertedId === p.id}
              onInsert={onInsert}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vault;