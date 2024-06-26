import { TextInput, View } from "react-native";
import Input from "../ui/Input";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Text from "../ui/Text";
import { useRef } from "react";
import { useTracerActions, useTracerImageUrl } from "@/stores/TracerStore";
import { Shadow } from "react-native-shadow-2";

export default function ImageUrlSelector() {
  const { styles } = useStyles(stylesheet);
  const inputRef = useRef<TextInput>(null);

  const imageUrl = useTracerImageUrl();
  const { setImageUrl } = useTracerActions();

  function focusInput() {
    inputRef.current?.focus();
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text size="md" onPress={focusInput}>
          Enter image url
        </Text>
        <Shadow distance={5}>
          <View style={styles.inputContainer}>
            <Input
              ref={inputRef}
              style={styles.input}
              placeholder="https://example.com"
              value={imageUrl}
              onChangeText={setImageUrl}
            />
          </View>
        </Shadow>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  form: {
    width: "100%",
    rowGap: theme.spacing.sm,
    alignItems: "flex-start",
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    overflow: "hidden",
    borderRadius: theme.radius.xs,
  },
  input: {
    width: "100%",
  },
}));
