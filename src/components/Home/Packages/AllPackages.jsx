import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import "./Packages.scss";

import { Skeleton } from 'antd'
import { API, baseURL } from '../../../api/apirequest';

const AllPackages = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const [currentPath, setCurrentPath] = useState();

    useEffect(() => {
        setCurrentPath(window.location.pathname)
    }, [])
    localStorage.setItem('pathName', currentPath)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getData = async () => {
            try {
                let d = await API.get('/api/all-packages?populate=*')
                setData(d.data.data)
                setLoading(false)

            } catch (err) {
                setLoading(true)
                console.log(err)
            }
        }
        getData();
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="section">
            <div className="banner">
                <div className="image">
                    <img src="https://admin.aventuras.co.in/uploads/travel_all_b4a85347ca.png" alt="banner" />
                </div>
            </div>
            <div className="packages-container">
                {loading ? (<Skeleton active />)
                    :
                    (<>
                        <div className="section-title">
                            All Packages
                        </div>
                        <div className="card-container" style={{ flexWrap: 'wrap' }}>
                            {data.sort((a, b) => a.id > b.id ? 1 : -1).map((val) => {
                                return (
                                    <Link to={`/single-package/${val?.attributes?.package_id}`} >
                                        <div className="card-content " key={val.id}
                                        >
                                            <div className="card-image">
                                                {val?.attributes?.package_images?.data
                                                    ?
                                                    (<div className="card-image">
                                                        <img className='img' loading="lazy"
                                                            src={`${baseURL}${val?.attributes?.package_images?.data?.slice(0, 1)?.map((v) => {
                                                                return v.attributes?.url
                                                            })}`}
                                                            alt={`${baseURL}${val?.attributes?.package_images?.data?.slice(0, 1)?.map((v) => {
                                                                return v.attributes?.name
                                                            })}`}
                                                        />
                                                    </div>)
                                                    :
                                                    (<div className="card-image">
                                                        <img className='img' loading="lazy"
                                                            src={`${baseURL}${val?.attributes?.package_images?.data?.map((v) => {
                                                                return v.attributes?.url
                                                            })}`}
                                                            alt={`${baseURL}${val?.attributes?.package_images?.data?.map((v) => {
                                                                return v.attributes?.name
                                                            })}`}
                                                        />
                                                    </div>)

                                                }
                                            </div>
                                            <div className="card-overlay">
                                                <div className="upper">
                                                    <div className="card-title">
                                                        {val?.attributes?.name}
                                                    </div>
                                                    <div className="card-package">
                                                        {(val?.attributes?.package_nights) === 0 ?
                                                            <>
                                                                {`${(val?.attributes?.package_nights) + 1} Day`}
                                                            </> :
                                                            <>
                                                                {(val?.attributes?.package_nights) === 1 ?
                                                                    <>
                                                                        {`${(val?.attributes?.package_nights) + 1} Days / ${val?.attributes?.package_nights} Night`}
                                                                    </> :
                                                                    <>
                                                                        {`${(val?.attributes?.package_nights) + 1} Days / ${val?.attributes?.package_nights} Nights`}
                                                                    </>
                                                                }
                                                            </>}
                                                    </div>
                                                </div>
                                                <div className="card-package-id">
                                                    Package ID: {val?.attributes?.package_id}
                                                </div>
                                            </div>
                                            <div class="middle">
                                                <div className="text">
                                                    <button className="form-button">click to enquiry</button>
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

export default AllPackages
