import { GoogleMap } from 'map-loader';

const googleMapsAPIKey = "AIzaSyD9zxNq0hPgKWsXAIdCsBCGyCoszWaRCEk";

/* Options for how the map should initially render. */
const mapOptions = {
  center: {
    lat: 47.649196,
    lng: -122.350384
  },
  zoom: 12
}

/* Options for loading the Maps JS API. */
const apiOptions = {
  version: 'weekly',
  libraries: ['places']
}

/*
 * Set ID of the div where the map will be loaded,
 * and whether to append to that div.
 */
const mapLoaderOptions = {
  apiKey: googleMapsAPIKey,
  divId: 'google_map',
  append: true, // Appends to divId. Set to false to init in divId.
  mapOptions: mapOptions,
  apiOptions: apiOptions
};

export const mapLoader = new GoogleMap();

// Load the map
mapLoader
  .initMap(mapLoaderOptions)
  .then(googleMap => {
    // returns instance of google.maps.Map
  });

/*import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from "react-instantsearch-dom";
import { GoogleMapsLoader, GeoSearch, CustomMarker } from "react-instantsearch-dom-maps";

const searchClient = algoliasearch(
  'JP955S508F',
  '3de80a48e4011b0c171789a11801fb58'
);

const MapSearch = () => (
  <InstantSearch indexName="businesses" searchClient={searchClient}>
    <div style={{ height: 500 }}>
      <GoogleMapsLoader apiKey="AIzaSyD9zxNq0hPgKWsXAIdCsBCGyCoszWaRCEk">
        {google => (
          <GeoSearch google={google}>
            {({ hits }) => (
              <div>
                {hits.map(hit => (
                  <CustomMarker key={hit.objectID} hit={hit}>
                    <span style={{ backgroundColor: "#FFF", fontSize: "1rem" }}>
                      {hit.city}
                    </span>
                  </CustomMarker>
                ))}
              </div>
            )}
          </GeoSearch>
        )}
      </GoogleMapsLoader>
    </div>
  </InstantSearch>
);


export default MapSearch
*/
