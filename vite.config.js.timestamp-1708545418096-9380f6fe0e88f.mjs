// vite.config.js
import { defineConfig, loadEnv } from "file:///B:/Freelance/E-Parking/E-parking_USER/node_modules/vite/dist/node/index.js";
import react from "file:///B:/Freelance/E-Parking/E-parking_USER/node_modules/@vitejs/plugin-react/dist/index.mjs";
var cherryPickedKeys = [
  "REACT_APP_MAPBOX_TOKEN"
];
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const processEnv = {};
  cherryPickedKeys.forEach((key) => processEnv[key] = env[key]);
  return {
    define: {
      "process.env": processEnv
    },
    plugins: [react()]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJCOlxcXFxGcmVlbGFuY2VcXFxcRS1QYXJraW5nXFxcXEUtcGFya2luZ19VU0VSXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJCOlxcXFxGcmVlbGFuY2VcXFxcRS1QYXJraW5nXFxcXEUtcGFya2luZ19VU0VSXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9COi9GcmVlbGFuY2UvRS1QYXJraW5nL0UtcGFya2luZ19VU0VSL3ZpdGUuY29uZmlnLmpzXCI7LyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5cclxuY29uc3QgY2hlcnJ5UGlja2VkS2V5cyA9IFtcclxuICBcIlJFQUNUX0FQUF9NQVBCT1hfVE9LRU5cIixcclxuICBcclxuXTtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcclxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCksIFwiXCIpO1xyXG4gIGNvbnN0IHByb2Nlc3NFbnYgPSB7fTtcclxuICBjaGVycnlQaWNrZWRLZXlzLmZvckVhY2goKGtleSkgPT4gKHByb2Nlc3NFbnZba2V5XSA9IGVudltrZXldKSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBkZWZpbmU6IHtcclxuICAgICAgXCJwcm9jZXNzLmVudlwiOiBwcm9jZXNzRW52LFxyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IFtyZWFjdCgpXSxcclxuICB9O1xyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU8sV0FBVztBQUVsQixJQUFNLG1CQUFtQjtBQUFBLEVBQ3ZCO0FBRUY7QUFHQSxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN4QyxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxHQUFHLEVBQUU7QUFDM0MsUUFBTSxhQUFhLENBQUM7QUFDcEIsbUJBQWlCLFFBQVEsQ0FBQyxRQUFTLFdBQVcsR0FBRyxJQUFJLElBQUksR0FBRyxDQUFFO0FBRTlELFNBQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxNQUNOLGVBQWU7QUFBQSxJQUNqQjtBQUFBLElBQ0EsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ25CO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
