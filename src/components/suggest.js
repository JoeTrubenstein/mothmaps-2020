import React, { useRef } from "react";
import Geosuggest from "react-geosuggest";
import "../assets/geosuggest.css"

function Suggest(props) {
  const geosuggestEl = useRef(null);

  const fixtures = [
    { label: "New York", location: { lat: 40.7033127, lng: -73.979681 } },
    { label: "Rio", location: { lat: -22.066452, lng: -42.9232368 } },
    { label: "Tokyo", location: { lat: 35.673343, lng: 139.710388 } },
  ];

  function onSuggestSelect(suggest) {
    // this if statement prevents a bug in which an empty input would crash the app
    if (suggest) {
      props.collectLocation(suggest.location);
    }
  }

  const google = window.google;


  return (
    <div         className="bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-teal-500 text-base text-white px-4 py-2 mb-4"
    >
      <Geosuggest
        style={{
          fontSize: `5rem`,
        }}
        ref={geosuggestEl}
        placeholder="Location"
        initialValue=""
        fixtures={fixtures}
        onSuggestSelect={onSuggestSelect}
        location={new google.maps.LatLng(53.558572, 9.9278215)}
        radius="20"
        name="location"
      />
      {/* <button onClick={() => geosuggestEl.current.focus()}>Focus</button>
      <button onClick={() => geosuggestEl.current.update("New Zealand")}>
        Update
      </button>
      <button onClick={() => geosuggestEl.current.clear()}>Clear</button>
      <button onClick={() => geosuggestEl.current.selectSuggest()}>
        Search
      </button> */}
    </div>
  );
}

export default Suggest;
