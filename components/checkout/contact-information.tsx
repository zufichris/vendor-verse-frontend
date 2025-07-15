"use client";

import { Mail, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCheckoutStore } from "@/lib/stores/checkout";

const countries = ["United Arab Emirates"];

const states = ["Abu Dhabi", "Dubai", "Sharjah"];

export function ContactInformation() {
    const {
        formData,
        handleInputChange,
        errors,
        newsletter,
        setNewsletter,
        saveInfo,
        setSaveInfo,
    } = useCheckoutStore();

    return (
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
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                placeholder="Enter your email"
                                className={errors.email ? "border-red-500" : ""}
                            />
                            {errors.email && (
                                <p className="text-sm mt-1 text-red-500">{errors.email}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
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
                            Subscribe to our newsletter for updates and exclusive offers
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
                                    handleInputChange("billingFirstName", e.target.value)
                                }
                                placeholder="First name"
                                className={errors.billingFirstName ? "border-red-500" : ""}
                            />
                            {errors.billingFirstName && (
                                <p className="text-sm mt-1 text-red-500">
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
                                className={errors.billingLastName ? "border-red-500" : ""}
                            />
                            {errors.billingLastName && (
                                <p className="text-sm mt-1 text-red-500">
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
                            className={errors.billingAddress ? "border-red-500" : ""}
                        />
                        {errors.billingAddress && (
                            <p className="text-sm mt-1 text-red-500">
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
                                <p className="text-sm mt-1 text-red-500">
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
                                    className={errors.billingState ? "border-red-500" : ""}
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
                                <p className="text-sm mt-1 text-red-500">
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
                                className={errors.billingZipCode ? "border-red-500" : ""}
                            />
                            {errors.billingZipCode && (
                                <p className="text-sm mt-1 text-red-500">
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
    );
}
