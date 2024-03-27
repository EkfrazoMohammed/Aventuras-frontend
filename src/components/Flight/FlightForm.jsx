import React, { useState } from 'react';
import axios from 'axios';

function FlightForm() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [currencyCode, setCurrencyCode] = useState('INR');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const baseUrl = 'https://test.api.amadeus.com/v2/shopping/flight-offers';
    const params = new URLSearchParams({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: departureDate,
      returnDate: returnDate,
      adults: adults,
      currencyCode: currencyCode,
      max: maxPrice,
    });
    const url = `${baseUrl}?${params.toString()}`;

    // console.log(origin)
    // console.log(params.toString())
    const accessToken = 'CtyqVLouMXIFLflvZ1pupmAb2f61'; // Replace with your Amadeus access token

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log('API Response:', response.data);
      // Handle the response data as needed
    } catch (error) {
      // console.error('API Error:', error);
      // Handle the error as needed
    }
  };


  return (
    <form onSubmit={handleSubmit}>
    <label htmlFor="origin">Origin:</label>
    <select id="origin" name="origin" value={origin} onChange={(e) => setOrigin(e.target.value)}>
      <option value="BLR">Bengaluru (BLR)</option>
      <option value="BOM">Mumbai (BOM)</option>
      <option value="IXB">Bagdogra (IXB)</option>
      <option value="DEL">Delhi (DEL)</option>
      <option value="MAA">Chennai (MAA)</option>
    </select>

    <br />

    <label htmlFor="destination">Destination:</label>
    <select id="destination" name="destination" value={destination} onChange={(e) => setDestination(e.target.value)}>
      <option value="BLR">Bengaluru (BLR)</option>
      <option value="BOM">Mumbai (BOM)</option>
      <option value="IXB">Bagdogra (IXB)</option>
      <option value="DEL">Delhi (DEL)</option>
      <option value="MAA">Chennai (MAA)</option>
    </select>

    <br />

    <label htmlFor="departureDate">Departure Date:</label>
    <input type="date" id="departureDate" name="departureDate" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />

    <br />

    <label htmlFor="returnDate">Return Date:</label>
    <input type="date" id="returnDate" name="returnDate" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />

    <br />

    <label htmlFor="adults">Adults:</label>
    <input type="number" id="adults" name="adults" min="1" max="9" value={adults} onChange={(e) => setAdults(parseInt(e.target.value))} />

    <br />

    <label htmlFor="currencyCode">Currency:</label>
    <select id="currencyCode" name="currencyCode" value={currencyCode} onChange={(e) => setCurrencyCode(e.target.value)}>
      <option value="INR">Indian Rupee (INR)</option>
      {/* Add more currency options if needed */}
    </select>

    <br />

    <label htmlFor="maxPrice">Max Price:</label>
    <input type="number" id="maxPrice" name="maxPrice" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />

    <br />

    <input type="submit" value="Search" />
  </form>
 
  );
}

export default FlightForm;
