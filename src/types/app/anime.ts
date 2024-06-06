import { AnimeDate } from "./misc";

export interface AnimeData {
  id: number | null;
  malId: number | null;
  anilistId: number | null;
  title: string | null;
  titles: {
    en: string | null;
    jp: string | null;
  };
  images: {
    small: string | null;
    regular: string | null;
    large: string | null;
  };
  trailer: {
    url: string | null;
    images: {
      image_url: string | null;
      small_image_url: string | null;
      medium_image_url: string | null;
      large_image_url: string | null;
      maximum_image_url: string | null;
    } | null;
  };
  type: string | null;
  episodeCount: number | null;
  status: string | null;
  rating: string | null;
  description: string | null;
  dates: {
    from: AnimeDate;
    to: AnimeDate;
  };
}
