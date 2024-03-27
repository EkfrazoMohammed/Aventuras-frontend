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

const MyFlightEnquiries = () => {

  const [data,setData]=useState([])
  const [loading,setLoading]=useState(true)
  const fetchData=async ()=>{
  let url="https://admin.aventuras.co.in/api/flight-enquiries?populate=*&sort=createdAt:desc"
          try{
            setLoading(true)
  let res=await axios.get(url)
  .then((res)=>{
   const responseData=res.data.data


//   //  const usernameToFilter = "developer@mail.com"; // Replace with the username you want to filter

// // Filter the data based on the username
// const filteredData = responseData.filter(item => {
//   return item.attributes.adults==1;
//   });
let userEmailToFilter=localStorage.getItem("user_email");


// Filter the data based on the user email
const filteredData = responseData.filter(item => {
  // Check if 'attributes' exist and contain 'user' and 'email'
  if (item.attributes) {
    return item.attributes.user_email === userEmailToFilter;
  }
  return false;
});
   setData(filteredData)
   setLoading(false)
  })
  .catch((err)=>{
    setLoading(false)
  })
  }catch(err){
    setLoading(false)
    console.error(err);
          }
  }
  useEffect(()=>{
          fetchData();
  },[])
  return (
    <div className='activities-container'>
    <div className="activities-heading">My Flight Enquiries</div>
    <div className="simple-bookings-page-container">
    <div className="simple-bookings-page-wrapper">

    {!loading? <>
            {data.length>0?<>
                <div className='booking-cards-container'>
            {data.map((val)=>{
             return (
                <Card sx={{ maxWidth: "100%",height:"auto",padding:"1rem",margin:"1rem 0" }} className='booking-cards'>
                 <div className='booking-card-wrapper'>
                 <div className='booking-card-title'>
                    Flight Enquiry details:
                 </div>
                 <div className='booking-card-desc'>
                
<span className='title'>Destination : </span><span className='value'>{val?.attributes?.request_destination}</span>
                 </div>
                 <div className='booking-card-desc'>
                
                <span className='title'>Origin : </span><span className='value'>{val?.attributes?.request_origin}</span>
                                 </div>
                                 <div className='booking-card-desc'>
                
                <span className='title'>Flight Class : </span><span className='value'>{val?.attributes?.flight_class}</span>
                                 </div>

                                 <div className='booking-card-desc'>
                
                <span className='title'>Departure Date: </span><span className='value'>{val?.attributes?.departure}</span>
                                 </div>

                                 {val?.attributes?.arrival?<>
                                 <div className='booking-card-desc'>
                                
                                <span className='title'>Arrival Date: </span><span className='value'>{val?.attributes?.arrival}</span>
                                                 </div>
                                                 </>:null}
                                 <div className='booking-card-desc'>
                
                <span className='title'>Adults: </span><span className='value'>{val?.attributes?.adults}</span>
                                 </div>   
                                 
                                 <div className='booking-card-desc'>
                
                <span className='title'>Children : </span><span className='value'>{val?.attributes?.children}</span>
                                 </div>
                                 <div className='booking-card-desc'>
                
                <span className='title'>Infants: </span><span className='value'>{val?.attributes?.infants}</span>
                                 </div> 
                                 
                                 
                                                               <div className='booking-card-desc'>
                                 <span className='title'>Enquiry on:</span>  <span className='value'>
                                  {new Date(val?.attributes?.publishedAt).toLocaleDateString('en-US', 
                                //  { year: 'numeric', month: 'long', day: 'numeric' }
                                {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
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
          No Group Tour Bookings yet
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
export default MyFlightEnquiries
