import React, { useEffect } from 'react';

const ParticleSparkle = ({ trigger }) => {
  useEffect(() => {
    if (!trigger) return;

    for (let i = 0; i < 30; i++) {
      createParticle();
    }
  }, [trigger]);

  const createParticle = () => {
    const particle = document.createElement('div');
    particle.className = 'sparkle-particle';
    
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;
    
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '6px';
    particle.style.height = '6px';
    particle.style.backgroundColor = '#fbbf24';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9997';
    particle.style.boxShadow = '0 0 10px #fbbf24';

    const angle = (Math.random() * 360) * (Math.PI / 180);
    const velocity = 5 + Math.random() * 5;
    
    particle.style.animation = `sparklefly ${1.5 + Math.random() * 0.5}s ease-out forwards`;
    particle.style.setProperty('--tx', Math.cos(angle) * velocity * 50 + 'px');
    particle.style.setProperty('--ty', Math.sin(angle) * velocity * 50 + 'px');

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 2000);
  };

  return (
    <style>{`
      @keyframes sparklefly {
        from {
          transform: translate(0, 0);
          opacity: 1;
        }
        to {
          transform: translate(var(--tx), var(--ty));
          opacity: 0;
        }
      }
    `}</style>
  );
};

export default ParticleSparkle;
