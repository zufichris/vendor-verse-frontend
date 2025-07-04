"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FolderOpen,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  Bell,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Categories", href: "/admin/categories", icon: FolderOpen },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen" style={{ backgroundColor: "rgb(249, 250, 251)" }}>
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div
          className="fixed inset-0"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          onClick={() => setSidebarOpen(false)}
        />
        <div
          className="fixed left-0 top-0 h-full w-64 transform transition-transform duration-300 ease-in-out"
          style={{ backgroundColor: "rgb(255, 255, 255)" }}
        >
          <div
            className="flex h-16 items-center justify-between px-6"
            style={{ borderBottomWidth: "1px", borderBottomColor: "rgb(229, 231, 235)" }}
          >
            <h1 className="text-xl font-bold" style={{ color: "rgb(17, 24, 39)" }}>
              Admin Panel
            </h1>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="mt-6 px-3">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 mb-1 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "text-white" : "hover:bg-gray-100"
                  }`}
                  style={{
                    backgroundColor: isActive ? "rgb(59, 130, 246)" : "transparent",
                    color: isActive ? "rgb(255, 255, 255)" : "rgb(75, 85, 99)",
                  }}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div
          className="flex flex-col flex-grow pt-5 overflow-y-auto"
          style={{
            backgroundColor: "rgb(255, 255, 255)",
            borderRightWidth: "1px",
            borderRightColor: "rgb(229, 231, 235)",
          }}
        >
          <div className="flex items-center flex-shrink-0 px-6">
            <h1 className="text-xl font-bold" style={{ color: "rgb(17, 24, 39)" }}>
              Admin Panel
            </h1>
          </div>
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-3 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? "text-white" : "hover:bg-gray-100"
                    }`}
                    style={{
                      backgroundColor: isActive ? "rgb(59, 130, 246)" : "transparent",
                      color: isActive ? "rgb(255, 255, 255)" : "rgb(75, 85, 99)",
                    }}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top navigation */}
        <div
          className="sticky top-0 z-10 flex h-16 flex-shrink-0 shadow-sm"
          style={{
            backgroundColor: "rgb(255, 255, 255)",
            borderBottomWidth: "1px",
            borderBottomColor: "rgb(229, 231, 235)",
          }}
        >
          <button
            type="button"
            className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset lg:hidden"
            style={{ color: "rgb(107, 114, 128)" }}
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between items-center">
            <div className="flex-1" />
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgb(59, 130, 246)" }}
                >
                  <span className="text-sm font-medium text-white">A</span>
                </div>
                <Button variant="ghost" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
