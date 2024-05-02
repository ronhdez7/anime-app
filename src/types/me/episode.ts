export interface EpisodeData {
  id: number;
  animeId: number;
  title: string;
  filler: boolean;
  recap: boolean;
  aired: {
    day: number;
    month: number;
    year: number;
  };
}
