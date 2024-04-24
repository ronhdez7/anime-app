import { JikanAnimeRelation, JikanLink, JikanReference } from "./misc";

export interface JikanAnimeData {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  trailer: {
    youtube_id?: string;
    url?: string;
    embed_url?: string;
    images: {
      image_url?: string;
      small_image_url?: string;
      medium_image_url?: string;
      large_image_url?: string;
      maximum_image_url?: string;
    };
  };
  approved: boolean;
  titles: { type: string; title: string }[];
  title?: string;
  title_english?: string;
  title_japanese?: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: {
    from: string;
    to?: string;
    prop: {
      from: {
        day: number;
        month: number;
        year: number;
      };
      to: {
        day?: number;
        month?: number;
        year?: number;
      };
      string: string;
    };
  };
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background?: string;
  season?: string;
  year?: number;
  broadcast: {
    day?: string;
    time?: string;
    timezone?: string;
    string?: string;
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
