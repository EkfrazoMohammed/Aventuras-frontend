import React, { useState, useRef, useEffect } from "react";
import { Button, message, Steps, theme,Modal, notification, Space } from "antd";
import { Card, Col, Row } from 'antd';


import {
  LoadingOutlined,
  CheckCircleOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";

import axios from "axios";
import "./PayNow.scss";
import {API,baseURL} from '../../api/apirequest';


const Step1Content = ({data,setData,validateInput,setErrors,errors}) => {
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
      <div
        className="myformContainer"
    
      >
        <div className="inputField">
          <label
            htmlFor="customer_name"
            style={{ fontWeight: "bold", color: "black" }}
          >
            User Name{" "}
          </label>
          <span style={{display:"flex",flexDirection:"column",gap:"5px"}}>
          <input
            type="text"
           
            name="customer_name"
            value={data.customer_name}
            onChange={handleChange}
            placeholder={'Enter your name'}

          />
          {errors.customer_name && (
    <div className="error-text" style={{ color: 'red' }}>
      {errors.customer_name}
    </div>
          )
  }
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
          {/* <input
            type="email"
            // style={{
            //   width: "68%",
            //   height: "50px",
            //   borderRadius: "5px",
            //   padding:'10px',
            //   color:` ${errors.customer_email ? 'red' : 'black'}`,
            //   border: `2px solid ${errors.customer_email ? 'red' : 'green'}`,       
            //      }}
            name="customer_email"
            onChange={handleChange}
            value={data.customer_email}
            placeholder={'Enter Your Email '}
          /> */}

<span style={{display:"flex",flexDirection:"column",gap:"5px"}}>
          <input
              type="email"
            
              name="customer_email"
              onChange={handleChange}
              value={data.customer_email}
              placeholder={'Enter Your Email '}
          />
          {errors.customer_email && (
    <div className="error-text" style={{ color: 'red' }}>
      {errors.customer_email}
    </div>
          )
  }
  </span>
        </div>

        <div className="inputField">
          <label
            htmlFor="customer_mobile_number"
            style={{ fontWeight: "bold", color: "black" }}
          >
            Mobile Number
          </label>

          <span style={{display:"flex",flexDirection:"column",gap:"5px"}}>
          <input
            type="number"
           
            name="customer_mobile_number"
            onChange={handleChange}
            value={data.customer_mobile_number}
            placeholder={"Enter Mobile Number"}
          />
          {errors.customer_mobile_number && (
    <div className="error-text" style={{ color: 'red' }}>
      {errors.customer_mobile_number}
    </div>
          )
  }
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

        <div className="inputField">
          <label
            htmlFor="customer_package_id"
            style={{ fontWeight: "bold", color: "black" }}
          >
            Booking notes{" "}
          </label>
          <textarea
            id="customer_remarks"
            rows={2}
            cols={35}
            // style={{
            //   width: "68%",
            //   height: "80px",
            //   borderRadius: "5px",
            //   padding:'10px',
            //   border: "2px solid black",
            // }}
            name="customer_remarks"
            onChange={handleChange}
            placeholder="Write a note..."
         
          />
        </div>
        <div className="inputField">
          <label
            htmlFor="amount"
            style={{ fontWeight: "bold", color: "black" }}
          >
            Amount
          </label>
          <span style={{display:"flex",flexDirection:"column",gap:"5px"}}>
          <input
            type="number"
        
            name="amount"
            onChange={handleChange}
            required
            value={data.amount}
            placeholder={'Enter the Amount'}
          />
          {errors.amount && (
    <div className="error-text" style={{ color: 'red' }}>
      {errors.amount}
    </div>
          )
  }
  </span>
        </div>
        
      </div>
    </>
  );
};
const Step2Content = ({data,setData,setOpen ,setMethod,method,isCheckboxChecked,onCheckboxChange,handleCheckboxChange}) => {
  const [isUPIChecked, setUPIIsChecked] = useState(false);
  const [isCARDChecked, setCARDIsChecked] = useState(false);

  // Store the original amount from the data object
  const originalAmount = parseInt(data.amount);
  const netAmountUPI=parseInt(data.amount)

  // Store convenience fees and net amount for UPI and CARD
  const [convenienceFeesUPI] = useState(0); // Assuming convenience fees are 0 for UPI
  const [convenienceGSTFeesUPI] = useState(convenienceFeesUPI * (18 / 100));

  const [convenienceFeesCARD] = useState((originalAmount * 2) / 100);
  const [convenienceGSTFeesCARD] = useState(convenienceFeesCARD * (18 / 100));
  const [netAmountCARD] = useState(originalAmount + convenienceFeesCARD + convenienceGSTFeesCARD);


  const handleRadioChange = (selectedMethod) => {
    if (selectedMethod === "CARD" && method !== "CARD") {
      setMethod("CARD");
      setUPIIsChecked(false);
      setCARDIsChecked(true);
  
      setData((prevData) => ({
        ...prevData,
        PaymentMode: 'CARD',
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
        PaymentMode: 'UPI',
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
        <div
          className="Payment_card_section"
         
        >
          <div
       className="card_section"
            onClick={() => handleRadioChange("UPI")}
          >
            <div className="" style={{display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'row',width:'100%',height:'50%',gap:'10px'}}>
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
              src="https://img.icons8.com/ios-filled/50/bhim-upi.png"
              alt="bhim-upi"
            />
            <div className="text_value">UPI</div>
            </div>
          
            <div style={{height:'50%',width:'100%',display:'flex',justifyContent:'start',fontSize:'x-small',fontWeight:'bold',color:'green',flexDirection:'column',gap:'0px'}}>
                <div style={{marginBottom:'2px'}}>UPI,Debit Card,Net Banking Only
</div>
<div>No Charges Apply</div>
            </div>

          </div>
          <div
            className='card_section'
            onClick={() => handleRadioChange("CARD")}
           >
            <div className="" style={{display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'row',width:'100%',height:'50%',gap:'10px'}}>
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
              src="https://img.icons8.com/ios-filled/50/credit-card-front.png"
              alt="credit-card-front"
            />

            <div className="text_value">Card</div>
            </div>
     
            <div  style={{height:'50%',width:'100%',display:'flex',justifyContent:'start',fontSize:'x-small',fontWeight:'bold',color:'green',flexDirection:'column'}}>
            
                <div style={{marginBottom:'2px'}}>  Credit Card Only 

</div>
<div>Gateway Charges May Apply</div>
            </div>
          </div>
        </div>
      </div>
      <div className="details_wrapper">
       
        {method === "UPI" ? (
          <>
     
                    <div className="myredcolor">Proceed with payment by clicking checkbox below.</div>

<div className="" style={{display:'flex',gap:'1rem',alignItems:'center' ,justifyContent:"center",cursor:'pointer' }} onClick={() => {
  return(
    setOpen(true),
    setUPIIsChecked(false),
    setCARDIsChecked(true)
  )
  }}>

<input
 
  style={{ background: 'green' }}
  type="checkbox"
  checked={isCheckboxChecked}
  onChange={handleCheckboxChange}
/>

<span style={{fontWeight:'600'}} >Accept Terms and Condition</span>
</div>
          </>
        ) : (
          <>
           
           
           <div className="myredcolor">Proceed with payment by clicking checkbox below.</div>
     <div className="" style={{display:'flex',alignItems:'center',cursor:'pointer',justifyContent:"center",gap:"1rem"}} 
              onClick={() => {return  (
                              setOpen(true),
                              setUPIIsChecked(false),
                              setCARDIsChecked(true)
                        )} }
                      >
<input
  style={{ background: 'green' }}
  type="checkbox"
  checked={isCheckboxChecked}
  onChange={handleCheckboxChange}
/>

<span style={{fontWeight:'600'}}>Accept Terms and Condition</span>
</div>
          </>
        )}
      </div>
   
    </div>
  );
};
const Step3Content = ({data}) => {
  let arrayData = [data]
  // console.log(arrayData)


  return (
    <div>
    <Row gutter={10} className="step3tableContainer" style={{fontWeight:'bold'}}>
 <Col span={12} className="step3tableColumn">
   <Card  headStyle={{ color: 'RGB(0 194 255)', textAlign: 'center', fontWeight: 'bold' }} 
   title=" User Details" bordered={false}>
   <div className="" style={{width:'100%'}}>
    <div className="" style={{textAlign:'center',fontWeight:'bold'}}>
    
    </div>

    <table  style={{width:'100%',textAlign:'center',borderRadius:'20px'}}>
     <tbody border='2' style={{display:'flex',flexDirection:'column',gap:'25px'}}>
       
         <tr style={{borderBottom:'0.5px solid grey',display:'flex',gap:'25px'}}>
          
         <td className="mylasttd">Name :</td>
         <td style={{width:'100%'}}>{data.customer_name}</td>
         </tr>
         <tr style={{borderBottom:'0.5px solid grey',display:'flex',gap:'25px'}}>
          
         <td className="mylasttd">Email :</td>
         <td style={{width:'100%'}}>{data.customer_email}</td>
         </tr>
         <tr style={{borderBottom:'0.5px solid grey',display:'flex',gap:'25px'}}>
          
         <td className="mylasttd">Mobile Number :</td>
         <td style={{width:'100%'}}>{data.customer_mobile_number}</td>
         </tr>
       
        
     </tbody>
   </table>


   </div>
 



   </Card>
 </Col>
 <Col span={12} className="step3tableColumn">
   <Card  headStyle={{ color: 'RGB(0 194 255)', textAlign: 'center', fontWeight: 'bold' }} 
   title="Payment Details" bordered={false}>
   <table className="mysecondtable" style={{width:'100%',textAlign:'center',borderRadius:'20px'}}>

   {data.PaymentMode === "UPI" ? <>
   <tbody border='2' style={{display:'flex',flexDirection:'column',gap:'25px'}}>
       
       <tr style={{borderBottom:'0.5px solid grey',display:'flex',gap:'25px'}}>
        
       <td className="mylasttd">PaymentMode:</td>
       <td style={{width:'100%'}}>{data.PaymentMode}</td>
       </tr>
       <tr style={{borderBottom:'0.5px solid grey',display:'flex',gap:'25px'}}>
        
       <td className="mylasttd">Booking Amount :</td>
       <td style={{width:'100%'}}>{data.amount}</td>
       </tr>

       <tr style={{borderBottom:'0.5px solid grey',display:'flex',gap:'25px'}}>
        
        <td className="mylasttd">PG Charges on UPI (0%):</td>
        <td style={{width:'100%'}}>{data.convenience}</td>
        </tr>
 
        <tr style={{borderBottom:'0.5px solid grey',display:'flex',gap:'25px'}}>
         
         <td className="mylasttd"> GST on PG Charges (0%):</td>
         <td style={{width:'100%'}}>{data.convenienceGST}</td>
         </tr>

        <tr style={{borderBottom:'0.5px solid grey',display:'flex',gap:'25px'}}>
        
        <td className="mylasttd">Total Payable Amount :</td>
        <td style={{width:'100%'}}>{data.total_amount}</td>
        </tr>
     
      
   </tbody>

   </>:<>
   <tbody border='2' style={{display:'flex',flexDirection:'column',gap:'25px'}}>
       
       <tr style={{borderBottom:'0.5px solid grey',display:'flex',gap:'25px'}}>
        
       <td style={{width:'50%'}}>PaymentMode:</td>
       <td style={{width:'50%'}}>{data.PaymentMode}</td>
       </tr>
       <tr style={{borderBottom:'0.5px solid grey',display:'flex',gap:'25px'}}>
        
       <td className="mylasttd">Booking Amount :</td>
       <td  className="mylasttd">{data.amount}</td>
       </tr>

       <tr style={{borderBottom:'0.5px solid grey',display:'flex',gap:'25px'}}>
        
       <td  className="mylasttd">PG Charges on Credit Card (2%):</td>
       <td  className="mylasttd">{data.convenience}</td>
       </tr>

       <tr style={{borderBottom:'0.5px solid grey',display:'flex',gap:'25px'}}>
        
        <td  className="mylasttd"> GST on PG Charges (18%):</td>
        <td  className="mylasttd">{data.convenienceGST}</td>
        </tr>

        <tr style={{borderBottom:'0.5px solid grey',display:'flex',gap:'25px'}}>
        
        <td className="mylasttd">Total Payable Amount :</td>
        <td className="mylasttd">{data.total_amount}</td>
        </tr>
     
      
   </tbody> 
   </>}

   </table>
   </Card>
 </Col >

</Row>
<Row  className="step3tableContainer" >
<Col span={12} className="step3tableColumn">
 
<div className="mylastrow" style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'20px'}}>
    <div className="total_row">
      <div className="" style={{width:'100%',textAlign:'center',color:'rgb(0,194,255)' }}>Total Payable Amount </div>
      <div className="" style={{width:'100%',textAlign:'center',color:'green'}}>Rs. {data.total_amount}</div>
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
    width:'100%'
  },
  StepContainer: {
    width: "100%",
    // border:'2px solid black'
  },
};
const PayBook = () => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsCheckboxChecked((prevCheckboxState) => !prevCheckboxState);
  };

  const [open, setOpen] = useState(false);
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const [data, setData] = useState({
    'customer_name': "",
    'customer_email': "",
    'customer_mobile_number': "",
    'customer_package_id': "",
    'amount': null,
    'PaymentMode':"UPI",
    "convenience":0,
    "convenienceGST":0,
    "total_amount":null  
  });

  
  const [allData,setallData]= useState()
  const [method, setMethod] = useState("UPI");
  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);
  
  const [loading, setLoading] = useState(true);
  const [login,setLogin]=useState(false)
  useEffect(() => {
        
    if(userData && userData.isLoggedin===true){

        // console.log(userData.info.user)
        setLogin(true)
        const getDataLogin = async () => {

            try {
            const initialQuery = {
                    "customer_name": userData.info.user.username,
                    "customer_email":userData.info.user.email,
                    "customer_mobile_number": userData.info.user.mobile_number,
                    "customer_package_id":"",
                    "amount":null,
                    "PaymentMode":'UPI',
                    "convenience":0,
                    "convenienceGST":0,
                    "total_amount":null
                 
                };
                setData(initialQuery);
           
            } catch (err) {
                // console.log(err)
              

            }
        }
        getDataLogin();
    }else{
        setLogin(false)
        const getData = async () => {
                  try {
                    const initialQuery = {
                    "customer_name": "",
                    "customer_email":"",
                    "customer_mobile_number":"",
                    "customer_package_id":"",
                    "amount":null,
                    "PaymentMode":"UPI",
                    "convenience":0,
                    "convenienceGST":0,
                    "total_amount":null
                };
                setData(initialQuery);
                setLoading(false)

            } catch (err) {
                // console.log(err)
                setLoading(true)

            }
        }
        getData();
    }
  window.scrollTo(0, 0);

}, [])

