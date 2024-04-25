import React from "react";
import Slider from "react-slick";
import StarIcon from '@mui/icons-material/Star';
import YouTubeIcon from '@mui/icons-material/YouTube';


function AutoPlay({data}) {

    var settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 3,
      speed: 500,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 2,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              infinite: false,
              centerMode: false,

              slidesToShow: 1,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              infinite: false,
              centerMode: false,

              slidesToShow: 1,
              slidesToScroll: 1,
                }
          }
        ]
      };
      console.log(data)
  return (
    < >
      <div className="review_heading" >
        Video Reviews 

  <YouTubeIcon fontSize="2.5rem" sx={{color:'red'}}/>
        </div>
      <Slider {...settings} className="slider" >

        <div className="Vedio_Vedio_slide_content">
        <div className="slide_text_container">
        <iframe src="https://www.youtube.com/embed/3KitsxgS5Cs" frameborder="0"></iframe>

            </div>
            </div>
            <div className="Vedio_Vedio_slide_content">
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

      </Slider>
    </>
  );
}

export default AutoPlay;
