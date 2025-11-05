import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Clock } from "lucide-react"
import { Order } from "@/types/order.types"


export default function OrderSummary({ order }: { order: Order }) {
  const paymentMethodLabels: Record<string, string> = {
    stripe: "Credit Card",
    paypal: "PayPal",
    cod: "Cash on Delivery",
    "bank-transfer": "Bank Transfer",
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-4">
      {/* Order Summary Card */}
      <Card className="p-6 bg-card border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Order Summary</h3>

        <div className="space-y-3 mb-4 pb-4 border-b border-border">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground font-medium">{order.currency}{order.subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="text-foreground font-medium">{order.currency}{order.shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax</span>
            <span className="text-foreground font-medium">{order.currency}{order.tax.toFixed(2)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Discount</span>
              <span className="text-green-600 font-medium">-{order.currency}{order.discount.toFixed(2)}</span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-base font-semibold text-foreground">Total</span>
          <span className="text-2xl font-bold text-foreground">{order.currency}{order.grandTotal.toFixed(2)}</span>
        </div>

        <Button className="w-full bg-transparent" variant="outline" disabled>
          {order.payment.status === 'pending' ? 'Payment Pending' : 'Payment Complete'}
        </Button>
      </Card>

      {/* Payment Details */}
      <Card className="p-6 bg-card border border-border">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Payment Method</h3>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Method</span>
            <span className="font-medium text-foreground">{paymentMethodLabels[order.payment.method]}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status</span>
            <span className={`font-medium ${order.payment.status === "paid" ? "text-green-600" : "text-amber-600"}`}>
              {order.payment.status.charAt(0).toUpperCase() + order.payment.status.slice(1)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Paid At</span>
            <span className="font-medium text-foreground">{order.payment?.paidAt ? formatDate(order.payment.paidAt) : 'N/A'}</span>
          </div>
        </div>
      </Card>

      {/* Delivery Estimate */}
      <Card className="p-6 bg-card border border-border">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Estimated Delivery</h3>
        </div>
        {/* <p className="text-2xl font-bold text-foreground mb-2">{formatDate(order.estimatedDelivery)}</p> */}
        <p className="text-xs text-muted-foreground">Ordered on {formatDate(order.createdAt)}</p>
      </Card>
    </div>
  )
}
