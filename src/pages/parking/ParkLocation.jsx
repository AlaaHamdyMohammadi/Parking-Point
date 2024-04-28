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

const ParkLocation = ({ location, title, address }) => {
  //   console.log(location);
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

  return (
    <div
      style={{ width: "100vw", height: "45vh" }}
      className="col-12 col-md-10"
    >
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

        <Marker
          latitude={location.latitude}
          longitude={location.longitude}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <div style={{ color: "#f1a525", fontSize: "35px" }}>
            <FaLocationDot />
          </div>
        </Marker>

        <div
          style={{
            position: "absolute",
            top: 85,
            right: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
            showUserLocation={true}
          />
          <FullscreenControl />
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

        <Popup
          latitude={location.latitude}
          longitude={location.longitude}
          closeButton={true}
          closeOnClick={false}
        >
          <div style={{ fontSize: 20 }}>{title}</div>
        </Popup>

        <Source
          id="route"
          type="geojson"
          data={{
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [viewport.longitude, viewport.latitude],
                    [location.longitude, location.latitude],
                  ],
                },
              },
            ],
          }}
        >
          <Layer
            id="lineLayer"
            type="line"
            source="route"
            layout={{
              "line-join": "round",
              "line-cap": "round",
            }}
            paint={{
              "line-color": "#331c41",
              "line-width": 3,
            }}
          />
        </Source>
      </ReactMapGL>
    </div>
  );
};

export default ParkLocation;
