import { AdvancedSearch } from "@/components/advanced-search"
import { AIFeatures } from "@/components/ai-features"
import { PerformanceOptimizer } from "@/components/performance-optimizer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Camera,
    Clock,
    Database,
    Globe,
    Rocket,
    Satellite,
    Search,
    Star,
    Telescope,
    TrendingUp,
    Users
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const features = [
    {
      title: "Astronomy Picture of the Day",
      description: "Discover stunning daily space images with detailed explanations from NASA's APOD collection.",
      icon: Camera,
      href: "/apod",
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30"
    },
    {
      title: "Mars Rover Photos",
      description: "Explore the Red Planet through high-resolution images from various Mars rovers.",
      icon: Satellite,
      href: "/mars",
      color: "from-red-500/20 to-orange-500/20",
      borderColor: "border-red-500/30"
    },
    {
      title: "Near Earth Objects",
      description: "Track asteroids and comets approaching Earth with real-time data and visualizations.",
      icon: Globe,
      href: "/neo",
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30"
    },
    {
      title: "NASA Media Search",
      description: "Search through NASA's vast collection of images, videos, and audio recordings.",
      icon: Search,
      href: "/search",
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30"
    }
  ]

  const stats = [
    { label: "NASA APIs", value: "50+", icon: Database },
    { label: "Space Images", value: "1M+", icon: Camera },
    { label: "Real-time Data", value: "24/7", icon: Clock },
    { label: "Active Users", value: "10K+", icon: Users }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-white">
                NASA Explorer
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
                Explore the cosmos through NASA&apos;s vast collection of space data, images, and real-time information
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                <Rocket className="w-5 h-5 mr-2" />
                Start Exploring
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-3">
                <Telescope className="w-5 h-5 mr-2" />
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Explore Space Data
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Access NASA&apos;s comprehensive collection of space exploration data through our intuitive interface
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Link key={feature.title} href={feature.href}>
              <Card className={`bg-gradient-to-br ${feature.color} ${feature.borderColor} border hover:scale-105 transition-all duration-300 cursor-pointer group`}>
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70 text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center space-y-2">
              <div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Advanced Features
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Experience cutting-edge technology with AI-powered analysis and performance optimization
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Features */}
          <div className="lg:col-span-1">
            <AIFeatures />
          </div>

          {/* Performance Optimizer */}
          <div className="lg:col-span-1">
            <PerformanceOptimizer />
          </div>

          {/* Advanced Search */}
          <div className="lg:col-span-1">
            <AdvancedSearch />
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Built with Modern Technology
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Leveraging the latest web technologies for optimal performance and user experience
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "React 19", icon: "⚛️" },
            { name: "Next.js 15", icon: "▲" },
            { name: "TypeScript", icon: "📘" },
            { name: "Tailwind CSS", icon: "🎨" },
            { name: "Node.js", icon: "🟢" },
            { name: "Express.js", icon: "🚀" },
            { name: "NASA APIs", icon: "🛰️" },
            { name: "Vercel", icon: "⚡" }
          ].map((tech) => (
            <div key={tech.name} className="text-center p-6 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
              <div className="text-3xl mb-2">{tech.icon}</div>
              <div className="text-white font-medium">{tech.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to Explore the Cosmos?
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Join thousands of space enthusiasts discovering the wonders of our universe through NASA&apos;s data
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3">
              <Star className="w-5 h-5 mr-2" />
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-3">
              <TrendingUp className="w-5 h-5 mr-2" />
              View Documentation
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
