import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/posts.json')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch posts", err);
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
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="container mt-5 pt-4">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 text-center"
      >
        Blog Posts
      </motion.h1>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="row"
      >
        {posts.map(post => (
          <motion.div variants={itemVariants} className="col-12 mb-4" key={post.id}>
            <Link to={`/posts/${post.id}`} style={{ textDecoration: 'none' }}>
              <div className="glass-card">
                <h3 style={{ color: 'var(--primary-color)' }}>{post.title}</h3>
                <div className="text-muted mb-2">{post.date} &bull; {post.categories}</div>
                <p style={{ color: 'var(--text-light)' }}>Click to read more...</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
