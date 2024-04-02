import React, { useState, useEffect, Suspense } from 'react';

import { Carousel } from 'antd'
import "./Banner.scss";
import { baseURL } from "../../../api/apirequest";
import SSearch from './searchbox/SSearch';

const Banner = ({ data, brandinfos, loading }) => {
  const [bgImage, setBgImage] = useState([]);

  useEffect(() => {
    let filterImage = data.data.map((item) => {
      return item.attributes.BannerImage.data.map((i, index) => {
        return i;
      });
    });

    const myimg = filterImage.map((a) => {
      return a.map((i, index) => {
        setBgImage(searches => [...searches, i.attributes])
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
                        {bgImage.map((val) => {
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