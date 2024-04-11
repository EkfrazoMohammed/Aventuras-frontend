import React from "react";
import { useState, useEffect, useRef } from "react";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./singlegroup.scss";
import { API, baseURL } from "../../api/apirequest";

import {
  Tabs,
  Carousel,
  Skeleton,
  Button,
  Modal,
  Collapse,
  notification,
  Space,
} from "antd";
import type { TabsProps } from "antd";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

import ReactMarkdown from "react-markdown";
import Login from "../Auth/Login";
const { Panel } = Collapse;
const close = () => {
  console.log(
    "Notification was closed. Either the close button was clicked or duration time elapsed."
  );
};

const Singlegrouptour = () => {

  useEffect(() => {

    window.scrollTo(0, 0);
  }, [])

  const [currentPath, setCurrentPath] = useState();

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])
  localStorage.setItem('pathName', currentPath)
  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);
  const today = new Date().toISOString().split("T")[0];
  let { package_id } = useParams();
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {

  })
  const [errors, setErrors] = useState({
    user_name: "",
    contact_number: "",
    email_id: "",
  });
  const [fetchCityName, setFetchCityName] = useState(false);
  const [cityName, setCityName] = useState("");
  const [toggleRegister, settoggleRegister] = useState(false)


  const updateAdults = (newAdults) => {
    const updatedNumberOfPersons = parseInt(newAdults);

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


  useEffect(() => {
    if (userData && userData.isLoggedin === true) {
      setLogin(true);
      const getDataLogin = async () => {
        try {
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
          setLoading(true);
        }
      };
      getDataLogin();
    } else {
      setLogin(false);

      const getData = async () => {
        try {
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

  const handleChange = (e) =>
    setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let formIsValid = true;
    const newErrors = {
      user_name: "",
      contact_number: "",
      email_id: "",
    };
    if (!data.user_name.trim()) {
      formIsValid = false;
      newErrors.user_name = "User name is required";
    }

    if (!data.contact_number.trim()) {
      formIsValid = false;
      newErrors.contact_number = "Contact number is required";
    }
    if (!/^\d{10}$/.test(data.contact_number.trim())) {
      formIsValid = false;
      newErrors.contact_number = "Please enter a 10-digit phone number";
    }

    if (!data.email_id.trim()) {
      formIsValid = false;
      newErrors.email_id = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email_id.trim())) {
      formIsValid = false;
      newErrors.email_id = "Please enter a valid email address";
    }
    setErrors(newErrors);
    if (formIsValid) {
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
          // console.log(res)
        }
      } catch (error) {
        console.log(error);

        const message = error.response.data.error.message;
        if (message) {
          notification.error({
            message: error.response.data.error.message,
            duration: 2,
          });
        } else {
          notification.error({
            message: "Enter details to send Enquiry!",
            duration: 2,
          });
        }
      }
    }
  };
  const onChange = (key) => {
    // console.log(key);
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

  function groupDatesByMonth(dates) {
    const today = new Date();
    const futureDates = dates.filter((date) => new Date(date) >= today);
    if (futureDates.length > 0) {
      const months = {};
      futureDates.forEach((date) => {
        const month = new Date(date).toLocaleString("default", {
          month: "long",
        });
        if (!months[month]) {
          months[month] = [];
        }
        months[month].push(date);
      });
      return months;
    } else {
      return null;
    }
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
    if (!months) {
      return <h1>No Batches Available</h1>;
    }
    // console.log(months);

    return (
      <div>
        <h3>Dates and Bookings</h3>
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
                              <div>
                                Available slots:{" "}
                                <span style={{ fontWeight: "600" }}>
                                  {v.slots_available}
                                </span>
                              </div>
                              <div>
                                Price per person:{" "}
                                <span style={{ fontWeight: "600" }}>
                                  {v.price}
                                </span>
                              </div>
                            </div>
                            <div className="right">
                              <MyModal
                                package_data={value}
                                user_data={data}
                                batch_data={v}
                              />
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

  const [api, contextHolder] = notification.useNotification();
  const [loginModal, setLoginModal] = useState(false);
  const [toggle, setToggle] = useState(false);
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
        <Button type="primary" onClick={() => { api.destroy(key); setLoginModal(true); setToggle(true); settoggleRegister(false) }} style={{ backgroundColor: '#fde000', color: '#000', fontWeight: '600' }}>
          Login
        </Button>
      </Space>
    );
    api.open({
      message: <div style={{ fontSize: '1rem', fontWeight: '600' }}>Login Required</div>,
      description:
        <div className="" style={{ color: 'red' }}>*Please login to proceed with booking</div>,
      btn,
      key,
      onClose: close,
    });
  };
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [modal3Open, setModal3Open] = useState(false);

  const [modal4Open, setModal4Open] = useState(false);
  const modalRef = useRef(modal2Open);
  modalRef.current = modal2Open;
  const MyModal = ({ package_data, user_data, batch_data }) => {
    const [errors2, setErrors2] = useState({
      user_name: "",
      contact_number: "",
      email_id: "",
    });
    const [errors3, setErrors3] = useState({
      user_name: "",
      contact_number: "",
      email_id: "",
    });

    const storedBatchData = JSON.parse(localStorage.getItem("mybatch")) || {};
    const storedPreviewData =
      JSON.parse(localStorage.getItem("preview_booking")) || null;

    const [count, setCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const handleCountChange = (newCount) => {
      setCount(newCount);

      setData((prevState) => ({
        ...prevState,
        adults: newCount,
        initial_package_amount: newCount * storedBatchData.price,
        total_price: newCount * storedBatchData.price,
        advance_amount: newCount * storedBatchData.price,
      }));
    };

    const [data, setData] = useState({
      package_id: package_data?.attributes?.package_id,
      package_name: package_data?.attributes?.name,
      user_name: user_data?.user_name,
      contact_number: user_data?.contact_number,
      email_id: user_data?.email_id,
      current_location: "",
      adults: count,
      trip_start_date: storedBatchData.batch_starts,
      total_price: totalPrice,
      initial_package_amount: totalPrice,
      partialPayment: 100,
      advance_amount: 0,
      remaining_balance: 0,
    });

    const handleBookPreview = (param) => {

      let formIsValid = true;
      const newErrors = {
        user_name: "",
        contact_number: "",
        email_id: "",
        travellers: "",
      };

      // Validation for user_name
      if (!param.user_name.trim()) {
        formIsValid = false;
        newErrors.user_name = "User name is required";
      }

      // Validation for contact number
      if (!param.contact_number.trim()) {
        formIsValid = false;
        newErrors.contact_number = "Contact number is required";
      }
      if (!/^\d{10}$/.test(param.contact_number.trim())) {
        formIsValid = false;
        newErrors.contact_number = "Please enter a 10-digit phone number";
      }

      // Validation for email_id
      if (!param.email_id.trim()) {
        formIsValid = false;
        newErrors.email_id = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(param.email_id.trim())) {
        formIsValid = false;
        newErrors.email_id = "Please enter a valid email address";
      }

      // Other field validations can be added similarly

      if (param.adults === 0) {
        formIsValid = false;
        newErrors.travellers = "At least 1 traveler is required";
      } else if (param.adults > storedBatchData.slots_available) {
        formIsValid = false;
        newErrors.travellers =
          "Number of travelers cannot exceed available slots";
      } else {
        formIsValid = true;
        newErrors.travellers = "";
      }

      // Set errors state based on validation
      setErrors2(newErrors);


      if (formIsValid) {
        setModal3Open(true);
        localStorage.setItem("preview_booking", JSON.stringify(param));
      }
    };

    const handleSelectChange = (e) => {
      const selectedValue = parseInt(e.target.value);

      if (selectedValue) {
        let advanceValue = storedPreviewData.adults * storedBatchData.price;

        switch (selectedValue) {
          case 25:
            advanceValue =
              storedPreviewData.adults * storedBatchData.price * 0.25; // 25% of the price
            break;
          case 50:
            advanceValue =
              storedPreviewData.adults * storedBatchData.price * 0.5; // 50% of the price
            break;
          case 75:
            advanceValue =
              storedPreviewData.adults * storedBatchData.price * 0.75; // 75% of the price
            break;
          case 100:
            advanceValue = storedPreviewData.adults * storedBatchData.price; // Full price
            break;
          default:
            advanceValue = storedPreviewData.adults * storedBatchData.price;
            break;
        }

        const remainingBalance =
          storedPreviewData.adults * storedBatchData.price - advanceValue;
        const updatedData = {
          ...data,
          initial_package_amount: storedPreviewData.adults * storedBatchData.price,
          partialPayment: selectedValue || 100,
          adults: storedPreviewData.adults,
          advance_amount: Math.round(advanceValue),
          remaining_balance: Math.round(remainingBalance),
          total_price: Math.round(advanceValue),
          current_location: ""
        };
        setData(updatedData);
        localStorage.setItem("preview_booking", JSON.stringify(updatedData));
      }
    };

    const handleProceedBook = (param) => {
      navigate("/group-tour-pay-now");
    };
    const handleChange3 = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      setData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      if (name === "package_id") {
        setData((prevState) => ({
          ...prevState,
          package_id: package_data?.attributes?.package_id,
        }));
      } else if (name === "package_name") {
        setData((prevState) => ({
          ...prevState,
          package_name: package_data?.attributes?.name,
        }));
      } else if (storedBatchData && storedBatchData.batch_starts) {
        setData((prevState) => ({
          ...prevState,
          trip_start_date: storedBatchData.batch_starts,
        }));
      }
    };

    const handleSubmit3 = async (e) => {
      e.preventDefault();
      const config3 = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      let formIsValid = true;
      const newErrors = {
        user_name: "",
        contact_number: "",
        email_id: "",
        travellers: "",
      };

      // Validation for user_name
      if (!data.user_name.trim()) {
        formIsValid = false;
        newErrors.user_name = "User name is required";
      }
      if (!/^\d{10}$/.test(data.contact_number.trim())) {
        formIsValid = false;
        newErrors.contact_number = "Please enter a 10-digit phone number";
      }

      // Validation for email_id
      if (!data.email_id.trim()) {
        formIsValid = false;
        newErrors.email_id = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(data.email_id.trim())) {
        formIsValid = false;
        newErrors.email_id = "Please enter a valid email address";
      }
      if (data.adults === 0) {
        formIsValid = false;
        newErrors.travellers = "Atleast 1 Travellers is required";
      }

      // Set errors state based on validation
      setErrors3(newErrors);

      if (formIsValid) {
        try {
          let ob3 = {
            data,
          };
          const res = await API.post("/api/group-tour-enquiries", ob3, config3);
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
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    return (
      <>
        <Modal
          open={loginModal}
          className="modal_login_main"
          centered
          onCancel={() => setLoginModal(false)}
          footer={null}
        >

          <Login toggle={toggle} setToggle={setToggle} toggleRegister={toggleRegister} settoggleRegister={settoggleRegister} />

        </Modal>
        {contextHolder}
        <Button
          onClick={() => {
            setModal1Open(true);
            localStorage.setItem("mybatch", JSON.stringify(batch_data));
          }}
          style={{ backgroundColor: "#1677ff", color: "#fff" }}
        >
          Enquire now
        </Button>
        {login ? (
          <>
            <Button
              onClick={() => {
                localStorage.setItem("mybatch", JSON.stringify(batch_data));
                setModal2Open(true);
              }}
              style={{ backgroundColor: "#01c001", color: "#fff" }}
            >
              Book now
            </Button>
          </>
        ) : (
          <>
            <Button
              style={{ backgroundColor: "#01c001", color: "#fff" }}
              onClick={openNotification}
            >
              book now
            </Button>
          </>
        )}
        <Modal
          title="BOOK NOW "
          centered
          open={modal2Open}
          onCancel={() => setModal2Open(false)}
          footer={[
            <div
              style={{
                display: "flex",
                justifyContnent: "center",
                gap: '1rem',
                padding: '1rem'
              }}
            >

              <Button
                style={{ backgroundColor: "red" }}
                key="back"
                type="primary"
                onClick={() => setModal2Open(false)}
              >
                Cancel
              </Button>

              <Button
                type="primary"
                onClick={() => {
                  setData((prev) => ({ ...prev, current_location: cityName }))
                  handleBookPreview(data);

                }}
              >
                Preview Booking
              </Button>
            </div>,
          ]}
        >
          <div className="left">
            <div className="modal-details" style={{ margin: '1rem' }}>
              {/* <h6>{JSON.stringify(storedBatchData)}</h6> */}
              <h4>{package_data?.attributes?.name}</h4>
              <span className="dates-start-end">
                {new Date(storedBatchData.batch_starts).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}{" "}
                -{" "}
                {new Date(storedBatchData.batch_ends).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </span>
              <div>Available slots : {storedBatchData.slots_available} </div>
              <div>
                {" "}
                Price per person :{" "}
                <span style={{ fontWeight: "600" }}>
                  {storedBatchData.price}
                </span>{" "}
              </div>
            </div>
            <div className="form-section" style={{ margin: '1rem' }}>
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
                  placeholder="trip_start_date"
                  onChange={handleChange3}
                  name="trip_start_date"
                  value={storedBatchData.batch_starts}
                />

                <input
                  type="hidden"
                  placeholder="Package Name"
                  onChange={handleChange3}
                  name="package_name"
                  value={data.package_name}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    onChange={handleChange3}
                    name="user_name"
                    value={data.user_name}
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
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                    type="number"
                    placeholder="Your Mobile Number"
                    onChange={handleChange3}
                    name="contact_number"
                    value={data.contact_number}
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

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    onChange={handleChange3}
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

                <input
                  type="text"
                  placeholder="Current Location"
                  onChange={handleChange3}
                  name="current_location"
                />

                <div className="mygtravellersmodal">
                  Number of travellers :
                  <div
                    style={{
                      border: "1px solid #eee",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",

                      fontSize: "1.1rem",
                      borderRadius: "20px",
                    }}
                  >
                    <Button
                      type="small"
                      shape="circle"
                      onClick={(e) => {
                        e.preventDefault();
                        if (count > 0) {
                          setModal2Open(true);
                          handleCountChange(count - 1);
                        }
                      }}
                      style={{ background: "#FFD93D" }}
                    >
                      -
                    </Button>
                    <span>{count}</span>
                    <Button
                      type="small"
                      shape="circle"
                      onClick={(e) => {
                        e.preventDefault();
                        setModal2Open(true);
                        handleCountChange(count + 1);
                      }}
                      style={{ background: "#FFD93D" }}
                    >
                      +
                    </Button>
                  </div>
                  {errors2.travellers && (
                    <span
                      style={{
                        fontSize: ".7rem",
                        color: "red",
                        padding: ".2rem .5rem",
                      }}
                      className="error-text"
                    >
                      {errors2.travellers}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          key={batch_data.id}
          title={`Enquire now `}
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
                style={{ backgroundColor: "red", color: "#fff" }}
                onClick={() => setModal1Open(false)}
              >
                Cancel
              </Button>

              <Button
                style={{ backgroundColor: "#1677ff", color: "#fff" }}
                onClick={handleSubmit3}
              >
                Send Enquiry
              </Button>
            </div>,
          ]}
        >
          <div className="left">
            <div className="modal-details">
              <h4>{package_data?.attributes?.name}</h4>
              <span className="dates-start-end">
                {new Date(storedBatchData.batch_starts).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
                -
                {new Date(storedBatchData.batch_ends).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </span>
              <div>Available slots : {storedBatchData.slots_available} </div>
              <div>
                {" "}
                Price per person :{" "}
                <span style={{ fontWeight: "600" }}>
                  {storedBatchData.price}
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
                  onChange={handleChange3}
                  name="package_name"
                  value={data.package_name}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    onChange={handleChange3}
                    name="user_name"
                    value={data.user_name}
                  />
                  {errors3.user_name && (
                    <span
                      style={{
                        fontSize: ".7rem",
                        color: "red",
                        padding: ".2rem .5rem",
                      }}
                      className="error-text"
                    >
                      {errors3.user_name}
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                    type="number"
                    placeholder="Your Mobile Number"
                    onChange={handleChange3}
                    name="contact_number"
                    value={data.contact_number}
                    required
                  />
                  {errors3.contact_number && (
                    <span
                      style={{
                        fontSize: ".7rem",
                        color: "red",
                        padding: ".2rem .5rem",
                      }}
                      className="error-text"
                    >
                      {errors3.contact_number}
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    onChange={handleChange3}
                    name="email_id"
                    value={data.email_id}
                  />
                  {errors3.email_id && (
                    <span
                      style={{
                        fontSize: ".7rem",
                        color: "red",
                        padding: ".2rem .5rem",
                      }}
                      className="error-text"
                    >
                      {errors3.email_id}
                    </span>
                  )}
                </div>

                <input
                  type="text"
                  placeholder="Current Location"
                  onChange={handleChange3}
                  name="current_location"
                  value={data.current_location}
                />

                <div className="mygtravellersmodal">
                  Number of travellers :
                  <div
                    style={{
                      border: "1px solid #eee",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",

                      fontSize: "1.1rem",
                      borderRadius: "20px",
                    }}
                  >
                    <Button
                      type="small"
                      shape="circle"
                      onClick={(e) => {
                        e.preventDefault();
                        if (count > 0) {
                          setModal1Open(true);
                          handleCountChange(count - 1);
                        }
                      }}
                      style={{ background: "#FFD93D" }}
                    >
                      -
                    </Button>
                    <span>{count}</span>
                    <Button
                      type="small"
                      shape="circle"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCountChange(count + 1);
                        setModal1Open(true);
                      }}
                      style={{ background: "#FFD93D" }}
                    >
                      +
                    </Button>
                  </div>
                  {errors3.travellers && (
                    <span
                      style={{
                        fontSize: ".7rem",
                        color: "red",
                        padding: ".2rem .5rem",
                      }}
                      className="error-text"
                    >
                      {errors3.travellers}
                    </span>
                  )}
                </div>
              </div>
            </form>
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
                padding: '1rem',
                gap: '1rem'
              }}
            >
              <Button
                key="back"
                type="primary"
                onClick={() => setModal3Open(false)}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  setModal4Open(true);
                  handleProceedBook(data);
                }}
              >
                Proceed to pay
              </Button>
            </div>,
          ]}
        >
          <div className="left">
            <div className="modal-details" style={{ margin: '3rem 1rem' }}>
              <h4>{package_data?.attributes?.name}</h4>
              <span className="dates-start-end">
                {new Date(storedBatchData.batch_starts).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}{" "}
                -{" "}
                {new Date(storedBatchData.batch_ends).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </span>
              <div>
                Available slots:{" "}
                <span style={{ fontWeight: "600" }}>
                  {storedBatchData.slots_available}
                </span>
              </div>
              <div>
                Price per person:{" "}
                <span style={{ fontWeight: "600" }}>
                  {storedBatchData.price}
                </span>
              </div>
              <div>
                {storedPreviewData && storedPreviewData.adults && (
                  <div>
                    Number of Person:{" "}
                    <span style={{ fontWeight: "600" }}>
                      {JSON.stringify(storedPreviewData.adults)}
                    </span>
                  </div>
                )}
                {storedPreviewData && storedPreviewData.total_price && (
                  <div>
                    Total Booking Amount:{" "}
                    <span style={{ fontWeight: "600" }}>
                      {JSON.stringify(storedPreviewData.adults * storedBatchData.price)}
                    </span>
                  </div>
                )}
                <hr />

                {data.partialPayment == 0 ? (
                  <div>Selected Advance Payment:<span style={{ fontWeight: "600" }}>100% </span> </div>
                ) : (
                  <div>Selected Advance Payment:<span style={{ fontWeight: "600" }}>{data.partialPayment}% </span> </div>
                )}

                {storedPreviewData && storedPreviewData.total_price && (
                  <div>
                    Total Price (excluding PG charges):{" "}
                    <span style={{ fontWeight: "600" }}>
                      {JSON.stringify(storedPreviewData.total_price)}
                    </span>
                  </div>
                )}

                <hr />
                <label style={{ marginTop: "10px" }}>Select Advance Payment:</label>
                <select
                  value={data.partialPayment}
                  onChange={handleSelectChange}
                >
                  <option value={100}>100% of the price</option>
                  <option value={75}>75% of the price</option>
                  <option value={50}>50% of the price</option>
                  <option value={25}>25% of the price</option>
                </select>
              </div>

              <br />
            </div>
          </div>
        </Modal>

        <Modal
          style={{ height: "50vh", top: 10, zIndex: "999999999 !important" }}
          title="Payment"
          open={modal4Open}
          onOk={() => alert("ok")}
          onCancel={() => {
            setModal4Open(false);
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }}
        >
          <div className="payment-iframe">
            <iframe
              src="https://mercury-uat.phonepe.com/transact/simulator?token=c6K8TLzyIj6VS9QQ6v7nwDOnGKwCEiRlO04T0FOwW98"
              frameborder="0"
              className="payment-iframe"
            ></iframe>
          </div>
        </Modal>
      </>
    );
  };
  const [checked, setChecked] = useState(false);

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
          if (data && data.address && data.address.city) {
            const city = data.address.city;
            setCityName(city);
            setFetchCityName(true);
            setData((data) => {
              if (city) {
                return {
                  ...data,
                  current_location: city,
                };
              }
            })



          } else {
            setCityName("City not found in reverse geocoding data.");
          }
        } catch (error) {
          setCityName("Error fetching location data");
        }
      });
    } else {
      setCityName("Geolocation not available.");
    }
  };

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
                              {`${value?.attributes?.package_nights + 1
                                } Days / ${value?.attributes?.package_nights
                                } Night`}
                            </>
                          ) : (
                            <>
                              {`${value?.attributes?.package_nights + 1
                                } Days / ${value?.attributes?.package_nights
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
                              {`${value?.attributes?.package_nights + 1
                                } Days / ${value?.attributes?.package_nights
                                } Night`}
                            </>
                          ) : (
                            <>
                              {`${value?.attributes?.package_nights + 1
                                } Days / ${value?.attributes?.package_nights
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
                              required
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
                          <div className="mygtravellersinput1">
                            <div className="mygtravellersinput2">
                              <div className="mygtravellersinput_container">
                                Adults:
                                <Counter
                                  count={data.adults}
                                  onCountChange={updateAdults}
                                />
                              </div>
                              <input
                                className="mygjourneydate"
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
                          <div className="mygtravellersinput1">
                            <div className="mygtravellersinput2">
                              <div className="mygtravellersinput_container">
                                Adults:
                                <Counter
                                  count={data.adults}
                                  onCountChange={updateAdults}
                                />
                              </div>
                              <input
                                className="mygjourneydate"
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
