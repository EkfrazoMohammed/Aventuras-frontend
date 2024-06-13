import React from "react";
import Slider from "react-slick";
import StarIcon from '@mui/icons-material/Star';
import { useEffect, useState } from 'react'
import { API } from '../../api/apirequest';
import { Link } from "react-router-dom";



function Featured({data}) {

var settings = {
    className: "center",
    slidesToShow: 2,
    infinite: false,

    speed: 1500,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
   
          }
        },
        {
          breakpoint: 600,
          settings: {
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 480,  
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,

              }
        }
      ]
    };

  return (
    < >
      <div className="review_heading" >
        Featured
        <span>
<img src="https://admin.aventuras.co.in/uploads/icons8_events_64_36c06fc59f.png" alt="" />
        </span>
      </div>
          <Slider {...settings} className="slider">
      {
        data?.map((item) =>
           
                <a href={item.article_link} className="slide_content">
                  <div className="slide_text_container">
                    <div className="review_image_container">
                      <img src={`https://admin.aventuras.co.in/${item?.featured_logo.data?.attributes?.url}`} alt="" />
                    </div>
                    <div className="reveiw_text">{item.featured_description}</div>
                  </div>
                  <div className="" style={{ fontWeight: '600' }}>-{item?.featured_name}</div>

                </a>
            
            
            )
            
            }
        </Slider>




      {/* <div className="slide_content">
        <div className="slide_text_container">
        <div className="review_image_container">
            <img src="https://admin.aventuras.co.in//uploads/Neeulm_Valley_AJK_Arang_Kel_162cbe6d23.jpg" alt="" />
        </div>
        <div className="">"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium accusamus obcaecati, omnis ratione facilis quae?</div>
       </div>
       <div className="">-Bikash Kumar</div>
        </div>
        <div className="slide_content">
          <h3>3</h3>
        </div>
        <div className="slide_content">
          <h3>4</h3>
        </div>
        <div className="slide_content">
          <h3>5</h3>
        </div>
        <div className="slide_content">
          <h3>6</h3>
        </div> */}
    </>
  );
}

export default Featured;
