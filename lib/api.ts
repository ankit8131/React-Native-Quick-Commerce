import type { CategoryTab, Filter, Product } from "@/types/catalog";
import {
  getListingCategory,
  getListingSubcategories,
  getProductListings,
  type ProductListing,
} from "@/utils/categoryListingResponse";
import {
  getCategories,
  getSuperCategories,
  type SuperCategory,
} from "@/utils/superCategoriesResponse";

const SIMULATED_DELAY_MS = 500;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_DELAY_MS));
}

function slug(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toAssetUrl(url: string): string {
  const stripped = url.replace("/resolution/", "/");
  return /^https?:\/\//.test(stripped) ? stripped : `https://${stripped}`;
}

const LISTING_CATEGORY = getListingCategory();

function toProduct(listing: ProductListing): Product {
  const oneTime = listing.price.oneTimePrice ?? {};
  return {
    id: listing.fsn,
    name: listing.displayName || listing.name,
    description: listing.markerTextCallOut?.callOut ?? "",
    imageUrl: toAssetUrl(listing.displayAssetUrl),
    weight: listing.quantity,
    price: oneTime.memberPrice ?? oneTime.nonMemberPrice ?? listing.price.mrp,
    mrp: listing.price.mrp,
    badge: listing.markerImageCallOut?.callOut || undefined,
    tabId: LISTING_CATEGORY?.id ?? "",
    filterIds: listing.subcategory ? [slug(listing.subcategory.name)] : [],
  };
}

const PRODUCTS: Product[] = getProductListings().map(toProduct);

const SUBCATEGORIES: Filter[] = [
  { id: "all", name: "All" },
  ...getListingSubcategories().map((s) => ({
    id: slug(s.displayText),
    name: s.displayText,
  })),
];

export function fetchSuperCategories(): Promise<SuperCategory[]> {
  return delay(getSuperCategories());
}

export function fetchCategory(superCategoryId: string): Promise<CategoryTab[]> {
  const superCategory = getSuperCategories().find((s) => s.categoryId === superCategoryId);
  if (!superCategory) return Promise.resolve([]);
  const categories = getCategories(superCategory.categoryName).map((c) => ({
    id: c.categoryId,
    name: c.displayName,
  }));
  return Promise.resolve(categories);
}

// Assumption: every category loads the same subcategories + listings from
// categoryListing.json (we only have that one category's payload), so
// categoryId is accepted for the query key but not used to vary the result.
export function fetchSubcategory(categoryId: string): Promise<Filter[]> {
  void categoryId;
  return delay(SUBCATEGORIES);
}

export function fetchProducts(categoryId: string, subcategoryId: string): Promise<Product[]> {
  void categoryId;
  const products =
    subcategoryId === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.filterIds.includes(subcategoryId));
  return delay(products);
}

export function fetchProductById(id: string): Promise<Product | undefined> {
  return delay(PRODUCTS.find((p) => p.id === id));
}
