import { Package, PackageCheck } from "lucide-react";

export const shippingOptions = [
    {
        id: "standard",
        name: "Standard Shipping",
        description: "Next day delivery",
        price: 25,
        icon: Package,
        isDefault: true,
        currency: 'AED'
    },
    {
        id: "express",
        name: "Express Shipping",
        description: "Same day delivery (within Dubai)",
        price: 35,
        icon: PackageCheck,
        isDefault: true,
        currency: 'AED'
    },
]
