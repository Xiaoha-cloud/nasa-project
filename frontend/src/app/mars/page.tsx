"use client"

import { useState, useEffect } from "react"
import { Camera, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

interface MarsPhoto {
  id: number
  img_src: string
  earth_date: string
  camera: {
    name: string
    full_name: string
  }
  rover: {
    name: string
  }
}

const rovers = [
  { value: "curiosity", label: "Curiosity" },
  { value: "opportunity", label: "Opportunity" },
  { value: "spirit", label: "Spirit" },
]

export default function MarsPage() {
  const [photos, setPhotos] = useState<MarsPhoto[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRover, setSelectedRover] = useState("curiosity")
  const [selectedDate, setSelectedDate] = useState("2023-01-01")

  // Mock Mars photos data
  const mockPhotos: MarsPhoto[] = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    img_src: `/placeholder.svg?height=300&width=400`,
    earth_date: selectedDate,
    camera: {
      name: "NAVCAM",
      full_name: "Navigation Camera",
    },
    rover: {
      name: selectedRover.charAt(0).toUpperCase() + selectedRover.slice(1),
    },
  }))

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setPhotos(mockPhotos)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [selectedRover, selectedDate])

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white">Mars Rover Photos</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Explore the Red Planet through the eyes of NASA's Mars rovers
        </p>
      </div>

      {/* Filter Bar */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rover" className="text-white/80">
                Rover:
              </Label>
              <Select value={selectedRover} onValueChange={setSelectedRover}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {rovers.map((rover) => (
                    <SelectItem key={rover.value} value={rover.value}>
                      {rover.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mars-date" className="text-white/80">
                Earth Date:
              </Label>
              <Input
                id="mars-date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Photos Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
          <span className="ml-2 text-white">Loading photos...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <Card
              key={photo.id}
              className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group"
            >
              <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <Image
                    src={photo.img_src || "/placeholder.svg"}
                    alt={`Mars photo by ${photo.rover.name}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white font-medium">{photo.camera.full_name}</p>
                      <p className="text-white/60 text-sm">{photo.rover.name} Rover</p>
                    </div>
                    <p className="text-blue-400 text-sm">{photo.earth_date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && photos.length === 0 && (
        <div className="text-center py-16">
          <p className="text-white/60">No photos available for the selected date and rover</p>
        </div>
      )}
    </div>
  )
}
