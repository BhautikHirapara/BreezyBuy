import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectOrder } from './orderSlice';

export default function Counter() {
  const order = useSelector(selectOrder);

  return (
    <>
      <div>
        {order.map(()=>(
          <p>Hiiii</p>
        ))}
       </div>
    </>
  );
}
