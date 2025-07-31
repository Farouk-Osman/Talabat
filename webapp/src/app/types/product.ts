export interface Product {
  id?: string;
  name: string;
    shortDescription: string;
    description: string;
    price: number;
    discount: number;
    images: string[];
    category: { _id: string, name: string };
    brand : { _id: string, name: string };
    isFeatured: boolean;
    isNewProduct: boolean;
}

