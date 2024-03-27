
import React from 'react'
import { useState, useEffect } from 'react'
import { userData } from "../../Auth/helper";
import "./scss/simplebookings.scss"
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

function BookingCard() {
 

  return (
    <Card sx={{ width: "100%",height:"auto",padding:"1rem",margin:"1rem 0" }}>
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
      
      </CardContent>
     
    </Card>
  );
}

const MyProfile = () => {
  const full = userData();
 

  const userDataString = localStorage.getItem("user");
    const userData1 = JSON.parse(userDataString);

    const [profile,setProfile]=useState(userData1)

  return (
    <div className='activities-container'>
    <div className="activities-heading">My Profile Settings</div>
  
</div>
  )
}

export default MyProfile