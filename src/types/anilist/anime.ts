export interface AnilistAnimeData {
  id: number;
  idMal?: number;
  title?: {
    english?: string;
    romaji?: string;
    native?: string;
  };
  coverImage: {
    extraLarge?: string;
    large?: string;
    medium?: string;
    color?: string;
  };
  bannerImage?: string;
  type?: string;
  episodes?: number;
  status?: string;
  description?: string;
  startDate?: {
    day?: number;
    month?: number;
    year?: number;
  };
  endDate?: {
    day?: number;
    month?: number;
    year?: number;
  };
}
