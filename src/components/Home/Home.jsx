import React, { useState, useEffect, Suspense } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "../Loader/Loader";
import { API } from '../../api/apirequest';
import axios from 'axios';
import "./Home.scss";
import Wrapper from './Wrapper';

const Home = (props) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    let endpoints = [
        '/api/banners?populate=*',
        '/api/brand-infos?populate=*',
        '/api/special-packages?populate=deep',
        '/api/top-destinations?populate=deep',
        '/api/group-tours?populate=*',
        '/api/themes?populate=*',
        '/api/customer-reviews?populate=*',
        '/api/contact-details'
    ]

    useEffect(() => {
        const getData = async () => {
            try {

                let d = await axios.all(endpoints.map((endpoint) => API.get(endpoint))).then(
                    axios.spread((
                        { data: banners },
                        { data: brandinfos },
                        { data: special_packages },
                        { data: destinations },
                        { data: group_tours },
                        { data: theme },
                        { data: testimonial },
                        { data: contact_details },
                    ) => {
                        setData({ banners, brandinfos, special_packages, destinations, group_tours, theme, testimonial, contact_details });
                        setLoading(false)
                    })
                );
            } catch (err) {
                setLoading(true)
            }
        }
        getData();
        window.scrollTo(0, 0);
    }, [])

    return (
        <div>
            <Suspense fallback={<Loader />} >
                {loading ? <Loader /> : <>
                    <div className='home-container'>
                        <Wrapper data={data} loading={loading} />
                    </div>
                </>}
            </Suspense>
        </div>
    )
}

export default Home