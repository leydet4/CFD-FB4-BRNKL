import React from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";

export default function TripDashboard({ videoSrc, tripData }) {
  return (
    <div>
      <h2>Trip Dashboard</h2>
      <video width="600" controls>
        <source src={videoSrc} type="video/mp4" />
      </video>
      <MapContainer center={[0, 0]} zoom={2} style={{ height: "400px", width: "600px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Polyline positions={tripData} color="blue" />
      </MapContainer>
    </div>
  );
}
