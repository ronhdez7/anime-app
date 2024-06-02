import { AnilistAnimeSearchParams } from "@/types/anilist";
import { animeDataFragment } from "./fragments/anime-data";
import { convertToVariables } from "@/lib/utils";

export function getAnimeSearchQuery(variables: AnilistAnimeSearchParams) {
  const query = `
	query getAnimeSearch(
		$page: Int, 
		$perPage: Int, 
		$isAdult: Boolean, 
		$sort: [MediaSort],
		$search: String,
		$type: MediaType,
		$genre_in: [String],
		$genre_not_in: [String],
		$status: MediaStatus,
		$averageScore_greater: Int,
		$averageScore_lesser: Int,
		$startDate: FuzzyDateInt,
		$endDate: FuzzyDateInt,
) {
		Page (page: $page, perPage: $perPage) {
			media(
				isAdult: $isAdult, 
				sort: $sort, 
				search: $search,
				type: $type,
				genre_in: $genre_in,
				genre_not_in: $genre_not_in,
				status: $status,
				averageScore_greater: $averageScore_greater,
				averageScore_lesser: $averageScore_lesser,
				startDate: $startDate,
				endDate: $endDate
			) {
				${animeDataFragment}
			}
		}
	}`;

  return {
    query: query.replaceAll("\n", " "),
    variables: convertToVariables(variables),
  };
}
