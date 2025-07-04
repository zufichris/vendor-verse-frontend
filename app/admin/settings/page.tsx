"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Save, Mail, Bell, Shield, Palette, Globe, CreditCard } from "lucide-react"

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "VendorVerse",
    siteDescription: "Your premium e-commerce destination",
    contactEmail: "admin@vendorverse.com",
    supportEmail: "support@vendorverse.com",

    // Notifications
    emailNotifications: true,
    orderNotifications: true,
    inventoryAlerts: true,
    marketingEmails: false,

    // Security
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordRequirements: true,

    // Payment
    stripeEnabled: true,
    paypalEnabled: true,
    taxRate: 8.5,
    currency: "USD",

    // Shipping
    freeShippingThreshold: 50,
    standardShippingRate: 5.99,
    expressShippingRate: 12.99,

    // Appearance
    primaryColor: "#3B82F6",
    secondaryColor: "#10B981",
    darkMode: false,
  })

  const handleSave = () => {
    console.log("Saving settings:", settings)
    // In a real app, this would make an API call
  }

  const handleInputChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold" style={{ color: "rgb(17, 24, 39)" }}>
            Settings
          </h1>
          <p className="mt-2 text-sm" style={{ color: "rgb(107, 114, 128)" }}>
            Configure your store settings and preferences
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center" style={{ color: "rgb(17, 24, 39)" }}>
              <Globe className="h-5 w-5 mr-2" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => handleInputChange("siteName", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => handleInputChange("siteDescription", e.target.value)}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                type="email"
                value={settings.supportEmail}
                onChange={(e) => handleInputChange("supportEmail", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center" style={{ color: "rgb(17, 24, 39)" }}>
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm" style={{ color: "rgb(107, 114, 128)" }}>
                  Receive email notifications for important events
                </p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Order Notifications</Label>
                <p className="text-sm" style={{ color: "rgb(107, 114, 128)" }}>
                  Get notified when new orders are placed
                </p>
              </div>
              <Switch
                checked={settings.orderNotifications}
                onCheckedChange={(checked) => handleInputChange("orderNotifications", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Inventory Alerts</Label>
                <p className="text-sm" style={{ color: "rgb(107, 114, 128)" }}>
                  Alert when products are running low
                </p>
              </div>
              <Switch
                checked={settings.inventoryAlerts}
                onCheckedChange={(checked) => handleInputChange("inventoryAlerts", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Marketing Emails</Label>
                <p className="text-sm" style={{ color: "rgb(107, 114, 128)" }}>
                  Receive marketing and promotional emails
                </p>
              </div>
              <Switch
                checked={settings.marketingEmails}
                onCheckedChange={(checked) => handleInputChange("marketingEmails", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center" style={{ color: "rgb(17, 24, 39)" }}>
              <Shield className="h-5 w-5 mr-2" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm" style={{ color: "rgb(107, 114, 128)" }}>
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => handleInputChange("twoFactorAuth", checked)}
              />
            </div>
            <div>
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleInputChange("sessionTimeout", Number.parseInt(e.target.value))}
                className="w-32"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Strong Password Requirements</Label>
                <p className="text-sm" style={{ color: "rgb(107, 114, 128)" }}>
                  Enforce strong password policies
                </p>
              </div>
              <Switch
                checked={settings.passwordRequirements}
                onCheckedChange={(checked) => handleInputChange("passwordRequirements", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center" style={{ color: "rgb(17, 24, 39)" }}>
              <CreditCard className="h-5 w-5 mr-2" />
              Payment & Billing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="currency">Currency</Label>
                <select
                  id="currency"
                  value={settings.currency}
                  onChange={(e) => handleInputChange("currency", e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  style={{ borderColor: "rgb(209, 213, 219)", color: "rgb(17, 24, 39)" }}
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
              </div>
              <div>
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  step="0.1"
                  value={settings.taxRate}
                  onChange={(e) => handleInputChange("taxRate", Number.parseFloat(e.target.value))}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Stripe Payments</Label>
                <p className="text-sm" style={{ color: "rgb(107, 114, 128)" }}>
                  Accept credit card payments via Stripe
                </p>
              </div>
              <Switch
                checked={settings.stripeEnabled}
                onCheckedChange={(checked) => handleInputChange("stripeEnabled", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>PayPal Payments</Label>
                <p className="text-sm" style={{ color: "rgb(107, 114, 128)" }}>
                  Accept PayPal payments
                </p>
              </div>
              <Switch
                checked={settings.paypalEnabled}
                onCheckedChange={(checked) => handleInputChange("paypalEnabled", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Shipping Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center" style={{ color: "rgb(17, 24, 39)" }}>
              <Mail className="h-5 w-5 mr-2" />
              Shipping
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="freeShippingThreshold">Free Shipping Threshold ($)</Label>
                <Input
                  id="freeShippingThreshold"
                  type="number"
                  value={settings.freeShippingThreshold}
                  onChange={(e) => handleInputChange("freeShippingThreshold", Number.parseFloat(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="standardShippingRate">Standard Shipping ($)</Label>
                <Input
                  id="standardShippingRate"
                  type="number"
                  step="0.01"
                  value={settings.standardShippingRate}
                  onChange={(e) => handleInputChange("standardShippingRate", Number.parseFloat(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="expressShippingRate">Express Shipping ($)</Label>
                <Input
                  id="expressShippingRate"
                  type="number"
                  step="0.01"
                  value={settings.expressShippingRate}
                  onChange={(e) => handleInputChange("expressShippingRate", Number.parseFloat(e.target.value))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center" style={{ color: "rgb(17, 24, 39)" }}>
              <Palette className="h-5 w-5 mr-2" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => handleInputChange("primaryColor", e.target.value)}
                    className="w-16 h-10"
                  />
                  <Input
                    value={settings.primaryColor}
                    onChange={(e) => handleInputChange("primaryColor", e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="secondaryColor">Secondary Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="secondaryColor"
                    type="color"
                    value={settings.secondaryColor}
                    onChange={(e) => handleInputChange("secondaryColor", e.target.value)}
                    className="w-16 h-10"
                  />
                  <Input
                    value={settings.secondaryColor}
                    onChange={(e) => handleInputChange("secondaryColor", e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Dark Mode</Label>
                <p className="text-sm" style={{ color: "rgb(107, 114, 128)" }}>
                  Enable dark theme for the admin panel
                </p>
              </div>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={(checked) => handleInputChange("darkMode", checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
