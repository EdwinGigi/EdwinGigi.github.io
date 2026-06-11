import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/profile.json')
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch profile", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="container mt-5 pt-5 text-center">Loading...</div>;
  }

  if (!profile) return null;

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
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <section className="name-section" style={{ backgroundImage: `url('/assets/images/banner.jpg')` }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <motion.div variants={itemVariants} className="glass-card mb-4">
                <h2 className="card-title">About Me</h2>
                <p className="card-text">{profile.about}</p>
              </motion.div>
            </div>
          </div>
          <div className="row">
            {profile.roles?.map((role, idx) => (
              <div className="col-md-6 mb-4" key={idx}>
                <motion.div variants={itemVariants} className="role-card">
                  <i className={`${role.icon} role-icon`}></i>
                  <h3>{role.title}</h3>
                  <p>{role.description}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mt-5">
        <motion.div variants={itemVariants} className="glass-card mb-4">
          <h2>Experience</h2>
          {profile.experience?.map((exp, idx) => (
            <div className="experience-item" key={idx}>
              <h3 className="company">{exp.company}</h3>
              <p className="date">{exp.date}</p>
              <ul>
                {exp.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="container">
        <motion.div variants={itemVariants} className="glass-card mb-4">
          <h2>Education</h2>
          {profile.education?.map((edu, idx) => (
            <div className="education-item" key={idx}>
              <div className="d-flex align-items-center mb-3">
                {edu.image && <img src={edu.image} height="50px" className="me-3" alt="Institution Logo" />}
                <h3 className="mb-0">{edu.institution}</h3>
              </div>
              <p className="date">{edu.date}</p>
              <p className="achievement">{edu.achievement}</p>
              <h4>Key modules:</h4>
              <ul>
                {edu.modules.map((mod, i) => (
                  <li key={i}>{mod}</li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="container">
        <motion.div variants={itemVariants} className="glass-card mb-4">
          <h2>Projects</h2>
          <p className="lead mb-4">Explore my latest projects and contributions</p>
          <Link to="/projects" className="btn-primary-custom">
            <i className="fas fa-code"></i> View Projects
          </Link>
        </motion.div>
      </section>

      <section className="container">
        <motion.div variants={itemVariants} className="glass-card mb-4">
          <h2>Technical Skills</h2>
          <div className="skills-grid">
            {profile.skills?.map((cat, idx) => (
              <div className="skill-category" key={idx}>
                <h3>{cat.category}</h3>
                {cat.items.map((skill, i) => (
                  <div className="skill-item" key={i}>
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-stars">
                      {Array.from({ length: 5 }).map((_, starIdx) => (
                        <i key={starIdx} className={starIdx < skill.stars ? "fas fa-star" : "far fa-star text-muted"}></i>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="container">
        <motion.div variants={itemVariants} className="glass-card mb-4">
          <h2>Contact</h2>
          <p className="lead mb-4">Feel free to reach out to me through:</p>
          <div className="contact-links">
            <a href={profile.contact?.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">
              <i className="fab fa-linkedin"></i> LinkedIn
            </a>
            <a href={profile.contact?.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">
              <i className="fab fa-github"></i> GitHub
            </a>
            <a href={`mailto:${profile.contact?.email}`} className="btn btn-outline-primary">
              <i className="fas fa-envelope"></i> Email
            </a>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
