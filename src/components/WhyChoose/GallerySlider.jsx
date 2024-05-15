import React from 'react';
import Slider from 'react-slick';

const GallerySlider = ({ data }) => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Split the data into chunks of 10 images each
  const chunkedData = [];
  for (let i = 0; i < data?.length; i += 8) {
    chunkedData.push(data?.slice(i, i + 8));
  }

  const mobileChunked = [];
  for (let i = 0; i < data?.length; i += 4) {
    mobileChunked.push(data?.slice(i, i + 4));
  }

  return (
    <div className="image_container">
      <Slider {...settings} className='pc_gallery'>
        {chunkedData.map((chunk, index) => (
          <div key={index} className="slide">
            <div className="section">
              {chunk.slice(0, 4).map((val, idx) => (
                <img
                  key={idx}
                  src={`https://admin.aventuras.co.in/${val?.attributes?.url}`}
                  className='image_fluid'
                  alt=""
                />
              ))}
            </div>
            <div className="section">
              {chunk.slice(4, 8).map((val, idx) => (
                <img
                  key={idx}
                  src={`https://admin.aventuras.co.in/${val?.attributes?.url}`}
                  className='image_fluid'
                  alt=""
                />
              ))}
            </div>
          </div>
        ))}
      </Slider>
      <Slider {...settings} className='mobile_gallery'>
        {mobileChunked.map((chunk, index) => (
          <div key={index} className="slide">
            <div className="section">
              {chunk.slice(0, 2).map((val, idx) => (
                <img
                  key={idx}
                  src={`https://admin.aventuras.co.in/${val?.attributes?.url}`}
                  className='image_fluid'
                  alt=""
                />
              ))}
            </div>
            <div className="section">
              {chunk.slice(2, 4).map((val, idx) => (
                <img
                  key={idx}
                  src={`https://admin.aventuras.co.in/${val?.attributes?.url}`}
                  className='image_fluid'
                  alt=""
                />
              ))}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default GallerySlider;
