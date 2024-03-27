import React from "react";
import { useState, useEffect } from "react";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import FlightIcon from "@mui/icons-material/Flight";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import TerrainIcon from "@mui/icons-material/Terrain";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./singlegroup.scss";
import { API, baseURL } from "../../api/apirequest";
import { Tabs } from "antd";
import { Carousel, Skeleton } from "antd";
import type { TabsProps } from "antd";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Button, Modal } from "antd";
import ReactMarkdown from "react-markdown";
import { message } from "antd";
import { notification } from "antd";

import { Collapse } from "antd";
const { Panel } = Collapse;

const Singlegrouptour = () => {
  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);

  const today = new Date().toISOString().split("T")[0];
  let { package_id } = useParams();
  const [value, setValue] = useState([]);
  const [count, setCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [mDates, setMDates] = useState([]);

  // console.log(userData)

  const [login, setLogin] = useState(false);

  const navigate = useNavigate();
  const [data, setData] = useState({
    package_id: "",
    package_name: "",
    user_name: "",
    contact_number: null,
    email_id: "",
    current_location: "",
    price_detail: "",
    adults: 0,
    trip_start_date: "",
  });
  const [errors, setErrors] = useState({
    user_name: "",
    contact_number: "",
    email_id: "",
  });
  const [fetchCityName, setFetchCityName] = useState(false);
  const [cityName, setCityName] = useState("");

  const handleCheckboxChange = (event) => {
    setFetchCityName(event.target.checked);

    if (event.target.checked) {
      // Fetch city name when the checkbox is checked
      fetchCityNameFunction(); // Call the function to fetch the city name
    } else {
      // Clear the city name when the checkbox is unchecked
      setCityName("");
    }
  };

  const fetchCityNameFunction = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const nominatimURL = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

        try {
          const response = await fetch(nominatimURL);
          const data = await response.json();
          if (data && data.address && data.address.city) {
            const city = data.address.city;
            setCityName(city);

            // Set the current_location in the data object to the fetched city
            setData((prevData) => ({
              ...prevData,
              current_location: city,
            }));
          } else {
            setCityName("City not found in reverse geocoding data.");
          }
        } catch (error) {
          //   console.error('Error fetching location data:', error);
          setCityName("Error fetching location data");
        }
      });
    } else {
      setCityName("Geolocation not available.");
    }
  };
  const updateAdults = (newAdults) => {
    // console.log(newAdults)
    const updatedNumberOfPersons = parseInt(newAdults);
    // console.log(updatedNumberOfPersons)

    setData((prevData) => ({
      ...prevData,
      adults: updatedNumberOfPersons,
    }));
  };
  const Counter = ({ count, onCountChange }) => {
    const handleIncrement = () => {
      onCountChange(count + 1);
    };

    const handleDecrement = () => {
      if (count > 0) {
        onCountChange(count - 1);
      }
    };

    return (
      <>
        <div
          className="counter-container"
          style={{
            display: "flex",
            gap: "5px",
            height: "auto",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="button-container"
            onClick={handleDecrement}
            style={{
              backgroundColor: "#ffe93d",
              border: "1px solid #eee",
              borderRadius: "50%",
              padding: "1rem",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
              width: "8px",
              height: "8px",
              cursor: "pointer",
            }}
          >
            <span className="counter-button">-</span>
          </div>
          <span className="counter-count">{count}</span>
          <div
            className="button-container"
            onClick={handleIncrement}
            style={{
              backgroundColor: "#ffe93d",
              border: "1px solid #eee",
              borderRadius: "50%",
              padding: "1rem",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
              width: "8px",
              height: "8px",
              cursor: "pointer",
            }}
          >
            <span className="counter-button">+</span>
          </div>
        </div>
      </>
    );
  };

  useEffect(() => {
    if (userData && userData.isLoggedin === true) {
      setLogin(true);
      const getDataLogin = async () => {
        try {
          // let d = await API.get(`/api/all-packages?populate=*&filters[package_id][$eq]=${package_id}`)

          let d = await API.get(
            `/api/group-tours?populate=deep&filters[package_id][$eq]=${package_id}`
          );

          setValue(d.data.data[0]);

          const initialQuery = {
            package_id: `${d.data.data[0]?.attributes?.package_id}`,
            package_name: `${d.data.data[0]?.attributes?.name}`,
            user_name: `${userData.info.user.username}`,
            contact_number: `${userData.info.user.mobile_number}`,
            email_id: `${userData.info.user.email}`,
            current_location: "",
            user: `${userData.info.user.id}`,
            adults: 0,
            trip_start_date: `${today}`,
          };
          setData(initialQuery);
          setLoading(false);
        } catch (err) {
          // console.log(err)
          setLoading(true);
        }
      };
      getDataLogin();
    } else {
      setLogin(false);
      const getData = async () => {
        try {
          // let d = await API.get(`/api/all-packages?populate=*&filters[package_id][$eq]=${package_id}`)
          let d = await API.get(
            `/api/group-tours?populate=deep&filters[package_id][$eq]=${package_id}`
          );

          setValue(d.data.data[0]);

          const initialQuery = {
            package_id: `${d.data.data[0]?.attributes?.package_id}`,
            package_name: `${d.data.data[0]?.attributes?.name}`,
            user_name: ``,
            contact_number: ``,
            email_id: ``,
            current_location: ``,
            user: ``,
            adults: 0,
            trip_start_date: `${today}`,
          };
          setData(initialQuery);
          setLoading(false);
        } catch (err) {
          // console.log(err)
          setLoading(true);
        }
      };
      getData();
    }
    // Scroll to the top of the page when the component mounts or when package_id changes
    window.scrollTo(0, 0);
  }, []);
  // console.log(value)
  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="text">
        {isReadMore ? text.slice(0, 150) : text}
        <span onClick={toggleReadMore} style={{ cursor: "pointer" }}>
          {isReadMore ? "...read more" : " show less"}
        </span>
      </p>
    );
  };

  // console.log(data)
  const handleChange = (e) =>
    setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      let ob = {
        data,
      };

      const res = await API.post("/api/group-tour-enquiries", ob, config);
      if (res.status === 200 || res.statusText === "OK") {
        notification.success({
          message: "Enquiry Sent!",
          description: "We will get in touch through provided email",

          duration: 1, // Duration in seconds (adjust as needed)
        });

        //              let mailData= {

        //                 "email": data.email_id,
        //                 "subject":`Package Enquiry for ${data.package_name}`,
        //                 "otp":`${data.user_name} has Enquired for ${data.package_name}
        //                 with package id:${data.package_id}
        //                 from ${data.current_location} with email id:${data.email_id}
        //                  and contact_number ${data.contact_number}
        //                  with number of travellers ${data.adults} on date: ${data.trip_start_date}
        //                  `
        //           }
        //           let sendingMail=await axios.post("https://aventuras.co.in/api/v1/users/sendFlightMail",mailData)
        //  console.log(sendingMail)

        let mailData = {
          email: data.email_id,
          subject: `Package Enquiry for ${data.package_name}`,
          details: `${data.user_name} has Enquired for ${data.package_name} 
with package id:${data.package_id} 
from ${data.current_location} with email id:${data.email_id}
and contact_number ${data.contact_number}
with number of travellers ${data.adults} on date: ${data.trip_start_date} 
`,
          username: `${data.user_name}`,
        };
        // let sendingMail=await axios.post("https://aventuras.co.in/api/v1/users/sendOTPMail",mailData)
        let sendingMail = await axios.post(
          "https://aventuras.co.in/api/v1/users/sendFlightMail",
          mailData
        );
        // console.log(sendingMail)

        //   setTimeout(()=>{
        //     window.location.reload()
        //   },2000)
      } else {
        // console.log(res)
      }
    } catch (error) {
      //   console.log(error);

      const message = error.response.data.error.message;
      if (message) {
        notification.error({
          message: error.response.data.error.message,
          // description: 'You have successfully logged in.',

          duration: 2, // Duration in seconds (adjust as needed)
        });
      } else {
        notification.error({
          message: "Enter details to send Enquiry!",
          // description: 'You have successfully logged in.',

          duration: 2, // Duration in seconds (adjust as needed)
        });
      }
    }
    // console.log(data);
  };
  const onChange = (key: string) => {
    // console.log(key);
  };

  const downloadFileAtUrl = (url) => {
    // console.log(url)
    const fullUrl = baseURL + url;
    // console.log(fullUrl)
    fetch(fullUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const blobURL = window.URL.createObjectURL(new Blob([blob]));

        const fileName = fullUrl.split("/").pop();
        const aTag = document.createElement("a");
        aTag.href = blobURL;
        aTag.setAttribute("download", fileName);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
      });
  };

  // function formatDate(date) {
  //     const options = { year: 'numeric', month: 'long', day: 'numeric' };
  //     return new Date(date).toLocaleDateString('en-US', options);
  //   }

  function groupDatesByMonth(dates) {
    const months = {};
    dates.forEach((date) => {
      const month = new Date(date).toLocaleString("default", { month: "long" });
      if (!months[month]) {
        months[month] = [];
      }
      months[month].push(date);
    });
    return months;
  }

  const { TabPane } = Tabs;

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange2 = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const MyModal = ({ package_data, batch_data }) => {
    const [modal1Open, setModal1Open] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
    const [modal3Open, setModal3Open] = useState(false);

    const [modal4Open, setModal4Open] = useState(false);

    const [data, setData3] = useState({
      package_id: package_data?.attributes?.package_id,
      package_name: package_data?.attributes?.name,
      user_name: "",
      contact_number: "",
      email_id: "",
      current_location: "",
    });
    const handleChange3 = (e) => {
      const { name, value } = e.target;
      setData3((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      // Manually set package_name and package_id
      if (name === "package_id") {
        setData3((prevState) => ({
          ...prevState,
          package_id: package_data?.attributes?.package_id,
        }));
      } else if (name === "package_name") {
        setData3((prevState) => ({
          ...prevState,
          package_name: package_data?.attributes?.name,
        }));
      }
    };

    // const handleChange3 = (e) =>{
    //     setData3(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    //     // console.log(data3)
    // }
    const [personCount, setPersonCount] = useState(1);

    const totalPackagePrice = personCount * batch_data.price;
    const addGst = totalPackagePrice * (18 / 100);
    // console.log(addGst)
    const addCommision = totalPackagePrice * (2 / 100);
    const totalPrice = totalPackagePrice + addGst + addCommision;
    // console.log(totalPrice)

    const handlePayments = async (e) => {
      e.preventDefault();

      let payload = { amount: totalPackagePrice };
      let payUrl = "https://aventuras.co.in/api/v1/payment/initiate_payment";
      try {
        let res = await axios
          .post(payUrl, payload)
          .then((res) => {
            // console.log(res)
          })
          .catch((err) => {
            // console.log(err)
          });
      } catch (err) {
        // console.log(err)
      }
    };
    const handleSubmit3 = async (e) => {
      e.preventDefault();

      const config3 = {
        headers: {
          "Content-Type": "application/json",
          // Add any other headers that are required for your API
        },
      };
      // const url = `https://aventurasdb.onrender.com/api/customer-enquiries?populate=deep`;

      try {
        let ob3 = {
          data,
        };
        const res = await API.post("/api/customer-enquiries", ob3, config3);
        notification.success({
          message: "Enquiry sent Successfully!",
          // description: 'You have successfully logged in.',

          duration: 2, // Duration in seconds (adjust as needed)
        });
        // console.log(res.data)
      } catch (error) {
        //  console.log(error)
        notification.error({
          message: "Unable to send Enquiry!",
          description: "Please fill all details to send enquiry",

          duration: 2, // Duration in seconds (adjust as needed)
        });
      }
    };
    return (
      <>
        <Button
          onClick={() => setModal1Open(true)}
          style={{ backgroundColor: "#1677ff", color: "#fff" }}
        >
          Enquire now
        </Button>

        <Button
          onClick={() => setModal2Open(true)}
          style={{ backgroundColor: "#FFD93D", color: "#000" }}
        >
          Book now
        </Button>

        <Modal
          title="Enquire now"
          centered
          open={modal1Open}
          onOk={() => alert("ok")}
          onCancel={() => setModal1Open(false)}
          footer={[
            <div
              style={{
                display: "flex",
                justifyContnent: "center",
                gap: "1rem",
              }}
            >
              <Button
                key="back"
                style={{ backgroundColor: "#858585", color: "#fff" }}
                onClick={() => setModal1Open(false)}
              >
                Cancel
              </Button>

              <Button
                style={{ backgroundColor: "#1677ff", color: "#fff" }}
                onClick={handleSubmit3}
              >
                Enquire now
              </Button>
            </div>,
          ]}
        >
          <div className="left">
            <div className="modal-details">
              <h4>{package_data?.attributes?.name}</h4>
              <span className="dates-start-end">
                {new Date(batch_data.batch_starts).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                -
                {new Date(batch_data.batch_ends).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <div>Available slots : {batch_data.slots_available} </div>
              <div>
                {" "}
                Price per person :{" "}
                <span style={{ fontWeight: "600" }}>
                  {batch_data.price}
                </span>{" "}
              </div>
            </div>
            <form className="form-section">
              <div className="rows1">
                <input
                  type="hidden"
                  placeholder="Package Id"
                  value={data.package_id}
                  onChange={handleChange3}
                  name="package_id"
                />
                <input
                  type="hidden"
                  placeholder="Package Name"
                  value={data.package_name}
                  onChange={handleChange3}
                  name="package_name"
                />
                <input
                  type="text"
                  placeholder="Your Name"
                  onChange={handleChange3}
                  name="user_name"
                />
                <input
                  type="text"
                  placeholder="Your Mobile Number"
                  onChange={handleChange3}
                  name="contact_number"
                />
                <input
                  type="email"
                  placeholder="Your Email Address"
                  onChange={handleChange3}
                  name="email_id"
                />
                <input
                  type="text"
                  placeholder="Current Location"
                  onChange={handleChange3}
                  name="current_location"
                />
              </div>
            </form>

            {/* <form class="form-section">
                        <div className="rows1">
<input type="hidden" placeholder="Package Id" value={data.package_id} onChange={handleChange} name="package_id" />
    <input type="hidden" placeholder="Package Name" value={data.package_name} onChange={handleChange} name="package_name" />
    <input type="text" placeholder="Your Name" onChange={handleChange} name="user_name" />
    <input type="text" placeholder="Your Mobile Number" onChange={handleChange} name="contact_number" />
    <input type="email" placeholder="Your Email Address" onChange={handleChange} name="email_id" />
    <input type="text" placeholder="Current Location" onChange={handleChange} name="current_location" />
    {/* <button className="form-button" onClick={handleSubmit}>send enquiry</button> 
    </div></form> */}
            {/* <div className="form-section">
                            <div className="rows1">
                                <input type="text" placeholder="Enter your Name" />
                                <input type="text" placeholder='Enter your E-mail' />

                                <input type="text" placeholder='Enter mobile number' />
                                <input type="text" placeholder='Current Address' />
                            </div>
                        </div> */}
          </div>
        </Modal>
        <Modal
          title="book now"
          centered
          open={modal2Open}
          onOk={() => alert("ok")}
          onCancel={() => setModal2Open(false)}
          footer={[
            <div
              style={{
                display: "flex",
                justifyContnent: "center",
                gap: "1rem",
              }}
            >
              <Button
                key="back"
                type="primary"
                onClick={() => setModal2Open(false)}
              >
                Cancel
              </Button>

              <Button type="primary" onClick={() => setModal3Open(true)}>
                Preview Booking
              </Button>
            </div>,
          ]}
        >
          <div className="left">
            <div className="modal-details">
              <h4>{package_data?.attributes?.name}</h4>
              <span className="dates-start-end">
                {new Date(batch_data.batch_starts).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                -{" "}
                {new Date(batch_data.batch_ends).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <div>Available slots : {batch_data.slots_available} </div>
              <div>
                {" "}
                Price per person :{" "}
                <span style={{ fontWeight: "600" }}>
                  {batch_data.price}
                </span>{" "}
              </div>
            </div>
            <div className="form-section">
              <div className="rows1">
                <input type="text" placeholder="Enter your Name" />
                <input type="text" placeholder="Enter your E-mail" />

                <input type="text" placeholder="Enter mobile number" />
                <input type="text" placeholder="Current Address" />
                <input
                  type="number"
                  placeholder="Number of Persons booking"
                  value={personCount}
                  onChange={(e) => setPersonCount(Number(e.target.value))}
                />
              </div>
              <div className="counter">
                {/* <div onClick={() => setCount(count - 1)}>-</div><span>{count}</span>
                                <div onClick={() => setCount(count + 1)}>+</div> */}
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          title="Preview Booking"
          centered
          open={modal3Open}
          onOk={() => alert("ok")}
          onCancel={() => setModal3Open(false)}
          footer={[
            <div
              style={{
                display: "flex",
                justifyContnent: "center",
                gap: "1rem",
              }}
            >
              <Button
                key="back"
                type="primary"
                onClick={() => setModal3Open(false)}
              >
                Cancel
              </Button>
              {/* <Button type="primary" onClick={() => setModal4Open(true)}>
        Proceed to pay
      </Button> */}
              <Button type="primary" onClick={handlePayments}>
                Proceed to pay
              </Button>
            </div>,
          ]}
        >
          <div className="left">
            <div className="modal-details">
              <h4>{package_data?.attributes?.name}</h4>
              <span className="dates-start-end">
                {new Date(batch_data.batch_starts).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                -{" "}
                {new Date(batch_data.batch_ends).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              {/* <div><div>Available slots</div><div>: {batch_data.slots_available}</div></div> */}
              <div>
                Available slots:{" "}
                <span style={{ fontWeight: "600" }}>
                  {batch_data.slots_available}
                </span>
              </div>
              <div>
                Price per person:{" "}
                <span style={{ fontWeight: "600" }}>{batch_data.price}</span>
              </div>
              <div>
                Number of Person:{" "}
                <span style={{ fontWeight: "600" }}>{personCount}</span>
              </div>
              <div>
                Total Price:{" "}
                <span style={{ fontWeight: "600" }}>{totalPackagePrice}</span>
              </div>
              <br />
              <div
                style={{
                  border: "1px solid #000",
                  padding: "5px",
                  borderRadius: "8px",
                }}
              >
                <div>
                  <span style={{ fontWeight: "600" }}>Note :</span> for credit
                  card users, <br />
                  2% convenience + 18% GST charges may apply
                </div>
                <div>
                  Convenience fees 2% :{" "}
                  <span style={{ fontWeight: "600" }}>{addCommision}</span>
                </div>

                <div>
                  Added GST 18% :{" "}
                  <span style={{ fontWeight: "600" }}>{addGst}</span>
                </div>

                <div>
                  Total Price:{" "}
                  <span style={{ fontWeight: "600" }}>{totalPrice}</span>
                </div>
              </div>
              <br />
            </div>
          </div>
        </Modal>

        <Modal
          style={{ height: "30vh", top: 20 }}
          title="Payment"
          open={modal4Open}
          onOk={() => alert("ok")}
          onCancel={() => setModal4Open(false)}
        >
          <img
            src="https://res.cloudinary.com/dxjrvvjp1/image/upload/v1683263854/image_1_j4hpxl.png"
            alt=""
            style={{ width: "100%" }}
          />
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
            {value?.attributes?.description.length > 0 ? (
              <>
                <div className="heading">Description :{/* <hr /> */}</div>

                {isReadMore ? (
                  <> {value?.attributes?.description.slice(0, 180)}</>
                ) : (
                  <>{value?.attributes?.description}</>
                )}
                <span onClick={toggleReadMore} className="read-more-less">
                  {isReadMore ? "...read more" : " show less"}
                </span>
              </>
            ) : null}
            {/* {value?.attributes?.description} */}
          </div>
        </div>
      </>
    );
  };

  const Itinerary = () => {
    return (
      <>
        <div className="heading">Itinerary</div>
        <div className="single-line">
          <div className="heading">{value?.attributes?.name}</div>
        </div>
        <Collapse defaultActiveKey={["1"]} onChange={onChange} size="large">
          <div></div>
          {value?.attributes?.itenary.map((v) => {
            return (
              <>
                <Panel header={v.itenary_day_title} key={v.id}>
                  <p>
                    {" "}
                    <ReactMarkdown>{v.description}</ReactMarkdown>
                  </p>
                </Panel>
              </>
            );
          })}
        </Collapse>
      </>
    );
  };

  const Info = () => {
    return (
      <>
        <div className="heading">Other Info</div>

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
    );
  };

  const DatesAndBooking = () => {
    const months = groupDatesByMonth(
      value?.attributes?.travel_dates.map((v) => v.batch_starts)
    );
    // console.log(months);

    return (
      <div>
        <h1>Dates and Bookings</h1>
        <Tabs>
          {Object.keys(months).map((month) => {
            if (months[month].length === 0) return null;
            return (
              <TabPane tab={month} key={month}>
                {months[month].map((date) => {
                  const filteredBatches =
                    value?.attributes?.travel_dates?.filter((v) => {
                      const batchMonth =
                        new Date(v.batch_starts).getMonth() + 1;
                      const batchDate = new Date(v.batch_starts).getDate();

                      console.log(filteredBatches);
                      return (
                        batchMonth === new Date(date).getMonth() + 1 &&
                        batchDate === new Date(date).getDate()
                      );
                    });

                  return (
                    <div key={date} className="date-blocks">
                      {filteredBatches.length > 0 ? (
                        filteredBatches.map((v) => (
                          <div className="batches" key={v.id}>
                            <div className="left">
                              <div className="details">
                                <span className="dates-start-end">
                                  {new Date(v.batch_starts).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }
                                  )}
                                  &nbsp; - &nbsp;
                                  {new Date(v.batch_ends).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }
                                  )}
                                </span>
                              </div>
                              <div>Available slots: {v.slots_available}</div>
                              <div>
                                Price per person:{" "}
                                <span style={{ fontWeight: "600" }}>
                                  {v.price}
                                </span>
                              </div>
                            </div>
                            <div className="right">
                              <MyModal package_data={value} batch_data={v} />
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No batches</p>
                      )}
                    </div>
                  );
                })}
              </TabPane>
            );
          })}
        </Tabs>
      </div>
    );
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Itinerary`,
      children: <Itinerary />,
    },
    {
      key: "2",
      label: `Other Info`,
      children: <Info />,
    },
    {
      key: "3",
      label: `Dates & Bookings`,
      children: <DatesAndBooking />,
    },
  ];

  // console.log(data)

  return (
    <>
      <div className="group-pages-container" key={value.id}>
        {loading ? (
          <>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </>
        ) : (
          <>
            <div className="banner">
              <div className="image">
                <Carousel
                  effect="fade"
                  autoplay
                  dotPosition="bottom"
                  dots={false}
                  pauseOnHover={false}
                  autoplaySpeed={2500}
                  pauseOnFocus={false}
                >
                  {value?.attributes?.package_images?.data?.map((v) => {
                    return (
                      <>
                        <img
                          className="img"
                          loading="lazy"
                          src={`${baseURL}${v.attributes?.url}`}
                          alt={`${baseURL}${v.attributes?.name}`}
                        />
                      </>
                    );
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
                    <div className="package">
                      {value?.attributes?.package_nights === 0 ? (
                        <>{`${value?.attributes?.package_nights + 1} Day`}</>
                      ) : (
                        <>
                          {value?.attributes?.package_nights === 1 ? (
                            <>
                              {`${
                                value?.attributes?.package_nights + 1
                              } Days / ${
                                value?.attributes?.package_nights
                              } Night`}
                            </>
                          ) : (
                            <>
                              {`${
                                value?.attributes?.package_nights + 1
                              } Days / ${
                                value?.attributes?.package_nights
                              } Nights`}
                            </>
                          )}
                        </>
                      )}
                      {/* {`${value?.attributes?.Package_days} Days / ${value?.attributes?.package_nights} Nights`} */}
                      {/* {value?.attributes?.package_durations?.data[0]?.attributes?.duration} */}
                    </div>

                    <div className="single-line">
                      <div class="title">{value?.attributes?.name}</div>
                      {/* <a href={`${value?.attributes?.itenary_pdf?.data?.attributes?.url}`} download={`${value?.attributes?.name} itenary`}>
                                        <button className="form-button" >Download Itenary</button>
                                    </a> */}
                      <button
                        className="form-button"
                        onClick={() =>
                          downloadFileAtUrl(
                            value?.attributes?.itenary_pdf?.data?.attributes
                              ?.url
                          )
                        }
                      >
                        download itenary
                      </button>
                    </div>
                    <Overview />

                    <div className="facilities">
                      {value?.attributes?.hotel_stay ? (
                        <div
                          className="perks"
                          style={{
                            opacity: "1",
                            color: "green",
                            textDecorationLine: "none",
                          }}
                        >
                          <span className="icon">
                            <LocationCityIcon />
                          </span>
                          <span className="text">Hotel Stay</span>
                        </div>
                      ) : (
                        <>
                          <div
                            className="perks"
                            style={{
                              opacity: ".7",
                              color: "red",
                              textDecorationLine: "line-through",
                            }}
                          >
                            <span className="icon">
                              <LocationCityIcon />
                            </span>
                            <span className="text">Hotel Stay</span>
                          </div>
                        </>
                      )}

                      {value?.attributes?.flights ? (
                        <div
                          className="perks"
                          style={{
                            opacity: "1",
                            color: "green",
                            textDecorationLine: "none",
                          }}
                        >
                          <span className="icon">
                            <ConnectingAirportsIcon />
                          </span>
                          <span className="text">Flights</span>
                        </div>
                      ) : (
                        <>
                          <div
                            className="perks"
                            style={{
                              opacity: ".7",
                              color: "red",
                              textDecorationLine: "line-through",
                            }}
                          >
                            <span className="icon">
                              <ConnectingAirportsIcon />
                            </span>
                            <span className="text">Flights</span>
                          </div>
                        </>
                      )}

                      {value?.attributes?.sight_seeing ? (
                        <>
                          <div
                            className="perks"
                            style={{
                              opacity: "1",
                              color: "green",
                              textDecorationLine: "none",
                            }}
                          >
                            <span className="icon">
                              <PhotoCameraBackIcon />
                            </span>
                            <span className="text">Sight seeing</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            className="perks"
                            style={{
                              opacity: ".7",
                              color: "red",
                              textDecorationLine: "line-through",
                            }}
                          >
                            <span className="icon">
                              <PhotoCameraBackIcon />
                            </span>
                            <span className="text">Sight seeing</span>
                          </div>
                        </>
                      )}

                      {value?.attributes?.cabs_transfer ? (
                        <>
                          <div
                            className="perks"
                            style={{
                              opacity: "1",
                              color: "green",
                              textDecorationLine: "none",
                            }}
                          >
                            <span className="icon">
                              <AirportShuttleIcon />
                            </span>
                            <span className="text">Cab transfer</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            className="perks"
                            style={{
                              opacity: ".7",
                              color: "red",
                              textDecorationLine: "line-through",
                            }}
                          >
                            <span className="icon">
                              <AirportShuttleIcon />
                            </span>
                            <span className="text">Cab transfer</span>
                          </div>
                        </>
                      )}

                      {value?.attributes?.meals ? (
                        <>
                          <div
                            className="perks"
                            style={{
                              opacity: "1",
                              color: "green",
                              textDecorationLine: "none",
                            }}
                          >
                            <span className="icon">
                              <FastfoodIcon />
                            </span>
                            <span className="text">Meals</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            className="perks"
                            style={{
                              opacity: ".7",
                              color: "red",
                              textDecorationLine: "line-through",
                            }}
                          >
                            <span className="icon">
                              <FastfoodIcon />
                            </span>
                            <span className="text">Meals</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="bottom">
                    <Tabs
                      size="large"
                      type="card"
                      defaultActiveKey="1"
                      items={items}
                      onChange={onChange}
                    />
                  </div>
                </div>

                <div className="right-content">
                  <div className="form-container">
                    <div className="packageId">
                      {value?.attributes?.package_id}
                    </div>
                    <div class="title">{value?.attributes?.name}</div>
                    <div className="package">
                      {" "}
                      {value?.attributes?.package_nights === 0 ? (
                        <>{`${value?.attributes?.package_nights + 1} Day`}</>
                      ) : (
                        <>
                          {value?.attributes?.package_nights === 1 ? (
                            <>
                              {`${
                                value?.attributes?.package_nights + 1
                              } Days / ${
                                value?.attributes?.package_nights
                              } Night`}
                            </>
                          ) : (
                            <>
                              {`${
                                value?.attributes?.package_nights + 1
                              } Days / ${
                                value?.attributes?.package_nights
                              } Nights`}
                            </>
                          )}
                        </>
                      )}
                    </div>

                    {login ? (
                      <>
                        <form class="form">
                          <input
                            type="hidden"
                            placeholder="Package Id"
                            value={data.package_id}
                            onChange={handleChange}
                            name="package_id"
                          />
                          <input
                            type="hidden"
                            placeholder="Package Name"
                            value={data.package_name}
                            onChange={handleChange}
                            name="package_name"
                          />

                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <input
                              type="text"
                              placeholder="Your Name (required)"
                              value={data.user_name}
                              onChange={handleChange}
                              name="user_name"
                            />
                            {errors.user_name && (
                              <span
                                style={{
                                  fontSize: ".7rem",
                                  color: "red",
                                  padding: ".2rem .5rem",
                                }}
                                className="error-text"
                              >
                                {errors.user_name}
                              </span>
                            )}
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <input
                              type="number"
                              placeholder="Your Mobile Number  (required)"
                              value={data.contact_number}
                              onChange={handleChange}
                              name="contact_number"
                            />
                            {errors.contact_number && (
                              <span
                                style={{
                                  fontSize: ".7rem",
                                  color: "red",
                                  padding: ".2rem .5rem",
                                }}
                                className="error-text"
                              >
                                {errors.contact_number}
                              </span>
                            )}
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            {" "}
                            <input
                              type="email"
                              placeholder="Your Email Address  (required)"
                              onChange={handleChange}
                              name="email_id"
                              value={data.email_id}
                            />
                            {errors.email_id && (
                              <span
                                style={{
                                  fontSize: ".7rem",
                                  color: "red",
                                  padding: ".2rem .5rem",
                                }}
                                className="error-text"
                              >
                                {errors.email_id}
                              </span>
                            )}
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <input
                              type="text"
                              placeholder="Trip Start Location"
                              onChange={handleChange}
                              name="current_location"
                              value={data.current_location}
                            />
                            <label
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                width: "100%",
                                gap: ".2rem",
                              }}
                            >
                              <input
                                type="checkbox"
                                onChange={handleCheckboxChange}
                                checked={fetchCityName}
                              />{" "}
                              Use current location
                            </label>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              width: "100%",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: ".5rem",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: ".2rem",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  width: "55%",
                                  justifyContent: "spaceBetween",
                                  alignItems: "center",
                                  gap: ".2rem",
                                  border: "1px solid #eee",
                                  padding: ".5rem",
                                }}
                              >
                                Travellers:
                                <Counter
                                  count={data.adults}
                                  onCountChange={updateAdults}
                                />
                              </div>
                              <input
                                style={{ width: "45%" }}
                                type="date"
                                placeholder="Enter Journey start date"
                                name="trip_start_date"
                                onChange={handleChange}
                                defaultValue={today}
                                min={today}
                              />
                            </div>
                          </div>
                          <button
                            className="form-button"
                            onClick={handleLoginSubmit}
                          >
                            send enquiry
                          </button>
                        </form>
                      </>
                    ) : (
                      <>
                        <form class="form">
                          <input
                            type="hidden"
                            placeholder="Package Id"
                            value={data.package_id}
                            onChange={handleChange}
                            name="package_id"
                          />
                          <input
                            type="hidden"
                            placeholder="Package Name"
                            value={data.package_name}
                            onChange={handleChange}
                            name="package_name"
                          />

                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <input
                              type="text"
                              placeholder="Your Name (required)"
                              onChange={handleChange}
                              name="user_name"
                              value={data.user_name}
                            />
                            {errors.user_name && (
                              <span
                                style={{
                                  fontSize: ".7rem",
                                  color: "red",
                                  padding: ".2rem .5rem",
                                }}
                                className="error-text"
                              >
                                {errors.user_name}
                              </span>
                            )}
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            {" "}
                            <input
                              type="number"
                              placeholder="Your Mobile Number  (required)"
                              value={data.contact_number}
                              onChange={handleChange}
                              name="contact_number"
                            />
                            {errors.contact_number && (
                              <span
                                style={{
                                  fontSize: ".7rem",
                                  color: "red",
                                  padding: ".2rem .5rem",
                                }}
                                className="error-text"
                              >
                                {errors.contact_number}
                              </span>
                            )}
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            {" "}
                            <input
                              type="email"
                              placeholder="Your Email Address  (required)"
                              value={data.email_id}
                              onChange={handleChange}
                              name="email_id"
                            />
                            {errors.email_id && (
                              <span
                                style={{
                                  fontSize: ".7rem",
                                  color: "red",
                                  padding: ".2rem .5rem",
                                }}
                                className="error-text"
                              >
                                {errors.email_id}
                              </span>
                            )}
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <input
                              type="text"
                              placeholder="Trip start Location"
                              onChange={handleChange}
                              name="current_location"
                              value={data.current_location}
                            />

                            <label
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                width: "100%",
                                gap: ".2rem",
                              }}
                            >
                              <input
                                type="checkbox"
                                onChange={handleCheckboxChange}
                                checked={fetchCityName}
                              />{" "}
                              Use current location
                            </label>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              width: "100%",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: ".5rem",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: ".2rem",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  width: "55%",
                                  justifyContent: "spaceBetween",
                                  alignItems: "center",
                                  gap: ".2rem",
                                  border: "1px solid #eee",
                                  padding: ".5rem",
                                }}
                              >
                                Travellers:
                                <Counter
                                  count={data.adults}
                                  onCountChange={updateAdults}
                                />
                              </div>
                              <input
                                style={{ width: "45%" }}
                                type="date"
                                placeholder="Enter Journey start date"
                                name="trip_start_date"
                                onChange={handleChange}
                                defaultValue={today}
                                min={today}
                              />
                            </div>
                          </div>

                          <button
                            className="form-button"
                            onClick={handleLoginSubmit}
                          >
                            send enquiry
                          </button>
                        </form>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Singlegrouptour;

// const DatesAndBooking = () => {
//     const months = groupDatesByMonth(mDates);
//  return (
//       <div>
//         <h1>Dates and Bookings</h1>
//         <Tabs>

//           {Object.keys(months).map((month) => (
//             <TabPane tab={month} key={month}>
//               {months[month].map((date) => (
//                 <div key={date} className="date-blocks">
//                   {value?.attributes?.travel_dates ?
//                   (
//                     value?.attributes?.travel_dates
//                       .filter((v) => new Date(v.batch_starts).toLocaleString('default', { month: 'long' }) === month)
//                       .map((v) => (
//                         <div className="batches" key={v.batch_starts}>
//                           <div className="left">
//                             <div className="details">
//                               <span className="dates-start-end">
//                                 {new Date(v.batch_starts).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
//                                 &nbsp; - &nbsp;
//                                 {new Date(v.batch_ends).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
//                               </span>
//                             </div>
//                             <div>Available slots : {v.slots_available}</div>
//                             <div> Price per person : <span style={{ fontWeight: '600' }}>{v.price}</span> </div>
//                           </div>
//                           <div className="right">
//                             <MyModal package_data={value} batch_data={v} />
//                           </div>
//                         </div>
//                       ))
//                   ) : (
//                     <p>No batches</p>
//                   )}
//                 </div>
//               ))}
//             </TabPane>
//           ))}
//         </Tabs>
//       </div>
//     );
//   };

// {
//     key: '1',
//     label: `Overview`,
//     children: <Overview />,
// },
