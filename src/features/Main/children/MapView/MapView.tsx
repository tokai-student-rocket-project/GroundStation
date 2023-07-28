import {
  MapContainer,
  TileLayer,
  Marker,
  Polygon,
  Circle,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { ChangeCenter } from "./children/ChangeCenter";

type Props = {
  latitude?: number;
  longitude?: number;
};

export const MapView = ({ latitude, longitude }: Props) => {
  const center: L.LatLngExpression = [latitude ?? 0, longitude ?? 0];

  return (
    <MapContainer
      zoomControl={false}
      center={[40.138633, 139.98485]}
      zoom={17}
      style={{ position: "fixed", height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>'
        url="https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg"
      />
      <Marker position={center} />
      <ChangeCenter center={[40.138633, 139.98485]} />
      <Circle
        center={[40.138633, 139.98485]}
        pathOptions={{
          color: "magenta",
          stroke: false,
        }}
        radius={75}
      />
      <Circle
        center={[40.138633, 139.98485]}
        pathOptions={{ color: "magenta" }}
        radius={5}
      />
      <Polyline
        pathOptions={{ color: "magenta" }}
        positions={[
          [40.138633, 139.98485],
          [40.138288, 139.984472],
        ]}
      />
      <Polygon
        pathOptions={{ color: "magenta", fill: false }}
        positions={[
          [40.1349508, 139.981351],
          [40.1347478, 139.981871],
          [40.135639, 139.983324],
          [40.138053, 139.985781],
          [40.1400941, 139.986823],
          [40.1411762, 139.988142],
          [40.1420251, 139.985234],
        ]}
      />
    </MapContainer>
  );
};
