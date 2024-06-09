export type AnilistGenre = string;
export type AnilistId = number;

export type AnilistFuzzyDate = {
  day: number | null;
  month: number | null;
  year: number | null;
};

export enum AnilistAnimeStatus {
  FINISHED,
  RELEASING,
  NOT_YET_RELEASED,
  CANCELLED,
  HIATUS,
}

export enum AnilistAnimeSort {
  ID,
  ID_DESC,
  TITLE_ROMAJI,
  TITLE_ROMAJI_DESC,
  TITLE_ENGLISH,
  TITLE_ENGLISH_DESC,
  TITLE_NATIVE,
  TITLE_NATIVE_DESC,
  TYPE,
  TYPE_DESC,
  FORMAT,
  FORMAT_DESC,
  START_DATE,
  START_DATE_DESC,
  END_DATE,
  END_DATE_DESC,
  SCORE,
  SCORE_DESC,
  POPULARITY,
  POPULARITY_DESC,
  TRENDING,
  TRENDING_DESC,
  EPISODES,
  EPISODES_DESC,
  DURATION,
  DURATION_DESC,
  STATUS,
  STATUS_DESC,
  CHAPTERS,
  CHAPTERS_DESC,
  VOLUMES,
  VOLUMES_DESC,
  UPDATED_AT,
  UPDATED_AT_DESC,
  SEARCH_MATCH,
  FAVOURITES,
  FAVOURITES_DESC,
}

export enum AnilistAnimeType {
  TV,
  TV_SHORT,
  MOVIE,
  SPECIAL,
  OVA,
  ONA,
  MUSIC,
  MANGA,
  NOVEL,
  ONE_SHOT,
}

export interface AnilistTopAnimeParams {
  page?: number;
  perPage?: number;
  isAdult?: boolean;
  type?: AnilistAnimeType;
}

export interface AnilistAnimeSearchParams extends AnilistTopAnimeParams {
  search?: string;
  averageScore?: number;
  // min score
  averageScore_greater?: number;
  // max score
  averageScore_lesser?: number;
  status?: AnilistAnimeStatus;
  genre_in?: string[];
  genre_not_in?: string[];
  // orderBy and sort combined
  sort?: AnilistAnimeSort[];
  startDate?: number;
  endDate?: number;
  id_in?: number[];
}
