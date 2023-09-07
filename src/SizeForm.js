import React, { useState } from "react";

const List = [
  { label: "L", value: "L" },
  { label: "M", value: "M" },
  { label: "S", value: "S" },
  { label: "XL", value: "XL" },
  { label: "XXL", value: "XXL" },
];
const SizeForm = (props) => {

  const [value,setValue]=useState('')
 
const handlSubmit =(event)=>{
setValue(event.target.value)
props.onSet(value)
}
console.log(value)

  return (
    
      <select onChange={handlSubmit}>
        {List.map(option =>(<option value={option.value}>{option.label}</option>))}
      </select>
    
  );
};

export default SizeForm;
