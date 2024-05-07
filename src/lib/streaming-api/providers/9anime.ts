import { AxiosInstance } from "axios";
import { StreamProvider } from "../provider";

export class NineAnimeProvider extends StreamProvider {
  public PROVIDER_NAME = "9ANIME";

  constructor(axios: AxiosInstance) {
    super(axios, "/9anime");
  }
}
