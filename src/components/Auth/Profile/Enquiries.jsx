import React from 'react'
import "./scss/simplebookings.scss"
import { useState, useEffect } from 'react'
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Skeleton } from 'antd'
const Enquiries = () => {
  const [data,setData]=useState([])

  const [loading,setLoading]=useState(true)

  const fetchData=async ()=>{
  let url="https://admin.aventuras.co.in/api/customer-enquiries?populate=deep&sort=createdAt:desc"
          try{
            setLoading(true)
  let res=await axios.get(url)
  .then((res)=>{
   const responseData=res.data.data
   
   let userEmailToFilter=localStorage.getItem("user_email");
  
 

// Filter the data based on the username
const filteredData = responseData.filter(item => {
  return item?.attributes?.email_id == userEmailToFilter;
  });

   setData(filteredData)
   setLoading(false)
  })
  .catch((err)=>{
    setLoading(false)
    console.log(err)
  })
  }catch(err){
    setLoading(false)
    console.log(err)
          }
  }
  useEffect(()=>{
          fetchData();
  },[])
  return (
    <div className='activities-container'>
    <div className="activities-heading">My Package Enquiries</div>
    <div className="simple-bookings-page-container">
    <div className="simple-bookings-page-wrapper">

        <div className="simple-bookings-text-container">
           
          

            </div>
            {!loading? <>
            {data.length>0?<>
                <div className='booking-cards-container'>
            {data.map((val)=>{
             return (
                <Card sx={{ maxWidth: "100%",height:"auto",padding:"1rem",margin:"1rem 0" }} className='booking-cards'>
                 <div className='booking-card-wrapper'>
                 <div className='booking-card-title'>
                    Enquiry details:
                 </div>
                 <div className='booking-card-desc'>
                
<span className='title'>package_id : </span><span className='value'>{val?.attributes?.package_id}</span>
                 </div>
                 <div className='booking-card-desc'>
                 <span className='title'>package name:</span>  <span className='value'>{val?.attributes?.package_name}</span>
                 
                 </div>

                 {/* <div className='booking-card-desc'>
                                 <span className='title'>Username :</span>  <span className='value'>{val?.attributes?.user_name}</span>
                                 
                                 </div>
                                 <div className='booking-card-desc'>
                                 <span className='title'>Email :</span>  <span className='value'>{val?.attributes?.email_id}</span>
                                 
                                 </div>

                 <div className='booking-card-desc'>
                 <span className='title'>contact_number :</span>  <span className='value'>{val?.attributes?.contact_number}</span>
                 
                 </div>

                 <div className='booking-card-desc'>
                
                <span className='title'>current_location
 : </span><span className='value'>{val?.attributes?.current_location
}</span>
                                 </div> */}
                              
                                 <div className='booking-card-desc'>
                                 <span className='title'>Enquiry on:</span>  <span className='value'>
                                  {new Date(val?.attributes?.publishedAt).toLocaleDateString('en-US', 
                                //  { year: 'numeric', month: 'long', day: 'numeric' }
                                {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                              }
                                 )}</span>
                                 
                                 </div>
              </div>
                
                 
                </Card>
              );
           })}
         
        
            </div>
            </>
            
            
             :<>
              <div className="no-booking-heading">
           No Package Enquiries yet
             </div>
             </>}
             </>:
             <>
            <Skeleton active />
            <Skeleton active />
             </>}
            
        </div>
    </div>
</div>
  )
}

export default Enquiries