"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Calendar, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

interface APODData {
  title: string
  explanation: string
  url: string
  date: string
  media_type: string
}

export default function APODPage() {
  const [apodData, setApodData] = useState<APODData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  // Mock APOD data - in real app, this would fetch from NASA API
  const mockAPODData: APODData = {
    title: "The Horsehead Nebula",
    explanation:
      "One of the most identifiable nebulae in the sky, the Horsehead Nebula in Orion, is part of a large, dark, molecular cloud. Also known as Barnard 33, the unusual shape was first discovered on a photographic plate in the late 1800s. The red glow originates from hydrogen gas predominantly behind the nebula, ionized by the nearby bright star Sigma Orionis.",
    url: "/placeholder.svg?height=600&width=800",
    date: selectedDate,
    media_type: "image",
  }

  useEffect(() => {
    // Simulate API call
    setLoading(true)
    const timer = setTimeout(() => {
      setApodData(mockAPODData)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [selectedDate])

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value)
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white">Astronomy Picture of the Day</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Discover the cosmos with NASA's featured image and detailed explanation
        </p>
      </div>

      {/* Date Picker */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Select Date
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Label htmlFor="date" className="text-white/80">
              Date:
            </Label>
            <Input
              id="date"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              max={new Date().toISOString().split("T")[0]}
              className="bg-white/10 border-white/20 text-white"
            />
            <Button onClick={() => setSelectedDate(new Date().toISOString().split("T")[0])}>Today</Button>
          </div>
        </CardContent>
      </Card>

      {/* APOD Content */}
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
          <span className="ml-2 text-white">Loading...</span>
        </div>
      ) : apodData ? (
        <div className="space-y-8">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                <Image src={apodData.url || "/placeholder.svg"} alt={apodData.title} fill className="object-cover" />
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{apodData.title}</h2>
                  <p className="text-blue-400">{apodData.date}</p>
                </div>
                <p className="text-white/80 leading-relaxed text-lg">{apodData.explanation}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-white/60">No data available for this date</p>
        </div>
      )}
    </div>
  )
}
