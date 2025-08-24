import { useState } from "react";
import MapView from "./components/MapView";
import AdBanner from "./components/AdBanner";

function App() {
  const [points, setPoints] = useState([]);
  const [distance, setDistance] = useState(null);
  const [radius, setRadius] = useState(5);

  const calculateDistance = (p1, p2) => {
    const R = 6371; // km
    const dLat = ((p2.lat - p1.lat) * Math.PI) / 180;
    const dLng = ((p2.lng - p1.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((p1.lat * Math.PI) / 180) *
        Math.cos((p2.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const handleMapClick = (latLng) => {
    let newPoints = [...points, latLng];
    if (newPoints.length > 2) newPoints = [latLng];
    setPoints(newPoints);

    if (newPoints.length === 2) {
      setDistance(calculateDistance(newPoints[0], newPoints[1]));
    } else {
      setDistance(null);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f3f3", padding: "20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        Straight Line Distance Finder
      </h1>

      <div style={{ marginBottom: "20px" }}>
        <label>
          Circle Radius (km):
          <input
            type="number"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            style={{ marginLeft: "10px", padding: "5px", width: "60px" }}
            min={1}
          />
        </label>
      </div>

      <div style={{ width: "100%", height: "500px", marginBottom: "20px" }}>
        <MapView points={points} onMapClick={handleMapClick} radius={radius} />
      </div>

      {distance && (
        <div style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "10px", display: "inline-block", marginBottom: "20px" }}>
          <p style={{ fontWeight: "bold", margin: "5px 0" }}>Straight Line Distance:</p>
          <p style={{ fontSize: "18px", color: "blue", margin: "5px 0" }}>{distance.toFixed(2)} km</p>
        </div>
      )}

      <AdBanner />
    </div>
  );
}

export default App;
