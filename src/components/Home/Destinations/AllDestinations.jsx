import React, { useState, useEffect, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from "axios";
import "./Destinations.scss";

import { Skeleton } from 'antd'
import {API,baseURL} from '../../../api/apirequest';

const AllDestinations = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        const getData = async () => {
            try {

                let d = await API.get('/api/all-destinations?populate=*')
                setData(d.data.data)
                setLoading(false)

            } catch (err) {
                setLoading(true)
                // console.log(err)

            }
        }
        getData();
        
        window.scrollTo(0, 0);
    }, [])
    // console.log(data)


    return (
        <div className="section">
            <div className="banner">
                <div className="image">
                    <img src="https://www.esikkimtourism.in/wp-content/uploads/2018/10/gangtok-bnnr.jpg" alt="banner" />
                </div>
            </div>
            <div className="destination-container">
                {
                    loading ?
                        (
                            <Skeleton active />
                        )
                        :
                        (<>


                            <div className="section-title">
                                All Destinations
                            </div>

                            <div className="card-container" style={{ flexWrap: 'wrap' }}>
                                {
                                    data
                                        .sort((a, b) => a.id > b.id ? 1 : -1)


                                        .map((val) => {
                                            return (

                                                <Link to={`/single-destination/${val?.attributes?.name}`} >

                                                    <div className="card-content" key={val.id}>

                                                        <div className="card-image">
                                                            <img className='img' loading="lazy"
                                                                src={`${baseURL}${val?.attributes?.images?.data[0]?.attributes?.url}`}
                                                                alt={`${baseURL}${val?.attributes?.images?.data[0]?.attributes?.name}`}
                                                            />

                                                        </div>
                                                        <div className="card-overlay" >
                                                            <div className="upper">
                                                                <div className="card-title">
                                                                    {val?.attributes?.name}
                                                                </div>
                                                            </div>
                                                            <div className="bottom">
                                                                <div className="card-package-details">
                                                                    <div className="left">
                                                                        {val?.attributes?.packages} Packages
                                                                    </div>
                                                                    <div className="right">
                                                                        {val?.attributes?.activities} Activities
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </Link>

                                            )
                                        })

                                }
                            </div>
                        </>
                        )
                }
            </div>
        </div >
    )
}

export default AllDestinations
