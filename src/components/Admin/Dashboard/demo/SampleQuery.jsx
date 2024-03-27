import React, { useState, useEffect } from 'react'


import { Table } from 'antd';

import {API,baseURL} from '../../../api/apirequest';



const SampleQuery = () => {
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
    //   const columns = [
    //     {
    //       field :'ID',
    //       headerName :'id',
       
    //     },
    //     {
    //       field :'Package ID',
    //       headerName :'package_id',
       
    //     },
    //     {
    //       field :'User Name',
    //       headerName :'user_name',
    //       width:200,
       
    //     },
    //     {
    //       field :'Contact Number',
    //       headerName :'contact_number',
    //       width:150,
        
    //     },
    //     {
    //       field :'Email ID',
    //       headerName :'email_id',
    //       width:200,
        
    //     },
    //     {
    //         field :'Current Location',
    //         headerName :'current_loaction',
    //         width:200,
       
    //       },
    //     // {
    //     //   field :'Created At',
    //     //   headerName :'createdAt',
       
    //     // },
    //     // {
    //     //   field :'Updated At',
    //     //   headerName :'updatedAt',
      
    //     // },
    //     // {
    //     //   field :'Published At',
    //     //   headerName :'publishedAt',
         
    //     // },
        
    //   ];
    
    
       return <Table dataSource={rows}     columns={columns} />
    //<DataGrid
    //                               rows={rows}
    //                               columns={columns}
    //                               pageSize={5}
      
    //                               rowsPerPageOptions={[5]}
      
    //                           />


    
    };
    

export default SampleQuery

