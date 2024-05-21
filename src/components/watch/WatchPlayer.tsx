import React from "react";
import { MALID } from "@/types/jikan";
import { useAnime } from "@/queries/use-anime";
import { useFindAnime } from "@/queries/use-find-anime";
import { useStreamEpisodes } from "@/queries/use-stream-episodes";
import { useStreamServers } from "@/queries/use-stream-servers";
import { useStreamSources } from "@/queries/use-stream-sources";
import PlayerWithControls from "../player/PlayerWithControls";
import PlayerStoreProvider from "@/stores/PlayerStore";

interface WatchPlayerProps {
  animeId: MALID;
  episodeNumber: number;
}

export default function WatchPlayer({
  animeId,
  episodeNumber,
}: WatchPlayerProps) {
  const anime = useAnime(animeId);
  const streamAnime = useFindAnime(
    { title: anime.data?.titles.jp, title_en: anime.data?.titles.en },
    !!anime.data
  );
  const episodes = useStreamEpisodes(streamAnime.data?.url);
  const servers = useStreamServers(
    episodes.data?.find((i) => i.number === episodeNumber)?.url ?? undefined
  );
  const sources = useStreamSources(servers.data?.at(0)?.playerUrl);

  return (
    <PlayerStoreProvider>
      <PlayerWithControls
        source={{
          uri: sources.data?.sources.at(0)?.url ?? "",
        }}
      />
    </PlayerStoreProvider>
  );
}
