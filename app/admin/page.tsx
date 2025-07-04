"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, DollarSign, ShoppingCart, Users, Package, Eye, MoreHorizontal } from "lucide-react"

interface DashboardStats {
  totalRevenue: number
  revenueChange: number
  totalOrders: number
  ordersChange: number
  totalUsers: number
  usersChange: number
  totalProducts: number
  productsChange: number
}

interface RecentOrder {
  id: string
  customer: string
  amount: number
  status: "pending" | "processing" | "shipped" | "delivered"
  date: string
}

interface TopProduct {
  id: string
  name: string
  sales: number
  revenue: number
  image: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 45231.89,
    revenueChange: 20.1,
    totalOrders: 1234,
    ordersChange: 15.3,
    totalUsers: 5678,
    usersChange: 8.2,
    totalProducts: 234,
    productsChange: 5.4,
  })

  const [recentOrders] = useState<RecentOrder[]>([
    { id: "ORD-001", customer: "John Doe", amount: 299.99, status: "processing", date: "2024-01-15" },
    { id: "ORD-002", customer: "Jane Smith", amount: 149.5, status: "shipped", date: "2024-01-15" },
    { id: "ORD-003", customer: "Bob Johnson", amount: 89.99, status: "delivered", date: "2024-01-14" },
    { id: "ORD-004", customer: "Alice Brown", amount: 199.99, status: "pending", date: "2024-01-14" },
    { id: "ORD-005", customer: "Charlie Wilson", amount: 349.99, status: "processing", date: "2024-01-13" },
  ])

  const [topProducts] = useState<TopProduct[]>([
    {
      id: "1",
      name: "Premium Wireless Headphones",
      sales: 156,
      revenue: 46644,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Minimalist Watch Collection",
      sales: 89,
      revenue: 17711,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Smart Fitness Tracker",
      sales: 134,
      revenue: 20100,
      image: "/placeholder.svg?height=40&width=40",
    },
    { id: "4", name: "Wireless Charging Pad", sales: 78, revenue: 7020, image: "/placeholder.svg?height=40&width=40" },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "rgb(251, 191, 36)"
      case "processing":
        return "rgb(59, 130, 246)"
      case "shipped":
        return "rgb(168, 85, 247)"
      case "delivered":
        return "rgb(34, 197, 94)"
      default:
        return "rgb(107, 114, 128)"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold" style={{ color: "rgb(17, 24, 39)" }}>
            Dashboard
          </h1>
          <p className="mt-2 text-sm" style={{ color: "rgb(107, 114, 128)" }}>
            Overview of your store performance and key metrics
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: "rgb(107, 114, 128)" }}>
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4" style={{ color: "rgb(107, 114, 128)" }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: "rgb(17, 24, 39)" }}>
              {formatCurrency(stats.totalRevenue)}
            </div>
            <div className="flex items-center text-xs mt-1">
              <TrendingUp className="h-3 w-3 mr-1" style={{ color: "rgb(34, 197, 94)" }} />
              <span style={{ color: "rgb(34, 197, 94)" }}>+{stats.revenueChange}%</span>
              <span className="ml-1" style={{ color: "rgb(107, 114, 128)" }}>
                from last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: "rgb(107, 114, 128)" }}>
              Total Orders
            </CardTitle>
            <ShoppingCart className="h-4 w-4" style={{ color: "rgb(107, 114, 128)" }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: "rgb(17, 24, 39)" }}>
              {stats.totalOrders.toLocaleString()}
            </div>
            <div className="flex items-center text-xs mt-1">
              <TrendingUp className="h-3 w-3 mr-1" style={{ color: "rgb(34, 197, 94)" }} />
              <span style={{ color: "rgb(34, 197, 94)" }}>+{stats.ordersChange}%</span>
              <span className="ml-1" style={{ color: "rgb(107, 114, 128)" }}>
                from last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: "rgb(107, 114, 128)" }}>
              Total Users
            </CardTitle>
            <Users className="h-4 w-4" style={{ color: "rgb(107, 114, 128)" }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: "rgb(17, 24, 39)" }}>
              {stats.totalUsers.toLocaleString()}
            </div>
            <div className="flex items-center text-xs mt-1">
              <TrendingUp className="h-3 w-3 mr-1" style={{ color: "rgb(34, 197, 94)" }} />
              <span style={{ color: "rgb(34, 197, 94)" }}>+{stats.usersChange}%</span>
              <span className="ml-1" style={{ color: "rgb(107, 114, 128)" }}>
                from last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: "rgb(107, 114, 128)" }}>
              Total Products
            </CardTitle>
            <Package className="h-4 w-4" style={{ color: "rgb(107, 114, 128)" }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: "rgb(17, 24, 39)" }}>
              {stats.totalProducts}
            </div>
            <div className="flex items-center text-xs mt-1">
              <TrendingUp className="h-3 w-3 mr-1" style={{ color: "rgb(34, 197, 94)" }} />
              <span style={{ color: "rgb(34, 197, 94)" }}>+{stats.productsChange}%</span>
              <span className="ml-1" style={{ color: "rgb(107, 114, 128)" }}>
                from last month
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders and Top Products */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle style={{ color: "rgb(17, 24, 39)" }}>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ backgroundColor: "rgb(249, 250, 251)" }}
                >
                  <div className="flex items-center space-x-3">
                    <div>
                      <p className="text-sm font-medium" style={{ color: "rgb(17, 24, 39)" }}>
                        {order.id}
                      </p>
                      <p className="text-xs" style={{ color: "rgb(107, 114, 128)" }}>
                        {order.customer}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium" style={{ color: "rgb(17, 24, 39)" }}>
                      {formatCurrency(order.amount)}
                    </span>
                    <span
                      className="px-2 py-1 text-xs font-medium rounded-full"
                      style={{
                        backgroundColor: `${getStatusColor(order.status)}20`,
                        color: getStatusColor(order.status),
                      }}
                    >
                      {order.status}
                    </span>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full bg-transparent">
                View All Orders
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle style={{ color: "rgb(17, 24, 39)" }}>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ backgroundColor: "rgb(249, 250, 251)" }}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium" style={{ color: "rgb(17, 24, 39)" }}>
                        {product.name}
                      </p>
                      <p className="text-xs" style={{ color: "rgb(107, 114, 128)" }}>
                        {product.sales} sales
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium" style={{ color: "rgb(17, 24, 39)" }}>
                      {formatCurrency(product.revenue)}
                    </span>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full bg-transparent">
                View All Products
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
