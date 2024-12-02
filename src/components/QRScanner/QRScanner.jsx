import React, { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import Styles from "./QRScanner.module.css"
import logo from "../../assets/icons/logo.svg"
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate()

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
          if(decodedText.startsWith("nft:")){
            window.localStorage.setItem("currentNFT", decodedText);
            navigate('/scan')
          }
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

        <div className={Styles.header}>
            <img src={logo} className={Styles.headerimage} alt="" />
            <p>SCAN</p>
        </div>

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
      <center><button onClick={startScanning} className={Styles.qrcode} style={{ margin: "10px", padding: "10px" }}>
        Start Scanning
      </button></center>

      {/* QR Code scanner view */}
      <div id="reader" style={{ width: "500px", margin: "20px auto" }}></div>

      {/* Scanned result */}
      <center><strong><p>Align QR</p></strong></center>
      <center><p>Status: {scannedData}</p></center>
    </div>
  );
};

export default QRScanner;
