import React from 'react';

interface DropdownProps {
    id: string;
    label: string;
    value: string | undefined;
    options: string[];
    isDisabled?: boolean;
    required?: boolean;
    setValue: (value: string) => void;
    defaultValue?: string;
  }
export const Dropdown: React.FC<DropdownProps> = ({
    id,
    label,
    value,
    options,
    isDisabled,
    setValue,
    defaultValue,
    required,
  }) => {
    return (
      <div className="dropdown">
        <label htmlFor={id} className="block text-sm font-medium text-color-tertiary px-2">
          {label}
        </label>
        <select
        required={true}
          id={id}
          value={value !== undefined ? value : options[0]} // Default to the first option if value is undefined
          disabled={isDisabled}
          onChange={(e) => setValue(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-3 text-base focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  };