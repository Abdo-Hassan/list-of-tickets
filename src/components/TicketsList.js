/* eslint-disable no-loop-func */
import React, { useState } from 'react';

let rowHeight = 35;
let defaultTableHeight = 600;

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
      end: index + Math.ceil((defaultTableHeight * 2) / rowHeight),
    });
  };

  // generate new rows [tickets] to the list on scrolling to prevent [performance issues]
  const generateRows = () => {
    let items = [];
    let index = scroll?.index;
    do {
      if (index >= rows.length) {
        index = rows.length;
        break;
      }

      const rowAttrs = {
        style: {
          position: 'absolute',
          top: index * rowHeight,
          height: rowHeight,
          lineHeight: `${rowHeight - 3}px`,
        },
      };

      //  add new ticket [row] to the list while scrolling until reach the bottom
      items.push(
        <tr {...rowAttrs} key={index}>
          {columns.map((column, i) => (
            <td key={i}>{rows[index][column]}</td>
          ))}
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

  const tbodyAttr = {
    style: {
      position: 'relative',
      display: 'inline-block',
      height: tableHeight,
      maxHeight: tableHeight,
      width: '100%',
    },
  };

  return (
    <div className='wrapper'>
      {/* table head */}
      <table className='table-head'>
        <thead>
          <tr className='tr'>
            {columns.map((name, i) => (
              <th key={i}>{name}</th>
            ))}
          </tr>
        </thead>
      </table>

      {/* table content that has scrolling effect */}
      <table {...tableAttrs} className='table-content'>
        <tbody {...tbodyAttr}>{generateRows()}</tbody>
      </table>
    </div>
  );
};

export default TicketsList;
