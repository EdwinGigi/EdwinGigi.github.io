import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, FileWarning } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function BlogPost() {
  const { slug } = useParams()

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
