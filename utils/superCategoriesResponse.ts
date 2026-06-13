import raw from "./super.json";

export interface SuperCategory {
  categoryId: string;
  categoryName: string;
  displayAssetUrl: string;
  rank: number;
}

export interface CategoryNode {
  categoryId: string;
  displayName: string;
  displayAssetUrl: string;
  rank: number;
}

interface RawCategoryNode {
  categoryId: string;
  categoryName?: string;
  displayName?: string;
  displayAssetUrl: string;
  rank: number;
  categoryType: string;
}

interface RawComponent {
  name: string;
  data: { title?: string };
  componentData: RawCategoryNode[];
}

interface SuperCategoriesResponse {
  body: { pageResponseDto: { componentMap: Record<string, RawComponent> } };
}

const response = raw as unknown as SuperCategoriesResponse;
const components = Object.values(response.body.pageResponseDto.componentMap);

function withScheme(url: string): string {
  return /^https?:\/\//.test(url) ? url : `https://${url}`;
}

export function getSuperCategories(): SuperCategory[] {
  const [first] = components;
  return (first?.componentData ?? [])
    .filter((c) => c.categoryName)
    .map((c) => ({
      categoryId: c.categoryId,
      categoryName: c.categoryName as string,
      displayAssetUrl: withScheme(c.displayAssetUrl),
      rank: c.rank,
    }));
}

export function getCategories(superCategoryName: string): CategoryNode[] {
  const sublist = components.find((c) => c.data?.title === superCategoryName);
  return (sublist?.componentData ?? [])
    .filter((c) => c.displayName)
    .map((c) => ({
      categoryId: c.categoryId,
      displayName: c.displayName as string,
      displayAssetUrl: withScheme(c.displayAssetUrl),
      rank: c.rank,
    }));
}
