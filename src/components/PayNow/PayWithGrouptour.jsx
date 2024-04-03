import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  message,
  Steps,
  theme,
  Modal,
  notification,
  Space,
} from "antd";
import { Card, Col, Row } from "antd";

import {
  LoadingOutlined,
  CheckCircleOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";

import axios from "axios";
import "./PayNow2.scss";
import { API, baseURL } from "../../api/apirequest";

const Step1Content = ({
  data,
  setData,
  validateInput,
  setErrors,
  errors,
  today,
  partialPayment,
  setPartialPayment,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [currentPath, setCurrentPath] = useState();

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);
  localStorage.setItem("pathName", currentPath);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    // Check if the name is "amount" and then convert the value to an integer
    if (name === "amount") {
      updatedValue = parseInt(value);
    }

    setData((prevData) => {
      // Create a copy of the previous data and update both 'amount' and 'total_amount'
      const updatedData = {
        ...prevData,
        [name]: updatedValue,
        total_amount: name === "amount" ? updatedValue : prevData.total_amount,
      };

      return updatedData;
    });
  };

  return (
    <>
      <div className="myformWrapper2">
        <div className="myformContainer2">
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
                disabled
                name="customer_name"
                value={data.customer_name}
                onChange={handleChange}
                placeholder={"Enter your name"}
              />
              {errors.customer_name && (
                <div className="error-text" style={{ color: "red" }}>
                  {errors.customer_name}
                </div>
              )}
            </span>
            {/*  */}
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
                disabled
                name="customer_email"
                onChange={handleChange}
                value={data.customer_email}
                placeholder={"Enter Your Email "}
              />
              {errors.customer_email && (
                <div className="error-text" style={{ color: "red" }}>
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
                  style={{ color: "red", fontSize: "11px" }}
                >
                  {errors.customer_mobile_number}
                </div>
              )}
            </span>
            {/* <input
            type="number"
            // style={{
            //   width: "68%",
            //   height: "50px",
            //   borderRadius: "5px",
            //   padding:'10px',
            //   color:` ${errors.customer_mobile_number ? 'red' : 'black'}`,
            //   border: `2px solid ${errors.customer_mobile_number ? 'red' : 'green'}`,  
            //            }}
            name="customer_mobile_number"
            onChange={handleChange}
            value={data.customer_mobile_number}
            placeholder={"Enter Mobile Number"}
          /> */}
          </div>

          {/* <div className="inputField">
            <label
              htmlFor="booking_notes"
              style={{ fontWeight: "bold", color: "black" }}
            >
              Booking notes{" "}
            </label>
            <textarea
              id="booking_notes"
              rows={2}
              cols={35}
              name="booking_notes"
              onChange={handleChange}
              placeholder="Write a note..."
            />
          </div> */}
          {/* new  */}

          <div className="inputField">
            <label
              htmlFor="customer_location"
              style={{ fontWeight: "bold", color: "black" }}
            >
              Customer Location
            </label>
            <span
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <input
                type="text"
                disabled
                name="customer_location"
                onChange={handleChange}
                value={data.customer_location}
              />
            </span>{" "}
          </div>

          <div className="inputField">
            <label
              htmlFor="adults"
              style={{ fontWeight: "bold", color: "black" }}
            >
              Adults
            </label>
            <span
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <input
                type="number"
                disabled
                name="adults"
                onChange={handleChange}
                required
                value={data.adults}
                placeholder={"Adults"}
              />
            </span>
          </div>

          <div className="inputField">
            <label
              htmlFor="trip_start_date"
              style={{ fontWeight: "bold", color: "black" }}
            >
              Trip Start Date
            </label>
            <span
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <input
                type="date"
                disabled
                name="trip_start_date"
                onChange={handleChange}
                required
                value={data.trip_start_date}
                placeholder={"trip-start-date"}
                min={today}
              />
            </span>
          </div>
        </div>
        <div className="myformContainer2">
          <div className="inputField">
            <label
              htmlFor="customer_package_id"
              style={{ fontWeight: "bold", color: "black" }}
            >
              Package ID{" "}
            </label>
            <span
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <input
                type="text"
                disabled
                name="customer_package_id"
                value={data.customer_package_id}
                onChange={handleChange}
                placeholder={"Enter Package ID"}
              />
            </span>
          </div>
          <div className="inputField">
            <label
              htmlFor="package_name"
              style={{ fontWeight: "bold", color: "black" }}
            >
              Package Name{" "}
            </label>

            <span
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <input
                type="email"
                disabled
                name="package_name"
                onChange={handleChange}
                value={data.package_name}
                placeholder={"Enter Package Name "}
              />
            </span>
          </div>

          <div className="inputField">
            <label
              htmlFor="amount"
              style={{ fontWeight: "bold", color: "black" }}
            >
              Initial Booking Amount
            </label>
            <span
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <input
                type="number"
                disabled
                name="amount"
                onChange={handleChange}
                required
                value={data.initial_package_amount}
                placeholder={"Enter the Amount"}
              />
            </span>
          </div>
          <div className="inputField">
            <label
              htmlFor="amount"
              style={{ fontWeight: "bold", color: "black" }}
            >
              Partial Booking %
            </label>
            <span
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <input
                type="number"
                disabled
                name="amount"
                onChange={handleChange}
                required
                value={data.partialPayment}
              />
            </span>
          </div>

          {/* new  */}
          <div className="inputField">
            <label
              htmlFor="amount"
              style={{ fontWeight: "bold", color: "black" }}
            >
              Payable Advance Amount
            </label>
            <span
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <input
                type="number"
                disabled
                name="amount"
                onChange={handleChange}
                required
                value={data.advance_amount}
                placeholder={"Enter the Amount"}
              />
            </span>
          </div>
          <div className="inputField">
            <label
              htmlFor="amount"
              style={{ fontWeight: "bold", color: "black" }}
            >
              Remaining Amount
            </label>
            <span
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <input
                type="number"
                disabled
                name="amount"
                onChange={handleChange}
                required
                value={data.remaining_amount}
                placeholder={"Enter the Amount"}
              />
            </span>
          </div>
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
    window.scrollTo(0, 0);
  }, []);

  const [currentPath, setCurrentPath] = useState();

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);
  localStorage.setItem("pathName", currentPath);
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
    if (selectedMethod === "CARD" && method !== "CARD") {
      setMethod("CARD");
      setUPIIsChecked(false);
      setCARDIsChecked(true);

      setData((prevData) => ({
        ...prevData,
        PaymentMode: "CARD",
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
                color: "green",
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
            onClick={() => handleRadioChange("CARD")}
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
                value="CARD"
                type="radio"
                checked={method === "CARD"}
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
                color: "green",
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
                style={{ background: "green" }}
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
                style={{ background: "green" }}
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

const Step3Content = ({ data }) => {
  let arrayData = [data];
  console.log(arrayData);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [currentPath, setCurrentPath] = useState();

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);
  localStorage.setItem("pathName", currentPath);
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

              <table
                style={{
                  width: "100%",
                  textAlign: "center",
                  borderRadius: "20px",
                }}
              >
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
                    <td className="mylasttd">Name :</td>
                    <td style={{ width: "100%" }}>{data.customer_name}</td>
                  </tr>
                  <tr
                    style={{
                      borderBottom: "0.5px solid grey",
                      display: "flex",
                      gap: "25px",
                    }}
                  >
                    <td className="mylasttd">Email :</td>
                    <td style={{ width: "100%" }}>{data.customer_email}</td>
                  </tr>
                  <tr
                    style={{
                      borderBottom: "0.5px solid grey",
                      display: "flex",
                      gap: "25px",
                    }}
                  >
                    <td className="mylasttd">Mobile Number :</td>
                    <td style={{ width: "100%" }}>
                      {data.customer_mobile_number}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
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
                    className="mytbody"
                  >
                    <tr
                      style={{
                        borderBottom: "0.5px solid grey",
                        display: "flex",
                        gap: "25px",
                      }}
                      className="mypgtabletr"
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
                      className="mypgtabletr"
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
                      className="mypgtabletr"
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
                      className="mypgtabletr"
                    >
                      <td className="mylasttd"> GST on PG Charges (0%):</td>
                      <td style={{ width: "100%" }}>{data.convenienceGST}</td>
                    </tr>

                    <tr
                      style={{
                        borderBottom: "0.5px solid grey",
                        display: "flex",
                        gap: "25px",
                      }}
                      className="mypgtabletr"
                    >
                      <td className="mylasttd">Total Payable Amount :</td>
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
                      className="mypgtabletr"
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
                      className="mypgtabletr"
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
                      className="mypgtabletr"
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
                      className="mypgtabletr"
                    >
                      <td className="mylasttd"> GST on PG Charges (18%):</td>
                      <td className="mylasttd">{data.convenienceGST}</td>
                    </tr>

                    <tr
                      style={{
                        borderBottom: "0.5px solid grey",
                        display: "flex",
                        gap: "25px",
                      }}
                      className="mypgtabletr"
                    >
                      <td className="mylasttd">Total Payable Amount :</td>
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
          <div
            className="mylastrow"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <div className="total_row">
              <div
                className=""
                style={{
                  width: "100%",
                  textAlign: "center",
                  color: "rgb(0,194,255)",
                }}
              >
                Total Payable Amount{" "}
              </div>
              <div
                className=""
                style={{ width: "100%", textAlign: "center", color: "green" }}
              >
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
  StepWrapper: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  StepContainer: {
    width: "100%",
    // border:'2px solid black'
  },
};
const PayWithGrouptour = ({ location }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [currentPath, setCurrentPath] = useState();

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);
  localStorage.setItem("pathName", currentPath);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsCheckboxChecked((prevCheckboxState) => !prevCheckboxState);
  };
  // Inside your component where state is managed
  const [partialPayment, setPartialPayment] = useState(0); // Initialize partial payment amount

  // Update the partialPayment state based on user selection
  const handlePartialPaymentChange = (e) => {
    const selectedPartialPayment = Number(e.target.value);
    setPartialPayment(selectedPartialPayment);
  };

  const today = new Date().toISOString().split("T")[0];

  const [data, setData] = useState({
    customer_name: "",
    customer_email: "",
    customer_mobile_number: "",
    customer_package_id: "",
    package_name: "",
    customer_location: "",
    adults: null,
    trip_start_date: "",
    booking_notes: "",
    amount: null,
    PaymentMode: "UPI",
    convenience: 0,
    convenienceGST: 0,

    booking_amount: null,

    initial_package_amount: null,

    partialPayment: null,
    advance_amount: null,
    remaining_amount: null,
    total_amount: null,
  });

  const [yourData, setYourData] = useState({});
  const [yourBatchData, setYourBatchData] = useState({});
  const [t, setT] = useState([]);

  const yourDataString = localStorage.getItem("preview_booking");

  const yourStoredBatchData = JSON.parse(localStorage.getItem("mybatch")) || {};

  useEffect(() => {
    try {
      const parsedData = yourDataString ? JSON.parse(yourDataString) : null;

      // Update state after parsing is successful
      setYourData(parsedData);
      setYourBatchData(yourStoredBatchData);
      const initialQuery = {
        customer_name: parsedData ? parsedData.user_name : "",
        customer_email: parsedData ? parsedData.email_id : "",
        customer_mobile_number: parsedData ? parsedData.contact_number : "",

        customer_package_id: parsedData ? parsedData.package_id : "",
        package_name: parsedData ? parsedData.package_name : "",
        customer_location: parsedData ? parsedData.current_location : "",
        adults: parsedData ? parsedData.adults : null,
        trip_start_date: parsedData ? parsedData.trip_start_date : "",
        selected_batch: yourStoredBatchData,

        booking_notes: "",

        // 'amount': null,
        PaymentMode: "UPI",
        convenience: 0,
        convenienceGST: 0,

        initial_package_amount: parsedData
          ? parsedData.initial_package_amount
          : 0,
        partialPayment: parsedData ? parsedData.partialPayment : 0,
        advance_amount: parsedData ? parsedData.advance_amount : 0,
        remaining_amount: parsedData ? parsedData.remaining_balance : 0,

        amount: parsedData ? parsedData.total_price : 0,
        total_amount: parsedData ? parsedData.total_price : 0,
      };

      setData(initialQuery);
      // Any other logic based on the parsed data can go here
    } catch (error) {
      console.error("Error parsing data:", error);
    }
  }, []);
  console.log(data);
  const [open, setOpen] = useState(false);
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const [allData, setallData] = useState();
  const [method, setMethod] = useState("UPI");
  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);

  const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(false);

  // FORM VALIDATION FOR USER DETAILS

  const [errors, setErrors] = useState({
    customer_name: "",
    customer_email: "",
    customer_mobile_number: "",
    amount: "",
  });

  const validateInput = () => {
    const newErrors = {};
    let isValid = true;

    // Validation rules for customer_name
    if (data.customer_name.trim() === "") {
      newErrors.customer_name = "Customer name is required.";
      isValid = false;
    } else {
      newErrors.customer_name = "";
    }

    // Validation rules for customer_email
    if (!/^\S+@\S+\.\S+$/.test(data.customer_email)) {
      newErrors.customer_email = "Enter a valid email address.";
      isValid = false;
    } else {
      newErrors.customer_email = "";
    }

    // Validation rules for customer_mobile_number
    // Example: You can add rules to check for a valid phone number format
    if (!/^\d{10}$/.test(data.customer_mobile_number)) {
      newErrors.customer_mobile_number =
        "Enter a valid 10-digit mobile number.";
      isValid = false;
    } else {
      newErrors.customer_mobile_number = "";
    }

    // Validation rules for amount
    // Example: You can add rules to check for a valid amount format
    if (!/^\d+(\.\d{2})?$/.test(data.amount)) {
      newErrors.amount = "Enter a valid amount (e.g., 10.00).";
      isValid = false;
    } else {
      newErrors.amount = "";
    }

    setErrors(newErrors);
    return isValid;
  };

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
          today={today}
          partialPayment={partialPayment}
          setPartialPayment={setPartialPayment}
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
      content: <Step3Content data={data} />,
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

  const next = () => {
    const userDataString = localStorage.getItem("user");
    const userData = JSON.parse(userDataString);
    // console.log(userData)
    if (userData && userData.jwt) {
      if (validateInput()) {
        setCurrent(current + 1);
        // console.log("from Next",data)
      }
    } else {
      notification.info({
        message: "Login to Pay Now!",
        // description: 'You have successfully logged in.',

        duration: 2, // Duration in seconds (adjust as needed)
      });
    }
  };

  const prev = () => {
    // console.log(current)
    if (current === 1) {
      // console.log('reloading on user content')
      window.location.reload();
    }
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon,
  }));
  const contentStyle: React.CSSProperties = {
    backgroundColor: "#ffff",
    borderRadius: token.borderRadiusLG,
    marginTop: 26,
  };

  // payment
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    const userDataString = localStorage.getItem("user");
    const userData = JSON.parse(userDataString);
    // console.log(userData)
    if (userData && userData.jwt) {
      const authToken = userData.jwt;

      try {
        const payload = {
          customer_name: userData.info.user.username,
          customer_email: userData.info.user.email,
          customer_mobile_number: parseInt(data.customer_mobile_number),
          customer_package_id: data.customer_package_id,
          payment_mode: data.PaymentMode,
          adults: data.adults,
          selected_batch: yourBatchData,

          initial_package_amount: data.initial_package_amount,

          booking_amount: data.amount,
          advance_amount: data.advance_amount,
          remaining_amount: data.remaining_amount,
          partialPayment: data.partialPayment,

          amount: data.total_amount,
        };
        // console.log(payload)
        let ob = payload;
        console.log(ob);

        const res = await axios.post(
          "https://aventuras.co.in/api/v1/payment/group_tour_initiate_payment",
          ob
        );

        if (res.data.data.success === true) {
          const url = res.data.data.data.instrumentResponse.redirectInfo.url;
          // console.log("portal url=> ",url)

          const userConfirmed = window.confirm(
            "Are you sure you want to proceed with the payment?"
          );

          if (userConfirmed) {
            // Open the URL in a new tab
            window.open(url, "_blank");
            // window.open("https://aventuras.co.in/","_blank")
          } else {
            window.location.reload();
            notification.error({
              message: "Payment Cancelled!",
              duration: 2, // Duration in seconds (adjust as needed)
            });
          }

          notification.success({
            message: "Payment done successfully!",

            duration: 2, // Duration in seconds (adjust as needed)
          });
          // console.log(res.data)
          setData(null);
        }
      } catch (err) {
        // console.log(err)
      }
    } else {
      notification.info({
        message: "Login to Pay Now!",
        duration: 2, // Duration in seconds (adjust as needed)
      });
    }
  };

  return (
    <>
      <div className="pay-page-container2">
        <div className="pay-pages">
          <div className="left">
            <div className="page-heading"> Group Tour Pay Now</div>

            <div className="" style={Style.StepWrapper}>
              <div className="" style={Style.StepContainer}>
                <Steps
                  current={current}
                  style={{ fontWeight: "bold" }}
                  items={items}
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
                  {current === 0 && (
                    <Button
                      type="primary"
                      className="nextButton"
                      onClick={() => next()}
                    >
                      Next
                    </Button>
                  )}
                  {current === steps.length - 1 && (
                    <Button
                      className="mypayButton"
                      style={{ backgroundColor: "green !important" }}
                      onClick={handlePaymentSubmit}
                    >
                      Pay
                    </Button>
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
                onCancel={() => setOpen(false)}
                width={600}
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
                            <td className="mytd">
                              Payment Gateway Charges (0%)
                            </td>
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
                          Use this option only if you want to use payment
                          options other than credit card. If the user uses this
                          option and proceeds to pay through credit card on
                          payment gateway, payment gateway charges as applicable
                          will be deducted from the paid amount and the rest
                          amount will be considered as final booking amount
                        </div>
                        <div>
                          To make payments through credit card go back and use
                          credit card payment option
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className=""
                      style={{
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0px",
                        marginBottom: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      <table border="1">
                        <thead></thead>
                        <tbody className="mytbody">
                          <tr>
                            <td className="mytd">Booking Amount</td>
                            <td className="mytd">₹ {data.amount}</td>
                          </tr>
                          <tr>
                            <td className="mytd">
                              Payment Gateway Charges (2%)
                            </td>
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
                    background:
                      "linear-gradient(90deg, #f7971e 0%, #ffd200 100%)",
                    fontWeight: "bold",
                    color: "black",
                    padding: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    return setOpen(false), next();
                  }}
                >
                  Click here if You Understand and accept the Payment terms
                </button>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PayWithGrouptour;
