import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const storeUser = (data) => {

  localStorage.setItem(
    "user",
    JSON.stringify({
      username: data.user.username,
      firstname: data.user.firstname,
      jwt: data.jwt,
      email: data.user.email,
      info: data,
      isLoggedin: true,
    })
  );
  localStorage.setItem(
    "user_id", data.user.id,

  );
  localStorage.setItem(
    "user_email", data.user.email,

  );
  // Split the full name into words
  const nameParts = data.user.username.split(' ');

  // Get the first word as the first name
  const firstName = nameParts[0];

  localStorage.setItem(
    "user_name", firstName

  );
};

export const userData = () => {
  const stringifiedUser = localStorage.getItem("user") || '"guest"';
  return JSON.parse(stringifiedUser || {});
};

export const Protector = ({ Component }) => {
  const navigate = useNavigate();

  const { jwt } = userData();

  useEffect(() => {
    if (!jwt) {
      navigate("/login");
    }
  }, [navigate, jwt]);

  return <Component />;
};
