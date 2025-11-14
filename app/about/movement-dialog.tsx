"use client"

import { Button } from "@/components/ui/button"
<<<<<<< HEAD
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog"
=======
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
>>>>>>> origin/main
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type React from "react"
import { type ReactNode, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { subscribeNewsLetter } from "@/lib/actions/newsletter"

interface Props {
  trigger?: ReactNode
  defaultOpen?: boolean
}

export default function MovementModal({ trigger, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen||false)
  const [email, setEmail] = useState("")
  const [fname, setfName] = useState("")
  const [lname, setlName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [acceptsMarketing, setAcceptsMarketing] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await subscribeNewsLetter({firstName: fname, lastName: lname, email})

      if (res.success) {
        setIsSubmitted(true)
        setTimeout(() => {
          setIsSubmitted(false)
          setEmail("")
          setfName("")
          setlName("")
        }, 3000)
      }
      
    } catch (err) {
      console.log(err)      
    }finally{
      setIsLoading(false)
    }
  }

  return (
<<<<<<< HEAD
    <Dialog open={open} onOpenChange={setOpen}>
=======
    <Dialog>
>>>>>>> origin/main
      <DialogTrigger asChild>
        {trigger ?? (
          <Button size="lg" className="font-semibold">
            Join Movement
          </Button>
        )}
      </DialogTrigger>
<<<<<<< HEAD
      <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] p-0 overflow-y-auto border-0 bg-gradient-to-br from-accent via-background to-background">
        <DialogClose className="absolute right-4 top-4 z-50 rounded-full bg-background/80 backdrop-blur-sm p-2 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-foreground"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
          <span className="sr-only">Close</span>
        </DialogClose>
        {!isSubmitted ? (
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Visual Content */}
            <div className="relative bg-gradient-to-br from-primary to-foreground p-6 md:p-10 flex flex-col justify-between md:min-h-[500px]">
=======
      <DialogContent className="max-w-[95vw] sm:max-w-2xl p-0 overflow-hidden border-0 bg-gradient-to-br from-accent via-background to-background">
        {!isSubmitted ? (
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Visual Content */}
            <div className="relative bg-gradient-to-br from-primary to-foreground p-8 md:p-10 flex flex-col justify-between min-h-[300px] md:min-h-[500px]">
>>>>>>> origin/main
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-primary-foreground blur-3xl" />
                <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-primary-foreground blur-3xl" />
              </div>

              <div className="relative z-10">
<<<<<<< HEAD
                <div className="inline-block px-3 py-1 rounded-full bg-primary-foreground/20 text-primary-foreground text-xs font-semibold mb-4 md:mb-6 backdrop-blur-sm">
                  EXCLUSIVE OFFER
                </div>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-3 md:mb-4 leading-tight text-balance">
                  Join the Movement
                </h2>
                <p className="text-primary-foreground/90 text-sm md:text-lg leading-relaxed">
=======
                <div className="inline-block px-3 py-1 rounded-full bg-primary-foreground/20 text-primary-foreground text-xs font-semibold mb-6 backdrop-blur-sm">
                  EXCLUSIVE OFFER
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 leading-tight text-balance">
                  Join the Movement
                </h2>
                <p className="text-primary-foreground/90 text-base md:text-lg leading-relaxed">
>>>>>>> origin/main
                  Get 10% off your first order and be part of our community of women empowering women through fitness.
                </p>
              </div>

<<<<<<< HEAD
              <div className="relative z-10 space-y-3 md:space-y-4 mt-6 md:mt-0">
=======
              <div className="relative z-10 space-y-4">
>>>>>>> origin/main
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-primary-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-primary-foreground/80 text-sm">Early access to new collections</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-primary-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-primary-foreground/80 text-sm">Exclusive member-only offers</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-primary-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-primary-foreground/80 text-sm">Fitness tips and styling guides</p>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
<<<<<<< HEAD
            <div className="p-6 md:p-10 py-8 flex flex-col justify-center bg-card">
              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
=======
            <div className="p-8 md:p-10 flex flex-col justify-center bg-card">
              <form onSubmit={handleSubmit} className="space-y-6">
>>>>>>> origin/main
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-foreground">
                    First Name
                  </Label>
                  <Input
                    id="fname"
                    type="text"
                    placeholder="Enter your first name"
                    value={fname}
                    onChange={(e) => setfName(e.target.value)}
                    required
                    className="h-12 bg-background border-border focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-foreground">
                    Last Name
                  </Label>
                  <Input
                    id="lname"
                    type="text"
                    placeholder="Enter your last name"
                    value={lname}
                    onChange={(e) => setlName(e.target.value)}
                    required
                    className="h-12 bg-background border-border focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 bg-background border-border focus:border-primary"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="marketing"
                    checked={acceptsMarketing}
<<<<<<< HEAD
                    onCheckedChange={(checked) => setAcceptsMarketing(checked as boolean)}
=======
                    // onCheckedChange={(checked) => setAcceptsMarketing(checked as boolean)}
>>>>>>> origin/main
                    className="mt-1"
                  />
                  <Label htmlFor="marketing" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                    I agree to receive marketing emails about products, offers, and exclusive content. You can
                    unsubscribe at any time.
                  </Label>
                </div>

                <Button type="submit" disabled={isLoading} className="w-full h-12 text-base font-semibold" size="lg">
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Joining...
                    </span>
                  ) : (
                    "Get My 10% Off"
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            </div>
          </div>
        ) : (
<<<<<<< HEAD
          <div className="flex flex-col items-center justify-center min-h-[350px] md:min-h-[500px] p-8 text-center">
=======
          <div className="flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px] p-8 text-center">
>>>>>>> origin/main
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-in zoom-in duration-500">
              <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 text-balance">
              Welcome to the Movement!
            </h3>
            <p className="text-muted-foreground text-base md:text-lg max-w-md leading-relaxed">
              Check your inbox for your exclusive 10% discount code. Let's get moving!
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
