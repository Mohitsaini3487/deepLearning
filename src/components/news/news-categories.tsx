'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  GraduationCap, 
  Vote, 
  Heart, 
  Tractor, 
  Shield, 
  Globe,
  ExternalLink,
  Clock,
  TrendingUp
} from 'lucide-react'
import { motion } from 'framer-motion'

interface NewsItem {
  id: string
  title: string
  description: string
  category: string
  source: string
  publishedAt: string
  url: string
  imageUrl?: string
}

const categories = [
  {
    id: 'education',
    name: 'Educational News',
    icon: GraduationCap,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50'
  },
  {
    id: 'politics',
    name: 'Politics News',
    icon: Vote,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50'
  },
  {
    id: 'medical',
    name: 'Medical News',
    icon: Heart,
    color: 'from-red-500 to-pink-500',
    bgColor: 'bg-red-50'
  },
  {
    id: 'farming',
    name: 'Farming News',
    icon: Tractor,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50'
  },
  {
    id: 'cybercrime',
    name: 'Cyber Crime',
    icon: Shield,
    color: 'from-gray-500 to-slate-500',
    bgColor: 'bg-gray-50'
  },
  {
    id: 'international',
    name: 'International News',
    icon: Globe,
    color: 'from-indigo-500 to-blue-500',
    bgColor: 'bg-indigo-50'
  }
]

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'New Education Policy Implementation Begins',
    description: 'The government has started implementing the new education policy across all states with focus on digital learning...',
    category: 'education',
    source: 'Education Times',
    publishedAt: '2024-01-15T10:30:00Z',
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=200&fit=crop'
  },
  {
    id: '2',
    title: 'Election Commission Announces Poll Dates',
    description: 'The Election Commission has announced the schedule for upcoming assembly elections in five states...',
    category: 'politics',
    source: 'Political Daily',
    publishedAt: '2024-01-15T09:15:00Z',
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a052e?w=400&h=200&fit=crop'
  },
  {
    id: '3',
    title: 'Breakthrough in Cancer Research',
    description: 'Scientists have discovered a new treatment method that shows promising results in cancer therapy...',
    category: 'medical',
    source: 'Medical Journal',
    publishedAt: '2024-01-15T08:45:00Z',
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=200&fit=crop'
  },
  {
    id: '4',
    title: 'New Farming Techniques Boost Crop Yield',
    description: 'Farmers are adopting new sustainable farming techniques that have shown 40% increase in crop production...',
    category: 'farming',
    source: 'Agriculture Today',
    publishedAt: '2024-01-15T07:30:00Z',
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=200&fit=crop'
  },
  {
    id: '5',
    title: 'Major Cyber Attack on Banking Systems',
    description: 'Security experts have detected a sophisticated cyber attack targeting multiple banking institutions...',
    category: 'cybercrime',
    source: 'Cyber Security News',
    publishedAt: '2024-01-15T06:20:00Z',
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop'
  },
  {
    id: '6',
    title: 'Global Climate Summit Reaches Historic Agreement',
    description: 'World leaders have reached a landmark agreement on climate action at the Global Climate Summit...',
    category: 'international',
    source: 'World News',
    publishedAt: '2024-01-15T05:45:00Z',
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-9508153775c7?w=400&h=200&fit=crop'
  }
]

export default function NewsCategories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [newsItems, setNewsItems] = useState<NewsItem[]>(mockNews)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    // Simulate news updates every hour
    const interval = setInterval(() => {
      setLastUpdate(new Date())
      // In a real app, this would fetch fresh news
    }, 3600000) // 1 hour

    return () => clearInterval(interval)
  }, [])

  const getCategoryNews = (categoryId: string) => {
    return newsItems.filter(item => item.category === categoryId)
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {categories.map((category) => {
        const Icon = category.icon
        const categoryNews = getCategoryNews(category.id)
        
        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: category.id === 'education' ? 0.1 : 0.2 }}
            whileHover={{ y: -5 }}
            className="h-full"
          >
            <Card className={`h-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${category.bgColor} border-0 overflow-hidden`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color} text-white`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-lg font-semibold">{category.name}</CardTitle>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {categoryNews.length} articles
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>Updated {formatTimeAgo(lastUpdate)}</span>
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                <ScrollArea className="h-64 px-4 pb-4">
                  <div className="space-y-3">
                    {categoryNews.map((news, index) => (
                      <motion.div
                        key={news.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex space-x-3">
                          {news.imageUrl && (
                            <img
                              src={news.imageUrl}
                              alt={news.title}
                              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm line-clamp-2 mb-1">
                              {news.title}
                            </h4>
                            <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                              {news.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">{news.source}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 text-xs"
                                onClick={() => window.open(news.url, '_blank')}
                              >
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="p-4 border-t bg-white/50">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View All {category.name}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}