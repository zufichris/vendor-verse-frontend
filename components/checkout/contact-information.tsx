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
import { User as UserT } from "@/types/user";
import { PhoneInput } from "../ui/phone-input";
import { useState } from "react";

const countries = ["United Arab Emirates"];

const states = ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Umm Al-Quwain", "Ras Al Khaimah", "Fujairah"];

interface Props {
    user: UserT | null;
}

export function ContactInformation({ user }: Props) {
    const {
        formData,
        handleInputChange,
        errors,
        saveInfo,
        setSaveInfo,
    } = useCheckoutStore();

    const [sameShipping, setSameShipping] = useState(true)
    

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
                            {
                                !!user?.email ? <p className="mb-1 font-medium">{user.email}</p> : <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    placeholder="Enter your email"
                                    className={errors.email ? "border-red-500" : ""}

                                />
                            }

                            {errors.email && (
                                <p className="text-sm mt-1 text-red-500">{errors.email}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            {
                                !!user?.phone ? <p className="mb-1 font-medium">{user.phone}</p> : (
                                    <PhoneInput
                                        name={"phone"}
                                        international
                                        countryCallingCodeEditable={false}
                                        defaultCountry="AE"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange("phone", e ?? "")}
                                        placeholder="Enter your phone number"
                                    />
                                )
                            }
                            {errors.phone && (
                                <p className="text-sm mt-1 text-red-500">{errors.phone}</p>
                            )}
                        </div>
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

            <div className="flex items-center space-x-2">
                <Checkbox
                    id="sameshipping"
                    checked={!sameShipping}
                    onCheckedChange={(state)=> setSameShipping(prv => !prv)}
                />
                <Label htmlFor="newsletter" className="text-sm">
                    Shipping to a different address?
                </Label>
            </div>

            {
                !sameShipping && <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Shipping Address
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="shippingFirstName">First Name *</Label>
                            <Input
                                id="shippingFirstName"
                                value={formData.shippingFirstName}
                                onChange={(e) =>
                                    handleInputChange("shippingFirstName", e.target.value)
                                }
                                placeholder="First name"
                                className={errors.shippingFirstName ? "border-red-500" : ""}
                            />
                            {errors.shippingFirstName && (
                                <p className="text-sm mt-1 text-red-500">
                                    {errors.shippingFirstName}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="shippingLastName">Last Name *</Label>
                            <Input
                                id="shippingLastName"
                                value={formData.shippingLastName}
                                onChange={(e) =>
                                    handleInputChange("shippingLastName", e.target.value)
                                }
                                placeholder="Last name"
                                className={errors.shippingLastName ? "border-red-500" : ""}
                            />
                            {errors.shippingLastName && (
                                <p className="text-sm mt-1 text-red-500">
                                    {errors.shippingLastName}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="shippingAddress">Address *</Label>
                        <Input
                            id="shippingAddress"
                            value={formData.shippingAddress}
                            onChange={(e) =>
                                handleInputChange("shippingAddress", e.target.value)
                            }
                            placeholder="Street address"
                            className={errors.shippingAddress ? "border-red-500" : ""}
                        />
                        {errors.shippingAddress && (
                            <p className="text-sm mt-1 text-red-500">
                                {errors.shippingAddress}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="shippingApartment">
                            Apartment, suite, etc. (optional)
                        </Label>
                        <Input
                            id="shippingApartment"
                            value={formData.shippingApartment}
                            onChange={(e) =>
                                handleInputChange("shippingApartment", e.target.value)
                            }
                            placeholder="Apartment, suite, etc."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="shippingCity">City *</Label>
                            <Input
                                id="shippingCity"
                                value={formData.shippingCity}
                                onChange={(e) =>
                                    handleInputChange("shippingCity", e.target.value)
                                }
                                placeholder="City"
                                className={errors.shippingCity ? "border-red-500" : ""}
                            />
                            {errors.shippingCity && (
                                <p className="text-sm mt-1 text-red-500">
                                    {errors.shippingCity}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="shippingState">State *</Label>
                            <Select
                                value={formData.shippingState}
                                onValueChange={(value) =>
                                    handleInputChange("shippingState", value)
                                }
                            >
                                <SelectTrigger
                                    className={errors.shippingState ? "border-red-500" : ""}
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
                            {errors.shippingState && (
                                <p className="text-sm mt-1 text-red-500">
                                    {errors.shippingState}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="shippingZipCode">ZIP Code *</Label>
                            <Input
                                id="shippingZipCode"
                                value={formData.shippingZipCode}
                                onChange={(e) =>
                                    handleInputChange("shippingZipCode", e.target.value)
                                }
                                placeholder="ZIP"
                                className={errors.shippingZipCode ? "border-red-500" : ""}
                            />
                            {errors.shippingZipCode && (
                                <p className="text-sm mt-1 text-red-500">
                                    {errors.shippingZipCode}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="shippingCountry">Country</Label>
                        <Select
                            value={formData.shippingCountry}
                            onValueChange={(value) =>
                                handleInputChange("shippingCountry", value)
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
                </CardContent>
            </Card>
            }
        </div>
    );
}
