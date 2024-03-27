import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Table from './Table';
import SimpleBookings from './SimpleBookings';

const GeneralBookings = () => {

       
 return (
        <>
         <div className='activities-container'>
                <div className="activities-heading">My Bookings</div>
               <SimpleBookings />
         </div>
        </>
        )
}
export default GeneralBookings

