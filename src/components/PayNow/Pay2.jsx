import React, { useState, useEffect } from "react";
import { Button, Steps, theme, Modal, notification } from "antd";
import { Card, Col, Row, Select } from "antd";
import Login from "../Auth/Login";
import axios from "axios";
import "./PayNow.scss";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";
import { API } from "../../api/apirequest";

const Step1Content = ({
  data,
  setData,
  validateInput,
  setErrors,
  errors,
  togglepaynow,
  settogglepaynow,
  setmodalopen,
  modal2open,
}) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    if (name === "amount") {
      updatedValue = parseInt(value);
    }

    setData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: updatedValue,
        total_amount: name === "amount" ? updatedValue : prevData.total_amount,
      };

      return updatedData;
    });
  };

  useEffect(() => {
    const userDataStrings = localStorage.getItem("user");

    const userDatas = JSON.parse(userDataStrings);
    if (userDatas && userDatas.jwt) {
      settogglepaynow(true);
      setmodalopen(false);
    }
  }, []);
  console.log(data)

  return (
    <>
      {!togglepaynow ? <div className="">Login Required</div> : null}
      <div className={`myformContainer ${!togglepaynow ? "disabled" : ""} `}>
        <div className="inputField">
          <label
            htmlFor="customer_name"
            style={{ fontWeight: "bold", color: "black" }}
          >
            User Name{" "}
          </label>
          <span
            style={{ display: "flex", flexDirection: "column", gap: "5px" }}
          >
            <input
              type="text"
              name="customer_name"
              value={data.customer_name}
              onChange={handleChange}
              placeholder={"Enter your name"}
            />
            {errors.customer_name && (
              <div
                className="error-text"
                style={{ color: "red", fontSize: "12px" }}
              >
                {errors.customer_name}
              </div>
            )}
          </span>
        </div>
        <div className="inputField">
          <label
            htmlFor="customer_email"
            style={{ fontWeight: "bold", color: "black" }}
          >
            User Email{" "}
          </label>

          <span
            style={{ display: "flex", flexDirection: "column", gap: "5px" }}
          >
            <input
              type="email"
              name="customer_email"
              onChange={handleChange}
              value={data.customer_email}
              placeholder={"Enter Your Email "}
            />
            {errors.customer_email && (
              <div
                className="error-text"
                style={{ color: "red", fontSize: "12px" }}
              >
                {errors.customer_email}
              </div>
            )}
          </span>
        </div>

        <div className="inputField">
          <label
            htmlFor="customer_mobile_number"
            style={{ fontWeight: "bold", color: "black" }}
          >
            Mobile Number
          </label>

          <span
            style={{ display: "flex", flexDirection: "column", gap: "5px" }}
          >
            <input
              type="number"
              name="customer_mobile_number"
              onChange={handleChange}
              value={data.customer_mobile_number}
              placeholder={"Enter Mobile Number"}
            />
            {errors.customer_mobile_number && (
              <div
                className="error-text"
                style={{ color: "red", fontSize: "12px" }}
              >
                {errors.customer_mobile_number}
              </div>
            )}
          </span>
        </div>
        <div className="inputField">
          <label
            htmlFor="amount"
            style={{ fontWeight: "bold", color: "black" }}
          >
            Amount
          </label>
          <span
            style={{ display: "flex", flexDirection: "column", gap: "5px" }}
          >
            <input
              type="number"
              name="amount"
              onChange={handleChange}
              required
              value={data.amount}
              placeholder={"Enter the Amount"}
            />
            {errors.amount && (
              <div
                className="error-text"
                style={{ color: "red", fontSize: "12px" }}
              >
                {errors.amount}
              </div>
            )}
          </span>
        </div>
      </div>
    </>
  );
};
const Step2Content = ({
  data,
  setData,
  setOpen,
  setMethod,
  method,
  isCheckboxChecked,
  onCheckboxChange,
  handleCheckboxChange,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top-left corner (0, 0) when the component mounts
  }, []);
  const [isUPIChecked, setUPIIsChecked] = useState(false);
  const [isCARDChecked, setCARDIsChecked] = useState(false);

  // Store the original amount from the data object
  const originalAmount = parseInt(data.amount);
  const netAmountUPI = parseInt(data.amount);

  // Store convenience fees and net amount for UPI and CARD
  const [convenienceFeesUPI] = useState(0); // Assuming convenience fees are 0 for UPI
  const [convenienceGSTFeesUPI] = useState(convenienceFeesUPI * (18 / 100));

  const [convenienceFeesCARD] = useState((originalAmount * 2) / 100);
  const [convenienceGSTFeesCARD] = useState(convenienceFeesCARD * (18 / 100));
  const [netAmountCARD] = useState(
    originalAmount + convenienceFeesCARD + convenienceGSTFeesCARD
  );

  const handleRadioChange = (selectedMethod) => {
    if (selectedMethod === "CREDIT CARD" && method !== "CREDIT CARD") {
      setMethod("CREDIT CARD");
      setUPIIsChecked(false);
      setCARDIsChecked(true);

      setData((prevData) => ({
        ...prevData,
        PaymentMode: "CREDIT CARD",
        convenience: parseFloat(convenienceFeesCARD.toFixed(2)),
        convenienceGST: parseFloat(convenienceGSTFeesCARD.toFixed(2)),
        amount: parseFloat(originalAmount.toFixed(2)),
        total_amount: parseFloat(netAmountCARD.toFixed(2)),
      }));
    } else if (selectedMethod === "UPI" && method !== "UPI") {
      setMethod("UPI");
      setUPIIsChecked(true);
      setCARDIsChecked(false);

      setData((prevData) => ({
        ...prevData,
        PaymentMode: "UPI",
        convenience: parseFloat(convenienceFeesUPI.toFixed(2)),
        convenienceGST: parseFloat(convenienceGSTFeesUPI.toFixed(2)),
        amount: parseFloat(originalAmount.toFixed(2)),
        total_amount: parseFloat(netAmountUPI.toFixed(2)),
      }));
    }
  };

  return (
    <div>
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderTop: "2px solid grey",
          padding: "10px",
          width: "100%",
        }}
      >
        <div className="Payment_card_section">
          <div
            className="card_section"
            onClick={() => handleRadioChange("UPI")}
          >
            <div
              className=""
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
                height: "50%",
                gap: "10px",
              }}
            >
              <input
                name="UPIPay"
                value="UPI"
                type="radio"
                checked={method === "UPI"}
                onChange={handleRadioChange}
              />
              <img
                width="40"
                height="40"
                src="https://admin.aventuras.co.in/uploads/bhim_2871091c08.png"
                alt="bhim"
              />
              <div className="text_value">UPI</div>
            </div>

            <div
              style={{
                height: "50%",
                width: "100%",
                display: "flex",
                justifyContent: "start",
                fontSize: "x-small",
                fontWeight: "bold",
                color: "#008000",
                flexDirection: "column",
                gap: "0px",
              }}
            >
              <div style={{ marginBottom: "2px" }}>
                UPI,Debit Card,Net Banking Only
              </div>
              <div>No Charges Apply</div>
            </div>
          </div>
          <div
            className="card_section"
            onClick={() => handleRadioChange("CREDIT CARD")}
          >
            <div
              className=""
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
                height: "50%",
                gap: "10px",
              }}
            >
              <input
                name="UPIPay"
                value="CREDIT CARD"
                type="radio"
                checked={method === "CREDIT CARD"}
                onChange={handleRadioChange}
              />
              <img
                width="40"
                height="40"
                src="https://admin.aventuras.co.in/uploads/cred_card_bf94e09425.png"
                alt="credit-card"
              />

              <div className="text_value">Card</div>
            </div>

            <div
              style={{
                height: "50%",
                width: "100%",
                display: "flex",
                justifyContent: "start",
                fontSize: "x-small",
                fontWeight: "bold",
                color: "#008000",
                flexDirection: "column",
              }}
            >
              <div style={{ marginBottom: "2px" }}> Credit Card Only</div>
              <div>Gateway Charges May Apply</div>
            </div>
          </div>
        </div>
      </div>
      <div className="details_wrapper">
        {method === "UPI" ? (
          <>
            <div className="myredcolor">
              Proceed with payment by clicking checkbox below.
            </div>

            <div
              className=""
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                return (
                  setOpen(true), setUPIIsChecked(false), setCARDIsChecked(true)
                );
              }}
            >
              <input
                style={{ background: "#008000" }}
                type="checkbox"
                checked={isCheckboxChecked}
                onChange={handleCheckboxChange}
              />

              <span style={{ fontWeight: "600" }}>
                Accept Terms and Condition
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="myredcolor">
              Proceed with payment by clicking checkbox below.
            </div>
            <div
              className=""
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                justifyContent: "center",
                gap: "1rem",
              }}
              onClick={() => {
                return (
                  setOpen(true), setUPIIsChecked(false), setCARDIsChecked(true)
                );
              }}
            >
              <input
                style={{ background: "#008000" }}
                type="checkbox"
                checked={isCheckboxChecked}
                onChange={handleCheckboxChange}
              />

              <span style={{ fontWeight: "600" }}>
                Accept Terms and Condition
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
const Step3Content = ({ data, coupons, setData }) => {
  console.log(coupons)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [initialAmount, setInitialAmount] = useState(data.total_amount);
  useEffect(() => {
    setInitialAmount(data.total_amount);
  }, []);

  const [showDiscount, setShowDiscount] = useState(false);

  const handleCouponChange = (value) => {
    if (value === "cancel") {
      setShowDiscount(false);
      setData((prevData) => ({
        ...prevData,
        discounted_amount: null,
        total_amount: parseFloat(initialAmount).toFixed(2),
        coupon_selected: null,
      }));
      return;
    }

    const selectedCoupon = coupons.find(
      (coupon) => coupon.attributes.code === value
    );

    if (!selectedCoupon) {
      return;
    }
    console.log(selectedCoupon)
    const flatDiscount = parseFloat(selectedCoupon.attributes.flat_amount);
    const percentageDiscount = parseFloat(
      selectedCoupon.attributes.discount_percentage
    );

    let discountedAmount = null;

    if (flatDiscount > 0) {
      discountedAmount = flatDiscount.toFixed(2);
    } else if (percentageDiscount > 0) {
      const percentageAmount = (percentageDiscount / 100) * initialAmount;
      discountedAmount = percentageAmount.toFixed(2);
    }

    if (discountedAmount !== null) {
      const newAmount = initialAmount - parseFloat(discountedAmount);
      const roundedAmount = Math.max(newAmount, 0).toFixed(2);

      setData((prevData) => ({
        ...prevData,
        discounted_amount: parseFloat(discountedAmount).toFixed(2),
        total_amount: roundedAmount,
        coupon_selected: selectedCoupon.attributes.code,
      }));
      setShowDiscount(true);
    } else {
      setShowDiscount(false);
      setData((prevData) => ({
        ...prevData,
        discounted_amount: null,
        total_amount: parseFloat(initialAmount).toFixed(2),
        coupon_selected: null,
      }));
    }
  };

  return (
    <div>
      <Row
        gutter={10}
        className="step3tableContainer"
        style={{ fontWeight: "bold" }}
      >
        <Col span={12} className="step3tableColumn">
          <Card
            headStyle={{
              color: "RGB(0 194 255)",
              textAlign: "center",
              fontWeight: "bold",
            }}
            title=" User Details"
            bordered={false}
          >
            <div className="" style={{ width: "100%" }}>
              <div
                className=""
                style={{ textAlign: "center", fontWeight: "bold" }}
              ></div>

              <table style={{ width: "100%", textAlign: "center", borderRadius: "20px", }}>
                <tbody border="2" style={{ display: "flex", flexDirection: "column", gap: "25px" }}  >
                  <tr style={{ borderBottom: "0.5px solid grey", display: "flex", gap: "25px", }}  >
                    <td className="mylasttd">Name :</td>
                    <td style={{ width: "100%" }}>{data.customer_name}</td>
                  </tr>
                  <tr style={{ borderBottom: "0.5px solid grey", display: "flex", gap: "25px", }} >
                    <td className="mylasttd">Email :</td>
                    <td style={{ width: "100%" }}>{data.customer_email}</td>
                  </tr>
                  <tr style={{ borderBottom: "0.5px solid grey", display: "flex", gap: "25px", }} >
                    <td className="mylasttd">Mobile Number :</td>
                    <td style={{ width: "100%" }}>
                      {data.customer_mobile_number}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {coupons.length > 0 ? (
            <>
              <div className="coupons-text">Apply Coupons :</div>
              <Select
                defaultValue="cancel"
                size="large"
                className="myselectcoupons"
                placeholder="Apply Coupons"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={[
                  ...coupons.map((coupon) => ({
                    value: `${coupon.attributes.code}`,
                    label: `${coupon.attributes.code} | Discount for above ${coupon.attributes.flat_amount} INR`,
                  })),
                  { value: "cancel", label: "Apply Coupons" },
                ]}
                onChange={(value) => {
                  if (value === "cancel") {
                    setData((prevData) => ({
                      ...prevData,
                      discounted_amount: null,
                      total_amount: initialAmount,
                    }));
                  }
                  handleCouponChange(value);
                }}
              />
              {showDiscount ? (
                <>
                  <div>
                    <br />{" "}
                    <span
                      style={{ padding: ".2rem", backgroundColor: "palegreen" }}
                    >
                      {"\u2705"} Coupon Code Applied !
                    </span>
                  </div>
                </>
              ) : null}
            </>
          ) : null}
        </Col>
        <Col span={12} className="step3tableColumn">
          <Card
            headStyle={{
              color: "RGB(0 194 255)",
              textAlign: "center",
              fontWeight: "bold",
            }}
            title="Payment Details"
            bordered={false}
          >
            <table
              className="mysecondtable"
              style={{
                width: "100%",
                textAlign: "center",
                borderRadius: "20px",
              }}
            >
              {data.PaymentMode === "UPI" ? (
                <>
                  <tbody
                    border="2"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "25px",
                    }}
                  >
                    <tr
                      style={{
                        borderBottom: "0.5px solid grey",
                        display: "flex",
                        gap: "25px",
                      }}
                    >
                      <td className="mylasttd">PaymentMode:</td>
                      <td style={{ width: "100%" }}>{data.PaymentMode}</td>
                    </tr>
                    <tr
                      style={{
                        borderBottom: "0.5px solid grey",
                        display: "flex",
                        gap: "25px",
                      }}
                    >
                      <td className="mylasttd">Booking Amount :</td>
                      <td style={{ width: "100%" }}>{data.amount}</td>
                    </tr>

                    <tr
                      style={{
                        borderBottom: "0.5px solid grey",
                        display: "flex",
                        gap: "25px",
                      }}
                    >
                      <td className="mylasttd">PG Charges on UPI (0%):</td>
                      <td style={{ width: "100%" }}>{data.convenience}</td>
                    </tr>

                    <tr
                      style={{
                        borderBottom: "0.5px solid grey",
                        display: "flex",
                        gap: "25px",
                      }}
                    >
                      <td className="mylasttd"> GST on PG Charges (0%):</td>
                      <td style={{ width: "100%" }}>{data.convenienceGST}</td>
                    </tr>
                    {data.total_amount >= data.discounted_amount ? (
                      <>
                        {showDiscount ? (
                          <>
                            {coupons.length > 0 ? (
                              <>
                                <tr
                                  style={{
                                    borderBottom: "0.5px solid grey",
                                    display: "flex",
                                    gap: "25px",
                                    backgroundColor: "palegreen",
                                  }}
                                >
                                  <td className="mylasttd">Coupon Discount:</td>
                                  <td style={{ width: "100%" }}>
                                    {`- ${parseInt(data.discounted_amount)}`}
                                  </td>
                                </tr>
                              </>
                            ) : null}
                          </>
                        ) : null}
                      </>
                    ) : null}

                    <tr
                      style={{
                        borderBottom: "0.5px solid grey",
                        display: "flex",
                        gap: "25px",
                      }}
                    >
                      <td className="mylasttd">Total Amount :</td>
                      <td style={{ width: "100%" }}>{data.total_amount}</td>
                    </tr>
                  </tbody>
                </>
              ) : (
                <>
                  <tbody
                    border="2"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "25px",
                    }}
                  >
                    <tr
                      style={{
                        borderBottom: "0.5px solid grey",
                        display: "flex",
                        gap: "25px",
                      }}
                    >
                      <td style={{ width: "50%" }}>PaymentMode:</td>
                      <td style={{ width: "50%" }}>{data.PaymentMode}</td>
                    </tr>
                    <tr
                      style={{
                        borderBottom: "0.5px solid grey",
                        display: "flex",
                        gap: "25px",
                      }}
                    >
                      <td className="mylasttd">Booking Amount :</td>
                      <td className="mylasttd">{data.amount}</td>
                    </tr>

                    <tr
                      style={{
                        borderBottom: "0.5px solid grey",
                        display: "flex",
                        gap: "25px",
                      }}
                    >
                      <td className="mylasttd">
                        PG Charges on Credit Card (2%):
                      </td>
                      <td className="mylasttd">{data.convenience}</td>
                    </tr>

                    <tr
                      style={{
                        borderBottom: "0.5px solid grey",
                        display: "flex",
                        gap: "25px",
                      }}
                    >
                      <td className="mylasttd"> GST on PG Charges (18%):</td>
                      <td className="mylasttd">{data.convenienceGST}</td>
                    </tr>

                    {data.total_amount >= data.discounted_amount ? (
                      <>
                        {showDiscount ? (
                          <>
                            {coupons.length > 0 ? (
                              <>
                                <tr
                                  style={{
                                    borderBottom: "0.5px solid grey",
                                    display: "flex",
                                    gap: "25px",
                                    backgroundColor: "palegreen",
                                  }}
                                >
                                  <td className="mylasttd">Coupon Discount:</td>
                                  <td
                                    className="mylasttd"
                                    style={{ width: "100%" }}
                                  >
                                    {`- ${parseInt(data.discounted_amount)}`}
                                  </td>
                                </tr>
                              </>
                            ) : null}
                          </>
                        ) : null}
                      </>
                    ) : null}
                    <tr style={{ borderBottom: "0.5px solid grey", display: "flex", gap: "25px", }} >
                      <td className="mylasttd">Total Amount :</td>
                      <td className="mylasttd">{data.total_amount}</td>
                    </tr>
                  </tbody>
                </>
              )}
            </table>
          </Card>
        </Col>
      </Row>
      <Row className="step3tableContainer">
        <Col span={12} className="step3tableColumn">
          <div className="mylastrow" style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "20px", }} >
            <div className="total_row">
              <div className="" style={{ width: "100%", textAlign: "center", color: "rgb(0,194,255)", }} >
                Total Payable Amount{" "}
              </div>
              <div className="" style={{ width: "100%", textAlign: "center", color: "#008000" }}>
                Rs. {data.total_amount}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
