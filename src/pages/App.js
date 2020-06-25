import React from "react";
import Contact from "../components/contact";
import Hero from "../components/hero"
import Footer from "../components/footer"
import Header from "../components/header"
import Cards from "../components/cards"
import Map from "../components/map"

function App() {
  return (
    <div>
      <Header />
      <Hero />
      <Cards />
      <Map/>
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
