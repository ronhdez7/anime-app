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

export enum ImageType {
  FILE,
  URL,
}

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
    <View style={styles.container}>
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
        disabled={buttonDisabled}
      >
        <Text color="foreground" style={styles.findButtonText}>
          Find anime
        </Text>
      </Button>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
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
  }),
  findButtonText: {
    textAlign: "center",
  },
}));
