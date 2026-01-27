import Link from "next/link"
import { IoArrowBack, IoSearchOutline } from "react-icons/io5"

export default function ProjectNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="text-8xl font-bold text-primary mb-4">404</div>
          <IoSearchOutline className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
        </div>
        
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Project Not Found
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8">
          Sorry, we couldn't find the project you're looking for. It may have been moved or doesn't exist.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            <IoArrowBack className="h-5 w-5" />
            Back to Projects
          </Link>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-border text-foreground font-semibold hover:bg-muted transition-colors"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
