import axios, { AxiosError } from "axios";

export abstract class Tracer {
  abstract upload(): Promise<any>;
}

export class ImageFileTrace implements Tracer {
  private URL = "https://api.trace.moe/search";

  constructor(private file: any) {}

  async upload() {
    try {
      return await axios.post(this.URL, this.file, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export class ImageUrlTrace implements Tracer {
  private URL = "https://api.trace.moe/search";

  constructor(private url: string) {}

  async upload() {
    return await axios.get(`${this.URL}?url=${encodeURIComponent(this.url)}`);
  }
}
