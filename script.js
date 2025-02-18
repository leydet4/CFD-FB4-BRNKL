// Full script.js for CFD-FB4-BRNKL Web App

document.addEventListener("DOMContentLoaded", () => {
    let map = L.map("map").setView([37.7749, -122.4194], 10);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);
});

async function uploadFiles() {
    let csvFile = document.getElementById("csvUpload").files[0];
    let videoFile = document.getElementById("videoUpload").files[0];
    if (!csvFile || !videoFile) return alert("Please upload both CSV and MP4 files");

    let csvText = await csvFile.text();
    processCSV(csvText);
}

function processCSV(csvText) {
    let lines = csvText.split("\n");
    let data = lines.slice(1).map(line => {
        let [lat, lon, sog, heading, timestamp] = line.split(",");
        return { lat: parseFloat(lat), lon: parseFloat(lon), timestamp };
    });
    plotTrack(data);
}

function plotTrack(data) {
    let coordinates = data.map(d => [d.lat, d.lon]);
    let polyline = L.polyline(coordinates, { color: "blue" }).addTo(map);
    if (coordinates.length) map.setView(coordinates[0], 12);
}

function syncVideo(timestamp) {
    let videoName = `video_${timestamp}.mp4`;
    let workerURL = "https://fancy-frog-1682.cfdmarineteam.workers.dev/get-file/";
    document.getElementById("videoPlayer").src = workerURL + videoName;
}

document.getElementById("timestampSlider").addEventListener("input", (e) => {
    let index = parseInt(e.target.value);
    let timestamp = csvData[index]?.timestamp;
    syncVideo(timestamp);
});
