import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class MapSearch extends Component {
  static defaultProps = {
    center: {
      lat: 40.7128,
      lng: -73.935242
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyD9zxNq0hPgKWsXAIdCsBCGyCoszWaRCEk'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={40.7128}
            lng={-74.0060}
            text="NYC"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapSearch;
