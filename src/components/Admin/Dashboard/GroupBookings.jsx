import React, { useState, useEffect } from 'react'
import "./scss/Bookings.scss";

import axios from "axios";
import Loader from "../../Loader/Loader"
import {API,baseURL} from '../../../api/apirequest';
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

