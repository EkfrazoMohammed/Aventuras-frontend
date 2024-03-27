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
import { notification } from "antd";
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

export default function Login() {
  const [showMobileNumberDialog, setShowMobileNumberDialog] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
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
  const [toggleLogin, settoggleLogin] = useState(false);
  const [gUser, setGuser] = useState(initialUser);

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

          console.log(data);

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
        //     let newOtp = generateOTP();

        //     let mailData= {
        //       "name":userObject.email,
        //        "email": userObject.email,
        //        "subject":"OTP FOR LOGIN",
        //        "mode":"LOGIN",
        //        "otp":`${newOtp}`,
        //  }

        //     setGeneratedOTP(newOtp);
        //     let sendingMail = await axios.post(
        //       "https://aventuras.co.in/api/v1/users/sendOTPMail",
        //       mailData
        //     );
      } catch (error) {
        console.log(error);
      }
    } else {
      notification.error({
        message: "Account is not registered",
        description: "Register first to proceed",
        duration: 5,
            placement:"top",
      });
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
    MobileNumber: "",
  });
  //   const emailPattern = ;
  //  const mobilePattern = /;
  let errorLogin = {};
  const [validate, setValiDate] = useState({
    isEmailValid: false,
    isMobileValid: false,
  });
  const handleUserChange = ({ target }) => {
    setShowEmailDialog(false);

    const { name, value } = target;

    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    // Assuming validate is a state variable initialized with isEmailValid and isMobileValid
    // You should initialize it like this: const [validate, setValiDate] = useState({ isEmailValid: true, isMobileValid: true });

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
    } else if (name === "mobile_number") {
      if (!/^\d{10}$/.test(value)) {
        setValiDate((prevValidate) => ({
          ...prevValidate,
          isMobileValid: false,
        }));
        errorLogin.MobileNumber = "Enter 10-digit mobile number.";
      } else {
        errorLogin.MobileNumber = "";
        // Set isMobileValid to true initially
        setValiDate((prevValidate) => ({
          ...prevValidate,
          isMobileValid: true,
        }));
      }
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
  // const [oldusersmobile, setOldusersmobile] = useState({});
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
      setuserData(Alldata);
      const myusersemail123 = AllEmaildata.data.map((user) => user.email);
      const myusersemail1234 = AllSecretdata.data.map((user) => user.secretkey);

      // const myusersmobile123 = Alldata.data.map((user) => user.mobile_number);
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
    try {
      if (user.identifier) {
        let payloadOb = {
          identifier: user.identifier,
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
      if (
        error.response.data.error.message === "Invalid identifier or password"
      ) {
        notification.error({
          message: "Invalid Credentials",
        });
      } else if (
        error.data.message === "Too many requests, please try again later."
      ) {
        notification.error({
          message: "Too many requests, please try again later.",
        });
      } else {
        notification.error({
          message: "User not registered",
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
        });
      } else if (
        error.data.message === "Too many requests, please try again later."
      ) {
        notification.error({
          message: "Too many requests, please try again later.",
        });
      } else {
        notification.error({
          message: "User not registered",
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
        // let sendingSMS = await axios.post(
        //   "https://aventuras.co.in/api/v1/users/sendSMSOTP",
        //   SMSPayload
        // );
      } else {
        notification.error({
          message: "Mobile Number not registered",
          description: "Please try with email instead",
        });
      }

      // setShowOTPDialog(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        style={{
          width: "100%",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
        }}
        className="myloginbox"
      >
        <Box
          className="Box_container mylogincontainer"
          style={{
            height: "550px",
            display: "flex",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <Box className="login_image"></Box>
          <Box
            maxWidth="sm"
            style={{
              width: "100%",
              background: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <div className="">
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <PersonIcon />
              </Avatar>
            </div>
            <Typography component="h1" variant="h5">
              Welcome Back User
            </Typography>

            <GoogleOAuthProvider clientId="624663049773-4vqihedsavoc9o8paj7p9h3e0el2p5o2.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleError}
              ></GoogleLogin>
            </GoogleOAuthProvider>

            {showEmailDialog && (
              <div className="text-container">
                <div className="otp-containers">
                  <div className="">Enter Otp</div>
                  <MuiOtpInput
                    className="custom-otp-input"
                    id="hello"
                    length={6}
                    value={otp}
                    fullWidth
                    onChange={handleUserChanged}
                  />
                </div>
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
              </div>
            )}
            {!showEmailDialog ? (
              <>
                <div
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
                    error={Boolean(errors.identifier)} // Set error state based on whether there's an error message
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
                </div>

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

            <div
              className=""
              style={{
                display: "flex",
                alignItems: "center",

                justifyContent: "center",
                flexDirection: "column",
                gap: "10px",
                marginTop: "10px",
                fontSize: "18px",
                fontWeight: "400",
                marginBottom:"10px"
              }}
            >
              <Link to="/Register" variant="body2">
                {"Don't have an Account? Register"}
              </Link>
            </div>

            <Copyright sx={{ mt: 1 }} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
