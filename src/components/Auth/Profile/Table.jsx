import * as React from 'react';
import { useState } from "react";

import { DataGrid } from '@mui/x-data-grid';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

export default function Table() {
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
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'orderId', headerName: 'order Id', width: 150 },
    { field: 'PackageId', headerName: 'Package Id', width: 150 },
    
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
    { field: 'ReceivedAmount', headerName: 'ReceivedAmount', width: 150 },
    { field: 'PendingAmount', headerName: 'PendingAmount', width: 150 },
    {
      field: 'status',
      headerName: 'status',

      width: 150,
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
    { id: 1, orderId: 'OID123', PackageId: 'AVEN231234', Name: 'Alex', Email: 'alex@gmail.com', Mobile_Number: '9911223344',ReceivedAmount:'23450',PendingAmount:'2450',status:'success' },
    { id: 2, orderId: 'OID124', PackageId: 'AVEN231235', Name: 'Raj', Email: 'raj@gmail.com', Mobile_Number: '9912223344',ReceivedAmount:'23450',PendingAmount:'12450',status:'pending' },
    { id: 3, orderId: 'OID125', PackageId: 'AVEN231236', Name: 'Rahul', Email: 'rahul@gmail.com', Mobile_Number: '9811223344',ReceivedAmount:'23450',PendingAmount:'4450',status:'failed' },
    { id: 4, orderId: 'OID126', PackageId: 'AVEN231237', Name: 'John', Email: 'john@gmail.com', Mobile_Number: '9711223344',ReceivedAmount:'23450',PendingAmount:'8450',status:'success' },
 

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

