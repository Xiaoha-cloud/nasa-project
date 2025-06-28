"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Calendar,
    Filter,
    Search,
    SlidersHorizontal,
    X
} from "lucide-react"
import { useState } from "react"

interface SearchFilters {
  query: string
  mediaType: string
  yearStart: string
  yearEnd: string
  location: string
  keywords: string[]
}

interface SearchResult {
  id: number;
  title: string;
  description: string;
  mediaType: string;
  year: string;
  location: string;
}

export function AdvancedSearch() {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    mediaType: "all",
    yearStart: "",
    yearEnd: "",
    location: "",
    keywords: []
  })
  const [showFilters, setShowFilters] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const mediaTypes = [
    { value: "all", label: "All Media" },
    { value: "image", label: "Images" },
    { value: "video", label: "Videos" },
    { value: "audio", label: "Audio" }
  ]

  const locations = [
    "Mars",
    "Moon",
    "International Space Station",
    "Hubble Space Telescope",
    "James Webb Space Telescope",
    "Earth",
    "Jupiter",
    "Saturn"
  ]

  const addKeyword = (keyword: string) => {
    if (keyword.trim() && !filters.keywords.includes(keyword.trim())) {
      setFilters(prev => ({
        ...prev,
        keywords: [...prev.keywords, keyword.trim()]
      }))
    }
  }

  const removeKeyword = (keyword: string) => {
    setFilters(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }))
  }

  const handleSearch = async () => {
    setIsSearching(true)
    
    // Simulate search with filters
    setTimeout(() => {
      const mockResults = [
        {
          id: 1,
          title: "Mars Surface Exploration",
          description: "Detailed view of Mars surface features",
          mediaType: "image",
          year: "2023",
          location: "Mars"
        },
        {
          id: 2,
          title: "Hubble Deep Field",
          description: "Deep space observation by Hubble",
          mediaType: "image",
          year: "2022",
          location: "Hubble Space Telescope"
        }
      ]
      
      setSearchResults(mockResults)
      setIsSearching(false)
    }, 2000)
  }

  const clearFilters = () => {
    setFilters({
      query: "",
      mediaType: "all",
      yearStart: "",
      yearEnd: "",
      location: "",
      keywords: []
    })
    setSearchResults([])
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Search className="w-5 h-5 text-green-400" />
            Advanced NASA Search
          </CardTitle>
          <CardDescription className="text-white/70">
            Search NASA&apos;s vast collection with advanced filters and criteria
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Main Search Bar */}
          <div className="space-y-2">
            <Label htmlFor="search-query" className="text-white/80">
              Search Query
            </Label>
            <div className="flex gap-2">
              <Input
                id="search-query"
                placeholder="Search for space images, videos, and more..."
                value={filters.query}
                onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
                className="bg-white/10 border-white/20 text-white flex-1"
              />
              <Button 
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="border-white/20 text-white"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </Button>
              <Button 
                onClick={handleSearch}
                disabled={isSearching || !filters.query.trim()}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSearching ? "Searching..." : <Search className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="space-y-4 p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-medium flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Advanced Filters
                </h4>
                <Button 
                  onClick={clearFilters}
                  variant="ghost"
                  size="sm"
                  className="text-white/70 hover:text-white"
                >
                  Clear All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Media Type */}
                <div className="space-y-2">
                  <Label className="text-white/80">Media Type</Label>
                  <Select 
                    value={filters.mediaType} 
                    onValueChange={(value) => setFilters(prev => ({ ...prev, mediaType: value }))}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mediaTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label className="text-white/80">Location</Label>
                  <Select 
                    value={filters.location} 
                    onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Year Range */}
                <div className="space-y-2">
                  <Label className="text-white/80 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Year Start
                  </Label>
                  <Input
                    type="number"
                    placeholder="2020"
                    value={filters.yearStart}
                    onChange={(e) => setFilters(prev => ({ ...prev, yearStart: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Year End
                  </Label>
                  <Input
                    type="number"
                    placeholder="2024"
                    value={filters.yearEnd}
                    onChange={(e) => setFilters(prev => ({ ...prev, yearEnd: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>

              {/* Keywords */}
              <div className="space-y-2">
                <Label className="text-white/80">Keywords</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add keyword and press Enter"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addKeyword(e.currentTarget.value)
                        e.currentTarget.value = ''
                      }
                    }}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                {filters.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {filters.keywords.map(keyword => (
                      <Badge 
                        key={keyword} 
                        variant="secondary"
                        className="bg-green-500/20 text-green-300 border-green-500/30"
                      >
                        {keyword}
                        <button
                          onClick={() => removeKeyword(keyword)}
                          className="ml-1 hover:text-red-300"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-white font-medium">Search Results ({searchResults.length})</h4>
              <div className="space-y-2">
                {searchResults.map(result => (
                  <div 
                    key={result.id}
                    className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h5 className="text-white font-medium">{result.title}</h5>
                        <p className="text-white/70 text-sm">{result.description}</p>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-xs border-white/20 text-white/80">
                            {result.mediaType}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-white/20 text-white/80">
                            {result.year}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-white/20 text-white/80">
                            {result.location}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 