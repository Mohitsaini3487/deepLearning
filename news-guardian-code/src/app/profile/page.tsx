'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Linkedin, 
  Github,
  Camera,
  Save,
  Edit,
  CheckCircle,
  AlertCircle,
  Shield,
  History,
  Settings,
  FileText,
  Calendar
} from 'lucide-react'
import { motion } from 'framer-motion'

interface UserProfile {
  name: string
  username: string
  email: string
  phone: string
  bio: string
  location: string
  website: string
  linkedin: string
  avatar: string
  isVerified: boolean
  joinDate: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    username: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
    website: '',
    linkedin: '',
    avatar: '',
    isVerified: false,
    joinDate: ''
  })
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [usernameError, setUsernameError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      
      // Load profile data (mock data for demo)
      setProfile({
        name: parsedUser.name || 'John Doe',
        username: parsedUser.username || 'johndoe123',
        email: parsedUser.email || 'john@example.com',
        phone: '+91 98765 43210',
        bio: 'Passionate about fighting misinformation and promoting media literacy. Working towards a more informed society.',
        location: 'Mumbai, India',
        website: 'https://johndoe.com',
        linkedin: 'https://linkedin.com/in/johndoe',
        avatar: '',
        isVerified: true,
        joinDate: '2024-01-01'
      })
    } else {
      router.push('/auth')
    }
  }, [router])

  const validateUsername = (username: string) => {
    const usernameRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/
    if (!usernameRegex.test(username)) {
      setUsernameError('Username must contain at least 6 characters, one uppercase letter, and one number')
      return false
    }
    setUsernameError('')
    return true
  }

  const handleSave = async () => {
    if (!validateUsername(profile.username)) {
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Update localStorage
      if (user) {
        const updatedUser = { ...user, name: profile.name, username: profile.username }
        localStorage.setItem('user', JSON.stringify(updatedUser))
        setUser(updatedUser)
      }

      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      setIsEditing(false)
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfile(prev => ({ ...prev, avatar: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const userStats = [
    { label: 'News Analyzed', value: '247', icon: History },
    { label: 'Fake News Detected', value: '23', icon: Shield },
    { label: 'Summaries Created', value: '89', icon: FileText },
    { label: 'Member Since', value: 'Jan 2024', icon: Calendar }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar user={user} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Profile Settings
          </h1>
          <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
        </motion.div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Alert className={message.type === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
              {message.type === 'success' ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
                {message.text}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <Avatar className="w-24 h-24 mx-auto">
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                      <AvatarFallback className="text-2xl">
                        {profile.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1 cursor-pointer hover:bg-blue-700 transition-colors">
                        <Camera className="w-4 h-4" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-1">{profile.name}</h2>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-gray-600">@{profile.username}</span>
                    {profile.isVerified && (
                      <Badge variant="secondary" className="text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-4">Member since {new Date(profile.joinDate).toLocaleDateString()}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {userStats.map((stat, index) => (
                      <div key={stat.label} className="text-center p-3 bg-gray-50 rounded-lg">
                        <stat.icon className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                        <div className="text-lg font-semibold">{stat.value}</div>
                        <div className="text-xs text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {!isEditing && (
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="w-full"
                      variant="outline"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Profile Information</span>
                </CardTitle>
                <CardDescription>
                  {isEditing ? 'Edit your profile information' : 'View your profile information'}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="social">Social Links</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={profile.username}
                          onChange={(e) => {
                            setProfile(prev => ({ ...prev, username: e.target.value }))
                            if (isEditing) {
                              validateUsername(e.target.value)
                            }
                          }}
                          disabled={!isEditing}
                        />
                        {usernameError && (
                          <p className="text-sm text-red-600">{usernameError}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          disabled
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={profile.phone}
                          onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself..."
                        value={profile.bio}
                        onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                        disabled={!isEditing}
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="social" className="space-y-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="website" className="flex items-center space-x-2">
                          <Globe className="w-4 h-4" />
                          <span>Website</span>
                        </Label>
                        <Input
                          id="website"
                          type="url"
                          placeholder="https://yourwebsite.com"
                          value={profile.website}
                          onChange={(e) => setProfile(prev => ({ ...prev, website: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="linkedin" className="flex items-center space-x-2">
                          <Linkedin className="w-4 h-4" />
                          <span>LinkedIn</span>
                        </Label>
                        <Input
                          id="linkedin"
                          type="url"
                          placeholder="https://linkedin.com/in/yourprofile"
                          value={profile.linkedin}
                          onChange={(e) => setProfile(prev => ({ ...prev, linkedin: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="preferences" className="space-y-4">
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium mb-2">Language Preferences</h4>
                        <p className="text-sm text-gray-600">Default language for news summaries: English</p>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium mb-2">Notification Settings</h4>
                        <p className="text-sm text-gray-600">Email notifications for important updates: Enabled</p>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium mb-2">Privacy Settings</h4>
                        <p className="text-sm text-gray-600">Profile visibility: Public</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-between items-center pt-4 border-t">
                  {!isEditing && (
                    <Button
                      onClick={() => router.push('/profile/settings')}
                      variant="outline"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Advanced Settings
                    </Button>
                  )}
                  {isEditing && (
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false)
                          setUsernameError('')
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSave}
                        disabled={isLoading || !!usernameError}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}