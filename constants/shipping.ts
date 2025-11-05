import { Package, PackageCheck } from "lucide-react";

export const shippingOptions = [
    {
        id: "standard",
        name: "Standard Shipping",
        description: "5-7 business days",
        price: 30,
        icon: Package,
        isDefault: true,
        currency: 'AED'
    },
    {
        id: "express",
        name: "Express Shipping",
        description: "2-3 business days",
        price: 60,
        icon: PackageCheck,
        isDefault: true,
        currency: 'AED'
    },
]