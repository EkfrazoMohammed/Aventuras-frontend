import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from './Slider'
import { API } from '../../api/apirequest';
import VideoSlider from './Vedio'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import ReactMarkdown from "react-markdown";
import  './Choose.css'

const ChooseUs = () => {

    const [chooseData,setchooseData]=useState([])
    const[gallery,setGallery]=useState();

    useEffect(()=>{
        const getData = async()=>{
            const res = await API.get('/api/choose-uses?populate=deep')
            console.log(res)
            setchooseData([res])
        }
        getData()
       
    },[])
  return (
   <>
  
    <div className="banner_overlay">
    
    Why <span className='border_text'>Choose</span>  <span className='Colored_text'> Us ?</span>
   </div>
   <div className="content_container">
   <div className="description_section">
<div className="text_section">
    {
        chooseData?.map((item)=>{
            return(
<div className="text_conatiner-sbout-us">
    {
        item?.data?.data?.map((val,index)=>{
            return(
                <>

<ReactMarkdown className='list'>{val.attributes.content}</ReactMarkdown>
                </>

            )
        })
    }
    <div className='social_container'>
    <a  href='https://www.google.com/search?sa=X&authuser=3&biw=412&bih=776&sxsrf=ALiCzsat3GmeoWlV0Qn4SOTKT3AmIkDE4A:1663165813870&q=Aventuras&ludocid=8480788245887338131&gsas=1&client=ms-android-samsung-ga-rev1&lsig=AB86z5W2iVYbF5IWIwOLmvu4G_wR&shem=lssc&kgs=f5ba25e6490d0486&shndl=-1&source=sh/x/kp/local/2&entrypoint=sh/x/kp/local#ip=1' style={{cursor:'pointer',width:'150px',borderRadius:'10px',display:'flex',justifyContent:'center',alignItems:'center',background:'#ffd93d',boxShadow:' 1px 1px 10px rgb(36 39 44 / 33%)'}}>
        <img src="https://admin.aventuras.co.in/uploads/g_reviews_icon_removebg_preview_1fb4146dd2.png" style={{width:'85px',height:'auto'}} alt="" />
    </a>
    <a href='https://www.instagram.com/aventuras.in/' style={{cursor:'pointer',width:'150px',borderRadius:'10px',display:'flex',justifyContent:'center',alignItems:'center',background:'#ffd93d',boxShadow:' 1px 1px 10px rgb(36 39 44 / 33%)',padding:'0.5rem'}}>
        <img src="https://admin.aventuras.co.in/uploads/images_removebg_preview_2_0a10c19389.png" style={{width:'124px',height:'auto'}} alt="" />
    </a>
    </div>
    <div className="image_container_about-logo">
        <img src="https://admin.aventuras.co.in/uploads/image_1_1_2a69dfc02b.png" 
         alt="" />
    </div>
</div>

            )
        })
    }

</div>


   </div>
   </div>

<div className="name" style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center', gap:'1rem',margin:'5rem 0rem'}}>
   <Slider data={chooseData}/>
</div>
<div className="name" style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center', gap:'1rem',margin:'5rem 0rem'}}>
    <div className="review_heading">

    Regognitions Certificates
    </div>

    <div className="regognition-container">
        <div className="regonition-card">
            <img src="https://admin.aventuras.co.in/uploads/Second_certification_df4a4be2f8.png" alt="" />
        </div>
        <div className="regonition-card">
            <img src="https://admin.aventuras.co.in/uploads/first_Certification_d7d50a1a65.png" alt="" />
        </div>
        <div className="regonition-card">
            <img src="https://admin.aventuras.co.in/uploads/third_certification_b4a224ba1b.png" alt="" />
        </div>
    </div>
</div>
<div className="name" style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',margin:'3rem 0',gap:'2rem'}}>
<VideoSlider data={chooseData} />
</div>

<div className="content_container" >
<div className="review_heading" >
Client Diaries

  <PermMediaIcon fontSize="2.5rem" sx={{color:'#000'}}/>
        </div>  
    <div className="gallery_container">
        {
            chooseData[0]?.data?.data[0]?.attributes?.gallery?.data?.map((val)=>
            <div className="image_container">
            <img src={`https://admin.aventuras.co.in/${val?.attributes?.url}`} alt="" />
            </div>
           )
        }

        
    </div>
</div>
   </>
  )
}

export default ChooseUs