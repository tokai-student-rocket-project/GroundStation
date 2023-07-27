import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

type ChangeCenterProps = {
  center: L.LatLngExpression;
};

export const ChangeCenter = (props: ChangeCenterProps) => {
  const { center } = props;
  const map = useMap();

  try {
    map.setView(center);
    // eslint-disable-next-line no-empty
  } catch {}

  return null;
};
