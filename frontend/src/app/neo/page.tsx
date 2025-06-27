"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Calendar, Loader2, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

interface NEOData {
  id: string
  name: string
  is_potentially_hazardous: boolean
  estimated_diameter_km_max: number
  close_approach_data: {
    close_approach_date: string
    miss_distance_km: string
    relative_velocity_kmh: string
  }[]
}

const mockNEOData: NEOData[] = [
  {
    id: "1",
    name: "2023 AB1",
    is_potentially_hazardous: true,
    estimated_diameter_km_max: 0.5,
    close_approach_data: [
      {
        close_approach_date: "2023-12-15",
        miss_distance_km: "7500000",
        relative_velocity_kmh: "25000",
      },
    ],
  },
  {
    id: "2",
    name: "2023 CD2",
    is_potentially_hazardous: false,
    estimated_diameter_km_max: 0.2,
    close_approach_data: [
      {
        close_approach_date: "2023-12-20",
        miss_distance_km: "15000000",
        relative_velocity_kmh: "18000",
      },
    ],
  },
  {
    id: "3",
    name: "2023 EF3",
    is_potentially_hazardous: false,
    estimated_diameter_km_max: 0.8,
    close_approach_data: [
      {
        close_approach_date: "2023-12-25",
        miss_distance_km: "12000000",
        relative_velocity_kmh: "22000",
      },
    ],
  },
]

const chartData = [
  { name: "2023 AB1", size: 0.5, distance: 7.5 },
  { name: "2023 CD2", size: 0.2, distance: 15.0 },
  { name: "2023 EF3", size: 0.8, distance: 12.0 },
]

export default function NEOPage() {
  const [neoData, setNeoData] = useState<NEOData[]>([])
  const [loading, setLoading] = useState(true)
  const [startDate, setStartDate] = useState("2023-12-01")
  const [endDate, setEndDate] = useState("2023-12-31")

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setNeoData(mockNEOData)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [startDate, endDate])

  const formatNumber = (num: string) => {
    return Number.parseInt(num).toLocaleString()
  }

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

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
          <span className="ml-2 text-white">Loading NEO data...</span>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Chart */}
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

          {/* NEO Table */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Near Earth Objects</CardTitle>
              <CardDescription className="text-white/60">
                Detailed information about approaching asteroids
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead className="text-white/80">Name</TableHead>
                    <TableHead className="text-white/80">Hazardous</TableHead>
                    <TableHead className="text-white/80">Size (km)</TableHead>
                    <TableHead className="text-white/80">Velocity (km/h)</TableHead>
                    <TableHead className="text-white/80">Miss Distance (km)</TableHead>
                    <TableHead className="text-white/80">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {neoData.map((neo) => (
                    <TableRow key={neo.id} className="border-white/10">
                      <TableCell className="text-white font-medium">{neo.name}</TableCell>
                      <TableCell>
                        {neo.is_potentially_hazardous ? (
                          <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                            <AlertTriangle className="w-3 h-3" />
                            Yes
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                            No
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-white/80">{neo.estimated_diameter_km_max.toFixed(2)}</TableCell>
                      <TableCell className="text-white/80">
                        {formatNumber(neo.close_approach_data[0].relative_velocity_kmh)}
                      </TableCell>
                      <TableCell className="text-white/80">
                        {formatNumber(neo.close_approach_data[0].miss_distance_km)}
                      </TableCell>
                      <TableCell className="text-blue-400">{neo.close_approach_data[0].close_approach_date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
