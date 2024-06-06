import { FlashList, FlashListProps } from "@shopify/flash-list";
import React from "react";

export interface ListProps<T> extends FlashListProps<T> {}

export const listDefaultProps: Partial<ListProps<any>> = {
  showsHorizontalScrollIndicator: false,
  showsVerticalScrollIndicator: false,
  onEndReachedThreshold: 2,
  keyboardShouldPersistTaps: "never",
  keyboardDismissMode: "on-drag",
  decelerationRate: "normal",
  ListFooterComponentStyle: { paddingHorizontal: 8 },
};

export default function List<T>({ ...props }: ListProps<T>) {
  return <FlashList {...listDefaultProps} {...props} />;
}
