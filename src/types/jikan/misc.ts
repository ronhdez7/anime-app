export interface JikanAnimeDate {
  day: number | null;
  month: number | null;
  year: number | null;
}

export interface JikanReference {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface JikanLink {
  name: string;
  url: string;
}

export enum JikanAnimeType {
  TV = "TV",
  OVA = "OVA",
  Movie = "Movie",
  Special = "Special",
  ONA = "ONA",
  Music = "Music",
}

export enum Season {
  SRRING = "spring",
  SUMMER = "summer",
  FALL = "fall",
  WINTER = "winter",
}

export enum JikanRelationType {
  Adaptation = "Adaptation",
  Prequel = "Prequel",
  SideStory = "Side Story",
  Summary = "Summary",
}

export interface JikanAnimeRelation {
  relation: string;
  entry: JikanReference[];
}

export type JikanRating = "g" | "pg" | "pg13" | "r17" | "r" | "rx";

export interface JikanGenre {
  mal_id: number;
  name: string;
  url: string;
  count: number;
}

export type JikanAnimeSearchType =
  | "tv"
  | "movie"
  | "ova"
  | "special"
  | "ona"
  | "music"
  | "cm"
  | "pv"
  | "tv_special";

export type JikanAnimeStatus = "airing" | "complete" | "upcoming";

// prettier-ignore
export type JikanAnimeSearchOrder = "mal_id" | "title" | "start_date" | "end_date" | "episodes" | "score" | "scored_by" | "rank" | "popularity" | "members" | "favorites"

export interface JikanTopAnimeParams {
  // prettier-ignore
  type?: JikanAnimeSearchType;
  filter?: "airing" | "upcoming" | "bypopularity" | "favorite";
  rating?: JikanRating;
  sfw?: boolean;
  page?: number;
  limit?: number;
}

export interface JikanAnimeSearchParams
  extends Omit<JikanTopAnimeParams, "filter"> {
  unapproved?: boolean;
  q?: string;
  score?: number;
  min_score?: number;
  max_score?: number;
  status?: JikanAnimeStatus;
  genres?: number[];
  genres_exclude?: number[];
  order_by?: JikanAnimeSearchOrder;
  sort?: "desc" | "asc";
  producers?: number[];
  start_date?: string;
  end_date?: string;
}
