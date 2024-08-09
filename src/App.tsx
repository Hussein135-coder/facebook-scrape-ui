import React from "react";
import ConfigForm from "./components/ConfigForm.tsx";
import ImageGallery from "./components/ImageGallery.tsx";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-4xl font-bold my-8">
        Facebook Scraper Configuration
      </h1>
      <ConfigForm />
      <ImageGallery />
    </div>
  );
};

export default App;
