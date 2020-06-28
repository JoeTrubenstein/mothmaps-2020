import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import axios from "axios";
import Modal from "./modal";
import CustomMap from "./customMap";

const THE_SIGHTINGS = gql`
  query {
    sightings(query: { isApproved: true }, sortBy: SEENDATE_DESC) {
      description
      witness
      submitDate
      location {
        lat
        lng
      }
    }
  }
`;

function MapSection(props) {
  // we need to use a LazyQuery or else apollo will try to fetch our data before our auth token is refreshed - causing a 401

  const [getSightings, { loading, error, data }] = useLazyQuery(THE_SIGHTINGS);

  if (loading) console.log("fetching gql data");
  if (error) console.log(error);

  const [showModal, setShowModal] = useState(false);
  const [markerData, setMarkerData] = useState({});

  function toggleModal(props) {
    setMarkerData(props);
    setShowModal(true);
  }

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

  return (
    <section id="map"className="bg-gray-900 lg:p-12 md:p-4 sm:p-2">
      {/* Child components, such as markers, info windows, etc. */}
      {data ? (
        <div>
          <CustomMap
            id="myMap"
            options={{
              center: { lat: 41.0082, lng: 28.9784 },
              zoom: 2,
              styles: [
                {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
                {elementType: 'labels.text.stroke', stylers: [{color: '#238B2AB'}]},
                {elementType: 'labels.text.fill', stylers: [{color: '#38B2AB'}]},
                {
                  featureType: 'administrative.locality',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#38B2AB'}]
                },
                {
                  featureType: 'poi',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#d59563'}]
                },
                {
                  featureType: 'poi.park',
                  elementType: 'geometry',
                  stylers: [{color: '#263c3f'}]
                },
                {
                  featureType: 'poi.park',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#6b9a76'}]
                },
                {
                  featureType: 'road',
                  elementType: 'geometry',
                  stylers: [{color: '#38414e'}]
                },
                {
                  featureType: 'road',
                  elementType: 'geometry.stroke',
                  stylers: [{color: '#212a37'}]
                },
                {
                  featureType: 'road',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#9ca5b3'}]
                },
                {
                  featureType: 'road.highway',
                  elementType: 'geometry',
                  stylers: [{color: '#746855'}]
                },
                {
                  featureType: 'road.highway',
                  elementType: 'geometry.stroke',
                  stylers: [{color: '#1f2835'}]
                },
                {
                  featureType: 'road.highway',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#f3d19c'}]
                },
                {
                  featureType: 'transit',
                  elementType: 'geometry',
                  stylers: [{color: '#2f3948'}]
                },
                {
                  featureType: 'transit.station',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#d59563'}]
                },
                {
                  featureType: 'water',
                  elementType: 'geometry',
                  stylers: [{color: '#1A212C'}]
                },
                {
                  featureType: 'water',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#515c6d'}]
                },
                {
                  featureType: 'water',
                  elementType: 'labels.text.stroke',
                  stylers: [{color: '#2D3848'}]
                }
              ]
            }}
            onMapLoad={(map) => {
              data.sightings.forEach((sight) => {
                var marker = new window.google.maps.Marker({
                  position: sight.location,
                  map: map,
                  title: "Hello Istanbul!",
                });
                marker.addListener("click", (e) => {
                  toggleModal(sight);
                });
                console.log(sight.location);
              });
            }}
          />
        </div>
      ) : (
        <div>{console.log("map loading")}</div>
      )}
      <></>
      {showModal ? <Modal data={markerData} toggle={setShowModal} /> : <></>}
    </section>
  );
}
export default React.memo(MapSection);
