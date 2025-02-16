import { useState, useEffect } from "react";

export default function App() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    // Replace with actual file fetching logic
    const filesFromCloud = [
      { name: "TripData.csv", url: "https://your-storage-link/TripData.csv" },
      { name: "TripVideo.mp4", url: "https://your-storage-link/TripVideo.mp4" }
    ];
    setFiles(filesFromCloud);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">CFD-FB4-BRNKL File Manager</h1>
      <h2 className="text-xl font-bold mt-6">Uploaded Files</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}