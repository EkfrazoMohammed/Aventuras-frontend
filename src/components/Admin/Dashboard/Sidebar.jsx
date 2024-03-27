import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "./scss/sidebar.scss"
import { Link } from "react-router-dom";

import GeneralBookings from './GeneralBookings';
import StrapiCMS from './StrapiCMS';
import Queries from './Queries';
import axios from "axios";
import Loader from "../../Loader/Loader"
import GroupBookings from './GroupBookings';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function Sidebar() {
    
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    const [packages, setPackages] = useState(null);
    const [destinations, setDestinations] = useState(null)


    let endpoints = [

        "https://aventurasdb.onrender.com/api/all-packages?populate=*",
        "https://aventurasdb.onrender.com/api/all-destinations?populate=*",

        "https://aventurasdb.onrender.com/api/customer-reviews?populate=*",

    ]

    useEffect(() => {

        const getData = async () => {
            try {

                let d = await axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
                    axios.spread((

                        { data: all_packages },
                        { data: all_destinations },

                        { data: reviews },
                    ) => {
                        // console.log({ banners, brandinfos, packages, destinations });
                        setData({ all_packages, all_destinations, reviews });
                        setPackages(data.all_packages.data.length)
                        setDestinations(data.all_destinations.data.length)
                        setLoading(false)
                    })
                );
            } catch (err) {
                // console.log(err)
                setLoading(true)
            }
        }
        getData();
    }, [])
 


    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const RedirectPage = () => {

        // window.location.replace('https://www.google.com')
        window.open('https://aventurasdb.onrender.com/admin', '_blank');

    }

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', minHeight: '90vh' }} className='admin-container'
        >



            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
                className='tabs-sidebar'
            >

                <div className="admin-title" {...a11yProps(0)} >Admin dashboard</div>
                <Tab label="General Bookings" {...a11yProps(1)} />
                <Tab label="Group Bookings" {...a11yProps(2)} />
                <Tab label="Queries" {...a11yProps(3)} />
                <Tab label="CMS" onClick={() => RedirectPage()} {...a11yProps(4)} />
                {/* <Tab label="Demo Queries" {...a11yProps(5)} /> */}
                {/* <Tab label="CMS" {...a11yProps(2)} /> */}

            </Tabs>
            <div className="dashboard-container">
                <div className="cards-wrapper">
                    <div className='activities-container'>
                        <div className="activities-heading"></div>

                        <div className="cards-container">

<div className="card-content" style={{ borderLeft: '4px solid blue' }}>
    <div className="up">

        <div className="title">
            live
        </div>
    </div>
    <div className="down">
        <div className="number">{data && data.all_destinations.data.length > 0 ?
            data.all_destinations.data.length :
            <>
                0</>
        } destinations ,</div>
        <div className="text">{data && data.all_packages.data.length > 0 ?
            data.all_packages.data.length :
            <>
                0</>
        } packages</div>
    </div>

</div>

<div className="card-content" style={{ borderLeft: '4px solid orange' }}>
    <div className="up">

        <div className="title">
            Today's 
        </div>
    </div>
    <div className="down">
        <div className="number">11</div>
        <div className="text">booked</div>
    </div>

</div>



<div className="card-content" style={{ borderLeft: '4px solid green' }}>
    <div className="up">

        <div className="title">
            Today's Revenue
        </div>
    </div>
    <div className="down">
        <div className="number">Rs.</div>
        <div className="text">49,500.00</div>
    </div>

</div>

<div className="card-content" style={{ borderLeft: '4px solid red' }}>
    <div className="up">

        <div className="title">
            Pending Payments
        </div>
    </div>
    <div className="down">
        <div className="number">Rs. </div>
        <div className="text">14,500.00</div>
    </div>

</div>
</div>


                    </div>
                </div>
                <div className="tabs-container">
                    <TabPanel value={value} index={0}>
                        <GeneralBookings/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                    <GeneralBookings/>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                   <GroupBookings />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                       <Queries />
                    </TabPanel>
                    <TabPanel value={value} index={4} >
                        <StrapiCMS />
                    </TabPanel>
               
                </div>
            </div>

        </Box >
    );
}