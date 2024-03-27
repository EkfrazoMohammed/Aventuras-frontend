import * as React from 'react';
import { useState } from "react";

import { DataGrid } from '@mui/x-data-grid';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';





export default function Thirdtable() {
  const [age, setAge] = React.useState('');

  const options = ["Pending", "Success", "Failed"];

  const [selected, setSelected] = useState(options[0]);
  const handleChange = (event) => {
    // console.log(event.target.value);
  };
  const handleClick = (event, cellValues) => {
    // console.log(cellValues.row);
  };

  const handleCellClick = (param, event) => {
    event.stopPropagation();
  };

  const handleRowClick = (param, event) => {
    event.stopPropagation();
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },

    {
      field: 'Name',
      headerName: 'Name',

      width: 150,
    },
    {
      field: 'Email',
      headerName: 'Email',

      width: 150,
    },
    {
      field: 'Mobile_Number',
      headerName: 'Mobile_Number',

      width: 150,
    },
    {
      field: 'Query',
      headerName: 'Query',

      width: 550,
    },

    // {
    //   field: "payment",
    //   renderCell: (cellValues) => {
    //     return (
    //       <div className="payment status" key={rows.id}>
    //         {selected}
    //       </div>
    //     );
    //   }
    // },
    // {
    //   field: "payment action",
    //   width: 150,
    //   renderCell: (cellValues) => {
    //     return (
    //       <>

    //         <select value={selected} onChange={(e) => setSelected(e.target.value)}>
    //           {options.map((value) => (
    //             <option value={value} key={value}>
    //               {value}
    //             </option>
    //           ))}
    //         </select>
    //       </>
    //     );
    //   },

    // },


  ];

  const rows = [
    { id: 1, Name: 'Alex', Email: 'alex@gmail.com', Mobile_Number: '9911223344', Query: 'hi,can i book package for sri lanka?' },
    { id: 2,Name: 'Raj', Email: 'raj@gmail.com', Mobile_Number: '9912223344', Query: 'hi,are there more slots for kashmir PACKAGEID:AVEN123423?'},
    { id: 3,  Name: 'Rahul', Email: 'rahul@gmail.com', Mobile_Number: '9811223344', Query: 'hi,are there flight bookings for Manali PACKAGEID:AVEN123426?' },
    { id: 4, Name: 'John', Email: 'john@gmail.com', Mobile_Number: '9711223344', Query: 'hi,can u send me quotation in pdf file?' },


  ];
  //   const handleChange = (event) => {
  //   setAge(event.target.value);
  // };
  return (
    <div style={{ height: 'auto', width: '100%', padding: '1rem 0' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}

        rowsPerPageOptions={[5]}

      />
    </div>
  );
}

