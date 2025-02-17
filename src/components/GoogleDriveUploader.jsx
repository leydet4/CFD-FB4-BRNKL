import React, { useEffect, useState } from "react";

export default function GoogleDriveUploader() {
  const CLIENT_ID = "389164732560-sl13gsa3dhvkaqkrkp178t1pe10346nr.apps.googleusercontent.com";
  const API_KEY = "AIzaSyBt9wvoThTjQojZOw5csu5o9n2DUlqwF1o";
  const SCOPES = "const SCOPES = "https://www.googleapis.com/auth/drive";
";
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    
    script.onload = () => {
      google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (response) => {
          setAccessToken(response.access_token);
        }
      });
    };
  }, []);

  function handleAuthClick() {
    google.accounts.oauth2.requestAccessToken();
  }

  function handleFileUpload(event) {
    if (!accessToken) {
      alert("Please sign in first.");
      return;
    }

    const file = event.target.files[0];
    if (!file) return;

    const metadata = {
      name: file.name,
      mimeType: file.type,
    };

    const form = new FormData();
    form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
    form.append("file", file);

    fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: form,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("File uploaded:", data);
        alert("File uploaded successfully!");
      })
      .catch((error) => console.error("Error uploading file:", error));
  }

  return (
    <div>
      <h2>Google Drive Uploader</h2>
      <button onClick={handleAuthClick}>Sign in with Google</button>
      <input type="file" onChange={handleFileUpload} disabled={!accessToken} />
    </div>
  );
}
