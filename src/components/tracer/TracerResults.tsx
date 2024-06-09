import { TracerSearchResponse } from "@/types/tracer";
import { ScrollView, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "../ui/Text";
import { TracerResult } from "./TracerResult";
import List from "../ui/List";
import { useApiQuery } from "@/queries/use-api-query";
import { apiKeys } from "@/queries/keys";
import { anilistApi } from "@/lib/anime-api/anilist/anilist-api";
import { AnimeData, ApiPaginatedResponse } from "@/types";
import {
  parseAnilistAnimeArray,
  parseAnilistPagination,
} from "@/lib/anime-api/anilist/anilist-parser";

async function getAnilistAnimeList(
  idList: number[]
): Promise<ApiPaginatedResponse<AnimeData[]>> {
  const { data } = await anilistApi.getAnimeSearch({
    id_in: idList,
  });

  return {
    data: parseAnilistAnimeArray(data.data?.Page.media ?? []),
    pagination: parseAnilistPagination(data.data?.Page.pageInfo ?? null),
  };
}

interface TracerResultsProps {
  response: TracerSearchResponse;
}

export default function TracerResults({ response }: TracerResultsProps) {
  const { styles } = useStyles(stylesheet);

  const results = response.result;

  const animeList = useApiQuery({
    queryKey: apiKeys.search({ id_in: [] } as any),
    queryFn: () => getAnilistAnimeList(results?.map((r) => r.anilist) ?? []),
  });

  if (response.error) {
    return <Text>Error: {response.error}</Text>;
  }

  if (!results || results.length === 0) {
    return <Text>No results found</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text size="lg" weight="bold">
          Results:
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.results}>
        {results.map((result, index) => (
          <TracerResult
            key={result.filename}
            result={result}
            anime={animeList.data?.at(index)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    height: "100%",
    overflow: "hidden",
    width: "100%",
    paddingVertical: theme.spacing.lg,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
  },
  results: {
    width: "100%",
    padding: theme.spacing.lg,
    rowGap: theme.spacing.lg,
  },
}));
