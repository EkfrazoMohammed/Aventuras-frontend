
import React from 'react'
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { Skeleton } from 'antd'
import "./Theme.scss";

import { baseURL } from "../../../api/apirequest";

const Theme = ({ data, loading }) => {

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <span {...props}>&larr;</span>
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
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
      <div className="theme-container">
        {
          loading ?
            (
              <Skeleton active />
            )
            :
            (<>
              <div className="section-title">
                Theme
              </div>
              <div>
                <Slider {...settings} className="card-container">
                  {data.data.sort((a, b) => a.id > b.id ? 1 : -1).map((val) => {
                    return (
                      <>
                        <Link to={`/single-theme/${val.id}`} >
                          <div className="card-content" key={val.id}>
                            <div className="card-image">
                              <img className='img' loading="lazy"
                                src={`${baseURL}${val?.attributes?.images?.data[0]?.attributes?.url}`}
                                alt={`${baseURL}${val?.attributes?.images?.data[0]?.attributes?.name}`}
                              />
                            </div>
                            <div className="card-overlay">
                              <div className="upper">
                                <div className="card-title">
                                  {val?.attributes?.title}
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
                <Link to="/all-themes">
                  <div className="line">
                    <div className="text">Explore More Themes</div>
                    <div className="image">
                      <img className='img' loading="lazy" src={`https://admin.aventuras.co.in/uploads/arrow_right_b4d68d463d.png?updated_at=2023-03-24T12:13:32.807Z`} alt="arrow" width="20" height="20" />
                    </div>
                  </div>
                </Link>
              </div>
            </>)}

      </div>
    </div>
  )
}

export default Theme


