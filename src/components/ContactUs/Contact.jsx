import * as React from "react";
import { useState, useEffect } from "react";
import { API, baseURL } from "../../api/apirequest";
import "./Contact.scss";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { message } from "antd";
import { notification } from "antd";
import { Skeleton } from "antd";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const theme = createTheme();

export default function Contact() {
  const [data, setData] = useState({
    user_name: "",
    user_email: "",
    query: "",
  });
  const [currentPath, setCurrentPath] = useState();

  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const [errors, setErrors] = useState({
    user_name: "",
    user_email: "",
    query: "",
  });
  useEffect(() => {
    const getData = async () => {
      try {
        let d = await API.get("/api/contact-details");
        setDetails(d.data.data[0]);
        setLoading(false);
      } catch (err) {
        setLoading(true);
      }
    };
    getData();

    window.scrollTo(0, 0);
    setCurrentPath(window.location.pathname);
  }, []);

  localStorage.setItem("pathName", currentPath);
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the field is 'user_name' and if the value is empty or contains only spaces
    if (name === "user_name" && !value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Please enter your full name",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }

    // Validate email
    if (name === "user_email") {
      if (!validateEmail(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          user_email: "Invalid email address",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, user_email: "" }));
      }
    }

    // Update the data state
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  //     const handleChange = (e) =>{
  //         const { name, value } = e.target;

  //         setData(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
  //         // Validate email
  // if (name === 'user_email') {
  //     if (!validateEmail(value)) {
  //       setErrors((prevErrors) => ({ ...prevErrors, user_email: 'Invalid email address' }));
  //     } else {
  //       setErrors((prevErrors) => ({ ...prevErrors, user_email: '' }));
  //     }
  //   }

  //   else {
  //     setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  //   }
  //         setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: '' }));

  //     }

  // const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const userDataString = localStorage.getItem("user");
  //     const userData = JSON.parse(userDataString);

  //     if (userData && userData.jwt) {
  //       const authToken = userData.jwt;

  //       const config = {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //       };

  //     try {

  //         let ob = {
  //             data
  //         }
  //         const res = await API.post('/api/pay-nows', ob, config);
  //         notification.success({
  //           message: 'Enquiry Sent successfully!',
  //           // description: 'You have successfully logged in.',

  //           duration: 2, // Duration in seconds (adjust as needed)
  //         });
  //         // console.log(res.data)
  //         setData(null)

  //     }

  //     catch (error) {
  //         console.log(error)
  //         if(error.response.status==403){
  //           notification.error({
  //             message: 'Please Login to send Payments!',
  //             description: '',

  //             duration: 2, // Duration in seconds (adjust as needed)
  //           });
  //         }else{
  //           notification.error({
  //             message: 'Unable to send Enquiry!',
  //             description: 'Please fill all details to send enquiry',

  //             duration: 2, // Duration in seconds (adjust as needed)
  //           });
  //         }

  //     }
  //   }else{
  //     notification.info({
  //       message: 'Login to Pay Now!',
  //       // description: 'You have successfully logged in.',

  //       duration: 2, // Duration in seconds (adjust as needed)
  //     });
  //   }
  //     // console.log(data)
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDataString = localStorage.getItem("user");
    const userData = JSON.parse(userDataString);
    // Validate required fields
    const newErrors = {};
    if (!data.user_name) {
      newErrors.user_name = "Please enter your full name";
    }
    if (!data.user_name.trim()) {
      newErrors.user_name = "Please enter your full name";
    }
    if (!data.user_email) {
      newErrors.user_email = "Please enter your email";
    }

    // if (!data.query) {
    //   newErrors.query = 'Please provide query';
    // }
    setErrors(newErrors);
    // if (userData && userData.jwt) {
    // const authToken = userData.jwt;
    const config = {
      headers: {
        "Content-Type": "application/json",
        // Add any other headers that are required for your API
      },
    };
    try {
      let ob = {
        data,
      };
      // if (!data.user_name || !data.user_email) {
      //     // Display an error message or take any other appropriate action
      //     return;
      //   }else{
      const res = await API.post("/api/contact-uses", ob, config);

      // console.log(res)
      if (res.status === 200) {
        notification.success({
          message: "Enquiry Sent!",
          // description: 'You have successfully logged in.',

          duration: 2, // Duration in seconds (adjust as needed)
        });
        setData({
          user_name: "",
          user_email: "",
          query: "",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      // }
      // console.log(error)
      if (error.response.status == 403) {
        notification.error({
          message: "Please Login to send requests!",
          description: "",

          duration: 2, // Duration in seconds (adjust as needed)
        });
      } else {
        notification.error({
          message: "Unable to send Enquiry!",
          description: "Please Enter valid Details",

          duration: 2, // Duration in seconds (adjust as needed)
        });
      }
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
    // }
    // else{
    //   notification.info({
    //     message: 'Login to Send Request!',
    //     // description: 'You have successfully logged in.',

    //     duration: 2, // Duration in seconds (adjust as needed)
    //   });
    //   // setTimeout(()=>{
    //   //   window.location.reload()
    //   //  },2000)
    // }
    // console.log(data)
  };

  return (
    <>
      <div className="contact-page-container">
        <div className="banner">
          <img src="https://admin.aventuras.co.in/uploads/contact123_5db3bb8964.png" />
        </div>

        <ThemeProvider theme={theme}>
          <Grid
            container
            component="main"
            sx={{
              height: "auto",
              padding: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CssBaseline />

            {/* <Grid
                            item
                            xs={12}
                            sm={4}
                            md={6}
                        >
                            <div className="maplocation">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d919.6025603418926!2d86.15592157297407!3d22.787257978436045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e4bfcd0e2c25%3A0x498f338625b21e06!2sAventuras%20Travel!5e0!3m2!1sen!2sin!4v1681282769376!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </Grid> */}
            <Grid
              item
              xs={12}
              sm={8}
              md={6}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 4,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flexStart",
                  justifyContent: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  Contact us
                </Typography>

                <div className="contact-text">
                  {loading ? (
                    <Skeleton active />
                  ) : (
                    <>
                      <div className="item">
                        <div className="icon">
                          <CallIcon />
                        </div>
                        <Link
                          onClick={() =>
                            (window.location = `tel:${details?.attributes?.company_mobile_number}`)
                          }
                          className="link"
                          style={{ color: "#000" }}
                        >
                          <div className="text" style={{ color: "#000" }}>
                            {details?.attributes?.company_mobile_number}
                          </div>
                        </Link>
                      </div>

                      <div className="item">
                        <div className="icon">
                          <MailIcon />
                        </div>
                        <Link
                          className="link"
                          style={{ color: "#000" }}
                          onClick={() =>
                            (window.location = "mailto:hello@aventuras.co.in")
                          }
                        >
                          <div className="text" style={{ color: "#000" }}>
                            {details?.attributes?.company_email}
                          </div>
                        </Link>
                      </div>
                    </>
                  )}
                </div>

                <div className="form-border">
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 1 }}
                  >
                    <div className="heading">GET IN TOUCH</div>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Enter Your Name"
                      type="text"
                      id="user_name"
                      name="user_name"
                      onChange={handleChange}
                      error={!!errors.user_name}
                      helperText={errors.user_name}
                    />

                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Enter your Email"
                      name="user_email"
                      onChange={handleChange}
                      error={!!errors.user_email}
                      helperText={errors.user_email}
                    />

                    <TextField
                      margin="normal"
                      // required
                      fullWidth
                      id="query"
                      label="Enter Query"
                      name="query"
                      onChange={handleChange}
                      multiline
                      rows={4}

                      // error={!!errors.query}
                      // helperText={errors.query}
                    />

                    <button className="form-button">Send Enquiry</button>
                  </Box>
                </div>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
    </>
  );
}
