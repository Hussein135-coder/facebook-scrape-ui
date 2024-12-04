import React, { useEffect, useState } from "react";
import {
  getImages,
  API_URL,
  deleteImage,
  pagesInformation,
} from "../services/api.ts";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./index.css";

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

  console.log(images, "images");
  const handleDelete = async (filename: string) => {
    const response = await deleteImage(filename);
    if (response.success) {
      setImages(images.filter((image) => image !== filename));
    } else {
      alert("Failed to delete image");
    }
  };

  return (
    <div className="w-full max-w-4xl bg-slate-700 text-gray-50 p-8 rounded shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Screenshots</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.isArray(images) &&
          images.length > 0 &&
          images.map((src, index) => (
            <div key={index} className="relative">
              <h3 className="text-center font-semibold mb-3">
                {pagesInformation[src.slice(0, -5)] || "Page"}
              </h3>
              <img
                src={BASE_URL + src}
                alt={`Screenshot ${index + 1}`}
                className="w-full h-auto rounded shadow"
              />
              <IconButton
                onClick={() => handleDelete(src.replace("/screen/", ""))}
                className="absolute top-2 right-2 w-full delete-btn"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImageGallery;
