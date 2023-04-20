export interface Product {
  id: number,
  name: string,
  description: string,
  pictureUrl: string,
  price: number,
  company: string,
  category?: string,
  quantityRemains?: number
}

export interface ProductParams {
  orderBy: string;
  searchTerm?: string;
  categories: string[];
  companies: string[];
  pageNumber: number;
  pageSize: number;
}