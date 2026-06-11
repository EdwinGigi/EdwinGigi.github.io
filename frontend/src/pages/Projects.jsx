import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Projects.css';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects.json')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch projects", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="container mt-5 pt-5 text-center">Loading...</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="container mt-5 pt-4">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-5"
      >
        Featured Projects
      </motion.h1>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map(project => (
          <motion.div variants={itemVariants} className="project-card mb-5 glass-card" key={project.id}>
            <div className="row align-items-center">
              <div className="col-md-4">
                <div className="project-image-container">
                  <img src={project.image} className="img-fluid project-image" alt={project.title} />
                  <div className="project-image-overlay">
                    <div className="overlay-content">
                      <h3>{project.liveUrl ? 'View Live' : 'View Code'}</h3>
                      <i className="fas fa-external-link-alt"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8 mt-4 mt-md-0">
                <h2 className="project-title">{project.title}</h2>
                <p className="project-description">{project.description}</p>
                <div className="tech-stack mb-4">
                  {project.stack.map((tech, i) => (
                    <span key={i} className="tech-badge">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-primary-custom">
                      <i className="fab fa-github"></i> View on GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary-custom">
                      <i className="fas fa-external-link-alt"></i> View Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
