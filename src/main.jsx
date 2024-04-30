/* eslint-disable no-unused-vars */
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import store from "./store/store";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store} loading={null}>
    {/* <PersistGate > */}
        <App />
    {/* </PersistGate> */}
  </Provider>
);
