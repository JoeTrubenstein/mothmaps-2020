import React from "react";
import Burger from "./burger";
import AnchorLink from "react-anchor-link-smooth-scroll";

function NavBar() {
  return (
    <div className="bg-gray-900">
      <div className="mr-2 flex md:hidden w-screen items-right content-center">
        {/* Mobile menu button */}
        <Burger />
      </div>
      <nav className=" bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {/* <span className="text-3xl">💻</span> */}
              </div>
              <div className="hidden md:block">
                <div className="font-display ml-10 flex items-baseline">
                  <AnchorLink
                    href="#sights"
                    className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                  >
                    Sightings
                  </AnchorLink>
                  <AnchorLink
                    href="#map"
                    className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                  >
                    Map
                  </AnchorLink>
                  <AnchorLink
                    href="#contact"
                    className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                  >
                    Contact
                  </AnchorLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;