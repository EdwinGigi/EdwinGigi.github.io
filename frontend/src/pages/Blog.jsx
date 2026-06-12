import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { FileText, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import portfolioData from '@/data/portfolio-data.json'

export default function Blog() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center p-6 relative">
      <Helmet>
        <title>Blog — Edwin Gigi</title>
        <meta name="description" content="Thoughts, tutorials, and insights on software engineering." />
      </Helmet>

      <div className="text-center z-10 w-full max-w-4xl">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="font-heading text-4xl font-bold tracking-tight text-text-primary md:text-5xl mb-6">
            Blog
          </h1>
          <p className="text-lg text-text-muted">
            Articles and thoughts on software engineering, architecture, and technology.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="glass-panel overflow-hidden border-border rounded-2xl"
        >
          
          {/* Card Body */}
          <div className="p-8 md:p-12 text-left">
            {portfolioData.posts && portfolioData.posts.length > 0 ? (
              <div className="grid gap-8">
                {portfolioData.posts.map((post) => (
                  <motion.div 
                    key={post.slug}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group relative rounded-2xl border border-border bg-surface/50 p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <p className="text-sm text-primary mb-2 font-mono">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <h2 className="font-heading text-2xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
                      <Link to={`/blog/${post.slug}`} className="before:absolute before:inset-0 before:z-10">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-text-muted leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                      Read Article <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center text-center py-10">
                <motion.div 
                  className="mb-6 rounded-2xl bg-primary/10 p-5 relative"
                  animate={{ boxShadow: ['0 0 0 rgba(100,100,255,0)', '0 0 20px rgba(100,100,255,0.1)', '0 0 0 rgba(100,100,255,0)'] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <FileText className="h-10 w-10 text-primary" />
                </motion.div>
                
                <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">
                  Coming Soon
                </h2>
                
                <p className="text-text-muted mb-10 max-w-md leading-relaxed">
                  The blog system is currently under construction. I'm building a modern engine to share my technical writings. Check back soon!
                </p>
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  )
}
