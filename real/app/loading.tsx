import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-black mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-black mb-2">Loading...</h2>
        <p className="text-gray-600">Please wait while we load the content</p>
      </div>
    </div>
  )
}
