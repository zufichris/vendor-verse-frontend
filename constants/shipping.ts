import { Package, PackageCheck } from "lucide-react";

export const shippingOptions = [
    {
        id: "standard",
        name: "Standard Shipping",
        description: "5-7 business days",
        price: 10,
        icon: Package,
        isDefault: true,
    },
    {
        id: "express",
        name: "Express Shipping",
        description: "2-3 business days",
        price: 20,
        icon: PackageCheck,
        isDefault: true,
    },
]