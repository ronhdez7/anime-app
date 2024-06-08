import { jikan } from "./jikan";
import { AnimeApi } from "./anime-api";

const animeApi: AnimeApi = {
  error: jikan.error.bind(jikan),
  loading: jikan.loading.bind(jikan),
  fakeResponse: jikan.fakeResponse.bind(jikan),
  getAnimeEpisodes: jikan.getAnimeEpisodes.bind(jikan),
  getAnimeFullById: jikan.getAnimeFullById.bind(jikan),
  getAnimeGenres: jikan.getAnimeGenres.bind(jikan),
  getAnimeSearch: jikan.getAnimeSearch.bind(jikan),
  getFeaturedAnime: jikan.getFeaturedAnime.bind(jikan),
  getTopAnime: jikan.getTopAnime.bind(jikan),
};

export default animeApi;
