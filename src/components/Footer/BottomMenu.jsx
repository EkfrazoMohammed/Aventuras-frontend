import * as React from 'react';
import { Link } from "react-router-dom";
import "./Footer.scss";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';


export default function BottomMenu() {

  const [value, setValue] = React.useState(0);
  return (
    <Box className="bottomMenu">
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} component={Link} to="/" style={{color:'#000 !important'}} />
        <BottomNavigationAction label="Packages" icon={<CardTravelIcon />} component={Link} to="/all-packages"/>
        <BottomNavigationAction label="Destinations" icon={<TravelExploreIcon />} component={Link} to="/all-destinations"/>
      </BottomNavigation>
    </Box>
  );
}