import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import "./grouptour.scss";
import "./Sample.scss";
import { API, baseURL } from "../../api/apirequest"
import { Skeleton } from 'antd'

const MultiplegroupTour = () => {
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

                let d = await API.get('/api/group-tours?populate=deep')
                setData(d.data.data)
                setLoading(false)
            } catch (err) {
                setLoading(true)
            }
        }
        getData();

        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="section">
            <div className="banner">
                <div className="image">
                    <img src="https://admin.aventuras.co.in/uploads/multi_group_d73035ea26.jpeg" alt="banner" />
                </div>
            </div>
            <div className="group-package-container">
                {
                    loading ?
                        (
                            <Skeleton active />
                        )
                        :
                        (<>
                            <div className="section-title">
                                Group Tour Packages
                            </div>
                            <div className="card-container" style={{ flexWrap: 'wrap' }}>
                                {
                                    data.sort((a, b) => a.id > b.id ? 1 : -1).map((val) => {
                                        return (
                                            <Link to={`/single-group-tour/${val?.attributes?.package_id}`} >
                                                <div className="card-content " key={val.id}
                                                >
                                                    <div className="card-image">
                                                        {
                                                            val?.attributes?.package_images?.data.length > 1
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
                                                                        src={`${baseURL}${val?.attributes?.package_images?.data?.slice(0, 1)?.map((v) => {
                                                                            return v.attributes?.url
                                                                        })}`}
                                                                        alt={`${baseURL}${val?.attributes?.package_images?.data?.slice(0, 1)?.map((v) => {
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
                                                                {val?.attributes?.package_nights === 0 ? (
                                                                    <>1 Day</>
                                                                ) : (
                                                                    <>
                                                                        {`${(val?.attributes?.package_nights) + 1} Days / ${val?.attributes?.package_nights} Nights`}</>
                                                                )}
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

export default MultiplegroupTour
