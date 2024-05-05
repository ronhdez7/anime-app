// Anime
export interface AnimeResult {
  provider: string;
  name: string | null;
  jname: string | null;
  audioType: {
    sub: boolean;
    dub: boolean;
  };
  filmType: string | null;
  url: string;
  image: string | null;
  quality: string | null;
  episodeCount: number | null;
}

// Episode
export interface EpisodeResult {
  provider: string;
  providerId: number;
  name: string | null;
  jname: string | null;
  number: number;
  url: string | null;
}

// Server
export interface ServerResult {
  provider: string;
  name: string;
  serverNumber: number;
  url: string;
  audioType: string;
  playerUrl: string;
}

// Source
export interface SourceTrack {
  file: string;
  kind: string;
  label?: string;
  default?: true;
}

export interface AnimeSectionTimestamps {
  start: number;
  end: number;
}

export interface Source {
  url: string;
  type: string;
}

export interface SourceResult {
  sources: Source[];
  tracks: SourceTrack[];
  intro: AnimeSectionTimestamps;
  outro: AnimeSectionTimestamps;
  playerUrls: string[];
  duration: number;
  thumbnail: string | null;
}
