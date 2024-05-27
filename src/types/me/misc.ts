export type AnimeDate = {
  day?: number;
  month?: number;
  year?: number;
};

export enum AnimeStatus {
  AIRING,
  FINISHED,
  UPCOMING,
}
export enum AnimeSearchOrder {
  ID,
  TITLE,
  START_DATE,
  END_DATE,
  EPISODE_COUNT,
  SCORE,
  RANK,
  POPULARITY,
  FAVORITES,
}
export enum AnimeType {
  TV,
  MOVIE,
  SPECIAL,
  OVA,
  ONA,
  MUSIC,
}

export type AnimeGenreType = "GENRE" | "EXPLICIT" | "THEME" | "DEMOGRAPHIC";
export interface AnimeGenre {
  id: number;
  name: string;
  total: number;
  type: AnimeGenreType;
}

export interface AnimeTopParams {
  page?: number;
  limit?: number;
  adult?: boolean;
  type?: AnimeType;
}

export interface AnimeSearchParams extends AnimeTopParams {
  query?: string;
  score?: number;
  minScore?: number;
  maxScore?: number;
  status?: AnimeStatus;
  genres?: string[];
  genresExclude?: string[];
  startDate?: AnimeDate;
  endDate?: AnimeDate;
  orderBy?: AnimeSearchOrder;
  sort?: "asc" | "desc";
}
