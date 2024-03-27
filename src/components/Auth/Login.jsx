import * as React from "react";
import { useState } from "react";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { googleLogout } from "@react-oauth/google";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import { message } from "antd";
import { notification,Space } from "antd";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Link, useNavigate } from "react-router-dom";
import { storeUser } from "./helper";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import { API, baseURL } from "../../api/apirequest";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import { useEffect } from "react";
import { set } from "date-fns";
import {  Modal } from 'antd';
import Register from "./Register";
// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" to="">
//         Aventuras
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }
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

export default function Login({toggle,setToggle,toggleRegister,settoggleRegister}) {
 console.log(toggle)
  const [showMobileNumberDialog, setShowMobileNumberDialog] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [titleHeading, setTitleHeading] = useState(false);

  const close = () => {
    console.log(
      'Notification was closed. Either the close button was clicked or duration time elapsed.',
    );
  };
 



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [b, setB] = useState(true);
  const [c, setC] = useState(true);
  const [m, setM] = useState(false);
  const [emailV, setEmailV] = useState(false);
  const [mobileV, setMobile] = useState(false);

  const handleA = (event) => {
    setEmailV(false);
    setMobile(false);
    if (event.target.value === "email") {
      setB(true);
      setM(false);
      // You can perform any other actions you need when 'Email' is selected
    }

    if (event.target.value === "mobile") {
      setM(true);
      setB(false);
    }

    // Add other conditions or actions based on selected value if needed
  };
  const initialUser = { password: "", identifier: "" };
  const [user, setUser] = useState(initialUser);
  const [gUser, setGuser] = useState();

  const path = localStorage.getItem("pathName");

  const handleGoogleLoginSuccess = async (response) => {

    const userObject = jwt_decode(response.credential);

    if (userObject !== null && oldusersemail.includes(userObject.email)) {
      try {
        setUser({ identifier: userObject.email });

        if (userObject.email) {
          const filteredData = oldusersemail.filter((item) => {
            return item == userObject.email;
          });

          let myfilteredData = userData.data.filter((item) => {
            return item.email == userObject.email;
          });
          let loginpayloadOb = {
            identifier: myfilteredData[0].email, // Accessing the email from the first (or only) element in the array
            password: myfilteredData[0].secretkey, // Accessing the password from the first (or only) element in the array
          };

          const { data } = await axios.post(
            "https://admin.aventuras.co.in/api/auth/local/",
            loginpayloadOb
          );


          if (data.jwt) {
            storeUser(data);

            if (path) {
              navigate(path);
            } else {
              navigate("/");
            }
            notification.success({
              message: "Login Successful",
              duration: 5,
            placement:"top",
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        }
            let newOtp = generateOTP();

            let mailData= {
              "name":userObject.email,
               "email": userObject.email,
               "subject":"OTP FOR LOGIN",
               "mode":"LOGIN",
               "otp":`${newOtp}`,
         }

            setGeneratedOTP(newOtp);
            let sendingMail = await axios.post(
              "https://aventuras.co.in/api/v1/users/sendOTPMail",
              mailData
            );
      } catch (error) {
        console.log(error);
      }
    } else {
      setTitleHeading(true)
      setShowGoogleOtp(true);
      setShowEmailDialog(true)
  
      setGuser((prev)=>({
        ...prev,"email":userObject.email
      }))
     
      // notification.error({
      //   message: "Account is not registered",
      //   description: "Register first to proceed",
      //   duration: 5,
      //       placement:"top",
      // });



    }
  };

  const handleGoogleError = (err) => {
    console.log("Login with Google failed");
  };

  const handleLogout = () => {
    googleLogout();
  };

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const [errors, setErrors] = useState({
    identifier: "", // Error message for email field
    password: "", // Error message for password field
  });
  const [loginInputError, setLoginInputError] = useState({
    userEmail: "",
    password: "",
    mobile:""
  });
  //   const emailPattern = ;
  //  const mobilePattern = /;
  let errorLogin = {};
  const [validate, setValiDate] = useState({
    isEmailValid: false,
    isMobileValid: false,
  });
  const handleUserChange = ({ target }) => {
    // setShowEmailDialog(false);

    const { name, value } = target;

    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    if(name === "mobile_number"){
      setGuser((prev)=>({
        ...prev,'mobileGuser':value
      }))
    }
    // Assuming validate is a state variable initialized with isEmailValid and isMobileValid
    // You should initialize it like this: const [validate, setValiDate] = useState({ isEmailValid: true, isMobileValid: true });
if(name === "mobile_number"){

  if(value.length === 10){
    errorLogin.mobile = "";
  }
  else{
    errorLogin.mobile = "Enter a valid email address.";
  }
}
    if (name === "identifier") {
      if (!/^\S+@\S+\.\S+$/.test(value)) {
        setValiDate((prevValidate) => ({
          ...prevValidate,
          isEmailValid: false,
        }));
        errorLogin.userEmail = "Enter a valid email address.";
      } else {
        errorLogin.userEmail = "";
        // Set isEmailValid to true initially
        setValiDate((prevValidate) => ({
          ...prevValidate,
          isEmailValid: true,
        }));
      }
    } else if (name === "password") {
   errorLogin.password = ""
    
    }


    setLoginInputError(errorLogin);
  };

  useEffect(() => {
    if (validate.isEmailValid) {
      setC(false);
    } else {
      setC(true);
    }
  }, [handleUserChange]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [generatedOTP, setGeneratedOTP] = useState("");

  const generateOTP = () => {
    const min = 100000; // Minimum 6-digit OTP
    const max = 999999; // Maximum 6-digit OTP
    const generated = Math.floor(Math.random() * (max - min + 1)) + min;
    return generated.toString();
  };

  const [otp, setotp] = useState();
  const handleUserChanged = (event) => {
    setotp(event);
    setUser((currentUser) => ({
      ...currentUser,
      otp: event,
    }));
  };
  const [oldusersemail, setOldusersemail] = useState([]);
  const [olduserssecret, setOlduserssecret] = useState([]);
  const [oldusersmobile, setOldusersmobile] = useState({});
  const [userData, setuserData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const AllEmaildata = await axios.get(
        "https://admin.aventuras.co.in/api/users?fields=email"
      );
      const AllSecretdata = await axios.get(
        "https://admin.aventuras.co.in/api/users?fields=secretkey"
      );
      const Alldata = await axios.get(
        `https://admin.aventuras.co.in/api/users`
      );
      console.log(Alldata)
      setuserData(Alldata);


      const myusersemail123 = AllEmaildata.data.map((user) => user.email);
      const myusersemail1234 = AllSecretdata.data.map((user) => user.secretkey);

      const myusersmobile123 = Alldata.data.map((user) => user.mobile_number);
      setOldusersmobile(myusersmobile123)
      setOldusersemail(myusersemail123);
      setOlduserssecret(myusersemail1234);
    };
    fetchUsers();
  }, []);

  const handleLogin = async () => {
    const validateEmailAndMobile = () => {
      let emailValid = false;
      let mobileValid = false;

      if (user.identifier) {
        if (!/^\S+@\S+\.\S+$/.test(user.identifier)) {
          errorLogin.userEmail = "Enter a valid email address.";
          emailValid = false;
        } else {
          errorLogin.userEmail = "";
          emailValid = true;
        }
      }

      if (user.mobile_number) {
        if (!/^\d{10}$/.test(user.mobile_number)) {
          errorLogin.MobileNumber = "Enter 10-digit mobile number.";
          mobileValid = false;
        } else {
          errorLogin.MobileNumber = "";
          mobileValid = true;
        }
      }
      // if (user.password) {
      //   if (!/^\d{10}$/.test(user.mobile_number)) {
      //     errorLogin.MobileNumber = "Enter 10-digit mobile number.";
      //     mobileValid = false;
      //   } else {
      //     errorLogin.MobileNumber = "";
      //     mobileValid = true;
      //   }
      // }

      // return emailValid && mobileValid;
      return emailValid;
    };

    if (!user.identifier) {
      errorLogin.userEmail = "Enter Email Address";
    }
    // if (!user.mobile_number) {
    //   errorLogin.MobileNumber = "Enter Mobile Number";
    // }
    if (!user.password) {
      errorLogin.password = "Enter Password";
    }
    setLoginInputError(errorLogin);

    try {
      if ("") {
        let payloadOb = {
          identifier: user.identifier,
          password: user.password,
          // mobile_number: user.mobile_number,
          // otp: user.otp,
        };
        const { data } = await axios.post(
          "https://admin.aventuras.co.in/api/auth/local/",
          payloadOb
        );
        if (data.jwt) {
          try {
            // setShowMobileNumberDialog(true);
            // let newOtp = generateOTP();
            // setGeneratedOTP(newOtp);
            // let mailData = {
            //   email: user.identifier,
            //   name: user.identifier,
            //   subject: "OTP FOR LOGIN",
            //   otp: `OTP FOR Login IS ${newOtp}`,
            //   mode: "LOGIN",
            // };
            // let sendingMail = await axios.post(
            //   "https://aventuras.co.in/api/v1/users/sendOTPMail",
            //   mailData
            // );
          } catch (err) {
            console.log(err);
          }
        } else {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }
    } catch (error) {
      console.log(error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message[0].messages[0].message;
      } else if (
        error.response.data.error.message === "Invalid identifier or password"
      ) {
        // console.log("Invalid identifier or password")
        notification.error({
          message: "Login Failed",
          description: "Invalid credentials / user not exists",
          duration: 5,
            placement:"top",
        });
      } else {
        notification.error({
          message: "Login Failed",
          description: "Invalid credentials. Please try again !",
          duration: 5,
            placement:"top",
        });
      }
    }
  };

  const VerifyEmailUser = async (e) => {
  
    if (!user.identifier) {
      errorLogin.userEmail = "Enter Email Address";
    }

    if (!user.password) {
      errorLogin.password = "Enter Password";
    }

 setLoginInputError(errorLogin);


    
      
      try {
        if (user.identifier) {
          let payloadOb = {
            identifier: user.identifier,
            password: user.password,
          };
          console.log(user.identifier);
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
              message: "Login Successful",
              duration: 5,
              placement:"top",
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        } else {
      
          // setTimeout(() => {
          //   window.location.reload();
          // }, 1000);
        }
      } 
      catch (error) {
      console.log(error)
        if (
          error.response.data.error.message === "Invalid identifier or password"
        ) {

          
          // notification.info({
          //   message: "User not registered",
          //   description:'Please Register to Proceed',
          //   placement:'top'

          // });
          
          if(oldusersemail.includes(user.identifier)){
            notification.error({
              message: "Incorrect Password",
              description:'Email is Registered',
              placement:'top'
  
            });
          }
          else{
            setToggle(false)
          }
      
        } else if (
          error.data.message === "Too many requests, please try again later."
        ) {
          notification.error({
            message: "Too many requests, please try again later.",
            placement:'top'

          });
        } else {
          notification.error({
            message: "User not registered",
            description:'Please Check Your Credentials',
            placement:'top'


          });
        }
      }
    
 
  };
  const VerifyMobileuser = async (e) => {
    try {
      if (user.identifier) {
        let payloadOb = {
          identifier: user.identifier,
          password: user.password,
          otp: user.otp,
        };
        const { data } = await axios.post(
          "https://admin.aventuras.co.in/api/auth/local/",
          payloadOb
        );
        if (data.jwt) {
          storeUser(data);
          navigate("/");
          notification.success({
            message: "Login Successful",
            duration: 5,
            placement:"top",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } else {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      if (error.data.message === "Invalid identifier or password") {
        notification.error({
          message: "User not registered",
          placement:'top'
        });
      } else if (
        error.data.message === "Too many requests, please try again later."
      ) {
        notification.error({
          message: "Too many requests, please try again later.",
          placement:'top'

        });
      } else {
        notification.error({
          message: "User not registered",
          placement:'top'

        });
      }
    }
  };
  // Function to handle login success
  function handleLoginSuccess(message) {
 
    setShowEmailDialog(true);
    setShowMobileNumberDialog(false);
  }

  // Function to handle login error
  function handleLoginError(error) {
    if (error.response && error.response.data && error.response.data.message) {
      const errorMessage = error.response.data.message[0].messages[0].message;
      setErrors((prevErrors) => ({
        ...prevErrors,
        identifier: errorMessage, // Display error message for the identifier field
      }));
    } else {
      notification.error({
        message: "Login Failed",
        description: "Invalid credentials. Please try again !",
        duration: 5,
            placement:"top",
      });
    }
  }
  const LoginWithEmail = async () => {
    try {
      if (oldusersemail.includes(user.identifier)) {
        setB(false);
        setEmailV(true);
        let newOtp = generateOTP();
        setGeneratedOTP(newOtp);
        let mailData = {
          name: user.identifier,
          email: user.identifier,
          subject: "OTP FOR LOGIN",
          mode: "LOGIN",
          otp: `${newOtp}`,
        };
        // let sendingMail = await axios.post(
        //   "https://aventuras.co.in/api/v1/users/sendOTPMail",
        //   mailData
        // );
      } else {
        notification.error({
          message: "User Not Registered",
          description: "Register to proceed",
          placement:'top'

        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyMobilePresent = async () => {
    try {
      const filteredData = userData.data.filter((item) =>
        item.email.includes(user.identifier)
      );
      const presentmobile = filteredData.map(
        (element) => element.mobile_number
      );
      return presentmobile;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const LoginWithSMS = async () => {
    try {
      const mobileNumberuser = await verifyMobilePresent();

      if (
        mobileNumberuser[0] !== null &&
        oldusersemail.includes(user.identifier)
      ) {
        setMobile(true);
        setM(false);
        let newOtp = generateOTP();
        setGeneratedOTP(newOtp);

        const SMSPayload = {
          otp: newOtp,
          numbers: mobileNumberuser[0],
        };
        let sendingSMS = await axios.post(
          "https://aventuras.co.in/api/v1/users/sendSMSOTP",
          SMSPayload
        )
      } else {
        notification.error({
          message: "Mobile Number not registered",
          description: "Please try with email instead",
          placement:'top'

        });
      }

      // setShowOTPDialog(true);
    } catch (error) {
      console.log(error);
    }
  };
console.log(loginInputError)
const [a,setA] =useState();
const [showGoogleOtp,setShowGoogleOtp] =useState();

// SMS OTP

const signUpWithSMS = async () => {
  try {
    if (!gUser.email) {      // Check if the field being changed is the email field
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required.",
      }));
      return null;
    }
    if (!gUser.mobileGuser) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        mobile_number: "Mobile Number is required.",
      }));
      return null;
    }
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  
    // Check if the email field is not in the correct format
    if (gUser.mobileGuser && !emailPattern.test(gUser.email)) {
      notification.error({
        message: "Invalid Email id",
        duration: 2,
        placement: "top",
      });
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address.",
      }));
    }

    console.log(oldusersmobile)

    
    if (oldusersemail.includes(gUser.email)) {
      return (
        notification.error({
          message: "You are already registered",
          description: "Email already exist",
          placement:'top'

        })
      )
  
    } 

   else if (oldusersmobile.includes(gUser.mobileGuser)) {
      return (
        notification.error({
          message: "You are already registered",
          description: "Mobile Number already exist",
          placement:'top'
        })
      )
    } 
    
     else {
      if (gUser.email && emailPattern.test(gUser.email) && gUser.mobileGuser) {
        setA(true);
        setC(false);
        setM(false);

        const randomTwoDigitNumber = Math.floor(Math.random() * 9000) + 1000; // Generate a random 2-digit number
        let genearatedUsername = gUser.email + randomTwoDigitNumber; // Concatenate it with the email

        let payloadob = {
          email: gUser.email,
          username: genearatedUsername,
          password: genearatedUsername,
          mobile_number: gUser.mobileGuser,
        };
        setUser(payloadob);

        let newOtp = generateOTP();
        setGeneratedOTP(newOtp);
console.log(newOtp)
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
      placement: "top",
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
const verifyUserGoogleSMSOTP = async (e) => {
  e.preventDefault();

  // Check if the entered OTP is not equal to the generated OTP
  if (user.otp !== generatedOTP) {
    // alert("Invalid OTP");
    notification.error({
      message: "Invalid OTP",
      placement: "top",
    });
  } else {
    try {
      const randomTwoDigitNumber = Math.floor(Math.random() * 9000) + 1000; // Generate a random 2-digit number
      let genearatedNewUsername =
        user.username.replace(/\s/g, "") + randomTwoDigitNumber;

      let payloadob = {
        email: gUser.email,
        password: user.password,
        secretkey: user.password,
        username: genearatedNewUsername,
        mobile_number: gUser.mobileGuser,
      };
      const res = await axios.post(
        "https://admin.aventuras.co.in/api/auth/local/register",
        payloadob
      );



      const getCoupons = async () => {
        try {
          const couponsResponse = await axios.get(
            "https://admin.aventuras.co.in/api/general-coupon-codes?populate=*"
          );

          // Assuming the coupons are available in couponsResponse.data.data
          const coupons = couponsResponse.data.data;

          // Now you can work with the coupons data
          console.log("Available coupons:", coupons);

          // Example: Extracting coupon IDs
          const couponIds = coupons.map((coupon) => coupon.id);
          console.log("Coupon IDs:", couponIds);

          // Perform any further actions needed with the coupons
          // ...
        } catch (error) {
          console.error("Error fetching coupons:", error);
        }
      };

      // Call the function to retrieve coupons
      // getCoupons();

      setShowMobileNumberDialog(false);

      if (res.status === 200) {
        try {
          const updateUserInCoupon = async (couponId, userData) => {
            try {
              const couponUrl = `https://admin.aventuras.co.in/api/general-coupon-codes/${couponId}`;

              console.log(couponUrl);

              const couponResponse = await axios.get(
                `${couponUrl}?populate=*`
              );

              const couponData = couponResponse.data;
              console.log(couponData);

              if (!couponData || !couponData.attributes) {
                console.error("Coupon not found or has an invalid structure");
              }

              // Retrieve existing users from coupon data
              const existingUsers = couponData.attributes.users.data || [];
              console.log(existingUsers);

              // Add the user data to the existing users array
              existingUsers.push({
                id: userData.id,
                attributes: {
                  username: userData.username,
                  email: userData.email,
                  provider: userData.provider,
                  confirmed: userData.confirmed,
                  blocked: userData.blocked,
                  createdAt: userData.createdAt,
                  updatedAt: userData.updatedAt,
                  mobile_number: userData.mobile_number,
                  active: userData.active,
                  secretkey: userData.secretkey,
                },
              });

              console.log("before", couponData.attributes.users.data);

              // Update the coupon data with the new users array
              couponData.attributes.users.data = existingUsers;

              console.log("after", couponData.attributes.users.data);

              // Perform a PUT or PATCH request to update the coupon data
              const updatedCouponResponse = await axios.post(
                couponUrl,
                couponData
              );

              console.log(
                "Coupon updated with user data:",
                updatedCouponResponse
              );
            } catch (error) {
              console.error("Error updating coupon with user data:", error);
            }
          };

          // Usage example:

          // const userData = {
          //   id: 223,
          //   username: "ashik6962@gmail.com",
          //   email: "ashik6962@gmail.com",
          //   provider: "local",
          //   confirmed: true,
          //   blocked: false,
          //   createdAt: "2023-12-15T02:41:04.390Z",
          //   updatedAt: "2024-01-03T04:08:53.884Z",
          //   mobile_number: "8550895489",
          //   active: null,
          //   secretkey: "ashik6962@gmail.com",
          // };

          // // Specify the coupon ID to update and the user data
          // updateUserInCoupon(1, userData); // Replace 1 with the actual coupon ID

          if (user.email) {
            let payloadOb = {
              identifier: gUser.email,
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
                duration: 5,
                placement: "top",
              });

              setTimeout(() => {
                window.location.reload();
              }, 2000);

              let mailData = {
                name: user.email,
                email: gUser.email,
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
          placement: "top",
        });
      } else if (errorMessage === "mobile_number must be defined.") {
        notification.error({
          message: "Mobile Number is required",
          duration: 3, // Duration in seconds (adjust as needed)
          placement: "top",
        });
      } else {
        notification.error({
          description: "Signup failed",
          duration: 3,
          placement: "top",
        });
      }
      // setTimeout(()=>{
      //   window.location.reload()
      // },3000)
    }
  }
};
const [modalOpen, setModalOpen] = useState(false)


  return (

  
  <ThemeProvider theme={theme}>
      {contextHolder}
      <Box
        style={{
          width: "100%",
        //   padding: "20px",
          display: "flex",
          justifyContent: "center",
        }}
        className="myloginbox"
      >
        
        <Box
          className="Box_container mylogincontainer"
          style={{
            width: "100%",
            display: "flex",
            justifyContent:'center'
            // boxShadow:
            //   "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          {/* <Box className="login_image"></Box> */}
          <Box
            maxWidth="sm"
            style={{
              width: "100%",
              background: "#ffffffe3",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            //   padding: "20px",
            }}
          >


            {/* <div className="">
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <PersonIcon />
              </Avatar>
            </div> */}
            {/* <Typography component="h1" variant="h5">
              Welcome Back User
            </Typography> */}
                
 
      <div className="toggleName" style={{textAlign:'center',color:'#292929',fontWeight:'600',marginTop:'1rem',fontSize:'1.5rem',borderBottom:'2px solid ',width:'99%'}}>{  toggle ? <>{!titleHeading ? 'Login with Aventuras' : 'Register With Aventuras' }  </>  : toggleRegister  ?"Register with Aventuras" : 'Welcome to Aventuras'}</div>

            {/* {
              tooggle ? <div className="heading_auth"> <span style={{backgroundColor:'',padding:'0.3rem',borderRadius:'5px'}}>UserLogin</span></div> : <div className="heading_auth"><span className="">UserRegister</span></div>
            } */}
          
              <div className="login_main_section_wrapper" style={!showEmailDialog ? {width:'100%'}:{width:"50%"}}  >
 
           
           
        {  showEmailDialog ?       <>
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
                                error={loginInputError.mobile}
                                helperText={loginInputError.mobile}
                              />
              
                              {!a ? (
                                <Button
                                  className="button_register"
                                  type="submit"
                                  fullWidth
                                  variant="contained"
                                  sx={{ mt: 1, mb: 2 }}
                                  onClick={(e) => {
                                    signUpWithSMS();
                                  }}
                                  disabled={loginInputError.mobile}
                                >
                                  Send SMS Otp
                                </Button>
                              ) : (
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
                                    onClick={verifyUserGoogleSMSOTP}
                                  >
                                    Verify SMS Otp
                                  </Button>
                                </>
                              )}
                            </>  : null }
           
             

  
  
  
           <div className="input_container_login" style={!showEmailDialog ? {width:'98%',height:'260px'}:{display:'none',}}>
           {!showEmailDialog ? (
                <>
                
                  {/* <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "60%",
                    }}
                  >
                    <hr style={{ width: "100%" }} />
                    <span>&nbsp;&nbsp;&nbsp; &nbsp; or &nbsp;&nbsp;</span>
                    <hr style={{ width: "100%" }} />
                  </div> */}
  {
    toggle  && !toggleRegister ? 
    <> 
      

    <div className="google_container" style={!showEmailDialog ? null:{width:"100%",flexDirection:'column'}}>
              
              <GoogleOAuthProvider clientId="624663049773-4vqihedsavoc9o8paj7p9h3e0el2p5o2.apps.googleusercontent.com">
                            <GoogleLogin
                              onSuccess={handleGoogleLoginSuccess}
                              onError={handleGoogleError}
                            ></GoogleLogin>
                          </GoogleOAuthProvider>
                          {showGoogleOtp ? 
                           <>
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
                                error={loginInputError.mobile}
                                helperText={loginInputError.mobile}
                              />
              
                              {!a ? (
                                <Button
                                  className="button_register"
                                  type="submit"
                                  fullWidth
                                  variant="contained"
                                  sx={{ mt: 1, mb: 2 }}
                                  onClick={(e) => {
                                    signUpWithSMS();
                                  }}
                                  disabled={loginInputError.mobile}
                                >
                                  Send SMS Otp
                                </Button>
                              ) : (
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
                                    onClick={verifyUserGoogleSMSOTP}
                                  >
                                    Verify OTP from google
                                  </Button>
                                </>
                              )}
                            </>
                          
                          : null}
                     
              </div>
                <div className="orContainer" style={!showEmailDialog ? {display:"flex"}:{display:"none"}}>
                <hr className="underLine" style={{ height: "100%", margin: "0 10px", border: "", backgroundColor: "#00000033" }} />
                <span className="ortag" style={{fontWeight:'bold',height:'30px',width:'30px',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'50%',border:'0.05px solid #00000033  '}}> or</span>
                <hr className="underLine" style={{ height: "100%", margin: "0 10px", border: "", backgroundColor: "#00000033" }} />
                </div>
     <div className="text-container  mylogin-textcontainer">
    
      
     
    <TextField
      type="email"
      name="identifier"
      value={user.identifier ? user.identifier : ""}
      onChange={handleUserChange}
      margin="normal"
      required
      fullWidth
      label="Email Address"
      error={loginInputError.userEmail} 
      helperText={
        loginInputError.userEmail ? (
          <p
            style={{
              fontSize: "10px",
              color: "red",
              height: "10px",
              paddingRight: "2px",
            }}
          >
            *{loginInputError.userEmail}
          </p>
        ) : (
          ""
        )
      }
    />
  
    <TextField
      type={showPassword ? "text" : "password"}
      name="password"
      value={user.password}
      onChange={handleUserChange}
      label="Enter Password"
      margin="normal"
      required
      error={loginInputError.password}
      helperText={
        loginInputError.password ? (
          <p
            style={{
              fontSize: "10px",
              color: "red",
              height: "10px",
              paddingRight: "2px",
            }}
          >
            *{loginInputError.password}
          </p>
        ) : (
          ""
        )
      }
      fullWidth
      // autoFocus
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
    <Button
      className="button_register"
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      sx={{ mt: 1, mb: 1 }}
      onClick={() => {
        VerifyEmailUser();
      }}
    >
      Verify and Login
    </Button>
    <div className="sigupButton_mobile">Don't have an account? <span className="signup_button" onClick={()=>{setToggle(false);settoggleRegister(true)}}>Register</span> </div>
  </div> 

  </>
   : 
  toggleRegister ?
  <> 
    
    <div className="google_container" style={!showEmailDialog ? null:{width:"100%",flexDirection:'column'}}>
              
              <GoogleOAuthProvider clientId="624663049773-4vqihedsavoc9o8paj7p9h3e0el2p5o2.apps.googleusercontent.com">
                            <GoogleLogin
                              onSuccess={handleGoogleLoginSuccess}
                              onError={handleGoogleError}
                            ></GoogleLogin>
                          </GoogleOAuthProvider>
                        
                          {showGoogleOtp ? 
                           <>
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
                                error={loginInputError.mobile}
                                helperText={loginInputError.mobile}
                              />
              
                              {!a ? (
                                <Button
                                  className="button_register"
                                  type="submit"
                                  fullWidth
                                  variant="contained"
                                  sx={{ mt: 1, mb: 2 }}
                                  onClick={(e) => {
                                    signUpWithSMS();
                                  }}
                                  disabled={loginInputError.mobile}
                                >
                                  Send SMS Otp
                                </Button>
                              ) : (
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
                                    onClick={verifyUserGoogleSMSOTP}
                                  >
                                    Verify OTP from google
                                  </Button>
                                </>
                              )}
                            </>
                          
                          : 
                       null
                          }
              </div>
                <div className="orContainer" style={!showEmailDialog ? {display:"flex"}:{display:"none"}}>
                <hr className="underLine" style={{ height: "100%", margin: "0 10px", border: "", backgroundColor: "#00000033" }} />
                <span className="ortag" style={{fontWeight:'bold',height:'30px',width:'30px',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'50%',border:'0.05px solid #00000033  '}}> or</span>
                <hr className="underLine" style={{ height: "100%", margin: "0 10px", border: "", backgroundColor: "#00000033" }} />
                </div>
  
  <Register LoginEmail={user.identifier}/> 
  </>
  
  : 
  <div className="" style={{textAlign:'center'}}>
<h2>User Not Registered</h2>
<h3>Register as new user</h3>
<div className="tooltip_button" onClick={()=>{ setToggle(false);settoggleRegister(true)}}> Register Now</div>
  </div>
  
  
  }
                 
  
                  {/* <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="email"
                name="radio-buttons-group"
                row
                onChange={handleA}
              >
                <FormControlLabel
                  value="email"
                  control={<Radio />}
                  disabled={c}
                  label="Email"
                />
                <FormControlLabel
                  value="mobile"
                  control={<Radio />}
                  disabled={c}
                  label="Mobile number"
                />
              </RadioGroup>
         
              <div className="text-container mylogin-textcontainer">
                {!c && b ? (
                  <>
                    <Button
                      className="button_register"
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 1, mb: 2 }}
                      onClick={(e) => {
                        LoginWithEmail();
                        setC(true);
                      }}
                      disabled={loading}
                    >
                      Send Email Otp
                    </Button>
                  </>
                ) : null}
  
                {!c && m ? (
                  <>
                    <Button
                      className="button_register"
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 1, mb: 2 }}
                      onClick={(e) => {
                        LoginWithSMS();
                      }}
                      disabled={loading}
                    >
                      Send SMS OTP
                    </Button>
                  </>
                ) : null}
              </div> */}
  
                  {/* {emailV ? (
                <>
                  <div className="text-container mylogin-textcontainer" >
                    <div className="otp-containers">
                      <div className="">Enter Email OTP:</div>
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
                      onClick={VerifyEmailUser}
                    >
                      Verify Email OTP
                    </Button>
                  </div>
                </>
              ) : (
                ""
              )}
              {mobileV ? (
                <>
                  <div className="text-container mylogin-textcontainer">
                    <div className="otp-containers">
                      <div
                        className=""
                        style={{
                          fontSize: "0.65rem",
                          color: "red",
                          margin: "5px 0px",
                        }}
                      >
                        *Otp has been sent to Registered Mobile Number
                      </div>
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
                      onClick={VerifyMobileuser}
                    >
                      Verify SMS OTP
                    </Button>
                  </div>
                </>
              ) : null} */}
                </>
              ) : null}
           </div>
              </div>
              
           
            
         

         
    

        
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
 
   
  );
}
