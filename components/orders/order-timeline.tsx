import type React from "react"

import { Package, Truck, CheckCircle2, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "returned"

const timeline: Record<OrderStatus, { steps: string[]; icon: React.ReactNode }> = {
  pending: {
    steps: ["Order Placed", "Processing", "Shipped", "Delivered"],
    icon: <Clock className="w-5 h-5" />,
  },
  processing: {
    steps: ["Order Placed", "Processing", "Shipped", "Delivered"],
    icon: <Package className="w-5 h-5" />,
  },
  shipped: {
    steps: ["Order Placed", "Processing", "Shipped", "Delivered"],
    icon: <Truck className="w-5 h-5" />,
  },
  delivered: {
    steps: ["Order Placed", "Processing", "Shipped", "Delivered"],
    icon: <CheckCircle2 className="w-5 h-5" />,
  },
  cancelled: {
    steps: ["Order Placed", "Cancelled"],
    icon: <Package className="w-5 h-5" />,
  },
  returned: {
    steps: ["Order Placed", "Processing", "Shipped", "Returned"],
    icon: <Package className="w-5 h-5" />,
  },
}

const statusStepMap: Record<OrderStatus, number> = {
  pending: 0,
  processing: 1,
  shipped: 2,
  delivered: 3,
  cancelled: 1,
  returned: 3,
}

export default function OrderTimeline({ status }: { status: OrderStatus }) {
  const steps = timeline[status].steps
  const currentStep = statusStepMap[status]

  return (
    <Card className="p-6 bg-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Order Status</h3>
        <div className="flex items-center gap-2 px-3 py-1 bg-secondary/50 rounded-full">
          {status === "delivered" && <CheckCircle2 className="w-4 h-4 text-green-600" />}
          {status === "shipped" && <Truck className="w-4 h-4 text-blue-600" />}
          {status === "processing" && <Package className="w-4 h-4 text-amber-600" />}
          {status === "pending" && <Clock className="w-4 h-4 text-slate-600" />}
          <span className="text-sm font-medium text-foreground capitalize">{status}</span>
        </div>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => {
          const isCompleted = index <= currentStep
          const isActive = index === currentStep
          return (
            <div key={step} className="flex gap-4">
              {/* Timeline Dot */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                    isCompleted
                      ? "bg-green-600 border-green-600"
                      : isActive
                        ? "bg-blue-600 border-blue-600"
                        : "bg-background border-border"
                  }`}
                >
                  {isCompleted && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>
                {index !== steps.length - 1 && (
                  <div className={`w-0.5 h-12 my-2 transition-colors ${isCompleted ? "bg-green-600" : "bg-border"}`} />
                )}
              </div>

              {/* Timeline Content */}
              <div className="pb-4">
                <p
                  className={`text-sm font-medium ${isCompleted || isActive ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {step}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {isCompleted ? "Completed" : isActive ? "In progress" : "Pending"}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
