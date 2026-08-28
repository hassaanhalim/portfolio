import React, { useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const DotBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = usePortfolio();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const dotSpacing = 24;
    const dotRadius = 1;
    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = theme === 'dark';
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.09)';

      const cols = Math.ceil(canvas.width / dotSpacing);
      const rows = Math.ceil(canvas.height / dotSpacing);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * dotSpacing;
          const y = j * dotSpacing;

          // Subtle wave movement
          const wave = Math.sin((x + offset * 15) * 0.005) * Math.cos((y + offset * 15) * 0.005);
          const currentRadius = Math.max(0.6, dotRadius + wave * 0.4);

          ctx.beginPath();
          ctx.arc(x, y, currentRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      offset += 0.03;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      <canvas ref={canvasRef} className="dot-bg-canvas" />

      {/* Atmospheric lighting meshes */}
      {theme === 'light' ? (
        <>
          {/* Top-center vibrant mesh glow */}
          <div
            style={{
              position: 'absolute',
              top: '-10%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '85vw',
              maxWidth: '1000px',
              height: '520px',
              background: 'radial-gradient(ellipse at 50% 20%, rgba(99, 102, 241, 0.14) 0%, rgba(14, 165, 233, 0.1) 40%, rgba(255, 255, 255, 0) 75%)',
              filter: 'blur(50px)',
              pointerEvents: 'none'
            }}
          />
          {/* Top-left subtle violet glow */}
          <div
            style={{
              position: 'absolute',
              top: '15%',
              left: '-10%',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, rgba(255, 255, 255, 0) 70%)',
              filter: 'blur(60px)',
              pointerEvents: 'none'
            }}
          />
          {/* Right subtle cyan glow */}
          <div
            style={{
              position: 'absolute',
              top: '35%',
              right: '-10%',
              width: '550px',
              height: '550px',
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, rgba(255, 255, 255, 0) 70%)',
              filter: 'blur(60px)',
              pointerEvents: 'none'
            }}
          />
        </>
      ) : (
        <>
          {/* Dark Mode Top Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-15%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '65vw',
              height: '450px',
              background: 'radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, rgba(99, 102, 241, 0.06) 40%, rgba(0, 0, 0, 0) 70%)',
              filter: 'blur(50px)',
              pointerEvents: 'none'
            }}
          />
        </>
      )}
    </div>
  );
};
