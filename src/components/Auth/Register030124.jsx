import * as React from "react";
import { useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { googleLogout } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import { message } from "antd";
import { notification } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { storeUser } from "./helper";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { API } from "../../api/apirequest";

import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";

import { MuiOtpInput } from "mui-one-time-password-input";

function Copyright(props) {
  return (
    <div style={{ textAlign: "center" }}>
      {"Copyright © "}
      <Link color="inherit" to="" style={{ color: "#000" }}>
        Aventuras
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </div>
  );
}
const theme = createTheme();

export default function Register() {
  const navigate = useNavigate();
  const [a, setA] = useState(false);

  const [b, setB] = useState(true);

  const [c, setC] = useState(false);
  const [m, setM] = useState(false);

  const initialUser = {
    email: "",
    password: "",
    username: "",
    mobile_number: "",
    otp: "",
  };
  const [user, setUser] = useState(initialUser);

  const [errors, setErrors] = useState({
    email: "",
    mobile_number: "",
    otp: "",
  });
  // show input signup
  const [showOTPDialog, setShowOTPDialog] = useState(false);

  //  for google signup
  const [showMobileNumberDialog, setShowMobileNumberDialog] = useState(false);
  const [showMobileNumberDialog2, setShowMobileNumberDialog2] = useState(false);

  const [generatedOTP, setGeneratedOTP] = useState("");

  const generateOTP = () => {
    const min = 100000; // Minimum 6-digit OTP
    const max = 999999; // Maximum 6-digit OTP
    const generated = Math.floor(Math.random() * (max - min + 1)) + min;
    return generated.toString();
  };

  const [submitted, setSubmitted] = useState(false);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleGoogleError = (err) => {
    // // console.log(err);
    console.log("Login with Google failed");
  };

  const handleLogout = () => {
    googleLogout();
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  const [validate, setValiDate] = useState({
    isEmailValid: false,
    isMobileValid: false,
  });
  const handleUserChange = (e) => {
    const { name, value } = e.target;

    // Validate email
    if (name === "email") {
      if (value.length === 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email is required",
        }));
        setValiDate((prevValidate) => ({
          ...prevValidate,
          isEmailValid: false,
        }));
      } else if (!validateEmail(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Invalid email address",
        }));

        setValiDate((prevValidate) => ({
          ...prevValidate,
          isEmailValid: false,
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
        setValiDate((prevValidate) => ({
          ...prevValidate,
          isEmailValid: true,
        }));
        // if (errors.mobile_number && value.length !== 0) {
        //   setC(true); // Set C to true if mobile_number has an error and email is valid
        // } else {
        //   setC(false); // Set C to false if email is valid and mobile_number has no error
        // }
      }
    }

    // Validate mobile number
    if (name === "mobile_number") {
      if (value.length === 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          mobile_number: "Mobile Number is required",
        }));
        setValiDate((prevValidate) => ({
          ...prevValidate,
          isMobileValid: false,
        }));
      } else if (value.length !== 10) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          mobile_number: "Mobile number should have 10 digits",
        }));
        setValiDate((prevValidate) => ({
          ...prevValidate,
          isMobileValid: false,
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, mobile_number: "" }));
        setValiDate((prevValidate) => ({
          ...prevValidate,
          isMobileValid: true,
        }));
        // if (errors.email && value.length !== 0) {
        //   setC(true); // Set C to true if email has an error and mobile_number is valid
        // } else {
        //   setC(false); // Set C to false if mobile_number is valid and email has no error
        // }
      }
    }
    // Later in your code where you need to determine C value
    const isEmailValid = errors.email === "";
    const isMobileValid = errors.mobile_number === "";

    // setC(isEmailValid && isMobileValid);
    // Update the data state
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    if (validate.isEmailValid && validate.isMobileValid) {
      setC(false);
    } else {
      setC(true);
    }
  }, [handleUserChange]);

  const handleLoginSuccess = async (response) => {
    const userObject = jwt_decode(response.credential);
    console.log(userObject);

    if (userObject !== null) {
      try {
        const data543 = await axios.get(
          "https://admin.aventuras.co.in/api/users?fields=email"
        );
        const myusers = data543.data.map((user) => user.email);

        if (myusers.includes(userObject.email)) {
          notification.error({
            message: "You are already registered",
          });
        } else {
          const randomTwoDigitNumber = Math.floor(Math.random() * 9000) + 1000; // Generate a random 2-digit number
          let genearatedUsername =
            userObject.name.replace(/\s/g, "") + randomTwoDigitNumber;

          let payloadob = {
            email: userObject.email,
            username: genearatedUsername,
            password: genearatedUsername,
            secretkey: genearatedUsername,
          };
          setUser(payloadob);
          try {
            const res = await axios.post(
              "https://admin.aventuras.co.in/api/auth/local/register",
              payloadob
            );
            console.log(res);
            if (res.status === 200) {
              notification.success({
                message: "User Registered Successful",
                description: "You have successfully Registered.",
                duration: 2,
              });
              console.log(payloadob);

              if (payloadob.email) {
                let loginpayloadOb = {
                  identifier: payloadob.email,
                  password: payloadob.password,
                };

                const { data } = await axios.post(
                  "https://admin.aventuras.co.in/api/auth/local/",
                  loginpayloadOb
                );

                console.log(data);

                if (data.jwt) {
                  storeUser(data);

                  if (path) {
                    navigate(path);
                  } else {
                    navigate("/");
                  }
                  let mailData = {
                    name: payloadob.email,
                    email: payloadob.email,
                    subject: `CREDENTIALS`,
                    username: `${payloadob.email}`,
                    password: `${payloadob.password}`,
                  };
                  console.log(mailData);
                  let sendingMail = await axios.post(
                    "https://aventuras.co.in/api/v1/users/sendCredentialsMail",
                    mailData
                  );

                  console.log(sendingMail);
                  setTimeout(() => {
                    window.location.reload();
                  }, 1000);
                }

                // let mailData = {
                //   name: user.email,
                //   email: user.email,
                //   subject: "CREDENTIALS",
                //   mode: `${user.email} and ${user.password}`,
                //   otp: `123456`,
                // };

                // let sendingMail = await axios.post(
                //   "https://aventuras.co.in/api/v1/users/sendOTPMail",
                //   mailData
                // );
              }
            }
          } catch (err) {
            console.log(err);
            let errorMessage = err.response.data.error.message;

            if (errorMessage === "Email or Username are already taken") {
              notification.error({
                message: "Email is already taken",
                description: "User Profile already exists",
                duration: 3, // Duration in seconds (adjust as needed)
              });
            } else if (errorMessage === "mobile_number must be defined.") {
              notification.error({
                message: "Mobile Number is required",
                duration: 3, // Duration in seconds (adjust as needed)
              });
            } else {
              notification.error({
                description: "Signup failed",
                duration: 3,
              });
            }
            // setTimeout(()=>{
            //   window.location.reload()
            // },3000)
          }
          // sendOTPGoogle(payloadob);
          // setShowMobileNumberDialog(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const verifyGoogleOTP = async (payloadob) => {
    try {
      const res = await axios.post(
        "https://admin.aventuras.co.in/api/auth/local/register",
        payloadob
      );
      console.log(res);
      if (res.status === 200) {
        try {
          if (payloadob.email) {
            let payloadOb = {
              identifier: payloadob.email,
              password: payloadob.password,
            };

            const { data } = await axios.post(
              "https://admin.aventuras.co.in/api/auth/local/",
              payloadOb
            );
            console.log(data);

            if (data.jwt) {
              storeUser(data);
              let mailData = {
                name: payloadob.email,
                email: payloadob.email,
                subject: `CREDENTIALS`,
                username: `${payloadob.email}`,
                password: `${payloadob.password}`,
              };
              console.log(mailData);
              let sendingMail = await axios.post(
                "https://aventuras.co.in/api/v1/users/sendCredentialsMail",
                mailData
              );

              console.log(sendingMail);

              console.log(sendingMail);
              if (path) {
                navigate(path);
              } else {
                navigate("/");
              }
              notification.success({
                message: "User Registered Successful",
                description: "You have successfully Registered.",
                duration: 2, // Duration in seconds (adjust as needed)
              });
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (err) {
      console.log(err);
      let errorMessage = err.response.data.error.message;

      if (errorMessage === "Email or Username are already taken") {
        notification.error({
          message: "Email is already taken",
          description: "User Profile already exists",
          duration: 3, // Duration in seconds (adjust as needed)
        });
      } else if (errorMessage === "mobile_number must be defined.") {
        notification.error({
          message: "Mobile Number is required",
          duration: 3, // Duration in seconds (adjust as needed)
        });
      } else {
        notification.error({
          description: "Signup failed",
          duration: 3,
        });
      }
      // setTimeout(()=>{
      //   window.location.reload()
      // },3000)
    }
  };
  const sendOTPGoogle = async (payloadob) => {
    let newOtp = generateOTP();
    setGeneratedOTP(newOtp);

    let mailData = {
      name: payloadob.email,
      email: payloadob.email,
      subject: "OTP FOR SIGNUP",
      mode: "SIGNUP",
      otp: `${newOtp}`,
    };

    setShowMobileNumberDialog(true);
    let sendingMail = await axios.post(
      "https://aventuras.co.in/api/v1/users/sendOTPMail",
      mailData
    );
    // console.log(sendingMail)
  };
  const verifyUserOTP = async (e) => {
    e.preventDefault();

    // Check if the entered OTP is not equal to the generated OTP
    if (user.otp !== generatedOTP) {
      // alert("Invalid OTP");
      notification.error({
        message: "Invalid OTP",
      });
    } else {
      try {
        let payloadob = {
          email: user.email,
          password: user.password,
          secretkey: user.password,
          username: user.email,
        };
        const res = await axios.post(
          "https://admin.aventuras.co.in/api/auth/local/register",
          payloadob
        );

        setShowMobileNumberDialog(false);
        if (res.status === 200) {
          try {
            if (user.email) {
              let payloadOb = {
                identifier: user.email,
                password: user.password,
              };

              const { data } = await axios.post(
                "https://admin.aventuras.co.in/api/auth/local/",
                payloadOb
              );

              if (data.jwt) {
                storeUser(data);

                if (path) {
                  navigate(path);
                } else {
                  navigate("/");
                }
                notification.success({
                  message: "User Registered Successful",
                  description: "You have successfully Registered.",
                  duration: 2,
                });
                let mailData = {
                  name: user.email,
                  email: user.email,
                  subject: "CREDENTIALS",
                  username: `${user.email}`,
                  password: `${user.password}`,
                };
                console.log(mailData);
                let sendingMail = await axios.post(
                  "https://aventuras.co.in/api/v1/users/sendCredentialsMail",
                  mailData
                );

                console.log(sendingMail);
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }
            }
          } catch (error) {
            console.log(error);
          }
        }
      } catch (err) {
        console.log(err);
        let errorMessage = err.response.data.error.message;

        if (errorMessage === "Email or Username are already taken") {
          notification.error({
            message: "Email is already taken",
            description: "User Profile already exists",
            duration: 3, // Duration in seconds (adjust as needed)
          });
        } else if (errorMessage === "mobile_number must be defined.") {
          notification.error({
            message: "Mobile Number is required",
            duration: 3, // Duration in seconds (adjust as needed)
          });
        } else {
          notification.error({
            description: "Signup failed",
            duration: 3,
          });
        }
        // setTimeout(()=>{
        //   window.location.reload()
        // },3000)
      }
    }
  };

  const [otp, setotp] = useState();
  const handleUserChanged = (event) => {
    setotp(event);
    setUser((currentUser) => ({
      ...currentUser,
      otp: event,
    }));
  };

  const handleA = (event) => {
    setA(false);
    if (event.target.value === "email") {
      // alert(event.target.value+'option selected');
      setB(true);
      setM(false);
      // You can perform any other actions you need when 'Email' is selected
    }

    if (event.target.value === "mobile") {
      // alert(event.target.value+'option selected');
      setM(true);
      setB(false);
    }
    // Add other conditions or actions based on selected value if needed
  };

  const [oldusersemail, setOldusersemail] = useState([]);
  const [oldusersmobile, setOldusersmobile] = useState([]);
  const path = localStorage.getItem("pathName");
  useEffect(() => {
    const fetchUsers = async () => {
      const AllEmaildata = await axios.get(
        "https://admin.aventuras.co.in/api/users?fields=email"
      );

      const AllMobiledata = await axios.get(
        "https://admin.aventuras.co.in/api/users?fields=mobile_number"
      );

      const myusersemail123 = AllEmaildata.data.map((user) => user.email);

      const myusersmobile123 = AllMobiledata.data.map(
        (user) => user.mobile_number
      );
      setOldusersemail(myusersemail123);
      setOldusersmobile(myusersmobile123);
    };
    fetchUsers();
  }, []);

  const signUpWithEmail = async () => {
    try {
      if (!user.email) {
        // Check if the field being changed is the email field

        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email is required.",
        }));
      }
      const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      // Check if the email field is not in the correct format
      if (user.email && !emailPattern.test(user.email)) {
        notification.error({
          message: "Invalid Email id",
          duration: 2,
        });
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Invalid email address.",
        }));
      }

      if (oldusersemail.includes(user.email)) {
        notification.error({
          message: "You are already registered",
          description: "Email already exist",
        });
      } else if (oldusersmobile.includes(user.mobile_number)) {
        notification.error({
          message: "You are already registered",
          description: "Mobile number already exist",
        });
      } else {
        if (user.email && emailPattern.test(user.email) && user.mobile_number) {
          setA(true);
          setC(false);
          setB(false);
          const randomTwoDigitNumber = Math.floor(Math.random() * 9000) + 1000; // Generate a random 2-digit number
          let genearatedUsername = user.email + randomTwoDigitNumber; // Concatenate it with the email

          // let payloadob = {
          //   email: user.email,
          //   username: genearatedUsername,
          //   password: user.email,
          // };
          let payloadob = {
            email: user.email,
            username: genearatedUsername,
            password: genearatedUsername,
          };
          setUser(payloadob);

          setShowOTPDialog(true);
          let newOtp = generateOTP();
          setGeneratedOTP(newOtp);
          let mailData = {
            name: user.email,
            email: user.email,

            subject: "OTP FOR SIGNUP",
            mode: "SIGNUP",
            otp: `${newOtp}`,
          };

          let sendingMail = await axios.post(
            "https://aventuras.co.in/api/v1/users/sendOTPMail",
            mailData
          );
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error.message;
        const validationErrors = error.response.data.error.details.errors;

        // Handle case where email or username is already taken
        if (errorMessage === "Email or Username are already taken") {
          handleRegistrationError("Email or Username are already taken");
          return;
        }

        // Handle other validation errors
        const newErrors = constructNewErrors(validationErrors);
        setErrors(newErrors);

        // Handle specific error conditions
        const usernameError = validationErrors.find(
          (errorItem) => errorItem.path[0] === "username"
        );
        const passwordError = validationErrors.find(
          (errorItem) => errorItem.path[0] === "password"
        );

        if (
          usernameError &&
          usernameError.message.includes("at least 3 characters")
        ) {
          // Handle username too short error
          handleUsernameTooShortError(usernameError.message);
        }

        if (
          passwordError &&
          passwordError.message.includes("at least 6 characters")
        ) {
          // Handle password too short error
          handlePasswordTooShortError(passwordError.message);
        }

        handleRegistrationError(errorMessage);
      }
    }

    // Function to handle username too short error
    function handleUsernameTooShortError(errorMessage) {
      // Update your state or perform other actions to handle this error
    }

    // Function to handle password too short error
    function handlePasswordTooShortError(errorMessage) {
      // Update your state or perform other actions to handle this error
    }

    // Function to display error notification
    function handleRegistrationError(errorMessage) {
      notification.error({
        message: "User Registration Failed!",
        description: errorMessage,
        duration: 2,
      });
    }

    // Function to construct error object for input fields
    function constructNewErrors(validationErrors) {
      const newErrors = {};

      validationErrors.forEach((errorItem) => {
        const field = errorItem.path[0];
        newErrors[field] = errorItem.message;
      });

      return newErrors;
    }
  };

  const [myOTP, setMyOTP] = useState("");

  const signUpWithSMS = async () => {
    try {
      if (!user.email) {
        // Check if the field being changed is the email field

        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email is required.",
        }));
      }
      const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      // Check if the email field is not in the correct format
      if (user.email && !emailPattern.test(user.email)) {
        notification.error({
          message: "Invalid Email id",
          duration: 2,
        });
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Invalid email address.",
        }));
      }
      if (oldusersemail.includes(user.email)) {
        notification.error({
          message: "You are already registered",
          description: "Email already exist",
        });
      } else if (oldusersmobile.includes(user.mobile_number)) {
        notification.error({
          message: "You are already registered",
          description: "Mobile number already exist",
        });
      } else {
        if (user.email && emailPattern.test(user.email) && user.mobile_number) {
          setA(true);
          setC(false);
          setM(false);

          const randomTwoDigitNumber = Math.floor(Math.random() * 9000) + 1000; // Generate a random 2-digit number
          let genearatedUsername = user.email + randomTwoDigitNumber; // Concatenate it with the email

          let payloadob = {
            email: user.email,
            username: genearatedUsername,
            password: genearatedUsername,
            mobile_number: user.mobile_number,
          };
          setUser(payloadob);

          setShowOTPDialog(true);
          let newOtp = generateOTP();
          setGeneratedOTP(newOtp);

          const SMSPayload = {
            otp: newOtp,
            numbers: user.mobile_number,
          };
          let sendingSMS = await axios.post(
            "https://aventuras.co.in/api/v1/users/sendSMSOTP",
            SMSPayload
          );
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error.message;
        const validationErrors = error.response.data.error.details.errors;

        // Handle case where email or username is already taken
        if (errorMessage === "Email or Username are already taken") {
          handleRegistrationError("Email or Username are already taken");
          return;
        }

        // Handle other validation errors
        const newErrors = constructNewErrors(validationErrors);
        setErrors(newErrors);

        // Handle specific error conditions
        const usernameError = validationErrors.find(
          (errorItem) => errorItem.path[0] === "username"
        );
        const passwordError = validationErrors.find(
          (errorItem) => errorItem.path[0] === "password"
        );

        if (
          usernameError &&
          usernameError.message.includes("at least 3 characters")
        ) {
          // Handle username too short error
          handleUsernameTooShortError(usernameError.message);
        }

        if (
          passwordError &&
          passwordError.message.includes("at least 6 characters")
        ) {
          // Handle password too short error
          handlePasswordTooShortError(passwordError.message);
        }

        handleRegistrationError(errorMessage);
      }
    }

    // Function to handle username too short error
    function handleUsernameTooShortError(errorMessage) {
      // Update your state or perform other actions to handle this error
    }

    // Function to handle password too short error
    function handlePasswordTooShortError(errorMessage) {
      // Update your state or perform other actions to handle this error
    }

    // Function to display error notification
    function handleRegistrationError(errorMessage) {
      notification.error({
        message: "User Registration Failed!",
        description: errorMessage,
        duration: 2,
      });
    }

    // Function to construct error object for input fields
    function constructNewErrors(validationErrors) {
      const newErrors = {};

      validationErrors.forEach((errorItem) => {
        const field = errorItem.path[0];
        newErrors[field] = errorItem.message;
      });

      return newErrors;
    }
  };

  const toggleFunction = () => {
    setC(true);
    alert("alerted");
  };

  return (
    <Grid
      container
      sx={{
        margin: "0 auto",
        height: "100%",
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        maxWidth: "1180px",
      }}
      className="myloginbox"
    >
      <CssBaseline />

      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://img.freepik.com/premium-photo/hot-air-balloons-up-blue-sky-style-romantic-atmosphere-matte-photo-colorful-moebius_334364-5646.jpg)",
          backgroundRepeat: "no-repeat",

          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        classname="myregister_image"
        style={{ minHeight: "630px", height: "100%", maxWidth: "50%" }}
      />

      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        style={{ borderRadius: "20px !important", minHeight: "460px" }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box sx={{ mt: 1 }}>
            {/* <div style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"1rem",flexDirection:"column"}}> */}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <GoogleOAuthProvider clientId="624663049773-4vqihedsavoc9o8paj7p9h3e0el2p5o2.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={handleLoginSuccess}
                  onError={handleGoogleError}
                ></GoogleLogin>
              </GoogleOAuthProvider>
            </div>

            {showMobileNumberDialog ? (
              <>
                <br />
                <br />
                {/* <div className="authentication-form-container">
                  <div className="otp-container">
                    <div className="">Enter OTP sent on email:</div>
                    <MuiOtpInput
                      className="custom-otp-input"
                      length={6}
                      value={otp}
                      fullWidth
                      onChange={handleUserChanged}
                    />
                  </div>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 1, mb: 1 }}
                    onClick={verifyGoogleOTP}
                  >
                    Verify OTP google
                  </Button>
                </div> */}
              </>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <hr style={{ width: "100%" }} />
                  <span> &nbsp;&nbsp;&nbsp;or&nbsp;&nbsp;&nbsp;</span>
                  <hr style={{ width: "100%" }} />
                </div>
                <div
                  className="authentication-form-container"
                  component="form"
                  noValidate
                >
                  <TextField
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleUserChange}
                    margin="normal"
                    required
                    fullWidth
                    label="Enter Email Address"
                    error={!!errors.email}
                    helperText={errors.email}
                    autoComplete="off"
                  />

                  <TextField
                    autoComplete="off"
                    type="number"
                    name="mobile_number"
                    value={user.mobile_number}
                    onChange={handleUserChange}
                    margin="normal"
                    required
                    fullWidth
                    label="Enter Mobile Number"
                    error={!!errors.mobile_number}
                    helperText={errors.mobile_number}
                    autoComplete="off"
                  />
 <Button
                      className="button_register"
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 1, mb: 2 }}
                      onClick={(e) => {
                        signUpWithSMS();
                      }}
                      // disabled={loading}
                    >
                      Send SMS Otp
                    </Button>
                  {/* <div>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Send OTP on :
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="email"
                      name="radio-buttons-group"
                      row
                      onChange={handleA}
                    >
                      <FormControlLabel
                        value="email"
                        control={<Radio />}
                        label="Email"
                        disabled={c}
                      />
                      <FormControlLabel
                        value="mobile"
                        control={<Radio />}
                        label="Mobile number"
                        disabled={c}
                      />
                    </RadioGroup>
                  </div> */}

                  {/* {!c && b ? (
                    <Button
                      className="button_register"
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 1, mb: 2 }}
                      onClick={(e) => {
                        signUpWithEmail();
                      }}
                      // disabled={loading}
                    >
                      Send Email Otp
                    </Button>
                  ) : null} */}

                  {/* {!c && m ? (
                    <Button
                      className="button_register"
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 1, mb: 2 }}
                      onClick={(e) => {
                        signUpWithSMS();
                      }}
                      // disabled={loading}
                    >
                      Send SMS Otp
                    </Button>
                  ) : null} */}
                  {a ? (
                    <>
                      <div className="otp-container">
                        <div className="">Enter OTP:</div>
                        <MuiOtpInput
                          className="custom-otp-input"
                          length={6}
                          value={otp}
                          fullWidth
                          onChange={handleUserChanged}
                        />
                      </div>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 1, mb: 1 }}
                        onClick={verifyUserOTP}
                      >
                        Verify OTP
                      </Button>
                    </>
                  ) : (
                    ""
                  )}

                  {/* </>:
<>
<br />
<br />
<br />
<br />
</>
}
 */}
                </div>
              </>
            )}

            <Grid container>
              <Grid
                item
                style={{
                  display: "flex",
                  alignItems: "center",
  
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "10px",
                  marginTop: "10px",
                  fontSize: "18px",
                  fontWeight: "400",
                  marginBottom:"10px",
                  margin:"0 auto",
                  textAlign:"center"
                }}
              >
                <Link to="/login" variant="body2">
                  {"Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 1 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
