import React, { useEffect } from 'react';

const GlowWave = ({ trigger }) => {
  useEffect(() => {
    if (!trigger) return;

    const container = document.getElementById('glow-wave-container');
    if (!container) {
      const newContainer = document.createElement('div');
      newContainer.id = 'glow-wave-container';
      document.body.appendChild(newContainer);
    }

    // Create glow waves
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        createGlowWave();
      }, i * 200);
    }
  }, [trigger]);

  const createGlowWave = () => {
    const wave = document.createElement('div');
    wave.className = 'glow-wave';
    wave.style.position = 'fixed';
    wave.style.top = '50%';
    wave.style.left = '50%';
    wave.style.width = '50px';
    wave.style.height = '50px';
    wave.style.borderRadius = '50%';
    wave.style.border = '2px solid #fbbf24';
    wave.style.pointerEvents = 'none';
    wave.style.zIndex = '9998';
    wave.style.animation = 'glowExpand 1s ease-out forwards';
    wave.style.boxShadow = '0 0 30px rgba(251, 191, 36, 0.8)';
    wave.style.transform = 'translate(-50%, -50%)';

    document.body.appendChild(wave);

    setTimeout(() => wave.remove(), 1000);
  };

  return (
    <style>{`
      @keyframes glowExpand {
        from {
          width: 50px;
          height: 50px;
          opacity: 1;
        }
        to {
          width: 300px;
          height: 300px;
          opacity: 0;
        }
      }
    `}</style>
  );
};

export default GlowWave;
