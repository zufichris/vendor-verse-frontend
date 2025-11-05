import { Card } from "@/components/ui/card"
import { Order, OrderItem } from "@/types/order.types"

export default function OrderItemsList({ order }: { order: Order }) {
  const {items} = order;

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <Card
          key={item.productId}
          className="p-4 bg-card border border-border hover:border-primary/50 transition-colors"
        >
          <div className="flex gap-4">
            {/* Product Image */}
            <div className="flex-shrink-0">
              <img
                src={item.imageUrl || "/placeholder.svg"}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg bg-secondary"
              />
            </div>

            {/* Product Details */}
            <div className="flex-grow min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-foreground truncate">{item.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">SKU: {item.sku}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-secondary/50 px-2 py-1 rounded">Qty: {item.quantity}</span>
                    {item.discount > 0 && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        -{item.discount.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Pricing */}
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-semibold text-foreground">{order.currency}{(item.quantity * item.price).toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">{order.currency}{item.price.toFixed(2)} each</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
