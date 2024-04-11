import React from "react";
import { API, baseURL } from "../../../api/apirequest";
import type { TabsProps } from "antd";
import { useState, useEffect } from "react";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { useNavigate, useParams } from "react-router-dom";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import axios from "axios";
import "./SinglePackages.scss";
import { Carousel, Skeleton, Space } from "antd";
import { notification } from "antd";
import { Tabs } from "antd";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { Button, Modal } from "antd";
import ReactMarkdown from "react-markdown";
import { Collapse } from "antd";
import Login from '../../Auth/Login'
import { useLocation } from "react-router-dom";

import { Helmet } from 'react-helmet';
import MetaLinks from '../../../components/Meta/MetaLinks'
const { Panel } = Collapse; 


const SinglePackages = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [currentPath, setCurrentPath] = useState();

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);
  localStorage.setItem("pathName", currentPath);
  localStorage.removeItem("booking");
  const today = new Date().toISOString().split("T")[0];
  const [fetchCityName, setFetchCityName] = useState(false);
  const [cityName, setCityName] = useState("");

  const handleCheckboxChange = (event) => {
    setFetchCityName(event.target.checked);

    if (event.target.checked) {
      fetchCityNameFunction(); // Call the function to fetch the city name
    } else {
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

          let city = "";
          let county = "";
          let neighbourhood = "";
          let state = "";

          if (data && data.address) {
            if (data.address.city !== undefined) {
              city = data.address.city;
            } else if (data.address.state !== undefined) {
              city = data.address.state;
            }

            if (data.address.county !== undefined) {
              county = data.address.county;
            }

            if (data.address.neighbourhood !== undefined) {
              neighbourhood = data.address.neighbourhood;
            }

            if (data.address.state_district !== undefined) {
              state = data.address.state_district;
            }
          }

          let finalLocation = `${city},${state}`;

          if (city || neighbourhood || state) {
            setCityName(finalLocation);

            setData((prevData) => ({
              ...prevData,
              current_location: finalLocation,
            }));
          } else {
            setCityName("City not found in reverse geocoding data.");
          }
        } catch (error) {
          console.error("Error fetching location data:", error);
          setCityName("Error fetching location data");
        }
      });
    } else {
      setCityName("Geolocation not available.");
    }
  };

  const [fetchCityName2, setFetchCityName2] = useState(false);
  const [cityName2, setCityName2] = useState("");

  const handleCheckboxChange2 = (event) => {
    setFetchCityName2(event.target.checked);

    if (event.target.checked) {
      fetchCityNameFunction2();
    } else {
      setCityName2("");
    }
  };

  const fetchCityNameFunction2 = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const nominatimURL = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

        try {
          const response = await fetch(nominatimURL);
          const data = await response.json();
          let city = "";
          let county = "";
          let neighbourhood = "";
          let state = "";

          if (data && data.address) {
            if (data.address.city !== undefined) {
              city = data.address.city;
            } else if (data.address.state !== undefined) {
              city = data.address.state;
            }

            if (data.address.county !== undefined) {
              county = data.address.county;
            }

            if (data.address.neighbourhood !== undefined) {
              neighbourhood = data.address.neighbourhood;
            }

            if (data.address.state_district !== undefined) {
              state = data.address.state_district;
            }
          }

          let finalLocation = `${city},${county},${state}`;

          if (city || neighbourhood || state) {
            setCityName2(finalLocation);

            setData2((prevData) => ({
              ...prevData,
              current_location: finalLocation,
            }));
          } else {
            setCityName("City not found in reverse geocoding data.");
          }
        } catch (error) {
          setCityName2("Error fetching location data");
        }
      });
    } else {
      setCityName2("Geolocation not available.");
    }
  };

  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);

  const [login, setLogin] = useState(false);
  let { package_id } = useParams();
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    user_name: "",
    contact_number: "",
    email_id: "",
  });

  const [errors2, setErrors2] = useState({
    user_name: "",
    contact_number: "",
    email_id: "",
  });

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

  const [data2, setData2] = useState({
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

  useEffect(() => {
    if (userData && userData.isLoggedin === true) {
      setLogin(true);
      const getDataLogin = async () => {
        try {
          let d = await API.get(
            `/api/all-packages?populate=*&filters[package_id][$eq]=${package_id}`
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
          setData2(initialQuery);
          setLoading(false);
        } catch (err) {
          setLoading(true);
        }
      };
      getDataLogin();
    } else {
      setLogin(false);
      const getData = async () => {
        try {
          let d = await API.get(
            `/api/all-packages?populate=*&filters[package_id][$eq]=${package_id}`
          );

          setValue(d.data.data[0]);

          const initialQuery = {
            package_id: `${d.data.data[0]?.attributes?.package_id}`,
            user_name: "",
            contact_number: null,
            email_id: "",
            current_location: "",
            package_name: `${d.data.data[0]?.attributes?.name}`,
            adults: 0,
            trip_start_date: `${today}`,
          };
          setData(initialQuery);
          setData2(initialQuery);
          setLoading(false);
        } catch (err) {
          setLoading(true);
        }
      };
      getData();
    }
    window.scrollTo(0, 0);
  }, []);
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

  const handleChange = (e) => {
    const newValue =
      e.target.name === "contact_number"
        ? parseInt(e.target.value, 10)
        : e.target.value;
    if (e.target.name === "contact_number") {
      if (e.target.value.length > 9) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          contact_number: "",
        }));
      } else if (e.target.value.length < 10 || e.target.value.length > 10) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          contact_number: "Mobile number should be at least 10 digits",
        }));
      }
    }

    if (e.target.name === "user_name") {
      if (e.target.value.length > 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          user_name: "",
        }));
      }
    }

    if (e.target.name === "email_id") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (emailPattern.test(e.target.value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email_id: "",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email_id: "Please enter a valid email address",
        }));
      }
    }
    setData((prevState) => ({ ...prevState, [e.target.name]: newValue }));
  };

  const handleChangeNew = (e) => {
    const newValue =
      e.target.name === "contact_number"
        ? parseInt(e.target.value, 10)
        : e.target.value;
    if (e.target.name === "contact_number") {
      if (e.target.value.length > 9) {
        setErrors2((prevErrors) => ({
          ...prevErrors,
          contact_number: "",
        }));
      } else if (e.target.value.length < 10) {
        setErrors2((prevErrors) => ({
          ...prevErrors,
          contact_number: "Mobile number should be at least 10 digits",
        }));
      }
    }
    setData2((prevState) => ({ ...prevState, [e.target.name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      user_name: "",
      contact_number: "",
      email_id: "",
    });

    let hasError = false;

    if (!data.user_name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        user_name: "Please enter your full name",
      }));
      hasError = true;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        user_name: "",
      }));
    }

    if (!data.contact_number) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contact_number: "Please enter your mobile number",
      }));
      hasError = true;
    } else if (data.contact_number.length < 10) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contact_number: "Mobile number should be at least 10 digits",
      }));
      hasError = true;
    }

    if (!data.email_id) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email_id: "Please enter your email address",
      }));
      hasError = true;
    } else if (!/^\d{10}$/.test(data.contact_number)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contact_number: "Mobile number should be a 10-digit numeric value",
      }));
      hasError = true;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contact_number: "",
      }));
    }

    if (hasError) {
      return;
    }
    if (!validateEmail(data.email_id)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email_id: "Please enter valid address",
      }));
      return;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email_id: "",
      }));
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      let ob = {
        data,
      };
      const res = await API.post("/api/customer-enquiries", ob, config);
      if (res.status === 200 || res.statusText === "OK") {
        notification.success({
          message: "Enquiry Sent!",
          description: "We will get in touch through provided email",
          duration: 1,
        });

        let mailData = {
          username: `${data.user_name}`,
          email: data.email_id,
          subject: `Package Enquiry for ${data.package_name} | (${data.package_id}) `,

          details: `${data.user_name} has Enquired for ${data.package_name} 
            with package id:${data.package_id} 
            from ${data.current_location} with email id:${data.email_id}
             and contact_number ${data.contact_number}
             with number of travellers ${data.adults} on date: ${data.trip_start_date} 
             `,
          current_location: `${data.current_location}`,
          contact_number: `${data.contact_number}`,
          package_name: `${data.package_name}`,
          package_id: `${data.package_id}`,
          adults: `${data.adults}`,
          trip_start_date: ` ${data.trip_start_date}`,
        };

        let sendingMail = await axios.post(
          "https://aventuras.co.in/api/v1/users/sendPackageMail",
          mailData
        );

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        // console.log(res)
      }

    } catch (error) {
      console.log(error);
    }
  };

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
      const res = await API.post("/api/customer-enquiries", ob, config);
      if (res.status === 200 || res.statusText === "OK") {
        notification.success({
          message: "Enquiry Sent!",
          description: "We will get in touch through provided email",
          duration: 1,
        });

        let mailData = {
          username: `${data.user_name}`,
          email: data.email_id,
          subject: `Package Enquiry for ${data.package_name} | (${data.package_id}) `,

          details: `${data.user_name} has Enquired for ${data.package_name} 
  with package id:${data.package_id} 
  from ${data.current_location} with email id:${data.email_id}
   and contact_number ${data.contact_number}
   with number of travellers ${data.adults} on date: ${data.trip_start_date} 
   `,

          current_location: `${data.current_location}`,
          contact_number: `${data.contact_number}`,
          package_name: `${data.package_name}`,
          package_id: `${data.package_id}`,
          adults: `${data.adults}`,
          trip_start_date: ` ${data.trip_start_date}`,
        };
        let sendingMail = await axios.post(
          "https://aventuras.co.in/api/v1/users/sendPackageMail",
          mailData
        );
      } else {
        console.log(res)
      }
    } catch (error) {
      console.log(error);

      const message = error.response.data.error.message;

      if (
        error.response.data.error.message ==
        "1 relation(s) of type plugin::users-permissions.user associated with this entity do not exist"
      ) {
        notification.error({
          message: "User Profile Not Found",
          duration: 2,
        });
      } else if (message) {
        notification.error({
          message: error.response.data.error.message,
          duration: 2,
        });
      } else {
        console.log(error);

        notification.error({
          message: "Enter details to send Enquiry!",
          duration: 2,
        });
      }
    }
  };
  const onChange = (key) => {
    // console.log(key);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  const downloadFileAtUrl = (url) => {
    const fullUrl = baseURL + url;
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
          </div>
        </div>
      </>
    );
  };

  const Itinerary = () => {
    return (
      <>
        <div className="single-line">
          <div className="heading">{value?.attributes?.name}</div>
        </div>
        <Collapse defaultActiveKey={["1"]} onChange={onChange} size="large">
          <div></div>
          {value?.attributes?.itenary_days.map((v) => {
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
        {
          value?.attributes?.things_to_note ?
            <div className="desc">
              <ul className="list">
                <ReactMarkdown>{value?.attributes?.things_to_note}</ReactMarkdown>
              </ul>
            </div>
            : null
        }

        {
          value?.attributes?.cancellation_policy ?
            <div className="desc">
              <ul className="list">
                <ReactMarkdown>{value?.attributes?.cancellation_policy}</ReactMarkdown>
              </ul>
            </div>
            : null
        }


        {
          value?.attributes?.travel_tips ?
            <div className="desc">
              <ul className="list">
                <ReactMarkdown>{value?.attributes?.travel_tips}</ReactMarkdown>
              </ul>
            </div>
            : null
        }

        {
          value?.attributes?.special_info ?
            <div className="desc">
              <ul className="list">
                <ReactMarkdown>{value?.attributes?.special_info}</ReactMarkdown>
              </ul>
            </div>
            : null
        }

        {
          value?.attributes?.terms_and_condition ?
            <div className="desc">
              <ul className="list">
                <ReactMarkdown>{value?.attributes?.terms_and_condition}</ReactMarkdown>
              </ul>
            </div>
            : null
        }
      </>
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
  ];

  const updateAdults = (newAdults) => {
    const updatedNumberOfPersons = parseInt(newAdults);

    setData((prevData) => ({
      ...prevData,
      adults: updatedNumberOfPersons,
    }));
  };

  const updateAdults2 = (newAdults) => {
    const updatedNumberOfPersons = parseInt(newAdults);

    setData2((prevData) => ({
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
              padding: ".8rem",
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
              padding: ".8rem",
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

  const close = () => {
    console.log(
      "Notification was closed. Either the close button was clicked or duration time elapsed."
    );
  };
  const [api, contextHolder] = notification.useNotification();
  const [loginModal, setLoginModal] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [toggleRegister, settoggleRegister] = useState(false);

  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button
          onClick={() => api.destroy()}
          style={{ backgroundColor: "red", color: "#fff" }}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={() => {
            api.destroy(key);
            setLoginModal(true);
            setToggle(true)
            settoggleRegister(false)

          }}
          style={{
            backgroundColor: "#fde000",
            color: "#000",
            fontWeight: "600",
          }}
        >
          Login
        </Button>
      </Space>
    );
    api.open({
      message: (
        <div style={{ fontSize: "1rem", fontWeight: "600" }}>
          Login Required
        </div>
      ),
      description: (
        <div className="" style={{ color: "red" }}>
          *Please login to proceed with booking
        </div>
      ),
      btn,
      key,
      onClose: close,
    });
  };
  const handlePayment = async (e) => {
    e.preventDefault();

    if (userData && userData.isLoggedin === true) {
      setErrors2({
        user_name: "",
        contact_number: "",
        email_id: "",
      });

      let hasError2 = false;

      if (!data2.user_name) {
        setErrors2((prevErrors) => ({
          ...prevErrors,
          user_name: "Please enter your full name",
        }));
        hasError2 = true;
      }

      if (!data2.contact_number) {
        setErrors2((prevErrors) => ({
          ...prevErrors,
          contact_number: "Please enter your mobile number",
        }));
        hasError2 = true;
      } else if (data2.contact_number.length < 10) {
        setErrors2((prevErrors) => ({
          ...prevErrors,
          contact_number: "Mobile number should be at least 10 digits",
        }));
        hasError2 = true;
      }

      if (!data2.email_id) {
        setErrors2((prevErrors) => ({
          ...prevErrors,
          email_id: "Please enter your email address",
        }));
        hasError2 = true;
      } else if (!/^\d{10}$/.test(data2.contact_number)) {
        setErrors2((prevErrors) => ({
          ...prevErrors,
          contact_number: "Mobile number should be a 10-digit numeric value",
        }));
        hasError2 = true;
      } else {
        setErrors2((prevErrors) => ({
          ...prevErrors,
          contact_number: "",
        }));
      }

      if (hasError2) {
        return;
      }
      if (!validateEmail(data2.email_id)) {
        notification.error({
          message: "Invalid Email Address",
          duration: 2,
        });
        return;
      }

      const yourObject = data2;
      const yourDataString = localStorage.setItem(
        "booking",
        JSON.stringify(yourObject)
      );
      navigate(`/pay-now-with-package`);
    } else {
      openNotification();
    }
  };

  return (
    <>
      <MetaLinks
        Title={"Single Packagesss"}
        imageURL={
          "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
        }
        description={"Single Packages lorem ipsum"}
      />

      <Modal
        open={loginModal}
        className="modal_login_main"
        centered
        onCancel={() => setLoginModal(false)}
        footer={null}
      >
        <Login
          toggle={toggle}
          setToggle={setToggle}
          settoggleRegister={settoggleRegister}
          toggleRegister={toggleRegister}
        />
      </Modal>
      <div className="pages-container" key={value.id}>
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
                    </div>

                    <div className="single-line">
                      <div class="title">{value?.attributes?.name}</div>
                      <button
                        className="form-button"
                        onClick={() =>
                          downloadFileAtUrl(
                            value?.attributes?.itenary_pdf?.data?.attributes
                              ?.url
                          )
                        }
                      >
                        download itinerary
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
                            {errors2.user_name && (
                              <span
                                style={{
                                  fontSize: ".7rem",
                                  color: "red",
                                  padding: ".2rem .5rem",
                                }}
                                className="error-text"
                              >
                                {errors2.user_name}
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
                            {errors2.contact_number && (
                              <span
                                style={{
                                  fontSize: ".7rem",
                                  color: "red",
                                  padding: ".2rem .5rem",
                                }}
                                className="error-text"
                              >
                                {errors2.contact_number}
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
                            {errors2.email_id && (
                              <span
                                style={{
                                  fontSize: ".7rem",
                                  color: "red",
                                  padding: ".2rem .5rem",
                                }}
                                className="error-text"
                              >
                                {errors2.email_id}
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
                          <div className="mytravellersinput2">
                            <div className="mytravellersinput1">
                              <div className="mytravellersinput">
                                Travellers:
                                <Counter
                                  count={data.adults}
                                  onCountChange={updateAdults}
                                />
                              </div>
                              <input
                                className="myjourneydate"
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
                          <div className="mytravellersinput2">
                            <div className="mytravellersinput1">
                              <div className="mytravellersinput">
                                Travellers:
                                <Counter
                                  count={data.adults}
                                  onCountChange={updateAdults}
                                />
                              </div>
                              <input
                                className="myjourneydate"
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
                            onClick={handleSubmit}
                          >
                            send enquiry
                          </button>
                        </form>
                      </>
                    )}
                  </div>

                  {/* ========== BOOK NOW OPTION */}

                  <div className="form-container">
                    <div className="packageId">BOOK NOW</div>

                    {login ? (
                      <>
                        <form class="form">
                          <input
                            type="hidden"
                            placeholder="Package Id"
                            value={data2.package_id}
                            onChange={handleChangeNew}
                            name="package_id"
                          />
                          <input
                            type="hidden"
                            placeholder="Package Name"
                            value={data2.package_name}
                            onChange={handleChangeNew}
                            name="package_name"
                          />

                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <input
                              type="text"
                              placeholder="Your Name (required)"
                              onChange={handleChangeNew}
                              name="user_name"
                              value={data2.user_name}
                            />
                            {errors2.user_name && (
                              <span
                                style={{
                                  fontSize: ".7rem",
                                  color: "red",
                                  padding: ".2rem .5rem",
                                }}
                                className="error-text"
                              >
                                {errors2.user_name}
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
                              onChange={handleChangeNew}
                              name="contact_number"
                              value={data2.contact_number}
                            />
                            {errors2.contact_number && (
                              <span
                                style={{
                                  fontSize: ".7rem",
                                  color: "red",
                                  padding: ".2rem .5rem",
                                }}
                                className="error-text"
                              >
                                {errors2.contact_number}
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
                              onChange={handleChangeNew}
                              name="email_id"
                              value={data2.email_id}
                            />
                            {errors2.email_id && (
                              <span
                                style={{
                                  fontSize: ".7rem",
                                  color: "red",
                                  padding: ".2rem .5rem",
                                }}
                                className="error-text"
                              >
                                {errors2.email_id}
                              </span>
                            )}
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <input
                              type="text"
                              placeholder="Trip start Location"
                              onChange={handleChangeNew}
                              name="current_location"
                              value={data2.current_location}
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
                                onChange={handleCheckboxChange2}
                                checked={fetchCityName2}
                              />{" "}
                              Use current location
                            </label>
                          </div>
                          <div className="mytravellersinput1">
                            <div className="mytravellersinput">
                              Travellers:
                              <Counter
                                count={data2.adults}
                                onCountChange={updateAdults2}
                              />
                            </div>
                            <input
                              className="myjourneydate"
                              type="date"
                              placeholder="Enter Journey start date"
                              name="trip_start_date"
                              onChange={handleChangeNew}
                              defaultValue={today}
                              min={today}
                            />
                          </div>

                          <button
                            className="form-button"
                            onClick={handlePayment}
                          >
                            {" "}
                            book now
                          </button>
                        </form>
                      </>
                    ) : (
                      <>
                        <form class="form">
                          <input
                            type="hidden"
                            placeholder="Package Id"
                            value={data2.package_id}
                            onChange={handleChangeNew}
                            name="package_id"
                          />
                          <input
                            type="hidden"
                            placeholder="Package Name"
                            value={data2.package_name}
                            onChange={handleChangeNew}
                            name="package_name"
                          />

                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <input
                              type="text"
                              placeholder="Your Name (required)"
                              value={data2.user_name}
                              onChange={handleChangeNew}
                              name="user_name"
                            />
                            {errors2.user_name && (
                              <span
                                style={{
                                  fontSize: ".7rem",
                                  color: "red",
                                  padding: ".2rem .5rem",
                                }}
                                className="error-text"
                              >
                                {errors2.user_name}
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
                              onChange={handleChangeNew}
                              name="contact_number"
                            />
                            {errors2.contact_number && (
                              <span
                                style={{
                                  fontSize: ".7rem",
                                  color: "red",
                                  padding: ".2rem .5rem",
                                }}
                                className="error-text"
                              >
                                {errors2.contact_number}
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
                              onChange={handleChangeNew}
                              name="email_id"
                            />
                            {errors2.email_id && (
                              <span
                                style={{
                                  fontSize: ".7rem",
                                  color: "red",
                                  padding: ".2rem .5rem",
                                }}
                                className="error-text"
                              >
                                {errors2.email_id}
                              </span>
                            )}
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <input
                              type="text"
                              placeholder="Trip start Location"
                              onChange={handleChangeNew}
                              name="current_location"
                              value={data2.current_location}
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
                                onChange={handleCheckboxChange2}
                                checked={fetchCityName2}
                              />{" "}
                              Use current location
                            </label>
                          </div>
                          <div className="mytravellersinput1">
                            <div className="mytravellersinput">
                              Travellers:
                              <Counter
                                count={data2.adults}
                                onCountChange={updateAdults2}
                              />
                            </div>
                            <input
                              className="myjourneydate"
                              type="date"
                              placeholder="Enter Journey start date"
                              name="trip_start_date"
                              onChange={handleChangeNew}
                              defaultValue={today}
                              min={today}
                            />
                          </div>
                          {contextHolder}
                          <button
                            className="form-button"
                            onClick={handlePayment}
                          >
                            book now
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

export default SinglePackages;
