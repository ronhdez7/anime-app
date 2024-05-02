import { AnimeData, ApiError } from "@/types";
import { JikanAnimeData, JikanError, JikanResponse } from "@/types/jikan";

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
