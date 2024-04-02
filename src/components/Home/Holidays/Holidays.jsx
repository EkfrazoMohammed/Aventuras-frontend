import React, { useState, useEffect, useRef } from 'react';
import { Carousel, Skeleton } from 'antd'
import "./Holidays.scss";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { API, baseURL } from "../../../api/apirequest";
const Holidays = ({ data, loading }) => {

  const ref = useRef();
  const [value, setValue] = useState([])

  useEffect(() => {

    let filter = data.data.sort((a, b) => a.id > b.id ? 1 : -1).map((item) => {
      setValue((filt) => [...filt, item])
    });
  }, [])


  return (
    <div className="section">
      <div className="holidays-container">
        {
          loading ?
            (<><Skeleton active /></>)
            :
            (<>
              <div className="section-title">
                Family And Group Holidays
              </div>
              <div className="content-wrapper">
                <div className="additional top">
                  <button role='button' type='button' className="image" onClick={() => ref.current.prev()}>
                    <img className='img' loading="lazy"
                      src={`https://admin.aventuras.co.in/uploads/arrow_right_b4d68d463d.png?`}
                      alt="arrow" style={{ transform: 'rotate(-180deg)' }} />
                  </button>
                  <button role='button' type='button' className="image" onClick={() => ref.current.next()}>
                    <img className='img' loading="lazy"
                      src={`https://admin.aventuras.co.in/uploads/arrow_right_b4d68d463d.png?`} alt="arrow"
                    />
                  </button>
                </div>

                <div className="inner-content">
                  <Carousel effect="fade"
                    dotPosition="bottom"
                    dots={false}
                    pauseOnHover={false}
                    autoplaySpeed={2500}
                    ref={ref}
                  >
                    {value.map((val) => {
                      return (
                        <span key={val.id}>
                          <div className="carousel-container">
                            <div className="left">
                              {val?.attributes?.package_images?.data.length > 1 ?
                                (<div className="image">
                                  <img className='img' loading="lazy"
                                    src={`${baseURL}${val?.attributes?.package_images?.data?.slice(0, 1)?.map((v) => {
                                      return v.attributes?.url
                                    })}`}
                                    alt={`${baseURL}${val?.attributes?.package_images?.data?.slice(0, 1)?.map((v) => {
                                      return v.attributes?.name
                                    })}`}
                                  />
                                </div>)
                                :
                                (<div className="image">
                                  <img className='img' loading="lazy"
                                    src={`${baseURL}${val?.attributes?.package_images?.data?.map((v) => {
                                      return v.attributes?.url
                                    })}`}
                                    alt={`${baseURL}${val?.attributes?.package_images?.data?.map((v) => {
                                      return v.attributes?.name
                                    })}`}
                                  />
                                </div>)

                              }
                            </div>

                            <div className="right">
                              <div className="text-content">
                                <div className="upper">
                                  <div className="heading">
                                    {val?.attributes?.name}
                                  </div>
                                  <div className="subheading">
                                    {(val?.attributes?.package_nights) === 0 ?
                                      <>
                                        {`${(val?.attributes?.package_nights) + 1} Day`}
                                      </> :
                                      <>
                                        {(val?.attributes?.package_nights) === 1 ?
                                          <>
                                            {`${(val?.attributes?.package_nights) + 1} Days / ${val?.attributes?.package_nights} Night`}
                                          </> :
                                          <>
                                            {`${(val?.attributes?.package_nights) + 1} Days / ${val?.attributes?.package_nights} Nights`}
                                          </>
                                        }
                                      </>}
                                  </div>
                                  <div className="para">
                                    {val?.attributes?.description.length < 410 ? val?.attributes?.description : val?.attributes?.description.slice(0, 340) + '...'}
                                  </div>
                                </div>

                                <div className="bottom">
                                  <div className="package">
                                    <span className="price">
                                      {/* &#8377;  */}
                                      {val.attributes.Price}
                                    </span> {val.attributes.PriceInfo}
                                  </div>

                                  <div className="details">
                                    <div className='text'>
                                      <Link to={`/single-group-tour/${val?.attributes?.package_id}`} >  View more detail</Link>
                                      <div className="icon">
                                        <img className='img' loading="lazy" src={`https://admin.aventuras.co.in/uploads/arrow_right_b4d68d463d.png?updated_at=2023-03-24T12:13:32.807Z`} alt="arrow" width="20" height="20" />
                                      </div>
                                    </div>


                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </span>
                      )
                    })}
                  </Carousel>
                </div>
                <div className="additional bottom">

                  <button role='button' type='button' className="image" onClick={() => ref.current.prev()}>
                    <img className='img' loading="lazy"
                      src={`https://admin.aventuras.co.in/uploads/arrow_right_b4d68d463d.png?`}
                      alt="arrow" style={{ transform: 'rotate(-180deg)' }} />
                  </button>
                  <button role='button' type='button' className="image" onClick={() => ref.current.next()}>
                    <img className='img' loading="lazy"
                      src={`https://admin.aventuras.co.in/uploads/arrow_right_b4d68d463d.png?`} alt="arrow"
                    />
                  </button>
                </div>
              </div>
            </>)}
      </div>
    </div>
  )
}

export default Holidays
