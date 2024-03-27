import * as React from 'react';
import { useState,useEffect } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { googleLogout } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { MuiOtpInput } from 'mui-one-time-password-input'
import 'animate.css';
import { message, Modal} from 'antd';
import { notification } from 'antd';
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { storeUser } from "./helper";
import { Container } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {API} from '../../api/apirequest';

import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { SignalCellularNull } from '@mui/icons-material';

function Copyright(props) {
    return (
        <Typography variant="body2"
            color="text.secondary"
            align="center" {...props}>

            {'Copyright © '}
            <Link color="inherit" to="">
                Aventuras
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const theme = createTheme();

export default function Register2() {

 const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
 const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
    const handleGoogleError = (err) => {
      console.log(err);
      console.log('Login with Google failed');
    };

    const handleLogout = () => {
      googleLogout();
    };

    const initialUser = { email: "",mobile_number:"",otp:""};
    const [user, setUser] = useState(initialUser);
   const [showOTPDialog, setShowOTPDialog] = useState(false);
    
    const [showMobileNumberDialog, setShowMobileNumberDialog] = useState(false);
    const [toggleSignUp,setTogglesignup]= useState(false)

    const [generatedOTP, setGeneratedOTP] = useState("");

    const generateOTP = () => {
      const min = 100000; // Minimum 6-digit OTP
      const max = 999999; // Maximum 6-digit OTP
      const generated = Math.floor(Math.random() * (max - min + 1)) + min;
     return generated.toString();
    };

    // Define a regular expression pattern for validating email addresses
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const [otp,setotp]= useState()
const handleUserChanged =(event)=>{
setotp(event)
console.log(event)
  setUser((currentUser) => ({
    ...currentUser,
    'otp': event
}));

}

  const handleUserChange = ({ target }) => {
  const { name, value } = target;
  setTogglesignup(false)
  setShowMobileNumberDialog(false)
  setShowOTPDialog(false)
  // Check if the field being changed is the email field
  if (name === "email") {
    // Use the regular expression to validate the email format
    if (!emailPattern.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Invalid email address",
      }));
    }
  }

        setUser((currentUser) => ({
            ...currentUser,
            [name]: value
        }));
    
    
      
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const handleLoginSuccess = async (response) => {
      const userObject = jwt_decode(response.credential);
   console.log(userObject)
  
   if(userObject !== null){
    try {

            let randomTwoDigitNumber = Math.floor(Math.random() * 100); // Generate a rndoam 2-digit number
    let genearatedUsername = userObject.name + randomTwoDigitNumber; // Concatenate it with the email

          let payloadob= { email: userObject.email,username: genearatedUsername,password:userObject.email};
      console.log(payloadob)
        setUser(payloadob)

       let newOtp=generateOTP();
       console.log("newOTP=>",newOtp)
       setGeneratedOTP(newOtp)
      let mailData= {
        "name": userObject.email,
        "email": userObject.email,
        "subject":"OTP FOR SIGNUP",
        "message":`OTP FOR REGISTER IS ${newOtp}`,
        "otp":`OTP FOR REGISTER IS ${newOtp}`
  }
  setShowMobileNumberDialog(true);
  setTogglesignup(true)

       let sendingMail=await axios.post("https://aventuras.co.in/api/v1/users/sendOTPMail",mailData)
       console.log(sendingMail)
  } 
  catch (error) {
     console.log(error)
}
   }
    };
  
  
    // const VerifyEmail = async(e) => {
    //   // e.preventDefault();
    // console.log("generateOTP=>",generatedOTP)
    // console.log("entered otp=>",user.otp);
    
    // console.log(user);
    // if(generatedOTP === user.otp ){
    //   alert('Otp Matched')
    // }
    // else{
    //   alert('Wrong Otp Entered');
    
    // }
      
    // };
    const VerifyEmail = async(e) => {
        // e.preventDefault();
      console.log("generateOTP=>",generatedOTP)
      console.log("entered otp=>",user.otp);
      
      console.log(user);
        // Check if the entered OTP is not equal to the generated OTP
        if (user.otp !== generatedOTP) {
          alert("Invalid OTP");
        } else {
          try{
            const res = await axios.post('https://admin.aventuras.co.in/api/auth/local/register', user);
            console.log(res)
            notification.success({
              message: 'User Registered Successful',
              description: 'You have successfully Registered.',
              duration: 2, // Duration in seconds (adjust as needed)
            });
            setShowMobileNumberDialog(false)
       
           if(res.status===200){
            try {
              if (user.email) {
                let payloadOb={
                  identifier:user.email,
                  password:user.email
                }
                // const { data } = await API.post('/api/auth/local/', user);
                const { data } = await axios.post('https://admin.aventuras.co.in/api/auth/local/', payloadOb);
                if (data.jwt) {
                  console.log(data)
                  storeUser(data);
                
                    navigate('/');
                    setTimeout(()=>{
                    //   window.location.reload()
                    },1000)
            
          
                }
              } else {
                setTimeout(()=>{
                //   window.location.reload()
                },1000)
                
              }
            } catch (error) {
              console.log(error)
            } 
           }
          }
          catch(err){
            console.log(err)
            notification.error({
              message: err.data,
              description: 'You have failed to Registered.',
              duration: 2, // Duration in seconds (adjust as needed)
            });
            setTimeout(()=>{
            //   window.location.reload()
            },1000)
  
          }
        }
      };
    
    const VerifyMobile = async(e) => {
      e.preventDefault();
       console.log("user",user);
       if(user.email){

         let randomTwoDigitNumber = Math.floor(Math.random() * 100); // Generate a random 2-digit number
         let genearatedUsername = user.email + randomTwoDigitNumber; // Concatenate it with the email
         
         let payloadob= { email: user.email,username:genearatedUsername,password:user.email,mobile_number:user.mobile_number};
         console.log(payloadob)
         setUser(payloadob)
         // Check if the entered OTP is not equal to the generated OTP
         if (user.otp !== generatedOTP) {
           alert("Invalid OTP");
          } else {
            try{
              
              const res = await axios.post('https://admin.aventuras.co.in/api/auth/local/register', payloadob);
              console.log(res)
              notification.success({
                message: 'User Registered Successful',
                description: 'You have successfully Registered.',
                duration: 2, // Duration in seconds (adjust as needed)
          });
          setShowMobileNumberDialog(false)
          if(res.status===200){
            try {
              if (user.email) {
                let payloadOb={
                  identifier:user.email,
                  password:user.password
                }
                // const { data } = await API.post('/api/auth/local/', user);
                const { data } = await axios.post('https://admin.aventuras.co.in/api/auth/local/', payloadOb);
                if (data.jwt) {
                  console.log(data)
                  storeUser(data);
                  
                  navigate('/');
                  setTimeout(()=>{
                    window.location.reload()
                  },1000)
                  
                  
                }
              } else {
                setTimeout(()=>{
                  window.location.reload()
                },1000)
                
              }
          } catch (error) {
            console.log(error)
          } 
        }
      }
        catch(err){
          console.log(err)
          notification.error({
            message: err.data,
            description: 'You have failed to Registered.',
            duration: 2, // Duration in seconds (adjust as needed)
          });
          setTimeout(()=>{
            window.location.reload()
          },1000)
          
        }
      }
    };
  }
    const signUp = async () => {
        try {
          console.log(user)


            // if (!user.username) {
            //     setErrors((prevErrors) => ({
            //         ...prevErrors,
            //         username: "Username is required.",
            //     }));
            // }
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
    message:"Invalid Email id",
    duration:2
   })
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address.",
      }));
    }

          
            if (!user.mobile_number) {
              setErrors((prevErrors) => ({
                  ...prevErrors,
                  mobile_number: "Mobile Number is required.",
              }));
          }
            // if (!user.password) {
            //     setErrors((prevErrors) => ({
            //         ...prevErrors,
            //         password: "Password is required.",
            //     }));
            // }
    
            if (user.email  &&
              emailPattern.test(user.email) 
              && user.mobile_number)
              // && user.password

            // if (user.username && user.email  &&
            //   emailPattern.test(user.email) 
            //   && user.password && user.mobile_number)
              {
              
                // const res = await API.post('/api/auth/local/register', user);
             
  setShowOTPDialog(true);
  let newOtp=generateOTP();
  console.log("newOTP=>",newOtp)
  setGeneratedOTP(newOtp)
 let mailData= {
   "name": user.email,
   "email": user.email,
   "subject":"OTP FOR MOBILE SIGNUP",
   "otp":`OTP FOR MOBILE SIGNUP IS ${newOtp}`
}

  let sendingMail=await axios.post("https://aventuras.co.in/api/v1/users/sendOTPMail",mailData)
  
                const res = await axios.post('http:s://admin.aventuras.co.in/api/auth/local/register', user);
                console.log(res)
                if (!res) {

                    setUser(initialUser);
                    // navigate("/login");
                    notification.success({
                        message: 'User Registered Successful',
                        // description: 'You have successfully logged in.',
                        
                        duration: 5, // Duration in seconds (adjust as needed)
                      });
                }
            }
        } 
        catch (error) {
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
          
              if (usernameError && usernameError.message.includes("at least 3 characters")) {
                // Handle username too short error
                handleUsernameTooShortError(usernameError.message);
              }
          
              if (passwordError && passwordError.message.includes("at least 6 characters")) {
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
              message: 'User Registration Failed!',
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

 
  
 

    return (
        <ThemeProvider  theme={theme} >
      <Box style={{width:'100%' ,padding:'20px',display:'flex',justifyContent:'center',}}>
        <Box className='Box_container' style={{width:'65%', height:'550px',display:'flex',boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>

          <Box className='register_image' >
          </Box>
          <Box maxWidth="sm" style={{width:'100%',background:'white',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:'20px'}}>
            <div className="">
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <PersonAddIcon />
                        </Avatar>
            </div>
            <div className="text-container" style={{width:'60%'}}>
    
            <TextField
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleUserChange}
                                margin="normal"
                                required
                                fullWidth
                                label="Enter Email Address"
                        

                            error={submitted && !user.email}
                            helperText={submitted && !user.email ? errors.email : ""}
                            />
    <TextField
                                type="number"
                                name="mobile_number"
                                value={user.mobile_number}
                                onChange={handleUserChange}
                                margin="normal"
                                required
                                fullWidth
                                label="Enter Mobile Number"
                          

                            error={submitted && !user.mobile_number}
                            helperText={submitted && !user.mobile_number ? errors.mobile_number : ""}
                            />
      </div>
      {
        !toggleSignUp  ? (
            showOTPDialog ? 
<div className="otp-container" >
    <div className="">Enter Otp</div>
<MuiOtpInput  className="custom-otp-input"  length={6}  value={otp}        fullWidth onChange={handleUserChanged} />
</div>
            : null

        ):null

      }
         

                {
                    !toggleSignUp  ? (
                    
                            
                                showOTPDialog ?    <Button
                                     className='button_register'
                                     type="submit"
                                     fullWidth
                                     variant="contained"
                                     color="primary"
                                     sx={{ mt: 1, mb: 1 }}
                                     onClick={() => {
                                        VerifyEmail()
                                     }}
                                 >
   Register                                 
                                      
                                 </Button>:  
                                  <Button
                                   className='button_register'
                                   type="submit"
                                   fullWidth
                                   variant="contained"
                                   color="primary"
                                   sx={{ mt: 1, mb: 1 }}
                                   onClick={(e) => {
                                       // setSubmitted(true);
                                       signUp();
                                       setSubmitted(true);
                                   }}
                               
                               > Send Otp
                               </Button>
                                    
                        
                    ):null
                }
                
       

  

    <div className="" style={{display:'flex',alignItems:'center',flexDirection:'column',gap:'10px',marginTop:'10px'}}>

    <Link to="/login" variant="body2">
                                        {"Already have an account? Login"}
                                    </Link>

                                    <div className="">
                                        or
                                    </div>
    <GoogleOAuthProvider 
                clientId="624663049773-4vqihedsavoc9o8paj7p9h3e0el2p5o2.apps.googleusercontent.com" >
                <GoogleLogin 
                onSuccess={handleLoginSuccess} 
                onError={handleGoogleError} >
              </GoogleLogin>
                </GoogleOAuthProvider>
                
                {showMobileNumberDialog && (
                    <div className="">
          <div className="otp-container" >
                   <div className="">Enter Otp</div>
               <MuiOtpInput  className="custom-otp-input"  length={6}  value={otp}        fullWidth onChange={handleUserChanged} />  
               </div>
                 <Button
                                  className='button_register'
                                  type="submit"
                                  fullWidth
                                  variant="contained"
                                  color="primary"
                                  sx={{ mt: 1, mb: 1 }}
                                  onClick={() => {
                                    
                                      signUp();
                                      VerifyEmail()
                                  }}
                              >
Register                                 
                                   
                              </Button>
                    </div>
         
                )

                }
    </div>



          </Box>
        </Box>
   
      </Box>
  

         
        </ThemeProvider>




    );
}