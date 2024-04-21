import { useSearchActions, useSearchQuery } from "@/stores/SearchStore";
import Input from "../ui/Input";

export default function SearchBar() {
  const searchQuery = useSearchQuery();
  const { setQuery } = useSearchActions();

  return (
    <Input
      style={{ flex: 1 }}
      placeholder="Search"
      value={searchQuery}
      onChangeText={setQuery}
    />
  );
}
