"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Package, AlertCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import ProductAnalytics from "@/components/product/product-analytics-details"
import ProductsListAdmin from "@/components/product/products-list-admin"

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
      <ProductAnalytics {analytics} />

      <ProductsListAdmin  />
    </div>
  )
}
