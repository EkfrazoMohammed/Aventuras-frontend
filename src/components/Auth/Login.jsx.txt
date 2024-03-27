import * as React from 'react';
import { useState } from 'react';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { googleLogout } from '@react-oauth/google';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { message} from 'antd';
import { notification } from 'antd';

import { Link, useNavigate } from 'react-router-dom';
import { storeUser } from './helper';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import { API, baseURL } from '../../api/apirequest';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
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

export default function Login() {

  
  const [showMobileNumberDialog, setShowMobileNumberDialog] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const initialUser = { password: '', identifier: '',otp:'' };
  const [user, setUser] = useState(initialUser);

  const [gUser,setGuser]=useState(initialUser)
  const handleGoogleLoginSuccess = async (response) => {
    const userObject = jwt_decode(response.credential);
//  console.log(userObject)
 if(userObject !== null){
  try {
            setShowEmailDialog(true)
                //  console.log(userObject.email)
                 setUser({ identifier: userObject.email });
                //  console.log(user)
     let newOtp=generateOTP();
    //  console.log("newOTP=>",newOtp)
     let mailData= {
     "name":userObject.email,
      "email": userObject.email,
      "subject":"OTP FOR LOGIN",
      "mode":"LOGIN",
      "otp":`${newOtp}`,
}
     setGeneratedOTP(newOtp)
     let sendingMail=await axios.post("https://aventuras.co.in/api/v1/users/sendOTPMail",mailData)
    // let sendingMail=await axios.post("https://aventuras.co.in/api/v1/userssendOTPMail",mailData)
  //  console.log(sendingMail)
} catch(error){
  // console.log(error)

  }

}
//   try {
//     if (userObject.email) {
//       setLoading(true); // Start the loading state
//       // let payloadOb={
//       //   identifier:userObject.email,
//       //   password:userObject.email
//       // }
//       // const { data } = await API.post('/api/auth/local/', user);
//       const { data } = await axios.post('http://https://aventuras.co.in/api/v1/1337/api/auth/local/', payloadOb);
//       if (data.jwt) {
//         storeUser(data);
//         setUser(initialUser);
        
//         if(data.jwt){
//           navigate("/")
//         }
//         setTimeout(() => {
//           window.location.reload();
//         }, 1000);
//       }
//     } else {
//       // Set error messages for empty fields
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         identifier: user.identifier ? '' : 'Email is required.',
//         password: user.password ? '' : 'Password is required.',
//       }));
//     }
//   } catch (error) {
//     // Handle login error
//     handleLoginError(error);
//   } finally {
//     setLoading(false); // End the loading state
//   }
// }
  }

  const handleGoogleError = (err) => {
    // console.log(err);
    // console.log('Login with Google failed');
  };

  const handleLogout = () => {
    googleLogout();
  };



  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const [errors, setErrors] = useState({
    identifier: '', // Error message for email field
    password: '',   // Error message for password field
  });

  const handleUserChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));

    // Clear the error message for the field being changed
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

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
  const handleLogin = async () => {
    try {
      if (user.identifier && user.mobile_number) {
    
       let payloadOb={
                 identifier:user.identifier,
                 password:user.identifier,
                 mobile_number:user.mobile_number,
                 otp:user.otp
               }
               const { data } = await axios.post('https://admin.aventuras.co.in/api/auth/local/', payloadOb);
              //  console.log(data)
               if (data.jwt) {
                try{
              setShowMobileNumberDialog(true)
                   
       let newOtp=generateOTP();
      //  console.log("newOTP=>",newOtp)
      
      

     let mailData= {
     
       "name":user.identifier,
      "email": user.identifier,
      "subject":"OTP FOR LOGIN",
      "mode":"LOGIN",
      "otp":`${newOtp}`,
}
     setGeneratedOTP(newOtp)
     let sendingMail=await axios.post("https://aventuras.co.in/api/v1/users/sendOTPMail",mailData)
    // let sendingMail=await axios.post("https://aventuras.co.in/api/v1/userssendOTPMail",mailData)
  //  console.log(sendingMail)
}catch(err){
  // console.log(err)
}
  } else {
               setTimeout(()=>{
                 window.location.reload()
               },1000)
              }
            } 
      }
      catch(error){
        // console.log(error)

        if (error.response && error.response.data && error.response.data.message) {
          const errorMessage = error.response.data.message[0].messages[0].message;
          // console.log(errorMessage)
          // console.log(error.response.data && error.response.data.message)
        } else if(error.response.data.error.message==="Invalid identifier or password"){
// console.log("Invalid identifier or password")
notification.error({
  message: 'Login Failed',
  description: 'Invalid credentials / user not exists',
  duration: 4,
});
        }else {
          notification.error({
            message: 'Login Failed',
            description: 'Invalid credentials. Please try again !',
            duration: 2,
          });
        }
      }
  };
  const VerifyUser = async(e) => {
    e.preventDefault();
  
    // Check if the entered OTP is not equal to the generated OTP
    if (user.otp !== generatedOTP) {
      alert("Invalid OTP");
    } else {
      try{
       if (user.identifier) {
            let payloadOb={
              identifier:user.identifier,
              password:user.identifier,
              otp:user.otp
            }
            // const { data } = await API.post('/api/auth/local/', user);
            const { data } = await axios.post('https://admin.aventuras.co.in/api/auth/local/', payloadOb);
            if (data.jwt) {
              // console.log(data)
              storeUser(data);
            
                navigate('/');
                notification.success({
                  message:"Login Successful",
                  duration: 2,
                });
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
          // console.log(error)
          if(error.data.message==="Invalid identifier or password"){
            alert("User not registered");
          }else if(error.data.message==="Too many requests, please try again later."){
            alert("Too many requests, please try again later.");
          }else{
            alert("User not registered");

          }
        } 
      
    }
  };
  // Function to handle login success
  function handleLoginSuccess(message) {
    notification.success({
      message: message,
      duration: 2,
    });
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
        message: 'Login Failed',
        description: 'Invalid credentials. Please try again !',
        duration: 2,
      });
    }
  }

  return (
    <ThemeProvider theme={theme}>
        <Grid container 
                sx={{margin:"0 auto", height: '100%', padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center',width:"100%",maxWidth:"1180px" }}>
                <CssBaseline />
              
               <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://xtemko.stripocdn.email/content/guids/CABINET_011ac676721e1f583c3fb4b1d2cbfc3b0427b776fb72abc4cef912f54559fc93/images/hotairballonswithwelcomebackusertextinit.jpg)',
            backgroundRepeat: 'no-repeat',
          
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          style={{minHeight:"630px",height:"100%",maxWidth:"50%"}}
        /> 
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} style={{borderRadius:"20px !important"}}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <PersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>

            <div style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"0 1rem",flexDirection:"column"}}>
        
              <GoogleOAuthProvider 
                clientId="624663049773-4vqihedsavoc9o8paj7p9h3e0el2p5o2.apps.googleusercontent.com">
                
                <GoogleLogin 
                onSuccess={handleGoogleLoginSuccess} 
                onError={handleGoogleError} />
            
                </GoogleOAuthProvider>
                <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>

