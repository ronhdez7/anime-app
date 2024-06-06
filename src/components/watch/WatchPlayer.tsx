import React from "react";
import { useAnime } from "@/queries/use-anime";
import { useFindAnime } from "@/queries/use-find-anime";
import { useStreamEpisodes } from "@/queries/use-stream-episodes";
import { useStreamServers } from "@/queries/use-stream-servers";
import { useStreamSources } from "@/queries/use-stream-sources";
import Player from "../player/Player";
import PlayerStoreProvider from "@/stores/PlayerStore";
import { ID } from "@/types";

interface WatchPlayerProps {
  animeId: ID;
  episodeNumber: number;
}

export default function WatchPlayer({
  animeId,
  episodeNumber,
}: WatchPlayerProps) {
  const anime = useAnime(animeId);
  const streamAnime = useFindAnime(
    {
      title: anime.data?.titles.jp ?? undefined,
      title_en: anime.data?.titles.en ?? undefined,
    },
    !!anime.data
  );
  const episodes = useStreamEpisodes(streamAnime.data?.url);
  const episode = episodes.data?.find((i) => i.number === episodeNumber);
  const servers = useStreamServers(episode?.url ?? undefined);
  const sources = useStreamSources(servers.data?.at(0)?.playerUrl);

  const sourceUrl = sources.data?.sources.at(0)?.url ?? "";

  return (
    <PlayerStoreProvider>
      <Player
        source={{
          uri: sourceUrl,
          metadata: {
            title: episode?.name ?? undefined,
            artist: anime.data?.title ?? undefined,
          },
        }}
      />
    </PlayerStoreProvider>
  );
}
