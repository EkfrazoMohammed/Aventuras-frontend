import React from 'react'
import "./scss/cms.scss";
import Iframe from 'react-iframe'
const StrapiCMS = () => {

    const RedirectPage = () => {
    
        window.open('https://aventurasdb.onrender.com/admin', '_blank');
    }
    return (
        <div>
            <button onClick={() => RedirectPage()}>Redirect to CMS</button>
        </div>
    )
}

export default StrapiCMS