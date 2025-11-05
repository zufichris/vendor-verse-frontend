'use client'

import React from 'react'
import { Button } from '../ui/button';
import { Share2 } from 'lucide-react';

interface Props{
    urlPath:string;
    title: string;
    text: string;
}

export default function ShareButton({text, title, urlPath}: Props) {
    const handleShare = async (e: React.MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()
            if (navigator.share) {
                try {
                    await navigator.share({
                        title,
                        text,
                        url: urlPath.replaceAll('//', '/'),
                    })
                } catch (err) {
                    console.log("Error sharing:", err)
                }
            } else {
                navigator.clipboard.writeText(`${window.location.origin}/${urlPath}`.replaceAll('//', '/'))
            }
        }
  return (
    <Button
        variant="secondary"
        size="icon"
        className="h-9 w-9 bg-primary-foreground/95 hover:bg-primary-foreground shadow-lg backdrop-blur-sm border border-gray-200"
        onClick={handleShare}
    >
        <Share2 className="h-4 w-4 text-gray-600 hover:text-green-600 transition-colors" />
    </Button>
  )
}
