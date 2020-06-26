import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Suggest from "./suggest";

const PUSH_SIGHTINGS = gql`
  mutation AddSighting($sighting: SightingInsertInput!) {
    sighting: insertOneSighting(data: $sighting) {
      _id
      description
      witness
      email
      submitDate
    }
  }
`;

const timestamp = Date.now();

function Contact() {
  // eslint-disable-next-line
  const [pushSighting, { data }] = useMutation(PUSH_SIGHTINGS);
  const [sightingObject, setSightingObject] = useState({});

  function collectWitness(event) {
    setSightingObject({
      ...sightingObject,
      witness: event.target.value,
      submitDate: new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }).format(timestamp),
    });
    console.log(sightingObject);
  }
  function collectLocation(suggest) {
    setSightingObject({
      ...sightingObject,
      location: suggest,
    });
    console.log(sightingObject);
  }
  function collectDescription(event) {
    setSightingObject({
      ...sightingObject,
      description: event.target.value,
    });
    console.log(sightingObject);
  }
  function collectEmail(event) {
    setSightingObject({
      ...sightingObject,
      email: event.target.value,
    });
    console.log(sightingObject);
  }

  async function handleSubmit(event) {
    await pushSighting({ variables: { sighting: sightingObject } })
  }

  return (
    <section className="text-gray-500 bg-gray-900 body-font relative">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
            Contact Us
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
            gentrify.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          name="contact"
          method="POST"
          netlify-honeypot="bot-field"
          data-netlify="true"
        >
          <p class="hidden">
            <label>
              Don’t fill this out if you're human: <input name="bot-field" />
            </label>
          </p>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <input
                  onChange={(e) => {
                    collectWitness(e);
                  }}
                  name="name"
                  required
                  className="w-full bg-gray-800 rounded border border-gray-700 text-white focus:outline-none focus:border-teal-500 text-base px-4 py-2"
                  placeholder="Name"
                  type="text"
                />
              </div>
              <div className="p-2 w-1/2">
                <input
                  onChange={(e) => {
                    collectEmail(e);
                  }}
                  required
                  className="w-full bg-gray-800 rounded border border-gray-700 text-white focus:outline-none focus:border-teal-500 text-base px-4 py-2"
                  placeholder="Email"
                  type="email"
                  name="email"
                />
              </div>
              <div className="p-2 w-full">
                <textarea
                  onChange={(e) => {
                    collectDescription(e);
                  }}
                  required
                  className="w-full bg-gray-800 rounded border border-gray-700 text-white focus:outline-none h-48 focus:border-teal-500 text-base px-4 py-2 resize-none block"
                  placeholder="Message"
                  defaultValue={""}
                  name="description"
                />
              </div>
              <div className="p-2 w-full focus:border-teal-500">
                <Suggest collectLocation={collectLocation} />
              </div>
              <div className="p-2 w-full">
                <button
                  type="submit"
                  className="flex mx-auto text-white bg-teal-500 border-0 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg"
                >
                  Button
                </button>
              </div>
              <div className="p-2 w-full pt-8 mt-8 border-t border-gray-800 text-center">
                <a
                  href="mailto: josephtrubenstein@gmail.com"
                  className="text-teal-500"
                >
                  josephtrubenstein@gmail.com
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;
