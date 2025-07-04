"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
  Check,
  Lock,
  User,
  Mail,
  Package,
  Clock,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Australia",
  "Japan",
  "Other",
];

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

export default function CheckoutPage() {
  const { items, total } = useCart();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [saveInfo, setSaveInfo] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  const [formData, setFormData] = useState({
    // Contact Info
    email: user?.email || "",
    phone: "",

    // Billing Address
    billingFirstName: "",
    billingLastName: "",
    billingAddress: "",
    billingApartment: "",
    billingCity: "",
    billingState: "",
    billingZipCode: "",
    billingCountry: "United States",

    // Shipping Address
    shippingFirstName: "",
    shippingLastName: "",
    shippingAddress: "",
    shippingApartment: "",
    shippingCity: "",
    shippingState: "",
    shippingZipCode: "",
    shippingCountry: "United States",

    // Payment Info
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",

    // Special Instructions
    orderNotes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const shippingOptions = [
    {
      id: "standard",
      name: "Standard Shipping",
      description: "5-7 business days",
      price: 10,
      icon: Package,
    },
    {
      id: "express",
      name: "Express Shipping",
      description: "2-3 business days",
      price: 15,
      icon: Truck,
    },
    {
      id: "overnight",
      name: "Overnight Shipping",
      description: "Next business day",
      price: 25,
      icon: Clock,
    },
  ];

  const paymentOptions = [
    {
      id: "card",
      name: "Credit/Debit Card",
      description: "Visa, Mastercard, American Express",
      icon: CreditCard,
    },
    {
      id: "paypal",
      name: "PayPal",
      description: "Pay with your PayPal account",
      icon: () => (
        <div
          className="w-5 h-5 rounded"
          style={{ backgroundColor: "rgb(0, 48, 135)" }}
        />
      ),
    },
    {
      id: "apple",
      name: "Apple Pay",
      description: "Touch ID or Face ID",
      icon: () => (
        <div
          className="w-5 h-5 rounded"
          style={{ backgroundColor: "rgb(0, 0, 0)" }}
        />
      ),
    },
    {
      id: "google",
      name: "Google Pay",
      description: "Pay with Google",
      icon: () => (
        <div
          className="w-5 h-5 rounded"
          style={{ backgroundColor: "rgb(66, 133, 244)" }}
        />
      ),
    },
  ];

  const selectedShipping = shippingOptions.find(
    (option) => option.id === shippingMethod,
  );
  const shipping = selectedShipping?.price || 10;
  const subtotal = total - promoDiscount;
  const tax = subtotal * 0.08;
  const finalTotal = subtotal + shipping + tax;

  const steps = [
    { id: 1, name: "Information", description: "Contact & Shipping" },
    { id: 2, name: "Shipping", description: "Delivery Method" },
    { id: 3, name: "Payment", description: "Payment Details" },
    { id: 4, name: "Review", description: "Order Summary" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.billingFirstName)
        newErrors.billingFirstName = "First name is required";
      if (!formData.billingLastName)
        newErrors.billingLastName = "Last name is required";
      if (!formData.billingAddress)
        newErrors.billingAddress = "Address is required";
      if (!formData.billingCity) newErrors.billingCity = "City is required";
      if (!formData.billingState) newErrors.billingState = "State is required";
      if (!formData.billingZipCode)
        newErrors.billingZipCode = "ZIP code is required";
    }

    if (step === 3 && paymentMethod === "card") {
      if (!formData.cardNumber)
        newErrors.cardNumber = "Card number is required";
      if (!formData.expiryDate)
        newErrors.expiryDate = "Expiry date is required";
      if (!formData.cvv) newErrors.cvv = "CVV is required";
      if (!formData.nameOnCard)
        newErrors.nameOnCard = "Name on card is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setPromoDiscount(total * 0.1);
      setPromoApplied(true);
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateStep(4)) return;

    setIsProcessing(true);
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setOrderComplete(true);
    setIsProcessing(false);
  };

  if (orderComplete) {
    return (
      <div
        className="min-h-screen pt-20"
        style={{ backgroundColor: "rgb(249, 250, 251)" }}
      >
        <div className="  mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
              style={{ backgroundColor: "rgb(34, 197, 94)" }}
            >
              <Check
                className="h-10 w-10"
                style={{ color: "rgb(255, 255, 255)" }}
              />
            </div>

            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: "rgb(17, 24, 39)" }}
            >
              Order Confirmed!
            </h1>
            <p className="text-xl mb-2" style={{ color: "rgb(75, 85, 99)" }}>
              Thank you for your purchase, {formData.billingFirstName}!
            </p>
            <p className="mb-8" style={{ color: "rgb(107, 114, 128)" }}>
              Your order #ORD-{Date.now().toString().slice(-6)} has been
              confirmed and will be processed shortly.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-left">
                  <div className="flex items-center gap-3 mb-4">
                    <Mail
                      className="h-5 w-5"
                      style={{ color: "rgb(59, 130, 246)" }}
                    />
                    <h3 className="font-semibold">Order Confirmation</h3>
                  </div>
                  <p
                    className="text-sm"
                    style={{ color: "rgb(107, 114, 128)" }}
                  >
                    A confirmation email has been sent to {formData.email}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-left">
                  <div className="flex items-center gap-3 mb-4">
                    <Truck
                      className="h-5 w-5"
                      style={{ color: "rgb(34, 197, 94)" }}
                    />
                    <h3 className="font-semibold">Estimated Delivery</h3>
                  </div>
                  <p
                    className="text-sm"
                    style={{ color: "rgb(107, 114, 128)" }}
                  >
                    {selectedShipping?.description || "5-7 business days"}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Link href="/account/orders">
                <Button
                  className="w-full md:w-auto px-8"
                  style={{ backgroundColor: "rgb(17, 24, 39)" }}
                >
                  Track Your Order
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  variant="outline"
                  className="w-full md:w-auto px-8 ml-0 md:ml-4 bg-transparent"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen pt-20"
      style={{ backgroundColor: "rgb(249, 250, 251)" }}
    >
      <div className="  mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1
              className="text-3xl font-bold"
              style={{ color: "rgb(17, 24, 39)" }}
            >
              Checkout
            </h1>
            <p style={{ color: "rgb(107, 114, 128)" }}>
              Complete your purchase securely
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    currentStep >= step.id
                      ? "border-black bg-black text-white"
                      : "border-gray-300 bg-white text-gray-500"
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-full h-0.5 mx-4 ${currentStep > step.id ? "bg-black" : "bg-gray-300"}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            {steps.map((step) => (
              <div key={step.id} className="text-center flex-1">
                <p
                  className="font-medium text-sm"
                  style={{
                    color:
                      currentStep >= step.id
                        ? "rgb(17, 24, 39)"
                        : "rgb(156, 163, 175)",
                  }}
                >
                  {step.name}
                </p>
                <p className="text-xs" style={{ color: "rgb(107, 114, 128)" }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Contact Information & Billing Address */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="Enter your email"
                          className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && (
                          <p
                            className="text-sm mt-1"
                            style={{ color: "rgb(239, 68, 68)" }}
                          >
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={newsletter}
                        onCheckedChange={setNewsletter}
                      />
                      <Label htmlFor="newsletter" className="text-sm">
                        Subscribe to our newsletter for updates and exclusive
                        offers
                      </Label>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Billing Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="billingFirstName">First Name *</Label>
                        <Input
                          id="billingFirstName"
                          value={formData.billingFirstName}
                          onChange={(e) =>
                            handleInputChange(
                              "billingFirstName",
                              e.target.value,
                            )
                          }
                          placeholder="First name"
                          className={
                            errors.billingFirstName ? "border-red-500" : ""
                          }
                        />
                        {errors.billingFirstName && (
                          <p
                            className="text-sm mt-1"
                            style={{ color: "rgb(239, 68, 68)" }}
                          >
                            {errors.billingFirstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="billingLastName">Last Name *</Label>
                        <Input
                          id="billingLastName"
                          value={formData.billingLastName}
                          onChange={(e) =>
                            handleInputChange("billingLastName", e.target.value)
                          }
                          placeholder="Last name"
                          className={
                            errors.billingLastName ? "border-red-500" : ""
                          }
                        />
                        {errors.billingLastName && (
                          <p
                            className="text-sm mt-1"
                            style={{ color: "rgb(239, 68, 68)" }}
                          >
                            {errors.billingLastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="billingAddress">Address *</Label>
                      <Input
                        id="billingAddress"
                        value={formData.billingAddress}
                        onChange={(e) =>
                          handleInputChange("billingAddress", e.target.value)
                        }
                        placeholder="Street address"
                        className={
                          errors.billingAddress ? "border-red-500" : ""
                        }
                      />
                      {errors.billingAddress && (
                        <p
                          className="text-sm mt-1"
                          style={{ color: "rgb(239, 68, 68)" }}
                        >
                          {errors.billingAddress}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="billingApartment">
                        Apartment, suite, etc. (optional)
                      </Label>
                      <Input
                        id="billingApartment"
                        value={formData.billingApartment}
                        onChange={(e) =>
                          handleInputChange("billingApartment", e.target.value)
                        }
                        placeholder="Apartment, suite, etc."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="billingCity">City *</Label>
                        <Input
                          id="billingCity"
                          value={formData.billingCity}
                          onChange={(e) =>
                            handleInputChange("billingCity", e.target.value)
                          }
                          placeholder="City"
                          className={errors.billingCity ? "border-red-500" : ""}
                        />
                        {errors.billingCity && (
                          <p
                            className="text-sm mt-1"
                            style={{ color: "rgb(239, 68, 68)" }}
                          >
                            {errors.billingCity}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="billingState">State *</Label>
                        <Select
                          value={formData.billingState}
                          onValueChange={(value) =>
                            handleInputChange("billingState", value)
                          }
                        >
                          <SelectTrigger
                            className={
                              errors.billingState ? "border-red-500" : ""
                            }
                          >
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {states.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.billingState && (
                          <p
                            className="text-sm mt-1"
                            style={{ color: "rgb(239, 68, 68)" }}
                          >
                            {errors.billingState}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="billingZipCode">ZIP Code *</Label>
                        <Input
                          id="billingZipCode"
                          value={formData.billingZipCode}
                          onChange={(e) =>
                            handleInputChange("billingZipCode", e.target.value)
                          }
                          placeholder="ZIP"
                          className={
                            errors.billingZipCode ? "border-red-500" : ""
                          }
                        />
                        {errors.billingZipCode && (
                          <p
                            className="text-sm mt-1"
                            style={{ color: "rgb(239, 68, 68)" }}
                          >
                            {errors.billingZipCode}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="billingCountry">Country</Label>
                      <Select
                        value={formData.billingCountry}
                        onValueChange={(value) =>
                          handleInputChange("billingCountry", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="saveInfo"
                        checked={saveInfo}
                        onCheckedChange={setSaveInfo}
                      />
                      <Label htmlFor="saveInfo" className="text-sm">
                        Save this information for next time
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 2: Shipping Method */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Shipping Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={shippingMethod}
                    onValueChange={setShippingMethod}
                  >
                    {shippingOptions.map((option) => {
                      const IconComponent = option.icon;
                      return (
                        <div
                          key={option.id}
                          className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <RadioGroupItem value={option.id} id={option.id} />
                          <IconComponent
                            className="h-5 w-5"
                            style={{ color: "rgb(107, 114, 128)" }}
                          />
                          <div className="flex-1">
                            <Label
                              htmlFor={option.id}
                              className="font-medium cursor-pointer"
                            >
                              {option.name}
                            </Label>
                            <p
                              className="text-sm"
                              style={{ color: "rgb(107, 114, 128)" }}
                            >
                              {option.description}
                            </p>
                          </div>
                          <span className="font-semibold">
                            ${option.price.toFixed(2)}
                          </span>
                        </div>
                      );
                    })}
                  </RadioGroup>

                  <div
                    className="mt-6 p-4 rounded-lg"
                    style={{ backgroundColor: "rgb(239, 246, 255)" }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Shield
                        className="h-4 w-4"
                        style={{ color: "rgb(59, 130, 246)" }}
                      />
                      <span
                        className="font-medium text-sm"
                        style={{ color: "rgb(59, 130, 246)" }}
                      >
                        Shipping Protection
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: "rgb(75, 85, 99)" }}>
                      All orders are insured and tracked. Free returns within 30
                      days.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Payment Method */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                    >
                      {paymentOptions.map((option) => {
                        const IconComponent = option.icon;
                        return (
                          <div
                            key={option.id}
                            className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <RadioGroupItem value={option.id} id={option.id} />
                            <IconComponent className="h-5 w-5" />
                            <div className="flex-1">
                              <Label
                                htmlFor={option.id}
                                className="font-medium cursor-pointer"
                              >
                                {option.name}
                              </Label>
                              <p
                                className="text-sm"
                                style={{ color: "rgb(107, 114, 128)" }}
                              >
                                {option.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </RadioGroup>

                    {paymentMethod === "card" && (
                      <div
                        className="space-y-4 mt-6 p-4 border rounded-lg"
                        style={{ backgroundColor: "rgb(249, 250, 251)" }}
                      >
                        <div>
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <Input
                            id="cardNumber"
                            value={formData.cardNumber}
                            onChange={(e) =>
                              handleInputChange("cardNumber", e.target.value)
                            }
                            placeholder="1234 5678 9012 3456"
                            className={
                              errors.cardNumber ? "border-red-500" : ""
                            }
                          />
                          {errors.cardNumber && (
                            <p
                              className="text-sm mt-1"
                              style={{ color: "rgb(239, 68, 68)" }}
                            >
                              {errors.cardNumber}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="col-span-2">
                            <Label htmlFor="expiryDate">Expiry Date *</Label>
                            <Input
                              id="expiryDate"
                              value={formData.expiryDate}
                              onChange={(e) =>
                                handleInputChange("expiryDate", e.target.value)
                              }
                              placeholder="MM/YY"
                              className={
                                errors.expiryDate ? "border-red-500" : ""
                              }
                            />
                            {errors.expiryDate && (
                              <p
                                className="text-sm mt-1"
                                style={{ color: "rgb(239, 68, 68)" }}
                              >
                                {errors.expiryDate}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input
                              id="cvv"
                              value={formData.cvv}
                              onChange={(e) =>
                                handleInputChange("cvv", e.target.value)
                              }
                              placeholder="123"
                              className={errors.cvv ? "border-red-500" : ""}
                            />
                            {errors.cvv && (
                              <p
                                className="text-sm mt-1"
                                style={{ color: "rgb(239, 68, 68)" }}
                              >
                                {errors.cvv}
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="nameOnCard">Name on Card *</Label>
                          <Input
                            id="nameOnCard"
                            value={formData.nameOnCard}
                            onChange={(e) =>
                              handleInputChange("nameOnCard", e.target.value)
                            }
                            placeholder="Full name as shown on card"
                            className={
                              errors.nameOnCard ? "border-red-500" : ""
                            }
                          />
                          {errors.nameOnCard && (
                            <p
                              className="text-sm mt-1"
                              style={{ color: "rgb(239, 68, 68)" }}
                            >
                              {errors.nameOnCard}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Special Instructions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label htmlFor="orderNotes">Order Notes (Optional)</Label>
                      <Textarea
                        id="orderNotes"
                        value={formData.orderNotes}
                        onChange={(e) =>
                          handleInputChange("orderNotes", e.target.value)
                        }
                        placeholder="Any special instructions for your order..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 4: Review Order */}
            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Order Items */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Items in your order</h4>
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4 p-4 border rounded-lg"
                      >
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <h5 className="font-medium">{item.name}</h5>
                          <p
                            className="text-sm"
                            style={{ color: "rgb(107, 114, 128)" }}
                          >
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <span className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Shipping & Billing Summary */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Shipping Address</h4>
                      <div
                        className="text-sm space-y-1"
                        style={{ color: "rgb(107, 114, 128)" }}
                      >
                        <p>
                          {formData.billingFirstName} {formData.billingLastName}
                        </p>
                        <p>{formData.billingAddress}</p>
                        {formData.billingApartment && (
                          <p>{formData.billingApartment}</p>
                        )}
                        <p>
                          {formData.billingCity}, {formData.billingState}{" "}
                          {formData.billingZipCode}
                        </p>
                        <p>{formData.billingCountry}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Payment Method</h4>
                      <div
                        className="text-sm"
                        style={{ color: "rgb(107, 114, 128)" }}
                      >
                        <p>
                          {
                            paymentOptions.find((p) => p.id === paymentMethod)
                              ?.name
                          }
                        </p>
                        {paymentMethod === "card" && formData.cardNumber && (
                          <p>**** **** **** {formData.cardNumber.slice(-4)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handlePrevStep}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}

              <div className="ml-auto">
                {currentStep < 4 ? (
                  <Button
                    onClick={handleNextStep}
                    style={{ backgroundColor: "rgb(17, 24, 39)" }}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="px-8"
                    style={{ backgroundColor: "rgb(17, 24, 39)" }}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Place Order - ${finalTotal.toFixed(2)}
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items Preview */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="relative">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="rounded-md object-cover"
                        />
                        <Badge
                          className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                          style={{ backgroundColor: "rgb(17, 24, 39)" }}
                        >
                          {item.quantity}
                        </Badge>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">
                          {item.name}
                        </h4>
                        <p
                          className="text-sm"
                          style={{ color: "rgb(107, 114, 128)" }}
                        >
                          ${item.price}
                        </p>
                      </div>
                      <span className="font-medium text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Promo Code */}
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                    />
                    <Button
                      variant="outline"
                      onClick={applyPromoCode}
                      disabled={promoApplied || !promoCode}
                    >
                      Apply
                    </Button>
                  </div>
                  {promoApplied && (
                    <p
                      className="text-sm flex items-center gap-1"
                      style={{ color: "rgb(34, 197, 94)" }}
                    >
                      <Check className="h-4 w-4" />
                      Promo code applied!
                    </p>
                  )}
                </div>

                <Separator />

                {/* Pricing Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  {promoDiscount > 0 && (
                    <div
                      className="flex justify-between"
                      style={{ color: "rgb(34, 197, 94)" }}
                    >
                      <span>Discount</span>
                      <span>-${promoDiscount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Security Features */}
                <div className="space-y-2 pt-4 border-t">
                  <div
                    className="flex items-center gap-2 text-sm"
                    style={{ color: "rgb(107, 114, 128)" }}
                  >
                    <Shield className="h-4 w-4" />
                    <span>Secure SSL encryption</span>
                  </div>
                  <div
                    className="flex items-center gap-2 text-sm"
                    style={{ color: "rgb(107, 114, 128)" }}
                  >
                    <Truck className="h-4 w-4" />
                    <span>Free returns within 30 days</span>
                  </div>
                  <div
                    className="flex items-center gap-2 text-sm"
                    style={{ color: "rgb(107, 114, 128)" }}
                  >
                    <Star className="h-4 w-4" />
                    <span>24/7 customer support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
