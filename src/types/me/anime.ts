export interface AnimeData {
  id: number;
  title?: string;
  titles: {
    en?: string;
    jp?: string;
  };
  images: {
    small: string;
    regular: string;
    large: string;
  };
  trailer: {
    url?: string;
    images: {
      image_url?: string;
      small_image_url?: string;
      medium_image_url?: string;
      large_image_url?: string;
      maximum_image_url?: string;
    };
  };
  type: string;
  episodeCount: number;
  status: string;
  rating?: string;
  description: string;
  dates: {
    from: {
      day: number;
      month: number;
      year: number;
    };
    to: {
      day?: number;
      month?: number;
      year?: number;
    };
  };
}
