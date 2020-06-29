import React from "react"
import CookieConsent from "react-cookie-consent";

function CookieBanner() {
    return(
        <CookieConsent
        buttonText="Got it"
        cookieName="myAwesomeCookieName2"
        style={{
          background:
            "#2D3848"
        }}
        buttonStyle={{
          background:
            "#38B2AB",
          color: "white",
          fontWeight: "bolder",
        }}
      >
        This website uses cookies to enhance the user experience.{" "}
        <span style={{ fontSize: "10px" }}></span>
      </CookieConsent>
    )
}
export default CookieBanner;