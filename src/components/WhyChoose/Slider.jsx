import React from "react";
import Slider from "react-slick";
import StarIcon from '@mui/icons-material/Star';
import {useEffect,useState} from 'react'
import { API } from '../../api/apirequest';



function AutoPlay() {

const [reviewData,setreviewData]=useState([]);
  useEffect(()=>{
    const getData = async()=>{
        const res = await API.get('api/customer-reviews?populate=*')

        setreviewData([res])      }
    getData()
},[])

    var settings = {
        infinite: false,
        speed: 1500,
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 2,
              initialSlide: 2
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
      console.log(reviewData)
  return (
    < >
      <div className="review_heading" >
        Client Reviews 
        <StarIcon sx={{ color: "yellow" }} />
                    <StarIcon sx={{ color: "yellow" }} />
                    <StarIcon sx={{ color: "yellow" }} />
                    <StarIcon sx={{ color: "yellow" }} />

                    <StarIcon sx={{ color: "yellow" }} />
        </div>
{
  reviewData?.map((item)=>
      <Slider {...settings} className="slider">
{
  item.data.data.map((data)=>
    <div className="slide_content">
    <div className="slide_text_container">
    <div className="review_image_container">
        <img src={`https://admin.aventuras.co.in/${data.attributes.Image.data.attributes.url}`} alt="" />
    </div>
    <div className="reveiw_text">{data.attributes.Review}</div>
   </div>
   <div className="">-{data.attributes.Name}</div>  
         
         </div>
  )
}
 
       </Slider>

)

}
       



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

export default AutoPlay;
