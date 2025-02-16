import React, { useState } from "react";

export default function GoogleDriveUploader() {
  const CLIENT_ID = "389164732560-sl13gsa3dhvkaqkrkp178t1pe10346nr.apps.googleusercontent.com";
  const API_KEY = "AIzaSyBt9wvoThTjQojZOw5csu5o9n2DUlqwF1o"; // Get from Google Cloud
  const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
  const SCOPES = "https://www.googleapis.com/auth/drive.file";

  const [isSignedIn, setIsSignedIn] = useState(false);

  function handleAuthClick() {
    window.gapi.auth2.getAuthInstance().signIn();
  }

  function handleSignOutClick() {
    window.gapi.auth2.getAuthInstance().signOut();
  }

  function initClient() {
    window.gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(() => {
        const authInstance = window.gapi.auth2.getAuthInstance();
        setIsSignedIn(authInstance.isSignedIn.get());
        authInstance.isSignedIn.listen(setIsSignedIn);
      });
  }

  function handleFileUpload(event) {
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
      headers: new Headers({ Authorization: `Bearer ${window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token}` }),
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
      {!isSignedIn ? (
        <button onClick={handleAuthClick}>Sign in with Google</button>
      ) : (
        <>
          <button onClick={handleSignOutClick}>Sign Out</button>
          <input type="file" onChange={handleFileUpload} />
        </>
      )}
    </div>
  );
}
