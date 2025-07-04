import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function CategoriesLoading() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="  mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        {/* Trending Categories Skeleton */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-8 w-48" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-[4/3] w-full" />
              </Card>
            ))}
          </div>
        </div>

        {/* All Categories Skeleton */}
        <div>
          <Skeleton className="h-8 w-32 mb-8" />

          <div className="grid gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-3 gap-0">
                    <Skeleton className="aspect-[4/3] md:aspect-auto" />
                    <div className="p-6 md:col-span-2">
                      <div className="flex flex-col h-full">
                        <div className="flex-1">
                          <div className="mb-4">
                            <Skeleton className="h-8 w-48 mb-2" />
                            <Skeleton className="h-4 w-full mb-4" />
                            <Skeleton className="h-4 w-32" />
                          </div>

                          <div className="mb-6">
                            <Skeleton className="h-5 w-40 mb-3" />
                            <div className="flex flex-wrap gap-2">
                              {[1, 2, 3, 4, 5].map((j) => (
                                <Skeleton key={j} className="h-6 w-20" />
                              ))}
                            </div>
                          </div>

                          <div className="mb-6">
                            <Skeleton className="h-5 w-32 mb-3" />
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              {[1, 2, 3].map((j) => (
                                <div key={j}>
                                  <Skeleton className="h-4 w-24 mb-1" />
                                  <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-12" />
                                    <Skeleton className="h-3 w-8" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Skeleton className="h-10 flex-1" />
                          <Skeleton className="h-10 w-24" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Category Stats Skeleton */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center p-6 bg-white rounded-lg shadow-sm">
              <Skeleton className="h-8 w-12 mx-auto mb-2" />
              <Skeleton className="h-4 w-16 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
