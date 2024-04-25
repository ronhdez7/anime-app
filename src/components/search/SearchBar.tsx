import { useSearchActions, useSearchQuery } from "@/stores/SearchStore";
import Input from "../ui/Input";
import { StyleSheet } from "react-native";

export default function SearchBar() {
  const styles = stylesheet;

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

const stylesheet = StyleSheet.create({
  main: { flex: 1 },
});
