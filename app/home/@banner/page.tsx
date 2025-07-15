import { Banners } from "./component";
import { Api } from "@/utils";

export interface Banner {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    cta: string;
    link: string;
    color?: string;
}

export default async function() {
    const res = await Api.get<Banner[]>("/product/banners");
    if (!res.success) {
        return (
            <div className="h-20 mt-5  text-destructive flex flex-col items-center justify-center">
                Failed to load banners
            </div>
        );
    }
    return <Banners banners={res.data} />;
}
