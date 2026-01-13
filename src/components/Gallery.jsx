import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { useData } from '../context/DataContext';

const Gallery = () => {
    const { projects } = useData();
    const [selectedProject, setSelectedProject] = useState(null);
    const [isInitialFullscreen, setIsInitialFullscreen] = useState(false);

    const handleProjectClick = (project, startFullscreen = false) => {
        setIsInitialFullscreen(startFullscreen);
        setSelectedProject(project);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
        setIsInitialFullscreen(false);
    };

    // Debug logging
    React.useEffect(() => {
        console.log('Gallery: Projects loaded:', projects);
        console.log('Gallery: Number of projects:', projects.length);
    }, [projects]);

    return (
        <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 relative z-10" id="work">
            <div className="w-full">
                <div className="mb-12 sm:mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-10">
                    <div>
                        <div className="flex items-center gap-3 sm:gap-4 mb-3">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(255,59,48,0.5)]" />
                            <span className="text-primary text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] text-glow-red halation">Cinematic Portfolio</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.8] text-glow-strong halation">
                            Selected <br /> <span className="text-white/10 italic">Archive.</span>
                        </h2>
                    </div>
                    <div className="hidden md:block">
                        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.4em] text-right">
                            Transmission // V.2.0 <br />
                            Last Updated: 2026.01
                        </p>
                    </div>
                </div>

                {projects.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No projects found. Add some from the dashboard!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
                        {projects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onClick={handleProjectClick}
                            />
                        ))}
                    </div>
                )}
            </div>

            <ProjectModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={handleCloseModal}
                initialFullscreen={isInitialFullscreen}
            />
        </section>
    );
};

export default Gallery;
