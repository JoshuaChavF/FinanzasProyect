import React from "react";

const Select = ({ options, value, onChange, className }) => {
  return (
    <select value={value} onChange={onChange} className={`border p-2 rounded-md w-full ${className}`}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export { Select };
