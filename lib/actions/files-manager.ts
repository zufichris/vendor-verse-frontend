import { Api } from "@/utils"
import { getAuthToken } from "./auth"
import axios from "axios"

export const uploadFile = async (formData: FormData, signal?: AbortSignal) => {
    const token = await getAuthToken()

    const headers = token ? {
        Authorization: `Bearer ${token}`
    } : {}

    const { data } = await axios.post<{ data: string | string[] }>(`${Api.baseUrl}/files-manager/upload`, formData, {
        signal: signal,
        headers
    });

    const fileUrl = Array.isArray(data.data) ? data.data[0] : data.data;

    return fileUrl;
}