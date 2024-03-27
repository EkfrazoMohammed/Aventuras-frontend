import React, { useState } from 'react';
import './FlightFormSubmit.scss';
import { API, baseURL } from '../../api/apirequest';

import { message} from 'antd';
import { notification } from 'antd';
const FlightFormSubmit = () => {
  const [data, setData] = useState({
    user_name: '',
    user_email: '',
    user_mobile_number: '',
    user_location: '',
    request_origin: '',
    request_destination: '',
    request_date_of_departure: '',
    request_date_of_arrival: '',
    direct_flight: '',
    one_way: '',
    adults: '',
    children: '',
    infants: '',
    flight_class: '',
    Currency: '',
  });
  const options = [
    { value: '', label: 'Select Destination' },
    { value: 'BLR', label: 'Bengaluru (BLR)' },
    { value: 'HYD', label: 'Hyderabad (HYD)' },
    { value: 'BOM', label: 'Mumbai (BOM)' },
    { value: 'DEL', label: 'Delhi (DEL)' },
    { value: 'MAA', label: 'Chennai (MAA)' },
    { value: 'CCU', label: 'Kolkata (CCU)' },
    { value: 'AMD', label: 'Ahmedabad (AMD)' },
    { value: 'COK', label: 'Kochi (COK)' },
    { value: 'PNQ', label: 'Pune (PNQ)' },
    { value: 'GOI', label: 'Goa (GOI)' },
    { value: 'IXM', label: 'Madurai (IXM)' },
    { value: 'JAI', label: 'Jaipur (JAI)' },
    { value: 'TRV', label: 'Thiruvananthapuram (TRV)' },
    { value: 'ATQ', label: 'Amritsar (ATQ)' },
    { value: 'IXB', label: 'Bagdogra (IXB)' },
    { value: 'CCJ', label: 'Kozhikode (CCJ)' },
    { value: 'IXR', label: 'Ranchi (IXR)' },
    { value: 'BBI', label: 'Bhubaneswar (BBI)' },
    { value: 'VNS', label: 'Varanasi (VNS)' },
    { value: 'SXR', label: 'Srinagar (SXR)' },
    { value: 'IXZ', label: 'Port Blair (IXZ)' },
    { value: 'IXE', label: 'Mangalore (IXE)' },
    { value: 'LKO', label: 'Lucknow (LKO)' },
    { value: 'IXC', label: 'Chandigarh (IXC)' },
    { value: 'VGA', label: 'Vijayawada (VGA)' },
    { value: 'PAT', label: 'Patna (PAT)' },
    { value: 'RPR', label: 'Raipur (RPR)' },
    { value: 'TRZ', label: 'Tiruchirappalli (TRZ)' },
    { value: 'IXJ', label: 'Jammu (IXJ)' },
    { value: 'HKG', label: 'Hong Kong International Airport (HKG)' },
    { value: 'PVG', label: 'Shanghai Pudong International Airport (PVG)' },
    { value: 'MAD', label: 'Adolfo Suárez Madrid–Barajas Airport (MAD)' },
    { value: 'MUC', label: 'Munich Airport (MUC)' },
    { value: 'ATL', label: 'Hartsfield-Jackson Atlanta International Airport (ATL)' },
    { value: 'LAX', label: 'Los Angeles International Airport (LAX)' },
    { value: 'JFK', label: 'John F. Kennedy International Airport (JFK)' },
    { value: 'ORD', label: "O'Hare International Airport (ORD)" },
    { value: 'LHR', label: 'London Heathrow Airport (LHR)' },
    { value: 'CDG', label: 'Charles de Gaulle Airport (CDG)' },
    { value: 'FRA', label: 'Frankfurt Airport (FRA)' },
    { value: 'DXB', label: 'Dubai International Airport (DXB)' },
    { value: 'SIN', label: 'Singapore Changi Airport (SIN)' },
    { value: 'PEK', label: 'Beijing Capital International Airport (PEK)' },
    { value: 'ICN', label: 'Incheon International Airport (ICN)' },
    { value: 'BKK', label: 'Suvarnabhumi Airport (BKK)' },
    { value: 'SYD', label: 'Sydney Airport (SYD)' },
    { value: 'MEX', label: 'Mexico City International Airport (MEX)' },
    { value: 'NRT', label: 'Narita International Airport (NRT)' },
    { value: 'IST', label: 'Istanbul Airport (IST)' },
    { value: 'AMS', label: 'Amsterdam Airport Schiphol (AMS)' },
    { value: 'CAN', label: 'Guangzhou Baiyun International Airport (CAN)' },
  ];
  
  const currencyOptions = [
    { value: '', label: 'Select Currency' },
    
    { value: 'INR', label: 'Indian Rupee (INR)' },
    { value: 'USD', label: 'US Dollar (USD)' },
    { value: 'EUR', label: 'Euro (EUR)' },
    
    { value: 'AED', label: 'United Arab Emirates Dirham (AED)' },
    { value: 'GBP', label: 'British Pound (GBP)' },
    { value: 'JPY', label: 'Japanese Yen (JPY)' },
    { value: 'AUD', label: 'Australian Dollar (AUD)' },
    { value: 'CAD', label: 'Canadian Dollar (CAD)' },
    { value: 'CHF', label: 'Swiss Franc (CHF)' },
    { value: 'CNY', label: 'Chinese Yuan (CNY)' },
    { value: 'MXN', label: 'Mexican Peso (MXN)' },
    { value: 'BRL', label: 'Brazilian Real (BRL)' },
    { value: 'ZAR', label: 'South African Rand (ZAR)' },
    { value: 'NZD', label: 'New Zealand Dollar (NZD)' },
    { value: 'SGD', label: 'Singapore Dollar (SGD)' },
    { value: 'HKD', label: 'Hong Kong Dollar (HKD)' },
    { value: 'SEK', label: 'Swedish Krona (SEK)' },
    { value: 'NOK', label: 'Norwegian Krone (NOK)' },
    { value: 'DKK', label: 'Danish Krone (DKK)' },
    { value: 'TRY', label: 'Turkish Lira (TRY)' },
    { value: 'RUB', label: 'Russian Ruble (RUB)' },
    { value: 'KRW', label: 'South Korean Won (KRW)' },
    { value: 'PLN', label: 'Polish Złoty (PLN)' },
    { value: 'THB', label: 'Thai Baht (THB)' },
    { value: 'IDR', label: 'Indonesian Rupiah (IDR)' },
    { value: 'MYR', label: 'Malaysian Ringgit (MYR)' },
    { value: 'PHP', label: 'Philippine Peso (PHP)' },
    { value: 'CZK', label: 'Czech Koruna (CZK)' },
    { value: 'HUF', label: 'Hungarian Forint (HUF)' },
    { value: 'ILS', label: 'Israeli Shekel (ILS)' },
  ];
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setData((prevData) => ({ ...prevData, [name]: inputValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers that are required for your API
      },
    };
    try {
      let ob = {
        data,
      };
      const res = await API.post(baseURL + '/api/flight-enquiries', ob, config);
      notification.success({
        message: 'Enquiry Sent successfully!',
        // description: 'You have successfully logged in.',
        
        duration: 2, // Duration in seconds (adjust as needed)
      });

      setData({
        user_name: '',
        user_email: '',
        user_mobile_number: '',
        user_location: '',
        request_origin: '',
        request_destination: '',
        request_date_of_departure: '',
        request_date_of_arrival: '',
        direct_flight: '',
        one_way: '',
        adults: '',
        children: '',
        infants: '',
        flight_class: '',
        Currency: '',
      });

      // Perform any necessary actions after form submission
    } catch (error) {
      // console.error('Error submitting form:', error);
      notification.error({
        message: 'Unable to send Enquiry!',
        description: 'Please fill all details to send enquiry',
        
        duration: 2, // Duration in seconds (adjust as needed)
      });
    }
  };

  return (
    <div className="flight-form-container">
      <h1 className="form-title">Enquire Flights</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-wrapper">
          <div className="form-grid">
            <div className="form-col">
              <label className="form-label">
                *Passenger Name:
                <input type="text" name="user_name" onChange={handleChange} className="form-input" />
              </label>

              <label className="form-label">
                *Passenger Email:
                <input type="email" name="user_email" onChange={handleChange} className="form-input" />
              </label>
              <label className="form-label">
                *Passenger Mobile Number:
                <input
                  type="text"
                  name="user_mobile_number"
                  onChange={handleChange}
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Passenger Location:
                <input
                  type="text"
                  name="user_location"
                  onChange={handleChange}
                  className="form-input"
                />
              </label>
            </div>
            <div className="form-col">
              <label className="form-label">
                *Origin:
                <input
                  list="originOptions"
                  name="request_origin"
                  onChange={handleChange}
                  className="form-input"
                />
                <datalist id="originOptions">
                {options.map((option) => (
      <option key={option.value} value={option.label} />
    ))}
                </datalist>
              </label>

              <label className="form-label">
                *Destination:
                <input
                  list="destinationOptions"
                  name="request_destination"
                  onChange={handleChange}
                  className="form-input"
                />
                <datalist id="destinationOptions">
                {options.map((option) => (
      <option key={option.value} value={option.label} />
    ))}
                </datalist>
              </label>
              <label className="form-label">
                *Date of Departure:
                <input
                  type="date"
                  name="request_date_of_departure"
                  onChange={handleChange}
                  className="form-input"
                />
              </label>
              <label className="form-label">
                *Date of Arrival:
                <input
                  type="date"
                  name="request_date_of_arrival"
                  onChange={handleChange}
                  className="form-input"
                />
              </label>
            </div>
            <div className="form-col">
              <label className="form-label">
                *Adults:
                <input type="number" name="adults" onChange={handleChange} className="form-input" />
              </label>
              <label className="form-label">
                *Children:
                <input type="number" name="children" onChange={handleChange} className="form-input" />
              </label>
              <label className="form-label">
                *Infants:
                <input type="number" name="infants" onChange={handleChange} className="form-input" />
              </label>
              <label className="form-label">
  Flight Class:
  <input
    list="flightClassOptions"
    name="flight_class"
    onChange={handleChange}
    className="form-input"
  />
  <datalist id="flightClassOptions">
    <option value="ECONOMY" />
    <option value="PREMIUM_ECONOMY" />
    <option value="BUSINESS" />
    <option value="FIRST" />
  </datalist>
</label>
              {/* <label className="form-label">
                Flight Class:
                <select
                  name="flight_class"
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">Select FLIGHT CLASS</option>
                  <option value="ECONOMY">ECONOMY</option>
                  <option value="PREMIUM_ECONOMY">PREMIUM_ECONOMY</option>
                  <option value="BUSINESS">BUSINESS</option>
                  <option value="FIRST">FIRST</option>
                </select>
              </label> */}
            </div>
            <div className="form-col">
              <label className="form-label">
                Currency:
                <input
                  list="currencyOptions"
                  name="Currency"
                  onChange={handleChange}
                  className="form-input"
                />
                <datalist id="currencyOptions">
                {currencyOptions.map((option) => (
      <option key={option.value} value={option.label} />
    ))}
                </datalist>
              </label>
              <label className="form-label">
                <div className="span-1">
               <div className='label-1'> Direct Flights:
               </div><input
                  type="checkbox"
                  name="direct_flight"
                  onChange={handleChange}
                  className="form-input-c"
                  checked={data.direct_flight}
                />
                </div>
              </label>
              <label className="form-label">
                <div className="span-1">
               <div className='label-1'>    One Way:
               </div>
                <input
                  type="checkbox"
                  name="one_way"
                  onChange={handleChange}
                  className="form-input-c"
                  checked={data.one_way}
                />
                </div>
              </label>
             
            </div>
          </div>
          <button type="submit" className="form-submit-button">
            Enquire Flights
          </button>
        </div>
      </form>
    </div>
  );
};

export default FlightFormSubmit;
