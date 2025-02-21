// Fully updated script.js with Leaflet fix, proper initialization, and smaller map
document.addEventListener("DOMContentLoaded", () => {
    const mapContainer = document.getElementById("map");
    const videoContainer = document.getElementById("videoContainer");

    if (!mapContainer || !videoContainer) {
        console.error("Map or video container not found.");
        return;
    }

    // Set fixed dimensions to make the map smaller
    mapContainer.style.width = "300px";
    mapContainer.style.height = "200px";
    mapContainer.style.border = "2px solid black";
    mapContainer.style.margin = "10px auto";

    videoContainer.style.width = "300px";
    videoContainer.style.height = "200px";
    videoContainer.style.border = "2px solid black";
    videoContainer.style.margin = "10px auto";

    try {
        // Initialize the Leaflet map with a smaller view
        window.map = L.map("map", {
            center: [36.721838, -76.242718],
            zoom: 14,
            zoomControl: true,
        });

        // Use a different tile provider to fix tiling issue
        L.tileLayer("https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors, Tiles courtesy of HOT OSM",
            maxZoom: 19
        }).addTo(window.map);

        // Ensure the map resizes properly
        setTimeout(() => {
            window.map.invalidateSize();
        }, 500);

        window.addEventListener("resize", () => {
            window.map.invalidateSize();
        });
    } catch (error) {
        console.error("Error initializing Leaflet map:", error);
    }
});
