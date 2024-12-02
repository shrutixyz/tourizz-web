import React, { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QRScanner = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [scannedData, setScannedData] = useState("No result");

  useEffect(() => {
    // Get the list of available cameras
    Html5Qrcode.getCameras()
      .then((devices) => {
        setDevices(devices);
        if (devices && devices.length) {
          setSelectedDeviceId(devices[0].id); // Default to the first camera
        }
      })
      .catch((err) => {
        console.error("Error getting cameras:", err);
      });
  }, []);

  const startScanning = () => {
    if (!selectedDeviceId) {
      alert("No camera selected!");
      return;
    }

    const html5QrCode = new Html5Qrcode("reader");
    html5QrCode
      .start(
        selectedDeviceId,
        {
          fps: 10, // Frames per second
          qrbox: 250, // Size of the scanning box
        },
        (decodedText) => {
          setScannedData(decodedText); // Handle the scanned data
        },
        (error) => {
          console.warn("QR Code scan error:", error);
        }
      )
      .catch((err) => {
        console.error("Unable to start scanning:", err);
      });

    // Optional: Clear scanner on unmount
    return () => {
      html5QrCode.stop().catch((err) => console.error("Error stopping scanner:", err));
    };
  };

  return (
    <div>
      <h1>QR Code Scanner with Camera Selection</h1>

      {/* Camera selection dropdown */}
      <div>
        <label htmlFor="camera-select">Choose a camera:</label>
        <select
          id="camera-select"
          onChange={(e) => setSelectedDeviceId(e.target.value)}
          value={selectedDeviceId || ""}
        >
          {devices.map((device, index) => (
            <option key={device.id} value={device.id}>
              {device.label || `Camera ${index + 1}`}
            </option>
          ))}
        </select>
      </div>

      {/* Start scanning button */}
      <button onClick={startScanning} style={{ margin: "10px", padding: "10px" }}>
        Start Scanning
      </button>

      {/* QR Code scanner view */}
      <div id="reader" style={{ width: "500px", margin: "20px auto" }}></div>

      {/* Scanned result */}
      <p>Scanned Data: {scannedData}</p>
    </div>
  );
};

export default QRScanner;
