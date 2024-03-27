import React, { useState, useEffect } from 'react'
import GroupBookingTable from './GroupBookingTable';

const GroupBookings = () => {

    return (
        <>
            <div className='activities-container'>
            <div className="activities-heading">Group Bookings</div>
            <div className="table-container">
             <GroupBookingTable />
            </div>
            </div>

        </>)
}

export default GroupBookings

