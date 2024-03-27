import React, { useState, useEffect } from 'react'
import axios from 'axios';
import AllGroupBookings from './AllGroupBookings';

const GroupBookingContainer = () => {

       
 return (
        <>
         <div className='activities-container'>
                <div className="activities-heading">My Group Tour Bookings</div>
           <AllGroupBookings />
         </div>
        </>
        )
}
export default GroupBookingContainer

