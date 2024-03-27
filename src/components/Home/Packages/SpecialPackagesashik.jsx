import React, { useState, useEffect, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Slider from "react-slick";
import "./Packages.scss";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fab from '@mui/material/Fab';

import { Skeleton } from 'antd'
import { baseURL } from '../../../api/apirequest';

const SpecialPackages = ({ data, loading }) => {

    //change image index for banner
    const [bgImage, setBgImage] = useState([]);

    useEffect(() => {

        // image data
        let filterImage = data.data.map((item) => {
            return item?.attributes?.package_images?.data?.map((i, index) => {
                return i;
              
            });
        });


    }, [])

    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
        // <span {...props}><img src={`https://admin.aventuras.co.in/uploads/arrow_right_b4d68d463d.png?updated_at=2023-03-24T12:13:32.807Z`}/></span>
        // <img src={KeyboardArrowUpIcon} alt="nextArrow" {...props} />
        <span {...props}>&larr;</span>
    );

    const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
        // <img src='{BsChevronRight }' alt="nextArrow" {...props} />
        <div {...props}>&rarr;</div>
    );
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,

                }
            },

            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };


    return (
        <div className="section">

            <div className="packages-container">
                {
                    loading ?
                        (
                            <Skeleton active />
                        )
                        :
                        (<>
                            <div className="section-title">
                                Special Packages
                            </div>

                            <div >
                                <Slider {...settings} className="card-container">
                                    {
                                        data.data
                                            .sort((a, b) => a.id > b.id ? 1 : -1)
                                            // .filter((item, index) => index < 8)

                                            .map((val) => {
                                                return (
                                                    <Link to={`/single-package/${val?.attributes?.package_id}`}>
                                                        <>
                                                            {val?.attributes?.special_package ? <>
                                                                <div className="card-content " key={val.id}>
                                                                    {
                                                                        val?.attributes?.package_images?.data.length > 1
                                                                            ?
                                                                            (<div className="card-image">
                                                                                <img className='img' loading="lazy"
                                                                                    src={`${baseURL}${val?.attributes?.package_images?.data?.slice(0, 1)?.map((v) => {
                                                                                        return v.attributes?.url
                                                                                    })}`}
                                                                                    // alt="2"
                                                                                    alt={`${baseURL}${val?.attributes?.package_images?.data?.slice(0, 1)?.map((v) => {
                                                                                        return v.attributes?.url
                                                                                    })}`}
                                                                                />
                                                                            </div>)
                                                                            :
                                                                            (<div className="card-image">
                                                                                <img className='img' loading="lazy"
                                                                                    src={`${baseURL}${val?.attributes?.package_images?.data?.map((v) => {
                                                                                        return v.attributes?.url
                                                                                    })}`}
                                                                                    alt={val?.attributes?.package_images?.data?.map((v) => {
                                                                                        return v.attributes?.name
                                                                                    })}
                                                                                />
                                                                            </div>)

                                                                    }

                                                                    <div className="card-overlay">
                                                                        <div className="upper">
                                                                            <div className="card-title">
                                                                                {val?.attributes?.name}
                                                                            </div>
                                                                            {/* <div className="card-package">
                                                                                {val?.attributes?.package_durations?.data?.map((v) => {
                                                                                    return v.attributes?.duration
                                                                                })}
                                                                            </div> */}
                                                                             <div className="card-package">
                                                                                {(val?.attributes?.package_nights)===0?
                                                                                <>
                                                                             {`${(val?.attributes?.package_nights)+1} Day`}
                                                                             </>:
<>
                                                                                 {(val?.attributes?.package_nights)===1?
                                                                                <>
                                                                                {`${(val?.attributes?.package_nights)+1} Days / ${val?.attributes?.package_nights} Night`} 
                                                                                </>:                                                                           
                                                                             <> 
                                                                             {`${(val?.attributes?.package_nights)+1} Days / ${val?.attributes?.package_nights} Nights`}
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
                                                            </> : null}
                                                        </>

                                                    </Link>

                                                )
                                            })

                                    }
                                </Slider>
                            </div>



                            <div className="additional">
                                <Link to="/all-packages">
                                    <div className="line">
                                        <div className="text">Explore More Packages</div>
                                        <div className="image">
                                            {/* <img className='img' loading="lazy" src={`https://admin.aventuras.co.in/uploads/arrow_right_b4d68d463d.png?updated_at=2023-03-24T12:13:32.807Z`} alt="arrow" width="20" height="20" /> */}
                                            <img className='img' loading="lazy" src={`https://admin.aventuras.co.in/uploads/arrow_right_b4d68d463d.png`} alt="arrow" width="20" height="20" />
                                        </div>
                                    </div>
                                </Link>
                            </div>

                        </>)
                }
            </div>

        </div>
    )
}

export default SpecialPackages
