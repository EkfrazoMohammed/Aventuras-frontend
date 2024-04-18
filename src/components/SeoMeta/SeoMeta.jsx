import React from 'react'
import { Helmet } from 'react-helmet-async';

const SeoMeta = ({Title,Description,imageURL,description,descriptionContent}) => {
const url = 'https://aventuras-frontend.vercel.app'

  return (
    <>
    <Helmet>
    <title>{Title}</title>
    <meta property="og:title" name="title" content={Title}/>
    <meta property="og:image" name='image' content={imageURL}/>
    <meta property="og:url" content={url + window.location.pathname + window.location.search}/>
    <meta property="og:description" name='description' content={description}/>

    <meta property="description" content={descriptionContent}/>
    <meta name="twitter:image:alt" content="Alt text for image"/>
    </Helmet>
    </>
  )
}

export default SeoMeta