import { AnimeData, AnimeTopParams, AnimeType, ApiPagination } from "@/types";
import {
  AnilistAnimeData,
  AnilistAnimeType,
  AnilistPageInfo,
  AnilistPagination,
  AnilistTopAnimeParams,
} from "@/types/anilist";

export function parseAnilistAnime(anime: AnilistAnimeData): AnimeData {
  return {
    id: anime.id,
    description: anime.description ?? "",
    title:
      anime.title?.english ?? anime.title?.romaji ?? anime.title?.romaji ?? "",
    titles: {
      en: anime.title?.english,
      jp: anime.title?.native,
    },
    images: {
      small: anime.coverImage?.medium ?? "",
      regular: anime.coverImage?.large ?? "",
      large: anime.coverImage?.extraLarge ?? "",
    },
    episodeCount: anime.episodes ?? 0,
    status: anime.status ?? "",
    trailer: {
      url: undefined,
      images: {},
    },
    type: anime.type ?? "",
    dates: {
      from: {
        day: anime.startDate?.day!,
        month: anime.startDate?.month!,
        year: anime.startDate?.year!,
      },
      to: anime.endDate!,
    },
  };
}

export function parseAnilistAnimeArray(animes: AnilistAnimeData[]) {
  return animes.map((anime) => parseAnilistAnime(anime));
}

export function parseAnilistPagination(
  pageInfo?: AnilistPageInfo
): ApiPagination {
  return {
    current_page: pageInfo?.currentPage ?? 1,
    has_next_page: pageInfo?.hasNextPage ?? false,
    items: {
      count: pageInfo?.total ?? 0,
      per_page: pageInfo?.perPage ?? 0,
      total: pageInfo?.total ?? 0,
    },
    last_visible_page: pageInfo?.lastPage ?? 0,
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
