import { Card } from "@/components/ui/card"
import { MapPin, Truck } from "lucide-react"

interface Address {
  firstName: string
  lastName: string
  email: string
  phone: string
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}

interface ShippingInfoProps {
  address: Address
  trackingNumber?: string
  carrier?: string
}

export default function ShippingInfo({ address, trackingNumber, carrier }: ShippingInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Shipping Address */}
      <Card className="p-6 bg-card border border-border">
        <div className="flex items-center gap-3 mb-4">
          <MapPin className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Shipping Address</h3>
        </div>
        <div className="space-y-1 text-sm text-foreground">
          <p className="font-medium">
            {address.firstName} {address.lastName}
          </p>
          <p className="text-muted-foreground">{address.street}</p>
          <p className="text-muted-foreground">
            {address.city}, {address.state} {address.postalCode}
          </p>
          <p className="text-muted-foreground">{address.country}</p>
          <div className="pt-3 border-t border-border mt-3">
            <p className="text-xs text-muted-foreground">Email</p>
            <p className="text-sm font-medium text-foreground">{address.email}</p>
            <p className="text-xs text-muted-foreground mt-2">Phone</p>
            <p className="text-sm font-medium text-foreground">{address.phone}</p>
          </div>
        </div>
      </Card>

      {/* Tracking Information */}
      {trackingNumber && (
        <Card className="p-6 bg-card border border-border">
          <div className="flex items-center gap-3 mb-4">
            <Truck className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Tracking Information</h3>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Tracking Number</p>
            <p className="text-lg font-mono font-bold text-foreground mb-4">{trackingNumber}</p>
            <p className="text-xs text-muted-foreground">Carrier</p>
            <p className="text-sm font-medium text-foreground mb-4">{carrier}</p>
            <button className="text-sm text-primary hover:underline font-medium">Track Package →</button>
          </div>
        </Card>
      )}
    </div>
  )
}
