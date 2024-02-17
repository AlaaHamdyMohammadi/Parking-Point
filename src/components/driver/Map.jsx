import { useState } from "react";
import ReactMapGL from "react-map-gl";
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
        mapboxAccessToken="pk.eyJ1IjoiYWxhYWhhbWR5MiIsImEiOiJjbHNvb2ZsZW8wZmhsMmtvNGY1aWhoa3RvIn0.9fguBMumjq11EyAoTX5W7w"
        mapStyle="mapbox://styles/alaahamdy2/clsoqyy67004801pk549pcyc4"
        onViewportChange={(viewport) => setViewPort(viewport)}
      >
        Here
      </ReactMapGL>
    </div>
  );
}

export default Map;
