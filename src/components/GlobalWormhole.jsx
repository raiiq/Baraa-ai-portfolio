import React, { useEffect, useRef } from 'react';

const GlobalWormhole = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0, active: false });
    const targetMouseRef = useRef({ x: 0, y: 0 }); // For smoothed steering
    const particlesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let animationFrameId;
        const isMobile = window.innerWidth < 768;
        // 60FPS Mobile Optimization Tier: 2026-01-14-17:01
        const PARTICLE_COUNT = isMobile ? 50 : 250;
        const FOCUS_STRENGTH = isMobile ? 0.001 : 0.002; // Dampen even more on mobile

        const resizeCanvas = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initParticles();
        };

        const createParticle = (isInitial = false) => {
            return {
                x: (Math.random() - 0.5) * 2000,
                y: (Math.random() - 0.5) * 2000,
                z: isInitial ? Math.random() * 2000 : 2000,
                prevZ: 0,
                width: Math.random() * 1.5 + 1
            };
        };

        const initParticles = () => {
            particlesRef.current = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particlesRef.current.push(createParticle(true));
            }
        };

        const project = (x, y, z) => {
            const factor = 600 / z;
            const px = x * factor + canvas.width / 2;
            const py = y * factor + canvas.height / 2;
            return { px, py, factor };
        };

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Smooth steering toward mouse
            if (mouseRef.current.active) {
                targetMouseRef.current.x += (mouseRef.current.x - canvas.width / 2 - targetMouseRef.current.x) * FOCUS_STRENGTH;
                targetMouseRef.current.y += (mouseRef.current.y - canvas.height / 2 - targetMouseRef.current.y) * FOCUS_STRENGTH;
            } else {
                targetMouseRef.current.x *= 0.99; // Much slower return to center
                targetMouseRef.current.y *= 0.99;
            }

            for (let i = 0; i < particlesRef.current.length; i++) {
                const p = particlesRef.current[i];
                p.prevZ = p.z;
                p.z -= 0.2; // Ultra-slow travel speed

                // Respawn if too close
                if (p.z <= 10) {
                    particlesRef.current[i] = createParticle();
                    continue;
                }

                // Apply steering offset
                const steerX = p.x - targetMouseRef.current.x;
                const steerY = p.y - targetMouseRef.current.y;

                const pos = project(steerX, steerY, p.z);
                const prevPos = project(steerX, steerY, p.prevZ);

                const alpha = Math.min(1, (1000 - p.z) / 500); // Fade in as they approach
                if (alpha > 0) {
                    ctx.beginPath();
                    ctx.moveTo(prevPos.px, prevPos.py);
                    ctx.lineTo(pos.px, pos.py);

                    ctx.strokeStyle = `rgba(255, 59, 48, ${alpha * 0.8})`;
                    ctx.lineWidth = p.width * pos.factor;
                    ctx.lineCap = 'round';

                    // Disable expensive shadows on small screens to prevent flickering
                    if (window.innerWidth > 640) {
                        ctx.shadowBlur = 10 * pos.factor;
                        ctx.shadowColor = 'rgba(255, 59, 48, 0.4)';
                    }
                    ctx.stroke();
                }
            }
        };

        const handleMouseMove = (e) => {
            mouseRef.current = {
                x: e.clientX,
                y: e.clientY,
                active: true
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current.active = false;
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-10"
            style={{ mixBlendMode: 'screen' }}
        />
    );
};

export default GlobalWormhole;
