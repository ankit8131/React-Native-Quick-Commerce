import raw from "./categoryListing.json";

export interface ListingCategory {
  id: string;
  name: string;
  imageUrl: string;
}

export interface ListingSubcategory {
  id: string;
  imageUrl: string;
  displayText: string;
}

export interface ProductListing {
  fsn: string;
  productRank: number;
  listingId: string;
  name: string;
  displayName: string;
  displayAssetUrl: string;
  quantity: string;
  markerImageCallOut?: { callOut?: string } | null;
  markerTextCallOut?: { callOut?: string } | null;
  superCategory?: { id: string; name: string };
  category?: { id: string; name: string };
  subcategory?: { id: string; name: string };
  price: {
    mrp: number;
    oneTimePrice?: { memberPrice?: number; nonMemberPrice?: number };
    subscriptionPrice?: { memberPrice?: number };
  };
  inventory?: { inStock: boolean; remainingQuantity: number };
}

interface ListingComponent<T> {
  instanceId: string;
  name: string;
  componentData: T;
}

export interface CategoryListingResponse {
  body: {
    name: string;
    pageInstanceId: string;
    componentMap: Record<string, ListingComponent<unknown>>;
  };
}

export const categoryListingResponse = raw as unknown as CategoryListingResponse;

function findComponentData<T>(componentName: string): T | undefined {
  const component = Object.values(categoryListingResponse.body.componentMap).find(
    (c) => c.name === componentName,
  );
  return component?.componentData as T | undefined;
}

export function getListingCategory(): ListingCategory | undefined {
  return findComponentData<{ category: ListingCategory }>(
    "CategoryListingHeaderComponent",
  )?.category;
}

export function getListingSubcategories(): ListingSubcategory[] {
  return (
    findComponentData<{ subcategories: ListingSubcategory[] }>(
      "SubcategoryNavigationComponent",
    )?.subcategories ?? []
  );
}

export function getProductListings(): ProductListing[] {
  return (
    findComponentData<{ productListings: ProductListing[] }>("ProductListingComponent")
      ?.productListings ?? []
  );
}
