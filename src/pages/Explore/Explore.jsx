import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import Styles from "./Explore.module.css";

// Custom Marker Icon
const customIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png", // URL to your custom marker image
  iconSize: [40, 40], // Size of the icon
  iconAnchor: [20, 40], // Anchor point of the icon (half of width and height)
  popupAnchor: [0, -40], // Popup position relative to the icon
});

// Component to handle map centering
const UpdateMapCenter = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [map, position]);
  return null;
};

const Explore = () => {
  const defaultPosition = [51.505, -0.09]; // London coordinates
  const [userPosition, setUserPosition] = useState(defaultPosition);

  // Attempt to get user's actual location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Error fetching geolocation:", error);
        }
      );
    }
  }, []);

  return (
    <section>
      <div className={Styles.titleBar}>
        <div className={Styles.titleLeft}>
            Home
        </div>
      </div>
      <MapContainer
        center={defaultPosition}
        zoom={13}
        style={{ height: "80vh", width: "80%" }}
      >
        {/* Update map center dynamically */}
        <UpdateMapCenter position={userPosition} />

        {/* Dark mode Tile Layer */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
        />

        {/* Marker with Custom Icon */}
        <Marker position={userPosition} icon={customIcon}>
          <Popup>
            You are here!
            <br />
            Latitude: {userPosition[0]}, Longitude: {userPosition[1]}
          </Popup>
        </Marker>
      </MapContainer>
    </section>
  );
};

export default Explore;