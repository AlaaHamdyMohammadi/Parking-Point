// import React from "react";
import { useState } from "react";
import ReactMapGL from "react-map-gl";

// const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
// const TOKEN ="pk.eyJ1IjoiYWxhYWhhbWR5MiIsImEiOiJjbHNvcmJsZ2kwaHFlMm1rNXJkMWYxZjhkIn0.JKB_JwB_XSgRR2OJsjd5eA";
//mapStyle="mapbox://styles/alaahamdy2/clsoqyy67004801pk549pcyc4"
function Map() {
  const [viewPort, setViewPort] = useState({
    latitude: 30.475425,
    longitude: 31.1912051,
    width: "100vw",
    height: "100vw",
    zoom: 10,
    
  });
  return (
    <div>
      <ReactMapGL
        {...viewPort}
        mapboxAccessToken={
          "pk.eyJ1IjoiYWxhYWhhbWR5MiIsImEiOiJjbHNvcmJsZ2kwaHFlMm1rNXJkMWYxZjhkIn0.JKB_JwB_XSgRR2OJsjd5eA"
        }
        mapStyle={"mapbox://styles/alaahamdy2/clsoqyy67004801pk549pcyc4"}
        onViewportChange={(viewport) => setViewPort(viewport)}
      >
        
      </ReactMapGL>
    </div>
  );
}

export default Map;
