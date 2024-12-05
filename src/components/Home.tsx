import { useNavigate } from "react-router-dom";
import ConfigForm from "./ConfigForm";
import ImageGallery from "./ImageGallery";
import useDataContext from "../hooks/useDataContext";
import { restartServer } from "../services/api";
import Log from "./Log";

const Home = () => {
  const navigate = useNavigate();

  // Context Data
  const { userLogout } = useDataContext();

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-50 my-8">
        Facebook Scraper Configuration
      </h1>
      <div className="flex gap-4 mb-8">
        <button
          onClick={async () => {
            try {
              const response = await restartServer();
              if (response.success == false) {
                alert(response.msg);
              } else {
                alert("Server restarted successfully");
              }
            } catch (error) {
              alert("Server restarted successfully");
            }
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Restart Server
        </button>
        <button
          onClick={() => {
            userLogout(navigate);
          }}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <ConfigForm />
      <ImageGallery />
      <Log />
    </div>
  );
};

export default Home;
