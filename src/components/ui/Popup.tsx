import { MenuOption } from "react-native-popup-menu";
import { IconProps } from "../icons/IconFactory";
import Text from "./Text";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export interface PopupOption {
  label: string;
  Icon?: (props: IconProps) => JSX.Element;
  onSelect: () => void;
}

interface OptionsPopupProps {
  options: PopupOption[][];
}

export function OptionsPopup({ options }: OptionsPopupProps) {
  const { styles } = useStyles(stylesheet);

  return options.map((group, groupIdx) => {
    return (
      <View key={groupIdx}>
        {group.map((option) => {
          return <OptionPopup option={option} key={option.label} />;
        })}
        {groupIdx !== options.length - 1 && (
          <View style={styles.separator} key={`separator-${groupIdx}`}>
            <View style={styles.separatorBar} />
          </View>
        )}
      </View>
    );
  });
}

function OptionPopup({ option }: { option: PopupOption }) {
  const { label, Icon, onSelect } = option;

  return (
    <MenuOption
      onSelect={onSelect}
      customStyles={{
        optionWrapper: {
          flexDirection: "row",
          alignItems: "center",
          columnGap: 8,
        },
      }}
    >
      {Icon && <Icon size="sm" />}
      <Text>{label}</Text>
    </MenuOption>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  separator: {
    paddingVertical: theme.spacing.sm,
    width: "100%",
  },
  separatorBar: {
    height: 1,
    backgroundColor: theme.colors.background,
  },
}));
