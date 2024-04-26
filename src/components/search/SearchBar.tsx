import { useSearchActions, useSearchQuery } from "@/stores/SearchStore";
import Input from "../ui/Input";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export default function SearchBar() {
  const { styles } = useStyles(stylesheet);

  const searchQuery = useSearchQuery();
  const { setQuery } = useSearchActions();

  return (
    <Input
      style={styles.main}
      placeholder="Search"
      value={searchQuery}
      onChangeText={setQuery}
    />
  );
}

const stylesheet = createStyleSheet((theme) => ({
  main: { flex: 1 },
}));
