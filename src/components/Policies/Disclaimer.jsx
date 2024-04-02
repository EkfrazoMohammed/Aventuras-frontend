import React, { useEffect } from 'react'
import "./Disclaimer.scss"
const Disclaimer = () => {
  useEffect(() => {

    window.scrollTo(0, 0);
  }, [])
  return (
    <div className="disclaimer-page-container">
      <div className="disclaimer-page-wrapper">

        <div className="disclaimer-text-container">
          <div className="heading">
            WEBSITE DISCLAIMER
          </div>
          <div className="desc-container">


            <div className="desc">
              The information contained in this website is for general information purposes only.
            </div>
            <div className="desc">
              The information is provided by Aventuras Holidays LLP and while we endeavour to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
            </div>
            <div className="desc">
              Any reliance you place on such information is therefore strictly at your own risk.

            </div>
            <div className="desc">
              In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.

            </div>
            <div className="desc">
              Through this website you are able to link to other websites which are not under the control of Aventuras Holidays LLP.
            </div>
            <div className="desc">
              We have no control over the nature, content and availability of those sites.
            </div>
            <div className="desc">
              The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.

            </div>
            <div className="desc">
              Every effort is made to keep the website up and running smoothly.
            </div>

            <div className="desc">
              However, Aventuras Holidays LLP takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Disclaimer