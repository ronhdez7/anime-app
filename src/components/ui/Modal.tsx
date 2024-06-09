import { Pressable, Modal as RNModal, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type ModalAnimationType = "fade" | "none" | "slide";

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
  visible?: boolean;
  onShow?: () => void;
  animationType?: ModalAnimationType | undefined;
}

export function Modal({
  children,
  onClose,
  visible,
  onShow,
  animationType = "fade",
}: ModalProps) {
  const { styles, theme } = useStyles(stylesheet);
  const insets = useSafeAreaInsets();

  function closeModal() {
    onClose?.();
  }

  return (
    <RNModal
      visible={visible}
      presentationStyle="overFullScreen"
      transparent
      animationType={animationType}
      statusBarTranslucent
      onRequestClose={closeModal}
      onShow={onShow}
    >
      <View style={styles.modalContainer}>
        <Pressable style={styles.backdrop} onPress={closeModal} />

        <View
          style={[
            {
              paddingTop: insets.top + theme.spacing.lg,
              paddingBottom: insets.bottom + theme.spacing.lg,
              paddingLeft: insets.left + theme.spacing.lg,
              paddingRight: insets.right + theme.spacing.lg,
            },
            styles.modalContent,
          ]}
        >
          {children}
        </View>
      </View>
    </RNModal>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  modalContainer: {
    flex: 1,
    position: "relative",
  },
  backdrop: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: theme.colors.overlay,
    zIndex: -10,
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
}));
