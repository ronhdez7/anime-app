import { useFonts } from "expo-font";
import useFeaturedAnime from "./use-featured-anime";
import useTopAnime from "./use-top-anime";
import useAnimeSearch from "./use-anime-search";

function useLoadFonts() {
  const [fontsLoaded, fontError] = useFonts({
    "Inter-Light": require("../../assets/fonts/Inter/Inter-Light.otf"),
    "Inter-Medium": require("../../assets/fonts/Inter/Inter-Medium.otf"),
    "Inter-Bold": require("../../assets/fonts/Inter/Inter-Bold.otf"),
    "Inter-Black": require("../../assets/fonts/Inter/Inter-Black.otf"),
  });

  // For some reason, in some devices requests to the api fail.
  // So this dummy request to a verified api is needed.
  // axios.get("https://jsonplaceholder.typicode.com/posts/1");

  return [fontsLoaded, fontError];
}

export function useLoad() {
  const [fontsLoaded] = useLoadFonts();

  const featured = useFeaturedAnime();
  const top = useTopAnime();

  // loads action anime
  const action = useAnimeSearch({ genres: ["1"] });

  return (
    fontsLoaded && !featured.isPending && !top.isPending && !action.isPending
  );
}
