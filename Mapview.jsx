import React from "react";
import { GoogleMap, LoadScript, Marker, Circle } from "@react-google-maps/api";

const containerStyle = { width: "100%", height: "100%" };
const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // India

// 🔹 Hardcode your API key here
const GOOGLE_MAPS_API_KEY = "xxxx";

export default function MapView({ points, onMapClick, radius }) {
  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={points[0] || defaultCenter}
        zoom={5}
        onClick={(e) =>
          onMapClick({ lat: e.latLng.lat(), lng: e.latLng.lng() })
        }
      >
        {points.length > 0 &&
          points.map((p, i) => <Marker key={i} position={p} />)}

        {points.length > 0 &&
          points.map((p, i) => (
            <Circle
              key={i}
              center={p}
              radius={radius * 1000}
              options={{ fillColor: "blue", fillOpacity: 0.2, strokeColor: "blue" }}
            />
          ))}
      </GoogleMap>
    </LoadScript>
  );
}
