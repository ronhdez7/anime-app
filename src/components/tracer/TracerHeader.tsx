import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import BackArrow from "../ui/BackArrow";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { VerticalDotsIcon } from "../icons";
import { OptionsPopup, PopupOption } from "../ui/Popup";
import { DocTextIcon } from "../icons/DocTextIcon";
import { Modal } from "../ui/Modal";
import ModalContent from "../ui/ModalContent";
import { useState } from "react";
import QuotaDisplay from "./QuotaDisplay";

export default function TracerHeader() {
  const { styles } = useStyles(stylesheet);

  const [quotaModalOpen, setQuotaModalOpen] = useState(false);

  function showQuota() {
    setQuotaModalOpen(true);
  }

  const options: PopupOption[][] = [
    [
      {
        label: "Show Quota",
        onSelect: showQuota,
        Icon: DocTextIcon,
      },
    ],
  ];

  return (
    <View style={styles.container}>
      <Modal visible={quotaModalOpen} onClose={() => setQuotaModalOpen(false)}>
        <ModalContent>
          <QuotaDisplay />
        </ModalContent>
      </Modal>

      <BackArrow />

      <Menu>
        <MenuTrigger
          customStyles={{
            triggerWrapper: {
              padding: 8,
              alignItems: "center",
              justifyContent: "center",
            },
          }}
        >
          <VerticalDotsIcon />
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: styles.optionsContainer,
          }}
        >
          <OptionsPopup options={options} />
        </MenuOptions>
      </Menu>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
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
  optionsContainer: {
    padding: theme.spacing.sm,
  },
}));