// FORM VALIDATION FOR USER DETAILS

const [errors, setErrors] = useState({
  customer_name: '',
  customer_email: '',
  customer_mobile_number: '',
  amount: '',
});

const validateInput = () => {
  const newErrors = {};
  let isValid = true;

  // Validation rules for customer_name
  if (data.customer_name.trim() === '') {
    newErrors.customer_name = 'Customer name is required.';
    isValid = false;
  } else {
    newErrors.customer_name = '';
  }

  // Validation rules for customer_email
  if (!/^\S+@\S+\.\S+$/.test(data.customer_email)) {
    newErrors.customer_email = 'Enter a valid email address.';
    isValid = false;
  } else {
    newErrors.customer_email = '';
  }

  // Validation rules for customer_mobile_number
  // Example: You can add rules to check for a valid phone number format
  if (!/^\d{10}$/.test(data.customer_mobile_number)) {
    newErrors.customer_mobile_number = 'Enter a valid 10-digit mobile number.';
    isValid = false;
  } else {
    newErrors.customer_mobile_number = '';
  }

 
  // Validation rules for amount
  // Example: You can add rules to check for a valid amount format
  if (!/^\d+(\.\d{2})?$/.test(data.amount)) {
    newErrors.amount = 'Enter a valid amount (e.g., 10.00).';
    isValid = false;
  } else {
    newErrors.amount = '';
  }

  setErrors(newErrors);
  return isValid;
};
 


  const steps = [
    {
      title: "User Information",
      content: <Step1Content data={data} setData={setData} errors={errors} setErrors={setErrors} validateInput={validateInput} />,
      icon: (
        <img
          width="40"
          height="40"
          src="https://img.icons8.com/external-anggara-flat-anggara-putra/32/external-user-contact-us-anggara-flat-anggara-putra.png"
          alt="external-user-contact-us-anggara-flat-anggara-putra"
        />
      ),
    },
    {
      title: "Payment Option",
      content: <Step2Content data={data} setData={setData} setallData={setallData}  allData={allData} setOpen={setOpen} method={method} setMethod={setMethod}   isCheckboxChecked={isCheckboxChecked} onCheckboxChange={handleCheckboxChange} />,
      icon: (
        <img
          width="40"
          height="40"
          src="https://img.icons8.com/external-flat-gradient-andi-nur-abdillah/64/external-credit-e-commerce-flat-gradient-flat-gradient-andi-nur-abdillah.png"
          alt="external-credit-e-commerce-flat-gradient-flat-gradient-andi-nur-abdillah"
        />
      ),
    },
    {
      title: "Pay",
      content: <Step3Content data={data} isCheckboxChecked={isCheckboxChecked} onCheckboxChange={handleCheckboxChange}/>,
      icon: (
        <img
          width="40"
          height="40"
          src="https://img.icons8.com/cute-clipart/64/000000/approval.png"
          alt="approval"
        />
      ),
    },
  ];

  const next = () => {

    const userDataString = localStorage.getItem("user");
    const userData = JSON.parse(userDataString);
    // console.log(userData)
    if (userData && userData.jwt) {
     
    if(validateInput()){
      setCurrent(current + 1);
      // console.log("from Next",data)
    }

  }else{
    notification.info({
      message: 'Login to Pay Now!',
      // description: 'You have successfully logged in.',
      
      duration: 2, // Duration in seconds (adjust as needed)
    });

  }
  
  };

  const prev = () => {
    // console.log(current)
    if(current ===1){
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

    backgroundColor: '#ffff',
    borderRadius: token.borderRadiusLG,
    marginTop: 26,
  };

  // payment
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    // console.log("final=>",data)


    const userDataString = localStorage.getItem("user");
    const userData = JSON.parse(userDataString);
    // console.log(userData)
    if (userData && userData.jwt) {
      const authToken = userData.jwt;
 
      try {
      
        const payload={
          "customer_name": userData.info.user.username,
          "customer_email":userData.info.user.email,
          "customer_mobile_number": userData.info.user.mobile_number,
          "customer_package_id": data.customer_package_id,
          "amount":data.total_amount
        }
        // console.log(payload)
        let ob =payload
        // console.log(ob)

        const res = await axios.post("https://aventuras.co.in/api/v1/payment/initiate_payment",ob)
       

        if (res.data.data.success === true) {
          const url = res.data.data.data.instrumentResponse.redirectInfo.url;
          // console.log("portal url=> ",url)
          
          const userConfirmed = window.confirm("Are you sure you want to proceed with the payment?");

          if (userConfirmed) {
       

           // Open the URL in a new tab
  window.open(url, '_blank');
  // window.open("https://aventuras.co.in/","_blank")
        }
          else {
            window.location.reload();
            notification.error({

              message: 'Payment Cancelled!',
              duration: 2, // Duration in seconds (adjust as needed)
            });
        }
        
        notification.success({

          message: 'Payment done successfully!',
         
          duration: 2, // Duration in seconds (adjust as needed)
        });
        // console.log(res.data)
        setData(null)

    }

  }catch(err){
    // console.log(err)
  }
  }else{
    notification.info({
      message: 'Login to Pay Now!',
      duration: 2, // Duration in seconds (adjust as needed)
    });
  }
 
};
 return (
    <>
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
              display:'flex',
              justifyContent:'center',
              marginTop:'20px'

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
              style={{backgroundColor:"green !important"}}
                // style={{
                //     margin: "0 8px",
                //   background:
                //     'green',
                //   fontWeight: "bold",
                //   color: "white",
                //   width:'14%',
                //   height:'40px'
                // }}
                // type="primary"
                onClick={handlePaymentSubmit}
              >
                Pay
              </Button>
            )}
          </div>
        </div>
      </div>

