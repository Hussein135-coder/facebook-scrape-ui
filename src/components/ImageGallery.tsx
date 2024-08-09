import React, { useEffect, useState } from "react";
import { getImages, API_URL } from "../services/api.ts";

const BASE_URL = API_URL + "/screen/";

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const data = await getImages();
      setImages(data);
    };
    fetchImages();
  }, []);

  return (
    <div className="w-full max-w-4xl bg-white p-8 rounded shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Screenshots</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, index) => (
          <img
            key={index}
            src={BASE_URL + src}
            alt={`Screenshot ${index + 1}`}
            className="w-full h-auto rounded shadow"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
