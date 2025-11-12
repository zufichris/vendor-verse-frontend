import { Package, PackageCheck } from "lucide-react";

export const shippingOptions = [
    {
        id: "standard",
        name: "Standard Delivery",
        description: "Next day delivery",
        price: 22,
        icon: Package,
        isDefault: true,
        currency: 'AED'
    },
    {
        id: "express",
        name: "Express Delivery",
        description: "Same day delivery (within Dubai)",
        price: 35,
        icon: PackageCheck,
        isDefault: true,
        currency: 'AED'
    },
]
