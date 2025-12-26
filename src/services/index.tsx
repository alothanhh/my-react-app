import { PHOTO_API_URL } from "../constants";
import type { TListPhoto } from "../types";

export function fetchListPhoto(): Promise<TListPhoto> {
  const response = fetch(PHOTO_API_URL)
    .then((response) => response.json())
    .then((json) => {
      return json;
    });

  return response;
}
