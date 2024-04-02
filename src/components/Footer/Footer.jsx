import React, { useState, useEffect } from "react";
import "./Footer.scss";
import { Skeleton } from "antd";
import { Link, NavLink } from "react-router-dom";
import { API } from "../../api/apirequest";

const Footer = () => {
  const [international, setInternational] = useState([]);
  const [domestic, setDomestic] = useState([]);
  const [theme, setTheme] = useState([]);

  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const [year, setYear] = useState('2024')
  const getYear = () => {
    const currentYear = new Date().getFullYear()
    setYear(currentYear)
  }

  const getData = async () => {
    try {
      const mydomestic = await API.get(
        "/api/all-destinations?&filters[type][$eq]=Domestic"
      ).then((res) => {
        let names = res.data?.data?.map((v) => {
          setDomestic((searches) =>
            Array.from(
              new Set([...searches, v].map((v) => JSON.stringify(v)))
            ).map((string) => JSON.parse(string))
          );
        });
      });

      const myinternational = await API.get(
        "/api/all-destinations?&filters[type][$eq]=International"
      ).then((res) => {
        let names = res.data?.data?.map((v) => {
          setInternational((searches) =>
            Array.from(
              new Set([...searches, v].map((v) => JSON.stringify(v)))
            ).map((string) => JSON.parse(string))
          );
        });
      });

      const mythemes = await API.get("/api/themes").then((res) => {
        let names = res.data?.data?.map((v) => {
          setTheme((searches) =>
            Array.from(
              new Set([...searches, v].map((v) => JSON.stringify(v)))
            ).map((string) => JSON.parse(string))
          );
        });
      });

      const companyDetails = await API.get("/api/contact-details").then(
        (res) => {
          setDetails(res.data.data[0]);
        }
      );
      setLoading(false);
    } catch (err) {
      setLoading(true);
    }
  };
  useEffect(() => {
    getData();
    getYear()
  }, []);

  const handleDestinationChange = (param) => {
    window.location.href = `/single-destination/${param}`;
  };
  const handleThemeChange = (id) => {
    window.location.href = `/single-theme/${id}`;
  };

  return (
    <div className="section">
      {loading ? (
        <>
          <Skeleton.Button active buttonShape block />
        </>
      ) : (
        <>
          <div className="footer-container">
            <div className="top-container">
              <div className="left">
                <div className="company-name">
                  {details?.attributes?.company_name}
                </div>
                <div className="contact">
                  <div className="column-1">
                    <div className="item">
                      <Link
                        onClick={() =>
                          (window.location = `tel:${details?.attributes?.company_mobile_number}`)
                        }
                        className="link"
                      >
                        <div className="img">
                          <img
                            className="img"
                            loading="lazy"
                            src={`https://admin.aventuras.co.in/uploads/Phone_ee32e05e87.png`}
                            alt="phone"
                            style={{ width: 20, height: 20 }}
                          />
                        </div>
                        <div className="text">
                          {details?.attributes?.company_mobile_number}
                        </div>
                      </Link>
                    </div>

                    <div className="item">
                      <Link
                        className="link"
                        onClick={() =>
                          (window.location = `mailto:${details?.attributes?.company_email}`)
                        }
                      >
                        <div className="img">
                          <img
                            className="img"
                            loading="lazy"
                            src={`https://admin.aventuras.co.in/uploads/Envelope_313100f12e.png`}
                            alt="email"
                            style={{ width: 20, height: 20 }}
                          />
                        </div>
                        <div className="text">
                          {details?.attributes?.company_email}
                        </div>
                      </Link>
                    </div>
                    <div className="item">
                      <Link
                        to={details?.attributes?.google_reviews}
                        className="link"
                        target="_blank"
                      >
                        <div className="img">
                          <img
                            className="img"
                            loading="lazy"
                            src={`https://admin.aventuras.co.in/uploads/greviews_621de61ba7.png`}
                            alt="email"
                            style={{ width: 20, height: 20, padding: "2px" }}
                          />
                        </div>
                        <div className="text">Google Reviews</div>
                      </Link>
                    </div>
                  </div>

                  <div className="column-2">
                    <div className="item">
                      <Link
                        to={details?.attributes?.facebook}
                        className="link"
                        target="_blank"
                      >
                        <div className="img">
                          <img
                            className="img"
                            loading="lazy"
                            src={`https://admin.aventuras.co.in/uploads/facebook_f8b93244f5_90f8bb768b.png`}
                            alt="fb"
                            style={{ width: 20, height: 20 }}
                          />
                        </div>
                        <div className="text">
                          {/* {details?.attributes?.facebook} */}
                          Facebook
                        </div>
                      </Link>
                    </div>

                    <div className="item">
                      <Link
                        to={details?.attributes?.instagram}
                        className="link myfooterinsta_container"
                        target="_blank"
                      >
                        <div className="img">
                          <img
                            className="img myfooterinsta_image"
                            loading="lazy"
                            src={`https://admin.aventuras.co.in/uploads/instagram_filled3_3_afdabd9c4b.png`}
                            alt="insta"
                            style={{ width: 20, height: 20 }}
                          />
                        </div>
                        <div className="text">
                          {/* {details?.attributes?.instagram} */}
                          Instagram
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="payment">
                  <div className="title">We Accept</div>
                  <div className="brand-images">
                    <div className="image">
                      <img
                        className="img"
                        loading="lazy"
                        src={`https://admin.aventuras.co.in/uploads/image_2_0baa22466a.png`}
                        alt="visa"
                      />
                    </div>
                    <div className="image">
                      <img
                        className="img"
                        loading="lazy"
                        src={`https://admin.aventuras.co.in/uploads/Mastercard_logo_removebg_preview_1_aded28e439.png`}
                        alt="mastercard"
                      />
                    </div>
                    <div className="image">
                      <img
                        className="img"
                        loading="lazy"
                        src={`https://admin.aventuras.co.in/uploads/image_3_686c9165bf.png`}
                        alt="paytm"
                      />
                    </div>
                    <div className="image">
                      <img
                        className="img"
                        loading="lazy"
                        src={`https://admin.aventuras.co.in/uploads/image_4_5c2e5ea411.png`}
                        alt="upi"
                      />
                    </div>
                    <div className="image">
                      <img
                        className="img"
                        loading="lazy"
                        src={`https://admin.aventuras.co.in/uploads/image_5_d21286f905.png`}
                        alt="gpay"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="footer-links">
                  <div className="left-col">
                    <div className="column">
                      <div className="heading">DOMESTIC</div>
                      <ul className="lists">
                        {domestic.map((v) => {
                          return (
                            <>
                              <li className="list-item">
                                {" "}
                                <NavLink
                                  to={`/single-destination/${v?.attributes?.name}`}
                                  key={v.id}
                                  onClick={() => {
                                    handleDestinationChange(
                                      v?.attributes?.name
                                    );
                                  }}
                                >
                                  {v?.attributes?.name}
                                </NavLink>
                              </li>
                            </>
                          );
                        })}
                      </ul>
                    </div>

                    <div className="column">
                      <div className="heading">INTERNATIONAL</div>
                      <ul className="lists">
                        {international.map((v) => {
                          return (
                            <>
                              <li className="list-item">
                                {" "}
                                <NavLink
                                  to={`/single-destination/${v?.attributes?.name}`}
                                  key={v.id}
                                  onClick={() => {
                                    handleDestinationChange(
                                      v?.attributes?.name
                                    );
                                  }}
                                >
                                  {v?.attributes?.name}
                                </NavLink>
                              </li>
                            </>
                          );
                        })}
                      </ul>
                    </div>
                  </div>

                  <div className="right-col">
                    <div className="column">
                      <div className="heading">IMPORTANT LINKS</div>
                      <ul className="lists">
                        <li className="list-item">
                          {" "}
                          <Link to="/"> HOME</Link>
                        </li>
                        <li className="list-item">
                          {" "}
                          <Link to="/about-us"> About Us</Link>
                        </li>
                        <li className="list-item">
                          {" "}
                          <Link to="/contact-us"> CONTACT US</Link>
                        </li>
                        <li className="list-item">
                          {" "}
                          <Link to="/disclaimer"> DISCLAIMER</Link>
                        </li>
                        <li className="list-item">
                          {" "}
                          <Link to="/privacy-policy"> PRIVACY POLICY</Link>
                        </li>
                        <li className="list-item">
                          {" "}
                          <Link to="/terms-and-condition">
                            {" "}
                            TERMS AND CONDITION
                          </Link>
                        </li>
                        <li className="list-item">
                          {" "}
                          <Link to="/cancelation-policy">
                            {" "}
                            CANCELLATION POLICY
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className="column">
                      <div className="heading">THEMES</div>
                      <ul className="lists">
                        {theme.map((v) => {
                          return (
                            <>
                              <li className="list-item">
                                <NavLink
                                  to={`/single-theme/${v.id}`}
                                  key={v.id}
                                  className="location"
                                  onClick={() => {
                                    handleThemeChange(v.id);
                                  }}
                                >
                                  {v?.attributes?.title}
                                </NavLink>
                              </li>
                            </>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bottom-container">
              <div className="text">
                &copy; {year} &nbsp;
                <span>
                  <Link to="/"> AVENTURAS </Link>
                </span>
                &nbsp;All Rights Reserved.
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Footer;
