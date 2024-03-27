import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { message} from 'antd';
import { notification } from 'antd';
const Logout = () => {
  const navigate = useNavigate();
  // localStorage.removeItem("user");
  // localStorage.removeItem("Admin");
  // localStorage.removeItem("user_id")
  // localStorage.removeItem("user_name")
  // localStorage.removeItem("user_email")

  localStorage.clear();
  // window.location.reload();
  useEffect(() => {
    // localStorage.removeItem("user");
    // localStorage.removeItem("Admin");
    // localStorage.removeItem("user_id")
    // localStorage.removeItem("user_name")
    // localStorage.removeItem("user_email")

    navigate("/login");
    notification.success({
      message: 'Log Out Successful',
      // description: 'You have successfully logged in.',
      
      duration: 2, // Duration in seconds (adjust as needed)
      placement:"top"
    });
  }, [navigate]);

  return null;
};

export default Logout;