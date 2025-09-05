'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Upload, 
  Link, 
  FileText, 
  Globe, 
  Download,
  Share2,
  Copy,
  Volume2,
  Loader2,
  CheckCircle,
  File,
  Image as ImageIcon,
  FileVideo
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' }
]

interface SummaryResult {
  title: string
  summary: string[]
  keyPoints: string[]
  sentiment: 'positive' | 'negative' | 'neutral'
  category: string
  wordCount: number
  readingTime: number
}

export default function NewsSummarization() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [summaryResult, setSummaryResult] = useState<SummaryResult | null>(null)
  const [selectedMethod, setSelectedMethod] = useState<'link' | 'file' | 'text'>('link')
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [textInput, setTextInput] = useState('')
  const [linkInput, setLinkInput] = useState('')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const generateSummary = async () => {
    setIsProcessing(true)
    setSummaryResult(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Mock summary result
      const mockResult: SummaryResult = {
        title: 'Climate Change Summit Reaches Historic Agreement',
        summary: [
          'World leaders have reached a landmark agreement at the Global Climate Summit, committing to reduce carbon emissions by 45% by 2030.',
          'The agreement includes $100 billion in funding for developing nations to transition to clean energy.',
          'Major economies have pledged to phase out coal power and invest in renewable energy sources.',
          'The summit emphasized the urgent need for immediate action to prevent catastrophic climate change.'
        ],
        keyPoints: [
          '45% carbon emissions reduction target by 2030',
          '$100 billion climate fund for developing nations',
          'Coal power phase-out commitment',
          'Renewable energy investment acceleration',
          'Global cooperation on climate action'
        ],
        sentiment: 'positive',
        category: 'International News',
        wordCount: 156,
        readingTime: 1
      }
      
      setSummaryResult(mockResult)
    } catch (error) {
      console.error('Summarization failed:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const resetForm = () => {
    setTextInput('')
    setLinkInput('')
    setUploadedFile(null)
    setSummaryResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-100'
      case 'negative': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return '😊'
      case 'negative': return '😞'
      default: return '😐'
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <FileText className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            News Summarization
          </h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get concise summaries of news articles in your preferred language with AI-powered analysis
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-2">
          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Content Input</span>
              </CardTitle>
              <CardDescription>
                Choose a method to provide content for summarization
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs value={selectedMethod} onValueChange={(value) => setSelectedMethod(value as any)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="link" className="flex items-center space-x-2">
                    <Link className="w-4 h-4" />
                    <span>Link</span>
                  </TabsTrigger>
                  <TabsTrigger value="file" className="flex items-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>File</span>
                  </TabsTrigger>
                  <TabsTrigger value="text" className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Text</span>
                  </TabsTrigger>
                </TabsList>

                <div className="mt-6">
                  <TabsContent value="link" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="link-input">Enter article URL</Label>
                      <Input
                        id="link-input"
                        type="url"
                        placeholder="https://example.com/news-article"
                        value={linkInput}
                        onChange={(e) => setLinkInput(e.target.value)}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="file" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Upload file for summarization</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".txt,.pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.avi,.mov"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 mb-2">
                            {uploadedFile ? uploadedFile.name : 'Click to upload or drag and drop'}
                          </p>
                          <p className="text-sm text-gray-500">
                            Supports: TXT, PDF, DOC, Images, Videos
                          </p>
                        </label>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="text" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="text-input">Enter text content to summarize</Label>
                      <Textarea
                        id="text-input"
                        placeholder="Paste the news article or text content you want to summarize..."
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        className="min-h-[200px]"
                      />
                    </div>
                  </TabsContent>
                </div>

                {/* Language Selection */}
                <div className="mt-6">
                  <Label className="text-sm font-medium">Select Summary Language</Label>
                  <div className="grid grid-cols-5 gap-2 mt-2">
                    {languages.map((lang) => (
                      <Button
                        key={lang.code}
                        variant={selectedLanguage === lang.code ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedLanguage(lang.code)}
                        className="text-xs h-8"
                      >
                        {lang.nativeName}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <Button variant="outline" onClick={resetForm}>
                    Reset
                  </Button>
                  <Button
                    onClick={generateSummary}
                    disabled={
                      isProcessing ||
                      (selectedMethod === 'text' && !textInput.trim()) ||
                      (selectedMethod === 'file' && !uploadedFile) ||
                      (selectedMethod === 'link' && !linkInput.trim())
                    }
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-4 w-4" />
                        Generate Summary
                      </>
                    )}
                  </Button>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Language Info Panel */}
        <div className="lg:col-span-1">
          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>Language Support</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium">Selected Language</span>
                  <Badge variant="secondary">
                    {languages.find(l => l.code === selectedLanguage)?.nativeName}
                  </Badge>
                </div>
                
                <div className="text-sm text-gray-600">
                  <p className="mb-2">Our AI supports summarization in 10 major Indian languages:</p>
                  <ScrollArea className="h-40">
                    <div className="space-y-1">
                      {languages.map((lang) => (
                        <div key={lang.code} className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                          <span className="text-sm">{lang.nativeName}</span>
                          <span className="text-xs text-gray-500">{lang.name}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6"
          >
            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                  <div>
                    <h3 className="text-lg font-semibold">Processing Content...</h3>
                    <p className="text-gray-600">AI is analyzing and summarizing in {languages.find(l => l.code === selectedLanguage)?.nativeName}</p>
                  </div>
                  <Progress value={75} className="w-full max-w-sm mx-auto" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {summaryResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6"
          >
            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Summary Results</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className={getSentimentColor(summaryResult.sentiment)}>
                      {getSentimentIcon(summaryResult.sentiment)} {summaryResult.sentiment}
                    </Badge>
                    <Badge variant="outline">
                      {summaryResult.readingTime} min read
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  {summaryResult.title} • {summaryResult.wordCount} words
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="font-semibold">Summary</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ul className="space-y-2">
                      {summaryResult.summary.map((point, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-purple-600 mt-1">•</span>
                          <span className="text-sm text-gray-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Key Points</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {summaryResult.keyPoints.map((point, index) => (
                      <div key={index} className="bg-purple-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-purple-600 font-bold">{index + 1}.</span>
                          <span className="text-sm text-gray-700">{point}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(summaryResult.summary.join('\n'))}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm">
                      <Volume2 className="w-4 h-4 mr-2" />
                      Listen
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                  <Button onClick={resetForm}>
                    Summarize Another
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}