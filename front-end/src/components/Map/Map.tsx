import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  origin: { latitude: number; longitude: number } | undefined;
  destination: { latitude: number; longitude: number } | undefined;
}

const Map: React.FC<MapProps> = ({ origin, destination }) => {
  useEffect(() => {
    console.log("Map props received:");
    console.log("Origin:", origin);
    console.log("Destination:", destination);
  }, [origin, destination]);

  if (!origin || !destination) {
    console.error("Origin or Destination is undefined");
    return (
      <p className='text-red-500'>Erro: Origem ou Destino não definidos.</p>
    );
  }

  // Converte para o formato [latitude, longitude]
  const originPosition: [number, number] = [origin.latitude, origin.longitude];
  const destinationPosition: [number, number] = [
    destination.latitude,
    destination.longitude,
  ];

  console.log("Processed positions:");
  console.log("Origin position:", originPosition);
  console.log("Destination position:", destinationPosition);

  // Função para criar ícones personalizados
  const createCustomIcon = (color: string) =>
    L.divIcon({
      html: `<div style="font-size: 24px; color: ${color}; text-align: center;">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="24px" height="24px">
                 <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
               </svg>
             </div>`,
      className: "custom-icon",
      iconSize: [24, 24],
      iconAnchor: [12, 24],
    });

  return (
    <div className='w-full h-64 mb-5'>
      <MapContainer
        center={originPosition}
        zoom={6}
        className='w-full h-full'
        whenReady={() => console.log("Map loaded successfully!")}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Marcador para origem */}
        <Marker position={originPosition} icon={createCustomIcon("blue")} />
        {/* Marcador para destino */}
        <Marker position={destinationPosition} icon={createCustomIcon("red")} />
        <Polyline
          positions={[originPosition, destinationPosition]}
          color='blue'
        />
      </MapContainer>
    </div>
  );
};

export default Map;
