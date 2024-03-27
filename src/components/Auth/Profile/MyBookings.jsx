import * as React from 'react';
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

import "./scss/tabs.scss"
function BookingCard() {
 return (
  <>
  <div style={{width:"100%",height:"auto",display:"flex",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}>
    <Card sx={{ width: "32%",height:"auto",padding:"1rem",margin:"1rem 0" }}>
      <CardHeader
        
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="110"
        image=""
        alt="package images"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
     
    </Card>

    </div>
    </>);
}
const MyBookings = () => {
  
    const [data,setData]=useState([])

    const fetchData=async ()=>{
    let url="https://admin.aventuras.co.in/api/bookings?populate=*&sort=createdAt:desc"
            try{
    let res=await axios.get(url)
    .then((res)=>{
    //  console.log("all data=>",res.data.data)
     const responseData=res.data.data
     
     let userEmailToFilter=localStorage.getItem("user_email");

    //  const usernameToFilter = "developer@mail.com"; // Replace with the username you want to filter

// Filter the data based on the username
const filteredData = responseData.filter(item => {
return item.attributes.user.data.attributes.email === userEmailToFilter;
});

// console.log("your trips=>",filteredData);
     setData(filteredData)
    })
    .catch((err)=>{
            // console.log(err)
    })
    }catch(err){
            // console.log(err)
            }
    }
    useEffect(()=>{
            fetchData();
    },[])
    // console.log(data)
       return (
        <>
    

            <div className="container-wrapper" style={{display:"flex",gap:"1rem",justifyContent:'flex-start',alignItems:'flex-start'}}>
                <BookingCard />
            </div>
            </>
       )
    
    };
    

export default MyBookings

