import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerClusterer,
  Marker,
} from "@react-google-maps/api";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import axios from "axios";

const THE_SIGHTINGS = gql`
  query {
    sightings(query: { isApproved: true }, sortBy: SEENDATE_DESC) {
      location {
        lat
        lng
      }
    }
  }
`;

const containerStyle = {
  width: "100%",
  height: "80%",
  filter: "grayscale(.8) contrast(1.2) opacity(1)",
};

const options = {
  imagePath:
    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
};

function createKey(location) {
  return location.lat + location.lng;
}

function Map() {
  // we need to use a LazyQuery or else apollo will try to fetch our data before our auth token is refreshed - causing a 401
  const [getSightings, { loading, error, data }] = useLazyQuery(THE_SIGHTINGS);
  if (loading) console.log("fetching gql data");
  if (error) console.log(error);

  useEffect(() => {
    const refreshToken = async () => {
      axios
        .post(
          "https://realm.mongodb.com/api/client/v2.0/app/mothmaps-kicwt/auth/providers/api-key/login",
          { key: process.env.REACT_APP_SIGHT_KEY }
        )
        .then((res) => {
          console.log("refreshing your access token");
          localStorage.setItem("token", res.data.access_token);
          // only once our fresh token is in local storage will apollo try to fetch our data
          getSightings();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    refreshToken();
  }, [getSightings]);

  // map is defined in the state but not called
  // eslint-disable-next-line
  const [map, setMap] = useState("");

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const center = {
    lat: 40.6957755,
    lng: -73.91706039999997,
  };

  return (
    <section className="text-gray-500 bg-gray-900 body-font relative h-screen py-12">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={5}
          center={center}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* Child components, such as markers, info windows, etc. */}
          {data ? (
            <div>
              <MarkerClusterer options={options}>
                {(clusterer) =>
                  data.sightings.map((sight) => (
                    <Marker
                      key={createKey(sight.location)}
                      position={sight.location}
                      clusterer={clusterer}
                    />
                  ))
                }
              </MarkerClusterer>
            </div>
          ) : (
            <div>{console.log("markers loading")}</div>
          )}

          <></>
        </GoogleMap>
      </LoadScript>
    </section>
  );
}
export default React.memo(Map);