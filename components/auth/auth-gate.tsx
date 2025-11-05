"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogIn, UserCircle } from "lucide-react"

interface AuthGateProps {
  onContinueAnonymous: () => void
  onLogin?: () => void
  title?: string
  description?: string
}

export function AuthGate({
  onContinueAnonymous,
  onLogin,
  title = "Welcome",
  description = "Sign in to access all features or continue as a guest to explore",
}: AuthGateProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-border/50 shadow-lg">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <UserCircle className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-balance text-2xl font-bold tracking-tight">{title}</CardTitle>
          <CardDescription className="text-pretty text-base leading-relaxed">{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {onLogin && (
            <Button onClick={onLogin} size="lg" className="w-full gap-2 font-medium cursor-pointer" variant="default">
              <LogIn className="h-4 w-4" />
              Sign In
            </Button>
          )}
          <Button
            onClick={onContinueAnonymous}
            size="lg"
            variant="outline"
            className="w-full font-medium bg-transparent"
          >
            Continue as Guest
          </Button>
          <p className="pt-2 text-center text-xs text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
