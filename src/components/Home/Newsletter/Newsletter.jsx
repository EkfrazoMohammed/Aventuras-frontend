import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Newsletter.scss";
import { API } from "../../../api/apirequest";

const Newsletter = () => {
  const [details, setDetails] = useState([]);
  const getData = async () => {
    try {
      const companyDetails = await API.get("/api/contact-details").then(
        (res) => {
          setDetails(res.data.data[0]);
        }
      );
    } catch (err) {
      console.log(err)
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="section">
      <div className="newsletter-container">
        <div className="outer">
          <img
            className="img"
            loading="lazy"
            src={`https://admin.aventuras.co.in/uploads/newsletterbg_3dbc46d6b5_718ab82711.png`}
            alt="newsletterbg"
          />
        </div>
        <div className="inner">
          <div className="inner-content">
            <div className="left">
              <img
                className="img"
                loading="lazy"
                src={`https://admin.aventuras.co.in/uploads/image_1_1_2a69dfc02b.png`}
                alt="logo"
              />
            </div>
            <div className="right">
              <div className="heading">AVENTURAS</div>
              <div className="para">
                Join our Community on Facebook and Instagram to avail Exclusive
                Benefits.
              </div>
              <div className="social-media">
                <Link
                  to={details?.attributes?.facebook}
                  className="link"
                  target="_blank"
                >
                  <img
                    className="img"
                    loading="lazy"
                    src={`https://admin.aventuras.co.in/uploads/facebook_f8b93244f5_90f8bb768b.png`}
                    alt="fb"
                  />
                </Link>
                <Link
                  to={details?.attributes?.instagram}
                  className="link myinstacon_container"
                  target="_blank"
                >
                  <img
                    className="myinstaicon_image img "
                    loading="lazy"
                    src={`https://admin.aventuras.co.in/uploads/instagram_filled3_3_afdabd9c4b.png`}
                    alt="inst"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