{/* modal display */}
      <div>

      <Modal
      style={{textAlign:"center"}}
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
{method === 'UPI' ? (
  <>
<div className="" style={{textAlign:'center',display:'flex',flexDirection:'column',gap:'0px',fontWeight:'bold',fontSize:"13px"}}>
<div>  No Payment Gateway Charges Applicable</div>
<table border="1" >
        <thead>
         
        </thead>
        <tbody className="mytbody">
          
            <tr >
              <td className="mytd">Booking Amount</td>
              <td className="mytd">₹ {data.amount}</td>
            </tr>
            <tr >
              <td className="mytd">Payment Gateway Charges (0%)</td><td className="mytd">₹ {data.convenience}</td>
            </tr>            <tr >
              <td className="mytd">GST on Payment Gateway Charges (18%)</td><td className="mytd">₹ {data.convenienceGST}</td>
            </tr>            <tr >
              <td className="mytd">Total Applicable Amount</td><td className="mytd">₹ {data.total_amount}</td>
            </tr>
        </tbody>
      </table>
      <div className="" style={{margin:'20px 0px'}}>
      <div style={{color:'red',fontWeight:'550'}}>Use this option only if you want to use payment options other than credit card. If the user uses this option and proceeds to pay through credit card on payment gateway, payment gateway charges as applicable will be deducted from the paid amount and the rest amount will be considered as final booking amount</div>
      <div >To make payments through credit card go back and use credit card payment option</div>
      </div>

</div>
  </> 
) : (
  <>
<div className="" style={{textAlign:'center',display:'flex',flexDirection:'column',gap:'0px',marginBottom:'20px',fontWeight:'bold'}}>
<table border="1">
        <thead>
          
        </thead>
        <tbody className="mytbody">
          
            <tr >
              <td className="mytd">Booking Amount</td><td className="mytd">₹ {data.amount}</td>
            </tr>
            <tr >
              <td className="mytd">Payment Gateway Charges (2%)</td><td className="mytd">₹ {data.convenience}</td>
            </tr>            <tr >
              <td className="mytd">GST on Payment Gateway Charges (18%)</td><td className="mytd">₹ {data.convenienceGST}</td>
            </tr>            <tr >
              <td className="mytd">Total Applicable Amount</td><td className="mytd">₹ {data.total_amount}</td>
            </tr>
        </tbody>
      </table>

      <div className="" style={{margin:'20px 0px'}}>
      <div style={{color:'red',fontWeight:'550'}}>Payment gateway charges are non-refundable under any scenarios</div>
      <div >Use UPI payment option to avoid charges !</div>
      </div>

</div>
  </>
)}


        <button
                type="primary"
                style={{
                  textAlign:"center",
                  border:'none',
                  outline:"none",
                  borderRadius:"5px",
                  background:
                    "linear-gradient(90deg, #f7971e 0%, #ffd200 100%)",
                  fontWeight: "bold",
                  color: "black",
                  padding:"5px",
                  cursor:"pointer"
                 
                }}
                onClick={() => {
                  return(
                    setOpen(false),
                    next()
                  )
                }}
              >
                Click here if You Understand and accept the Payment terms
              </button>
    
  
      </Modal>
    </div>
    </>
  );
};

export default PayBook;
