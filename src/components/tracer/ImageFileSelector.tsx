import { Image } from "expo-image";
import { useTracerActions, useTracerImageFile } from "@/stores/TracerStore";
import { TouchableOpacity, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import Text from "../ui/Text";
import { ImageIcon } from "../icons/ImageIcon";

export default function ImageFileSelector() {
  const { styles } = useStyles(stylesheet);

  const imageFile = useTracerImageFile();
  const { setImageFile } = useTracerActions();

  const getImage = useMutation({
    mutationFn: async () =>
      await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      }),
    onSuccess: (data) =>
      !data.canceled && setImageFile(data.assets?.at(0)?.uri),
  });

  function pickImage() {
    getImage.mutate();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.75} onPress={pickImage}>
        {imageFile ? (
          <Image style={styles.image} source={imageFile} contentFit="contain" />
        ) : (
          <View style={styles.noImage}>
            <View style={styles.noImageContainer}>
              <ImageIcon size="xl" />
              <Text>Press to select an image</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.background,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  noImage: {
    padding: theme.spacing.md,
  },
  noImageContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderColor: theme.colors.text,
    borderWidth: 1,
    borderRadius: theme.radius.md,
  },
}));
