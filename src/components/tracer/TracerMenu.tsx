import { createStyleSheet, useStyles } from "react-native-unistyles";
import { VerticalDotsIcon } from "../icons";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { OptionsPopup, PopupOption } from "../ui/Popup";
import { DocTextIcon } from "../icons/DocTextIcon";
import { Alert, Modal, StyleSheet } from "react-native";

const options: PopupOption[][] = [
  [
    {
      label: "Show Quota",
      onSelect: () => Alert.alert("Tracer Quota", "info"),
      Icon: DocTextIcon,
    },
  ],
];

export default function TracerMenu() {
  const { styles } = useStyles(stylesheet);

  return (
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
  );
}

const stylesheet = createStyleSheet((theme) => ({
  optionsContainer: {
    padding: theme.spacing.sm,
  },
}));
