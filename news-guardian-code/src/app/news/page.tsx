'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/navbar'
import NewsCategories from '@/components/news/news-categories'
import AIChatbot from '@/components/chatbot/ai-chatbot'

export default function NewsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated')
    const userData = localStorage.getItem('user')
    
    if (auth === 'true' && userData) {
      setIsAuthenticated(true)
      setUser(JSON.parse(userData))
    } else {
      router.push('/auth')
    }
  }, [router])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar user={user} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            Latest News
          </h1>
          <p className="text-gray-600">Stay informed with verified news from various categories, updated every hour</p>
        </div>
        <NewsCategories />
      </main>
      <AIChatbot />
    </div>
  )
}