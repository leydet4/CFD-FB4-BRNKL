// Fully updated script.js with Leaflet fix and alternative non-API tile provider (Centered Map & Video)
document.addEventListener("DOMContentLoaded", () => {
    const mapContainer = document.getElementById("map");
    const videoContainer = document.getElementById("videoContainer");
    const pageContainer = document.getElementById("pageContainer");

    if (!mapContainer || !videoContainer || !pageContainer) {
        console.error("One or more containers not found.");
        return;
    }

    // Center the containers
    pageContainer.style.display = "flex";
    pageContainer.style.flexDirection = "column";
    pageContainer.style.alignItems = "center";
    pageContainer.style.justifyContent = "center";
    pageContainer.style.height = "100vh";

    // Ensure map and video have the same size
    const elementWidth = "500px";
    const elementHeight = "350px";

    mapContainer.style.width = elementWidth;
    mapContainer.style.height = elementHeight;
    mapContainer.style.border = "2px solid black";
    mapContainer.style.marginBottom = "20px";

    videoContainer.style.width = elementWidth;
    videoContainer.style.height = elementHeight;
    videoContainer.style.border = "2px solid black";

    window.map = L.map("map", {
        center: [36.721838, -76.242718],
        zoom: 14,
        zoomControl: true,
    });

    // Alternative free tile provider (CartoDB Positron)
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/'>CARTO</a>",
        subdomains: "abcd",
        maxZoom: 20
    }).addTo(window.map);

    window.marker = null;

    // 🔄 Force Leaflet to fully reload tiles
    setTimeout(() => {
        window.map.invalidateSize();
        window.map.eachLayer(layer => {
            if (layer instanceof L.TileLayer) {
                layer.redraw();
            }
        });
    }, 1000);

    window.addEventListener("resize", () => {
        window.map.invalidateSize();
    });
});
