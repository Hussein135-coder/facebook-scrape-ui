import { useState, useEffect, useRef } from "react";
import { getLog } from "../services/api";

const Log = () => {
  const [logContent, setLogContent] = useState<string>("");
  const logContainerRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const text = await getLog();
        setLogContent(text);

        // Scroll to bottom after content is loaded
        if (logContainerRef.current) {
          logContainerRef.current.scrollTop =
            logContainerRef.current.scrollHeight;
        }
      } catch (error) {
        console.error("Error fetching log:", error);
      }
    };

    fetchLog();

    // Optional: Set up polling to refresh logs every X seconds
    const interval = setInterval(fetchLog, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="w-full px-4 my-8">
      <h2 className="text-2xl font-bold text-gray-100 mb-4">Logs</h2>
      <pre
        ref={logContainerRef}
        className="w-full h-[500px] bg-gray-800 text-gray-100 p-4 rounded-lg overflow-auto font-mono text-sm whitespace-pre-wrap"
      >
        {logContent}
      </pre>
    </div>
  );
};

export default Log;
