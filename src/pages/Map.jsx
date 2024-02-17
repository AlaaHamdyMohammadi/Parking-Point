// import React from "react";
import { useState } from "react";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
//const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
// mapStyle = "mapbox://styles/alaahamdy2/clsoqyy67004801pk549pcyc4";
function Map() {
  const [viewport, setViewport] = useState({
    latitude: 30.475425,
    longitude: 31.1912051,
    zoom: 10,
  });

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactMapGL
        {...viewport}
        mapboxAccessToken={"pk.eyJ1IjoiYWxhYWhhbWR5MiIsImEiOiJjbHNvcmJsZ2kwaHFlMm1rNXJkMWYxZjhkIn0.JKB_JwB_XSgRR2OJsjd5eA"}
        width="100%"
        height="100%"
        transitionDuration="200"
        mapStyle={"mapbox://styles/alaahamdy2/clsp701hd005a01pkhrmygybf"}
        // onViewportChange={(viewport) => setViewport(viewport)}
      ></ReactMapGL>
    </div>
  );
}

export default Map;
