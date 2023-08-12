import { renderToString } from "react-dom/server";

import {
  MapContainer,
  TileLayer,
  Polygon,
  Circle,
  Polyline,
  Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import tsrp from "./images/tsrp.png";

import { ChangeCenter } from "./ChangeCenter";

const icon = L.divIcon({
  className: "custom-icon",
  html: renderToString(
    <>
      <div
        style={{
          position: "absolute",
          left: "-25%",
          top: "-120%",
          width: "40px",
          height: "20px",
        }}
      >
        <div
          className="has-background-dark"
          style={{
            width: "17px",
            height: "17px",
            transform: "rotate(45deg)",
          }}
        ></div>
      </div>
      <div
        className="is-flex is-align-items-center has-background-dark"
        style={{
          position: "absolute",
          borderRadius: "6px",
          top: "-300%",
          left: "-315%",
        }}
      >
        <figure className="image is-24x24 mx-1">
          <img src={tsrp} style={{ width: "24px", height: "24px" }} />
        </figure>
        <p className="has-text-light is-size-5" style={{ width: "52px" }}>
          H-58
        </p>
      </div>
    </>
  ),
});

type Props = {
  latitude?: number;
  longitude?: number;
};

export const GSI = ({ latitude, longitude }: Props) => {
  const center: L.LatLngExpression = [
    latitude ?? 40.138633,
    longitude ?? 139.98485,
  ];
  // const position: L.LatLngExpression = [latitude ?? 0, longitude ?? 0];

  const position = center;

  return (
    <MapContainer
      zoomControl={false}
      center={center}
      zoom={17}
      style={{ position: "fixed", height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>'
        url="/map/tile/{z}/{x}/{y}.png"
      />
      <Marker position={position} autoPan={false} icon={icon} />
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
