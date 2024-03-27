import React, { useState, useEffect } from 'react'
import "./scss/Bookings.scss";
import Thirdtable from './Thirdtable';
import axios from "axios";
import Loader from "../../Loader/Loader"
import { DataGrid } from '@mui/x-data-grid';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';



import { Table } from 'antd';

import {API,baseURL} from '../../../api/apirequest';
const DemoTable = () => {

    const [data,setData]=useState([])
    const [loading,setLoading]=useState([])
    useEffect(() => {

                const getData = async () => {
                    try {
        
                        let d = await API.get('/customer-enquiries?populate=deep')
                        setData(d.data.data)
                        setLoading(false)
        
                    } catch (err) {
                        setLoading(true)
                        // console.log(err)
        
                    }
                }
                getData();
            }, [])
    const rows = data.map((item) => ({
        id: item.id,
        package_id: item.attributes.package_id,
        user_name: item.attributes.user_name,
        contact_number: item.attributes.contact_number,
        email_id: item.attributes.email_id,
        current_loaction: item.attributes.current_loaction,
        createdAt: item.attributes.createdAt,
        updatedAt: item.attributes.updatedAt,
        publishedAt: item.attributes.publishedAt,
      }));
    
      const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Package ID',
          dataIndex: 'package_id',
          key: 'package_id',
        },
        {
          title: 'User Name',
          dataIndex: 'user_name',
          key: 'user_name',
        },
        {
          title: 'Contact Number',
          dataIndex: 'contact_number',
          key: 'contact_number',
        },
        {
          title: 'Email ID',
          dataIndex: 'email_id',
          key: 'email_id',
        },
        {
            title: 'Current Location',
            dataIndex: 'current_loaction',
            key: 'current_loaction',
          },
        {
          title: 'Created At',
          dataIndex: 'createdAt',
          key: 'createdAt',
        },
        {
          title: 'Updated At',
          dataIndex: 'updatedAt',
          key: 'updatedAt',
        },
        {
          title: 'Published At',
          dataIndex: 'publishedAt',
          key: 'publishedAt',
        },
        
      ];


    return (
        <>

            <div className='activities-container'>
                <div className="activities-heading">DemoTable</div>
                <div className="table-container">

                    <div style={{ height: 'auto', width: '100%', padding: '1rem 0' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}

                            rowsPerPageOptions={[5]}

                        />
                    </div>

                </div>
            </div>

        </>)
}

export default DemoTable

