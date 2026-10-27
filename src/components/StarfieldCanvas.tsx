import React, { useEffect, useRef } from 'react';
import {
  createStardustParticle,
  updateParticles,
  updateTrailPoints,
  StardustParticle,
  TrailPoint,
} from '../utils/goldenTrail.ts';

interface StarfieldCanvasProps {
  interactive?: boolean;
  accentHue?: 'blue' | 'garden' | 'amber' | 'moon';
  dimmed?: boolean;
  singleStarOnly?: boolean;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  color: string;
}

export const StarfieldCanvas: React.FC<StarfieldCanvasProps> = ({
  interactive = true,
  accentHue = 'blue',
  dimmed = false,
  singleStarOnly = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let lastTime = 0;
    const fpsInterval = 1000 / 30; // 30 FPS throttle to ensure smooth performance across devices

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    let stars: Star[] = [];
    let particles: StardustParticle[] = [];
    let trailPoints: TrailPoint[] = [];

    const initStars = () => {
      stars = [];
      if (singleStarOnly) {
        stars.push({
          x: width / 2,
          y: height / 2 - 20,
          radius: 3.5,
          baseAlpha: 1.0,
          alpha: 1.0,
          twinkleSpeed: 0.03,
          color: '#fbbf24',
        });
        return;
      }

      const count = Math.min(100, Math.floor((width * height) / 12000));
      for (let i = 0; i < count; i++) {
        const isGold = Math.random() < 0.2;
        const color = isGold ? '#fbbf24' : Math.random() < 0.3 ? '#e2e8f0' : '#93c5fd';
        const radius = isGold ? Math.random() * 1.6 + 0.8 : Math.random() * 1.1 + 0.4;
        const baseAlpha = Math.random() * 0.6 + 0.25;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius,
          baseAlpha,
          alpha: baseAlpha,
          twinkleSpeed: (Math.random() * 0.03 + 0.01) * (Math.random() < 0.5 ? 1 : -1),
          color,
        });
      }
    };

    initStars();

    // Subtle golden trail generator on mouse or touch movement
    const handleMove = (x: number, y: number) => {
      if (!interactive || singleStarOnly) return;

      // Add to ribbon trail (max 16 points)
      trailPoints.push({
        x,
        y,
        age: 0,
        maxAge: 16,
      });
      if (trailPoints.length > 20) {
        trailPoints.shift();
      }

      // Add stardust particles (capped at 40 max)
      if (particles.length < 40) {
        particles.push(createStardustParticle(x, y));
        if (Math.random() < 0.5) {
          particles.push(createStardustParticle(x, y));
        }
      }
    };

    const handlePointerMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });

    const render = (currentTime: number) => {
      animationId = requestAnimationFrame(render);

      const elapsed = currentTime - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = currentTime - (elapsed % fpsInterval);

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Background Stars
      const alphaMultiplier = dimmed ? 0.15 : 1.0;
      stars.forEach((star) => {
        star.alpha += star.twinkleSpeed;
        if (star.alpha > star.baseAlpha + 0.3) {
          star.alpha = star.baseAlpha + 0.3;
          star.twinkleSpeed = -Math.abs(star.twinkleSpeed);
        } else if (star.alpha < star.baseAlpha - 0.25) {
          star.alpha = star.baseAlpha - 0.25;
          star.twinkleSpeed = Math.abs(star.twinkleSpeed);
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0.08, star.alpha * alphaMultiplier);
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        if (star.radius > 1.8 || singleStarOnly) {
          ctx.globalAlpha = star.alpha * 0.3 * alphaMultiplier;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // 2. Draw Subtle Golden Ribbon Trail
      trailPoints = updateTrailPoints(trailPoints);
      if (trailPoints.length >= 3) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (let i = 0; i < trailPoints.length - 1; i++) {
          const pt1 = trailPoints[i];
          const pt2 = trailPoints[i + 1];
          const progress = i / trailPoints.length; // 0 (oldest) to 1 (newest)
          const trailAlpha = progress * 0.35 * (1 - pt1.age / pt1.maxAge);

          if (trailAlpha <= 0.01) continue;

          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
          ctx.strokeStyle = `rgba(251, 191, 36, ${trailAlpha})`;
          ctx.lineWidth = progress * 2.8 + 0.8;
          ctx.shadowColor = '#fbbf24';
          ctx.shadowBlur = 6;
          ctx.stroke();
        }
        ctx.restore();
      }

      // 3. Draw Golden Stardust Particles
      particles = updateParticles(particles);
      particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glowing halo
        if (p.size > 1.4) {
          ctx.globalAlpha = p.alpha * 0.35;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
    };
  }, [interactive, accentHue, dimmed, singleStarOnly]);

  const getBackgroundStyle = () => {
    if (accentHue === 'garden') {
      return 'radial-gradient(circle at 50% 35%, #041624 0%, #061320 50%, #02070d 100%)';
    }
    if (accentHue === 'amber') {
      return 'radial-gradient(circle at 50% 35%, #13111c 0%, #0b0c16 50%, #030408 100%)';
    }
    if (accentHue === 'moon') {
      return 'radial-gradient(circle at 50% 35%, #091326 0%, #050a18 50%, #02050e 100%)';
    }
    return 'radial-gradient(circle at 50% 35%, #0a1636 0%, #040b1e 50%, #02050f 100%)';
  };

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 transition-colors duration-1000"
      style={{ background: getBackgroundStyle() }}
    >
      <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />
    </div>
  );
};
