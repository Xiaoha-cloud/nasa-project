import { Camera, Globe, ImageIcon, Telescope } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const features = [
  {
    title: "Astronomy Picture of the Day",
    description: "Discover the cosmos with NASA&apos;s daily featured image and explanation",
    icon: Telescope,
    href: "/apod",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Mars Rover Photos",
    description: "Explore the Red Planet through the eyes of NASA&apos;s Mars rovers",
    icon: Camera,
    href: "/mars",
    gradient: "from-red-500 to-orange-500",
  },
  {
    title: "Near Earth Objects",
    description: "Track asteroids and comets approaching our planet",
    icon: Globe,
    href: "/neo",
    gradient: "from-green-500 to-teal-500",
  },
  {
    title: "NASA Media Search",
    description: "Search through NASA's vast collection of images and videos",
    icon: ImageIcon,
    href: "/search",
    gradient: "from-blue-500 to-cyan-500",
  },
]

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-16">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white">NASA Explorer</h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
            Discover the wonders of space through NASA&apos;s incredible data and imagery. Explore planets, track asteroids,
            and journey through the cosmos.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature) => (
          <Link key={feature.title} href={feature.href}>
            <Card className="group h-full bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardHeader className="space-y-4">
                <div
                  className={`w-16 h-16 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/70 text-lg">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold text-blue-400">50+</div>
          <div className="text-white/80">Years of Space Exploration</div>
        </div>
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold text-purple-400">1M+</div>
          <div className="text-white/80">Images & Videos</div>
        </div>
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold text-green-400">24/7</div>
          <div className="text-white/80">Data Collection</div>
        </div>
      </section>
    </div>
  )
}
