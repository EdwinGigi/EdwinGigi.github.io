import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/posts.json/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Post not found');
        return res.json();
      })
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch post", err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="container mt-5 pt-5 text-center">Loading...</div>;
  }

  if (error || !post) {
    return (
      <div className="container mt-5 pt-5 text-center">
        <h2>Post not found</h2>
        <Link to="/posts" className="btn-primary-custom mt-3">Back to Posts</Link>
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
      >
        <Link to="/posts" className="btn btn-outline-secondary mb-4">&larr; Back to Posts</Link>
        <h1 className="mb-2">{post.title}</h1>
        <p className="text-muted mb-4">{post.date} &bull; {post.categories}</p>
        
        <div 
          className="post-content mt-4" 
          style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}
        >
          {post.content}
        </div>
      </motion.div>
    </div>
  );
}
