import {
  JikanAnimeDate,
  JikanAnimeRelation,
  JikanLink,
  JikanReference,
} from "./misc";

export interface JikanAnimeData {
  mal_id: number;
  url: string | null;
  images: {
    jpg: {
      image_url: string | null;
      small_image_url: string | null;
      large_image_url: string | null;
    };
    webp: {
      image_url: string | null;
      small_image_url: string | null;
      large_image_url: string | null;
    };
  };
  trailer: {
    youtube_id: string | null;
    url: string | null;
    embed_url: string | null;
    images: {
      image_url: string | null;
      small_image_url: string | null;
      medium_image_url: string | null;
      large_image_url: string | null;
      maximum_image_url: string | null;
    };
  };
  approved: boolean | null;
  titles: { type: string; title: string }[];
  title: string | null;
  title_english: string | null;
  title_japanese: string | null;
  title_synonyms: string[];
  type: string | null;
  source: string | null;
  episodes: number | null;
  status: string | null;
  airing: boolean | null;
  aired: {
    from: string | null;
    to: string | null;
    prop: {
      from: JikanAnimeDate;
      to: JikanAnimeDate;
      string: string | null;
    };
  };
  duration: string | null;
  rating: string | null;
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number | null;
  members: number | null;
  favorites: number | null;
  synopsis: string | null;
  background: string | null;
  season: string | null;
  year: number | null;
  broadcast: {
    day: string | null;
    time: string | null;
    timezone: string | null;
    string: string | null;
  };
  producers: JikanReference[];
  licensors: JikanReference[];
  studios: JikanReference[];
  genres: JikanReference[];
  explicit_genres: JikanReference[];
  themes: JikanReference[];
  demographics: JikanReference[];
}

export interface JikanAnimeFullData extends JikanAnimeData {
  relations: JikanAnimeRelation[];
  theme: {
    openings: string[];
    endings: string[];
  };
  external: JikanLink[];
  streaming: JikanLink[];
}
