/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react";
import ReactMapGL, {
  Marker,
  Popup,
  Layer,
  Source,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FaLocationDot } from "react-icons/fa6";
import { FaPlus, FaMinus } from "react-icons/fa";

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const mapStyle = "mapbox://styles/alaahamdy2/clsp701hd005a01pkhrmygybf";

export default function LiveLocation() {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
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
    //   console.log("latitude", viewport.latitude);
    //   console.log("longitude", viewport.longitude);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [viewport]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactMapGL
        {...viewport}
        mapStyle={mapStyle}
        mapboxAccessToken={TOKEN}
        onViewportChange={setViewport}
        dragPan={true}
      >
        <Marker
          draggable
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          offsetLeft={-20}
          offsetTop={-10}
        />
      </ReactMapGL>
    </div>
  );
}
