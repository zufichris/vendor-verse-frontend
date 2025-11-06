'use client'

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, Loader2, AlertCircle, ArrowRight } from "lucide-react"
import { verifyOtp } from "@/lib/actions/auth"

interface Props{
    token: string
    userId: string
}

export default function EmailConfirmed({ token, userId}:Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [countdown, setCountdown] = useState(3)
  const [status, setStatus]  = useState<'error' | 'success' | 'loading'>('loading');
  const [messageTitle, setMessageTitle]  = useState<string>('Confirming your email...')
  const [messageDescription, setMessageDescription]  = useState<string>('Please wait a moment')
  const [error, setError] = useState("")

  const callbackUrl = searchParams.get('callbackUrl') || '/'

  useEffect(() => {
    const confirmEmail = async () => {
      if (!token || !userId) {
        setError("Invalid confirmation link")
        setStatus("error")
        setMessageTitle('Error')
        setMessageDescription("Invalid confirmation link")
        return
      }

      try {
        const response = await verifyOtp({
            otp:token,
            callbackUrl,
            userId
        })

        if (!response.success) {
          throw new Error("Failed to confirm email")
        }

        setStatus("success")
        setMessageTitle('Email Confirmed!')
        setMessageDescription('Your email address has been successfully verified')
      } catch (err) {
        setMessageTitle('Confirmation Failed')
        setMessageDescription('We couldn\'t confirm your email address')
        setError(err instanceof Error ? err.message : "Something went wrong")
        setStatus("error")
      }
    }

    confirmEmail()
  }, [token, userId])

  useEffect(() => {
    if (status === "success") {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            router.push(callbackUrl)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [status, callbackUrl, router])

  const handleRedirect = () => {
    router.push(callbackUrl)
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/20 to-background">
        <Card className="w-full max-w-md border-border/50 shadow-xl">
          <CardContent className="pt-6 flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg font-medium">{messageTitle}</p>
            <p className="text-sm text-muted-foreground mt-2">{messageDescription}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/20 to-background">
        <Card className="w-full max-w-md border-border/50 shadow-xl">
          <CardHeader className="space-y-3 text-center pb-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl font-bold">{messageTitle}</CardTitle>
            <CardDescription className="text-base">{messageDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This confirmation link may be invalid or expired. Please try requesting a new confirmation email.
              </AlertDescription>
            </Alert>
            <Button onClick={() => (window.location.href = "/")} className="w-full" variant="outline">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/20 to-background">
      <Card className="w-full max-w-md border-border/50 shadow-xl">
        <CardHeader className="space-y-3 text-center pb-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl font-bold">{messageTitle}</CardTitle>
          <CardDescription className="text-base">{messageDescription}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Alert className="border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-400">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>You can now access all features of your account</AlertDescription>
          </Alert>

          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground mb-2">
              Redirecting in {countdown} second{countdown !== 1 ? "s" : ""}...
            </p>
            <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-1000 ease-linear"
                style={{ width: `${((3 - countdown) / 3) * 100}%` }}
              />
            </div>
          </div>

          <Button onClick={handleRedirect} className="w-full group">
            Continue to App
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
