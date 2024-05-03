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
    console.log(chooseData[0]?.data?.data[0]?.attributes?.gallery?.data?.map((i)=>i.attributes.url))
  return (
   <>
   <div className="banner_image">
    <div className="banner_overlay">
    <h3>Why Choose Us ?</h3>

    </div>
   </div>
   <div className="content_container">
   <div className="description_section">
<div className="text_section">
    {
        chooseData?.map((item)=>{
            return(
<div className="" style={{display:'flex',alignItems:'flex-start',flexDirection:'column',fontWeight:'550'}}>
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
    <span style={{width:'100px',cursor:'pointer'}}>
        <img src="https://admin.aventuras.co.in/uploads/g_reviews_icon_removebg_preview_1fb4146dd2.png" style={{width:'100%'}} alt="" />
    </span>
    <span style={{width:'135px',cursor:'pointer'}}>
        <img src="https://admin.aventuras.co.in/uploads/images_removebg_preview_2_0a10c19389.png" style={{width:'100%'}} alt="" />
    </span>
    </div> 
</div>

            )
        })
    }

</div>
<div className="image_section">
    <img src="https://admin.aventuras.co.in/uploads/choose_us_2f2a865aeb.png" style={{width:'100%'}} alt="" />
</div>

   </div>
   </div>
<div className="name" style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',background:'rgba(0, 194, 255, 0.7607843137)'}}>
   <Slider data={chooseData}/>
</div>
<div className="name" style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
<VideoSlider data={chooseData} />
</div>

<div className="content_container" style={{background:'#ffe207'}}>
<div className="review_heading" >
Client Diaries

  <PermMediaIcon fontSize="2.5rem" sx={{color:'#000'}}/>
        </div>  
          {/* <div className="gallery_container">

   <div className="gallery-first">
    <div className="small_section_first">
        <div className="image_container">
        <img src="https://xtemko.stripocdn.email/content/guids/CABINET_441589ae823a236f0335e96c34bd27c78b9a070280f8a267e23f915b662cf3e8/images/copy_of_img_20230630_130331.jpg" alt="" />
        </div>
        <div className="image_container">
        <img src="https://xtemko.stripocdn.email/content/guids/CABINET_441589ae823a236f0335e96c34bd27c78b9a070280f8a267e23f915b662cf3e8/images/copy_of_img_5576.jpg" alt="" />
        </div>
    </div>
    <div className="small_section_first">
        <div className="image_container">
        <img src="https://xtemko.stripocdn.email/content/guids/CABINET_441589ae823a236f0335e96c34bd27c78b9a070280f8a267e23f915b662cf3e8/images/maldives_akash_gupta_4R7.jpg" alt="" />
        </div>
        <div className="image_container">
        <img src="https://xtemko.stripocdn.email/content/guids/CABINET_441589ae823a236f0335e96c34bd27c78b9a070280f8a267e23f915b662cf3e8/images/maldives_nandkishore_lVH.jpg" alt="" />
        </div>
    </div>
   </div>
   <div className="gallery-second">
 
  <div className="image_container">
  <img src="https://xtemko.stripocdn.email/content/guids/CABINET_441589ae823a236f0335e96c34bd27c78b9a070280f8a267e23f915b662cf3e8/images/vipul_sinha_singapore.jpeg" alt="" /> 
  </div>

  
    <div className="image_container">
        <img src="https://xtemko.stripocdn.email/content/guids/CABINET_441589ae823a236f0335e96c34bd27c78b9a070280f8a267e23f915b662cf3e8/images/copy_of_img20220808wa0016_mlt.jpg" alt="" />
    </div>
   </div>
   <div className="gallery-first">
    <div className="small_section_first">
        <div className="image_container">
        <img src="https://xtemko.stripocdn.email/content/guids/CABINET_441589ae823a236f0335e96c34bd27c78b9a070280f8a267e23f915b662cf3e8/images/thailand_ankit_gautam_rUN.jpg" alt="" />
        </div>
        <div className="image_container">
        <img src="https://xtemko.stripocdn.email/content/guids/CABINET_441589ae823a236f0335e96c34bd27c78b9a070280f8a267e23f915b662cf3e8/images/dubai_dipanshu.jpg" alt="" />
        </div>
    </div>
    <div className="small_section_first">
        <div className="image_container">

        <img src="https://xtemko.stripocdn.email/content/guids/CABINET_441589ae823a236f0335e96c34bd27c78b9a070280f8a267e23f915b662cf3e8/images/rajasthan_mamta_mam.jpeg" alt="" />
        </div>
        <div className="image_container">

        <img src="https://xtemko.stripocdn.email/content/guids/CABINET_441589ae823a236f0335e96c34bd27c78b9a070280f8a267e23f915b662cf3e8/images/anadaman_narendhran.jpg" alt="" />
        </div>
    </div>
   </div>
    </div> */}
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