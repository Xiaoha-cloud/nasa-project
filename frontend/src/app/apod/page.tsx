"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Calendar, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { apiService, APODData } from "@/lib/api"

export default function APODPage() {
  const [apodData, setApodData] = useState<APODData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  useEffect(() => {
    const fetchAPOD = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await apiService.getAPOD(selectedDate)
        setApodData(data)
      } catch (err) {
        console.error('Error fetching APOD:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch APOD data')
      } finally {
        setLoading(false)
      }
    }

    fetchAPOD()
  }, [selectedDate])

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value)
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white">Astronomy Picture of the Day</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Discover the cosmos with NASA&apos;s featured image and detailed explanation
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
      ) : error ? (
        <div className="text-center py-16">
          <p className="text-red-400 mb-4">Error: {error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      ) : apodData ? (
        <div className="space-y-8">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                <Image 
                  src={apodData.url} 
                  alt={apodData.title} 
                  fill 
                  className="object-cover"
                  unoptimized={apodData.url.startsWith('http')}
                />
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{apodData.title}</h2>
                  <p className="text-blue-400">{apodData.date}</p>
                  {apodData.copyright && (
                    <p className="text-white/60 text-sm">© {apodData.copyright}</p>
                  )}
                </div>
                <p className="text-white/80 leading-relaxed text-lg">{apodData.explanation}</p>
                {apodData.hdurl && (
                  <div className="pt-4">
                    <a 
                      href={apodData.hdurl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      View HD Version
                    </a>
                  </div>
                )}
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
