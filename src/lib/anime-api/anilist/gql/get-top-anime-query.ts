import { AnilistTopAnimeParams } from "@/types/anilist";
import { animeDataFragment } from "./fragments/anime-data";

export function getTopAnimeQuery(variables: AnilistTopAnimeParams) {
  const query = `
	query getTopAnime($page: Int, $perPage: Int, $isAdult: Boolean) {
		Page (page: $page, perPage: $perPage) {
			media(isAdult: $isAdult, sort: POPULARITY_DESC) {
				${animeDataFragment}
			}
		}
	}`;

  return {
    query: query.replaceAll("\n", " "),
    variables,
  };
}
