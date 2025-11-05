'use client'

import { useAuthStore } from '@/lib/stores/auth'
import React, { ReactNode, useEffect, useState } from 'react'
import { Button } from '../tiptap-ui-primitive/button'
import { AuthGate } from '../auth/auth-gate'
import { usePathname, useRouter } from 'next/navigation'

export default function CheckoutProvider({children}:{children:ReactNode}) {
    const {user} = useAuthStore()
    const router = useRouter()
    const pathname = usePathname()

    const [anonymous, setAnonymous] = useState(false)

    useEffect(()=>{
      router.refresh()
    }, []) // Refresh the page on first load in cased user is from logging in.

    if (!user && !anonymous) {
        return <AuthGate
            onContinueAnonymous={()=>setAnonymous(true)}
            description='Sign in to checkout or continue as guest'
            title='Order Management'
            onLogin={()=> router.push(`/auth?callbackUrl=${pathname}`)}
        />
    }

  return (
    <>{children}</>
  )
}
