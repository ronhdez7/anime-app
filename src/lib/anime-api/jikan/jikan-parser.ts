import {
  AnimeData,
  AnimeGenre,
  AnimeGenreType,
  ApiError,
  EpisodeData,
} from "@/types";
import {
  JikanAnimeData,
  JikanEpisodeData,
  JikanError,
  JikanGenre,
} from "@/types/jikan";

export function parseJikanError(error: JikanError): ApiError {
  return error;
}

export function parseJikanAnime(anime: JikanAnimeData): AnimeData {
  return {
    id: anime.mal_id,
    description: anime.synopsis,
    title: anime.title ?? anime.title_english ?? anime.title_japanese,
    images: {
      small: anime.images.webp.small_image_url,
      regular: anime.images.webp.image_url,
      large: anime.images.webp.large_image_url,
    },
    episodeCount: anime.episodes ?? 0,
    rating: anime.rating?.trim().split(" ")[0],
    status: anime.status,
    trailer: {
      url: anime.trailer.url,
      images: anime.trailer.images,
    },
    type: anime.type,
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
  animeId?: number
): EpisodeData {
  return {
    id: episode.mal_id,
    animeId: Number(animeId),
    title:
      episode.title ??
      episode.title_japanese ??
      episode.title_romanji ??
      `Episode ${episode.mal_id}`,
    filler: episode.filler,
    recap: episode.recap,
    aired: {
      day: new Date(episode.aired).getDate(),
      month: new Date(episode.aired).getMonth(),
      year: new Date(episode.aired).getFullYear(),
    },
  };
}

export function parseJikanEpisodeArray(
  episodes: JikanEpisodeData[],
  animeId?: number
) {
  return episodes.map((episode) => parseJikanEpisode(episode));
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
        return parseJikanGenre(genre, "EXPLICIT");
      } else if (genreIds.themes.includes(Number(genre.mal_id))) {
        return parseJikanGenre(genre, "THEME");
      } else if (genreIds.demographics.includes(Number(genre.mal_id))) {
        return parseJikanGenre(genre, "DEMOGRAPHIC");
      }

      return parseJikanGenre(genre, "GENRE");
    })
    .filter(Boolean) as any;
}
