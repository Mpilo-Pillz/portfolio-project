import React, { CSSProperties, useEffect, useRef } from "react";
import { googleMapsLocations } from "../../../models/Place";

import "./Map.css";

declare global {
  interface Window {
    initMap: () => void;
  }
}

interface MapProps {
  className?: string;
  style?: CSSProperties;
  center: googleMapsLocations;
  zoom: number;
}
const Map: React.FC<MapProps> = (props) => {
  const mapRef = useRef<any>();
  //   could have destructured from the arguemnt
  const { center, zoom } = props;

  useEffect(() => {
    const map = new (window as any).google.maps.Map(
      mapRef?.current as HTMLElement,
      {
        center,
        zoom,
      }
    );

    new (window as any).google.maps.Marker({
      position: center,
      map: map,
    });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
