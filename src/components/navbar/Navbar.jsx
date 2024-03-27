// import React, { useState, useEffect } from 'react'
// import { BrowserRouter, Routes, Route, Link, NavLink,useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {API,baseURL} from "../../api/apirequest"

// import { Menu, Dropdown, Space, Skeleton, notification } from 'antd';
// import { CloseOutlined, MenuOutlined, DownOutlined, SmileOutlined } from '@ant-design/icons';
// import { ShopOutlined, HomeOutlined } from '@ant-design/icons'

// import './Navbar.scss';
// import "./RNav.css";
// import { userData } from "../Auth/helper";

// const Drop = () => {
//   const [international, setInternational] = useState([]);
//   const [domestic, setDomestic] = useState([]);
//   const [theme, setTheme] = useState([]);

//   const getData = async () => {

//     try {
//       const mydomestic = await API.get('/api/all-destinations?&filters[type][$eq]=Domestic')
//         .then((res => {
//           let names = res.data?.data?.map((v) => {
//             // setDomestic(searches => Array.from(new Set([...searches, v?.attributes?.name])))
//             setDomestic(searches =>
//               Array.from(new Set([...searches, v].map((v) => JSON.stringify(v))))
//                 .map((string) => JSON.parse(string)))
//           });
//         }))

//       const myinternational = await API.get('/api/all-destinations?&filters[type][$eq]=International')
//         .then((res => {
//           let names = res.data?.data?.map((v) => {
//             setInternational(searches =>
//               Array.from(new Set([...searches, v].map((v) => JSON.stringify(v))))
//                 .map((string) => JSON.parse(string)))
//             //setInternational(searches => Array.from(new Set([...searches, v?.attributes?.name])))
//           });
//         }))

//         const mythemes = await API.get('/api/themes')
//         .then((res => {
//           let names = res.data?.data?.map((v) => {
//             setTheme(searches =>
//               Array.from(new Set([...searches, v].map((v) => JSON.stringify(v))))
//                 .map((string) => JSON.parse(string)))
//             //setInternational(searches => Array.from(new Set([...searches, v?.attributes?.name])))
//           });
//         }))

//     } catch (err) {
//       // console.log(err)
//       setLoading(true)
//     }
//   }
//   useEffect(() => {

//     getData();

//   }, [])

//   const { username } = userData();
//   // console.log(username)

//   const [clicked, setClicked] = useState(false);

//   const handleClick = () => {
//     setClicked(!clicked);
//   };
//   const [loading, setLoading] = useState(false);

//   const navigate=useNavigate();
//   function refreshPage() {
//     // localStorage.removeItem("user");
//     // localStorage.removeItem("isAdmin");

//     localStorage.clear()
//     // navigate("/login")
//     notification.success({
//       message:"User Logged out!"
//     })
//     setTimeout(()=>{
//  // Redirect to the "/login" page
//  window.location.href = "/login";
//       // window.location.reload();
//     },500)
//   }

//   const handleDestinationChange = (param) => {
//     window.location.href = `/single-destination/${param}`;
//     // console.log(key);

//   };
//   const handleThemeChange = (id) => {
//     window.location.href = `/single-theme/${id}`;
//     // console.log(key);

//   };

//   return (

//     <div className='navBar'>

//       {
//         loading ?
//           (
//             <Skeleton.Button active buttonShape block />
//           )
//           : (<>

//             <div className="navbar-container">

//               <div className="navbar-left">
//                 <Link to="/">
//                   <div className="nav-logo">
//                     <img className='img' loading="lazy"
//                       src={`https://admin.aventuras.co.in/uploads/image_1_1_2a69dfc02b.png`}
//                       alt="logo" />

//                   </div>
//                 </Link>
//                 <div className="navbar-heading">

//                 </div>
//               </div>

//               <div className="menuIcon" onClick={handleClick}>
//                 {clicked ?
//                   <CloseOutlined />
//                   :
//                   <MenuOutlined />
//                 }

//               </div>
//               <ul className={clicked ? "menuList" : "menuList close"}>
//                 <div className="navbar-right">
//                   <ul className="lists">

