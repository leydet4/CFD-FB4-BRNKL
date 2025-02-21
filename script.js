// Fully updated script.js with Leaflet fix, proper initialization, and a stable tile provider
document.addEventListener("DOMContentLoaded", () => {
    const mapContainer = document.getElementById("map");
    const videoContainer = document.getElementById("videoContainer");

    if (!mapContainer || !videoContainer) {
        console.error("Map or video container not found.");
        return;
    }

    // Set fixed dimensions to make the map smaller and center it
    mapContainer.style.width = "300px";
    mapContainer.style.height = "200px";
    mapContainer.style.border = "2px solid black";
    mapContainer.style.margin = "10px auto";

    videoContainer.style.width = "300px";
    videoContainer.style.height = "200px";
    videoContainer.style.border = "2px solid black";
    videoContainer.style.margin = "10px auto";

    try {
        // Initialize the Leaflet map with a stable tile provider
        window.map = L.map("map", {
            center: [36.721838, -76.242718],
            zoom: 14,
            zoomControl: true,
        });

  // Use a reliable OpenStreetMap tile provider
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
    maxZoom: 18
}).addTo(window.map);

        // 🔄 Force the map to redraw after a slight delay
        setTimeout(() => {
            window.map.invalidateSize();
            window.map.eachLayer(layer => {
                if (layer instanceof L.TileLayer) {
                    layer.redraw();
                }
            });
        }, 500);

        window.addEventListener("resize", () => {
            window.map.invalidateSize();
        });
    } catch (error) {
        console.error("Error initializing Leaflet map:", error);
    }
});
