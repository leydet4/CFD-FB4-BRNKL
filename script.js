document.addEventListener("DOMContentLoaded", () => {
    const mapContainer = document.getElementById("map");
    const videoContainer = document.getElementById("videoContainer");
    const pageContainer = document.getElementById("pageContainer");

    if (!mapContainer || !videoContainer || !pageContainer) {
        console.error("Map, video, or page container not found.");
        return;
    }

    // Center the containers
    pageContainer.style.display = "flex";
    pageContainer.style.flexDirection = "column";
    pageContainer.style.alignItems = "center";
    pageContainer.style.justifyContent = "center";
    pageContainer.style.height = "100vh";

    // Set fixed dimensions
    const elementWidth = "400px";
    const elementHeight = "250px";

    mapContainer.style.width = elementWidth;
    mapContainer.style.height = elementHeight;
    mapContainer.style.border = "2px solid black";
    mapContainer.style.marginBottom = "20px";
    mapContainer.style.backgroundSize = "cover";
    mapContainer.style.backgroundPosition = "center";

    videoContainer.style.width = elementWidth;
    videoContainer.style.height = elementHeight;
    videoContainer.style.border = "2px solid black";

    // Use OpenStreetMap static image
    let lat = 36.721838;
    let lon = -76.242718;
    let zoom = 14;

    mapContainer.style.backgroundImage = `url('https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=400&height=250&center=lonlat:${lon},${lat}&zoom=${zoom}&apiKey=YOUR_GEOAPIFY_API_KEY')`;
});
