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
    slug?: string
    createdAt: string
    updatedAt?: string
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

//     const b:(Omit<Banner, 'id'> & {id: string, slug: string})[] = [
//   {
//     title: 'Performance Leggings',
//     subtitle: 'move with confidence',
//     slug: 'performance-leggings',
//     description: 'High-waisted, squat-proof leggings engineered for maximum comfort and support during any workout.',
//     cta: 'Shop Leggings',
//     image: '/banners/banner11.png',
//     link: '/shop?category=leggins',
//     createdAt: '2025-07-17T06:28:33.005Z',
//     updatedAt: '2025-11-10T20:48:34.492Z',
//     color: '',
//     id: '68789810a4fe364b86137f05'
//   },
//   {
//     title: 'Athletic Jumpsuits',
//     subtitle: 'all-in-one activewear',
//     slug: 'athletic-jumpsuits',
//     description: 'Versatile jumpsuits that transition seamlessly from studio to street with moisture-wicking fabric.',
//     cta: 'Explore Jumpsuits',
//     image: '/banners/banner12.png',
//     link: '/shop?category=jumpsuits',
//     createdAt: '2025-07-17T06:28:33.006Z',
//     updatedAt: '2025-11-10T20:49:14.853Z',
//     color: '',
//     id: '68789810a4fe364b86137f06'
//   },
//   {
//     title: 'Sports Bras',
//     subtitle: 'ultimate support',
//     slug: 'sports-bras',
//     description: 'High-impact sports bras designed with breathable fabric and supportive structure for every workout intensity.',
//     cta: 'Shop Bras',
//     image: '/banners/banner13.png',
//     link: '/shop?category=bras',
//     createdAt: '2025-07-17T06:28:33.007Z',
//     updatedAt: '2025-11-10T20:48:06.715Z',
//     color: '',
//     id: '68789810a4fe364b86137f08'
//   },
//   {
//     title: 'Training Jackets',
//     subtitle: 'layer up in style',
//     slug: 'training-jackets',
//     description: 'Lightweight, resistant jackets perfect for warm-ups, cool-downs, and everything in between.',
//     cta: 'Shop Jackets',
//     image: '',
//     color: '#fff',
//     link: '/shop?category=jackets',
//     video: 'https://pub-17efedec55164e89bd4ffc8eb8674e04.r2.dev/public/banner4.mp4',
//     createdAt: '2025-11-10T22:33:47.701Z',
//     updatedAt: '2025-11-10T22:33:47.701Z',
//     id: '6912684b894fe6cfd87207a0'
//   }
// ]

    console.log(res.data.data)
    return <Banners banners={res.data.data} />;
}
