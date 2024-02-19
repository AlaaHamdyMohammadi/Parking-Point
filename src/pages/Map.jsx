/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import ReactMapGL, {
  Marker,
  Popup,
  NavigationControl,
  Layer,
  Source,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const mapStyle = "mapbox://styles/alaahamdy2/clsp701hd005a01pkhrmygybf";

const Map = () => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 0,
    longitude: 0,
    zoom: 10,
  });

  // const [userLocation, setUserLocation] = useState({
  //   latitude: 0,
  //   longitude: 0,
  // });

  const [destination, setDestination] = useState({
    first: {
      latitude: 30.4659284,
      longitude: 30.9305801,
    },
    second: {
      latitude: 31.106999572,
      longitude: 30.94082957,
    },
    third: {
      latitude: 30.58768,
      longitude: 31.502,
    },
  });

  // useEffect(() => {
  //   const watchId = navigator.geolocation.watchPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       setUserLocation({ latitude, longitude });
  //       console.log(userLocation)
  //     },
  //     (error) => console.error(error),
  //     { enableHighAccuracy: true }
  //   );

  //   return () => navigator.geolocation.clearWatch(watchId);
  // }, []);

  // const handleMapClick = (event) => {
  //   const [longitude, latitude] = event.lngLat;
  //   setDestination({ latitude, longitude });
  // };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setViewport((prevViewport) => ({
          ...prevViewport,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      });
      console.log(viewport);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactMapGL
        {...viewport}
        mapStyle={mapStyle}
        mapboxAccessToken={
          "pk.eyJ1IjoiYWxhYWhhbWR5MiIsImEiOiJjbHNvcmJsZ2kwaHFlMm1rNXJkMWYxZjhkIn0.JKB_JwB_XSgRR2OJsjd5eA"
        }
        onViewportChange={setViewport}
      >
        <Marker
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <div>You are here</div>
        </Marker>

        {destination && (
          <>
            <Marker
              latitude={destination.first.latitude}
              longitude={destination.first.longitude}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <div style={{ color: "red" }}>Destination</div>
            </Marker>

            <Marker
              latitude={destination.second.latitude}
              longitude={destination.second.longitude}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <div style={{ color: "green" }}>Destination</div>
            </Marker>
            <Marker
              latitude={destination.third.latitude}
              longitude={destination.third.longitude}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <div style={{ color: "blue" }}>Destination</div>
            </Marker>
          </>
        )}

        {viewport && (
          <NavigationControl
            style={{ position: "absolute", top: 10, left: 10 }}
          />
        )}

        {viewport && destination && (
          <>
            <Popup
              latitude={destination.first.latitude}
              longitude={destination.first.longitude}
              closeButton={false}
              closeOnClick={false}
            >
              <div>Destination</div>
            </Popup>
            <Popup
              latitude={destination.second.latitude}
              longitude={destination.second.longitude}
              closeButton={false}
              closeOnClick={false}
            >
              <div>Destination</div>
            </Popup>
            <Popup
              latitude={destination.third.latitude}
              longitude={destination.third.longitude}
              closeButton={false}
              closeOnClick={false}
            >
              <div>Destination</div>
            </Popup>
          </>
        )}

        {viewport && destination && (
          <div>
            <Source
              type="geojson"
              data={{
                type: "Feature",
                properties: {},
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [destination.first.longitude, destination.first.latitude],
                    [viewport.longitude, viewport.latitude],
                    [destination.second.longitude, destination.second.latitude],
                    [viewport.longitude, viewport.latitude],
                    [destination.third.longitude, destination.third.latitude],
                  ],
                },
              }}
            >
              <Layer
                type="line"
                paint={{
                  "line-color": "#FF5733",
                  "line-width": 10,
                }}
              />
            </Source>
          </div>
        )}
      </ReactMapGL>
    </div>
  );
};

export default Map;
