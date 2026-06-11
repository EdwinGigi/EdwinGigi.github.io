import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Games() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/games.json')
      .then(res => res.json())
      .then(data => {
        setGames(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch games", err);
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
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  return (
    <div className="container mt-5 pt-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card mb-4"
      >
        <h1 className="mb-4">My Games Ranking List</h1>
        <motion.ol 
          className="list-group list-group-numbered"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {games.map((game, idx) => (
            <motion.li 
              key={idx} 
              variants={itemVariants}
              className="list-group-item d-flex justify-content-between align-items-start"
              style={{ background: 'transparent', color: 'var(--text-color)', borderColor: 'var(--border-color)' }}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{game}</div>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </motion.div>
    </div>
  );
}
