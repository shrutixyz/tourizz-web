import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import Styles from "./Explore.module.css";
import { useSuiClientQuery } from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui.js/client";
import "leaflet/dist/leaflet.css";


function Explore() {
  const defaultPosition = [51.505, -0.09]; // London coordinates
  const [userPosition, setUserPosition] = useState(defaultPosition);
  const [markerList, setmarkerList] = useState([]);

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

  // get all markers
  const { data, isLoading, error } = useSuiClientQuery("getOwnedObjects", {
    // global owner
    owner: "0x1bd23d61b5f9c4b283feab4e16e231e4ba4e64b7d37ac8649ef2be89aca70aeb",
    showContent: true,
    showOwner: true,
  });

  useEffect(() => {
    // console.log(data, "data");
    if (data) {
      const dataArray = data.data; // Replace with actual object IDs
      const objectIDs = dataArray.map((item) => item.data?.objectId);
      // console.log(objectIDs, "befiore")
      getObjectDetails(objectIDs);
    }
  }, [data]);

  async function getObjectDetails(objectIds) {
    const rpcUrl = getFullnodeUrl("devnet"); // Use the appropriate network URL
    const data = {
      jsonrpc: "2.0",
      method: "sui_multiGetObjects",
      params: [
        objectIds,
        {
          showType: true,
          showOwner: true,
          showPreviousTransaction: true,
          showDisplay: true,
          showContent: true,
          showBcs: true,
          showStorageRebate: true,
        },
      ],
      id: 1,
    };

    try {
      const response = await fetch(rpcUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      result.result.pop(0);
      // console.log('Object Details:', result.result);

      setmarkerList(result.result);
    } catch (error) {
      console.error("Error fetching object details:", error);
    }
  }
  return (
    <section>
      <div className={Styles.titleBar}>
        <div className={Styles.titleLeft}>Home</div>
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
        {markerList &&
          markerList.map((marker) =>
            marker?.data.fields?.latitude && marker?.data.fields?.longitude
              ? (console.log(marker, "inside"),
                (
                  <Marker
                    key={marker?.data.fields?.id} // Ensure you provide a unique key for each marker
                    position={[
                      marker?.data.fields?.latitude,
                      marker?.data.fields?.longitude,
                    ]}
                    icon={customIcon}
                  >
                    <Popup>{marker?.data.fields?.name}</Popup>
                    <p>hello</p>
                  </Marker>
                ))
              : null
          )}
      </MapContainer>
    </section>
  );
}

export default Explore;
