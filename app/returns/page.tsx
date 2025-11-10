import type React from "react"

// import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
import { Package, Clock, ShieldCheck, Globe, Mail, Instagram, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { ContactEmail, ContactInstagram } from "@/lib/constants"

export default function ReturnsPage() {
//   const [formData, setFormData] = useState({
//     orderNumber: "",
//     email: "",
//     name: "",
//     items: "",
//     reason: "",
//   })
//   const [submitted, setSubmitted] = useState(false)

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     // In production, this would send to your backend/email service
//     console.log("Return request submitted:", formData)
//     setSubmitted(true)
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }))
//   }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">Return & Exchange Policy</h1>
            <p className="text-lg text-muted-foreground mt-3 text-balance">
              At Aetli, we want you to love every piece you order. If something doesn't feel quite right, we're here to
              help.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Quick Summary Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <Clock className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-base">Return Window</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">7 days (UAE) • 14 days (International)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <Package className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-base">Condition Required</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Unworn, unwashed, tags attached</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <ShieldCheck className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-base">Free Exchange</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">First exchange free within UAE</p>
              </CardContent>
            </Card>
          </div>

          {/* Local Orders - UAE */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    Local Orders — UAE
                    <Badge variant="secondary" className="text-xs">
                      🇦🇪
                    </Badge>
                  </CardTitle>
                  <CardDescription>Return or exchange within 7 days of receiving your order</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Eligibility */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Eligibility Criteria</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span>Items must be unworn, unwashed, and in original condition</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span>Original tags must be attached</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span>Must have the purchase receipt</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span>Within 7 days of delivery</span>
                  </div>
                </div>
              </div>

              {/* Not Eligible */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Not Eligible for Return/Exchange</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2 text-sm">
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <span>Sale or discounted items</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <span>Items marked "final sale"</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <span>Accessories (socks, bottles, etc.)</span>
                  </div>
                </div>
              </div>

              {/* Details Accordion */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="return-method">
                  <AccordionTrigger className="text-base font-semibold">Return Method</AccordionTrigger>
                  <AccordionContent className="space-y-2 text-sm text-muted-foreground">
                    <p>Returns can be arranged via courier pickup</p>
                    <p>
                      A return shipping fee of <strong className="text-foreground">AED 25</strong> will be deducted from
                      your refund (unless returned for store credit)
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="exchange">
                  <AccordionTrigger className="text-base font-semibold">Exchange Option</AccordionTrigger>
                  <AccordionContent className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      <strong className="text-foreground">First exchange within UAE is free</strong>
                    </p>
                    <p>Exchanges are subject to stock availability</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="refunds-uae">
                  <AccordionTrigger className="text-base font-semibold">Refund Options</AccordionTrigger>
                  <AccordionContent className="space-y-2 text-sm text-muted-foreground">
                    <p>Refunds will be issued as:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Store credit, or</li>
                      <li>Original payment method (processing time 5–7 business days)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* International Orders */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    International Orders
                    <Badge variant="secondary" className="text-xs">
                      <Globe className="w-3 h-3 mr-1" />🌍
                    </Badge>
                  </CardTitle>
                  <CardDescription>Return within 14 days of receiving your order</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Conditions */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Conditions</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span>Items must be unworn, unwashed, and in original condition</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span>Tags attached & purchase receipt</span>
                  </div>
                </div>
              </div>

              {/* Details Accordion */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="return-costs">
                  <AccordionTrigger className="text-base font-semibold">Return Costs</AccordionTrigger>
                  <AccordionContent className="space-y-2 text-sm text-muted-foreground">
                    <p>International customers are responsible for return shipping fees</p>
                    <p>Original shipping charges are non-refundable</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="refunds-intl">
                  <AccordionTrigger className="text-base font-semibold">Refund Method</AccordionTrigger>
                  <AccordionContent className="space-y-2 text-sm text-muted-foreground">
                    <p>Refunds will be issued as:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Store credit, or</li>
                      <li>Refund to original payment method (5–14 business days processing)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="exchanges-intl">
                  <AccordionTrigger className="text-base font-semibold">Exchanges</AccordionTrigger>
                  <AccordionContent className="space-y-2 text-sm text-muted-foreground">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Due to international logistics, we currently do not offer direct exchanges for international
                        orders. Please return your item and place a new order.
                      </AlertDescription>
                    </Alert>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Important Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <span className="text-primary font-semibold shrink-0">•</span>
                <span>Returns will be inspected before approval</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <span className="text-primary font-semibold shrink-0">•</span>
                <span>Items showing signs of wear, makeup, perfume, or damage will not be accepted</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <span className="text-primary font-semibold shrink-0">•</span>
                <span>
                  If an item is incorrect or arrives damaged, notify us within 48 hours and we will replace it at no
                  cost
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Return Request Form */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Start a Return Request</CardTitle>
              <CardDescription>
                Fill out the form below and we'll guide you through the next steps. Our team will respond within 24
                hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <Alert className="border-success bg-success/10">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <AlertDescription className="text-success-foreground">
                    <strong>Thank you!</strong> Your return request has been submitted. We'll get back to you within 24
                    hours at {formData.email}
                  </AlertDescription>
                </Alert>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="orderNumber">Order Number *</Label>
                    <Input
                      id="orderNumber"
                      name="orderNumber"
                      required
                      placeholder="e.g., AET-12345"
                      value={formData.orderNumber}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-muted-foreground">You can find this in your order confirmation email</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="items">Items to Return *</Label>
                    <Input
                      id="items"
                      name="items"
                      required
                      placeholder="e.g., Black Performance Leggings (Size M)"
                      value={formData.items}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for Return *</Label>
                    <Textarea
                      id="reason"
                      name="reason"
                      required
                      placeholder="Please let us know why you're returning this item..."
                      rows={4}
                      value={formData.reason}
                      onChange={handleChange}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full md:w-auto">
                    Submit Return Request
                  </Button>
                </form>
              )}
            </CardContent>
          </Card> */}

          {/* Contact Support */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-xl">Need Help?</CardTitle>
              <CardDescription>
                If you have any questions about sizing, fit, or fabrics before ordering, please reach out — we're more
                than happy to assist
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <a
                  href={`mailto:${ContactEmail}`}
                  className="flex items-center gap-3 p-4 bg-background rounded-lg hover:bg-accent/10 transition-colors"
                >
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold text-sm">Email Support</p>
                    <p className="text-xs text-muted-foreground">support@aetli.com</p>
                  </div>
                </a>

                <a
                  href={ContactInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-background rounded-lg hover:bg-accent/10 transition-colors"
                >
                  <Instagram className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold text-sm">Instagram DM</p>
                    <p className="text-xs text-muted-foreground">Quick response via DM</p>
                  </div>
                </a>
              </div>

              <p className="text-xs text-center text-muted-foreground pt-2">
                We're here to help you find the perfect fit
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
