"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Brain, Loader2, Sparkles, Zap } from "lucide-react"
import { useState } from "react"

interface AIAnalysis {
  type: string
  confidence: number
  description: string
  tags: string[]
}

export function AIFeatures() {
  const [query, setQuery] = useState("")
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null)
  const [loading, setLoading] = useState(false)

  const analyzeImage = async () => {
    if (!query.trim()) return

    setLoading(true)
    setAnalysis(null)

    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis: AIAnalysis = {
        type: "Space Object",
        confidence: 0.94,
        description: "This appears to be a celestial body, likely a planet or moon with distinct surface features including craters and geological formations.",
        tags: ["celestial body", "crater", "geological", "space exploration"]
      }
      setAnalysis(mockAnalysis)
      setLoading(false)
    }, 2000)
  }

  const generateDescription = async () => {
    setLoading(true)
    
    // Simulate AI description generation
    setTimeout(() => {
      setAnalysis({
        type: "Generated Description",
        confidence: 0.87,
        description: "This stunning image captures the beauty of our cosmic neighborhood, showcasing the intricate details of celestial bodies that have fascinated astronomers for centuries.",
        tags: ["cosmic", "astronomy", "beautiful", "detailed"]
      })
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            AI-Powered Space Analysis
          </CardTitle>
          <CardDescription className="text-white/70">
            Leverage artificial intelligence to analyze space images and generate detailed descriptions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ai-query" className="text-white/80">
              Describe what you see or ask about an image:
            </Label>
            <div className="flex gap-2">
              <Input
                id="ai-query"
                placeholder="e.g., 'What celestial body is this?' or 'Describe this space image'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
              />
              <Button 
                onClick={analyzeImage}
                disabled={loading || !query.trim()}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Analyze
              </Button>
            </div>
          </div>

          <Button 
            onClick={generateDescription}
            disabled={loading}
            variant="outline"
            className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
          >
            <Zap className="w-4 h-4 mr-2" />
            Generate AI Description
          </Button>
        </CardContent>
      </Card>

      {analysis && (
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              AI Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-white/80">Type:</span>
                <span className="text-white font-medium">{analysis.type}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Confidence:</span>
                <span className="text-green-400 font-medium">{(analysis.confidence * 100).toFixed(1)}%</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-white/80">Description:</Label>
              <p className="text-white/90 leading-relaxed">{analysis.description}</p>
            </div>

            <div className="space-y-2">
              <Label className="text-white/80">Tags:</Label>
              <div className="flex flex-wrap gap-2">
                {analysis.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 