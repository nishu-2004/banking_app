import React, { useEffect } from 'react';

const Confetti = ({ trigger }) => {
  useEffect(() => {
    if (!trigger) return;

    // Create confetti particles
    for (let i = 0; i < 50; i++) {
      createConfetti();
    }
  }, [trigger]);

  const createConfetti = () => {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-10px';
    confetti.style.width = Math.random() * 10 + 5 + 'px';
    confetti.style.height = confetti.style.width;
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.borderRadius = '50%';
    confetti.style.position = 'fixed';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    confetti.style.animation = `fall ${2 + Math.random() * 1}s linear forwards`;

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 3000);
  };

  return (
    <style>{`
      @keyframes fall {
        to {
          transform: translateY(100vh) rotate(360deg);
          opacity: 0;
        }
      }
    `}</style>
  );
};

export default Confetti;
