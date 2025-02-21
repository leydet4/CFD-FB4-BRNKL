// Fully updated script.js with Leaflet fix and alternative non-API tile provider (Small Map)
document.addEventListener("DOMContentLoaded", () => {
    const mapContainer = document.getElementById("map");
    if (!mapContainer) {
        console.error("Map container not found.");
        return;
    }

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

    // Apply small map size
    mapContainer.style.width = "400px";
    mapContainer.style.height = "300px";
    mapContainer.style.border = "2px solid black";
});
