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
  /** Display weight, e.g. "500 g", "1 Kg". */
  weight: string;
  /** Selling price in rupees. */
  price: number;
  /** Strikethrough MRP in rupees. */
  mrp: number;
  /** Optional badge shown on the card, e.g. "1.5× Bigger". */
  badge?: string;
  tabId: string;
  /** Filter chips this product belongs to (excludes the implicit "all"). */
  filterIds: string[];
}
