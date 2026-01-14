import React, { useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

const LiquidBackground = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isMobile, setIsMobile] = React.useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    // Smooth spring physics for mouse tracking
    const springConfig = { damping: 40, stiffness: 80 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Reactive transforms for different blob layers
    const layer1X = useTransform(springX, [-0.5, 0.5], [-150, 150]);
    const layer1Y = useTransform(springY, [-0.5, 0.5], [-150, 150]);

    const layer2X = useTransform(springX, [-0.5, 0.5], [100, -100]);
    const layer2Y = useTransform(springY, [-0.5, 0.5], [100, -100]);

    const layer3X = useTransform(springX, [-0.5, 0.5], [-50, 50]);
    const layer3Y = useTransform(springY, [-0.5, 0.5], [-50, 50]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX / window.innerWidth - 0.5);
            mouseY.set(e.clientY / window.innerHeight - 0.5);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Corner Flare 1: Top-Left */}
            <motion.div
                style={{ x: layer3X, y: layer3Y, opacity: isMobile ? 0.3 : 0.4, willChange: 'transform, opacity' }}
                className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] sm:w-[40vw] sm:h-[40vw] bg-primary/20 rounded-full blur-[80px] sm:blur-[300px] mix-blend-screen"
                animate={!isMobile ? {
                    opacity: [0.4, 0.7, 0.4],
                    scale: [1, 1.1, 1]
                } : {}}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Corner Flare 2: Top-Right */}
            <motion.div
                style={{ x: layer1X, y: layer1Y, opacity: isMobile ? 0.2 : 0.3, willChange: 'transform, opacity' }}
                className="absolute -top-[10%] -right-[10%] w-[70vw] h-[70vw] sm:w-[45vw] sm:h-[45vw] bg-primary/10 rounded-full blur-[100px] sm:blur-[350px] mix-blend-screen"
                animate={!isMobile ? {
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.15, 1]
                } : {}}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Corner Flare 3 - Only on Desktop for performance */}
            {!isMobile && (
                <motion.div
                    style={{ x: layer1X, y: layer2Y, willChange: 'transform, opacity' }}
                    className="absolute -bottom-[10%] -left-[10%] w-[50vw] h-[50vh] bg-primary/15 rounded-full blur-[400px] mix-blend-screen"
                    animate={{
                        opacity: [0.4, 0.8, 0.4],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                />
            )}

            {/* Corner Flare 4: Bottom-Right */}
            <motion.div
                style={{ x: layer2X, y: layer3Y, opacity: isMobile ? 0.1 : 0.2, willChange: 'transform, opacity' }}
                className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[60vw] sm:w-[40vw] sm:h-[40vw] bg-primary/10 rounded-full blur-[80px] sm:blur-[300px] mix-blend-screen"
                animate={!isMobile ? {
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.2, 1]
                } : {}}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
};

export default LiquidBackground;
