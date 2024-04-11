import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const MetaLinks = ({Title,Description,imageURL,description,descriptionContent}) => {
    const url = 'https://aventuras-frontend.vercel.app'
  return (
    <Helmet>
    <title>{Title}</title>
    <meta property="og:title" content={Title}/>
    <meta property="og:image" content={imageURL}/>
    <meta property="og:url" content={url + window.location.pathname + window.location.search}/>
    <meta property="og:description" content={description}/>
    <meta property="description" content={descriptionContent}/>
    <meta name="twitter:image:alt" content="Alt text for image"/>
    </Helmet>

  )
}

export default MetaLinks