//                     <li className="dropdownOne">
//                       <Link to="/all-destinations">
//                         <div className="dropbtn">Destinations<span className="arrowa"></span></div></Link>
//                       <div className="dropdowncontent">

//                         <li className="multidropdown">
//                           <div className="multidropbtn location-heading">International</div>
//                           <div className="multidropdowncontent">
//                             {international.map((v) => {

//                               return (
//                                 <>
//                                   <NavLink to={`/single-destination/${v?.attributes?.name}`} key={v.id} className='location' onClick={() => { handleDestinationChange(v?.attributes?.name) }}>{v?.attributes?.name}</NavLink >
//                                 </>
//                               )
//                             })}

//                             <Link to="/all-destinations" className="mybtn">explore more</Link>

//                           </div>
//                         </li>

//                         <li className="multidropdown">
//                           <div className="multidropbtn location-heading">Domestic</div>
//                           <div className="multidropdowncontent">
//                             {domestic.map((v) => {
//                               return (
//                                 <>
//                                   <NavLink to={`/single-destination/${v?.attributes?.name}`} key={v.id} className='location' onClick={() => { handleDestinationChange(v?.attributes?.name) }}>{v?.attributes?.name}</NavLink>
//                                 </>
//                               )
//                             })}

//                             <Link to="/all-destinations" className="mybtn">explore more</Link>

//                           </div>
//                         </li>

//                       </div>
//                     </li>

//                     <li className="dropdownOne">
//                       <Link to="/all-themes"><div className="dropbtn">Themes <span className="arrowa"></span></div></Link>

//                       <div className="dropdowncontent">
//                         <li className="multidropdown">
//                         <div className="multidropbtn location-heading">Themes</div>
//                           <div className="multidropdowncontent">
//                           {theme.map((v) => {
//                               return (
//                                 <>
//                                   <NavLink to={`/single-theme/${v.id}`} key={v.id} className='location' onClick={() => { handleThemeChange(v.id) }}>{v?.attributes?.title}</NavLink>
//                                 </>
//                               )
//                             })}

//                             <Link to="/all-themes" className="mybtn">explore more</Link>

//                           </div>
//                         </li>

//                       </div>
//                     </li>

//                     <li className="navitem highlight">
//                       <div><Link to="/group-tour" target="_blank">Group Tours</Link></div>
//                     </li>

//                     <li className="navitem">
//                       <div><Link to="/flight">Flight</Link></div>
//                     </li>

//                     <li className="navitem">
//                       <div><Link to="/pay-now">Pay Now</Link></div>
//                     </li>

//                     <li className="navitem">
//                       <div><Link to="/about-us">About Us</Link></div>
//                     </li>

//                     <li className="navitem contact-button">
//                       <div><Link to="/contact-us">Contact Us</Link></div>
//                     </li>
//                     <li className="dropdownOne">

//                         <div className="dropbtn">

//                           {/* <Link to="/login">

// {username ? (
//   /\s|@/.test(username) ? `Hi ${username.split(/\s|@/)[0]}` : username
// ) : 'Login'}

//                           </Link>
//                            */}

// {username ? (
//         /\s|@/.test(username) ? `Hi ${username.split(/\s|@/)[0]}` : username
//       ) : (
//         <Link to="/login">Login</Link>
//       )}
//                           </div>
//                           {username? <>
//                             <div className="dropdowncontent">
//                         <li className="multidropdown">
//                           <div className="multidropdowncontent">

//                             {/* <Link className='location' onClick={() => (localStorage.removeItem("user"))}>Logout</Link> */}
//                             <Link to="/myprofile" >My Profile</Link>
//                             <Link className='location' onClick={refreshPage}>Logout</Link>
//                             {/* <Link to="/admin/dashboard" >Admin</Link>                                */}

//                           </div>
//                         </li>

//                       </div>
//                           </>
//                           :
//                           <>
//                            {/* <div className="dropdowncontent"> */}
//                         {/* <li className="multidropdown">
//                           <div className="multidropdowncontent">
//                             <Link to="/register" className='location'>Sign Up</Link>
//                             <Link to="/login" className='location'>Login</Link>
//                             {/* <Link className='location' onClick={() => (localStorage.removeItem("user"))}>Logout</Link> */}
//                             {/* <Link className='location' onClick={refreshPage}>Logout</Link> */}

