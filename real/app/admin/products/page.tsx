"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Package, AlertCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Product {
  id: string
  name: string
  price: number
  category: string
  stock: number
  status: "active" | "inactive" | "out-of-stock"
  image: string
  createdAt: string
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 299,
      category: "Electronics",
      stock: 15,
      status: "active",
      image: "/placeholder.svg?height=60&width=60",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Minimalist Watch Collection",
      price: 199,
      category: "Accessories",
      stock: 25,
      status: "active",
      image: "/placeholder.svg?height=60&width=60",
      createdAt: "2024-01-14",
    },
    {
      id: "3",
      name: "Smart Fitness Tracker",
      price: 149,
      category: "Electronics",
      stock: 0,
      status: "out-of-stock",
      image: "/placeholder.svg?height=60&width=60",
      createdAt: "2024-01-13",
    },
    {
      id: "4",
      name: "Wireless Charging Pad",
      price: 89,
      category: "Electronics",
      stock: 8,
      status: "active",
      image: "/placeholder.svg?height=60&width=60",
      createdAt: "2024-01-12",
    },
    {
      id: "5",
      name: "Bluetooth Speaker",
      price: 129,
      category: "Electronics",
      stock: 12,
      status: "inactive",
      image: "/placeholder.svg?height=60&width=60",
      createdAt: "2024-01-11",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "rgb(34, 197, 94)"
      case "inactive":
        return "rgb(107, 114, 128)"
      case "out-of-stock":
        return "rgb(239, 68, 68)"
      default:
        return "rgb(107, 114, 128)"
    }
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", color: "rgb(239, 68, 68)" }
    if (stock < 10) return { label: "Low Stock", color: "rgb(251, 191, 36)" }
    return { label: "In Stock", color: "rgb(34, 197, 94)" }
  }

  const handleDeleteProduct = (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== productId))
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
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold" style={{ color: "rgb(17, 24, 39)" }}>
            Products
          </h1>
          <p className="mt-2 text-sm" style={{ color: "rgb(107, 114, 128)" }}>
            Manage your product inventory and listings
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link href="/admin/products/new">
            <Button className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: "rgb(107, 114, 128)" }}>
              Total Products
            </CardTitle>
            <Package className="h-4 w-4" style={{ color: "rgb(107, 114, 128)" }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: "rgb(17, 24, 39)" }}>
              {products.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: "rgb(107, 114, 128)" }}>
              Active Products
            </CardTitle>
            <Package className="h-4 w-4" style={{ color: "rgb(34, 197, 94)" }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: "rgb(17, 24, 39)" }}>
              {products.filter((p) => p.status === "active").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: "rgb(107, 114, 128)" }}>
              Low Stock Items
            </CardTitle>
            <AlertCircle className="h-4 w-4" style={{ color: "rgb(251, 191, 36)" }} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: "rgb(17, 24, 39)" }}>
              {products.filter((p) => p.stock < 10 && p.stock > 0).length}
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
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border rounded-md text-sm"
          style={{ borderColor: "rgb(209, 213, 219)", color: "rgb(17, 24, 39)" }}
        >
          <option value="all">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
          <option value="Clothing">Clothing</option>
        </select>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Products Table */}
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
                      Product
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: "rgb(107, 114, 128)" }}
                    >
                      Category
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: "rgb(107, 114, 128)" }}
                    >
                      Price
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: "rgb(107, 114, 128)" }}
                    >
                      Stock
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
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody
                  className="divide-y"
                  style={{ backgroundColor: "rgb(255, 255, 255)", borderColor: "rgb(229, 231, 235)" }}
                >
                  {filteredProducts.map((product) => {
                    const stockStatus = getStockStatus(product.stock)
                    return (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium" style={{ color: "rgb(17, 24, 39)" }}>
                                {product.name}
                              </div>
                              <div className="text-sm" style={{ color: "rgb(107, 114, 128)" }}>
                                ID: {product.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="secondary">{product.category}</Badge>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                          style={{ color: "rgb(17, 24, 39)" }}
                        >
                          {formatCurrency(product.price)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm font-medium mr-2" style={{ color: "rgb(17, 24, 39)" }}>
                              {product.stock}
                            </span>
                            <span
                              className="px-2 py-1 text-xs font-medium rounded-full"
                              style={{
                                backgroundColor: `${stockStatus.color}20`,
                                color: stockStatus.color,
                              }}
                            >
                              {stockStatus.label}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className="px-2 py-1 text-xs font-medium rounded-full capitalize"
                            style={{
                              backgroundColor: `${getStatusColor(product.status)}20`,
                              color: getStatusColor(product.status),
                            }}
                          >
                            {product.status.replace("-", " ")}
                          </span>
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
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
