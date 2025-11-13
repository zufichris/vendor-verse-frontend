'use server'

import { Api } from "@/utils"

export const subscribeNewsLetter = async (dto: { firstName: string, lastName: string, email: string }) => {
    const res = await Api.post(`/newsletters`, dto)

    return res
}