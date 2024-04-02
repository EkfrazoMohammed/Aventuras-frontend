import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { notification } from 'antd';
const Logout = () => {
  const navigate = useNavigate();

  localStorage.clear();
  useEffect(() => {

    navigate("/login");
    notification.success({
      message: 'Log Out Successful',

      duration: 2,
      placement: "top"
    });
  }, [navigate]);

  return null;
};

export default Logout;