import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Eye, Database, Globe, Mail, CheckCircle2, AlertCircle } from "lucide-react"
import { ContactEmail } from "@/lib/constants"
import Link from "next/link"

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

export default function PrivacyPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground mt-3 text-balance">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal
              information.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <Badge variant={null} className="bg-[#f5efe5]">Last Updated: {month || ''} {year}</Badge>
              <Badge variant={null} className="bg-[#f5efe5]">GDPR Compliant</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Quick Summary Cards */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <Shield className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-base">Protected</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Your data is encrypted and secure</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <Lock className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-base">Private</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">We never sell your information</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <Eye className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-base">Transparent</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Clear about what we collect</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <Database className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-base">Your Control</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Request or delete your data</p>
              </CardContent>
            </Card>
          </div>

          {/* Overview */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                In Brief
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                <span>
                  We collect only the information necessary to process your orders and improve your experience
                </span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                <span>We use industry-standard encryption to protect your payment and personal information</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                <span>We never sell or rent your personal information to third parties</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                <span>You have the right to access, update, or delete your personal data at any time</span>
              </div>
            </CardContent>
          </Card>

          {/* Main Privacy Sections */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Privacy Policy Details</CardTitle>
              <CardDescription>Comprehensive information about how we handle your data</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="information-we-collect">
                  <AccordionTrigger className="text-base font-semibold">1. Information We Collect</AccordionTrigger>
                  <AccordionContent className="space-y-4 text-sm text-muted-foreground">
                    <div>
                      <p className="font-semibold text-foreground mb-2">Personal Information:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Name, email address, phone number</li>
                        <li>Shipping and billing addresses</li>
                        <li>Payment information (processed securely through payment providers)</li>
                        <li>Order history and preferences</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">Automatically Collected Information:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>IP address, browser type, and device information</li>
                        <li>Pages visited, time spent on site, and referring URLs</li>
                        <li>Cookies and similar tracking technologies</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">Information from Third Parties:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Social media login information (if you choose to connect)</li>
                        <li>Analytics providers and advertising partners</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="how-we-use">
                  <AccordionTrigger className="text-base font-semibold">
                    2. How We Use Your Information
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                    <p>We use the information we collect for the following purposes:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>
                        <strong className="text-foreground">Order Processing:</strong> To process, fulfill, and track
                        your orders
                      </li>
                      <li>
                        <strong className="text-foreground">Customer Service:</strong> To respond to your inquiries and
                        provide support
                      </li>
                      <li>
                        <strong className="text-foreground">Marketing:</strong> To send promotional emails (with your
                        consent, and you can opt out anytime)
                      </li>
                      <li>
                        <strong className="text-foreground">Personalization:</strong> To recommend products and improve
                        your shopping experience
                      </li>
                      <li>
                        <strong className="text-foreground">Analytics:</strong> To understand how our website is used
                        and improve it
                      </li>
                      <li>
                        <strong className="text-foreground">Security:</strong> To detect and prevent fraud and maintain
                        site security
                      </li>
                      <li>
                        <strong className="text-foreground">Legal Compliance:</strong> To comply with legal obligations
                        and resolve disputes
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="sharing">
                  <AccordionTrigger className="text-base font-semibold">
                    3. How We Share Your Information
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                    <p>We may share your information with:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>
                        <strong className="text-foreground">Service Providers:</strong> Third-party companies that help
                        us operate (payment processors, shipping carriers, email services)
                      </li>
                      <li>
                        <strong className="text-foreground">Analytics Partners:</strong> To understand website usage
                        (Google Analytics, etc.)
                      </li>
                      <li>
                        <strong className="text-foreground">Legal Requirements:</strong> When required by law or to
                        protect our rights
                      </li>
                      <li>
                        <strong className="text-foreground">Business Transfers:</strong> In the event of a merger,
                        acquisition, or sale of assets
                      </li>
                    </ul>
                    <Alert className="mt-4 border-success/20 bg-success/5">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <AlertDescription className="text-success-foreground">
                        <strong>
                          We never sell your personal information to third parties for their marketing purposes.
                        </strong>
                      </AlertDescription>
                    </Alert>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cookies">
                  <AccordionTrigger className="text-base font-semibold">
                    4. Cookies & Tracking Technologies
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      We use cookies and similar technologies to enhance your experience. Cookies are small files stored
                      on your device that help us remember your preferences and understand how you use our site.
                    </p>
                    <div>
                      <p className="font-semibold text-foreground mb-2">Types of Cookies We Use:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>
                          <strong className="text-foreground">Essential Cookies:</strong> Required for the website to
                          function (shopping cart, checkout)
                        </li>
                        <li>
                          <strong className="text-foreground">Performance Cookies:</strong> Help us understand how
                          visitors use our site
                        </li>
                        <li>
                          <strong className="text-foreground">Functional Cookies:</strong> Remember your preferences
                          (language, region)
                        </li>
                        <li>
                          <strong className="text-foreground">Marketing Cookies:</strong> Used to deliver relevant ads
                          and track campaign performance
                        </li>
                      </ul>
                    </div>
                    <p>
                      You can control cookies through your browser settings. Note that disabling certain cookies may
                      affect site functionality.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="data-security">
                  <AccordionTrigger className="text-base font-semibold">5. Data Security</AccordionTrigger>
                  <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                    <p>We take the security of your personal information seriously and implement various measures:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>SSL/TLS encryption for data transmission</li>
                      <li>Secure payment processing through certified payment providers</li>
                      <li>Regular security audits and updates</li>
                      <li>Access controls and employee training</li>
                      <li>Encrypted data storage</li>
                    </ul>
                    <p className="mt-3">
                      While we strive to protect your information, no method of transmission over the internet is 100%
                      secure. We cannot guarantee absolute security.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="your-rights">
                  <AccordionTrigger className="text-base font-semibold">6. Your Privacy Rights</AccordionTrigger>
                  <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                    <p>Depending on your location, you have the following rights:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>
                        <strong className="text-foreground">Access:</strong> Request a copy of your personal data
                      </li>
                      <li>
                        <strong className="text-foreground">Correction:</strong> Update or correct inaccurate
                        information
                      </li>
                      <li>
                        <strong className="text-foreground">Deletion:</strong> Request deletion of your personal data
                        (subject to legal requirements)
                      </li>
                      <li>
                        <strong className="text-foreground">Opt-Out:</strong> Unsubscribe from marketing communications
                      </li>
                      <li>
                        <strong className="text-foreground">Data Portability:</strong> Receive your data in a
                        machine-readable format
                      </li>
                      <li>
                        <strong className="text-foreground">Object:</strong> Object to processing of your data for
                        certain purposes
                      </li>
                    </ul>
                    <p className="mt-3">
                      To exercise these rights, contact us at{" "}
                      <a href={`mailto:${ContactEmail}`}className="text-primary underline underline-offset-2">
                        privacy@aetli.com
                      </a>
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="data-retention">
                  <AccordionTrigger className="text-base font-semibold">7. Data Retention</AccordionTrigger>
                  <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                    <p>We retain your personal information for as long as necessary to:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Fulfill the purposes outlined in this policy</li>
                      <li>Comply with legal, accounting, or reporting requirements</li>
                      <li>Resolve disputes and enforce our agreements</li>
                    </ul>
                    <p className="mt-3">
                      When your information is no longer needed, we securely delete or anonymize it.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="international">
                  <AccordionTrigger className="text-base font-semibold">
                    8. International Data Transfers
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      Aetli operates from the United Arab Emirates. If you are accessing our services from outside the
                      UAE, your information may be transferred to and processed in the UAE or other countries.
                    </p>
                    <p>
                      We ensure that any international transfers comply with applicable data protection laws and use
                      appropriate safeguards.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="children">
                  <AccordionTrigger className="text-base font-semibold">9. Children's Privacy</AccordionTrigger>
                  <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      Our services are not directed to individuals under 18 years of age. We do not knowingly collect
                      personal information from children.
                    </p>
                    <p>
                      If you believe we have collected information from a child, please contact us immediately and we
                      will delete it.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="updates">
                  <AccordionTrigger className="text-base font-semibold">10. Policy Updates</AccordionTrigger>
                  <AccordionContent className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      We may update this Privacy Policy from time to time to reflect changes in our practices or legal
                      requirements.
                    </p>
                    <p>
                      We will notify you of significant changes by posting a notice on our website or sending you an
                      email. Continued use of our services after changes constitutes acceptance.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* GDPR Compliance Card */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Globe className="w-5 h-5" />
                GDPR & International Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                We are committed to complying with the General Data Protection Regulation (GDPR) and other international
                privacy laws. If you are an EU resident, you have additional rights under GDPR, including the right to
                lodge a complaint with your local data protection authority.
              </p>
            </CardContent>
          </Card>

          {/* Contact Card */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-xl">Contact Our Privacy Team</CardTitle>
              <CardDescription>Have questions about your privacy or want to exercise your data rights?</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`mailto:${ContactEmail}`}>
                    <div className="flex items-center gap-3 p-4 bg-background rounded-lg">
                        <Mail className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-semibold text-sm">Privacy Department</p>
                          <p className="text-xs text-muted-foreground">privacy@aetli.com</p>
                        </div>
                    </div>
              </Link>
              <p className="text-xs text-muted-foreground mt-4">
                We will respond to privacy inquiries within 30 days. For urgent matters, please mark your email as
                "Urgent Privacy Request."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
