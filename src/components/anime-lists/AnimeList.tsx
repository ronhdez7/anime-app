import { ImageBackground, StyleSheet, View } from "react-native";
import React, { PropsWithChildren } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { JikanAnimeData, JikanError } from "@/types/jikan";
import { theme } from "@/theme";
import Text from "@/components/ui/Text";
import ReloadButton from "../ReloadButton";
import { FlashList } from "@shopify/flash-list";

interface Props {
  query: UseQueryResult<JikanAnimeData[], AxiosError<JikanError>>;
}

export default function AnimeList({ query }: Props) {
  function refetch() {
    query.refetch();
  }

  return (
    <View
      style={{
        height: 200,
        borderRadius: theme.sizes.radius.md,
        backgroundColor: theme.colors.secondary,
        overflow: "hidden",
      }}
    >
      {query.error ? (
        <View
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            justifyContent: "center",
            rowGap: theme.sizes.gap.xl,
          }}
        >
          <View
            style={{
              display: "flex",
              alignItems: "center",
              rowGap: theme.sizes.gap.sm,
            }}
          >
            <Text foreground>Could not get anime</Text>
            {query.error.response && (
              <Text size="sm" foreground>
                Error: {query.error.response.data.message}
              </Text>
            )}
          </View>
          <ReloadButton onReload={refetch} />
        </View>
      ) : (
        <FlashList
          data={query.data ?? new Array(5).fill(null)}
          renderItem={({ item }) =>
            item ? (
              <AnimeListItem anime={item} />
            ) : (
              <View style={[styles.listItem]} />
            )
          }
          horizontal
          estimatedItemSize={108}
          contentContainerStyle={{
            padding: theme.sizes.padding.sm,
          }}
          ItemSeparatorComponent={() => (
            <View style={{ width: theme.sizes.padding.sm }} />
          )}
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
}

interface AnimeListItemProps {
  anime: JikanAnimeData;
}

function AnimeListItem({ anime }: AnimeListItemProps) {
  return (
    <View style={styles.listItem}>
      <ImageBackground
        style={{ display: "flex", justifyContent: "flex-end", height: "100%" }}
        source={{ uri: anime.images.webp.image_url }}
        resizeMode="cover"
        borderRadius={theme.sizes.radius.md}
      >
        <View
          style={{
            backgroundColor: theme.colors.overlay,
            height: 44,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: theme.sizes.padding.xs,
          }}
        >
          <Text
            size="sm"
            foreground
            numberOfLines={2}
            style={{ textAlign: "center" }}
          >
            {anime.title_english ?? anime.title_japanese}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    width: 100,
    borderRadius: theme.sizes.radius.md,
    height: "100%",
    overflow: "hidden",
  },
});

interface ListHeaderProps {
  title: string;
}
export function AnimeListHeader({
  title,
  children,
}: PropsWithChildren<ListHeaderProps>) {
  return (
    <View style={{ rowGap: theme.sizes.gap.xs }}>
      <Text
        style={{
          paddingLeft: theme.sizes.padding.sm,
          fontFamily: theme.fonts.inter.bold,
        }}
      >
        {title}
      </Text>

      {children}
    </View>
  );
}
