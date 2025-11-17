import { Api } from "@/utils";

export interface ValidCoupon {
    valid: boolean;
    discountRate: number;
    code: string
}


export async function getWelcomeCoupon() {
    try {
        const { data, success } = await Api.get<ValidCoupon>('/coupons/welcome')
        if (!success) {
            return null;
        }

        return data
    } catch (error) {
        return null
    }
}


export async function validateCoupon(code: string) {
    try {
        const { data } = await Api.get<ValidCoupon>(`/coupons/calidate?code=${code}`)
        return data
    } catch (error) {
        return null
    }
}