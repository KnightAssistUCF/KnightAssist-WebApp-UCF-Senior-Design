import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import './MapContainer.css';
import { Component } from "react";

console.log(process.env)
const mapStyles = {
	width: '300px',
	height: '300px',
};

class MapContainer extends Component {
	constructor(props) {
	  super(props);
	}
  
	render() {
	  return (
		<div className="mapSize">
			<Map
				google={this.props.google}
				zoom={8}
				style={mapStyles}
				initialCenter={{ lat: this.props.lat, lng: this.props.lng}}
			>
				<Marker title={this.props.title}
					position={{
					lat: this.props.lat,
					lng: this.props.lng
				}}/>
			</Map>
		</div>
	  );
	}
  }


export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer);