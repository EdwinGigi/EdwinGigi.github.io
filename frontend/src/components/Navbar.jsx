import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="brand-text">Edwin Gigi</span>
        </Link>
        <span className="navbar-text d-none d-lg-inline">Software Engineer</span>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`} to="/projects">Projects</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/games' ? 'active' : ''}`} to="/games">Games</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/posts' ? 'active' : ''}`} to="/posts">Posts</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://github.com/edwingigi" target="_blank" rel="noopener noreferrer">Github</a>
            </li>
            <li className="nav-item ms-lg-3">
              <button onClick={toggleTheme} className="btn btn-link nav-link theme-toggle" aria-label="Toggle dark mode">
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
