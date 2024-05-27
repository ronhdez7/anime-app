import { animeDataFragment } from "./fragments/anime-data";

export function getAnimeDataQuery(variables: { animeId: number }) {
  const query = `

	query getAnimeData($animeId: Int) {
		Media(id: $animeId) {
			${animeDataFragment}
		}
	}`;

  return {
    query: query.replaceAll("\n", " "),
    variables,
  };
}
