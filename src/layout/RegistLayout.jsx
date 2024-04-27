import { Outlet } from "react-router-dom";

export default function RegistLayout() {
  return (
    <div style={{ minHeight: "35.5vw" }}>
      <Outlet />
    </div>
  );
}
