import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const [isAdmin, setAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = () => {
      const isAdmin = localStorage.getItem("isAdmin");
      setAdmin(isAdmin);
    };

    checkAdmin();
  }, []);

  if (!isAdmin) {
    navigate("/");
    return null;
  }

  return children;
};

export default Protected;
