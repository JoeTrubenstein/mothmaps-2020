import React from "react";
import { slide as Menu } from "react-burger-menu";
import AnchorLink from "react-anchor-link-smooth-scroll";

import "../assets/header.css";

function Burger() {
  return (
    <Menu >
        <AnchorLink href="#sights">Sightings</AnchorLink>
        <br/>
        <AnchorLink href="#map">Map</AnchorLink>
        <br/>
        <AnchorLink href="#contact">Contact</AnchorLink>
    </Menu>
  );
}

export default Burger;
