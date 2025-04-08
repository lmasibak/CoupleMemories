"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  Home,
  Upload,
  ImageIcon,
  Heart,
  Zap,
  User,
  Link,
  Mail,
  Phone,
  MapPin,
  Gamepad2,
  Check,
  Fingerprint,
  Map,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// Map component imports removed to fix loading error

export default function MobileApp() {
  const [currentScreen, setCurrentScreen] = useState("onboarding")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [favorites, setFavorites] = useState([false, true, false, false])
  const [isVibrating, setIsVibrating] = useState(false)
  const [linkCode, setLinkCode] = useState("")
  const [isLinked, setIsLinked] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [theme, setTheme] = useState({
    primary: "#FF69B4",
    secondary: "#4169E1",
    background: "#FFF0F5",
  })
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null)
  const [partnerLocation, setPartnerLocation] = useState<GeolocationCoordinates | null>(null)
  const [mood, setMood] = useState("happy")
  const [quizScore, setQuizScore] = useState(0)
  const [profilePicture, setProfilePicture] = useState("/placeholder.svg?height=80&width=80")
  const [uploadTitle, setUploadTitle] = useState("")
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [checkInLocation, setCheckInLocation] = useState<GeolocationCoordinates | null>(null)
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setSelectedFile(file)
    if (file && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation(position.coords)
      })
    }
  }

  const toggleFavorite = (index: number) => {
    setFavorites((prev) => {
      const newFavorites = [...prev]
      newFavorites[index] = !newFavorites[index]
      return newFavorites
    })
  }

  const sendVibration = () => {
    if (!isLinked) {
      toast({
        title: "Device not linked",
        description: "Please link your device with your partner's device first.",
        duration: 3000,
      })
      return
    }

    setIsVibrating(true)
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCheckInLocation(position.coords)
      })
    }
    toast({
      title: "Love Vibration Sent!",
      description: "Your partner will feel the love soon!",
      duration: 3000,
    })
    setTimeout(() => setIsVibrating(false), 1000)
  }

  const generateLinkCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    setLinkCode(code)
  }

  const linkDevice = () => {
    setIsLinked(true)
    toast({
      title: "Devices Linked!",
      description: "You can now send love vibrations to your partner.",
      duration: 3000,
    })
  }

  const handleLogin = (email: string, password: string) => {
    // Implement actual login logic here
    setIsLoggedIn(true)
    setCurrentScreen("home")
  }

  const handleSignUp = (email: string, password: string) => {
    // Implement actual sign-up logic here
    setIsLoggedIn(true)
    setCurrentScreen("home")
  }

  const handleQuickSignUp = (type: "email" | "phone", value: string) => {
    // Implement actual quick sign-up logic here
    setIsLoggedIn(true)
    setCurrentScreen("home")
  }

  const handleMoodChange = (newMood: string) => {
    setMood(newMood)
    toast({
      title: "Mood Updated",
      description: `Your mood has been set to ${newMood}. Your partner will be notified.`,
      duration: 3000,
    })
  }

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePicture(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = () => {
    if (selectedFile && uploadTitle) {
      // Implement actual upload logic here
      setUploadSuccess(true)
      toast({
        title: "Upload Successful",
        description: "Your memory has been uploaded successfully!",
        duration: 3000,
      })
      setTimeout(() => setUploadSuccess(false), 3000)
    } else {
      toast({
        title: "Upload Failed",
        description: "Please select a file and choose a title.",
        duration: 3000,
      })
    }
  }

  const handleBiometricLogin = () => {
    // In a real app, you would use the Web Authentication API here
    toast({
      title: "Biometric Authentication",
      description: "Biometric login successful!",
      duration: 3000,
    })
    setIsLoggedIn(true)
    setCurrentScreen("home")
  }

  const updateLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation(position.coords)
        setViewport({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          zoom: 12,
        })
      })
    }
  }

  const simulatePartnerLocation = () => {
    // This is a mock function to simulate partner's location
    // In a real app, you would receive this data from a server
    setPartnerLocation({
      latitude: location ? location.latitude + (Math.random() - 0.5) * 0.01 : 0,
      longitude: location ? location.longitude + (Math.random() - 0.5) * 0.01 : 0,
      accuracy: 10,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    })
  }

  useEffect(() => {
    if (isVibrating && "vibrate" in navigator) {
      navigator.vibrate(1000)
    }
  }, [isVibrating])

  useEffect(() => {
    updateLocation()
    const intervalId = setInterval(updateLocation, 60000) // Update location every minute
    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (isLinked) {
      simulatePartnerLocation()
      const intervalId = setInterval(simulatePartnerLocation, 30000) // Update partner's location every 30 seconds
      return () => clearInterval(intervalId)
    }
  }, [isLinked, location])

  const memories = [
    { id: 1, title: "First Date", image: "/placeholder.svg?height=150&width=150", favorite: false },
    { id: 2, title: "Anniversary Dinner", image: "/placeholder.svg?height=150&width=150", favorite: true },
    { id: 3, title: "Beach Vacation", image: "/placeholder.svg?height=150&width=150", favorite: false },
    { id: 4, title: "Movie Night", image: "/placeholder.svg?height=150&width=150", favorite: false },
  ]

  const quizQuestions = [
    {
      question: "What's your partner's favorite color?",
      options: ["Red", "Blue", "Green", "Yellow"],
      correctAnswer: "Blue",
    },
    {
      question: "Where did you have your first date?",
      options: ["Restaurant", "Park", "Movie Theater", "Beach"],
      correctAnswer: "Restaurant",
    },
    {
      question: "What's your partner's dream vacation destination?",
      options: ["Paris", "Tokyo", "New York", "Bali"],
      correctAnswer: "Bali",
    },
  ]

  const uploadTitles = [
    "First Date",
    "Anniversary",
    "Vacation",
    "Date Night",
    "Special Occasion",
    "Surprise Gift",
    "Romantic Dinner",
    "Weekend Getaway",
    "Proposal",
    "Wedding Day",
    "Honeymoon",
    "Milestone Celebration",
  ]

  const OnboardingScreen = () => (
    <div className="flex flex-col items-center justify-center h-full space-y-6 p-4">
      <h1 className="text-3xl font-bold text-primary">Welcome to Couple Memories</h1>
      <p className="text-center text-muted-foreground">Create and cherish beautiful moments with your loved one.</p>
      <Button onClick={() => setCurrentScreen("auth")} className="w-full">
        Get Started
      </Button>
    </div>
  )

  const AuthScreen = () => (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials to access your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <Button onClick={() => handleLogin("email", "password")} className="w-full">
              Login
            </Button>
            <Button onClick={handleBiometricLogin} className="w-full mt-2">
              <Fingerprint className="mr-2 h-4 w-4" />
              Login with Biometrics
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Create a new account to get started.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="new-email">Email</Label>
              <Input id="new-email" type="email" placeholder="john@example.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new-password">Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <Button onClick={() => handleSignUp("email", "password")} className="w-full">
              Sign Up
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Quick Sign Up</h3>
        <div className="space-y-2">
          <div className="flex space-x-2">
            <Input placeholder="Enter your email" />
            <Button onClick={() => handleQuickSignUp("email", "email@example.com")}>
              <Mail className="mr-2 h-4 w-4" />
              Sign Up with Email
            </Button>
          </div>
          <div className="flex space-x-2">
            <Input placeholder="Enter your phone number" />
            <Button onClick={() => handleQuickSignUp("phone", "+1234567890")}>
              <Phone className="mr-2 h-4 w-4" />
              Sign Up with Phone
            </Button>
          </div>
        </div>
      </div>
    </Tabs>
  )

  const QuizScreen = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState("")

    const handleAnswer = () => {
      if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
        setQuizScore(quizScore + 1)
      }
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer("")
      } else {
        toast({
          title: "Quiz Completed!",
          description: `Your score: ${quizScore + 1}/${quizQuestions.length}`,
          duration: 3000,
        })
        setCurrentScreen("home")
      }
    }

    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Couple's Quiz</CardTitle>
          <CardDescription>Test your knowledge about your partner!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="text-lg font-semibold">{quizQuestions[currentQuestion].question}</h3>
          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
          <Button onClick={handleAnswer} disabled={!selectedAnswer}>
            {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
          </Button>
        </CardContent>
      </Card>
    )
  }

  const MapScreen = () => (
    <div className="h-[400px] w-full flex flex-col items-center justify-center bg-muted rounded-lg p-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold">Partner Location Map</h3>
        <p className="text-sm text-muted-foreground">Map visualization is currently unavailable</p>
      </div>

      {location && (
        <div className="bg-background p-3 rounded-md shadow mb-2 flex items-center">
          <MapPin className="text-primary h-6 w-6 mr-2" />
          <div>
            <p className="text-sm font-medium">Your Location</p>
            <p className="text-xs text-muted-foreground">
              Lat: {location.latitude.toFixed(4)}, Long: {location.longitude.toFixed(4)}
            </p>
          </div>
        </div>
      )}

      {partnerLocation && (
        <div className="bg-background p-3 rounded-md shadow flex items-center">
          <Heart className="text-secondary h-6 w-6 mr-2" />
          <div>
            <p className="text-sm font-medium">Partner's Location</p>
            <p className="text-xs text-muted-foreground">
              Lat: {partnerLocation.latitude.toFixed(4)}, Long: {partnerLocation.longitude.toFixed(4)}
            </p>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: theme.background }}>
      {currentScreen === "onboarding" && <OnboardingScreen />}
      {currentScreen === "auth" && <AuthScreen />}
      {isLoggedIn && (
        <>
          <header className="bg-primary text-primary-foreground p-4 sticky top-0 z-10">
            <h1 className="text-2xl font-bold text-center">Couple Memories</h1>
          </header>
          <main className="flex-1 overflow-y-auto p-4">
            {currentScreen === "home" && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-secondary">Welcome back, lovebirds!</h2>
                <Card className="bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle className="text-primary">Recent Memories</CardTitle>
                    <CardDescription>Your latest captured moments</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-3 gap-2">
                    <img src="/placeholder.svg?height=80&width=80" alt="Recent memory 1" className="rounded-md" />
                    <img src="/placeholder.svg?height=80&width=80" alt="Recent memory 2" className="rounded-md" />
                    <img src="/placeholder.svg?height=80&width=80" alt="Recent memory 3" className="rounded-md" />
                  </CardContent>
                </Card>
                <Card className="bg-secondary text-secondary-foreground">
                  <CardHeader>
                    <CardTitle>Memory Streak</CardTitle>
                    <CardDescription className="text-secondary-foreground/70">You're on a roll!</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold text-center">7 days</p>
                  </CardContent>
                </Card>
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={sendVibration}
                  disabled={isVibrating || !isLinked}
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Send Love Vibration
                </Button>
                {checkInLocation && (
                  <Alert>
                    <MapPin className="h-4 w-4" />
                    <AlertTitle>Check-in Location</AlertTitle>
                    <AlertDescription>
                      Lat: {checkInLocation.latitude.toFixed(4)}, Long: {checkInLocation.longitude.toFixed(4)}
                    </AlertDescription>
                  </Alert>
                )}
                <Button
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  onClick={() => setCurrentScreen("quiz")}
                >
                  <Gamepad2 className="mr-2 h-4 w-4" />
                  Take Couple's Quiz
                </Button>
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => setCurrentScreen("map")}
                >
                  <Map className="mr-2 h-4 w-4" />
                  View Partner Location
                </Button>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="mood">Current Mood:</Label>
                  <Select onValueChange={handleMoodChange} defaultValue={mood}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select your mood" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="happy">Happy</SelectItem>
                      <SelectItem value="sad">Sad</SelectItem>
                      <SelectItem value="excited">Excited</SelectItem>
                      <SelectItem value="tired">Tired</SelectItem>
                      <SelectItem value="angry">Angry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentScreen === "upload" && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-secondary">Upload a New Memory</h2>
                <div className="space-y-2">
                  <Label htmlFor="memory-photo" className="text-foreground">
                    Choose a photo
                  </Label>
                  <Input
                    id="memory-photo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="bg-input text-foreground"
                  />
                </div>
                {selectedFile && (
                  <div className="aspect-video relative">
                    <img
                      src={URL.createObjectURL(selectedFile) || "/placeholder.svg"}
                      alt="Selected memory"
                      className="absolute inset-0 w-full h-full object-cover rounded-md"
                    />
                  </div>
                )}
                {location && (
                  <div className="text-sm text-muted-foreground">
                    <MapPin className="inline-block mr-1 h-4 w-4" />
                    Location: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="memory-title" className="text-foreground">
                    Title
                  </Label>
                  <Select onValueChange={setUploadTitle}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a title for your memory" />
                    </SelectTrigger>
                    <SelectContent>
                      {uploadTitles.map((title, index) => (
                        <SelectItem key={index} value={title}>
                          {title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="memory-description" className="text-foreground">
                    Description
                  </Label>
                  <Textarea
                    id="memory-description"
                    placeholder="Describe this special moment"
                    className="bg-input text-foreground"
                  />
                </div>
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleUpload}
                >
                  Upload Memory
                </Button>
                {uploadSuccess && (
                  <Alert>
                    <Check className="h-4 w-4" />
                    <AlertTitle>Upload Successful</AlertTitle>
                    <AlertDescription>Your memory has been uploaded successfully!</AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {currentScreen === "gallery" && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-secondary">Your Memory Gallery</h2>
                <div className="grid grid-cols-2 gap-4">
                  {memories.map((memory, index) => (
                    <Card key={memory.id} className="bg-card text-card-foreground">
                      <CardContent className="p-2">
                        <div className="aspect-square relative mb-2">
                          <img
                            src={memory.image || "/placeholder.svg"}
                            alt={memory.title}
                            className="absolute inset-0 w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm">{memory.title}</span>
                          <Button variant="ghost" size="icon" onClick={() => toggleFavorite(index)}>
                            <Heart
                              className={favorites[index] ? "fill-primary text-primary" : "text-muted-foreground"}
                            />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {currentScreen === "favorites" && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-secondary">Favorite Memories</h2>
                <div className="grid grid-cols-2 gap-4">
                  {memories
                    .filter((_, index) => favorites[index])
                    .map((memory, index) => (
                      <Card key={memory.id} className="bg-card text-card-foreground">
                        <CardContent className="p-2">
                          <div className="aspect-square relative mb-2">
                            <img
                              src={memory.image || "/placeholder.svg"}
                              alt={memory.title}
                              className="absolute inset-0 w-full h-full object-cover rounded-md"
                            />
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-sm">{memory.title}</span>
                            <Button variant="ghost" size="icon" onClick={() => toggleFavorite(index)}>
                              <Heart className="fill-primary text-primary" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            )}

            {currentScreen === "profile" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-secondary">Your Profile</h2>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <AvatarImage src={profilePicture} alt="Profile picture" />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleProfilePictureChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <div>
                    <h3 className="text-lg font-medium">John & Partner</h3>
                    <p className="text-muted-foreground">Together since: June 15, 2020</p>
                    <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                      Change Picture
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="user-name" className="text-foreground">
                      Your Name
                    </Label>
                    <Input id="user-name" defaultValue="John" className="bg-input text-foreground mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="partner-name" className="text-foreground">
                      Partner's Name
                    </Label>
                    <Input id="partner-name" defaultValue="Partner" className="bg-input text-foreground mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="anniversary" className="text-foreground">
                      Anniversary Date
                    </Label>
                    <Input
                      id="anniversary"
                      type="date"
                      defaultValue="2020-06-15"
                      className="bg-input text-foreground mt-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-secondary">Device Linking</h3>
                  {isLinked ? (
                    <p className="text-muted-foreground">Your device is linked with your partner's device.</p>
                  ) : (
                    <div className="space-y-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                            <Link className="mr-2 h-4 w-4" />
                            Generate Link Code
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Link Your Devices</DialogTitle>
                            <DialogDescription>
                              Share this code with your partner to link your devices.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex items-center justify-center">
                            <p className="text-3xl font-bold">{linkCode}</p>
                          </div>
                          <Button onClick={generateLinkCode}>Generate New Code</Button>
                        </DialogContent>
                      </Dialog>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Enter partner's code"
                          className="bg-input text-foreground"
                          value={linkCode}
                          onChange={(e) => setLinkCode(e.target.value)}
                        />
                        <Button onClick={linkDevice}>Link</Button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-secondary">Color Customization</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="primary-color">Primary Color</Label>
                      <Input
                        id="primary-color"
                        type="color"
                        value={theme.primary}
                        onChange={(e) => setTheme({ ...theme, primary: e.target.value })}
                        className="h-10 w-full"
                      />
                    </div>
                    <div>
                      <Label htmlFor="secondary-color">Secondary Color</Label>
                      <Input
                        id="secondary-color"
                        type="color"
                        value={theme.secondary}
                        onChange={(e) => setTheme({ ...theme, secondary: e.target.value })}
                        className="h-10 w-full"
                      />
                    </div>
                    <div>
                      <Label htmlFor="background-color">Background Color</Label>
                      <Input
                        id="background-color"
                        type="color"
                        value={theme.background}
                        onChange={(e) => setTheme({ ...theme, background: e.target.value })}
                        className="h-10 w-full"
                      />
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
              </div>
            )}

            {currentScreen === "quiz" && <QuizScreen />}
            {currentScreen === "map" && <MapScreen />}
          </main>
          <nav className="border-t border-border bg-background sticky bottom-0 z-10">
            <div className="flex justify-around p-2">
              <Button variant="ghost" onClick={() => setCurrentScreen("home")}>
                <Home className={currentScreen === "home" ? "text-primary" : "text-muted-foreground"} />
              </Button>
              <Button variant="ghost" onClick={() => setCurrentScreen("upload")}>
                <Upload className={currentScreen === "upload" ? "text-primary" : "text-muted-foreground"} />
              </Button>
              <Button variant="ghost" onClick={() => setCurrentScreen("gallery")}>
                <ImageIcon className={currentScreen === "gallery" ? "text-primary" : "text-muted-foreground"} />
              </Button>
              <Button variant="ghost" onClick={() => setCurrentScreen("favorites")}>
                <Heart className={currentScreen === "favorites" ? "text-primary" : "text-muted-foreground"} />
              </Button>
              <Button variant="ghost" onClick={() => setCurrentScreen("profile")}>
                <User className={currentScreen === "profile" ? "text-primary" : "text-muted-foreground"} />
              </Button>
            </div>
          </nav>
        </>
      )}
    </div>
  )
}
