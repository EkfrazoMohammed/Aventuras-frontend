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
const {name,value} =e.target
  
if (name === 'customer_name' && value !== '') {
  setErrors({ ...errors, [name]: '' });
}
if (name === 'customer_email' && value !== '') {
  setErrors({ ...errors, [name]: '' });
}
if (name === 'customer_mobile_number' && value !== '') {
  setErrors({ ...errors, [name]: '' });
}
if (name === 'customer_package_id' && value !== '') {
  setErrors({ ...errors, [name]: '' });
}
if (name === 'amount' && value !== '') {
  setErrors({ ...errors, [name]: '' });
}
setData((prevData)=>{
  return{...prevData,[e.target.name]: e.target.value }
 })  

  };

  return (
    <>
      <div
        className=""
        style={{
          display: "flex",
          flexDirection: "column",
          height: "50%",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          padding: "20px",
        }}
      >
        <div className="inputField">
          <label
            htmlFor="customer_name"
            style={{ fontWeight: "bold", color: "black" }}
          >
            User Name{" "}
          </label>
          <input
            type="text"
            style={{
              width: "68%",
              height: "50px",
              borderRadius: "5px",
              padding:'10px',
              color:` ${errors.customer_name ? 'red' : 'black'}`,
              border: `2px solid ${errors.customer_name ? 'red' : 'green'}`,
            }}
            name="customer_name"
            value={data.customer_name}
            onChange={handleChange}
            placeholder={errors.customer_name || 'Enter your name'}

          />
               

        </div>
        <div className="inputField">
          <label
            htmlFor="customer_email"
            style={{ fontWeight: "bold", color: "black" }}
          >
            User Email{" "}
          </label>
          <input
            type="email"
            style={{
              width: "68%",
              height: "50px",
              borderRadius: "5px",
              padding:'10px',
              color:` ${errors.customer_email ? 'red' : 'black'}`,
              border: `2px solid ${errors.customer_email ? 'red' : 'green'}`,            }}
            name="customer_email"
            onChange={handleChange}
            value={data.customer_email}
            placeholder={errors.customer_email || 'Enter Your Email '}
          />
        </div>

        <div className="inputField">
          <label
            htmlFor="customer_mobile_number"
            style={{ fontWeight: "bold", color: "black" }}
          >
            Mobile Number
          </label>
          <input
            type="number"
            style={{
              width: "68%",
              height: "50px",
              borderRadius: "5px",
              padding:'10px',
              color:` ${errors.customer_mobile_number ? 'red' : 'black'}`,
              border: `2px solid ${errors.customer_mobile_number ? 'red' : 'green'}`,             }}
            name="customer_mobile_number"
            onChange={handleChange}
            value={data.customer_mobile_number}
            placeholder={errors.customer_mobile_number || "Mobile Number"}
          />
        </div>

         <div className="inputField">
          <label
            htmlFor="customer_package_id"
            style={{ fontWeight: "bold", color: "black" }}
          >
            Enter Package ID{" "}
          </label>
          <input
            type="text"
            style={{
              width: "68%",
              height: "50px",
              borderRadius: "5px",
              padding:'10px',
              color:` ${errors.customer_package_id ? 'red' : 'black'}`,
              border: `2px solid ${errors.customer_package_id ? 'red' : 'green'}`,             }}
            name="customer_package_id"
            onChange={handleChange}
            value={data.customer_package_id}
            placeholder={errors.customer_package_id || 'Enter Your Package ID'} 
          />
          
        </div>

        <div className="inputField" style={{ height: "100px" }}>
          <label
            htmlFor="customer_package_id"
            style={{ fontWeight: "bold", color: "black" }}
          >
            Booking notes{" "}
          </label>
          <input
            id="customer_remarks"
            // rows={2}
            // cols={24}
            style={{
              width: "68%",
              height: "80px",
              borderRadius: "5px",
              padding:'10px',
              border: "2px solid black",
            }}
            name="customer_remarks"
            onChange={handleChange}
            placeholder="Write a note..."
            // value={data}
          />
        </div>
        <div className="inputField">
          <label
            htmlFor="amount"
            style={{ fontWeight: "bold", color: "black" }}
          >
            Amount
          </label>
          <input
            type="number"
            style={{
              width: "68%",
              height: "50px",
              borderRadius: "5px",
              padding:'10px',
              color:` ${errors.amount ? 'red' : 'black'}`,
              border: `2px solid  ${errors.amount ? 'red' : 'green'}`,   
            }}
            name="amount"
            onChange={handleChange}
            value={data.amount}
            placeholder={errors.amount || 'Enter the Amount'}
          />
        </div>
        
      </div>
    </>
  );
};
const Step2Content = ({data,cdata,setData,setCdata,setOpen ,setMethod,method,}) => {

  const [isUPIChecked, setUPIIsChecked] = useState(false);
  const [isCARDChecked, setCARDIsChecked] = useState(false);


const handleChanged = (e) => {
  if(method === 'CARD'){
    setCdata((prevData)=>{
      return{...prevData,[e.target.name]: e.target.value }
     })  
  }   
  
};

const ConfirmDetails=()=>{
  setData((prevData)=>{
    return{
      ...prevData,'PaymentMode':cdata}
  })
}




  const handleRadioChange = (e) => {
    // console.log("clicked");
    if (e === "CARD") {
      // console.log(e, "param");
      setMethod("CARD");
      setUPIIsChecked(false);
      setCARDIsChecked(false)
    }
     else if(e === 'UPI') {
      // console.log(e, "param");
      setMethod("UPI");
      setUPIIsChecked(false);
      setCARDIsChecked(false)
      setData((prevData) => {
        return { ...prevData, PaymentMode: {
          method:'UPI'
        } };
      });
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
          style={{ display: "flex", gap: "10px", width: "50%" }}
        >
          <div
       className="card_section"
            onClick={() => handleRadioChange("UPI")}
            style={{display:'flex',flexDirection:'column',width:'100%',height:'100%',justifyContent:'center',padding:'0px 10px',gap:'0px',cursor:'pointer'}}
          >
            <div className="" style={{display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'row',width:'100%',height:'50%',gap:'15px'}}>
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
                <p style={{marginBottom:'2px'}}>UPI,Debit Card,Net Banking Only
</p>
<p>No Charges Apply</p>
            </div>

          </div>
          <div
            className='card_section'
            onClick={() => handleRadioChange("CARD")}
            style={{display:'flex',flexDirection:'column',width:'100%',height:'100%',justifyContent:'center',padding:'0px 10px',gap:'0px',cursor:'pointer'}}
          >
            <div className="" style={{display:'flex',justifyContent:'start',alignItems:'center',flexDirection:'row',width:'100%',height:'50%',gap:'15px'}}>
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
            
                <p style={{marginBottom:'2px'}}>  Credit Card Only 

</p>
<p>Gateway Charges May Apply</p>
            </div>
          </div>
        </div>
      </div>
      <div className="details_wrapper">
        {/* {showDetails ? (
       
         <h1>UPI</h1>

      ) : (
       <h1>CARD</h1>
      )} */}

        {method === "UPI" ? (
          <>
            {/* <h1>UPI</h1> */}
            {/* <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal of 1000px width
      </Button> */}
                    <p style={{color:'red'}}> Please confirm your  details and proceed by clicking below.</p>

<div className="" style={{display:'flex',gap:'10px',alignItems:'center' ,cursor:'pointer' }} onClick={() => {
  return(
    setOpen(true),
    // console.log(data),
   
    setUPIIsChecked(true),
    setCARDIsChecked(false)
  )
  }}>
<input style={{ background: 'green' }} checked={isUPIChecked } type="checkbox" />
<span style={{fontWeight:'600'}} >View Terms and Condition </span>
</div>
          </>
        ) : (
          <>
            <h3>Card Details</h3>
            <div
              className=""
              style={{
                width: "50%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: "3rem",
              }}
            >
              <div
                className=""
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  justifyContent: "center",
                  width: "90%",
                  height: "100px",
                }}
              >
                <label htmlFor="customer_name" style={{ fontWeight: "bolder" }}>
                  Card Number{" "}
                </label>
                <input
                  type="text"
                  name='Card_Number'
                  value={cdata.Card_Number}
                  style={{
                    width: "100%",
                    height: "50px",
                    borderRadius: "10px",
                    border: "2px solid black",
                    paddingLeft:'10px'
                  }}
                  placeholder="1234 1234 1234 1234 "
                  onChange={handleChanged}
                />
              </div>
              <div
                className=""
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "90%",
                  // marginTop: "10px",
                  height: "100px",
                  gap: "10px",
                  //
                }}
              >
                <div
                  className=""
                  style={{
                    display: "flex",
                    alignItems: "start",
                    flexDirection: "column",
                    width: "100%",
                    gap: "10px",
                  }}
                >
                  <label
                    htmlFor="customer_email"
                    style={{ fontWeight: "bolder" }}
                  >
                    Expiration{" "}
                  </label>
                  <input
                    type="email"
                    name='Expiration'
                    value={cdata.Expiration}

                    style={{
                      width: "100%",
                      height: "50px",
                      borderRadius: "10px",
                      border: "2px solid black",
                      paddingLeft:'10px'
                    }}
                    placeholder="MM/YY"
                    onChange={handleChanged}
                  />
                </div>
                <div
                  className=""
                  style={{
                    display: "flex",
                    alignItems: "start",
                    flexDirection: "column",
                    width: "100%",
                    gap: "10px",
                  }}
                >
                  <label
                    htmlFor="customer_email"
                    style={{ fontWeight: "bolder" }}
                  >
                    CVV{" "}
                  </label>
                  <input
                    type="email"
                    name='CVV'
                    value={cdata.CVV}
                    style={{
                      width: "100%",
                      height: "50px",
                      borderRadius: "10px",
                      border: "2px solid black",
                      paddingLeft:'10px'
                    }}
                    placeholder="CVV"
                    onChange={handleChanged}
                  />
                </div>
              </div>
              <div
                className=""
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  width: "90%",

                  // marginTop: "10px",
                  height: "100px",
                }}
              >
                <label htmlFor="customer_name" style={{ fontWeight: "bolder" }}>
                  Country{" "}
                </label>
                <input
                  type="text"
                  style={{
                    width: "100%",
                    height: "50px",
                    borderRadius: "10px",
                    border: "2px solid black",
                    paddingLeft:'10px'
                  }}
                  name="Country"
                  value={cdata.Country}
                  onChange={handleChanged}
                />
              </div>
              {/* <button >Confirm</button> */}
              <p style={{color:'red'}}> Please confirm your card details and proceed by clicking below.</p>

              <div className="" style={{display:'flex',gap:'10px',alignItems:'center',cursor:'pointer'}} onClick={() => {return  (
    setOpen(true),ConfirmDetails(),setUPIIsChecked(false),
    setCARDIsChecked(true)


  )
    } }>
