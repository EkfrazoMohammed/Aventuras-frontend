import React, { useState, useEffect, useRef } from 'react';
import { Carousel, Skeleton } from 'antd'
import "./Testimonial.scss";
import { baseURL } from "../../../api/apirequest";
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
const Testimonial = ({ data, contactData, loading }) => {
  const [googleLink, setGoogleLink] = useState('')
  useEffect(() => {
    setGoogleLink(contactData?.data[0]?.attributes?.google_reviews)
  }, [])

  const ref = useRef();
  return (
    <div className="testimonial-section">
      <div id="google-reviews"></div>
      {
        loading ?
          (<><Skeleton active /></>)
          :
          (<>
            <div className="testimonial-container">
              <div className="upper">
                <div className="section-title">
                  What customer say about us
                </div>

                <div className="additional">

                  <button role='button' type='button' className="image" onClick={() => ref.current.prev()}>
                    <img className='img' loading="lazy" src={`https://admin.aventuras.co.in/uploads/arrow_right_b4d68d463d.png?updated_at=2023-03-24T12:13:32.807Z`} alt="arrow" width="20" height="20" style={{ transform: 'rotate(-180deg)' }} />
                  </button>
                  <button role='button' type='button' className="image" onClick={() => ref.current.next()}>
                    <img className='img' loading="lazy" src={`https://admin.aventuras.co.in/uploads/arrow_right_b4d68d463d.png?updated_at=2023-03-24T12:13:32.807Z`} alt="arrow" width="20" height="20" />
                  </button>

                </div>
              </div>

              <div className="middle">

                <Link to={googleLink} target="_blank" className="review-link">
                  <div className="text">
                    Click here to view our Google reviews
                    &nbsp;
                    <StarIcon sx={{ color: "yellow" }} />
                    <StarIcon sx={{ color: "yellow" }} />
                    <StarIcon sx={{ color: "yellow" }} />
                    <StarIcon sx={{ color: "yellow" }} />

                    <StarIcon sx={{ color: "yellow" }} />
                  </div>
                </Link>
              </div>

              <div className="bottom">
                <div className="testimonial-content">
                  <Carousel effect="fade"
                    dotPosition="bottom"
                    dots={false}
                    pauseOnHover={false}
                    autoplaySpeed={2500}
                    ref={ref}

                  >
                    {data.data.sort((a, b) => a.id > b.id ? 1 : -1).map((val) => {
                      return (
                        <>
                          <div className="testimonial-content-wrapper">
                            <div className="image-content">
                              <img className='img' loading="lazy"
                                src={`${baseURL}${val?.attributes?.Image?.data?.attributes?.url}`}
                                alt={`${baseURL}${val?.attributes?.Image?.data?.attributes?.name}`}
                              />
                            </div>

                            <div className="text-content">
                              <div className="quotes">
                                {val?.attributes?.Review}
                              </div>

                              <div className="author">
                                - {val?.attributes?.Name}
                              </div>
                            </div>
                          </div>
                        </>
                      )
                    })}
                  </Carousel>
                </div>
              </div>
            </div>
          </>)}
    </div >

  )
}

export default Testimonial
