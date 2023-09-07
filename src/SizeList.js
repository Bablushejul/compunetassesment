import React from 'react';

const SizeList = (props) => {
  return (
    <ul>
      {props.onList.map((item)=><li key={item}>{item.size}</li>)}
    </ul>
  );
}

export default SizeList;
