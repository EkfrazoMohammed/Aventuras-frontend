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


const SimpleBookings = () => {
    
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(true)
    const [visibleCount, setVisibleCount] = useState(6);
     const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 6);
  };
    const fetchData = async () => {
      // let url = "https://admin.aventuras.co.in/api/bookings?populate=deep";
      let url = "https://admin.aventuras.co.in/api/bookings?populate=*&sort=createdAt:desc";
      https://admin.aventuras.co.in/api/bookings?populate=*&sort=createdAt:desc
      try {
        setLoading(true)
        let res = await axios.get(url);
        const responseData = res.data.data;
       
        let userEmailToFilter=localStorage.getItem("user_email");

        const filteredData = responseData.filter(item => {
        
          if (item.attributes && item.attributes.user && item.attributes.user.data) {
            return item.attributes.user.data.attributes.email === userEmailToFilter;
          }
          return false;
        });

        const filteredData2 = responseData.filter(item => {
         
          if (item.attributes && item.attributes.user && item.attributes.user.data) {
       
            return item?.attributes?.user?.data?.attributes?.email == userEmailToFilter
          }else{
            return console.log('no bookings yet')
        
          }
        });

        
        setData(filteredData2);
        setLoading(false)
      } catch (err) {
        setLoading(false)
        console.error(err);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);

  return (
    <div>
    <div className="simple-bookings-page-container">
    <div className="simple-bookings-page-wrapper">

        <div className="simple-bookings-text-container">
         
            </div>
            {!loading? <>
            {data.length !==null && data.length>0?<>
                <div className='booking-cards-container'>
                {data.slice(0, visibleCount).map(val => (
                <Card sx={{ maxWidth: "100%",height:"auto",padding:"1rem",margin:"1rem 0" }} className='booking-cards'>
                 <div className='booking-card-wrapper'>
                 <div className='booking-card-title'>
                    Booking details:
                 </div>
                 <div className='booking-card-desc'>
                
<span className='title'>Transaction Id:</span><span className='value'>{val?.attributes?.merchant_transaction_id}</span>
                 </div>
                 {/* <div className='booking-card-desc'>
                 <span className='title'>Payment Mode :</span> <span className='value'>{val?.attributes?.payment_mode}</span>
                    </div> */}
                 <div className='booking-card-desc'>
                 <span className='title'>Payment status :</span>  <span className='value'>{val?.attributes?.payment_status}</span>
                 
                 </div>
               
                
                
                 <div className='booking-card-desc'>
                 <span className='title'>Payment Mode:</span> <span className='value'> {val?.attributes?.payment_mode}</span>
                </div>
                 <div className='booking-card-desc'>
                 <span className='title'>Booking Amount:</span> <span className='value'> &#x20b9; {val?.attributes?.booking_amount}</span>
                </div>

                <div className='booking-card-desc'>
                 <span className='title'>Amount Paid:</span> <span className='value'> &#x20b9; {val?.attributes?.received_amount}</span>
                </div>
                 <div className='booking-card-desc'>
                 {/* <span className='title'>Order Date : </span> <span className='value'>  {new Date(val?.attributes?.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
               </span> */}

<span className='title'>Order On:</span><span className='value'>
                                  {new Date(val?.attributes?.publishedAt).toLocaleDateString('en-US', 
                                //  { year: 'numeric', month: 'long', day: 'numeric' }
                                {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                              }
                                 )}</span>
               
                    {/* {val?.attributes?.publishedAt} */}
                 </div>
                  </div>
                  
                 
                </Card>
              ))}
              </div>
              {data.length > 6 && visibleCount < data.length && (
                <button className="load-more-btn" onClick={loadMore}>
                  Load More
                </button>
              )}
        
            </>
            
            :<>
             <div className="no-booking-heading">
          No Bookings yet
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

export default SimpleBookings