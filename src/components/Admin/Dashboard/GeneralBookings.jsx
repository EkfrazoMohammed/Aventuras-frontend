import React, { useState, useEffect } from 'react'
import "./scss/Bookings.scss";
import Table from './Table';

import axios from "axios";
import Loader from "../../Loader/Loader"
import {API,baseURL} from '../../../api/apirequest';
const GeneralBookings = () => {





    return (
        <>

            <div className='activities-container'>
                <div className="activities-heading">General Bookings</div>


                <div className="table-container">
                    <Table />

                </div>
            </div>

        </>)
}

export default GeneralBookings