<hr style={{minWidth:"50px",width:"100%"}}/>
<span> &nbsp;&nbsp;&nbsp;or&nbsp;&nbsp;&nbsp;</span> 
<hr style={{minWidth:"50px",width:"100%"}}/>
</div>
                </div>
            <Box>
            <div className='authentication-form-container'>                   
              <TextField
                type="email"
                name="identifier"
                value={user.identifier}
                onChange={handleUserChange}
                margin="normal"
                required
                fullWidth
                label="Email Address"
                error={Boolean(errors.identifier)} // Set error state based on whether there's an error message
                helperText={errors.identifier}
              />

<TextField
                type="number"
                name="mobile_number"
                value={user.mobile_number}
                onChange={handleUserChange}
                margin="normal"
                required
                fullWidth
                label="Mobile Number"
                error={Boolean(errors.identifier)} // Set error state based on whether there's an error message
                helperText={errors.identifier}
              />

              <TextField
                type={showPassword ? 'text' : 'password'}
                name="password"
                // value={user.password}
                hidden
                value={user.identifier}
                onChange={handleUserChange}
                label="Enter Password"
                margin="normal"
                required
                fullWidth
                autoFocus
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
                error={Boolean(errors.password)} // Set error state based on whether there's an error message
                helperText={errors.password}
              />

              
</div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
                onClick={handleLogin}
                disabled={loading} // Disable the button while loading
              >
                {loading ? 'Logging in...' : 'Login with SMS OTP'}
              </Button>

              {showMobileNumberDialog && (
              <Dialog open={showMobileNumberDialog} onClose={() => setShowMobileNumberDialog(false)}>
                <DialogTitle>Please Enter OTP sent on {user.identifier}</DialogTitle>
             
                <DialogContent>
                
                {/* <TextField
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={user.password}
                onChange={handleUserChange}
                label="Enter Password"
                margin="normal"
                required
                fullWidth
                autoFocus
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
                error={Boolean(errors.password)} // Set error state based on whether there's an error message
                helperText={errors.password}
              /> */}
                  <TextField
                    label="OTP"
                    name="otp"
                    value={user.otp}
                    onChange={handleUserChange}
                    fullWidth
                    style={{margin:"1rem 0"}}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setShowMobileNumberDialog(false)} color="primary">
                    Cancel
                  </Button>
                  <Button color="primary" onClick={VerifyUser}>
                    Verify User
                  </Button>
                </DialogActions>
              </Dialog>
            )}

{showEmailDialog && (
              <Dialog open={showEmailDialog} onClose={() => setShowEmailDialog(false)}>
                <DialogTitle>Please Enter OTP sent on {user.identifier}</DialogTitle>
             
                <DialogContent>
                
                <TextField
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={user.identifier}
                // onChange={handleUserChange}
                label="Enter Password"
                margin="normal"
                required
                fullWidth
                autoFocus
                hidden
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
                error={Boolean(errors.password)} // Set error state based on whether there's an error message
                helperText={errors.password}
              />
                  <TextField
                    label="OTP"
                    name="otp"
                    value={user.otp}
                    onChange={handleUserChange}
                    fullWidth
                    style={{margin:"1rem 0"}}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setShowEmailDialog(false)} color="primary">
                    Cancel
                  </Button>
                  <Button color="primary" onClick={VerifyUser}>
                    Verify User
                  </Button>
                </DialogActions>
              </Dialog>
            )}
              <Grid container>
                <Grid item style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <Link to="/register" variant="body2" >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
           
              </Grid>
           
              <Copyright sx={{ mt: 1 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
