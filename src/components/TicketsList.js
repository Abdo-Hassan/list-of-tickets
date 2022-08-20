import React, { useState } from 'react';

let rowHeight = 35;
let defaultTableHeight = 550;

const TicketsList = ({ rows }) => {
  const [scroll, setScroll] = useState({
    top: 0,
    index: 0,
    end: Math.ceil((defaultTableHeight * 2) / rowHeight),
  });
  let columns = Object.keys(rows[0]);
  let tableHeight = rowHeight * rows?.length;
  return (
    <>
      {/* table head */}
      <table className='table-head'>
        <thead>
          <tr>
            {columns.map((name, i) => (
              <th key={i}>{name}</th>
            ))}
          </tr>
        </thead>
      </table>
    </>
  );
};

export default TicketsList;
