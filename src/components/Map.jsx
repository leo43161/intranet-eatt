import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import "leaflet-defaulticon-compatibility";
import { useMemo, useRef, useState } from 'react';

export default function Map({ position, setState }) {
    const [_position, setPosition] = useState(position)
    const markerRef = useRef(null)

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    const { lat, lng } = marker.getLatLng()
                    setPosition(marker.getLatLng());
                    setState([lat, lng]); // Aquí se actualizan las coordenadas
                }
            },
        }),
        [setState],
    )

    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
                draggable={true}
                position={_position}
                eventHandlers={eventHandlers}
                ref={markerRef}
            ></Marker>
        </MapContainer>
    )
}