import { AnilistTopAnimeParams } from "@/types/anilist";
import { animeDataFragment } from "./fragments/anime-data";
import { convertToVariables } from "@/lib/utils";

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
    variables: convertToVariables(variables),
  };
}
