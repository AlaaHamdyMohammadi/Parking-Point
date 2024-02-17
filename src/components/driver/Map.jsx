// import React from "react"; 
import { useEffect, useState } from "react";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

//const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
//mapStyle="mapbox://styles/alaahamdy2/clsoqyy67004801pk549pcyc4"
function Map() {
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 10,
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setViewport((prevViewport) => ({
          ...prevViewport,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactMapGL
        {...viewport}
        mapboxAccessToken={"pk.eyJ1IjoiYWxhYWhhbWR5MiIsImEiOiJjbHNvcmJsZ2kwaHFlMm1rNXJkMWYxZjhkIn0.JKB_JwB_XSgRR2OJsjd5eA"}
        width="100%"
        height="100%"
        transitionDuration="200"
        mapStyle={"mapbox://styles/alaahamdy2/clsp701hd005a01pkhrmygybf"}
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        <Marker draggable latitude={viewport.latitude} longitude={viewport.longitude} offsetLeft={-20} offsetTop={-10} />

        <NavigationControl position="bottom-right" />
      </ReactMapGL>
    </div>
  );
}

export default Map;
