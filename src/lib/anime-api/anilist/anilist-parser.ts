import { AnimeData } from "@/types";
import { AnilistAnimeData } from "@/types/anilist";

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
