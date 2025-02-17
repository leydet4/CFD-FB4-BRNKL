import React from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";

const tripData = [
  [37.7749, -122.4194],
  [37.7750, -122.4195],
  [37.7751, -122.4196],
]; // Replace with actual trip data

export default function TripDashboard() {
  return (
    <div>
      <h2>Trip Dashboard</h2>
      <MapContainer center={[37.7749, -122.4194]} zoom={13} style={{ height: "400px", width: "600px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Polyline positions={tripData} color="blue" />
      </MapContainer>
    </div>
  );
}
