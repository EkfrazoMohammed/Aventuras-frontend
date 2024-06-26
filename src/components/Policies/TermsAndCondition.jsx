import React, { useEffect } from 'react'
import "./TermsAndCondition.scss"

const TermsAndCondition = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <div className="terms-and-condition-page-container">
      <div className="terms-and-condition-page-wrapper">
        <div className="terms-and-condition-text-container">
          <div className="heading">
            TERMS AND CONDITION
          </div>
          <div className="para-container">
            <div className="sections">
              <div className="para">
                Welcome to our website. If you continue to browse and use this website you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern Aventuras Holidays LLP relationship with you in relation to this website.
              </div>
              <div className="para">
                The term 'tour planners' or 'us' or 'we' or 'our' refers to the owner of the website whose registered office is #15/2, S type housing colony, Adityapur, Jamshedpur, Jharkhand-831013. We are a Limited Liability firm. The term 'you' refers to the user or viewer of our website.
              </div>
              <div className="para">
                The use of this website is subject to the following terms of use:
              </div>
              <div className="list-container">
                <ul className="list-wrapper">
                  <li className="list-items">
                    The content of the pages of this website is for your general information and use only. It is subject to change without notice.
                  </li>

                  <li className="list-items">
                    Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
                  </li>
                  <li className="list-items">
                    Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.
                  </li>
                  <li className="list-items">
                    This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
                  </li>


                  <li className="list-items">
                    All trademarks reproduced in this website which are not the property of, or licensed to, the operator are acknowledged on the website.
                  </li>

                  <li className="list-items">
                    Unauthorised use of this website may give rise to a claim for damages and/or be a criminal offence.
                  </li>
                  <li className="list-items">
                    From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).
                  </li>
                  <li className="list-items">
                    You may not create a link to this website from another website or document without our prior written consent.
                  </li>

                  <li className="list-items">
                    Your use of this website and any dispute arising out of such use of the website is subject to the laws of India or other regulatory authority.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsAndCondition