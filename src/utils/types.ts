export interface Photo {
    id: number;
    alt: string;
    photographer: string;
    photographer_url: string;
    src: {
      original: string;
      large2x: string;
      large: string;
      medium: string;
    };
    width: number;
    height: number;
    url: string;
  }