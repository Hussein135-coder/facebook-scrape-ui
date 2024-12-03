import ConfigForm from "./ConfigForm";
import ImageGallery from "./ImageGallery";

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-50 my-8">
        Facebook Scraper Configuration
      </h1>
      <ConfigForm />
      <ImageGallery />
    </div>
  );
};

export default Home;
