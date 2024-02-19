//import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import './MapContainer.css';

const mapStyles = {
	width: '300px',
	height: '225px',
};

function MapContainer(props){

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
	})

	return (
		isLoaded ? (
			<div className="mapPosition">
				<GoogleMap
					zoom={15}
					mapContainerStyle={mapStyles}
					center={{ lat: props.lat, lng: props.lng}}
				>
					<Marker title={props.title}
						position={{
						lat: props.lat,
						lng: props.lng
					}}/>
				</GoogleMap>
			</div>)
		: null
	);
}

export default MapContainer;