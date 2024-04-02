
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Skeleton } from 'antd'
import "./Theme.scss";

import { API, baseURL } from "../../../api/apirequest";
const AllThemes = () => {
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
                let d = await API.get('/api/themes?populate=*')
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
                    <img src="https://admin.aventuras.co.in/uploads/photo_1501785888041_af3ef285b470_4cbdd609f0.jpeg" alt="banner" />
                </div>
            </div>
            <div className="theme-container">
                {loading ? (<Skeleton active />)
                    :
                    (<>
                        <div className="section-title">
                            All Themes
                        </div>
                        <div className="card-container" style={{ flexWrap: 'wrap' }}>
                            {
                                data.map((val) => {
                                    return (
                                        <>
                                            <Link to={`/single-theme/${val.id}`} >
                                                <div className="card-content" key={val.id}>
                                                    <div className="card-image">
                                                        <img className='img' loading="lazy"
                                                            src={`${baseURL}${val?.attributes?.images?.data[0]?.attributes?.url}`}
                                                            alt={`${baseURL}${val?.attributes?.images?.data[0]?.attributes?.name}`}
                                                        />
                                                    </div>
                                                    <div className="card-overlay">
                                                        <div className="upper">
                                                            <div className="card-title">
                                                                {val?.attributes?.title}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </>)}
            </div>
        </div>
    )
}

export default AllThemes


