import { Banners } from "./component";
import { Api, QueryResponse } from "@/utils";

export interface Banner {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    cta: string;
    link: string;
    color?: string;
    video?: string
}

export default async function() {
    const res = await Api.get<QueryResponse<Banner>>("/products/banners");
    if (!res.success) {
        return (
            <div className="h-20 mt-5  text-destructive flex flex-col items-center justify-center">
                Failed to load banners
            </div>
        );
    }
    if(!res.data.data.length){
        return <div></div>
    }
    return <Banners banners={res.data.data} />;
}
