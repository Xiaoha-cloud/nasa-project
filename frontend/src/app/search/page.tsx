"use client"

import type React from "react"

import { useState } from "react"
import { Search, Loader2, ExternalLink, Play } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface MediaItem {
  nasa_id: string
  title: string
  description: string
  media_type: string
  date_created: string
  keywords: string[]
  links: {
    href: string
    rel: string
  }[]
}

const mockMediaData: MediaItem[] = [
  {
    nasa_id: "PIA12345",
    title: "Hubble Space Telescope Views Jupiter",
    description:
      "This stunning image from the Hubble Space Telescope shows Jupiter in unprecedented detail, revealing the planet's atmospheric dynamics and the famous Great Red Spot.",
    media_type: "image",
    date_created: "2023-10-15",
    keywords: ["Jupiter", "Hubble", "Planet", "Solar System"],
    links: [{ href: "/placeholder.svg?height=300&width=400", rel: "preview" }],
  },
  {
    nasa_id: "PIA12346",
    title: "Mars Perseverance Rover Landing",
    description:
      "Historic footage of NASA&apos;s Perseverance rover landing on Mars, marking a new era in Mars exploration and the search for ancient microbial life.",
    media_type: "video",
    date_created: "2023-09-20",
    keywords: ["Mars", "Perseverance", "Landing", "Rover"],
    links: [{ href: "/placeholder.svg?height=300&width=400", rel: "preview" }],
  },
  {
    nasa_id: "PIA12347",
    title: "International Space Station Earth Views",
    description:
      "Breathtaking views of Earth from the International Space Station, showcasing our planet's beauty and the thin atmosphere that protects all life.",
    media_type: "image",
    date_created: "2023-11-01",
    keywords: ["ISS", "Earth", "Space Station", "Orbit"],
    links: [{ href: "/placeholder.svg?height=300&width=400", rel: "preview" }],
  },
  {
    nasa_id: "PIA12348",
    title: "James Webb Space Telescope Deep Field",
    description:
      "The deepest and sharpest infrared image of the distant universe captured by the James Webb Space Telescope, revealing galaxies billions of years old.",
    media_type: "image",
    date_created: "2023-08-10",
    keywords: ["JWST", "Deep Field", "Galaxies", "Universe"],
    links: [{ href: "/placeholder.svg?height=300&width=400", rel: "preview" }],
  },
  {
    nasa_id: "PIA12349",
    title: "Artemis Moon Mission Preparation",
    description:
      "Behind-the-scenes footage of NASA&apos;s Artemis program preparations, showcasing the next generation of lunar exploration technology.",
    media_type: "video",
    date_created: "2023-07-25",
    keywords: ["Artemis", "Moon", "Lunar", "Mission"],
    links: [{ href: "/placeholder.svg?height=300&width=400", rel: "preview" }],
  },
  {
    nasa_id: "PIA12350",
    title: "Solar Flare Activity",
    description:
      "Spectacular solar flare captured by NASA&apos;s Solar Dynamics Observatory, showing the Sun&apos;s dynamic and powerful magnetic field interactions.",
    media_type: "image",
    date_created: "2023-06-12",
    keywords: ["Sun", "Solar Flare", "SDO", "Magnetic Field"],
    links: [{ href: "/placeholder.svg?height=300&width=400", rel: "preview" }],
  },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setLoading(true)
    setHasSearched(true)

    // Simulate API call
    setTimeout(() => {
      const filteredResults = mockMediaData.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase())),
      )
      setSearchResults(filteredResults)
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white">NASA Media Search</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Search through NASA&apos;s vast collection of images and videos
        </p>
      </div>

      {/* Search Bar */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for images, videos, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Search Results */}
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
          <span className="ml-2 text-white">Searching NASA media...</span>
        </div>
      ) : hasSearched ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Search Results</h2>
            <p className="text-white/60">{searchResults.length} results found</p>
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((item) => (
                <Card
                  key={item.nasa_id}
                  className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group"
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-video overflow-hidden rounded-t-lg">
                      <Image
                        src={item.links[0]?.href || "/placeholder.svg?height=300&width=400"}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {item.media_type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/50 rounded-full p-3">
                            <Play className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      )}
                      <Badge className="absolute top-2 right-2 bg-black/70 text-white" variant="secondary">
                        {item.media_type}
                      </Badge>
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-blue-400 text-sm">{item.date_created}</p>
                      </div>
                      <p className="text-white/70 text-sm line-clamp-3">{item.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {item.keywords.slice(0, 3).map((keyword) => (
                          <Badge key={keyword} variant="outline" className="text-xs border-white/20 text-white/80">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-white/60 text-xs">ID: {item.nasa_id}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white/60">No results found for &quot;{searchQuery}&quot;</p>
              <p className="text-white/40 text-sm mt-2">Try different keywords or check your spelling</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16">
          <Search className="w-16 h-16 text-white/40 mx-auto mb-4" />
          <p className="text-white/60">Enter a search term to explore NASA&apos;s media collection</p>
        </div>
      )}
    </div>
  )
}
