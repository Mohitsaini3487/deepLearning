'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/layout/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Monitor,
  Moon,
  Sun,
  Mail,
  Smartphone,
  Download,
  Upload,
  Trash2,
  Save,
  CheckCircle,
  AlertCircle,
  Lock,
  Eye,
  EyeOff,
  Settings
} from 'lucide-react'
import { motion } from 'framer-motion'

interface SettingsState {
  profile: {
    name: string
    email: string
    phone: string
    bio: string
    location: string
    website: string
  }
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
    newsUpdates: boolean
    securityAlerts: boolean
    marketing: boolean
  }
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends'
    showEmail: boolean
    showPhone: boolean
    dataCollection: boolean
    analytics: boolean
  }
  security: {
    twoFactor: boolean
    loginAlerts: boolean
    sessionTimeout: number
    passwordStrength: 'weak' | 'medium' | 'strong'
  }
  appearance: {
    theme: 'light' | 'dark' | 'auto'
    language: string
    fontSize: 'small' | 'medium' | 'large'
    animations: boolean
  }
}

export default function SettingsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [settings, setSettings] = useState<SettingsState>({
    profile: {
      name: '',
      email: '',
      phone: '',
      bio: '',
      location: '',
      website: ''
    },
    notifications: {
      email: true,
      push: true,
      sms: false,
      newsUpdates: true,
      securityAlerts: true,
      marketing: false
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false,
      dataCollection: true,
      analytics: true
    },
    security: {
      twoFactor: false,
      loginAlerts: true,
      sessionTimeout: 30,
      passwordStrength: 'medium'
    },
    appearance: {
      theme: 'light',
      language: 'en',
      fontSize: 'medium',
      animations: true
    }
  })
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated')
    const userData = localStorage.getItem('user')
    
    if (auth === 'true' && userData) {
      setIsAuthenticated(true)
      setUser(JSON.parse(userData))
      
      // Load mock settings data
      setSettings(prev => ({
        ...prev,
        profile: {
          name: JSON.parse(userData).name || 'John Doe',
          email: JSON.parse(userData).email || 'john@example.com',
          phone: '+91 98765 43210',
          bio: 'Passionate about fighting misinformation and promoting media literacy.',
          location: 'Mumbai, India',
          website: 'https://johndoe.com'
        }
      }))
    } else {
      router.push('/auth')
    }
  }, [router])

  const handleSave = async () => {
    setIsLoading(true)
    setMessage(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Update user data in localStorage
      if (user) {
        const updatedUser = { ...user, name: settings.profile.name }
        localStorage.setItem('user', JSON.stringify(updatedUser))
        setUser(updatedUser)
      }

      setMessage({ type: 'success', text: 'Settings saved successfully!' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save settings. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleExportData = () => {
    const userData = {
      profile: settings.profile,
      settings: settings,
      exportDate: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'newsguardian-data.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'mr', name: 'मराठी' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ' }
  ]

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
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Settings className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Settings
            </h1>
          </div>
          <p className="text-gray-600">Manage your account settings and preferences</p>
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

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Lock className="w-4 h-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center space-x-2">
              <Monitor className="w-4 h-4" />
              <span>Appearance</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="profile" className="space-y-6">
              <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information and profile details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={settings.profile.name}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          profile: { ...prev.profile, name: e.target.value }
                        }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.profile.email}
                        disabled
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={settings.profile.phone}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          profile: { ...prev.profile, phone: e.target.value }
                        }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={settings.profile.location}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          profile: { ...prev.profile, location: e.target.value }
                        }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={settings.profile.bio}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        profile: { ...prev.profile, bio: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={settings.profile.website}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        profile: { ...prev.profile, website: e.target.value }
                      }))}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how you want to receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Email Notifications</Label>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={settings.notifications.email}
                        onCheckedChange={(checked) => setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, email: checked }
                        }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Push Notifications</Label>
                        <p className="text-sm text-gray-500">Receive push notifications in browser</p>
                      </div>
                      <Switch
                        checked={settings.notifications.push}
                        onCheckedChange={(checked) => setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, push: checked }
                        }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">SMS Notifications</Label>
                        <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                      </div>
                      <Switch
                        checked={settings.notifications.sms}
                        onCheckedChange={(checked) => setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, sms: checked }
                        }))}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">News Updates</Label>
                        <p className="text-sm text-gray-500">Get notified about latest news</p>
                      </div>
                      <Switch
                        checked={settings.notifications.newsUpdates}
                        onCheckedChange={(checked) => setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, newsUpdates: checked }
                        }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Security Alerts</Label>
                        <p className="text-sm text-gray-500">Important security notifications</p>
                      </div>
                      <Switch
                        checked={settings.notifications.securityAlerts}
                        onCheckedChange={(checked) => setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, securityAlerts: checked }
                        }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Marketing Emails</Label>
                        <p className="text-sm text-gray-500">Product updates and marketing</p>
                      </div>
                      <Switch
                        checked={settings.notifications.marketing}
                        onCheckedChange={(checked) => setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, marketing: checked }
                        }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Control your privacy and data sharing preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Profile Visibility</Label>
                      <div className="flex space-x-2">
                        {(['public', 'private', 'friends'] as const).map((visibility) => (
                          <Button
                            key={visibility}
                            variant={settings.privacy.profileVisibility === visibility ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSettings(prev => ({
                              ...prev,
                              privacy: { ...prev.privacy, profileVisibility: visibility }
                            }))}
                          >
                            {visibility.charAt(0).toUpperCase() + visibility.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Show Email</Label>
                        <p className="text-sm text-gray-500">Display email on your profile</p>
                      </div>
                      <Switch
                        checked={settings.privacy.showEmail}
                        onCheckedChange={(checked) => setSettings(prev => ({
                          ...prev,
                          privacy: { ...prev.privacy, showEmail: checked }
                        }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Show Phone</Label>
                        <p className="text-sm text-gray-500">Display phone number on your profile</p>
                      </div>
                      <Switch
                        checked={settings.privacy.showPhone}
                        onCheckedChange={(checked) => setSettings(prev => ({
                          ...prev,
                          privacy: { ...prev.privacy, showPhone: checked }
                        }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Data Collection</Label>
                        <p className="text-sm text-gray-500">Allow collection of usage data</p>
                      </div>
                      <Switch
                        checked={settings.privacy.dataCollection}
                        onCheckedChange={(checked) => setSettings(prev => ({
                          ...prev,
                          privacy: { ...prev.privacy, dataCollection: checked }
                        }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Analytics</Label>
                        <p className="text-sm text-gray-500">Help improve NewsGuardian with analytics</p>
                      </div>
                      <Switch
                        checked={settings.privacy.analytics}
                        onCheckedChange={(checked) => setSettings(prev => ({
                          ...prev,
                          privacy: { ...prev.privacy, analytics: checked }
                        }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security and authentication</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-500">Add an extra layer of security</p>
                      </div>
                      <Switch
                        checked={settings.security.twoFactor}
                        onCheckedChange={(checked) => setSettings(prev => ({
                          ...prev,
                          security: { ...prev.security, twoFactor: checked }
                        }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Login Alerts</Label>
                        <p className="text-sm text-gray-500">Get notified about new logins</p>
                      </div>
                      <Switch
                        checked={settings.security.loginAlerts}
                        onCheckedChange={(checked) => setSettings(prev => ({
                          ...prev,
                          security: { ...prev.security, loginAlerts: checked }
                        }))}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Session Timeout (minutes)</Label>
                      <Input
                        type="number"
                        value={settings.security.sessionTimeout}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          security: { ...prev.security, sessionTimeout: parseInt(e.target.value) || 30 }
                        }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Password Strength</Label>
                      <div className="flex space-x-2">
                        {(['weak', 'medium', 'strong'] as const).map((strength) => (
                          <Badge
                            key={strength}
                            variant={settings.security.passwordStrength === strength ? 'default' : 'secondary'}
                            className="cursor-pointer"
                            onClick={() => setSettings(prev => ({
                              ...prev,
                              security: { ...prev.security, passwordStrength: strength }
                            }))}
                          >
                            {strength.charAt(0).toUpperCase() + strength.slice(1)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6">
              <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>Customize how NewsGuardian looks and feels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <div className="flex space-x-2">
                        {(['light', 'dark', 'auto'] as const).map((theme) => (
                          <Button
                            key={theme}
                            variant={settings.appearance.theme === theme ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSettings(prev => ({
                              ...prev,
                              appearance: { ...prev.appearance, theme: theme }
                            }))}
                          >
                            {theme === 'light' && <Sun className="w-4 h-4 mr-2" />}
                            {theme === 'dark' && <Moon className="w-4 h-4 mr-2" />}
                            {theme === 'auto' && <Monitor className="w-4 h-4 mr-2" />}
                            {theme.charAt(0).toUpperCase() + theme.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <div className="grid grid-cols-5 gap-2">
                        {languages.map((lang) => (
                          <Button
                            key={lang.code}
                            variant={settings.appearance.language === lang.code ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSettings(prev => ({
                              ...prev,
                              appearance: { ...prev.appearance, language: lang.code }
                            }))}
                            className="text-xs h-8"
                          >
                            {lang.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Font Size</Label>
                      <div className="flex space-x-2">
                        {(['small', 'medium', 'large'] as const).map((size) => (
                          <Button
                            key={size}
                            variant={settings.appearance.fontSize === size ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSettings(prev => ({
                              ...prev,
                              appearance: { ...prev.appearance, fontSize: size }
                            }))}
                          >
                            {size.charAt(0).toUpperCase() + size.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Animations</Label>
                        <p className="text-sm text-gray-500">Enable UI animations</p>
                      </div>
                      <Switch
                        checked={settings.appearance.animations}
                        onCheckedChange={(checked) => setSettings(prev => ({
                          ...prev,
                          appearance: { ...prev.appearance, animations: checked }
                        }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>

          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleExportData}>
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" className="text-red-600 hover:text-red-700">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
            <Button
              onClick={handleSave}
              disabled={isLoading}
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
        </Tabs>
      </main>
    </div>
  )
}