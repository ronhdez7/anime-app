import { FlatList, FlatListProps } from "react-native";
import React from "react";

export interface ListProps<T> extends FlatListProps<T> {}

export default function List<T>({ ...props }: ListProps<T>) {
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={2}
      keyboardShouldPersistTaps="never"
      keyboardDismissMode="on-drag"
      {...props}
    />
  );
}
