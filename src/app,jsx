import { useState, useEffect } from "react";

export default function App() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    // Replace with your Google Drive file IDs
    const filesFromGoogleDrive = [
      { name: "TripData.csv", url: "https://drive.google.com/uc?export=download&id=YOUR_CSV_FILE_ID" },
      { name: "TripVideo.mp4", url: "https://drive.google.com/uc?export=download&id=YOUR_MP4_FILE_ID" },
    ];

    setFiles(filesFromGoogleDrive);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">CFD-FB4-BRNKL File Manager (Google Drive)</h1>
      
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
