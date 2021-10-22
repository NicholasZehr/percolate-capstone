import React, { useEffect, useState} from 'react';
import GoogleMapReact from 'google-map-react';
import {
  GeoSearch,
  Control,
  Marker,
} from 'react-instantsearch-dom-maps';
/*resources for algolia search
https://www.algolia.com/doc/api-reference/widgets/geo-search/js/
https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/
https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/how-to/filter-results-around-a-location/?client=javascript*/

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const MapSearch =()=> {
  let [center, setCenter] = useState({})
  useEffect(()=>{
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    var crd = pos.coords;
    setCenter({lat: crd.latitude, lng: crd.longitude});
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options)},[]);
    return (
      // Important! Always set the container height explicitly
      center.lng?(
      <div id="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyD9zxNq0hPgKWsXAIdCsBCGyCoszWaRCEk'}}
          defaultCenter={center}
          defaultZoom={14}
        >
          {google => (
      <GeoSearch google={google}>
        {({ hits }) => (
          <div>
            <Control />
            {hits.map(hit => (
              <Marker key={hit.objectID} hit={hit} />
            ))}
          </div>
        )}
      </GeoSearch>
    )}
          <AnyReactComponent
            lat={40.7128}
            lng={-74.0060}
            text="NYC"
          />
        </GoogleMapReact>
      </div>):(<h1>loading location...</h1>)
    );
}

export default MapSearch;
