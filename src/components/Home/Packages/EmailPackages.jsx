
import React from 'react';
import {API,baseURL} from "../../../api/apirequest";
import type { TabsProps } from 'antd';
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
import "./SinglePackages.scss";
import { Carousel, Skeleton } from 'antd'
import { Tabs } from 'antd';
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
import nodemailer from 'nodemailer';

const EmailPackages = () => {

    const sendEmail = async () => {
      // Create a test account with Ethereal
      const testAccount = await nodemailer.createTestAccount();
    
      // Create a transporter object with Ethereal SMTP configuration
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'lemuel.nicolas64@ethereal.email',
            pass: 'GwzphewdNtdx9YAp6d'
        }
    });
      // Define the email options
      const mailOptions = {
        from: 'your-email@example.com',
        to: 'recipient@example.com',
        subject: 'Test Email',
        text: 'This is a test email sent from React using Nodemailer and Ethereal.',
      };
    
      // Send the email
      const info = await transporter.sendMail(mailOptions);
    
      // Log the message URL for testing purposes
    //   console.log('Message URL:', nodemailer.getTestMessageUrl(info));
    };
    
    sendEmail();
    
    let { package_id } = useParams();
    const [value, setValue] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const [data, setData] = useState({
        "package_id": "",
        "package_name": "",
        "user_name": "",
        "contact_number": "",
        "email_id": "",
        "current_location": "",
        "price_detail": "",
        "number_of_person": "",
        "number_of_room": "",
    });
    useEffect(() => {
        const getData = async () => {

            try {

                let d = await API.get(`/all-packages?populate=*&filters[package_id][$eq]=${package_id}`)


                setValue(d.data.data[0])

                const initialQuery = {
                    "package_id": `${d.data.data[0]?.attributes?.package_id}`,
                    "user_name": "",
                    "contact_number": "",
                    "email_id": "",
                    "current_location": "",
                    "package_name": `${d.data.data[0]?.attributes?.name}`
                };
                setData(initialQuery);
                setLoading(false)

            } catch (err) {
                // console.log(err)
                setLoading(true)

            }
        }
        getData();
    }, [])
    
    const ReadMore = ({ children }) => {
        const text = children;
        const [isReadMore, setIsReadMore] = useState(true);
        const toggleReadMore = () => {
            setIsReadMore(!isReadMore);
        };
        return (
            <p className="text">
                {isReadMore ? text.slice(0, 150) : text}
                <span onClick={toggleReadMore} style={{ cursor: 'pointer' }}>
                    {isReadMore ? "...read more" : " show less"}
                </span>
            </p>
        );
    };



    // console.log(data)
    const handleChange = (e) =>
        setData(prevState => ({ ...prevState, [e.target.name]: e.target.value }))



        const handleSubmit = async (e) => {
            e.preventDefault();
          
            const config = {
              headers: {
                'Content-Type': 'application/json',
                // Add any other headers that are required for your API
              },
            };
          
            try {
              let ob = {
                data
              };
          
              const res = await API.post('/customer-enquiries', ob, config);
          
          
                // Display a success message
                alert('Enquiry Sent!');
          
                // console.log(res.data);
             
            } catch (error) {
            //   console.log(error);
            }
          
            // console.log(data);
          };

    const onChange = (key: string) => {
        // console.log(key);
    };


    const downloadFileAtUrl = (url) => {
        fetch(url)
            .then((response) => response.blob())
            .then((blob) => {
                const blobURL = window.URL.createObjectURL(new Blob([blob]))

                const fileName = url.split("/").pop();
                const aTag = document.createElement('a');
                aTag.href = blobURL;
                aTag.setAttribute("download", fileName)
                document.body.appendChild(aTag)
                aTag.click();
                aTag.remove();
            })

    }

    const Accordion = styled((props) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    }));

    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
            {...props}
        />
    ))(({ theme }) => ({
        backgroundColor:
            theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, .05)'
                : 'rgba(0, 0, 0, .03)',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1),
        },
    }));

    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
        padding: theme.spacing(2),
        borderTop: '1px solid rgba(0, 0, 0, .125)',
    }));
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange2 = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

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
                                {batch_data.start} - {batch_data.end}
                            </span>
                            <div>Available slots : {batch_data.slots_available} </div>
                            <div> Price per person : <span style={{ fontWeight: '600' }}>{batch_data.price_per_person}</span> </div>
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
                                {batch_data.start} - {batch_data.end}
                            </span>
                            <div>Available slots : {batch_data.slots_available} </div>
                            <div> Price per person : <span style={{ fontWeight: '600' }}>{batch_data.price_per_person}</span> </div>
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
    const Overview = () => {
        const [isReadMore, setIsReadMore] = useState(true);
        const toggleReadMore = () => {
            setIsReadMore(!isReadMore);
        };
        return (
            <>

                <div className="description">
                    <div className="desc">

                        {value?.attributes?.description.length > 0 ? <>
                            <div className="heading">
                                Description :
                                <hr />
                            </div>

                            {isReadMore ? <> {value?.attributes?.description.slice(0, 180)}</> : <>{value?.attributes?.description}</>}
                            <span onClick={toggleReadMore} className='read-more-less'>
                                {isReadMore ? "...read more" : " show less"}
                            </span>
                        </> : null}
                        {/* {value?.attributes?.description} */}

                    </div>

                </div>
            </>
        )
    }

    const Itinerary = () => {
        return (
            <>
                <div className="heading">
                Itinerary
                </div>
                <div className="single-line">
                    <div className="heading">
                        {value?.attributes?.name}

                    </div>

                </div>
                <Collapse defaultActiveKey={['1']} onChange={onChange} size="large">
                    <div>

                    </div>
                    {value?.attributes?.itenary_days.map((v) => {
                        return (
                            <>
                                <Panel header={v.itenary_day_title} key={v.id}>
                                    <p>  <ReactMarkdown>{v.description}</ReactMarkdown></p>
                                </Panel>
                            </>
                        )
                    })}

                </Collapse>




            </>
        )
    }

    const Info = () => {
        return (
            <>
                <div className="heading">
                    Other Info
                </div>


                <div className="desc">
                    <ul className="list">
                        <ReactMarkdown>{value?.attributes?.inclusions}</ReactMarkdown>

                    </ul>
                </div>

                <div className="desc">
                    <ul className="list">
                        <ReactMarkdown>{value?.attributes?.exclusions}</ReactMarkdown>

                    </ul>
                </div>
            </>
        )
    }


    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Itinerary`,
            children: <Itinerary />,
        },
        {
            key: '2',
            label: `Other Info`,
            children: <Info />,
        }

    ];




    return (
        <>
            <div className="pages-container" key={value.id}>
                {
                    loading ?
                        (
                            <>
                                <Skeleton active />
                                <Skeleton active />
                                <Skeleton active />
                                <Skeleton active />
                            </>
                        )
                        :
                        (
                            <>

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

                        {value?.attributes?.package_images?.data?.map((v)=> {

                            return (
                              <>

                                <img className='img' loading="lazy" src={v.attributes?.url}
                                  alt={v.attributes?.url}
                                />
                              </>
                            )
                          })}
                      </Carousel>
                                        {/* <img
                                            src={value?.attributes?.package_images?.data?.map((v) => {
                                                return v.attributes?.url
                                            })}
                                            alt={value?.attributes?.package_images?.data?.map((v) => {
                                                return v.attributes?.name
                                            })}
                                        /> */}

                                    </div>
                                </div>
                                <div className="text-container">
                                    <div className="text-wrapper">
                                        <div className="left-content">
                                            <div className="top">
                                                {/* <div className="package">{value?.attributes?.package_durations?.data[0]?.attributes?.duration}</div> */}
                                                <div className="package">{value?.attributes?.package_days} days/ {value?.attributes?.package_nights} nights</div>

                                                <div className="single-line">
                                                    <div class="title">{value?.attributes?.name}</div>
                                                    {/* <a href={`${value?.attributes?.itenary_pdf?.data?.attributes?.url}`} download={`${value?.attributes?.name} itenary`}>
                                        <button className="form-button" >Download Itenary</button>
                                    </a> */}
                                                    <button className="form-button" onClick={() => downloadFileAtUrl(value?.attributes?.itenary_pdf?.data?.attributes?.url)} >download itenary</button>

                                                </div>
                                                <Overview />


                                                <div className="facilities">
                                                    {value?.attributes?.hotel_stay ?
                                                        <div className="perks" style={{ opacity: '1', color: 'green', textDecorationLine: 'none' }}>
                                                            <span className="icon">
                                                                <LocationCityIcon />
                                                            </span>
                                                            <span className="text">Hotel Stay</span>
                                                        </div>
                                                        :
                                                        <>
                                                            <div className="perks" style={{ opacity: '.7', color: 'red', textDecorationLine: 'line-through' }}>
                                                                <span className="icon">
                                                                    <LocationCityIcon />
                                                                </span>
                                                                <span className="text">Hotel Stay</span>
                                                            </div>
                                                        </>
                                                    }

                                                    {value?.attributes?.flights ?
                                                        <div className="perks" style={{ opacity: '1', color: 'green', textDecorationLine: 'none' }}>
                                                            <span className="icon"><ConnectingAirportsIcon /></span>
                                                            <span className="text">Flights</span>
                                                        </div>
                                                        :
                                                        <>
                                                            <div className="perks" style={{ opacity: '.7', color: 'red', textDecorationLine: 'line-through' }}>
                                                                <span className="icon"><ConnectingAirportsIcon /></span>
                                                                <span className="text">Flights</span>
                                                            </div>

                                                        </>
                                                    }



                                                    {value?.attributes?.sight_seeing ?
                                                        <>
                                                            <div className="perks" style={{ opacity: '1', color: 'green', textDecorationLine: 'none' }}>
                                                                <span className="icon"><PhotoCameraBackIcon /></span>
                                                                <span className="text">Sight seeing</span>
                                                            </div>
                                                        </>
                                                        : <>
                                                            <div className="perks" style={{ opacity: '.7', color: 'red', textDecorationLine: 'line-through' }}>
                                                                <span className="icon"><PhotoCameraBackIcon /></span>
                                                                <span className="text">Sight seeing</span>
                                                            </div></>}


                                                    {value?.attributes?.cabs_transfer ?
                                                        <>
                                                            <div className="perks" style={{ opacity: '1', color: 'green', textDecorationLine: 'none' }}>
                                                                <span className="icon"><AirportShuttleIcon /></span>
                                                                <span className="text">Cab transfer</span>
                                                            </div>
                                                        </>
                                                        : <>
                                                            <div className="perks" style={{ opacity: '.7', color: 'red', textDecorationLine: 'line-through' }}>

                                                                <span className="icon"><AirportShuttleIcon /></span>
                                                                <span className="text">Cab transfer</span>
                                                            </div></>}


                                                    {value?.attributes?.meals ?
                                                        <>
                                                            <div className="perks" style={{ opacity: '1', color: 'green', textDecorationLine: 'none' }}>
                                                                <span className="icon"><FastfoodIcon /></span>
                                                                <span className="text">Meals</span>
                                                            </div>
                                                        </>
                                                        : <>
                                                            <div className="perks" style={{ opacity: '.7', color: 'red', textDecorationLine: 'line-through' }}>

                                                                <span className="icon"><FastfoodIcon /></span>
                                                                <span className="text">Meals</span>
                                                            </div></>}





                                                </div>
                                            </div>
                                            <div className="bottom">
                                                <Tabs size='large' type="card"
                                                    defaultActiveKey="1" items={items}
                                                    onChange={onChange} />


                                            </div>

                                        </div>


                                        <div className="right-content">
                                            <div className="form-container">

                                                <div className="packageId">{value?.attributes?.package_id}</div>
                                                <div class="title">{value?.attributes?.name}</div>
                                                {/* <div className="package">{value?.attributes?.package_durations?.data[0]?.attributes?.duration}</div> */}

                                                <div className="package">{value?.attributes?.package_days} days/ {value?.attributes?.package_nights} nights</div>

                                                <form class="form">

                                                    <input type="hidden" placeholder="Package Id" value={data.package_id} onChange={handleChange} name="package_id" />
                                                    <input type="hidden" placeholder="Package Name" value={data.package_name} onChange={handleChange} name="package_name" />
                                                    <input type="text" placeholder="Your Name" onChange={handleChange} name="user_name" />
                                                    <input type="text" placeholder="Your Mobile Number" onChange={handleChange} name="contact_number" />
                                                    <input type="email" placeholder="Your Email Address" onChange={handleChange} name="email_id" />
                                                    <input type="text" placeholder="Current Location" onChange={handleChange} name="current_location" />

                                                    <button className="form-button" onClick={handleSubmit}>send enquiry</button>

                                                </form>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </>


                        )
                }
            </div>
        </>


    )
}

export default EmailPackages;
