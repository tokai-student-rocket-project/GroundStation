import {
  MapContainer,
  TileLayer,
  Marker,
  Polygon,
  Circle,
  Polyline,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import tsrp from "./images/tsrp.png";
import "./gsi.css";

import { ChangeCenter } from "./ChangeCenter";

type Props = {
  latitude?: number;
  longitude?: number;
};

export const GSI = ({ latitude, longitude }: Props) => {
  const center: L.LatLngExpression = [
    latitude ?? 40.138633,
    longitude ?? 139.98485,
  ];
  const position: L.LatLngExpression = [latitude ?? 0, longitude ?? 0];

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
      <Popup position={position} closeButton={false}>
        <div className="is-flex is-align-items-center">
          <figure className="image is-24x24">
            <img src={tsrp} />
          </figure>
          <p className="has-text-light is-size-5" style={{ marginLeft: "4px" }}>
            H-58
          </p>
        </div>
      </Popup>
      <ChangeCenter center={center} />
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
