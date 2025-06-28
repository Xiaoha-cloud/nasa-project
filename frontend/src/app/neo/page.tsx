"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { apiService, NEOData } from "@/lib/api"
import { Calendar, Loader2, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface ChartData {
  name: string
  size: number
  distance: number
}

export default function NEOPage() {
  const [neoData, setNeoData] = useState<NEOData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [startDate, setStartDate] = useState("2024-01-01")
  const [endDate, setEndDate] = useState("2024-01-07")

  useEffect(() => {
    const fetchNEOs = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await apiService.getNEOs(startDate, endDate)
        // Backend now returns a flat array directly
        setNeoData(data)
      } catch (err) {
        console.error('Error fetching NEO data:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch NEO data')
        setNeoData([])
      } finally {
        setLoading(false)
      }
    }

    fetchNEOs()
  }, [startDate, endDate])

  const formatDistance = (distance: string) => {
    const km = parseFloat(distance)
    if (km >= 1000000) {
      return `${(km / 1000000).toFixed(1)}M km`
    }
    return `${(km / 1000).toFixed(0)}K km`
  }

  const formatVelocity = (velocity: string) => {
    const kmh = parseFloat(velocity)
    return `${(kmh / 1000).toFixed(0)}K km/h`
  }

  // Prepare chart data
  const chartData: ChartData[] = neoData.slice(0, 10).map(neo => ({
    name: neo.name,
    size: neo.estimated_diameter.kilometers.estimated_diameter_max,
    distance: parseFloat(neo.close_approach_data[0]?.miss_distance.kilometers || "0") / 1000000
  }))

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white">Near Earth Objects Dashboard</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">Track asteroids and comets approaching our planet</p>
      </div>

      {/* Filter Bar */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Date Range
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date" className="text-white/80">
                Start Date:
              </Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date" className="text-white/80">
                End Date:
              </Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-400 mb-4">Error: {error}</p>
          <p className="text-white/60 text-sm">Try selecting a different date range</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
          <span className="ml-2 text-white">Loading NEO data...</span>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Chart */}
          {chartData.length > 0 && (
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Asteroid Size vs Distance
                </CardTitle>
                <CardDescription className="text-white/60">
                  Relationship between asteroid size (km) and miss distance (million km)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                          color: "#F9FAFB",
                        }}
                      />
                      <Bar dataKey="size" fill="#3B82F6" name="Size (km)" />
                      <Bar dataKey="distance" fill="#10B981" name="Distance (M km)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {/* NEO Table */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Near Earth Objects</CardTitle>
              <CardDescription className="text-white/60">
                Detailed information about approaching asteroids
              </CardDescription>
            </CardHeader>
            <CardContent>
              {neoData.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10">
                      <TableHead className="text-white/80">Name</TableHead>
                      <TableHead className="text-white/80">Hazardous</TableHead>
                      <TableHead className="text-white/80">Size (km)</TableHead>
                      <TableHead className="text-white/80">Velocity (km/h)</TableHead>
                      <TableHead className="text-white/80">Miss Distance</TableHead>
                      <TableHead className="text-white/80">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {neoData.map((neo) => (
                      <TableRow key={neo.id} className="border-white/10">
                        <TableCell className="text-white">
                          <a 
                            href={neo.nasa_jpl_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 underline"
                          >
                            {neo.name}
                          </a>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={neo.is_potentially_hazardous_asteroid ? "destructive" : "secondary"}
                            className={neo.is_potentially_hazardous_asteroid ? "bg-red-500" : "bg-green-500"}
                          >
                            {neo.is_potentially_hazardous_asteroid ? "Yes" : "No"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-white">
                          {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(3)}
                        </TableCell>
                        <TableCell className="text-white">
                          {formatVelocity(neo.close_approach_data[0]?.relative_velocity.kilometers_per_hour || "0")}
                        </TableCell>
                        <TableCell className="text-white">
                          {formatDistance(neo.close_approach_data[0]?.miss_distance.kilometers || "0")}
                        </TableCell>
                        <TableCell className="text-white">
                          {neo.close_approach_data[0]?.close_approach_date || "N/A"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <p className="text-white/60">No NEO data available for the selected date range</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
