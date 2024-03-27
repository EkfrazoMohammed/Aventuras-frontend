import React, { useState } from 'react'
import axios from "axios";
import "./PayNow.scss";
import {API,baseURL} from '../../api/apirequest';

import { message} from 'antd';
import { Button, notification, Space } from 'antd';
import PayMethod from './PayMethod';
import Pay2 from './Pay2';
const PayNow = () => {
  const [data, setData] = useState({
    "customer_name": "",
    "customer_email":"",
    "customer_mobile_number": "",
    "customer_package_id": "",
    "amount":''
   
});

const [cdata, setCdata] = useState({
  "ccustomer_name": "",
  "ccustomer_email":"",
  "ccustomer_mobile_number": "",
  "ccustomer_package_id": "",
  "camount":''
 
});

const close = () => {
  // console.log(
  //   'ready to make payment.',
  // );
};
const [api, contextHolder] = notification.useNotification();


const handleChange = (e) =>
{

  setData(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
  setCdata(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
}
 

//   const sendingMail=async (op)=>{
//     // e.preventDefault()
//  try{
//     //   let Ob={
//     //     name: name,
//     //   email: email,
//     //   subject:subject,
//     //   message:message
//     // }

//       let emailOb={
//         name:data.customer_name,
//         email:data.customer_email,
//         subject:"Payment Alert",
//         message:`Payment from User Started for Package ${data.customer_package_id} of amount : ${data.amount}`,
//         // html: htmlMessage
//       };
//       console.log(emailOb)
      
  
//       console.log("op=>",op)
//       let sendMailsResponse=await axios.post("https://aventuras.co.in/api/v1/users/sendMail",op);
//       console.log(sendMailsResponse)
//     }catch(err){
//       console.log(err)

//     }

//   }
const userDataString = localStorage.getItem("user");
    const userData = JSON.parse(userDataString);

   

    
 
const handleUPISubmit = async (e) => {
    e.preventDefault();
    // const userDataString = localStorage.getItem("user");
    // const userData = JSON.parse(userDataString);
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
        let ob =payload
       
        const res = await axios.post("https://aventuras.co.in/api/v1/payment/initiate_payment",ob)
       

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
  }
  }else{
    notification.info({
      message: 'Login to Pay Now!',
      // description: 'You have successfully logged in.',
      
      duration: 2, // Duration in seconds (adjust as needed)
    });
  }
  
};
const calculateGst = (price) => {
  // Check if the input price is a valid number
  if (isNaN(price) || price < 0) {
    // console.error('Invalid price input');
    return null; // or throw an error, depending on your use case
  }
// console.log(price)
  let cp = parseInt(price) * 0.02;
  // console.log(cp)
  let nt = cp * 0.18;
  // console.log(nt)
  let gt = parseInt(price) + cp+nt;
  gt = gt.toFixed(2);
  // console.log('Gross Total (GT):', gt);
  return gt;
}
const handleCreditSubmit = async (e) => {
  e.preventDefault();
  // const userDataString = localStorage.getItem("user");
  // const userData = JSON.parse(userDataString);
  // console.log(userData)
  if (userData && userData.jwt) {
    const authToken = userData.jwt;

    try {

      const newPrice=calculateGst(cdata.camount)
      // console.log(newPrice)
    
      const payload={
        "customer_name": userData.info.user.username,
        "customer_email":userData.info.user.email,
        "customer_mobile_number": userData.info.user.mobile_number,
        "customer_package_id": cdata.ccustomer_package_id,
        // "amount":cdata.camount
        "amount":parseFloat(newPrice)
      }
      // console.log(payload)
      let ob =payload
      // console.log(ob)

      const res = await axios.post("https://aventuras.co.in/api/v1/payment/initiate_payment",ob)
     
      if (res.data.data.success === true) {
        const url = res.data.data.data.instrumentResponse.redirectInfo.url;

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

}catch (error) {
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
}else{
  notification.info({
    message: 'Login to Pay Now!',
   
    
    duration: 2,
  });
}

};

const [method, setMethod] = useState("UPI");

  const handleRadioChange = (e) => {
    setMethod(e.target.value);
  };
const [showDetails,setshowdetails]=useState(true)



const Input = () => {

  const [data, setData] = useState({
      user_name: 'abc',
     age:0
    });
  
    // State variables and functions for each field
    const [isEditingUser, setIsEditingUser] = useState(false);
    const [isEditingAge, setIsEditingAge] = useState(false);
  
    const handleEditUser = () => {
      setIsEditingUser(true);
    };
  
    const handleEditAge = () => {
      setIsEditingAge(true);
    };
  
  
    const handleSaveClick = () => {
      // Perform the save operation here for each field if needed
      // For this example, we're just setting all edit modes to false
      setIsEditingUser(false);
      setIsEditingAge(false);
    };
  
    const handleRemoveClick = () => {
      // Reset all fields to their initial values
      setData({
        user_name: 'abc',
        age:0
      });
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
    };
  function show() {
    // console.log(data)
    
  }
return (
  <div>
     
     <div className="container">
    
      <div className="input-container">
        <div className="input-field-container">
          <input
            type="text"
            name="user_name"
            value={isEditingUser ? data.user_name : data.user_name}
            readOnly={!isEditingUser}
            onChange={handleChange}
            className="input-field"
          />
          {isEditingUser ? (
            <button onClick={handleSaveClick} className="edit-button">
              Save
            </button>
          ) : (
            <button onClick={handleEditUser} className="edit-button">
              Edit
            </button>
          )}
        </div>
      </div>


      <div className="input-container">
        <div className="input-field-container">
          <input
            type="number"
            name="age"
            value={isEditingAge ? data.age : data.age}
            readOnly={!isEditingAge}
            onChange={handleChange}
            className="input-field"
          />
          {isEditingAge ? (
            <button onClick={handleSaveClick} className="edit-button">
              Save
            </button>
          ) : (
            <button onClick={handleEditAge} className="edit-button">
              Edit
            </button>
          )}
        </div>
      </div>

    </div>
    
   <button onClick={show}>show console</button>
      <button onClick={handleRemoveClick}>Remove All</button>

     <p> {JSON.stringify(data)} 
     </p>
     </div>
)
}
  return (
    <>
  
      <div className="pay-page-container">
    
        <div className="pay-pages">
          <div className="left">
          <div className="page-heading">Pay Now</div>
    
         

{/*    */}


{/* <PayMethod /> */}
<Pay2 />
         


        </div>
      </div>
      </div>

    </>
  );
};



export default PayNow
