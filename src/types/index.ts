export interface PhotoItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface PhotoDetail extends PhotoItem {
  longDescription: string;
}

export interface RouteParams {
  [key: string]: string;
} 