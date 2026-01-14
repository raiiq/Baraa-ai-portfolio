import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Youtube, ExternalLink, Maximize } from 'lucide-react';

const ProjectCard = ({ project, onClick }) => {
    const handleYoutubeClick = (e) => {
        e.stopPropagation();
        const youtubeUrl = project.video?.includes('youtube.com/embed/')
            ? project.video.replace('embed/', 'watch?v=')
            : project.video;
        window.open(youtubeUrl, '_blank');
    };

    const handleFullscreenClick = (e) => {
        e.stopPropagation();
        onClick(project, true);
    };

    return (
        <motion.div
            onClick={() => onClick(project)}
            className="group relative w-full aspect-video overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] cursor-pointer bg-black/40 border border-white/5 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={window.innerWidth > 640 ? { y: -8, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } } : {}}
            whileTap={{ scale: 0.98 }}
            style={{ willChange: 'transform, opacity' }}
        >
            {/* Background Image with sophisticated hover */}
            <div className="absolute inset-0 z-0 w-full h-full">
                <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-all duration-1000 group-hover:scale-[1.03] grayscale-0 sm:grayscale-[0.3] group-hover:grayscale-0 brightness-[0.5] sm:brightness-[0.4] group-hover:brightness-[0.6] ease-out-expo"
                />
            </div>

            {/* Edge-lighting effect on hover - Perfect fit radius */}
            <div className="hidden sm:block absolute inset-0 opacity-0 group-hover:opacity-100 halation-border rounded-[1.5rem] md:rounded-[2.5rem] transition-all duration-700 z-10 pointer-events-none" />

            {/* Quick Actions Menu - Re-balanced for Tablet */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2 sm:gap-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500 transform translate-y-0 sm:translate-y-4 sm:group-hover:translate-y-0">
                <button
                    onClick={handleFullscreenClick}
                    className="flex items-center gap-2 p-3 sm:p-3.5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl text-white hover:bg-primary hover:border-primary/50 transition-all duration-300 group/btn pointer-events-auto shadow-2xl touch-target"
                >
                    <Maximize size={16} className="sm:w-5 sm:h-5" />
                    <span className="hidden lg:block max-w-0 overflow-hidden group-hover/btn:max-w-[100px] transition-all duration-500 whitespace-nowrap text-[8px] sm:text-[9px] font-black uppercase tracking-widest">
                        Cinematic
                    </span>
                </button>

                <button
                    onClick={handleYoutubeClick}
                    className="flex items-center gap-2 p-3 sm:p-3.5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl text-white hover:bg-[#FF0000] hover:border-[#FF0000]/50 transition-all duration-300 group/btn pointer-events-auto shadow-2xl touch-target"
                >
                    <Youtube size={16} className="sm:w-5 sm:h-5" />
                    <span className="hidden lg:block max-w-0 overflow-hidden group-hover/btn:max-w-[100px] transition-all duration-500 whitespace-nowrap text-[8px] sm:text-[9px] font-black uppercase tracking-widest">
                        YouTube
                    </span>
                </button>
            </div>

            {/* HUD Overlay Slab */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 sm:p-6 md:p-8 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 sm:opacity-60 sm:group-hover:opacity-100 transition-opacity duration-700" />

                {/* Technical HUD Accents - Refined Tablet Response */}
                <div className="hidden sm:block absolute top-10 left-10 w-8 h-[1px] bg-white/20 group-hover:bg-primary shadow-[0_0_15px_rgba(255,59,48,0.4)] transition-all duration-700 group-hover:w-16" />
                <div className="hidden sm:block absolute top-10 left-10 w-[1px] h-8 bg-white/20 group-hover:bg-primary shadow-[0_0_15px_rgba(255,59,48,0.4)] transition-all duration-700 group-hover:h-16" />

                <div className="relative z-30 translate-y-0 sm:translate-y-6 group-hover:translate-y-0 transition-all duration-700">
                    <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500 transform translate-x-0 sm:-translate-x-6 sm:group-hover:translate-x-0">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(255,59,48,0.8)]" />
                        <span className="text-[8px] sm:text-[10px] font-mono font-black text-primary uppercase tracking-[0.4em] sm:tracking-[0.6em] text-glow-red halation">
                            MISSION_ARCHIVE //
                        </span>
                        <span className="text-[8px] sm:text-[10px] font-mono font-black text-white/40 uppercase tracking-[0.4em] sm:tracking-[0.6em]">
                            00{project.id}
                        </span>
                    </div>

                    <h3
                        className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black text-white leading-[1.1] uppercase tracking-tight mb-4 sm:mb-6 text-glow-strong halation break-words"
                        style={{ fontFamily: project.font || 'IBM Plex Sans Arabic' }}
                    >
                        <span className="text-primary text-glow-red halation">{project.category}</span>
                        <span className="mx-2 sm:mx-4 text-white/10 font-thin tracking-widest">//</span>
                        {project.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 sm:gap-10 md:gap-12 pt-4 sm:pt-6 border-t border-white/10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-1000 delay-150">
                        <div className="space-y-0.5 sm:space-y-1">
                            <span className="block text-[7px] sm:text-[8px] font-mono text-gray-500 uppercase tracking-[0.4em]">Designation.</span>
                            <span className="block text-[9px] sm:text-[10px] font-black text-white uppercase tracking-[0.2em] group-hover:text-primary/90 transition-colors">{project.role}</span>
                        </div>
                        <div className="hidden md:block space-y-1 border-l border-white/10 pl-10">
                            <span className="block text-[8px] font-mono text-gray-500 uppercase tracking-[0.4em]">Cinematics.</span>
                            <span className="block text-[10px] font-black text-white uppercase tracking-[0.2em] group-hover:text-primary/90 transition-colors">High Fidelity Optic</span>
                        </div>
                        {project.release_date && (
                            <div className="space-y-0.5 sm:space-y-1 border-l border-white/10 pl-4 sm:pl-10">
                                <span className="block text-[7px] sm:text-[8px] font-mono text-gray-500 uppercase tracking-[0.4em]">Archived.</span>
                                <span className="block text-[9px] sm:text-[10px] font-black text-white uppercase tracking-[0.2em] group-hover:text-primary/90 transition-colors">
                                    {new Date(project.release_date).toLocaleDateString('en-US', { year: 'numeric' })}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
