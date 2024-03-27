import React, { useState, useEffect, useRef, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { Carousel, Skeleton } from 'antd'
import "./Banner.scss";
import {API,baseURL} from "../../../api/apirequest";
import SSearch from './searchbox/SSearch';

const Banner = ({ data, brandinfos, loading }) => {
// console.log(baseURL)
  //change image index for banner
  const [bgImage, setBgImage] = useState([]);

  useEffect(() => {

    // image data
    let filterImage = data.data.map((item) => {
      return item.attributes.BannerImage.data.map((i, index) => {
        return i;
      });
    });

    const myimg = filterImage.map((a) => {
      return a.map((i, index) => {
        // console.log(i.attributes.url)
        setBgImage(searches => [...searches, i.attributes])
        // return i.attributes.url

      });
    })
  }, [])


  return (
    <div className="banner">


      <Suspense fallback={<h1>Loading...</h1>}>

        {data.data.map((val, index) => {
          return (
            <>
              <div className="banner-container">

                <div className='image-container'>

                  {loading ?
                    <img className='img' loading="lazy"
                      // src={`https://admin.aventuras.co.in/uploads/bg1_869727f29e_dc8847a841.jpg`}
                      alt='bgimg'
                    />
                    : (

                      <Carousel effect="fade"
                        autoplay
                        dotPosition="bottom"
                        dots={false}
                        pauseOnHover={false}
                        autoplaySpeed={2500}
                        pauseOnFocus={false}

                      >

                        {bgImage
                          .map((val) => {

                            return (
                              <>

                                <img className='img' loading="lazy" src={`${baseURL}${val.url}`}
                                  alt={val.url}
                                />
                              </>
                            )
                          })}
                      </Carousel>
                    )}


                </div>
                {/* <div className="text-content">
                  <div className="upper">
                    <div className="heading">

                      <div className="greeting">{val?.attributes?.TextLine1} <span className="yellow-text">{val?.attributes?.Textline2Highlighted}</span></div>
                     

                    </div> */}
  <div className="text-content">

<div className="upper">
  <div className="heading">

  <div className="mobile_banner_logo">
<img src="https://admin.aventuras.co.in/uploads/image_1_1_2a69dfc02b.png" width={'32px'} alt="" />
</div>
    <div className="greeting">{val?.attributes?.TextLine1} <span className="yellow-text">{val?.attributes?.Textline2Highlighted}</span></div>



  </div>
                    <div className="search-content">
                      <SSearch />
                      
                    </div>


                    {/* <span className="flight">
                      <Link to="/flight" className="flight-btn">
                        click here to enquire about flight bookings
                      </Link>
                    </span> */}
                  </div>

                  <div className="bottom">
                    <div className="bottom-text">
                      <div className="bottom-container">

                        {brandinfos.data
                          .sort((a, b) => a.id > b.id ? 1 : -1)
                          .map((details) => {
                            return (
                              <>
                                <div className="bottom-item" key={details.id}>
                                  <div className="icon">
                                    <img className='img' loading="lazy"
                                      src={`${baseURL}${details?.attributes?.icon?.data[0]?.attributes?.url}`}
                                      alt={`${baseURL}${details?.attributes?.icon?.data[0]?.attributes?.name}`}
                                    />
                                  </div>
                                  <div className="text">
                                    <div className="para">{details?.attributes?.counts}</div>
                                    <div className="para">{details?.attributes?.title}</div>
                                  </div>
                                </div>
                              </>
                            )
                          })}

                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </>
          )
        })}

      </Suspense>

    </div>
  )
}

export default Banner