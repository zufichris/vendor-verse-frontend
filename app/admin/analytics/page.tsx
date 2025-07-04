"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, Download } from "lucide-react"

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState("7d")

  const salesData = [
    { date: "2024-01-09", sales: 1200, orders: 24 },
    { date: "2024-01-10", sales: 1800, orders: 32 },
    { date: "2024-01-11", sales: 1500, orders: 28 },
    { date: "2024-01-12", sales: 2200, orders: 41 },
    { date: "2024-01-13", sales: 1900, orders: 35 },
    { date: "2024-01-14", sales: 2500, orders: 48 },
    { date: "2024-01-15", sales: 2100, orders: 39 },
  ]

  const topProducts = [
    { name: "Premium Wireless Headphones", sales: 156, revenue: 46644 },
    { name: "Minimalist Watch Collection", sales: 89, revenue: 17711 },
    { name: "Smart Fitness Tracker", sales: 134, revenue: 20100 },
    { name: "Wireless Charging Pad", sales: 78, revenue: 7020 },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold" style={{ color: "rgb(17, 24, 39)" }}>
            Analytics
          </h1>
          <p className="mt-2 text-sm" style={{ color: "rgb(107, 114, 128)" }}>
            Track your store performance and key metrics
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
            style={{ borderColor: "rgb(209, 213, 219)", color: "rgb(17, 24, 39)" }}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
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
              {formatCurrency(45231.89)}
            </div>
            <div className="flex items-center text-xs mt-1">
              <TrendingUp className="h-3 w-3 mr-1" style={{ color: "rgb(34, 197, 94)" }} />
              <span style={{ color: "rgb(34, 197, 94)" }}>+20.1%</span>
              <span className="ml-1" style={{ color: "rgb(107, 114, 128)" }}>
                from last period
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: "rgb(107, 114, 128)" }}>
              Orders
            </CardTitle>
            <ShoppingCart className="h-4 w-4" style={{ color: "rgb(107, 114, 128)" }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: "rgb(17, 24, 39)" }}>
              1,234
            </div>
            <div className="flex items-center text-xs mt-1">
              <TrendingUp className="h-3 w-3 mr-1" style={{ color: "rgb(34, 197, 94)" }} />
              <span style={{ color: "rgb(34, 197, 94)" }}>+15.3%</span>
              <span className="ml-1" style={{ color: "rgb(107, 114, 128)" }}>
                from last period
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: "rgb(107, 114, 128)" }}>
              Customers
            </CardTitle>
            <Users className="h-4 w-4" style={{ color: "rgb(107, 114, 128)" }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: "rgb(17, 24, 39)" }}>
              5,678
            </div>
            <div className="flex items-center text-xs mt-1">
              <TrendingUp className="h-3 w-3 mr-1" style={{ color: "rgb(34, 197, 94)" }} />
              <span style={{ color: "rgb(34, 197, 94)" }}>+8.2%</span>
              <span className="ml-1" style={{ color: "rgb(107, 114, 128)" }}>
                from last period
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: "rgb(107, 114, 128)" }}>
              Avg. Order Value
            </CardTitle>
            <Package className="h-4 w-4" style={{ color: "rgb(107, 114, 128)" }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: "rgb(17, 24, 39)" }}>
              {formatCurrency(89.5)}
            </div>
            <div className="flex items-center text-xs mt-1">
              <TrendingDown className="h-3 w-3 mr-1" style={{ color: "rgb(239, 68, 68)" }} />
              <span style={{ color: "rgb(239, 68, 68)" }}>-2.4%</span>
              <span className="ml-1" style={{ color: "rgb(107, 114, 128)" }}>
                from last period
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle style={{ color: "rgb(17, 24, 39)" }}>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-end justify-between space-x-2">
              {salesData.map((day, index) => (
                <div key={day.date} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full rounded-t-md transition-all duration-300 hover:opacity-80"
                    style={{
                      height: `${(day.sales / Math.max(...salesData.map((d) => d.sales))) * 200}px`,
                      backgroundColor: "rgb(59, 130, 246)",
                      minHeight: "20px",
                    }}
                  />
                  <div className="mt-2 text-xs text-center" style={{ color: "rgb(107, 114, 128)" }}>
                    {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
                  </div>
                  <div className="text-xs font-medium" style={{ color: "rgb(17, 24, 39)" }}>
                    {formatCurrency(day.sales)}
                  </div>
                </div>
              ))}
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
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ backgroundColor: "rgb(249, 250, 251)" }}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-white"
                      style={{ backgroundColor: "rgb(59, 130, 246)" }}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: "rgb(17, 24, 39)" }}>
                        {product.name}
                      </p>
                      <p className="text-xs" style={{ color: "rgb(107, 114, 128)" }}>
                        {product.sales} sales
                      </p>
                    </div>
                  </div>
                  <div className="text-sm font-medium" style={{ color: "rgb(17, 24, 39)" }}>
                    {formatCurrency(product.revenue)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle style={{ color: "rgb(17, 24, 39)" }}>Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "rgb(17, 24, 39)" }}>
              3.2%
            </div>
            <div className="flex items-center text-sm mt-2">
              <TrendingUp className="h-4 w-4 mr-1" style={{ color: "rgb(34, 197, 94)" }} />
              <span style={{ color: "rgb(34, 197, 94)" }}>+0.5%</span>
              <span className="ml-1" style={{ color: "rgb(107, 114, 128)" }}>
                from last period
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle style={{ color: "rgb(17, 24, 39)" }}>Return Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "rgb(17, 24, 39)" }}>
              2.1%
            </div>
            <div className="flex items-center text-sm mt-2">
              <TrendingDown className="h-4 w-4 mr-1" style={{ color: "rgb(34, 197, 94)" }} />
              <span style={{ color: "rgb(34, 197, 94)" }}>-0.3%</span>
              <span className="ml-1" style={{ color: "rgb(107, 114, 128)" }}>
                from last period
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle style={{ color: "rgb(17, 24, 39)" }}>Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: "rgb(17, 24, 39)" }}>
              4.8/5
            </div>
            <div className="flex items-center text-sm mt-2">
              <TrendingUp className="h-4 w-4 mr-1" style={{ color: "rgb(34, 197, 94)" }} />
              <span style={{ color: "rgb(34, 197, 94)" }}>+0.2</span>
              <span className="ml-1" style={{ color: "rgb(107, 114, 128)" }}>
                from last period
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
