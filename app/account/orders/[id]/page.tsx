import { Download, MessageSquare, Undo } from "lucide-react"
import { Button } from "@/components/ui/button"
import OrderTimeline from "@/components/orders/order-timeline"
import OrderItemsList from "@/components/orders/order-items-list"
import OrderSummary from "@/components/orders/order-summary"
import ShippingInfo from "@/components/orders/shipping-info"
import { Order } from "@/types/order.types"
import { notFound } from "next/navigation"
import { getOrderByNumber } from "@/lib/actions/order"
import CancelOrderDialog from "@/components/orders/cancel-order-dialog"

interface Props{
    params: Promise<{id: string}>
}

export default async function OrderDetailsPage({ params }: Props) {
  const {id} = await params
  
  let order:Order|null = null

  try {
    const d = await getOrderByNumber(id)

    order = d.data;
  } catch (error) {
    console.log(error)
  }

  if (!order) {
    return notFound()
  }

  return (
    <main className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-foreground">Order Details</h1>
              <p className="text-sm text-muted-foreground mt-1">Order {order.orderNumber}</p>
            </div>
            <div className="flex gap-2">
                {
                    order.fulfillmentStatus === 'pending' && <CancelOrderDialog orderId={order.id} orderNumber={order.orderNumber} status={order.fulfillmentStatus} trigger={<Button variant="outline" size="sm">
                    <Undo className="w-4 h-4" />
                    Cancel
                  </Button>}/>
                }
                  
              <a href={'mailto:amahkudi@gmail.com'} target="_blank">
                <Button variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4" />
                    Contact
                  </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Status Timeline */}
            <OrderTimeline status={order.fulfillmentStatus} />

            {/* Items */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Order Items</h2>
              <OrderItemsList order={order} />
            </div>

            {/* Shipping Information */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Shipping Information</h2>
              <ShippingInfo
                address={order.shippingAddress}
                trackingNumber={order.orderNumber}
                carrier={'Local'}
              />
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <OrderSummary order={order} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
