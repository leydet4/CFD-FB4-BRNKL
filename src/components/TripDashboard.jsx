import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function TripDashboard({ videoSrc, tripData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);

  // Extract coordinates for the route
  const routeCoordinates = tripData.map((point) => [point.latitude, point.longitude]);

  // Function to sync video time with GPS data
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updatePosition = () => {
      if (video.currentTime >= 0 && video.currentTime < tripData.length) {
        setCurrentIndex(Math.floor(video.currentTime));
      }
    };

    video.addEventListener("timeupdate", updatePosition);
    return () => video.removeEventListener("timeupdate", updatePosition);
  }, [tripData]);

  return (
    <div className="dashboard-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>Trip Dashboard</h1>
      
      {/* Video Player */}
      <video ref={videoRef} width="640" height="360" controls>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Leaflet Map */}
      <MapContainer 
        center={routeCoordinates[0]} 
        zoom={12} 
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Polyline positions={routeCoordinates} color="blue" />
        <Marker position={routeCoordinates[currentIndex]} />
      </MapContainer>
    </div>
  );
}