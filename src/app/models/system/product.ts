// src/models/system/product.ts

export interface IProduct {
  商品編號: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}

export type PartialProduct = Partial<IProduct>;
