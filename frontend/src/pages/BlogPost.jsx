import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, FileWarning, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import portfolioData from '@/data/portfolio-data.json'

export default function BlogPost() {
  const { slug } = useParams()
  
  const post = portfolioData.posts?.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center p-6">
        <Helmet>
          <title>Post Not Found — Edwin Gigi</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel max-w-lg w-full p-8 text-center border-border"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-error/10">
            <FileWarning className="h-8 w-8 text-error" />
          </div>
          
          <h1 className="mb-2 font-heading text-2xl font-bold text-text-primary">
            Transmission Interrupted
          </h1>
          
          <p className="mb-8 text-text-muted">
            The requested data packet "<span className="font-mono text-primary">{slug}</span>" could not be retrieved from the main server. The blog module is currently offline.
          </p>

          <Button asChild variant="default" className="w-full">
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" /> Return to Blog Index
            </Link>
          </Button>
        </motion.div>
      </div>
    )
  }

  // Split content by double newlines to simulate paragraphs
  const paragraphs = post.content.split('\n\n')

  return (
    <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <Helmet>
        <title>{post.title} — Edwin Gigi</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button asChild variant="ghost" className="mb-8 -ml-4 text-text-muted">
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </Button>

        <header className="mb-12 max-w-3xl">
          <div className="flex items-center text-primary mb-4 text-sm font-mono">
            <Calendar className="mr-2 h-4 w-4" />
            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-text-primary md:text-5xl lg:text-6xl mb-6">
            {post.title}
          </h1>
          <p className="text-xl text-text-muted leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        <div className="glass-panel p-8 md:p-12 rounded-3xl border-border">
          <article className="prose prose-invert prose-indigo max-w-none text-text-muted leading-loose">
            {paragraphs.map((p, idx) => (
              <p 
                key={idx} 
                className="mb-6 text-lg" 
                dangerouslySetInnerHTML={{ __html: p }} 
              />
            ))}
          </article>
        </div>
      </motion.div>
    </div>
  )
}
