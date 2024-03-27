import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./Newsletter.scss";
import { Skeleton } from "antd";
import axios from "axios";
import { API, baseURL } from "../../../api/apirequest";

const Newsletter = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    try {
      const companyDetails = await API.get("/api/contact-details").then(
        (res) => {
          setDetails(res.data.data[0]);
          //   console.log(res.data.data[0])
          // let names = res.data?.data?.map((v) => {
          //   setDetails(searches =>
          //     Array.from(new Set([...searches, v].map((v) => JSON.stringify(v))))
          //       .map((string) => JSON.parse(string)))
          //   //setInternational(searches => Array.from(new Set([...searches, v?.attributes?.name])))
          // });
        }
      );
      setLoading(false);
    } catch (err) {
      // console.log(err)
      setLoading(true);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="section">
      <div className="newsletter-container">
        <div className="outer">
          {/* <img className='img' loading="lazy" 
                    src={`https://admin.aventuras.co.in/uploads/newsletterbg_3dbc46d6b5_513bed98e7.png`} alt="newsletterbg" />
                 */}
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
