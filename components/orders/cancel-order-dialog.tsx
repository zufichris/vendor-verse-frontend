"use client"

import { ReactNode, useState } from "react"
import { AlertCircle, CheckCircle2, Clock, RefreshCw } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { cancelMyOrder } from "@/lib/actions/order"
import { toast } from "sonner"
import { Input } from "../ui/input"
import { useRouter } from "next/navigation"

interface CancelOrderDialogProps {
  orderId: string
  orderNumber: string
  status: string
  defaultOpen?: boolean
  trigger?: ReactNode
}

export default function CancelOrderDialog({
  orderId,
  orderNumber,
  status,
  defaultOpen = false,
  trigger
}: CancelOrderDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [open, setOpen] = useState(defaultOpen)
  const [reason, setReason] = useState('')

  const router = useRouter()

  const canCancel = status === "pending";

  const handleCancel = async () => {
    if (!reason.length) {
        toast.error('Please add a cancellation reason')
        return
    }
    setIsLoading(true)
    try {
        const res = await cancelMyOrder(orderId, reason)
      if (res.success) {
        toast.success('Order cancelled successfully')
        router.refresh()
        setOpen(false)
        setReason('')

      }else{
        toast.error(res?.message || 'Failed to cancelled order')
      }

      setIsConfirmed(false)
    } catch (error) {
      console.error("Failed to cancel order:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
            {
                trigger ? trigger : <Button variant={'outline'}>Cancel</Button>
            }
        </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-amber-500" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl">Cancel Order?</DialogTitle>
              <DialogDescription className="mt-1 text-base">
                You're about to cancel order <span className="font-semibold text-foreground">{orderNumber}</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Refund Information */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">What happens next:</h3>
            <div className="space-y-2">
              <div className="flex gap-3">
                <RefreshCw className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Full Refund</p>
                  <p className="text-xs text-muted-foreground">
                    Your payment (if any) will be refunded to your original payment method
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Processing Time</p>
                  <p className="text-xs text-muted-foreground">Refunds typically appear within 3-5 business days</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Confirmation Email</p>
                  <p className="text-xs text-muted-foreground">
                    You'll receive a cancellation confirmation at your email
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Status Check */}
          {!canCancel && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-xs text-amber-900">
                <span className="font-semibold">Note:</span> This order has already{" "}
                {status === "shipped" ? "shipped" : status === 'delivered' ? "been delivered" : status === 'processing' ? 'been processed' : status} and cannot be canceled. Please contact support to
                initiate a return.
              </p>
            </div>
          )}

          {/* Confirmation Checkbox */}
          {canCancel && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="confirm-cancel"
                  checked={isConfirmed}
                  onCheckedChange={(checked) => setIsConfirmed(checked as boolean)}
                  className="mt-1"
                />
                <label htmlFor="confirm-cancel" className="text-sm text-foreground cursor-pointer select-none">
                  I understand that this action will cancel my order and process a refund
                </label>
              </div>
            </div>
          )}
        </div>
        
        <Input onChange={(e)=> setReason(e.target.value)} value={reason} placeholder="Enter cancelation reason" />

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false)
              setIsConfirmed(false)
            }}
            disabled={isLoading}
          >
            Keep Order
          </Button>
          <Button
            variant="destructive"
            onClick={handleCancel}
            disabled={!isConfirmed || isLoading || !canCancel || !reason?.trim().length}
            // loading={isLoading}
          >
            {isLoading ? "Canceling..." : "Cancel Order"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
