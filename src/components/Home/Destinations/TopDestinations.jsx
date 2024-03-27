import React, { useState, useEffect, useRef } from 'react'
import Slider from "react-slick";
import "./Destinations.scss";
import { Skeleton } from 'antd'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import {API,baseURL} from "../../../api/apirequest";

const TopDestinations = ({ data, loading }) => {
  console.log(data);

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    // <span {...props}><img src={`https://admin.aventuras.co.in/uploads/arrow_right_b4d68d463d.png?updated_at=2023-03-24T12:13:32.807Z`}/></span>
    // <img src={KeyboardArrowUpIcon} alt="nextArrow" {...props} />
    <span {...props}>&larr;</span>
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    // <img src='{BsChevronRight }' alt="nextArrow" {...props} />
    <div {...props}>&rarr;</div>
  );
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,

        }
      },

      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };


  return (
    <div className="section">
      <div className="destination-container">

        {
          loading ?
            (
              <Skeleton active />
            )
            :
            (<>

              <div className="section-title">
                Top Destinations
              </div>

              <div>
                <Slider {...settings} className="card-container">

                  {
                    data.data
                      .sort((a, b) => a.attributes?.priority > b.attributes?.priority ? 1 : -1)
                      // .filter((item, index) => index < 8)
                      .map((val) => {
                        return (
                          <>
                        <Link to={`/single-destination/${val?.attributes?.all_destination?.data?.attributes?.name}`} >
                              <div className="card-content" key={val.id}>

                                <div className="card-image">
                                  <img className='img' loading="lazy"
                                    src={`${baseURL}${val?.attributes?.all_destination?.data?.attributes?.images?.data[0]?.attributes?.url}`}
                                    alt={`${baseURL}${val?.attributes?.all_destination?.data?.attributes?.name}`}
                                  />

                                </div>
                                <div className="card-overlay" >
                                  <div className="upper">
                                    <div className="card-title">
                                      {val?.attributes?.all_destination?.data?.attributes?.name}
                                    </div>
                                  </div>
                                  <div className="bottom">
                                    <div className="card-package-details">
                                      <div className="left">
                                        {val?.attributes?.all_destination?.data?.attributes?.packages} Packages
                                      </div>
                                      <div className="right">
                                        {val?.attributes?.all_destination?.data?.attributes?.activities} Activities
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </>
                        )
                      })


                  }
                </Slider>
              </div>

              <div className="additional">
                <Link to="/all-destinations">
                  <div className="line">
                    <div className="text">Explore More Destinations</div>
                    <div className="image">
                      <img className='img' loading="lazy" src={`https://admin.aventuras.co.in/uploads/arrow_right_b4d68d463d.png?updated_at=2023-03-24T12:13:32.807Z`} alt="arrow" width="20" height="20" />
                    </div>
                  </div>
                </Link>
              </div>


            </>)
        }
      </div>
    </div>

  )
}

export default TopDestinations
