'use server'

import { Api } from "@/utils"

export const submitContactUs = async (data: Record<string, string>) => {
    const res = await Api.post('/contact-us', data)

    return res
}