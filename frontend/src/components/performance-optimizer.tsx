"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
    Clock,
    Gauge,
    HardDrive,
    Network,
    RefreshCw,
    TrendingDown,
    TrendingUp,
    Zap
} from "lucide-react"
import { useEffect, useState } from "react"

interface PerformanceMetrics {
  loadTime: number
  bundleSize: number
  cacheHitRate: number
  apiResponseTime: number
  memoryUsage: number
  networkRequests: number
}

export function PerformanceOptimizer() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    bundleSize: 0,
    cacheHitRate: 0,
    apiResponseTime: 0,
    memoryUsage: 0,
    networkRequests: 0
  })
  const [isOptimizing, setIsOptimizing] = useState(false)

  useEffect(() => {
    // Simulate performance monitoring
    const interval = setInterval(() => {
      setMetrics({
        loadTime: Math.random() * 2000 + 500,
        bundleSize: Math.random() * 500 + 200,
        cacheHitRate: Math.random() * 100,
        apiResponseTime: Math.random() * 1000 + 100,
        memoryUsage: Math.random() * 100,
        networkRequests: Math.floor(Math.random() * 20) + 5
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const optimizePerformance = async () => {
    setIsOptimizing(true)
    
    // Simulate optimization process
    setTimeout(() => {
      setMetrics(prev => ({
        ...prev,
        loadTime: prev.loadTime * 0.7,
        apiResponseTime: prev.apiResponseTime * 0.6,
        cacheHitRate: Math.min(prev.cacheHitRate * 1.2, 100)
      }))
      setIsOptimizing(false)
    }, 3000)
  }

  const getPerformanceScore = () => {
    const score = (
      (100 - (metrics.loadTime / 2000) * 30) +
      (100 - (metrics.bundleSize / 500) * 20) +
      (metrics.cacheHitRate * 0.3) +
      (100 - (metrics.apiResponseTime / 1000) * 20)
    ) / 4

    return Math.max(0, Math.min(100, score))
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400"
    if (score >= 70) return "text-yellow-400"
    return "text-red-400"
  }

  const performanceScore = getPerformanceScore()

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Gauge className="w-5 h-5 text-blue-400" />
            Performance Monitor
          </CardTitle>
          <CardDescription className="text-white/70">
            Real-time performance metrics and optimization tools
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Performance Score */}
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-white">
              {performanceScore.toFixed(0)}
            </div>
            <div className={`text-lg font-medium ${getScoreColor(performanceScore)}`}>
              Performance Score
            </div>
            <Progress value={performanceScore} className="h-2" />
          </div>

          {/* Performance Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white/80 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Load Time
                </span>
                <Badge variant="outline" className="text-white border-white/20">
                  {metrics.loadTime.toFixed(0)}ms
                </Badge>
              </div>
              <Progress value={100 - (metrics.loadTime / 2000) * 100} className="h-1" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white/80 flex items-center gap-2">
                  <HardDrive className="w-4 h-4" />
                  Bundle Size
                </span>
                <Badge variant="outline" className="text-white border-white/20">
                  {metrics.bundleSize.toFixed(0)}KB
                </Badge>
              </div>
              <Progress value={100 - (metrics.bundleSize / 500) * 100} className="h-1" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white/80 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Cache Hit Rate
                </span>
                <Badge variant="outline" className="text-white border-white/20">
                  {metrics.cacheHitRate.toFixed(1)}%
                </Badge>
              </div>
              <Progress value={metrics.cacheHitRate} className="h-1" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white/80 flex items-center gap-2">
                  <Network className="w-4 h-4" />
                  API Response
                </span>
                <Badge variant="outline" className="text-white border-white/20">
                  {metrics.apiResponseTime.toFixed(0)}ms
                </Badge>
              </div>
              <Progress value={100 - (metrics.apiResponseTime / 1000) * 100} className="h-1" />
            </div>
          </div>

          {/* Optimization Actions */}
          <div className="space-y-3">
            <Button 
              onClick={optimizePerformance}
              disabled={isOptimizing}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isOptimizing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Optimizing...
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Optimize Performance
                </>
              )}
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 border-white/20 text-white">
                <TrendingDown className="w-4 h-4 mr-2" />
                Clear Cache
              </Button>
              <Button variant="outline" size="sm" className="flex-1 border-white/20 text-white">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 