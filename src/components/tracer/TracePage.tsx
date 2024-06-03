import { ScrollView, View } from "react-native";
import Text from "@/components/ui/Text";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Link } from "expo-router";
import Button from "../ui/Button";
import TraceImageSelector from "./TraceImageSelector";
import {
  useTracerCutBorders,
  useTracerImageFile,
  useTracerImageUrl,
  useTracerUploadType,
} from "@/stores/TracerStore";
import { useMutation } from "@tanstack/react-query";
import { createFormDataWithImage } from "@/lib/utils";
import TraceOptions from "./TraceOptions";
import {
  ImageUploadType,
  TracerSearchOptions,
  TracerSearchParams,
} from "@/types/tracer";
import { tracerApi } from "@/lib/tracer-api";
import LoadingView from "../ui/LoadingView";
import SafeArea from "../ui/SafeArea";
import BackArrow from "../ui/BackArrow";

export default function TracePage() {
  const { styles } = useStyles(stylesheet);

  const imageUploadType = useTracerUploadType();
  const imageFile = useTracerImageFile();
  const imageUrl = useTracerImageUrl();
  const cutBorders = useTracerCutBorders();

  const uploadImage = useMutation({
    mutationFn: async (options: TracerSearchOptions) =>
      tracerApi.search(options),
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });

  const buttonDisabled =
    (imageUploadType === ImageUploadType.FILE && !imageFile) ||
    (imageUploadType === ImageUploadType.URL && !imageUrl);

  async function findAnime() {
    const params: TracerSearchParams = { cutBorders };

    if (imageUploadType === ImageUploadType.FILE) {
      if (!imageFile) return;

      const formData = createFormDataWithImage(imageFile);
      uploadImage.mutate({
        type: ImageUploadType.FILE,
        file: formData,
        ...params,
      });
    } else if (imageUploadType === ImageUploadType.URL) {
      if (!imageUrl) return;

      uploadImage.mutate({
        type: ImageUploadType.URL,
        url: imageUrl,
        ...params,
      });
    }
  }

  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackArrow />
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.titleContainer}>
            <Text weight="bold" size="xl" style={styles.textCenter}>
              Upload image
            </Text>

            <View>
              <Text style={styles.textCenter}>
                Trace where an anime screenshot comes from.
              </Text>
              <Text size="sm" style={styles.textCenter}>
                Powered by{" "}
                <Link href="https://trace.moe">
                  <Text size="sm" style={styles.link}>
                    trace.moe
                  </Text>
                </Link>
              </Text>
            </View>
          </View>

          <TraceImageSelector />

          <TraceOptions />
        </ScrollView>

        <Button
          style={styles.findButton(buttonDisabled)}
          onPress={findAnime}
          disabled={uploadImage.isPending || buttonDisabled}
        >
          {uploadImage.isPending ? (
            <LoadingView color="foreground" />
          ) : (
            <Text color="foreground" style={styles.findButtonText}>
              Find anime
            </Text>
          )}
        </Button>
      </View>
    </SafeArea>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  header: {
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.xs,
    columnGap: theme.spacing.xs,
    zIndex: 10,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    rowGap: theme.spacing.xl,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
  },
  titleContainer: {
    alignContent: "center",
    rowGap: theme.spacing.sm,
  },
  textCenter: { textAlign: "center" },
  link: { textDecorationLine: "underline" },

  findButton: (disabled: boolean) => ({
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    opacity: disabled ? 0.75 : 1,
    height: 40,
  }),
  findButtonText: {
    textAlign: "center",
  },
}));
