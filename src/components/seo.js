import React from "react";
import { Helmet } from "react-helmet";

function SEO(){
    return(
        <Helmet>
        <title>The MothMaps Project</title>
        <meta name="description" content="MothMaps is a project dedicated to the collection and curation of MothMan sightings." />
        <meta name="keywords" content="mothman, cryptid, indrid cold, cryptozoology, moth, mothmap, mothmaps" />
      </Helmet>
    )
}

export default SEO;