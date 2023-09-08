export interface ProductType {
   title: string;
   slug: string;
   moreLove: boolean;
   id: string;
   price: number;
   oldPrice: number;
   desc: string;
   images: { img: string }[];
   totalSell: number;
   gallery: { thumb: string }[];
   condition: string;
   vendor: string;
   color: string;
   brand: string;
   category: string;
   featured: boolean;
   trending: boolean;
   discount: {
      banner: string;
      percentage: number;
      expireDate: Date | null;
      isActive: boolean;
   };
   variations: string[];
   weight: number;
   tags: string;
   sizes: string;
   stock: number;
   review: number;
   rating: number;
   ratingScore: number;
   created: string;
}