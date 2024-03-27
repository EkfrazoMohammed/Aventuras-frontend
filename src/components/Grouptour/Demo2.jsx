import { useState, useEffect } from 'react';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import FlightIcon from '@mui/icons-material/Flight';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import TerrainIcon from '@mui/icons-material/Terrain';
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';
import "./singlegroup.scss";
import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Button, Modal } from 'antd';
import ReactMarkdown from 'react-markdown'

import { Collapse } from 'antd';
const { Panel } = Collapse;



const Demo2 = () => {

    let { package_id } = useParams();
    const [value, setValue] = useState([]);
    const [count, setCount] = useState(0);
    const [mDates, setMDates] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        // let d = await axios.get(`http://https://aventuras.co.in/api/v1/1337/api/special-packages/${id}?populate=*`)
        const getData = async () => {

            try {

                let d = await axios.get(`https://admin.aventuras.co.in/api/group-tours?populate=*&filters[package_id][$eq]=${package_id}`)
                // let d = await axios.get(`http://https://aventuras.co.in/api/v1/1337/api/all-packages?populate=*&filters[package_id][$eq]=${package_id}`)

                setValue(d.data.data[0])
                setMDates(d.data.data[0]?.attributes?.travel_dates.map((v) => (v.batch_starts)))

            } catch (err) {
                console.log(err)

            }
        }
        getData();
    }, [])

    const MyModal = ({ package_data, batch_data }) => {
        const [modal1Open, setModal1Open] = useState(false);
        const [modal2Open, setModal2Open] = useState(false);
        const [modal3Open, setModal3Open] = useState(false);
        return (
            <>
                <Button onClick={() => setModal1Open(true)} style={{ backgroundColor: '#1677ff', color: '#fff' }}>
                    Enquire now
                </Button>


                <Button onClick={() => setModal2Open(true)} style={{ backgroundColor: '#FFD93D', color: '#fff' }}>
                    Book now
                </Button>

                <Modal
                    title="Enquire now"
                    centered
                    open={modal1Open}
                    onOk={() => alert('ok')}
                    onCancel={() => setModal1Open(false)}

                    footer={[
                        <div style={{ display: 'flex', justifyContnent: 'center', gap: '1rem' }}>
                            <Button key="back" style={{ backgroundColor: '#858585', color: '#fff' }} onClick={() => setModal1Open(false)}>
                                Cancel
                            </Button>

                            <Button style={{ backgroundColor: '#1677ff', color: '#fff' }} onClick={() => alert('enquiry sent!')}>
                                Enquire now
                            </Button>
                        </div>
                    ]}

                >
                    <div className="left">

                        <div className="modal-details">
                            <h4>{package_data?.attributes?.name}</h4>
                            <span className="dates-start-end">
                                {batch_data.batch_starts} - {batch_data.batch_starts}
                            </span>
                            <div>Available slots : {batch_data.slots_available} </div>
                            <div> Price per person : <span style={{ fontWeight: '600' }}>{batch_data.price}</span> </div>
                        </div>
                        <div className="form-section">
                            <div className="rows1">
                                <input type="text" placeholder="Enter your Name" />
                                <input type="text" placeholder='Enter your E-mail' />

                                <input type="text" placeholder='Enter mobile number' />
                                <input type="text" placeholder='Current Address' />
                            </div>
                        </div>

                    </div>



                </Modal>
                <Modal
                    title="book now"
                    centered
                    open={modal2Open}
                    onOk={() => alert('ok')}
                    onCancel={() => setModal2Open(false)}

                    footer={[
                        <div style={{ display: 'flex', justifyContnent: 'center', gap: '1rem' }}>
                            <Button key="back" type="primary" onClick={() => setModal2Open(false)}>
                                Cancel
                            </Button>

                            <Button type="primary" onClick={() => setModal3Open(true)}>
                                Proceed to pay
                            </Button>
                        </div>
                    ]}

                >
                    <div className="left">

                        <div className="modal-details">
                            <h4>{package_data?.attributes?.name}</h4>
                            <span className="dates-start-end">
                                {batch_data.batch_starts} - {batch_data.batch_ends}
                            </span>
                            <div>Available slots : {batch_data.slots_available} </div>
                            <div> Price per person : <span style={{ fontWeight: '600' }}>{batch_data.price}</span> </div>
                        </div>
                        <div className="form-section">
                            <div className="rows1">
                                <input type="text" placeholder="Enter your Name" />
                                <input type="text" placeholder='Enter your E-mail' />

                                <input type="text" placeholder='Enter mobile number' />
                                <input type="text" placeholder='Current Address' />
                                <input type="number" placeholder='Number of Persons booking' />
                            </div>
                            <div className="counter">
                                {/* <div onClick={() => setCount(count - 1)}>-</div><span>{count}</span>
                                <div onClick={() => setCount(count + 1)}>+</div> */}

                            </div>
                        </div>

                    </div>
                </Modal>

                <Modal
                    style={{ height: '30vh' }}
                    title="Payment"
                    style={{
                        top: 20,
                    }}
                    open={modal3Open}
                    onOk={() => alert('ok')}
                    onCancel={() => setModal3Open(false)}



                >

                    <img src="https://res.cloudinary.com/dxjrvvjp1/image/upload/v1683263854/image_1_j4hpxl.png" alt="" />
                </Modal>
            </>
        );
    };


    // function formatDate(date) {
    //     const options = { year: 'numeric', month: 'long', day: 'numeric' };
    //     return new Date(date).toLocaleDateString('en-US', options);
    //   }
    console.log(mDates)
    function groupDatesByMonth(dates) {
        const months = {};
        dates.forEach((date) => {
            const month = new Date(date).toLocaleString('default', { month: 'long' });
            if (!months[month]) {
                months[month] = [];
            }
            months[month].push(date);
        });
        return months;
    }

    const { TabPane } = Tabs;
    function Sample() {

        const months = groupDatesByMonth(mDates);

        console.log(months)
        return (

            <div>
                <h1>Dates By Month 2</h1>

                <Tabs>
                    {Object.keys(months).map((month) => (
                        <TabPane tab={month} key={month}>
                            <ul>
                                {months[month].map((date) => (
                                    <>
                                        <div className="date-blocks">


                                            {value?.attributes?.travel_dates ? <>
                                                {value?.attributes?.travel_dates.map((v) => {

                                                    return (
                                                        <>

                                                            {`${new Date(v.batch_starts).toLocaleString('default', { month: 'long' })}` == month ? <>
                                                                <div className="batches">

                                                                    <div className="left">

                                                                        <div className="details">
                                                                            <span className="dates-start-end">
                                                                                {new Date(v.batch_starts).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                                                &nbsp; - &nbsp;
                                                                                {new Date(v.batch_ends).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                                            </span>
                                                                        </div>
                                                                        <div>Available slots : {v.slots_available} </div>
                                                                        <div> Price per person : <span style={{ fontWeight: '600' }}>{v.price}</span> </div>

                                                                    </div>
                                                                    {/* </>:null} */}
                                                                    <div className="right">
                                                                        <MyModal package_data={value} batch_data={v} /></div>

                                                                </div>
                                                            </> : null}

                                                        </>
                                                    )
                                                })}</> : <> <p>no batches</p> </>}
                                        </div>
                                    </>
                                ))}
                            </ul>
                        </TabPane>
                    ))}
                </Tabs>
            </div>
        );
    }



    const items: TabsProps['items'] = [

        {
            key: '1',
            label: `Sample`,
            children: <Sample />,
        },

    ];




    return (
        <>

            <div className="pages-container" key={value.id}>
                <div className="banner">
                    <div className="image">
                        <img
                            src={value?.attributes?.package_images?.data?.map((v) => {
                                return v.attributes?.url
                            })}
                            alt={value?.attributes?.package_images?.data?.map((v) => {
                                return v.attributes?.name
                            })}
                        />
                    </div>
                </div>
                <div className="text-container">
                    <div className="text-wrapper">
                        <div className="left-content">
                            <div className="top">

                                <div className="single-line">
                                    <div class="title">{value?.attributes?.name}</div>
                                    {/* <a href={`${value?.attributes?.itenary_pdf?.data?.attributes?.url}`} download={`${value?.attributes?.name} itenary`}>
                                        <button className="form-button" >Download Itenary</button>
                                    </a> */}
                                </div>


                            </div>
                            <div className="bottom">
                                <Tabs size='large' type="card"
                                    defaultActiveKey="1" items={items}
                                />


                            </div>

                        </div>

                    </div>


                </div>
            </div>


        </>
    )
}

export default Demo2;