//                             {/* <Link to="/admin/dashboard" >Admin</Link>

//                           </div>
//                         </li> */}

//                       {/* </div> */}
//                           </>}

//                     </li>

//                     {/* <li className="navitem">
//                       <div><Link to="/profile">Profile</Link></div>
//                     </li> */}

//                   </ul>

//                 </div>

//               </ul>

//             </div >
//           </>
//           )
//       }

//     </div >

//   )
// }

// export default Drop

import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

import axios from "axios";
import { API, baseURL } from "../../api/apirequest";

import { Menu, Dropdown, Space, Skeleton, notification,Popover } from "antd";
import {
  CloseOutlined,
  MenuOutlined,
  DownOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { ShopOutlined, HomeOutlined } from "@ant-design/icons";

import "./Navbar.scss";
import "./RNav.css";
import { userData } from "../Auth/helper";
import { Button, Modal } from 'antd';
import Login from "../Auth/Login";
import { Troubleshoot } from "@mui/icons-material";

const Drop = ({setClicked,clicked}) => {
  const [international, setInternational] = useState([]);
  const [domestic, setDomestic] = useState([]);
  const [theme, setTheme] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const[toggle,setToggle]=useState(true)
  const [toggleRegister ,settoggleRegister]=useState(false)

  const getData = async () => {
    try {
      const mydomestic = await API.get(
        "/api/all-destinations?&filters[type][$eq]=Domestic"
      ).then((res) => {
        let names = res.data?.data?.map((v) => {
          // setDomestic(searches => Array.from(new Set([...searches, v?.attributes?.name])))
          setDomestic((searches) =>
            Array.from(
              new Set([...searches, v].map((v) => JSON.stringify(v)))
            ).map((string) => JSON.parse(string))
          );
        });
      });

      const myinternational = await API.get(
        "/api/all-destinations?&filters[type][$eq]=International"
      ).then((res) => {
        let names = res.data?.data?.map((v) => {
          setInternational((searches) =>
            Array.from(
              new Set([...searches, v].map((v) => JSON.stringify(v)))
            ).map((string) => JSON.parse(string))
          );
          //setInternational(searches => Array.from(new Set([...searches, v?.attributes?.name])))
        });
      });

      const mythemes = await API.get("/api/themes").then((res) => {
        let names = res.data?.data?.map((v) => {
          setTheme((searches) =>
            Array.from(
              new Set([...searches, v].map((v) => JSON.stringify(v)))
            ).map((string) => JSON.parse(string))
          );
          //setInternational(searches => Array.from(new Set([...searches, v?.attributes?.name])))
        });
      });
    } catch (err) {
      // console.log(err)
      setLoading(true);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const { username } = userData();

  // const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  function refreshPage() {
    // localStorage.removeItem("user");
    // localStorage.removeItem("isAdmin");

    localStorage.clear();
    // navigate("/login")
    notification.success({
      message: "User Logged out!",
      placement:"top",
      duration:2
    });
    setTimeout(() => {
      // Redirect to the "/login" page
      // window.location.href = "/login";
      // window.location.reload();
    }, 500);
  }

  const handleDestinationChange = (param) => {
    window.location.href = `/single-destination/${param}`;
    // console.log(key);
  };
  const handleThemeChange = (id) => {
    window.location.href = `/single-theme/${id}`;
    // console.log(key);
  };

  useEffect(() => {
    setClicked(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = clicked ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [clicked]);

  const [hidepop,sethidepop]=useState(false)
  const content = (

    <div className="toolTip_main_wrapper">
    <div className="tooltip_header">
      <div className="tooltip_div"  onClick={()=>sethidepop(false)}> <span className="closePop"><CloseOutlined /></span> </div>
      <img src="https://admin.aventuras.co.in/uploads/image_1_1_2a69dfc02b.png" width={'40px'} alt="" />
      <p className="tooltip_heading">Welcome to Aventuras</p>
    </div>
    <div className="tooltip_button_wrapper">
      <button className="tooltip_button" onClick={() => {setModalOpen(true);setToggle(true);sethidepop(false);settoggleRegister(false)}}>Login </button>
      <button className="tooltip_button" onClick={()=>{setModalOpen(true);setToggle(false);sethidepop(false);settoggleRegister(true)}}>SignUp</button>
    </div>
    </div>
  );

  return (
    <>
    
    <div className="navBar">
      {loading ? (
        <Skeleton.Button active buttonShape block />
      ) : (
        <>
          <div className="navbar-container">
            <div className="navbar-left mobileRes">
              <Link to="/">
                <div className="nav-logo">
                  <img
                    className="img"
                    loading="lazy"
                    src={`https://admin.aventuras.co.in/uploads/image_1_1_2a69dfc02b.png`}
                    alt="logo"
                  />
                </div>
              </Link>
              <div className="navbar-heading mobileRes"></div>
            </div>

            <div className="menuIcon mobileRes" onClick={handleClick}>
              {clicked ? <CloseOutlined /> : <MenuOutlined />}
            </div>

            <ul className={clicked ? "menuList" : "menuList close"}>

            <div className="menuIconMobile" onClick={handleClick}>
              {clicked ? <CloseOutlined /> : null}
            </div>
              <div className="navbar-right">
                <ul className="lists">
                  <li className="dropdownOne">
                    <Link to="/all-destinations">
                      <div className="dropbtn">
                        Destinations<span className="arrowa"></span>
                      </div>
                    </Link>
                    <div className="dropdowncontent">
                      <li className="multidropdown">
                        <div className="multidropbtn location-heading">
                          International
                        </div>
                        <div className="multidropdowncontent">
                          {international.map((v) => {
                            return (
                              <>
                                <NavLink
                                  to={`/single-destination/${v?.attributes?.name}`}
                                  key={v.id}
                                  className="location"
                                  onClick={() => {
                                    handleDestinationChange(
                                      v?.attributes?.name
                                    );
                                  }}
                                >
                                  {v?.attributes?.name}
                                </NavLink>
                              </>
                            );
                          })}

                          <Link to="/all-destinations" className="mybtn">
                            explore more
                          </Link>
                        </div>
                      </li>

                      <li className="multidropdown">
                        <div className="multidropbtn location-heading">
                          Domestic
                        </div>
                        <div className="multidropdowncontent">
                          {domestic.map((v) => {
                            return (
                              <>
                                <NavLink
                                  to={`/single-destination/${v?.attributes?.name}`}
                                  key={v.id}
                                  className="location"
                                  onClick={() => {
                                    handleDestinationChange(
                                      v?.attributes?.name
                                    );
                                  }}
                                >
                                  {v?.attributes?.name}
                                </NavLink>
                              </>
                            );
                          })}

                          <Link to="/all-destinations" className="mybtn">
                            explore more
                          </Link>
                        </div>
                      </li>
                    </div>
                  </li>

                  <li className="dropdownOne">
                    <Link to="/all-themes">
                      <div className="dropbtn">
                        Themes <span className="arrowa"></span>
                      </div>
                    </Link>

                    <div className="dropdowncontent">
                      <li className="multidropdown">
                        <div className="multidropbtn location-heading">
                          Themes
                        </div>
                        <div className="multidropdowncontent">
                          {theme.map((v) => {
                            return (
                              <>
                                <NavLink
                                  to={`/single-theme/${v.id}`}
                                  key={v.id}
                                  className="location"
                                  onClick={() => {
                                    handleThemeChange(v.id);
                                  }}
                                >
                                  {v?.attributes?.title}
                                </NavLink>
                              </>
                            );
                          })}

                          <Link to="/all-themes" className="mybtn">
                            explore more
                          </Link>
                        </div>
                      </li>
                    </div>
                  </li>

                  <li className="navitem highlight">
                    <div>
                      <Link to="/group-tour" target="_blank">
                        Group Tours
                      </Link>
                    </div>
                  </li>

                  <li className="navitem">
                    <div>
                      <Link to="/flight">Flight</Link>
                    </div>
                  </li>

                  <li className="navitem">
                    <div>
                      <Link onClick={() => setClicked(!clicked)} to="/pay-now">
                        Pay Now
                      </Link>
                    </div>
                  </li>

                  <li className="navitem">
                    <div>
                      <Link onClick={() => setClicked(!clicked)} to="/about-us">
                        About Us
                      </Link>
                    </div>
                  </li>

                  <li className="navitem contact-button">
                    <div>
                      <Link
                        onClick={() => setClicked(!clicked)}
                        to="/contact-us"
                      >
                        Contact us
                      </Link>
                    </div>
                  </li>
                  <li className="dropdownOne showbig">
                    <div className="dropbtn">
                      {/* {username ? `Hi ${username.split(' ')[0]}`  : 'Login'} */}
                      {/* {username ? 
                          (/\s|@/.test(username) ? `Hi ${username.split(' ')[0]}` : 'Login') 
                          : 'Login'} */}
                      {/* {username ? (
                        /\s|@/.test(username) ? (
                          `Hi ${username.split(/\s|@/)[0]}`
                        ) : (
                          username
                        )
                      ) : (
                        <Link onClick={() => setClicked(!clicked)} to="/login">
                          Login
                        </Link>
                      )} */}

{username ? <>
    {username.length > 14 ? (
      /\s|@/.test(username) ? (
        `Hi ${username.split(/\s|@/)[0].substring(0, 14)}...`
      ) : (
        `${username.substring(0, 14)}...`
      )
    ) : (
      /\s|@/.test(username) ? (
        `Hi ${username.split(/\s|@/)[0]}`
      ) : (
        username
      )
    )}</>
 : (
  // <Link onClick={() => setClicked(!clicked)} to="/login">
  //   Login
  // </Link>
  <Popover 
  open={hidepop}
  trigger="click"
   content={content}
   onClick={()=>{sethidepop(true);}}
    title={null} >
      
 Login
  </Popover>
 
)}

                    </div>

                    {username ? (
                      <>
                        <div className="dropdowncontent">
                          <li className="multidropdown">
                            <div className="multidropdowncontent">
                              {/* <Link className='location' onClick={() => (localStorage.removeItem("user"))}>Logout</Link> */}
                              <Link to="/myprofile">My Profile</Link>
                              <Link className="location" onClick={refreshPage}>
                                Logout
                              </Link>
                              {/* <Link to="/admin/dashboard" >Admin</Link>                                */}
                            </div>
                          </li>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </li>

                  {/* <li className="navitem">
                      <div><Link to="/profile">Profile</Link></div>
                    </li> */}

                  <li className="navitem showsmall">
                    {username ? (
                      <>
                        <Link to="/myprofile">My Profile</Link>
                        <Link className="location" onClick={refreshPage}>
                          Logout
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link onClick={() =>  {setModalOpen(true);setToggle(true);settoggleRegister(false)}}>
                          {/* {username ? `Hi ${username.split(' ')[0]}`  : 'Login'} */}
                          {/* {username ? 
                          (/\s|@/.test(username) ? `Hi ${username.split(' ')[0]}` : 'Login') 
                          : 'Login'} */}
                          {username ? null : "Login"}
                        </Link>
                      </>
                    )}
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </>
      )}
    </div>
    <Modal
    style={{textAlign:'center'}}
    // title={
    //   <div className="" style={{fontSize:'1.5rem',display:'flex'}}>
    //     <div className="" style={{width:'10%',padding:'0.3rem 0rem'}}>
    //     <img src="https://admin.aventuras.co.in/uploads/image_1_1_2a69dfc02b.png" width={'50px'} alt="noImage"/>
    //     </div>
    //  <p style={{marginBottom:'0',width:'90%',textAlign:'center',alignItems:'center',display:'flex',justifyContent:'center'}}>
    //   <span style={{marginRight:'4.3rem',color:'#292929'}}>Welcome User</span>
    //  </p>
    //   </div>
    // }
    className="modalLogin"
  
        centered
        open={modalOpen}
      footer={null}
      onCancel={()=>{
        setModalOpen(false);
        
      }}
      destroyOnClose={true}
      >

        <Login toggle={toggle}  setToggle={setToggle} toggleRegister={toggleRegister} settoggleRegister={settoggleRegister} />


      </Modal>
    </>
    
  );
};

export default Drop;
