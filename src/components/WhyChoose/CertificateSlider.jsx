import React from "react";
import Slider from "react-slick";
import StarIcon from '@mui/icons-material/Star';
import {useEffect,useState} from 'react'
import { API } from '../../api/apirequest';



function CertificateSlider(data) {
console.log(data?.data?.map((item)=> item.attributes.url))


var settings = {
  className: "center",
  infinite: true,
  centerPadding: "60px",
  slidesToShow: 3,
  speed: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
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
          infinite: true,

            }
      }
    ]
  };
  return (
    < >

          <Slider {...settings} className="slider">
      {
          data?.data?.map((item)=>{
                return(
                <>
                <div className="regonition-card">
                <img src={`https://admin.aventuras.co.in/${item.attributes.url}`} style={{width:'100%'}} alt="" />
            </div>
                </>
                )
            })
        } 
            </Slider>
 
       </>
)

};

  

export default CertificateSlider;
