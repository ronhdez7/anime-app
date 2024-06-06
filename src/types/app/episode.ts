import { AnimeDate } from "./misc";

export interface EpisodeData {
  id: number;
  number: number;
  animeId: number;
  title: string | null;
  filler: boolean | null;
  recap: boolean | null;
  aired: AnimeDate;
}
