export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path.startsWith("/get-files")) {
      return getDriveFiles();
    } else if (path.startsWith("/get-file/")) {
      const fileName = path.replace("/get-file/", "");
      return getFileByName(fileName);
    }

    return new Response("Invalid request", { status: 400 });
  },
};

async function getDriveFiles() {
  const folderId = env.GDRIVE_FOLDER_ID;
  const apiUrl = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${env.GDRIVE_API_KEY}`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  return new Response(JSON.stringify(data.files), {
    headers: { "Content-Type": "application/json" },
  });
}

async function getFileByName(fileName) {
  const folderId = env.GDRIVE_FOLDER_ID;
  const apiUrl = `https://www.googleapis.com/drive/v3/files?q=name='${fileName}' and '${folderId}' in parents&key=${env.GDRIVE_API_KEY}`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  if (data.files.length === 0) {
    return new Response("File not found", { status: 404 });
  }

  const fileId = data.files[0].id;
  const downloadUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${env.GDRIVE_API_KEY}`;

  return fetch(downloadUrl);
}
