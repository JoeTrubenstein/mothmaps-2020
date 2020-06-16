import React from "react";

function Contact() {
  return (
    <section className="text-gray-500 bg-gray-900 body-font relative">
      <div className="container px-5 py-24 mx-auto flex sm:flex-no-wrap flex-wrap">
        <div className="lg:w-2/3 md:w-1/2 bg-gray-900 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
          <iframe
            width="100%"
            height="100%"
            title="map"
            className="absolute inset-0"
            frameBorder={0}
            marginHeight={0}
            marginWidth={0}
            scrolling="no"
            src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
            style={{ filter: "grayscale(1) contrast(1.2) opacity(0.16)" }}
          />
          <div className="bg-gray-900 relative flex flex-wrap py-6">
            <div className="lg:w-1/2 px-6">
              <h2 className="title-font font-medium text-white tracking-widest text-sm">
                A GLOBAL MOTHMAN
              </h2>
              <p className="leading-relaxed">
                Like the Mothman himself, his fans can be found all over the
                world. The Mothmaps project administrators are distributed
                between New York City and Tokyo.
              </p>
            </div>
            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
              <h2 className="title-font font-medium text-white tracking-widest text-sm">
                EMAIL
              </h2>
              <a className="text-teal-500 leading-relaxed">example@email.com</a>
              <h2 className="title-font font-medium text-white tracking-widest text-sm mt-4">
                PHONE
              </h2>
              <p className="leading-relaxed">123-456-7890</p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
          <h2 className="text-white text-lg mb-1 font-medium title-font">
            My Sighting
          </h2>
          <p className="leading-relaxed mb-5 text-gray-600">
            Tell us about your encounter
          </p>
          <input
            className="bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-teal-500 text-base text-white px-4 py-2 mb-4"
            placeholder="Name"
            type="text"
          />

          <input
            className="bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-teal-500 text-base text-white px-4 py-2 mb-4"
            placeholder="Email"
            type="email"
          />
          <input
            className="bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-teal-500 text-base text-white px-4 py-2 mb-4"
            placeholder="Location"
            type="text"
          />
          <textarea
            className="bg-gray-800 rounded border border-gray-700 focus:outline-none h-32 focus:border-teal-500 text-base text-white px-4 py-2 mb-4 resize-none"
            placeholder="Description"
            defaultValue={""}
          />
          <button className="text-white bg-teal-500 border-0 py-2 px-6 focus:outline-none hover:bg-teal-600 rounded text-lg">
            Button
          </button>
          <p className="text-xs text-gray-500 mt-3">
            All submissions will be taken seriously and replied to in the order
            in which they were received. Thank you greatly for contributing to
            the MothMan community. Keep your eyes on the skies.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
