import React, { useState,} from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import BottomMenu from "./components/Footer/BottomMenu";
import Scrolltop from "./components/Footer/Scrolltop";
import AllPackages from "./components/Home/Packages/AllPackages";
import SinglePackages from "./components/Home/Packages/SinglePackages";
import AllDestinations from "./components/Home/Destinations/AllDestinations";
import SingleDestination from "./components/Home/Destinations/SingleDesination";
import AllThemes from "./components/Home/Theme/AllThemes";
import SingleTheme from "./components/Home/Theme/SingleTheme";
import Multiplegrouptour from "./components/Grouptour/MultiplegroupTour";
import Singlegrouptour from "./components/Grouptour/Singlegrouptour";
import PayNow from "./components/PayNow/PayNow";
import Flight from "./components/Flight/Flight";
import Contact from "./components/ContactUs/Contact";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import WhatsAppWidget from "react-whatsapp-chat-widget";
import "react-whatsapp-chat-widget/index.css";
import NotFound from "./components/Home/NotFound";
import Protected from "./components/Auth/Protected";
import Disclaimer from "./components/Policies/Disclaimer";
import PrivacyPolicy from "./components/Policies/PrivacyPolicy";
import CancelationPolicy from "./components/Policies/CancelationPolicy";
import TermsAndCondition from "./components/Policies/TermsAndCondition";
import AboutUs from "./components/AboutUs/AboutUs";
import ProfileDashboard from "./components/Auth/Profile/ProfileDashboard";
import PayWithBookNow from "./components/PayNow/PayWithBookNow";
import PayWithGrouptour from "./components/PayNow/PayWithGrouptour";
import SearchDestination from "./components/Home/Destinations/SearchDestination";
import {MenuOutlined,} from "@ant-design/icons";
import {HelmetProvider} from "react-helmet-async";
function App() {
  // console.clear();

  // // Save a reference to the original console.log
  // const originalConsoleLog = console.log;

  // // Override console.log with a function that does nothing
  // console.log = function() {};

  // // Display your custom text

  // originalConsoleLog("Hi 👋,Welcome to Aventuras Holidays LLP 🧳✈️");

  // // If you want to prevent other console methods, do the same for them
  // console.warn = function() {};
  // console.error = function() {};

  // console.table = function() {};
  // // ... and so on for other console methods you want to disable

  // // Any subsequent console.log will do nothing
  // console.log("This will not appear in the console");
  const [clicked, setClicked] = useState(false);

  const Hamburger = ()=>{ 
    return(
      clicked ? null   : <div className="hamburger_container" onClick={()=>setClicked(!clicked)}  >
      <MenuOutlined/>
         </div>   
    )
  }

  return (
    <>
    <HelmetProvider>
    <BrowserRouter>
        <Navbar clicked={clicked} setClicked={setClicked}  />

        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route path="/register" element={<Register />} />
          {/* <Route path="/login" element={<Login />} /> */}

          <Route path="/all-destinations" element={<AllDestinations />} />
          <Route
            path="/single-destination/:dname"
            element={<SingleDestination />}
          />
          <Route
            path="/search-destination/:dname"
            element={<SearchDestination />}
          />

          <Route path="/all-packages" element={<AllPackages />} />
          <Route
            path="/single-package/:package_id"
            element={<SinglePackages />}
          />

          <Route path="/group-tour" element={<Multiplegrouptour />} />
          <Route
            path="/single-group-tour/:package_id"
            element={<Singlegrouptour />}
          />

          <Route path="/group-tour-pay-now" element={<PayWithGrouptour />} />

          <Route path="/all-themes" element={<AllThemes />} />
          <Route path="/single-theme/:id" element={<SingleTheme />} />

          <Route path="/flight" element={<Flight />} />
          {/*standard pay page  */}
          <Route path="/pay-now" element={<PayNow />} />
          <Route path="/pay-now-with-package" element={<PayWithBookNow />} />

          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<Contact />} />

          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cancelation-policy" element={<CancelationPolicy />} />
          <Route path="/terms-and-condition" element={<TermsAndCondition />} />

          <Route path="/myprofile" element={<ProfileDashboard />} />

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />

        <BottomMenu
          className="bottomMenu"
          position="sticky"
          color="primary"
          sx={{ top: "auto", bottom: 0 }}
        />

        <Hamburger />
        <Scrolltop />

        <WhatsAppWidget
          style={{ marginBottom: "10px" }}
          phoneNo="919800010016"
          position="right"
          widgetWidth="300px"
          widgetWidthMobile="260px"
          autoOpen={false}
          autoOpenTimer={5000}
          messageBox={true}
          messageBoxTxt="Hi Aventuras team! 
          I need assistance for planning my travel."
          iconSize="45"
          iconColor="white"
          iconBgColor="rgb(79, 206, 93)"
          headerIcon="https://admin.aventuras.co.in/uploads/image_1_1_2a69dfc02b.png"
          headerIconColor="pink"
          headerTxtColor="black"
          headerBgColor="rgb(79, 206, 93)"
          headerTitle="Aventuras"
          headerCaption="Online"
          bodyBgColor="#eee"
          chatPersonName="Support"
          chatMessage={
            <>
              Hi there 👋 <br />
              <br /> How can I help you?
            </>
          }
          footerBgColor="#fff"
          placeholder="Type a message.."
          btnBgColor="rgb(79, 206, 93)"
          btnTxt="Start Chat"
          btnTxtColor="white"
        />
      </BrowserRouter>
    </HelmetProvider>
 
    </>
  );
}


export default App;
