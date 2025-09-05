'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/navbar'
import NewsCategories from '@/components/news/news-categories'
import AIChatbot from '@/components/chatbot/ai-chatbot'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  FileText, 
  FileSymlink, 
  TrendingUp, 
  Users, 
  Award,
  Zap,
  Globe,
  Target,
  Eye,
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  Bell,
  Smartphone,
  Code,
  BookOpen,
  Flag
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [user, setUser] = useState({
    email: 'demo@newsguardian.com',
    name: 'Demo User'
  })
  const router = useRouter()

  useEffect(() => {
    // Temporarily bypass authentication for demo
    setIsAuthenticated(true)
    setUser({
      email: 'demo@newsguardian.com',
      name: 'Demo User'
    })
    
    // Original authentication code (commented out for demo)
    /*
    const auth = localStorage.getItem('isAuthenticated')
    const userData = localStorage.getItem('user')
    
    if (auth === 'true' && userData) {
      setIsAuthenticated(true)
      setUser(JSON.parse(userData))
    } else {
      router.push('/auth')
    }
    */
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

  const features = [
    {
      icon: Shield,
      title: 'Fake News Detection',
      description: 'Advanced AI algorithms to detect and analyze fake news with high accuracy',
      color: 'from-blue-500 to-cyan-500',
      link: '/detect'
    },
    {
      icon: FileSymlink,
      title: 'News Summarization',
      description: 'Get concise summaries of news articles in multiple Indian languages',
      color: 'from-purple-500 to-pink-500',
      link: '/summarize'
    },
    {
      icon: Globe,
      title: 'Real-time News',
      description: 'Stay updated with verified news from 6 different categories',
      color: 'from-green-500 to-emerald-500',
      link: '/news'
    },
    {
      icon: Target,
      title: 'AI Assistant',
      description: '24/7 AI chatbot support for all your queries about news and platform features',
      color: 'from-orange-500 to-red-500',
      link: '#'
    }
  ]

  const stats = [
    { label: 'News Articles Analyzed', value: '2.5M+', icon: Eye },
    { label: 'Fake News Detected', value: '150K+', icon: Shield },
    { label: 'Active Users', value: '50K+', icon: Users },
    { label: 'Languages Supported', value: '10+', icon: Globe }
  ]

  const additionalFeatures = [
    {
      title: 'Source Verification',
      description: 'Verify the credibility of news sources and authors',
      icon: CheckCircle
    },
    {
      title: 'Historical Analysis',
      description: 'Track the evolution and spread of news stories over time',
      icon: TrendingUp
    },
    {
      title: 'Social Media Integration',
      description: 'Analyze news shared on social media platforms',
      icon: Users
    },
    {
      title: 'Custom Alerts',
      description: 'Get notified about breaking news in your areas of interest',
      icon: Bell
    },
    {
      title: 'Fact Check Database',
      description: 'Access our comprehensive database of fact-checked claims',
      icon: Award
    },
    {
      title: 'Browser Extension',
      description: 'Detect fake news while browsing with our Chrome extension',
      icon: Zap
    },
    {
      title: 'Mobile App',
      description: 'Access all features on-the-go with our mobile application',
      icon: Smartphone
    },
    {
      title: 'API Access',
      description: 'Integrate our detection capabilities into your own applications',
      icon: Code
    },
    {
      title: 'Educational Resources',
      description: 'Learn about media literacy and fake news detection',
      icon: BookOpen
    },
    {
      title: 'Community Reports',
      description: 'Report suspicious news and help our community stay informed',
      icon: Flag
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar user={user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Welcome to NewsGuardian
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Your trusted companion in the fight against misinformation. Detect fake news, 
            summarize articles, and stay informed with verified news from around the world.
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              onClick={() => router.push('/detect')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Shield className="mr-2 h-4 w-4" />
              Start Detecting
            </Button>
            <Button 
              variant="outline"
              onClick={() => router.push('/summarize')}
            >
              <FileSymlink className="mr-2 h-4 w-4" />
              Summarize News
            </Button>
          </div>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                <CardContent className="p-6">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => feature.link !== '#' && router.push(feature.link)}
                className="cursor-pointer"
              >
                <Card className="h-full border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} p-2 mb-4`}>
                      <feature.icon className="w-full h-full text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Additional Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="h-full border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <feature.icon className="w-6 h-6 text-purple-600" />
                      <h3 className="font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick News Preview */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Latest News</h2>
            <Button 
              variant="outline"
              onClick={() => router.push('/news')}
            >
              View All News
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <NewsCategories />
        </div>
      </main>

      <AIChatbot />
    </div>
  )
}