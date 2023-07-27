import {
  MapContainer,
  TileLayer,
  Marker,
  Polygon,
  Circle,
  Rectangle,
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
  // const center: L.LatLngExpression = [
  //   latitude ?? 35.365125672890144,
  //   longitude ?? 139.27351746038084,
  // ];

  const center: L.LatLngExpression = [40.138633, 139.98485];

  return (
    <MapContainer
      zoomControl={false}
      center={center}
      zoom={17}
      style={{ position: "fixed", height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>'
        url="https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg"
      />
      <Marker position={center} />
      <ChangeCenter center={center} />
      <Circle
        center={[40.138633, 139.98485]}
        pathOptions={{ color: "magenta" }}
        radius={10}
      />
      <Polygon
        pathOptions={{ color: "magenta" }}
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
