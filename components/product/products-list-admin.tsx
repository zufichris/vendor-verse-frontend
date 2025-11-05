'use client'

import { Edit, Eye, Filter, MoreHorizontal, Search, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Product } from '@/types/product'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props{
    products: Product[]
}

export default function ProductsListAdmin({products}:Props) {
    const query = useSearchParams()
    const router = useRouter()

  const [searchTerm, setSearchTerm] = useState(query.get('search')||'')
  const [selectedCategory, setSelectedCategory] = useState(query.get('category') || "all")

  useEffect(() => {
      const timer = setTimeout(() => {
        const params = new URLSearchParams(query)
        if (searchTerm.trim()) {
          params.set("search", searchTerm)
          params.set("page", "1") // Reset to first page on new search
        } else {
          params.delete("search")
        }
        if (selectedCategory !== 'all') {
            params.set('category', selectedCategory)
            params.set('page', '1')
        }else{
            params.delete('category')
        }

        router.push(`?${params.toString()}`)
      }, 300)

      return () => clearTimeout(timer)
  }, [searchTerm, selectedCategory, router, query])


  return (
    <>
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
                  {products.map((product) => {
                    return (
                      <ProductRow product={product} />
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

function ProductRow({product}:{product: Product}) {
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
const handleDeleteProduct = (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      alert('deleted')
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const stockStatus = ((stock: number) => {
    if (stock === 0) return { label: "Out of Stock", color: "rgb(239, 68, 68)" }
    if (stock < 10) return { label: "Low Stock", color: "rgb(251, 191, 36)" }
    return { label: "In Stock", color: "rgb(34, 197, 94)" }
  })(product.stockQuantity)

  return (
    <tr key={product.id}>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <img
              src={product.images?.[0]?.url || "/placeholder.svg"}
              alt={product.images?.[0]?.altText || product.name}
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
          <Badge variant="secondary">{product.category?.name}</Badge>
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
              {product.stockQuantity}
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
}

