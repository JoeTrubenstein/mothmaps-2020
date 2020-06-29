import React from "react";
import Contact from "../components/contact";
import Hero from "../components/hero";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Cards from "../components/cards";
import MapSection from "../components/mapSection";
import CookieBanner from "../components/cookieBanner";
import SEO from "../components/seo";

function App() {
  return (
    <div>
      <SEO />
      <Navbar />
      <Hero />
      <Cards />
      <MapSection />
      <Contact />
      <Footer />
      <CookieBanner />
    </div>
  );
}

export default App;
