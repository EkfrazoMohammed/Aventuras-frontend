import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./scss/sidebar.scss";
import { Link } from "react-router-dom";

import GeneralBookings from "./GeneralBookings";

import GroupBookings from "./GroupBookings";
import MyBookings from "./MyBookings";
import Enquiries from "./Enquiries";
import MyFlightEnquiries from "./MyFlightEnquiries";
import MyProfile from "./MyProfile";
import PaymentHistory from "./PaymentHistory";
import GroupBookingEnquiries from "./GroupBookingEnquiries";
import GroupBookingContainer from "./GroupBookingContainer";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Sidebar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex" }}
      className="profile-container"
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
        className="profile-tabs-sidebar"
      >
        {/* <div className="admin-title" {...a11yProps(0)} >Profile</div> */}
      
        <Tab
          className="selected-profile-tabs"
          label="My Bookings"
          {...a11yProps(0)}
        />
        <Tab
          className="selected-profile-tabs"
          label="Flight Enquiries"
          {...a11yProps(1)}
        />
        <Tab
          className="selected-profile-tabs"
          label="Group Tour Enquiries"
          {...a11yProps(2)}
        />
        <Tab
          className="selected-profile-tabs"
          label="Group Tour Bookings"
          {...a11yProps(3)}
        />
          <Tab
          className="selected-profile-tabs"
          label="Package Enquiries"
          {...a11yProps(4)}
        />
      </Tabs>
      <div className="dashboard-container">
        <div className="tabs-container">
      
          {/* <TabPanel value={value} index={1}>
                       <MyBookings />
                    </TabPanel> */}

          <TabPanel value={value} index={0}>
          <GeneralBookings />
       
          </TabPanel>
          <TabPanel value={value} index={1}>
            <MyFlightEnquiries />
          </TabPanel>

          <TabPanel value={value} index={2}>
            <GroupBookingEnquiries />
          </TabPanel>

          <TabPanel value={value} index={3}>
            <GroupBookingContainer />
          </TabPanel>

          <TabPanel value={value} index={4}>
          <Enquiries />
          </TabPanel>
          {/* <TabPanel value={value} index={3}>
                 <PaymentHistory />
                    </TabPanel>  */}
{/* 
          <TabPanel value={value} index={5}>
                  <MyBookings />
                    </TabPanel> */}
        </div>
      </div>
    </Box>
  );
}
