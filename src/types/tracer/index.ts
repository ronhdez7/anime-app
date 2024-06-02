export interface TracerQuota {
  id: string;
  priority: number;
  concurrency: number;
  quota: number;
  quotaUsed: number;
}

export enum ImageUploadType {
  FILE,
  URL,
}

interface TracerFileSearch {
  type: ImageUploadType.FILE;
  file: FormData;
}

interface TracerUrlSearch {
  type: ImageUploadType.URL;
  url: string;
}

export type TracerSearchType = TracerFileSearch | TracerUrlSearch;

export interface TracerSearchParams {
  cutBorders: boolean;
}

export type TracerSearchOptions = TracerSearchType & TracerSearchParams;

export interface TracerSearchResponse {
  frameCount: number;
  error?: string;
  result?: TracerSearchResult[];
}

export interface TracerSearchResult {
  anilist: number;
  filename: string;
  episode: number | null;
  from: number;
  to: number;
  similarity: number;
  video: string;
  image: string;
}
