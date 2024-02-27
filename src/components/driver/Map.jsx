/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react";
import ReactMapGL, {
  Marker,
  Popup,
  NavigationControl,
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

const Map = () => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 0,
    longitude: 0,
    zoom: 10,
  });

  const [destination, setDestination] = useState({
    first: {
      latitude: 26.0711,
      longitude: 32.2778,
    },
    second: {
      latitude: 26.0053,
      longitude: 31.7733,
    },
    third: {
      latitude: 26.5569,
      longitude: 31.4997,
    },
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
      // console.log(viewport);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [viewport]);

  const handleZoomIn = () => {
    setViewport((prevViewport) => ({
      ...prevViewport,
      zoom: Math.min(prevViewport.zoom + 1, 20),
    }));
  };

  const handleZoomOut = () => {
    setViewport((prevViewport) => ({
      ...prevViewport,
      zoom: Math.max(prevViewport.zoom - 1, 1),
    }));
  };

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
        `https://api.mapbox.com/directions/v5/mapbox/driving/${viewport.longitude},${viewport.latitude};${
          destination.longitude
        },${
          destination.latitude
        }?steps=true&geometries=geojson&access_token=${"pk.eyJ1IjoiYWxhYWhhbWR5MiIsImEiOiJjbHNvcmJsZ2kwaHFlMm1rNXJkMWYxZjhkIn0.JKB_JwB_XSgRR2OJsjd5eA"}`
      );
      const data = await response.json();

      setDirections(data);
    };
    getRoute();
  }, [destination, viewport.latitude, viewport.longitude]);

  return (
    <div className="text-center w-100 p-3 pe-lg-0" style={{ height: "93vh" }}>
      <ReactMapGL {...viewport} mapStyle={mapStyle} mapboxAccessToken={TOKEN} onViewportChange={setViewport} dragPan={true}>
        <Marker draggable latitude={viewport.latitude} longitude={viewport.longitude} offsetLeft={-20} offsetTop={-10} />

        {destination && (
          <>
            <Marker
              latitude={destination.first.latitude}
              longitude={destination.first.longitude}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <div style={{ color: "#f1a525", fontSize: "35px" }}>
                <FaLocationDot />
              </div>
            </Marker>

            <Marker
              latitude={destination.second.latitude}
              longitude={destination.second.longitude}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <div style={{ color: "#f1a525", fontSize: "35px" }}>
                <FaLocationDot />
              </div>
            </Marker>
            <Marker
              latitude={destination.third.latitude}
              longitude={destination.third.longitude}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <div style={{ color: "#f1a525", fontSize: "35px" }}>
                <FaLocationDot />
              </div>
            </Marker>
          </>
        )}

        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <button
            onClick={handleZoomIn}
            style={{
              padding: "8px",
              background: "#fff",
              borderRadius: "4px",
              border: "1px solid #ccc",
              marginBottom: "4px",
              cursor: "pointer",
            }}
          >
            <FaPlus style={{ color: "#333" }} />
          </button>
          <button
            onClick={handleZoomOut}
            style={{
              padding: "8px",
              background: "#fff",
              borderRadius: "4px",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            <FaMinus style={{ color: "#333" }} />
          </button>
        </div>

        {/* <div>
          <GeolocateControl />
          <FullscreenControl />
       </div>*/}

        {viewport && destination && (
          <>
            <Popup
              latitude={destination.first.latitude}
              longitude={destination.first.longitude}
              closeButton={true}
              closeOnClick={false}
            >
              <div style={{ fontSize: 15 }}>First Location</div>
            </Popup>
            <Popup
              latitude={destination.second.latitude}
              longitude={destination.second.longitude}
              closeButton={true}
              closeOnClick={false}
            >
              <div style={{ fontSize: 15 }}>Second Location</div>
            </Popup>
            <Popup
              latitude={destination.third.latitude}
              longitude={destination.third.longitude}
              closeButton={true}
              closeOnClick={false}
            >
              <div style={{ fontSize: 15 }}>Third Location</div>
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
                  "line-color": "#331c41",
                  "line-width": 3,
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
