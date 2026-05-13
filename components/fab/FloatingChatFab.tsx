// components/fab/FloatingChatFab.tsx
'use client';

import { useState, useEffect } from 'react';
import FabRail from './FabRail';
import FloatingChatPanel from './FloatingChatPanel';
import DownloadToast from './DownloadToast';

export default function FloatingChatFab() {
  const [chatOpen,    setChatOpen]    = useState(false);
  const [fabVisible,  setFabVisible]  = useState(false);
  const [toastVisible,setToastVisible]= useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero-section');
    if (!hero) return;
    const obs = new IntersectionObserver(entries => {
      const inView = entries[0].isIntersecting;
      setFabVisible(!inView);
      if (inView) setChatOpen(false);
    }, { threshold: 0.15 });
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  const handleDownload = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
    const a = document.createElement('a');
    a.href     = '/api/resume';
    a.download = 'Resume_YourName_2025.pdf';
    a.click();
  };

  return (
    <>
      <FabRail
        visible={fabVisible}
        chatOpen={chatOpen}
        onToggleChat={() => setChatOpen(o => !o)}
        onDownload={handleDownload}
      />
      <FloatingChatPanel open={chatOpen} onClose={() => setChatOpen(false)} />
      <DownloadToast visible={toastVisible} />
    </>
  );
}
