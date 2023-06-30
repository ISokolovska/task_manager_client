import React, { useState } from "react";
import { Option } from "../../types/user";

interface SelectProps {
  placeholder: string;
  options: Option[];
  onChange: (selection: Option) => void;
}

export const Select: React.FC<SelectProps> = ({
  placeholder,
  options,
  onChange,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <>
      <div onClick={() => setShowOptions(!showOptions)}>
        <span>{placeholder}</span>
      </div>
      {showOptions && (
        <ul>
          {options.map((option) => (
            <li onClick={() => onChange(option)} key={option.value}>
              <span>{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Select;
