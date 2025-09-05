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
import { 
  Upload, 
  Link, 
  FileText, 
  Image, 
  Video, 
  Shield, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  Download,
  Share2,
  Eye,
  Loader2
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface DetectionResult {
  isFake: boolean
  confidence: number
  analysis: string
  similarNews?: Array<{
    title: string
    source: string
    url: string
    confidence: number
  }>
}

export default function FakeNewsDetection() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null)
  const [selectedMethod, setSelectedMethod] = useState<'text' | 'file' | 'link' | 'video'>('text')
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

  const analyzeContent = async () => {
    setIsAnalyzing(true)
    setDetectionResult(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Mock detection result
      const mockResult: DetectionResult = {
        isFake: Math.random() > 0.5,
        confidence: Math.floor(Math.random() * 30) + 70, // 70-100% confidence
        analysis: `The content has been analyzed using advanced AI algorithms that check for:
• Source credibility and reputation
• Factual accuracy and cross-referencing
• Linguistic patterns and sentiment analysis
• Historical context and timeline verification
• Author expertise and potential bias
• Supporting evidence and citations

The analysis indicates ${Math.random() > 0.5 ? 'strong evidence of authenticity' : 'several red flags that suggest potential misinformation'}.`,
        similarNews: [
          {
            title: 'Related News Article 1',
            source: 'Trusted News Source',
            url: '#',
            confidence: 85
          },
          {
            title: 'Related News Article 2',
            source: 'Another Reliable Source',
            url: '#',
            confidence: 78
          },
          {
            title: 'Related News Article 3',
            source: 'Verified News Outlet',
            url: '#',
            confidence: 92
          }
        ]
      }
      
      setDetectionResult(mockResult)
    } catch (error) {
      console.error('Analysis failed:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetForm = () => {
    setTextInput('')
    setLinkInput('')
    setUploadedFile(null)
    setDetectionResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600'
    if (confidence >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getConfidenceBadgeVariant = (confidence: number) => {
    if (confidence >= 90) return 'default'
    if (confidence >= 70) return 'secondary'
    return 'destructive'
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Shield className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Fake News Detection
          </h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload or paste your content to analyze its authenticity using our advanced AI-powered detection system
        </p>
      </motion.div>

      <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Content Analysis</span>
          </CardTitle>
          <CardDescription>
            Choose a method to submit your content for analysis
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs value={selectedMethod} onValueChange={(value) => setSelectedMethod(value as any)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="text" className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Text</span>
              </TabsTrigger>
              <TabsTrigger value="file" className="flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>File</span>
              </TabsTrigger>
              <TabsTrigger value="link" className="flex items-center space-x-2">
                <Link className="w-4 h-4" />
                <span>Link</span>
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center space-x-2">
                <Video className="w-4 h-4" />
                <span>Video</span>
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="text" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="text-input">Enter text content to analyze</Label>
                  <Textarea
                    id="text-input"
                    placeholder="Paste the news article or text content you want to analyze..."
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="min-h-[200px]"
                  />
                </div>
              </TabsContent>

              <TabsContent value="file" className="space-y-4">
                <div className="space-y-2">
                  <Label>Upload file for analysis</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".txt,.pdf,.doc,.docx,.jpg,.jpeg,.png"
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
                        Supports: TXT, PDF, DOC, DOCX, JPG, PNG
                      </p>
                    </label>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="link" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="link-input">Enter URL to analyze</Label>
                  <Input
                    id="link-input"
                    type="url"
                    placeholder="https://example.com/news-article"
                    value={linkInput}
                    onChange={(e) => setLinkInput(e.target.value)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="video" className="space-y-4">
                <div className="space-y-2">
                  <Label>Upload video file</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      Video analysis coming soon
                    </p>
                    <p className="text-sm text-gray-500">
                      Will support: MP4, AVI, MOV, WebM
                    </p>
                  </div>
                </div>
              </TabsContent>
            </div>

            <div className="flex justify-between items-center mt-6">
              <Button variant="outline" onClick={resetForm}>
                Reset
              </Button>
              <Button
                onClick={analyzeContent}
                disabled={
                  isAnalyzing ||
                  (selectedMethod === 'text' && !textInput.trim()) ||
                  (selectedMethod === 'file' && !uploadedFile) ||
                  (selectedMethod === 'link' && !linkInput.trim())
                }
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Analyze Content
                  </>
                )}
              </Button>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6"
          >
            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <div>
                    <h3 className="text-lg font-semibold">Analyzing Content...</h3>
                    <p className="text-gray-600">Our AI is checking for authenticity and credibility</p>
                  </div>
                  <Progress value={75} className="w-full max-w-sm mx-auto" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {detectionResult && (
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
                    {detectionResult.isFake ? (
                      <XCircle className="w-5 h-5 text-red-600" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                    <span>Analysis Results</span>
                  </CardTitle>
                  <Badge variant={getConfidenceBadgeVariant(detectionResult.confidence)}>
                    {detectionResult.confidence}% Confidence
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <Alert className={detectionResult.isFake ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}>
                  <AlertCircle className={`h-4 w-4 ${detectionResult.isFake ? 'text-red-600' : 'text-green-600'}`} />
                  <AlertDescription className={detectionResult.isFake ? 'text-red-800' : 'text-green-800'}>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold">
                        {detectionResult.isFake ? '⚠️ Fake News Detected' : '✅ Content Appears Authentic'}
                      </span>
                    </div>
                    <p className="text-sm">
                      Our analysis indicates this content is {detectionResult.isFake ? 'likely fake or misleading' : 'probably authentic and reliable'} with {detectionResult.confidence}% confidence.
                    </p>
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <h4 className="font-semibold">Detailed Analysis</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700 whitespace-pre-line">{detectionResult.analysis}</p>
                  </div>
                </div>

                {detectionResult.similarNews && detectionResult.similarNews.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold">Related News Articles</h4>
                    <div className="space-y-2">
                      {detectionResult.similarNews.map((news, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <h5 className="font-medium text-sm">{news.title}</h5>
                            <p className="text-xs text-gray-600">{news.source}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {news.confidence}% match
                            </Badge>
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Results
                    </Button>
                  </div>
                  <Button onClick={resetForm}>
                    Analyze Another
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