import { NativeSyntheticEvent, TouchableOpacity, View } from "react-native";
import PagerView from "react-native-pager-view";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "../ui/Text";
import ImageUrlSelector from "./ImageUrlSelector";
import {
  ImageUploadType,
  useTracerActions,
  useTracerUploadType,
} from "@/stores/TracerStore";
import { memo, useEffect, useRef } from "react";
import ImageFileSelector from "./ImageFileSelector";
import { OnPageSelectedEventData } from "react-native-pager-view/lib/typescript/PagerViewNativeComponent";

type PageSelectedEvent = NativeSyntheticEvent<OnPageSelectedEventData>;

export default memo(function TraceImageSelector() {
  const { styles } = useStyles(stylesheet);

  const imageUploadType = useTracerUploadType();
  const { setUploadType } = useTracerActions();

  const pagerRef = useRef<PagerView>(null);

  useEffect(() => {
    pagerRef.current?.setPage(imageUploadType);
  }, [imageUploadType]);

  function onPageSelected(e: PageSelectedEvent) {
    switch (e.nativeEvent.position) {
      case 1:
        setUploadType(ImageUploadType.URL);
        break;
      default:
        setUploadType(ImageUploadType.FILE);
        break;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topNav}>
        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.navButton(imageUploadType === ImageUploadType.FILE)}
          onPress={() => setUploadType(ImageUploadType.FILE)}
        >
          <Text>File</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.navButton(imageUploadType === ImageUploadType.URL)}
          onPress={() => setUploadType(ImageUploadType.URL)}
        >
          <Text>Url</Text>
        </TouchableOpacity>
      </View>

      <PagerView
        ref={pagerRef}
        style={styles.pager}
        onPageSelected={onPageSelected}
      >
        <View style={styles.page} key={ImageUploadType.FILE}>
          <ImageFileSelector />
        </View>
        <View style={styles.page} key={ImageUploadType.URL}>
          <ImageUrlSelector />
        </View>
      </PagerView>
    </View>
  );
});

const stylesheet = createStyleSheet((theme) => ({
  container: {
    borderRadius: theme.radius.md,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.colors.inactive,
  },
  topNav: {
    width: "100%",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.inactive,
    columnGap: 1,
    backgroundColor: theme.colors.inactive,
  },
  navButton: (active: boolean) => ({
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: theme.spacing.md,
    backgroundColor: active ? theme.colors.neutral : theme.colors.inactive,
  }),
  pager: { width: "100%", aspectRatio: 16 / 9 },
  page: { width: "100%", height: "100%", backgroundColor: "red" },
}));
