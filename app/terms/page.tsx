import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Scale, FileText, ShieldCheck, AlertCircle, Mail } from "lucide-react"
import Link from "next/link"
import { ContactEmail } from "@/lib/constants"

const months = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
} as Record<number, string>

export default function TermsPage() {
    const today = new Date()

    today.setMonth(today.getMonth() - 3)

    const month = months[today.getMonth()]
    const year = today.getFullYear()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">Terms of Service</h1>
            <p className="text-lg text-muted-foreground mt-3 text-balance">
              Welcome to Aetli. By accessing our website, you agree to these terms and conditions.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <Badge className="bg-[#f5efe5] text-black">Last Updated: {month} {year}</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Quick Summary Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <Scale className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-base">Fair Use</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Use our services responsibly and legally</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <FileText className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-base">Your Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Clear rights and responsibilities</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <ShieldCheck className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-base">Secure Shopping</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Protected transactions and data</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Terms Sections */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Terms & Conditions</CardTitle>
              <CardDescription>Please read these terms carefully before using our services</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="acceptance">
                  <AccordionTrigger className="text-base font-semibold">1. Acceptance of Terms</AccordionTrigger>
                  <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      By accessing and using Aetli's website and services, you accept and agree to be bound by these
                      Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our
                      services.
                    </p>
                    <p>
                      We reserve the right to modify these terms at any time. Changes will be posted on this page with
                      an updated revision date. Continued use of our services after changes constitutes acceptance of
                      the modified terms.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="use-of-service">
                  <AccordionTrigger className="text-base font-semibold">2. Use of Service</AccordionTrigger>
                  <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Eligibility:</strong> You must be at least 18 years old to
                      make purchases on our website. By placing an order, you represent that you are of legal age.
                    </p>
                    <p>
                      <strong className="text-foreground">Account Responsibility:</strong> If you create an account, you
                      are responsible for maintaining the confidentiality of your account information and for all
                      activities under your account.
                    </p>
                    <p>
                      <strong className="text-foreground">Prohibited Activities:</strong> You may not use our services
                      for any illegal purposes, to infringe on others' rights, or to transmit harmful content.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="products">
                  <AccordionTrigger className="text-base font-semibold">3. Products & Pricing</AccordionTrigger>
                  <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Product Information:</strong> We strive to display accurate
                      product descriptions, images, and pricing. However, we do not warrant that product descriptions or
                      other content is accurate, complete, or error-free.
                    </p>
                    <p>
                      <strong className="text-foreground">Pricing:</strong> All prices are displayed in AED (UAE
                      Dirhams) unless otherwise stated. Prices are subject to change without notice. We reserve the
                      right to modify prices, discontinue products, or correct errors at any time.
                    </p>
                    <p>
                      <strong className="text-foreground">Availability:</strong> All orders are subject to product
                      availability. If a product becomes unavailable after your order, we will notify you and offer a
                      refund or alternative.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="orders">
                  <AccordionTrigger className="text-base font-semibold">4. Orders & Payment</AccordionTrigger>
                  <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Order Acceptance:</strong> Your order is an offer to purchase
                      products. We reserve the right to accept or decline any order for any reason. Order confirmation
                      does not constitute acceptance until products are shipped.
                    </p>
                    <p>
                      <strong className="text-foreground">Payment:</strong> We accept major credit cards, debit cards,
                      and other payment methods as displayed at checkout. Payment must be received in full before order
                      processing.
                    </p>
                    <p>
                      <strong className="text-foreground">Order Cancellation:</strong> You may cancel your order before
                      it ships. Once shipped, standard return policies apply. We reserve the right to cancel orders due
                      to pricing errors, product unavailability, or suspected fraud.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="shipping">
                  <AccordionTrigger className="text-base font-semibold">5. Shipping & Delivery</AccordionTrigger>
                  <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Shipping Times:</strong> Estimated delivery times are provided
                      at checkout and begin after order confirmation. We are not responsible for delays caused by
                      shipping carriers or customs.
                    </p>
                    <p>
                      <strong className="text-foreground">Shipping Costs:</strong> Shipping fees are calculated based on
                      destination and order value. Free shipping may be offered for qualifying orders.
                    </p>
                    <p>
                      <strong className="text-foreground">International Orders:</strong> International customers are
                      responsible for all customs duties, taxes, and fees. Delivery times may vary by country.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="returns">
                  <AccordionTrigger className="text-base font-semibold">6. Returns & Refunds</AccordionTrigger>
                  <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      Please refer to our detailed{" "}
                      <a href="/returns" className="text-primary underline underline-offset-2">
                        Return & Exchange Policy
                      </a>{" "}
                      for complete information about returns, exchanges, and refunds.
                    </p>
                    <p>
                      <strong className="text-foreground">Summary:</strong> UAE orders have a 7-day return window;
                      international orders have 14 days. Items must be unworn, unwashed, and in original condition with
                      tags attached.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="intellectual-property">
                  <AccordionTrigger className="text-base font-semibold">7. Intellectual Property</AccordionTrigger>
                  <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      All content on this website, including text, graphics, logos, images, and software, is the
                      property of Aetli and protected by international copyright and trademark laws.
                    </p>
                    <p>
                      You may not reproduce, distribute, modify, or create derivative works from any content without
                      express written permission from Aetli.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="liability">
                  <AccordionTrigger className="text-base font-semibold">8. Limitation of Liability</AccordionTrigger>
                  <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      Aetli shall not be liable for any indirect, incidental, special, or consequential damages arising
                      from the use of our products or services. Our total liability shall not exceed the amount paid for
                      the product giving rise to the claim.
                    </p>
                    <p>
                      We do not warrant that our website will be uninterrupted, secure, or error-free. You use our
                      services at your own risk.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="governing-law">
                  <AccordionTrigger className="text-base font-semibold">9. Governing Law</AccordionTrigger>
                  <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      These Terms of Service are governed by the laws of the United Arab Emirates. Any disputes arising
                      from these terms shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="severability">
                  <AccordionTrigger className="text-base font-semibold">10. Severability</AccordionTrigger>
                  <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      If any provision of these terms is found to be invalid or unenforceable, the remaining provisions
                      shall continue in full force and effect.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Important Notice */}
          <Alert className="border-primary/20 bg-primary/5">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Questions about these terms?</strong> If you have any questions or concerns about our Terms of
              Service, please contact us at{" "}
              <a href={`mailto:${ContactEmail}`} className="underline underline-offset-2">
                legal@aetli.com
              </a>
            </AlertDescription>
          </Alert>

          {/* Contact Card */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-xl">Contact Information</CardTitle>
              <CardDescription>Reach out to us with any questions or concerns</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`mailto:${ContactEmail}`}>
                    <div className="flex items-center gap-3 p-4 bg-background rounded-lg">
                        <Mail className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-semibold text-sm">Legal Department</p>
                          <p className="text-xs text-muted-foreground">legal@aetli.com</p>
                        </div>
                    </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
