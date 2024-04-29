import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import StarIcon from '@mui/icons-material/Star';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { API } from "../../api/apirequest";


function VedioPlay() {
  const [video,setVideo] =useState([])
useEffect(()=>{
  const fetchData = async () => {
    try {
      const resData = await API.get('/api/youtube-reviews');
      setVideo([resData.data?.data?.map((val) => val.attributes)]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
fetchData()
},[])


    var settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 3,
      speed: 1000,
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
      <div className="review_heading" >
        Video Reviews 

  <YouTubeIcon fontSize="2.5rem" sx={{color:'red'}}/>
        </div>
        <Slider {...settings} className="slider">
      {video[0]?.map((val, index) => (
        <div className="Vedio_slide_content"  key={index}>
          <div className="slide_text_container">
            <iframe title={index}  src={`https://www.youtube.com/embed/${val.Youtube_Id}`} frameborder="0"/>
          </div>
        </div>
      ))}
    </Slider>

{/* <Slider {...settings} className="slider" >

             <div className="Vedio_slide_content">
        <div className="slide_text_container">
        <iframe src="https://www.youtube.com/embed/3KitsxgS5Cs" frameborder="0"></iframe>

            </div>
            </div>
            <div className="Vedio_slide_content">
        <div className="slide_text_container">
        <iframe src="https://www.youtube.com/embed/3KitsxgS5Cs" frameborder="0"></iframe>

            </div>
            </div>
            <div className="Vedio_slide_content">
        <div className="slide_text_container">
        <iframe src="https://www.youtube.com/embed/3KitsxgS5Cs" frameborder="0"></iframe>

            </div>
            </div>
            <div className="Vedio_slide_content">
        <div className="slide_text_container">
        <iframe src="https://www.youtube.com/embed/3KitsxgS5Cs" frameborder="0"></iframe>

            </div>
            </div> 
      </Slider> */}

    </>
  );
}

export default VedioPlay;
