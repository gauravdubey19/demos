//import important packages
import React from "react";
import { InputFieldProps } from "@/lib/types";


export const InputField: React.FC<InputFieldProps> = ({
    id,
    label,
    defaultValue,
    type = "text",
    isDisabled = false,
    capitalize = false,
    value,
    setValue,
    required = false,
  }) => (
    <div className="flex flex-col font-dmSans tracking-wider">
    <label htmlFor={id} className="block text-sm font-medium text-color-tertiary px-2">
      {label}
    </label>
    <input
      id={id}
      type={type}
      disabled={isDisabled}
      placeholder={label}
      defaultValue={defaultValue}
      value={value !== undefined ? value : ""}
      onChange={
        setValue
          ? (e) => {
              let newValue = e.target.value;
              setValue(newValue);
            }
          : () => {}
      }
      required={required}
      className={`text-md p-2 px-4 bg-transparent border-b hover:border-b-primary focus:border-b-primary outline-none ${
        isDisabled ? "text-color-tertiary" : "text-black border-b-primary"
      }  ${capitalize ? "capitalize" : ""}`}
    />
    </div>
  );