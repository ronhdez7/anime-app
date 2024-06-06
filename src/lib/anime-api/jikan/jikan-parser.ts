import {
  AnimeData,
  AnimeDate,
  AnimeGenre,
  AnimeGenreType,
  AnimeSearchOrder,
  AnimeSearchParams,
  AnimeStatus,
  AnimeTopParams,
  AnimeType,
  ApiError,
  ApiPagination,
  EpisodeData,
} from "@/types";
import {
  JikanAnimeData,
  JikanAnimeSearchOrder,
  JikanAnimeSearchParams,
  JikanAnimeSearchType,
  JikanAnimeStatus,
  JikanEpisodeData,
  JikanError,
  JikanGenre,
  JikanPagination,
  JikanTopAnimeParams,
} from "@/types/jikan";

export function parseJikanError(error: JikanError): ApiError {
  return error;
}

export function parseJikanAnime(anime: JikanAnimeData): AnimeData {
  return {
    id: anime.mal_id,
    malId: anime.mal_id,
    anilistId: null,
    title: anime.title ?? anime.title_english ?? anime.title_japanese,
    titles: {
      en: anime.title_english,
      jp: anime.title,
    },
    images: {
      small: anime.images.webp.small_image_url,
      regular: anime.images.webp.image_url,
      large: anime.images.webp.large_image_url,
    },
    trailer: {
      url: anime.trailer.url,
      images: anime.trailer.images,
    },
    type: anime.type,
    episodeCount: anime.episodes ?? 0,
    status: anime.status,
    rating: anime.rating?.trim().split(" ")[0] ?? null,
    description: anime.synopsis,
    dates: {
      from: {
        ...anime.aired.prop.from,
        year: anime.aired.prop.from.year ?? anime.year,
      },
      to: anime.aired.prop.to,
    },
  };
}

export function parseJikanAnimeArray(animes: JikanAnimeData[]) {
  return animes.map((anime) => parseJikanAnime(anime));
}

export function parseJikanEpisode(
  episode: JikanEpisodeData,
  animeId?: number,
  episodeNumber?: number
): EpisodeData {
  const date = episode.aired ? new Date(episode.aired) : null;

  return {
    id: episode.mal_id,
    number: episodeNumber ?? episode.mal_id,
    animeId: Number(animeId),
    title:
      episode.title ??
      episode.title_japanese ??
      episode.title_romanji ??
      `Episode ${episode.mal_id}`,
    filler: episode.filler,
    recap: episode.recap,
    aired: date
      ? {
          day: date.getDate(),
          month: date.getMonth(),
          year: date.getFullYear(),
        }
      : { day: null, month: null, year: null },
  };
}

export function parseJikanEpisodeArray(
  episodes: JikanEpisodeData[],
  animeId?: number
) {
  return episodes.map((episode, idx) =>
    parseJikanEpisode(episode, animeId, idx)
  );
}

export function parseJikanGenre(
  genre: JikanGenre,
  type: AnimeGenreType
): AnimeGenre {
  return {
    id: genre.mal_id,
    name: genre.name,
    total: genre.count,
    type,
  };
}

const genreIds = {
  genres: [1, 2, 5, 46, 28, 4, 8, 10, 26, 47, 14, 7, 22, 24, 36, 30, 37, 41],
  explicit: [9, 49, 12],
  themes: [
    50, 51, 52, 53, 54, 81, 55, 39, 56, 57, 58, 35, 59, 13, 60, 61, 62, 63, 64,
    65, 66, 17, 18, 67, 38, 19, 6, 68, 69, 20, 70, 71, 40, 3, 72, 73, 74, 21,
    23, 75, 29, 11, 31, 76, 77, 78, 32, 79, 80, 48,
  ],
  demographics: [43, 15, 42, 25, 27],
};
export function parseJikanGenreArray(genres: JikanGenre[]): AnimeGenre[] {
  return genres
    .map((genre) => {
      if (genreIds.explicit.includes(Number(genre.mal_id))) {
        return parseJikanGenre(genre, AnimeGenreType.EXPLICIT);
      } else if (genreIds.themes.includes(Number(genre.mal_id))) {
        return parseJikanGenre(genre, AnimeGenreType.THEME);
      } else if (genreIds.demographics.includes(Number(genre.mal_id))) {
        return parseJikanGenre(genre, AnimeGenreType.DEMOGRAPHIC);
      }

      return parseJikanGenre(genre, AnimeGenreType.GENRE);
    })
    .filter(Boolean) as any;
}

export function parseTopAnimeParams(
  params: AnimeTopParams
): JikanTopAnimeParams {
  return {
    limit: params.limit,
    page: params.page,
    sfw: !params.adult,
    type: parseAnimeType(params.type),
  };
}

export function parseAnimeType(
  type?: AnimeType
): JikanAnimeSearchType | undefined {
  switch (type) {
    case AnimeType.MOVIE:
      return "movie";
    case AnimeType.TV:
      return "tv";
    case AnimeType.MUSIC:
      return "music";
    case AnimeType.ONA:
      return "ona";
    case AnimeType.OVA:
      return "ova";
    case AnimeType.SPECIAL:
      return "special";
  }

  return;
}

export function parseAnimeSearchParams(
  params: AnimeSearchParams
): JikanAnimeSearchParams {
  return {
    limit: params.limit,
    page: params.page,
    sfw: !params.adult,
    type: parseAnimeType(params.type),
    q: params.query,
    genres: params.genres?.map((g) => Number(g)),
    genres_exclude: params.genresExclude?.map((g) => Number(g)),
    status: parseAnimeStatus(params.status),
    score: params.score,
    max_score: params.maxScore,
    min_score: params.minScore,
    sort: params.sort,
    start_date: parseDataToJikanString(params.startDate),
    end_date: parseDataToJikanString(params.endDate),
    order_by: parseAnimeOrder(params.orderBy),
  };
}

function parseAnimeStatus(status?: AnimeStatus): JikanAnimeStatus | undefined {
  switch (status) {
    case AnimeStatus.AIRING:
      return "airing";
    case AnimeStatus.FINISHED:
      return "complete";
    case AnimeStatus.UPCOMING:
      return "upcoming";
  }

  return;
}

function parseDataToJikanString(date?: AnimeDate): string | undefined {
  return date ? "" : undefined;
}

function parseAnimeOrder(
  order?: AnimeSearchOrder
): JikanAnimeSearchOrder | undefined {
  switch (order) {
    case AnimeSearchOrder.END_DATE:
      return "end_date";
    case AnimeSearchOrder.EPISODE_COUNT:
      return "episodes";
    case AnimeSearchOrder.FAVORITES:
      return "favorites";
    case AnimeSearchOrder.ID:
      return "mal_id";
    case AnimeSearchOrder.POPULARITY:
      return "popularity";
    case AnimeSearchOrder.RANK:
      return "rank";
    case AnimeSearchOrder.SCORE:
      return "score";
    case AnimeSearchOrder.START_DATE:
      return "start_date";
    case AnimeSearchOrder.TITLE:
      return "title";
  }

  return;
}

export function parseJikanPagination(
  pagination: JikanPagination
): ApiPagination {
  return {
    lastPage: pagination.last_visible_page,
    hasNextPage: pagination.has_next_page,
    currentPage: pagination.current_page,
    items: {
      count: pagination.items?.count ?? null,
      total: pagination.items?.total ?? null,
      perPage: pagination.items?.per_page ?? null,
    },
  };
}
