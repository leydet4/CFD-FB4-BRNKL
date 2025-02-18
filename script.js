// Updated script.js to process GNSS CSV file
document.addEventListener("DOMContentLoaded", () => {
    let map = L.map("map").setView([36.721838, -76.242718], 14);
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
        let [timestamp, latitude, longitude, fix, hdop, cog, sog] = line.split(",");
        return { 
            timestamp: parseInt(timestamp), 
            lat: parseFloat(latitude), 
            lon: parseFloat(longitude), 
            cog: parseFloat(cog),
            sog: parseFloat(sog)
        };
    }).filter(d => !isNaN(d.timestamp));
    
    plotTrack(data);
    setupTimestampSlider(data);
}

function plotTrack(data) {
    let coordinates = data.map(d => [d.lat, d.lon]);
    let polyline = L.polyline(coordinates, { color: "blue" }).addTo(map);
    if (coordinates.length) map.setView(coordinates[0], 14);
}

function setupTimestampSlider(data) {
    let slider = document.getElementById("timestampSlider");
    slider.min = 0;
    slider.max = data.length - 1;
    slider.addEventListener("input", (e) => {
        let index = parseInt(e.target.value);
        let timestamp = data[index]?.timestamp;
        syncVideo(timestamp);
    });
}

function syncVideo(timestamp) {
    let videoName = `video_${timestamp}.mp4`;
    let workerURL = "https://fancy-frog-1682.cfdmarineteam.workers.dev/get-file/";
    document.getElementById("videoPlayer").src = workerURL + videoName;
}
