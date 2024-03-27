import * as React from 'react';
import { Link } from "react-router-dom";

import "./Footer.scss";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';


export default function BottomMenu() {

  const [value, setValue] = React.useState(0);
  // console.log(value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    
  };
  return (
    <Box className="bottomMenu">
      {/* <div className="item-container">
        <div className="item">
          <Link to="/">
          <div className="icon"><HomeIcon /></div>
          <div className="label">Home</div>
          </Link>
        </div>

        <div className="item">
        <Link to="/all-destinations">
          <div className="icon"><HomeIcon /></div>
          <div className="label">Packages</div>
          </Link>
        </div>

        <div className="item">
          <div className="icon"><TravelExploreIcon /></div>
          <div className="label">Destinations</div>
        </div>
      </div> */}

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