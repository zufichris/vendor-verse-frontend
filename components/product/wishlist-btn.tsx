import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Heart } from 'lucide-react'

interface Props{
    isWishlisted: boolean
    onWishlist:(state:boolean)=>void
}

export default function WishlistButton({isWishlisted, onWishlist}: Props) {
    const [done, setDone] = useState(isWishlisted)

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDone(prev => {
            onWishlist?.(!prev);
            return !prev
        })
    }


  return (
    <Button
        variant="secondary"
        size="icon"
        className="h-9 w-9 bg-primary-foreground/95 hover:bg-primary-foreground shadow-lg backdrop-blur-sm border border-gray-200"
        onClick={handleWishlist}
    >
        <Heart
            className={`h-4 w-4 transition-all duration-200 ${done ? "fill-red-500 text-red-500 scale-110" : "text-gray-600 hover:text-red-500"
                }`}
        />
    </Button>
  )
}
