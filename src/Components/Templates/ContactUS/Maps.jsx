import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import SectionTitle from "../../Common/SectionTitle";

const Maps = () => {
  const positions = [
    [40.343181409042735, -74.65508634245779],
    [38.64898219087405, -90.3108069336372],
  ];

  return (
    <div className="my-10 space-y-10">
      <div className="">
        <SectionTitle text={"Princeton University"} />
        <MapContainer
          className="w-full h-100"
          center={positions[0]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={positions[0]}>
            <Popup>Princeton University </Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="">
        <SectionTitle text={"Washington University in St. Louis"} />

        <MapContainer
          className="w-full h-[400px]"
          center={positions[1]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={positions[1]}>
            <Popup>Washington University in St. Louis </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Maps;
