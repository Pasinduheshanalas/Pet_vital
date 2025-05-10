import React, { useState } from "react";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import classNames from "classnames";
import "./index.scss";
import { InputFieldProps } from "./types";

const TextInput: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  type,
  width = "100%", // Default width to 100%
  height = "10px", // Default height to "auto"
  darkMode = false, // Default dark mode to false
  customClass = "", // Default custom class to empty string
  value = "",
  style = { height: "40px" },
  name,
  maxLength,
  onChange,
}) => {
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <div
      className={classNames("input-field", { "dark-mode": darkMode })}
      style={{ width, height }}
    >
      <label className={classNames("input-label", { "dark-mode": darkMode })}>
        {label}
      </label>
      <Input
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        type={inputType}
        maxLength={maxLength}
        className={classNames(
          "custom-input",
          { "dark-mode": darkMode },
          customClass
        )}
        suffix={
          type === "password" &&
          (inputType === "password" ? (
            <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
          ) : (
            <EyeTwoTone onClick={togglePasswordVisibility} />
          ))
        }
        style={style}
      />
    </div>
  );
};

export default TextInput;
