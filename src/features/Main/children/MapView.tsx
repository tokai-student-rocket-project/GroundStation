import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

type ChangeCenterProps = {
  center: L.LatLngExpression;
};

const ChangeCenter = (props: ChangeCenterProps) => {
  const { center } = props;
  const map = useMap();

  try {
    map.setView(center);
    // eslint-disable-next-line no-empty
  } catch {}

  return null;
};

export const MapView = () => {
  const [center, setCenter] = useState<L.LatLngExpression>([
    35.365125672890144, 139.27351746038084,
  ]);

  return (
    <MapContainer
      zoomControl={false}
      center={center}
      zoom={16}
      style={{ position: "fixed", height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>'
        url="https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg"
      />
      <Marker position={center} />
      <ChangeCenter center={center} />
    </MapContainer>
  );
};
