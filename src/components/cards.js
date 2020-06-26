import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import axios from "axios";

const THE_SIGHTINGS = gql`
  query {
    sightings(query: { isApproved: true }, limit: 3, sortBy: SEENDATE_DESC) {
      _id
      description
      imageUrl
      isApproved
      seenDate
      submitDate
      witness
      location {
        lat
        lng
      }
    }
  }
`;

function Cards() {
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

  return (
    <section className="text-gray-500 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -mx-4 -my-8">
          {data ? (
            <>
              {data.sightings.map((sight) => (
                <div key={sight._id} className="py-8 px-4 lg:w-1/3">
                  <div className="h-full flex items-start">
                    <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                      <span className="text-gray-600 pb-2 mb-2 border-b-2 border-gray-800">
                        New
                      </span>
                      <span className="font-medium text-xl text-gray-300 title-font">
                        {""}
                      </span>
                    </div>
                    <div className="flex-grow pl-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-teal-500 mb-1">
                        lat: {sight.location.lat}
                        <br />
                        lng: {sight.location.lng}
                      </h2>
                      <h1 className="title-font text-l font-medium text-white mb-3">
                        {sight.submitDate}
                      </h1>
                      <p className="leading-relaxed mb-5">
                        {sight.description}
                      </p>
                      <a href="../" className="inline-flex items-center">
                        <img
                          alt="blog"
                          src="https://dummyimage.com/103x103"
                          className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center"
                        />
                        <span className="flex-grow flex flex-col pl-3">
                          <span className="title-font font-medium text-white">
                            {sight.witness}
                          </span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <div className="py-8 px-4 lg:w-1/3">
                <div className="h-full flex items-start">
                  <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                    <span className="text-gray-600 pb-2 mb-2 border-b-2 border-gray-800">
                      New
                    </span>
                    <span className="font-medium text-xl text-gray-300 title-font">
                      {""}
                    </span>
                  </div>
                  <div className="flex-grow pl-6">
                    <h2 className="tracking-widest text-xs title-font font-medium text-teal-500 mb-1">
                      lat: "loading"
                      <br />
                      lng: "loading"
                    </h2>
                    <h1 className="title-font text-l font-medium text-white mb-3">
                      "loading"
                    </h1>
                    <p className="leading-relaxed mb-5">"loading"</p>
                    <a href="../" className="inline-flex items-center">
                      <img
                        alt="blog"
                        src="https://dummyimage.com/103x103"
                        className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center"
                      />
                      <span className="flex-grow flex flex-col pl-3">
                        <span className="title-font font-medium text-white">
                          "loading"
                        </span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="py-8 px-4 lg:w-1/3">
                <div className="h-full flex items-start">
                  <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                    <span className="text-gray-600 pb-2 mb-2 border-b-2 border-gray-800">
                      New
                    </span>
                    <span className="font-medium text-xl text-gray-300 title-font">
                      {""}
                    </span>
                  </div>
                  <div className="flex-grow pl-6">
                    <h2 className="tracking-widest text-xs title-font font-medium text-teal-500 mb-1">
                      lat: "loading"
                      <br />
                      lng: "loading"
                    </h2>
                    <h1 className="title-font text-l font-medium text-white mb-3">
                      "loading"
                    </h1>
                    <p className="leading-relaxed mb-5">"loading"</p>
                    <a href="../" className="inline-flex items-center">
                      <img
                        alt="blog"
                        src="https://dummyimage.com/103x103"
                        className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center"
                      />
                      <span className="flex-grow flex flex-col pl-3">
                        <span className="title-font font-medium text-white">
                          "loading"
                        </span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="py-8 px-4 lg:w-1/3">
                <div className="h-full flex items-start">
                  <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                    <span className="text-gray-600 pb-2 mb-2 border-b-2 border-gray-800">
                      New
                    </span>
                    <span className="font-medium text-xl text-gray-300 title-font">
                      {""}
                    </span>
                  </div>
                  <div className="flex-grow pl-6">
                    <h2 className="tracking-widest text-xs title-font font-medium text-teal-500 mb-1">
                      lat: "loading"
                      <br />
                      lng: "loading"
                    </h2>
                    <h1 className="title-font text-l font-medium text-white mb-3">
                      "loading"
                    </h1>
                    <p className="leading-relaxed mb-5">"loading"</p>
                    <a href="../" className="inline-flex items-center">
                      <img
                        alt="blog"
                        src="https://dummyimage.com/103x103"
                        className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center"
                      />
                      <span className="flex-grow flex flex-col pl-3">
                        <span className="title-font font-medium text-white">
                          "loading"
                        </span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
export default Cards;
