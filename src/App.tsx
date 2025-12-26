import { useEffect, useState } from "react";
import "./App.css";
import type { TListPhoto, TPhoto } from "./types";
import { fetchListPhoto } from "./services";

const PhotoCard = ({ albumId, title, url }: TPhoto) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center p-2 border border-gray-200 rounded-2xl">
      <div className="font-bold text-red-300">{albumId}</div>
      <div> {title} </div>
      <div> {url} </div>

      {/* <a href={url}>
        <img src={thumbnailUrl} alt={`${title} image`} className="w-32 h-32" />
      </a> */}
    </div>
  );
};

function App() {
  const [listPhoto, setListPhoto] = useState<TListPhoto>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photos = await fetchListPhoto();
        setListPhoto(photos);
      } catch {
        console.error("Can not fetch photos. Please try again.");
      }
    };

    fetchPhotos();
  }, []);

  const uniqueAlbumIds = new Set(listPhoto.map((photo) => photo.albumId));

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center ">
        <h3 className="font-bold">Select your album</h3>
        <select
          id="albumSelector"
          name="albumSelector"
          className="h-3 w-5"
          onChange={(e) => setSelectedAlbum(Number(e.target.value))}
        >
          {Array.from(uniqueAlbumIds).map((album) => (
            <option key={album} value={album}>
              Album {album}
            </option>
          ))}
        </select>
      </div>

      {/* list photo */}
      <div className="grid grid-cols-2 gap-3">
        {listPhoto
          .filter((photo) => photo.albumId === selectedAlbum)
          .map((photo) => (
            <PhotoCard key={photo.id} {...photo} />
          ))}
      </div>
    </div>
  );
}

export default App;
