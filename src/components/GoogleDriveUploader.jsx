import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

const CLIENT_ID = "389164732560-sl13gsa3dhvkaqkrkp178t1pe10346nr.apps.googleusercontent.com"; // Replace with your actual Client ID

export default function GoogleDriveUploader() {
  const [accessToken, setAccessToken] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (response) => {
      setAccessToken(response.access_token);
      console.log("Logged in, Access Token:", response.access_token);
    },
    onError: (error) => console.error("Login Failed", error),
    scope: "https://www.googleapis.com/auth/drive.file",
    flow: "implicit",
  });

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
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div>
        <h2>Google Drive Uploader</h2>
        <button onClick={() => login()}>Sign in with Google</button>
        <input type="file" onChange={handleFileUpload} disabled={!accessToken} />
      </div>
    </GoogleOAuthProvider>
  );
}
