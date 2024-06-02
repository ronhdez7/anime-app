import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import Input from "@/components/ui/Input";
import IconButton from "@/components/ui/IconButton";
import { PlusIcon } from "@/components/icons";
import Button from "@/components/ui/Button";
import { TouchableOpacity, View } from "react-native";
import Text from "../ui/Text";

interface ImageSelectorProps {
  handleSubmitByUrl(url: string): void;
  handleSubmitByImage(image: string): void;
}
export default function TraceImageSelector2({
  handleSubmitByImage,
  handleSubmitByUrl,
}: ImageSelectorProps) {
  const { styles } = useStyles(stylesheet);
  const [image, setImage] = useState<string>();
  const getImage = useMutation({
    mutationFn: async () =>
      await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      }),
    onSuccess: (data) => !data.canceled && setImage(data.assets?.at(0)?.uri),
  });
  const inputText = useRef<string>("");

  function pickImage() {
    getImage.mutate();
  }

  function submitByUrl() {
    handleSubmitByUrl(inputText.current);
  }

  function submitByImage() {
    image && handleSubmitByImage(image);
  }

  return (
    <View style={styles.container}>
      <Text>Upload image using url</Text>
      <View style={styles.inputContainer}>
        <Input
          aria-label="image url"
          placeholder="https://example.com"
          style={styles.input}
          onChangeText={(text) => (inputText.current = text)}
        />
        <IconButton onPress={submitByUrl}>
          <PlusIcon color="foreground" size="xs" />
        </IconButton>
      </View>
      <Text>or pick image from device</Text>
      <View style={styles.pickImageContainer}>
        <View style={styles.imageViewer}>
          <TouchableOpacity activeOpacity={0.75} onPress={pickImage}>
            <Image
              style={styles.image}
              source={{ uri: image ?? "https://i.imgur.com/9pQwXjJ.png" }}
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>
        <Button onPress={submitByImage}>
          <Text color="foreground" style={{ textAlign: "center" }}>
            Find anime
          </Text>
        </Button>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: { width: "100%", rowGap: theme.spacing.md },
  inputContainer: {
    columnGap: theme.spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  input: { flex: 1, borderWidth: 1 },
  imageViewer: { height: 200, maxHeight: 200 },
  image: { height: "100%", width: "100%" },
  pickImageContainer: { rowGap: theme.spacing.xs },
}));
