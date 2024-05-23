import React from "react";
import '../css/Header.css';
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import DialpadIcon from '@mui/icons-material/Dialpad';
import { Avatar } from "@mui/material";
import { useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';
import { useNavigate } from 'react-router-dom'; 


function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); 
  };

  return (
    <div className="header">
      <div className="headerLeft">
        <MenuIcon />
        <img
          src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_1x_r5.png"
          alt="logo"
        />
      </div>
      <div className="headerMiddle">
        <div className="header__SearchContainer">
          <SearchIcon />
          <input type="text" placeholder="Search mail" />
          <ArrowDropDownIcon />
        </div>
      </div>
      <div className="headerRight">
        <div className="headerRightIcons">
          <HelpOutlineIcon />
          <SettingsIcon />
          <DialpadIcon/>
        </div>
        <div style={{ cursor: "pointer" }}>
          <Avatar onClick={handleLogout} /> 
        </div>
      </div>
    </div>
  );
}

export default Header;