<input style={{ background: 'green' }} checked={isCARDChecked } type="checkbox" />

<span >View Terms and Condition</span>
</div>
            </div>
          </>
        )}
      </div>
      {/* <div
                className=""
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width:'100%',
                  padding:'10px'
                }}
              >
                <button className="form-button">Pay Now !</button>
              </div> */}
    </div>
  );
};
const Step3Content = ({data,UpdatedTabledata}) => {
  let arrayData = [data]
  // console.log(arrayData)


  return (
    <div>
       <Row gutter={10} style={{display:'flex',justifyContent:'center',fontWeight:'bold'}}>
    <Col span={8}>
      <Card  headStyle={{ color: 'RGB(0 194 255)', textAlign: 'center', fontWeight: 'bold' }} title=" User Details" bordered={false}>
      <div className="" style={{width:'100%'}}>
       <div className="" style={{textAlign:'center',fontWeight:'bold'}}>
       
       </div>

       <table  style={{width:'100%',textAlign:'center',borderRadius:'20px'}}>
        <tbody border='2' style={{display:'flex',flexDirection:'column',gap:'25px'}}>
          {arrayData.map((row,index) => (
            <>
            <tr style={{borderBottom:'0.5px solid grey',display:'flex',gap:'25px'}}>
             
              <td style={{width:'30%'}}>User Name :</td>
              <td style={{width:'70%'}}>{row.customer_name}</td>
            </tr>
            <tr style={{borderBottom:'0.5px solid grey',display:'flex',gap:'25px'}}>
                <td style={{width:'30%'}}>Email :</td>
                <td style={{width:'70%'}}>{row.customer_email}</td>
              </tr>
              <tr style={{borderBottom:'0.5px solid grey',display:'flex',gap:'25px'}}>
                <td style={{width:'30%'}}>Mobile Number :</td>
                <td style={{width:'70%'}}>{row.customer_mobile_number}</td>
              </tr>
              <tr style={{borderBottom:'0.5px solid grey',display:'flex',gap:'25px'}}>
                <td style={{width:'30%'}}>Package Id :</td>
                <td style={{width:'70%'}}>{row.customer_package_id}</td>
              </tr></>
            

          ))}
        </tbody>
      </table>


      </div>
    



      </Card>
    </Col>
    <Col span={10}>
      <Card  headStyle={{ color: 'RGB(0 194 255)', textAlign: 'center', fontWeight: 'bold' }} title="Payment Details" bordered={false}>
      <table  style={{width:'100%',textAlign:'center',borderRadius:'20px'}}>
        <tbody border='2' style={{display:'flex',flexDirection:'column',gap:'25px'}}>
        <>
          {arrayData.map((row,index) => (
         
            <tr style={{borderBottom:'0.5px solid grey',display:'flex',gap:'25px'}}>
             
              <td style={{width:'70%'}}>Payment Mode :</td>
              <td style={{width:'30%'}}>{row.PaymentMode.method}</td>
            </tr>
            ))}
    {
  UpdatedTabledata.filter(item => item.category !== "Total Applicable Amount").map(row => (
    <tr key={row.category} style={{ borderBottom: '0.5px solid grey', display: 'flex', gap: '25px' }}>
      <td style={{ width: '75%' }}>{row.category}</td>
      <td style={{ width: '25%' }}>Rs.{row.amount}/.</td>
    </tr>
  ))
}
{/* {
UpdatedTabledata.map((element )=>(
  

   element.category === "Total Applicable Amount" ? (
    <tr  style={{ borderBottom: '0.5px solid grey', display: 'flex', gap: '25px',fontSize:'large' }}>
    <td style={{ width: '70%',color:'rgb(0,194,255)' }}>{element.category}</td>
    <td style={{ width: '30%',color:'green' }}>Rs.{element.amount}</td>
  </tr>
   ) : null

  

))
   } */}


           </>
            

        </tbody>
      </table>
      </Card>
    </Col>

  </Row>
   {
UpdatedTabledata.map((element )=>(
  

   element.category === "Total Applicable Amount" ? (
    <div className="" style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'20px'}}>
    <div className="" style={{width:'50%',display:'flex',justifyContent:'center',fontSize:'large',fontWeight:'bold',boxShadow:' 0 2px 4px rgba(0, 0, 0, 0.1)',padding:'10px'}}>
      <div className="" style={{width:'100%',textAlign:'center',color:'rgb(0,194,255)' }}>Total Payable Amount </div>
      <div className="" style={{width:'100%',textAlign:'center',color:'green'}}>Rs. { element.amount}</div>
    </div>
    </div>
   ) : null

  

))
   } 
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
const PayMethod = () => {
  const [open, setOpen] = useState(false);
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState({
    'customer_name': "",
    'customer_email': "",
    'customer_mobile_number': "",
    'customer_package_id': "",
    'amount': null,
    'Total_Payable_amount':'',
    'PaymentMode':{
      "method":'UPI'
    }
    
  });

  const [cdata, setCdata] = useState({
    method: "CARD",
    Card_Number: null,
    Expiration:null,
    CVV: null,
    Country:null
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
                    'PaymentMode':{
                      "method":'UPI',
                      "card_number":"",
                      "expiration":"",
                      "cvv":"",
                      "country":""
                    }
                   
          
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
                    'PaymentMode':{
                      "method":'UPI',
                      "card_number":"",
                      "expiration":"",
                      "cvv":"",
                      "country":""
                    }
                  
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

    // const getData = async () => {

    //     try {

    //         let d = await API.get(`/api/all-packages?populate=*&filters[package_id][$eq]=${package_id}`)


    //         setValue(d.data.data[0])

    //         const initialQuery = {
    //             "package_id": `${d.data.data[0]?.attributes?.package_id}`,
    //             "user_name": "",
    //             "contact_number": "",
    //             "email_id": "",
    //             "current_location": "",
    //             "package_name": `${d.data.data[0]?.attributes?.name}`
    //         };
    //         setData(initialQuery);
    //         setLoading(false)

    //     } catch (err) {
    //         console.log(err)
    //         setLoading(true)

    //     }
    // }
    // getData();
    
    // Scroll to the top of the page when the component mounts or when package_id changes
    window.scrollTo(0, 0);

}, [])

  const [finalData,setFinalData]=useState([])
// FORM VALIDATION FOR USER DETAILS

const [errors, setErrors] = useState({
  customer_name: '',
  customer_email: '',
  customer_mobile_number: '',
  customer_package_id: '',
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

  // Validation rules for customer_package_id
  if (data.customer_package_id.trim() === '') {
    newErrors.customer_package_id = 'Customer package ID is required.';
    isValid = false;
  } else {
    newErrors.customer_package_id = '';
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
  let totalAmount = data.amount
  // console.log(totalAmount)
  const GstAmount = (totalAmount)*(2/100) //convenience
  let GatewayGst = GstAmount * 0.18
  GatewayGst=GatewayGst.toFixed(2)
  let totalPayableAMount = Number(totalAmount) + Number(GstAmount) + Number(GatewayGst)
  const tableData = [
    { id: 1, category: 'Booking Amount', amount: 0 },
    { id: 2, category: 'Payment Gateway Charges', amount: 0 },
    { id: 3, category: 'GST on Payment Gateway Charges (18%)', amount: 0 },
    { id: 3, category: 'Total Applicable Amount', amount: 0 },
  ]

  const UpdatedTabledata = tableData.map((item) => {
    if(method === 'UPI') {
      if (item.category === 'Booking Amount') {
        item.amount = totalAmount;
      }else if(item.category === 'Payment Gateway Charges'){
  item.amount = 0
      }
      else if(item.category === 'GST on Payment Gateway Charges (18%)'){
        item.amount = 0
      }
      else if(item.category === 'Total Applicable Amount'){
        item.amount = totalAmount
      }
    }
    else if (method === 'CARD'){
      if (item.category === 'Booking Amount') {
        item.amount = totalAmount;
      }else if(item.category === 'Payment Gateway Charges'){
  item.amount = GstAmount
      }
      else if(item.category === 'GST on Payment Gateway Charges (18%)'){

        item.amount = GatewayGst
      }
      else if(item.category === 'Total Applicable Amount'){
        item.amount = totalPayableAMount
      }
    }
  
    return item; // Return the updated item
  });
  


  

// Update the state with the new tableData


  const steps = [
    {
      title: "User Information",
      content: <Step1Content data={data} cdata={cdata} setData={setData} errors={errors} setErrors={setErrors} validateInput={validateInput} />,
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
      content: <Step2Content data={data} cdata={cdata} setData={setData} setCdata={setCdata} setallData={setallData}  allData={allData} setOpen={setOpen} method={method} setMethod={setMethod} />,
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
      content: <Step3Content data={data} UpdatedTabledata={UpdatedTabledata} />,
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
    setCurrent(current - 1);
  };

 
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon,
  }));
  const contentStyle: React.CSSProperties = {
    // lineHeight: '260px',
    // textAlign: 'center',
    // color: token.colorTextTertiary,
    backgroundColor: '#ffff',
    borderRadius: token.borderRadiusLG,
    // border: `1px dashed ${token.colorBorder}`,
    marginTop: 26,
  };



  const handleMakePayment =async (e)=>{

    setData((prevData)=>{
      return{
        ...prevData,'Total_Payable_amount':totalPayableAMount}
    })

    // console.log("data==>",data)

    e.preventDefault();
    const userDataString = localStorage.getItem("user");
    const userData = JSON.parse(userDataString);
    // console.log(userData)
    if (userData && userData.jwt) {
      const authToken = userData.jwt;
 
      try {

        
    
      
        const payload2={
          "customer_name": userData.info.user.username,
          "customer_email":userData.info.user.email,
          "customer_mobile_number": userData.info.user.mobile_number,
          "customer_package_id": data.customer_package_id,
          "amount":parseInt(data.amount),
  // "PaymentMethod":data.PaymentMode.method,
          // "card_number": data.PaymentMode.Card_Number,
          // "expiration": data.PaymentMode.Expiration,
          // "cvv": data.PaymentMode.CVV,
          // "country":data.PaymentMode.Country
          }
          
// console.log("payload2==>",payload2)

        const payload={
          "customer_name": userData.info.user.username,
          "customer_email":userData.info.user.email,
          "customer_mobile_number": userData.info.user.mobile_number,
          "customer_package_id": data.customer_package_id,
          "amount":data.amount,
          "PaymentMethod":data.PaymentMode.method,
          "card_number": data.PaymentMode.Card_Number,
          "expiration": data.PaymentMode.Expiration,
          "cvv": data.PaymentMode.CVV,
          "country":data.PaymentMode.Country
        }
        // console.log(payload)
        let ob =payload
        // console.log(ob)

        const res = await axios.post("https://aventuras.co.in/api/v1/payment/initiate_test_payment",ob)
   

        
        if (res.data.data.success === true) {
          const url = res.data.data.data.instrumentResponse.redirectInfo.url;
         
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
              // description: 'You have successfully logged in.',
              
              duration: 2, // Duration in seconds (adjust as needed)
            });
        }
        
        notification.success({

          message: 'Payment done successfully!',
          // description: 'You have successfully logged in.',
          
          duration: 2, // Duration in seconds (adjust as needed)
        });
        // console.log(res.data)
        setData(null)

    }
    
    try {
 let ob = {
            data
        }
        const res = await API.post('/api/pay-nows', ob);
        notification.success({
          message: 'Enquiry Sent successfully!',
          // description: 'You have successfully logged in.',
          
          duration: 2, // Duration in seconds (adjust as needed)
        });
        // console.log(res.data)
        setData(null)


    }
    
    catch (error) {
        // console.log(error)
        if(error.response.status==403){
          notification.error({
            message: 'Please Login to send Payments!',
            description: '',
            
            duration: 2, // Duration in seconds (adjust as needed)
          });
        }else{
          notification.error({
            message: 'Unable to send Enquiry!',
            description: 'Please fill all details to send enquiry',
            
            duration: 2, // Duration in seconds (adjust as needed)
          });
        }
       
    }
  }catch(err){
    // console.log(err)
  }
  }else{
    notification.info({
      message: 'Login to Pay Now!',
      // description: 'You have successfully logged in.',
      
      duration: 2, // Duration in seconds (adjust as needed)
    });
  }
  }
  const handleUPISubmit = async (e) => {
    e.preventDefault();
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
          "amount":data.amount
        }
        // console.log(payload)
        let ob =payload
        // console.log(ob)

        const res = await axios.post("https://aventuras.co.in/api/v1/payment/initiate_test_payment",ob)
       

        // const sampleResponse={
        //   "data": {
        //     "success": true,
        //     "code": "PAYMENT_INITIATED",
        //     "message": "Payment initiated",
        //     "data": {
        //       "merchantId": "AVENTURASONLINE",
        //       "merchantTransactionId": "AVEN29401696394184885",
        //       "instrumentResponse": {
        //         "type": "PAY_PAGE",
        //         "redirectInfo": {
        //           "url": "https://mercury-t2.phonepe.com/transact/pg?token=NjhhOTEyMzYxZTkxNmIwZDcwYTc5NTA3YTY2ZDA4N2Y5ZjRjNzA1NTk3MDcyZTdmY2NmZGVmMjFmYmQzNzg1NTNlZWRmZGIwNmE3NThjZDQyNTA0YzE3NDE3Mzc4ZTY0YWE0YjI5NzlhOTo5YWU1MTAwMTgyNmY1NzlmZjQ4ZTMwNWFmOGQ1OTJlZQ",
        //           "method": "GET"
        //         }
        //       }
        //     }
        //   },
        //   "redirectUrl": "https://mercury-t2.phonepe.com/transact/pg?token=NjhhOTEyMzYxZTkxNmIwZDcwYTc5NTA3YTY2ZDA4N2Y5ZjRjNzA1NTk3MDcyZTdmY2NmZGVmMjFmYmQzNzg1NTNlZWRmZGIwNmE3NThjZDQyNTA0YzE3NDE3Mzc4ZTY0YWE0YjI5NzlhOTo5YWU1MTAwMTgyNmY1NzlmZjQ4ZTMwNWFmOGQ1OTJlZQ"
        // }
        if (res.data.data.success === true) {
          const url = res.data.data.data.instrumentResponse.redirectInfo.url;
          // console.log("portal url=> ",url)
          // let emailOb1={
          //   name:data.customer_name,
          //   email:data.customer_email,
          //   subject:`Payment Alert for merchantTransactionId : ${res.data.data.data.merchantTransactionId}`,
          //   message:`Payment from ${data.customer_name} 
          //   Started for Package ${data.customer_package_id} 
          //   of amount : ${data.amount}
          //   on merchantTransactionId : ${res.data.data.data.merchantTransactionId}
          //   `,
          //   // html: htmlMessage
          // };
          const userConfirmed = window.confirm("Are you sure you want to proceed with the payment?");

          if (userConfirmed) {
            // await sendingMail(emailOb1)
            // open in same tab
          // window.location.href = url;

           // Open the URL in a new tab
  window.open(url, '_blank');
  // window.open("https://aventuras.co.in/","_blank")
        }
          else {
            window.location.reload();
            notification.error({

              message: 'Payment Cancelled!',
              // description: 'You have successfully logged in.',
              
              duration: 2, // Duration in seconds (adjust as needed)
            });
        }
        
        notification.success({

          message: 'Payment done successfully!',
          // description: 'You have successfully logged in.',
          
          duration: 2, // Duration in seconds (adjust as needed)
        });
        // console.log(res.data)
        setData(null)

    }
    
    try {
 let ob = {
            data
        }
        const res = await API.post('/api/pay-nows', ob);
        notification.success({
          message: 'Enquiry Sent successfully!',
          // description: 'You have successfully logged in.',
          
          duration: 2, // Duration in seconds (adjust as needed)
        });
        // console.log(res.data)
        setData(null)


    }
    
    catch (error) {
        // console.log(error)
        if(error.response.status==403){
          notification.error({
            message: 'Please Login to send Payments!',
            description: '',
            
            duration: 2, // Duration in seconds (adjust as needed)
          });
        }else{
          notification.error({
            message: 'Unable to send Enquiry!',
            description: 'Please fill all details to send enquiry',
            
            duration: 2, // Duration in seconds (adjust as needed)
          });
        }
       
    }
  }catch(err){
    // console.log(err)
  }
  }else{
    notification.info({
      message: 'Login to Pay Now!',
      // description: 'You have successfully logged in.',
      
      duration: 2, // Duration in seconds (adjust as needed)
    });
  }
    // console.log(data)
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
                style={{
                  margin: "0 8px",
                  background:
                    "linear-gradient(90deg, #f7971e 0%, #ffd200 100%)",
                  color: "black",
                  fontWeight: "bold",
                  width:'14%',
                  height:'40px'
                }}
                onClick={() => prev()}
              >
                Previous
              </Button>
            )}
              {current === 0 && (
              <Button
                type="primary"
                style={{
                    margin: "0 8px",
                  background:
                    "linear-gradient(90deg, #f7971e 0%, #ffd200 100%)",
                  fontWeight: "bold",
                  color: "black",
                  width:'14%',
                  height:'40px'
                }}
                onClick={() => next()}
              >
                Next
              </Button>
            )}
                {current === steps.length - 1 && (
              <Button
                style={{
                    margin: "0 8px",
                  background:
                    'green',
                  fontWeight: "bold",
                  color: "white",
                  width:'14%',
                  height:'40px'
                }}
                type="primary"
                onClick={handleMakePayment}
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
        onCancel={() => setOpen(false)}
        width={600}
        footer={null}
      >
{method === 'UPI' ? (
  <>
<div className="" style={{textAlign:'center',display:'flex',flexDirection:'column',gap:'0px',fontWeight:'bold'}}>
<p>  No Payment Gateway Charges Applicable</p>
<table border="1" >
        <thead>
         
        </thead>
        <tbody>
          {UpdatedTabledata.map((row) => (
            <tr key={row.id}>
              {/* <td>{row.id}</td> */}
              <td>{row.category} </td>
              <td>Rs.{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="" style={{margin:'20px 0px'}}>
      <p style={{color:'red',fontWeight:'550'}}>Use this option only if you want to use payment options other than credit card. If the user uses this option and proceeds to pay through credit card on payment gateway, payment gateway charges as applicable will be deducted from the paid amount and the rest amount will be considered as final booking amount</p>
      <p >To make payments through credit card go back and use credit card payment option</p>
      </div>

</div>
  </> 
) : (
  <>
<div className="" style={{textAlign:'center',display:'flex',flexDirection:'column',gap:'0px',marginBottom:'20px',fontWeight:'bold'}}>
<table border="1">
        <thead>
          
        </thead>
        <tbody>
          {UpdatedTabledata.map((row) => (
            <tr key={row.id}>
           
              <td>{row.category}</td>
              <td>Rs.{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="" style={{margin:'20px 0px'}}>
      <p style={{color:'red',fontWeight:'550'}}>Payment gateway charges are non-refundable under any scenarios</p>
      <p >Use UPI payment option to avoid charges !</p>
      </div>

</div>
  </>
)}

  

    



        <div className="" style={{display:'flex',justifyContent:'center'}}>
        <Button
                type="primary"
                style={{
                    margin: "0 8px",
                  background:
                    "linear-gradient(90deg, #f7971e 0%, #ffd200 100%)",
                  fontWeight: "bold",
                  color: "black",
                  
                  height:'40px'
                }}
                onClick={() => {
                  return(
                    setOpen(false),
                    next()
                  )
                }}
              >
                Click here if You Understand and accept the Payment terms
              </Button>
        </div>
  
      </Modal>
    </div>
    </>
  );
};

export default PayMethod;
