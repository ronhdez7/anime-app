import { ApiResponse } from "@/types";
import {
  ImageUploadType,
  TracerQuota,
  TracerSearchOptions,
  TracerSearchParams,
  TracerSearchResponse,
} from "@/types/tracer";
import axios, { AxiosRequestConfig } from "axios";

const SEARCH_URL = "https://api.trace.moe/search";

async function uploadFile(
  formData: FormData,
  params: TracerSearchParams,
  config?: AxiosRequestConfig
) {
  const paramstring = params.cutBorders ? "cutBorders" : "";
  return (
    await axios.post(`${SEARCH_URL}?${paramstring}`, formData, {
      headers: { "content-type": "multipart/form-data" },
      ...config,
    })
  ).data;
}

async function uploadUrl(
  url: string,
  params: TracerSearchParams,
  config?: AxiosRequestConfig
) {
  const paramstring = params.cutBorders ? "cutBorders" : "";
  return (
    await axios.get(
      `${SEARCH_URL}?url=${encodeURIComponent(url)}&${paramstring}`,
      config
    )
  ).data;
}

export class TracerApi {
  async me(config?: AxiosRequestConfig): Promise<ApiResponse<TracerQuota>> {
    const url = "https://api.trace.moe/me";
    const { data } = await axios.get(url, config);

    return { data: data };
  }

  async search(
    options: TracerSearchOptions,
    config?: AxiosRequestConfig
  ): Promise<TracerSearchResponse> {
    const params: TracerSearchParams = { cutBorders: options.cutBorders };

    if (options.type === ImageUploadType.FILE) {
      return await uploadFile(options.file, params, config);
    } else if (options.type === ImageUploadType.URL) {
      return await uploadUrl(options.url, params, config);
    } else {
      throw new Error("Invalid image upload type");
    }
  }
}
