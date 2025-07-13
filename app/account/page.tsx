"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, Package, Heart, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { authStore } from "@/lib/stores/auth";

const recentOrders = [
    {
        id: "12345",
        date: "2024-01-15",
        status: "Delivered",
        total: 299.99,
        items: [
            {
                name: "Premium Wireless Headphones",
                image: "/placeholder.svg?height=60&width=60",
            },
        ],
    },
    {
        id: "12344",
        date: "2024-01-10",
        status: "Shipped",
        total: 149.99,
        items: [
            {
                name: "Smart Home Speaker",
                image: "/placeholder.svg?height=60&width=60",
            },
        ],
    },
];

const wishlistItems = [
    {
        id: "1",
        name: "Minimalist Watch Collection",
        price: 199,
        image: "/placeholder.svg?height=100&width=100",
    },
    {
        id: "2",
        name: "Organic Cotton T-Shirt",
        price: 49,
        image: "/placeholder.svg?height=100&width=100",
    },
];

export default function AccountPage() {
    const { user, logout } = authStore();
    const [activeTab, setActiveTab] = useState("overview");

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20">
                <div className="  mx-auto px-4 py-16 text-center">
                    <h1 className="text-2xl font-bold mb-4">
                        Please sign in to view your account
                    </h1>
                    <Link href="/auth">
                        <Button className="bg-black hover:bg-gray-800">Sign In</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="  mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardContent className="p-6">
                                <div className="text-center mb-6">
                                    <Image
                                        src={"/placeholder.svg?height=80&width=80"}
                                        alt={user.firstName}
                                        width={80}
                                        height={80}
                                        className="rounded-full mx-auto mb-4"
                                    />
                                    <h2 className="font-bold text-lg">{user.firstName}</h2>
                                    <p className="text-gray-600">{user.email}</p>
                                </div>

                                <nav className="space-y-2">
                                    <Button
                                        variant={activeTab === "overview" ? "default" : "ghost"}
                                        className="w-full justify-start"
                                        onClick={() => setActiveTab("overview")}
                                    >
                                        <User className="h-4 w-4 mr-2" />
                                        Overview
                                    </Button>

                                    <Button
                                        variant={activeTab === "orders" ? "default" : "ghost"}
                                        className="w-full justify-start"
                                        onClick={() => setActiveTab("orders")}
                                    >
                                        <Package className="h-4 w-4 mr-2" />
                                        Orders
                                    </Button>

                                    <Button
                                        variant={activeTab === "wishlist" ? "default" : "ghost"}
                                        className="w-full justify-start"
                                        onClick={() => setActiveTab("wishlist")}
                                    >
                                        <Heart className="h-4 w-4 mr-2" />
                                        Wishlist
                                    </Button>

                                    <Button
                                        variant={activeTab === "settings" ? "default" : "ghost"}
                                        className="w-full justify-start"
                                        onClick={() => setActiveTab("settings")}
                                    >
                                        <Settings className="h-4 w-4 mr-2" />
                                        Settings
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                                        onClick={logout}
                                    >
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Sign Out
                                    </Button>
                                </nav>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {activeTab === "overview" && (
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Account Overview</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-3 gap-6">
                                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                                <Package className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                                                <div className="text-2xl font-bold">12</div>
                                                <div className="text-sm text-gray-600">
                                                    Total Orders
                                                </div>
                                            </div>

                                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                                <Heart className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                                                <div className="text-2xl font-bold">5</div>
                                                <div className="text-sm text-gray-600">
                                                    Wishlist Items
                                                </div>
                                            </div>

                                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                                <User className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                                                <div className="text-2xl font-bold">Gold</div>
                                                <div className="text-sm text-gray-600">
                                                    Member Status
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Recent Orders</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {recentOrders.map((order) => (
                                                <div
                                                    key={order.id}
                                                    className="flex items-center justify-between p-4 border rounded-lg"
                                                >
                                                    <div className="flex items-center space-x-4">
                                                        <Image
                                                            src={order.items[0].image || "/placeholder.svg"}
                                                            alt={order.items[0].name}
                                                            width={50}
                                                            height={50}
                                                            className="rounded-md"
                                                        />
                                                        <div>
                                                            <p className="font-medium">Order #{order.id}</p>
                                                            <p className="text-sm text-gray-600">
                                                                {order.date}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-medium">${order.total}</p>
                                                        <p
                                                            className={`text-sm ${order.status === "Delivered" ? "text-green-600" : "text-blue-600"}`}
                                                        >
                                                            {order.status}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {activeTab === "orders" && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Order History</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {recentOrders.map((order) => (
                                            <div key={order.id} className="border rounded-lg p-6">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="font-medium">Order #{order.id}</h3>
                                                        <p className="text-sm text-gray-600">
                                                            Placed on {order.date}
                                                        </p>
                                                    </div>
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-sm ${order.status === "Delivered"
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-blue-100 text-blue-800"
                                                            }`}
                                                    >
                                                        {order.status}
                                                    </span>
                                                </div>

                                                <div className="flex items-center space-x-4 mb-4">
                                                    <Image
                                                        src={order.items[0].image || "/placeholder.svg"}
                                                        alt={order.items[0].name}
                                                        width={60}
                                                        height={60}
                                                        className="rounded-md"
                                                    />
                                                    <div className="flex-1">
                                                        <p className="font-medium">{order.items[0].name}</p>
                                                        <p className="text-gray-600">
                                                            Total: ${order.total}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex gap-2">
                                                    <Button variant="outline" size="sm">
                                                        View Details
                                                    </Button>
                                                    <Button variant="outline" size="sm">
                                                        Track Order
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {activeTab === "wishlist" && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>My Wishlist</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {wishlistItems.map((item) => (
                                            <div key={item.id} className="border rounded-lg p-4">
                                                <Image
                                                    src={item.image || "/placeholder.svg"}
                                                    alt={item.name}
                                                    width={100}
                                                    height={100}
                                                    className="rounded-md mb-4"
                                                />
                                                <h3 className="font-medium mb-2">{item.name}</h3>
                                                <p className="text-lg font-bold mb-4">${item.price}</p>
                                                <div className="flex gap-2">
                                                    <Button size="sm" className="flex-1">
                                                        Add to Cart
                                                    </Button>
                                                    <Button variant="outline" size="sm">
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {activeTab === "settings" && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Account Settings</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <h3 className="font-medium mb-4">Personal Information</h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    First Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full p-2 border rounded-md"
                                                    defaultValue="John"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    Last Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full p-2 border rounded-md"
                                                    defaultValue="Doe"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium mb-1">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    className="w-full p-2 border rounded-md"
                                                    defaultValue={user.email}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-medium mb-4">Change Password</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    Current Password
                                                </label>
                                                <input
                                                    type="password"
                                                    className="w-full p-2 border rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    New Password
                                                </label>
                                                <input
                                                    type="password"
                                                    className="w-full p-2 border rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    Confirm New Password
                                                </label>
                                                <input
                                                    type="password"
                                                    className="w-full p-2 border rounded-md"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <Button className="bg-black hover:bg-gray-800">
                                            Save Changes
                                        </Button>
                                        <Button variant="outline">Cancel</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