const Style = {
  StepWrapper: { display: "flex", justifyContent: "center", width: "100%", },
  StepContainer: { width: "100%" },
};

const Pay2 = () => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsCheckboxChecked((prevCheckboxState) => !prevCheckboxState);
  };

  const [open, setOpen] = useState(false);
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const [data, setData] = useState({
    customer_name: "",
    customer_email: "",
    customer_mobile_number: "",
    customer_package_id: "",
    amount: null,
    PaymentMode: "UPI",
    convenience: 0,
    convenienceGST: 0,
    discounted_amount: null,
    coupons: null,
    coupon_selected: null,
    total_amount: null,
  });

  const [allData, setallData] = useState();
  const [method, setMethod] = useState("UPI");

  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(false);

  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);

  const [mycoupons, setMyCoupons] = useState([]);

  const getCouponsForUser = async () => {
    try {
      if (userData && userData.isLoggedin === true) {
        const today = new Date().toISOString().split("T")[0];
        const coupons = await API.get(
          `/api/coupon-codes?populate=*&filter[attributes][validity][$gte]=${today}`
        );

        if (coupons.data.data && coupons.data.data.length > 0) {
          let userCoupons = [];
          userCoupons = coupons.data.data.filter(
            (coupon) =>
              coupon?.attributes?.validity >= today &&
              coupon?.attributes?.user?.data?.attributes?.username === userData?.username
          );
          if (userData.info.user.coupon_amount && userData.info.user.coupon_name) {
            userCoupons.push({
              "id": 30,
              "attributes": {
                "code": userData.info.user.coupon_name,
                "flat_amount": userData.info.user.coupon_amount,
                "validity": "2024-02-10",
                "createdAt": "2024-01-04T05:42:19.459Z",
                "updatedAt": "2024-01-08T07:21:14.020Z",
                "publishedAt": "2024-01-04T05:42:20.480Z",
                "coupon_used": false,
                "coupon_type": "FLAT_DISCOUNT",
                "discount_percentage": "0"
              }
            });
          }

          setMyCoupons(userCoupons);
          setData((prevData) => ({
            ...prevData,
            coupons: userCoupons, // Set user-specific coupons in data state
          }));

          return userCoupons; // Return coupons specific to the user
        } else {

        }

      } else {
        return [];
      }
    } catch (error) {
      console.error("Error fetching coupons:", error);
      return [];
    }
  };
  useEffect(() => {
    if (userData && userData.isLoggedin === true) {
      setLogin(true);

      const userCoupons = getCouponsForUser();
      const getDataLogin = async () => {
        try {
          const initialQuery = {
            customer_name: userData.info.user.username,
            customer_email: userData.info.user.email,
            customer_mobile_number: userData.info.user.mobile_number,
            customer_package_id: "",
            amount: null,
            PaymentMode: "UPI",
            convenience: 0,
            convenienceGST: 0,
            discounted_amount: null,
            coupons: userCoupons,
            coupon_selected: null,
            total_amount: null,
          };
          setData(initialQuery);
        } catch (err) {
          // console.log(err)
        }
      };
      getDataLogin();
    } else {
      setLogin(false);
      const getData = async () => {
        try {
          const initialQuery = {
            customer_name: "",
            customer_email: "",
            customer_mobile_number: "",
            customer_package_id: "",
            amount: null,
            PaymentMode: "UPI",
            convenience: 0,
            convenienceGST: 0,
            discounted_amount: null,
            coupons: null,
            coupon_selected: null,
            total_amount: null,
          };
          setData(initialQuery);
          setLoading(false);
        } catch (err) {
          // console.log(err)
          setLoading(true);
        }
      };
      getData();
    }
    window.scrollTo(0, 0);
  }, []);


  const [errors, setErrors] = useState({
    customer_name: "",
    customer_email: "",
    customer_mobile_number: "",
    amount: "",
  });

  const validateInput = () => {
    const newErrors = {};
    let isValid = true;

    if (data.customer_name.trim() === "") {
      newErrors.customer_name = "Customer name is required.";
      isValid = false;
    } else {
      newErrors.customer_name = "";
    }

    if (!/^\S+@\S+\.\S+$/.test(data.customer_email)) {
      newErrors.customer_email = "Enter a valid email address.";
      isValid = false;
    } else {
      newErrors.customer_email = "";
    }

    if (!/^\d{10}$/.test(data.customer_mobile_number)) {
      newErrors.customer_mobile_number =
        "Enter a valid 10-digit mobile number.";
      isValid = false;
    } else {
      newErrors.customer_mobile_number = "";
    }

    if (!/^\d+(\.\d{2})?$/.test(data.amount)) {
      newErrors.amount = "Enter Amount atleast 1 INR.";
      isValid = false;
    } else if (data.amount == 0 || null) {
      newErrors.amount = "Enter Amount atleast 1 INR.";
      isValid = false;
    } else {
      newErrors.amount = "";
    }

    setErrors(newErrors);
    return isValid;
  };
  const [togglepaynow, settogglepaynow] = useState();
  const [toggleRegister, settoggleRegister] = useState(false);
  const [modal2open, setmodalopen] = useState();
  const steps = [
    {
      title: "User Information",
      content: (
        <Step1Content
          data={data}
          setData={setData}
          errors={errors}
          setErrors={setErrors}
          validateInput={validateInput}
          togglepaynow={togglepaynow}
          settogglepaynow={settogglepaynow}
          setmodalopen={setmodalopen}
          modal2open={modal2open}
        />
      ),
      icon: (
        <img
          width="40"
          height="40"
          src="https://admin.aventuras.co.in/uploads/user1_4adce49057.png"
          alt="user"
        />
      ),
    },
    {
      title: "Payment Option",
      content: (
        <Step2Content
          data={data}
          setData={setData}
          setallData={setallData}
          allData={allData}
          setOpen={setOpen}
          method={method}
          setMethod={setMethod}
          isCheckboxChecked={isCheckboxChecked}
          onCheckboxChange={handleCheckboxChange}
        />
      ),
      icon: (
        <img
          width="40"
          height="40"
          src="https://admin.aventuras.co.in/uploads/payment_method_cc2c6d92da.png"
          alt="cards"
        />
      ),
    },
    {
      title: "Pay",
      content: (
        <Step3Content
          data={data}
          setData={setData}
          isCheckboxChecked={isCheckboxChecked}
          onCheckboxChange={handleCheckboxChange}
          coupons={mycoupons}
        />
      ),
      icon: (
        <img
          width="40"
          height="40"
          src="https://admin.aventuras.co.in/uploads/approval_b7a9261d90.png"
          alt="done"
        />
      ),
    },
  ];
  const navigate = useNavigate();
  const next = () => {
    const userDataString = localStorage.getItem("user");
    const userData = JSON.parse(userDataString);
    if (userData && userData.jwt) {
      if (validateInput()) {
        setCurrent(current + 1);
      }
    } else {
      localStorage.setItem("paynowData", JSON.stringify(data));
      notification.error({
        message: "Login To PayNow!",
        description: "Redirecting to Login Page",
        duration: 1,
      });

      setTimeout(() => {
        settogglepaynow(false)
      }, 1000)
    }
  };

  const prev = () => {
    if (current === 1) {
      window.location.reload();
    }

    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon,
  }));
  const contentStyle = {
    backgroundColor: "#ffff",
    borderRadius: token.borderRadiusLG,
    marginTop: 26,
  };


  const [currentPath, setCurrentPath] = useState();
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  });

  localStorage.setItem("pathName", currentPath);

  // payment without coupons
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    const userDataString = localStorage.getItem("user");
    const userData = JSON.parse(userDataString);
    if (userData && userData.jwt) {
      try {
        const payload = {
          customer_name: userData.info.user.username,
          customer_email: userData.info.user.email,
          customer_mobile_number: parseInt(data.customer_mobile_number),
          booking_amount: data.amount,
          amount: parseFloat(data.total_amount),
          payment_mode: data.PaymentMode,
          discounted_amount: parseFloat(data.discounted_amount),
          coupon_selected: data.coupon_selected,
        };
        let ob = payload;
        const res = await axios.post(
          "https://aventuras.co.in/api/v1/payment/initiate_payment",
          ob
        );

        if (res.data.data.success === true) {
          const url = res.data.data.data.instrumentResponse.redirectInfo.url;
          const userConfirmed = window.confirm(
            "Are you sure you want to proceed with the payment?"
          );

          if (userConfirmed) {
            window.open(url, "_blank");
          } else {
            window.location.reload();
            notification.error({
              message: "Payment Cancelled!",
              duration: 2,
            });
          }
          setData(null);
        }
      } catch (err) {
        // console.log(err)
      }
    } else {
      notification.info({
        message: "Login to Pay Now!",
        duration: 2,
      });
    }
  };

  const handlePaymentSubmitWithCoupons = async (e) => {
    e.preventDefault();
    const userDataString = localStorage.getItem("user");
    const userData = JSON.parse(userDataString);
    if (userData && userData.jwt) {
      try {
        const payload = {
          customer_name: userData.info.user.username,
          customer_email: userData.info.user.email,
          customer_mobile_number: parseInt(data.customer_mobile_number),
          booking_amount: data.amount,
          amount: parseFloat(data.total_amount),
          payment_mode: data.PaymentMode,
          discounted_amount: parseFloat(data.discounted_amount),
          coupon_selected: data.coupon_selected,
        };
        let ob = payload;
        const res = await axios.post(
          "https://aventuras.co.in/api/v1/payment/initiate_payment_with_coupon",
          ob
        );

        if (res.data.data.success === true) {
          const url = res.data.data.data.instrumentResponse.redirectInfo.url;

          const userConfirmed = window.confirm(
            "Are you sure you want to proceed with the payment?"
          );

          if (userConfirmed) {
            window.open(url, "_blank");

          } else {
            window.location.reload();
            notification.error({
              message: "Payment Cancelled!",
              duration: 2,
            });
          }
          setData(null);
        }
      } catch (err) {
        // console.log(err)
      }
    } else {
      notification.info({
        message: "Login to Pay Now!",
        duration: 2,
      });
    }
  };
  const [toggle, setToggle] = useState(true)

  return (
    <>

      {!togglepaynow ? (
        <Modal
          style={{ textAlign: 'center' }}
          className="modalLogin"
          title={null}
          centered
          open={!togglepaynow}
          footer={false}
          onCancel={() => {
            navigate('/')
          }}
        >
          <Login toggle={toggle} setToggle={setToggle} settoggleRegister={settoggleRegister} toggleRegister={toggleRegister} />

        </Modal>
      ) : (
        ""
      )}
      <div className="" style={Style.StepWrapper}>
        <div className="" style={Style.StepContainer}>
          <Steps
            direction="horizontal"
            current={current}
            style={{ fontWeight: "bold" }}
            items={items}
            responsive={{
              small: {
                direction: "horizontal",
              },
              medium: {
                direction: "horizontal",
              },
              large: {
                direction: "horizontal",
              },
            }}
            className="disabled"
          />
          <div style={contentStyle}>{steps[current].content}</div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            {current > 0 && (
              <Button
                type="primary"
                className="prevButton"
                onClick={() => prev()}
              >
                Previous
              </Button>
            )}
            {current === 0 && togglepaynow && (
              <Button
                type="primary"
                className="nextButton"
                onClick={() => next()}
              >
                Next
              </Button>
            )}

            {current === steps.length - 1 && (
              <>
                {data.coupon_selected ? (
                  <>
                    <Button
                      className="mypayButton"
                      style={{
                        backgroundColor: data.coupon_selected
                          ? "green"
                          : "#008000",
                      }}
                      onClick={handlePaymentSubmitWithCoupons}
                    >
                      Apply Coupon and Pay
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className="mypayButton"
                      style={{
                        backgroundColor: data.coupon_selected
                          ? "green"
                          : "#008000",
                      }}
                      onClick={handlePaymentSubmit}
                    >
                      Pay
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div>
        <Modal
          style={{ textAlign: "center" }}
          title={method}
          centered
          open={open}
          onCancel={() => {
            setOpen(false);
            setIsCheckboxChecked(false);
          }}
          width={550}
          footer={null}
        >
          {method === "UPI" ? (
            <>
              <div
                className=""
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0px",
                  fontWeight: "bold",
                  fontSize: "13px",
                  margin: '1rem'
                }}
              >
                <div> No Payment Gateway Charges Applicable</div>
                <table border="1">
                  <thead></thead>
                  <tbody className="mytbody">
                    <tr>
                      <td className="mytd">Booking Amount</td>
                      <td className="mytd">₹ {data.amount}</td>
                    </tr>
                    <tr>
                      <td className="mytd">Payment Gateway Charges (0%)</td>
                      <td className="mytd">₹ {data.convenience}</td>
                    </tr>{" "}
                    <tr>
                      <td className="mytd">
                        GST on Payment Gateway Charges (18%)
                      </td>
                      <td className="mytd">₹ {data.convenienceGST}</td>
                    </tr>{" "}
                    <tr>
                      <td className="mytd">Total Applicable Amount</td>
                      <td className="mytd">₹ {data.total_amount}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="" style={{ margin: "20px 0px" }}>
                  <div style={{ color: "red", fontWeight: "550" }}>
                    Use this option only if you want to use payment options
                    other than credit card. If the user uses this option and
                    proceeds to pay through credit card on payment gateway,
                    payment gateway charges as applicable will be deducted from
                    the paid amount and the rest amount will be considered as
                    final booking amount
                  </div>
                  <div>
                    To make payments through credit card go back and use credit
                    card payment option
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="" style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "0px", marginBottom: "20px", fontWeight: "bold", margin: '1rem' }}>
                <table border="1">
                  <thead></thead>
                  <tbody className="mytbody">
                    <tr>
                      <td className="mytd">Booking Amount</td>
                      <td className="mytd">₹ {data.amount}</td>
                    </tr>
                    <tr>
                      <td className="mytd">Payment Gateway Charges (2%)</td>
                      <td className="mytd">₹ {data.convenience}</td>
                    </tr>{" "}
                    <tr>
                      <td className="mytd">
                        GST on Payment Gateway Charges (18%)
                      </td>
                      <td className="mytd">₹ {data.convenienceGST}</td>
                    </tr>{" "}
                    <tr>
                      <td className="mytd">Total Applicable Amount</td>
                      <td className="mytd">₹ {data.total_amount}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="" style={{ margin: "20px 0px" }}>
                  <div style={{ color: "red", fontWeight: "550" }}>
                    Payment gateway charges are non-refundable under any
                    scenarios
                  </div>
                  <div>Use UPI payment option to avoid charges !</div>
                </div>
              </div>
            </>
          )}

          <button
            type="primary"
            style={{
              textAlign: "center",
              border: "none",
              outline: "none",
              borderRadius: "5px",
              background: "linear-gradient(90deg, #f7971e 0%, #ffd200 100%)",
              fontWeight: "bold",
              color: "black",
              padding: "5px",
              cursor: "pointer",
              marginBottom: '1rem'
            }}
            onClick={() => {
              return setOpen(false), next();
            }}
          >
            Click here if You Understand and accept the Payment terms
          </button>
        </Modal>
      </div>
    </>
  );
};

export default Pay2;
