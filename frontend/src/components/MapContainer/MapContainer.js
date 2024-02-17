import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import './MapContainer.css';
import { Component } from "react";

const mapStyles = {
	width: '300px',
	height: '225px',
};

class MapContainer extends Component {
	constructor(props) {
	  super(props);
	}
  
	render() {
	  return (
		<div className="mapPosition">
			<Map
				google={this.props.google}
				zoom={15}
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

//process.env.REACT_APP_GOOGLE_MAPS_API_KEY
export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer);