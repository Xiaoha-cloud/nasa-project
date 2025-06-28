"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Maximize2,
    Menu,
    Minimize2,
    Monitor,
    Smartphone,
    Tablet,
    X
} from "lucide-react"
import { useEffect, useState } from "react"

interface ResponsiveLayoutProps {
  children: React.ReactNode
  className?: string
}

export function ResponsiveLayout({ children, className = "" }: ResponsiveLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 768) {
        setScreenSize('mobile')
      } else if (width < 1024) {
        setScreenSize('tablet')
      } else {
        setScreenSize('desktop')
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const getScreenIcon = () => {
    switch (screenSize) {
      case 'mobile':
        return <Smartphone className="w-4 h-4" />
      case 'tablet':
        return <Tablet className="w-4 h-4" />
      case 'desktop':
        return <Monitor className="w-4 h-4" />
    }
  }

  return (
    <div className={`relative ${className}`}>
      {/* Responsive Header */}
      <div className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            
            <div className="flex items-center gap-2">
              {getScreenIcon()}
              <span className="text-white/80 text-sm capitalize">{screenSize}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/10"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 z-40 bg-black/90 backdrop-blur-md border-b border-white/10">
          <div className="p-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start text-white">
              Home
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white">
              APOD
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white">
              Mars Rover
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white">
              NEO
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white">
              Search
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-4">
        {/* Responsive Grid */}
        <div className={`
          grid gap-4
          ${screenSize === 'mobile' ? 'grid-cols-1' : ''}
          ${screenSize === 'tablet' ? 'grid-cols-2' : ''}
          ${screenSize === 'desktop' ? 'grid-cols-3 lg:grid-cols-4' : ''}
        `}>
          {children}
        </div>

        {/* Responsive Features */}
        <div className="mt-8 space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Responsive Design</h3>
                  <p className="text-white/70 text-sm">
                    Optimized for {screenSize} screens
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-white/80 text-xs">
                    {window.innerWidth} × {window.innerHeight}
                  </div>
                  <div className="text-white/60 text-xs">
                    {screenSize === 'mobile' ? 'Touch optimized' : 
                     screenSize === 'tablet' ? 'Hybrid interface' : 'Full desktop experience'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Tips */}
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <h3 className="text-white font-medium mb-2">Performance Tips</h3>
              <div className="space-y-2 text-sm text-white/70">
                {screenSize === 'mobile' && (
                  <p>• Use landscape mode for better viewing</p>
                )}
                {screenSize === 'tablet' && (
                  <p>• Split-screen mode available</p>
                )}
                {screenSize === 'desktop' && (
                  <p>• Multiple windows supported</p>
                )}
                <p>• Images are automatically optimized for your screen</p>
                <p>• Data is cached for faster loading</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 