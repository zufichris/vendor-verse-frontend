'use client'

import MovementModal from '@/app/about/movement-dialog'
import React, { useEffect, useState } from 'react'

export default function MovementBanner() {
    const [mounted, setMounted] = useState(false)
    const [shouldShowModal, setShouldShowModal] = useState(false)

    useEffect(() => {
        setMounted(true)
        
        const hasShownModal = localStorage.getItem('movementModal')
        if (!hasShownModal) {
            localStorage.setItem('movementModal', 'true')
            setShouldShowModal(true)
        }
    }, [])

    if (!mounted) {
        return null
    }

    if (!shouldShowModal) {
        return null
    }


  return (
    <MovementModal defaultOpen={true} />
  )
}
