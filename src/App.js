import React, { useMemo, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SideNav from './components/SideNav';
import Console from './components/Console';
import Vault from './components/Vault';
import { PROJECTS, SYSTEM, LINKS } from './mock';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

function App() {
  const [inserted, setInserted] = useState(null); // project id
  const [mode, setMode] = useState('idle'); // idle | about | demo
  const [isPaused, setIsPaused] = useState(false);
  const [history, setHistory] = useState([]);

  const insertedProject = useMemo(
    () => PROJECTS.find((p) => p.id === inserted) || null,
    [inserted]
  );

  const handleInsert = (projectId) => {
    if (inserted === projectId) return;
    setInserted(projectId);
    setMode('about');
    setHistory(['about']);
    const p = PROJECTS.find((x) => x.id === projectId);
    toast(`CARTRIDGE LOADED // ${p?.code || projectId}`, {
      description: p?.title,
    });
  };

  const handleEject = () => {
    if (!inserted) return;
    toast('CARTRIDGE EJECTED', { description: 'Vault returned to standby.' });
    setInserted(null);
    setMode('idle');
    setIsPaused(false);
    setHistory([]);
  };

  const pushMode = (next) => {
    setMode(next);
    setHistory((h) => [...h, next]);
  };

  const handleAbout = () => {
    if (!inserted) {
      toast('NO CARTRIDGE', { description: 'Insert a cartridge first.' });
      return;
    }
    pushMode('about');
  };

  const handleDemo = () => {
    if (!inserted) {
      toast('NO CARTRIDGE', { description: 'Insert a cartridge first.' });
      return;
    }
    setIsPaused(false);
    pushMode('demo');
  };

  const handleBack = () => {
    setHistory((h) => {
      if (h.length <= 1) {
        setMode(inserted ? 'about' : 'idle');
        return inserted ? ['about'] : [];
      }
      const next = h.slice(0, -1);
      setMode(next[next.length - 1]);
      return next;
    });
  };

  const handlePause = () => {
    if (mode !== 'demo') {
      toast('PAUSE ONLY IN DEMO MODE');
      return;
    }
    setIsPaused((p) => !p);
  };

  return (
    <div className="terminal-bg min-h-screen w-full text-[#c5d6df]">
      <Header system={SYSTEM} loadedCount={PROJECTS.length} inserted={insertedProject} />
      <SideNav links={LINKS} />

      <main className="relative mx-auto max-w-[1400px] px-6 pl-20 pb-16 pt-6 md:px-10 md:pl-24">
        {/* Console area */}
        <section className="mb-10">
          <Console
            project={insertedProject}
            mode={mode}
            isPaused={isPaused}
            onInsert={handleInsert}
            onEject={handleEject}
            onAbout={handleAbout}
            onDemo={handleDemo}
            onBack={handleBack}
            onPause={handlePause}
          />
        </section>

        {/* Vault */}
        <section>
          <Vault
            projects={PROJECTS}
            insertedId={inserted}
            onInsert={handleInsert}
          />
        </section>
      </main>

      <Footer system={SYSTEM} />
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0a1017',
            border: '1px solid #22d3ee55',
            color: '#c5d6df',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '11px',
            letterSpacing: '0.08em',
          },
        }}
      />
    </div>
  );
}

export default App;