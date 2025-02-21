// Fully updated script.js with static map image instead of Leaflet tiles
document.addEventListener("DOMContentLoaded", () => {
    const mapContainer = document.getElementById("map");
    const videoContainer = document.getElementById("videoContainer");

    if (!mapContainer || !videoContainer) {
        console.error("Map or video container not found.");
        return;
    }

    // Set fixed dimensions and center the elements
    mapContainer.style.width = "300px";
    mapContainer.style.height = "200px";
    mapContainer.style.border = "2px solid black";
    mapContainer.style.margin = "10px auto";
    mapContainer.style.backgroundSize = "cover";
    mapContainer.style.backgroundPosition = "center";
    
    videoContainer.style.width = "300px";
    videoContainer.style.height = "200px";
    videoContainer.style.border = "2px solid black";
    videoContainer.style.margin = "10px auto";

    // Use a static OpenStreetMap image for the desired location
    let lat = 36.721838;
    let lon = -76.242718;
    let zoom = 14;
    
    mapContainer.style.backgroundImage = `url('https://static-maps.yandex.ru/1.x/?ll=${lon},${lat}&z=${zoom}&size=300,200&l=map')`;
});
