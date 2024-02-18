/* eslint-disable no-unused-vars */
// import React from "react";
import { useEffect, useState } from "react";
import ReactMapGL, {
  FullscreenControl,
  GeolocateControl,
  Layer,
  Marker,
  NavigationControl,
  Source,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

//const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const mapStyle = "mapbox://styles/alaahamdy2/clsp701hd005a01pkhrmygybf";

function Map() {
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 10,
  });

  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);

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

  const handleMarkerDrag = (event) => {
    setDestination({
      latitude: event.lngLat[1],
      longitude: event.lngLat[0],
    });
  };

  useEffect(() => {
    if (!destination) return;

    const getRoute = async () => {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${
          viewport.longitude
        },${viewport.latitude};${destination.longitude},${
          destination.latitude
        }?steps=true&geometries=geojson&access_token=${"pk.eyJ1IjoiYWxhYWhhbWR5MiIsImEiOiJjbHNvcmJsZ2kwaHFlMm1rNXJkMWYxZjhkIn0.JKB_JwB_XSgRR2OJsjd5eA"}`
      );
      const data = await response.json();

      setDirections(data);
    };
    getRoute();
  }, [destination, viewport.latitude, viewport.longitude]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactMapGL
        {...viewport}
        mapboxAccessToken={
          "pk.eyJ1IjoiYWxhYWhhbWR5MiIsImEiOiJjbHNvcmJsZ2kwaHFlMm1rNXJkMWYxZjhkIn0.JKB_JwB_XSgRR2OJsjd5eA"
        }
        width="100%"
        height="100%"
        transitionDuration="200"
        mapStyle={mapStyle}
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        <GeolocateControl />
        <FullscreenControl />
        <NavigationControl />
        <Marker
          draggable
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          offsetLeft={-20}
          offsetTop={-10}
        />
         

        {destination && (
          <Marker
            latitude={destination.latitude}
            longitude={destination.longitude}
            offsetLeft={-20}
            offsetTop={-10}
            draggable
            onDragEnd={handleMarkerDrag}
          />
           
        )}

        {directions && directions.routes && directions.routes[0] && (
          <Source type="geojson" data={directions.routes[0].geometry}>
            <Layer
              id="route"
              type="line"
              paint={{
                "line-color": "#008cbf",
                "line-width": 5,
              }}
            />
          </Source>
        )}
      </ReactMapGL>
    </div>
  );
}

export default Map;
