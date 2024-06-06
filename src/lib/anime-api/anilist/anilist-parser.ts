import {
  AnimeData,
  AnimeDate,
  AnimeSearchOrder,
  AnimeSearchParams,
  AnimeStatus,
  AnimeTopParams,
  AnimeType,
  ApiPagination,
} from "@/types";
import {
  AnilistAnimeData,
  AnilistAnimeSearchParams,
  AnilistAnimeSort,
  AnilistAnimeStatus,
  AnilistAnimeType,
  AnilistFuzzyDate,
  AnilistPageInfo,
  AnilistTopAnimeParams,
} from "@/types/anilist";

export function parseAnilistAnime(anime: AnilistAnimeData): AnimeData {
  return {
    id: anime.id,
    malId: anime.idMal,
    anilistId: anime.id,
    title:
      anime.title?.english ?? anime.title?.romaji ?? anime.title?.romaji ?? "",
    titles: {
      en: anime.title?.english ?? null,
      jp: anime.title?.romaji ?? null,
    },
    images: {
      small: anime.coverImage?.medium ?? "",
      regular: anime.coverImage?.large ?? "",
      large: anime.coverImage?.extraLarge ?? "",
    },
    trailer: {
      url: null,
      images: null,
    },
    type: anime.type ?? "",
    episodeCount: anime.episodes ?? 0,
    status: anime.status ?? "",
    rating: null,
    description: anime.description ?? "",
    dates: {
      from: parseAnilistFuzzyDate(anime.startDate),
      to: parseAnilistFuzzyDate(anime.endDate),
    },
  };
}

export function parseAnilistFuzzyDate(
  date: AnilistFuzzyDate | null
): AnimeDate {
  return {
    day: date?.day ?? null,
    month: date?.month ?? null,
    year: date?.year ?? null,
  };
}

export function parseAnilistAnimeArray(animes: AnilistAnimeData[]) {
  return animes.map((anime) => parseAnilistAnime(anime));
}

export function parseAnilistPagination(
  pageInfo: AnilistPageInfo | null
): ApiPagination {
  return {
    currentPage: pageInfo?.currentPage ?? null,
    hasNextPage: pageInfo?.hasNextPage ?? false,
    items: {
      count: pageInfo?.total ?? null,
      perPage: pageInfo?.perPage ?? null,
      total: pageInfo?.total ?? null,
    },
    lastPage: pageInfo?.lastPage ?? null,
  };
}

export function parseTopAnimeParams(
  params: AnimeTopParams
): AnilistTopAnimeParams {
  return {
    isAdult: params.adult,
    page: params.page,
    perPage: params.limit,
    type: parseAnimeType(params.type),
  };
}

export function parseAnimeType(type?: AnimeType): AnilistAnimeType | undefined {
  switch (type) {
    case AnimeType.MOVIE:
      return AnilistAnimeType.MOVIE;
    case AnimeType.MUSIC:
      return AnilistAnimeType.MUSIC;
    case AnimeType.ONA:
      return AnilistAnimeType.ONA;
    case AnimeType.OVA:
      return AnilistAnimeType.OVA;
    case AnimeType.SPECIAL:
      return AnilistAnimeType.SPECIAL;
    case AnimeType.TV:
      return AnilistAnimeType.TV;
  }

  return;
}

export function parseAnimeSearchParams(
  params: AnimeSearchParams
): AnilistAnimeSearchParams {
  return {
    isAdult: params.adult,
    page: params.page,
    perPage: params.limit,
    type: parseAnimeType(params.type),
    averageScore: params.score,
    search: params.query,
    startDate: parseDateToFuzzyInt(params.startDate),
    endDate: parseDateToFuzzyInt(params.endDate),
    status: parseAnimeStatus(params.status),
    genre_in: params.genres,
    genre_not_in: params.genresExclude,
    sort: insideArray(parseAnimeSort(params.orderBy, params.sort)),
  };
}

export function parseDateToFuzzyInt(date?: AnimeDate): number {
  return date
    ? (date.year ?? 0) * 10000 + (date.month ?? 0) * 100 + (date.day ?? 0)
    : 0;
}

function insideArray<T>(val: T): any {
  return val !== undefined ? [val] : undefined;
}

function parseAnimeStatus(
  status?: AnimeStatus
): AnilistAnimeStatus | undefined {
  switch (status) {
    case AnimeStatus.AIRING:
      return AnilistAnimeStatus.RELEASING;
    case AnimeStatus.FINISHED:
      return AnilistAnimeStatus.FINISHED;
    case AnimeStatus.UPCOMING:
      return AnilistAnimeStatus.NOT_YET_RELEASED;
  }

  return;
}

function parseAnimeSort(
  orderBy?: AnimeSearchOrder,
  sort?: "asc" | "desc"
): AnilistAnimeSort | undefined {
  switch (sort) {
    case "desc":
      switch (orderBy) {
        case AnimeSearchOrder.TITLE:
          return AnilistAnimeSort.TITLE_ROMAJI_DESC;
        case AnimeSearchOrder.START_DATE:
          return AnilistAnimeSort.START_DATE_DESC;
        case AnimeSearchOrder.END_DATE:
          return AnilistAnimeSort.END_DATE_DESC;
        case AnimeSearchOrder.SCORE:
          return AnilistAnimeSort.SCORE_DESC;
        case AnimeSearchOrder.POPULARITY:
          return AnilistAnimeSort.POPULARITY_DESC;
        case AnimeSearchOrder.RANK:
          return AnilistAnimeSort.TRENDING_DESC;
        case AnimeSearchOrder.EPISODE_COUNT:
          return AnilistAnimeSort.EPISODES_DESC;
        case AnimeSearchOrder.FAVORITES:
          return AnilistAnimeSort.FAVOURITES_DESC;
      }
      break;
    default:
      switch (orderBy) {
        case AnimeSearchOrder.TITLE:
          return AnilistAnimeSort.TITLE_ROMAJI;
        case AnimeSearchOrder.START_DATE:
          return AnilistAnimeSort.START_DATE;
        case AnimeSearchOrder.END_DATE:
          return AnilistAnimeSort.END_DATE;
        case AnimeSearchOrder.SCORE:
          return AnilistAnimeSort.SCORE;
        case AnimeSearchOrder.POPULARITY:
          return AnilistAnimeSort.POPULARITY;
        case AnimeSearchOrder.RANK:
          return AnilistAnimeSort.TRENDING;
        case AnimeSearchOrder.EPISODE_COUNT:
          return AnilistAnimeSort.EPISODES;
        case AnimeSearchOrder.FAVORITES:
          return AnilistAnimeSort.FAVOURITES;
      }
  }

  return undefined;
}
