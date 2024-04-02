import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Carousel, Skeleton } from 'antd'
import "./SingleTheme.scss";
import { API, baseURL } from '../../../api/apirequest';

const SingleTheme = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const [currentPath, setCurrentPath] = useState();
    useEffect(() => {
        setCurrentPath(window.location.pathname)
    }, [])
    localStorage.setItem('pathName', currentPath)
    let { id } = useParams();

    const [value, setValue] = useState([]);
    const [loading, setLoading] = useState(true);
    const [packages, setPackages] = useState([])
    const [bgimage, setBgimage] = useState([])
    useEffect(() => {
        const getData = async () => {
            try {
                let d = await API.get(`/api/themes/${id}?populate=deep`)
                setValue(d.data.data)
                let filterData = d.data.data.attributes.all_packages.data.map((v) => {
                    return v;
                });
                setPackages(filterData)
                let images = d?.data?.data?.attributes?.images?.data?.map((v) => {
                    return v;
                });
                setBgimage(images)
                setLoading(false)

            } catch (err) {
                setLoading(true)
            }
        }
        getData();
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <div className="single-theme-section">
                <div className="banner">
                    <div className="image">
                        <Carousel effect="fade"
                            autoplay
                            dotPosition="bottom"
                            dots={false}
                            pauseOnHover={false}
                            autoplaySpeed={2500}
                            pauseOnFocus={false}
                        >
                            {bgimage.map((v) => {
                                return (
                                    <>
                                        <img src={`${baseURL}${v?.attributes?.url}`} alt="" />
                                    </>
                                )
                            })}
                        </Carousel>

                    </div>
                </div>
                <div className="single-theme-container">
                    {loading ? (<Skeleton active />)
                        :
                        (<>{<div className="section-title">
                            {value.attributes.title}
                        </div>
                        }
                            <div className="card-container">
                                {packages.sort((a, b) => a.id > b.id ? 1 : -1).map((val) => {
                                    return (
                                        <>
                                            {val?.attributes ? <>
                                                <Link to={`/single-package/${val?.attributes?.package_id}`} >
                                                    <div className="card-content " key={val.id}>
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
                                            </> : null}
                                        </>
                                    )
                                })
                                }
                            </div>
                        </>)
                    }
                </div>
            </div>
        </>
    )
}

export default SingleTheme;
