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

  // handle onScrolling to and set sized of the table list
  const onScroll = ({ target }) => {
    let scrollTop = target.scrollTop;
    let index = Math.floor(scrollTop / rowHeight);

    setScroll({
      index,
      top: (scrollTop / rowHeight) * rowHeight,
      end: index + Math.ceil((tableHeight * 2) / rowHeight),
    });
  };

  // generate new rows [tickets] to the list on scrolling to prevent [performance issues]
  const generateRows = () => {
    let items = [];
    let index = scroll?.index;

    do {
      if (scroll?.index >= rows.length) {
        index = rows.length;
        break;
      }

      //  add new ticket [row] to the list while scrolling until reach the bottom
      items.push(
        <tr key={index}>
          {columns.map((column, i) => {
            console.log('ROWS INDEX COLUMN', rows[index][column]);
            return <td key={i}>{rows[index][column]}</td>;
          })}
        </tr>
      );

      index++;
    } while (index < scroll?.end);

    return items;
  };

  const totalTableHeight =
    defaultTableHeight > tableHeight ? tableHeight + 2 : defaultTableHeight;

  const tableAttrs = {
    style: { height: totalTableHeight },
    onScroll: onScroll,
  };

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
