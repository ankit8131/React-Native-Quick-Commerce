export interface CategoryTab {
  id: string;
  name: string;
}

export interface Filter {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  weight: string;
  price: number;
  mrp: number;
  badge?: string;
  tabId: string;
  filterIds: string[];
}
