// Fully updated script.js with Leaflet fix and real-time video-map sync
document.addEventListener("DOMContentLoaded", () => {
    // Ensure map container exists and is properly styled
    const mapContainer = document.getElementById("map");
    if (!mapContainer) {
        console.error("Map container not found.");
        return;
    }

    // Initialize the Leaflet map
    window.map = L.map("map", {
        center: [36.721838, -76.242718],
        zoom: 14,
        zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19
    }).addTo(window.map);

    window.marker = null;

    // Force the map to resize properly after loading
    setTimeout(() => {
        window.map.invalidateSize();
    }, 1000);
});

// Ensure Leaflet map resizes when files are uploaded
function forceMapResize() {
    if (window.map) {
        setTimeout(() => {
            window.map.invalidateSize();
        }, 500);
    }
}

async function uploadFiles() {
    let csvFile = document.getElementById("csvUpload").files[0];
    let videoFile = document.getElementById("videoUpload").files[0];
    if (!csvFile || !videoFile) return alert("Please upload both CSV and MP4 files");

    let csvText = await csvFile.text();
    processCSV(csvText);

    // Force map to update size after file uploads
    forceMapResize();
}

function processCSV(csvText) {
    let lines = csvText.split("\n");
    window.trackData = lines.slice(1).map(line => {
        let [timestamp, latitude, longitude, fix, hdop, cog, sog] = line.split(",");
        return { 
            timestamp: parseInt(timestamp), 
            lat: parseFloat(latitude), 
            lon: parseFloat(longitude), 
            cog: parseFloat(cog),
            sog: parseFloat(sog)
        };
    }).filter(d => !isNaN(d.timestamp));
    
    plotTrack(window.trackData);
    setupTimestampSlider(window.trackData);
}

function plotTrack(data) {
    if (!window.map) {
        console.error("Map is not initialized.");
        return;
    }
    
    let coordinates = data.map(d => [d.lat, d.lon]);
    if (coordinates.length > 0) {
        let polyline = L.polyline(coordinates, { color: "blue" });
        polyline.addTo(window.map);
        window.map.setView(coordinates[0], 14);
    }
}

function setupTimestampSlider(data) {
    let slider = document.getElementById("timestampSlider");
    slider.min = 0;
    slider.max = data.length - 1;
    slider.addEventListener("input", (e) => {
        let index = parseInt(e.target.value);
        syncVideoAndMap(index);
    });
}

function syncVideoAndMap(index) {
    let data = window.trackData[index];
    if (!data) return;

    let videoName = `video_${data.timestamp}.mp4`;
    let workerURL = "https://fancy-frog-1682.cfdmarineteam.workers.dev/get-file/";
    document.getElementById("videoPlayer").src = workerURL + videoName;
    
    if (window.marker) {
        window.map.removeLayer(window.marker);
    }
    
    window.marker = L.marker([data.lat, data.lon]).addTo(window.map);
    window.map.setView([data.lat, data.lon], 14);
}

// Sync video playback with map movement
document.getElementById("videoPlayer").addEventListener("timeupdate", function() {
    if (!window.trackData) return;
    let currentTime = this.currentTime * 1000; // Convert to milliseconds
    let closestPoint = window.trackData.reduce((prev, curr) => 
        Math.abs(curr.timestamp - currentTime) < Math.abs(prev.timestamp - currentTime) ? curr : prev
    );
    
    let index = window.trackData.indexOf(closestPoint);
    syncVideoAndMap(index);
});
