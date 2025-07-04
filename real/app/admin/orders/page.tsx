"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Filter, MoreHorizontal, Eye, Truck, Package, CheckCircle, Clock, XCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Order {
  id: string
  customer: {
    name: string
    email: string
    avatar?: string
  }
  items: number
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "paid" | "pending" | "failed"
  createdAt: string
  shippingAddress: string
}

export default function AdminOrders() {
  const [orders] = useState<Order[]>([
    {
      id: "ORD-001",
      customer: { name: "John Doe", email: "john@example.com" },
      items: 3,
      total: 299.99,
      status: "processing",
      paymentStatus: "paid",
      createdAt: "2024-01-15T10:30:00Z",
      shippingAddress: "123 Main St, New York, NY 10001",
    },
    {
      id: "ORD-002",
      customer: { name: "Jane Smith", email: "jane@example.com" },
      items: 1,
      total: 149.5,
      status: "shipped",
      paymentStatus: "paid",
      createdAt: "2024-01-15T09:15:00Z",
      shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
    },
    {
      id: "ORD-003",
      customer: { name: "Bob Johnson", email: "bob@example.com" },
      items: 2,
      total: 89.99,
      status: "delivered",
      paymentStatus: "paid",
      createdAt: "2024-01-14T14:20:00Z",
      shippingAddress: "789 Pine St, Chicago, IL 60601",
    },
    {
      id: "ORD-004",
      customer: { name: "Alice Brown", email: "alice@example.com" },
      items: 1,
      total: 199.99,
      status: "pending",
      paymentStatus: "pending",
      createdAt: "2024-01-14T11:45:00Z",
      shippingAddress: "321 Elm St, Houston, TX 77001",
    },
    {
      id: "ORD-005",
      customer: { name: "Charlie Wilson", email: "charlie@example.com" },
      items: 4,
      total: 349.99,
      status: "cancelled",
      paymentStatus: "failed",
      createdAt: "2024-01-13T16:30:00Z",
      shippingAddress: "654 Maple Dr, Phoenix, AZ 85001",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "processing":
        return <Package className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

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
      case "cancelled":
        return "rgb(239, 68, 68)"
      default:
        return "rgb(107, 114, 128)"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "rgb(34, 197, 94)"
      case "pending":
        return "rgb(251, 191, 36)"
      case "failed":
        return "rgb(239, 68, 68)"
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // In a real app, this would make an API call
    console.log(`Updating order ${orderId} to ${newStatus}`)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold" style={{ color: "rgb(17, 24, 39)" }}>
            Orders
          </h1>
          <p className="mt-2 text-sm" style={{ color: "rgb(107, 114, 128)" }}>
            Manage customer orders and track fulfillment
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-8 w-8" style={{ color: "rgb(251, 191, 36)" }} />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium truncate" style={{ color: "rgb(107, 114, 128)" }}>
                    Pending Orders
                  </dt>
                  <dd className="text-lg font-medium" style={{ color: "rgb(17, 24, 39)" }}>
                    {orders.filter((o) => o.status === "pending").length}
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className="h-8 w-8" style={{ color: "rgb(59, 130, 246)" }} />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium truncate" style={{ color: "rgb(107, 114, 128)" }}>
                    Processing
                  </dt>
                  <dd className="text-lg font-medium" style={{ color: "rgb(17, 24, 39)" }}>
                    {orders.filter((o) => o.status === "processing").length}
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Truck className="h-8 w-8" style={{ color: "rgb(168, 85, 247)" }} />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium truncate" style={{ color: "rgb(107, 114, 128)" }}>
                    Shipped
                  </dt>
                  <dd className="text-lg font-medium" style={{ color: "rgb(17, 24, 39)" }}>
                    {orders.filter((o) => o.status === "shipped").length}
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8" style={{ color: "rgb(34, 197, 94)" }} />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium truncate" style={{ color: "rgb(107, 114, 128)" }}>
                    Delivered
                  </dt>
                  <dd className="text-lg font-medium" style={{ color: "rgb(17, 24, 39)" }}>
                    {orders.filter((o) => o.status === "delivered").length}
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
            style={{ color: "rgb(107, 114, 128)" }}
          />
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-2 border rounded-md text-sm"
          style={{ borderColor: "rgb(209, 213, 219)", color: "rgb(17, 24, 39)" }}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Orders Table */}
      <div className="mt-8">
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y" style={{ borderColor: "rgb(229, 231, 235)" }}>
                <thead style={{ backgroundColor: "rgb(249, 250, 251)" }}>
                  <tr>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: "rgb(107, 114, 128)" }}
                    >
                      Order
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: "rgb(107, 114, 128)" }}
                    >
                      Customer
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: "rgb(107, 114, 128)" }}
                    >
                      Items
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: "rgb(107, 114, 128)" }}
                    >
                      Total
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: "rgb(107, 114, 128)" }}
                    >
                      Status
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: "rgb(107, 114, 128)" }}
                    >
                      Payment
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: "rgb(107, 114, 128)" }}
                    >
                      Date
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: "rgb(107, 114, 128)" }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody
                  className="divide-y"
                  style={{ backgroundColor: "rgb(255, 255, 255)", borderColor: "rgb(229, 231, 235)" }}
                >
                  {filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium" style={{ color: "rgb(17, 24, 39)" }}>
                          {order.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                            style={{ backgroundColor: "rgb(59, 130, 246)" }}
                          >
                            <span className="text-xs font-medium text-white">{order.customer.name.charAt(0)}</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium" style={{ color: "rgb(17, 24, 39)" }}>
                              {order.customer.name}
                            </div>
                            <div className="text-sm" style={{ color: "rgb(107, 114, 128)" }}>
                              {order.customer.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: "rgb(17, 24, 39)" }}>
                        {order.items} items
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                        style={{ color: "rgb(17, 24, 39)" }}
                      >
                        {formatCurrency(order.total)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="mr-2" style={{ color: getStatusColor(order.status) }}>
                            {getStatusIcon(order.status)}
                          </span>
                          <span
                            className="px-2 py-1 text-xs font-medium rounded-full capitalize"
                            style={{
                              backgroundColor: `${getStatusColor(order.status)}20`,
                              color: getStatusColor(order.status),
                            }}
                          >
                            {order.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className="px-2 py-1 text-xs font-medium rounded-full capitalize"
                          style={{
                            backgroundColor: `${getPaymentStatusColor(order.paymentStatus)}20`,
                            color: getPaymentStatusColor(order.paymentStatus),
                          }}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: "rgb(107, 114, 128)" }}>
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "processing")}>
                              <Package className="h-4 w-4 mr-2" />
                              Mark Processing
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "shipped")}>
                              <Truck className="h-4 w-4 mr-2" />
                              Mark Shipped
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "delivered")}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark Delivered
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
