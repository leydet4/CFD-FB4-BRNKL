// Fully updated script.js with Leaflet fix, proper initialization, and centered layout
document.addEventListener("DOMContentLoaded", () => {
    const mapContainer = document.getElementById("map");
    const videoContainer = document.getElementById("videoContainer");

    if (!mapContainer || !videoContainer) {
        console.error("Map or video container not found.");
        return;
    }

    try {
        // Initialize the Leaflet map
        window.map = L.map("map", {
            center: [36.721838, -76.242718],
            zoom: 14,
            zoomControl: true,
        });

        // Add a reliable free tile provider (CartoDB Positron)
        L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
            attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/'>CARTO</a>",
            subdomains: "abcd",
            maxZoom: 20
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
