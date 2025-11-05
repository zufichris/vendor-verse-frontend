import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { AlertCircle, Package } from 'lucide-react'
import { type ProductAnalytics } from '@/types/product';

type Props = ProductAnalytics;

export default function ProductAnalytics({activeStock, lowStock, totalStock}:Props) {
  return (
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
              {totalStock}
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
              {activeStock}
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
              {lowStock}
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
