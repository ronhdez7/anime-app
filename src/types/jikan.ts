// Response
export type JikanResponse<T> = {
  data: T;
};

export type JikanPaginatedResponse<T> = {
  data: T;
  pagination: JikanPagination;
};

export interface JikanError {
  status: number;
  type: string;
  message: string;
  error: string;
  report_url?: string;
}

export interface JikanPagination {
  last_visible_page: number;
  has_next_page: boolean;
}

// Types
export interface JikanReference {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface JikanLink {
  name: string;
  url: string;
}

export enum JikanAnimeType {
  TV = "TV",
  OVA = "OVA",
  Movie = "Movie",
  Special = "Special",
  ONA = "ONA",
  Music = "Music",
}

export enum Season {
  SRRING = "spring",
  SUMMER = "summer",
  FALL = "fall",
  WINTER = "winter",
}

export type MALID = string | number;

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
    youtube_id: string;
    url: string;
    embed_url: string;
    images?: {
      image_url: string;
      small_image_url: string;
      medium_image_url: string;
      large_image_url: string;
      maximum_image_url: string;
    };
  };
  titles: {
    type: string;
    title: string;
  }[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: JikanAnimeType;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: {
    from: string;
    to: string;
    prop: {
      from: {
        day: number;
        month: number;
        year: number;
      };
      to: {
        day: number;
        month: number;
        year: number;
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
  background: string;
  season: Season;
  year: number;
  broadcast: {
    day: string;
    time: string;
    timezone: string;
    string: string;
  };
  producers: JikanReference[];
  licensors: JikanReference[];
  studios: JikanReference[];
  genres: JikanReference[];
  explicit_genres: JikanReference[];
  themes: JikanReference[];
  demographics: JikanReference[];
}

export type JikanRelationType =
  | "Adaptation"
  | "Prequel"
  | "Side Story"
  | "Summary";

export interface JikanAnimeRelation {
  relation: string;
  entry: JikanReference[];
}

export interface JikanFullAnimeData extends JikanAnimeData {
  relations: JikanAnimeRelation[];
  theme: {
    openings: string[];
    endings: string[];
  };
  external: JikanLink[];
  streaming: JikanLink[];
}

export interface JikanEpisodeData {
  mal_id: number;
  url: string;
  title: string;
  title_japanese: string;
  title_romanji: string;
  score: number;
  aired: string;
  filler: boolean;
  recap: boolean;
  forum_url: string;
}

export type JikanRating = "g" | "pg" | "pg13" | "r17" | "r" | "rx";
