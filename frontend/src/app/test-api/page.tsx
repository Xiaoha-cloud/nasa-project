"use client"

import { apiService, APODData, MarsPhoto, NEOData } from "@/lib/api"
import { useEffect, useState } from "react"

export default function TestAPIPage() {
  const [apodData, setApodData] = useState<APODData | null>(null)
  const [marsData, setMarsData] = useState<{ photos: MarsPhoto[] } | null>(null)
  const [neoData, setNeoData] = useState<NEOData[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const testAPIs = async () => {
      setLoading(true)
      setError(null)
      
      try {
        // Test APOD API
        const apod = await apiService.getAPOD()
        setApodData(apod)
        
        // Test Mars API
        const mars = await apiService.getMarsPhotos("curiosity", "2023-01-01")
        setMarsData(mars)
        
        // Test NEO API
        const neo = await apiService.getNEOs("2024-01-01", "2024-01-07")
        setNeoData(neo)
        
      } catch (err) {
        console.error('API Test Error:', err)
        setError(err instanceof Error ? err.message : 'API test failed')
      } finally {
        setLoading(false)
      }
    }

    testAPIs()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Testing APIs...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white text-center mb-8">API Test Results</h1>
        
        {/* APOD Test */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">APOD API Test</h2>
          {apodData ? (
            <div className="text-white space-y-2">
              <p><strong>Title:</strong> {apodData.title}</p>
              <p><strong>Date:</strong> {apodData.date}</p>
              <p><strong>Media Type:</strong> {apodData.media_type}</p>
              <p><strong>URL:</strong> <a href={apodData.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">{apodData.url}</a></p>
              <p className="text-green-400">✅ APOD API working correctly!</p>
            </div>
          ) : (
            <p className="text-red-400">❌ APOD API failed</p>
          )}
        </div>

        {/* Mars Test */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Mars API Test</h2>
          {marsData ? (
            <div className="text-white space-y-2">
              <p><strong>Photos Count:</strong> {marsData.photos?.length || 0}</p>
              <p><strong>First Photo ID:</strong> {marsData.photos?.[0]?.id || 'N/A'}</p>
              <p><strong>Rover:</strong> {marsData.photos?.[0]?.rover?.name || 'N/A'}</p>
              <p className="text-green-400">✅ Mars API working correctly!</p>
            </div>
          ) : (
            <p className="text-red-400">❌ Mars API failed</p>
          )}
        </div>

        {/* NEO Test */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">NEO API Test</h2>
          {neoData ? (
            <div className="text-white space-y-2">
              <p><strong>Total NEOs:</strong> {neoData.length}</p>
              <p><strong>First NEO:</strong> {neoData[0]?.name || 'N/A'}</p>
              <p><strong>Hazardous NEOs:</strong> {neoData.filter(neo => neo.is_potentially_hazardous_asteroid).length}</p>
              <p className="text-green-400">✅ NEO API working correctly!</p>
            </div>
          ) : (
            <p className="text-red-400">❌ NEO API failed</p>
          )}
        </div>

        <div className="text-center">
          <p className="text-green-400 text-xl font-bold">🎉 All APIs are working correctly!</p>
          <p className="text-white/60 mt-2">Frontend is successfully communicating with the backend</p>
        </div>
      </div>
    </div>
  )
} 