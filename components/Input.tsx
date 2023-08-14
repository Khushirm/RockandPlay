import React from "react";

interface InputProps {
  id: string;
  value: string;
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  name?: string;
}
const Input: React.FC<InputProps> = ({
  id,
  value,
  label,
  onChange,
  type,
  name,
}) => {
  return (
    <div>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="block px-3 py-2 rounded-md w-full text-red-500 bg-neutral-800"
        placeholder={label}
        name={name}
      />
      <label className="text-md text-zinc-400" htmlFor={id}></label>
    </div>
  );
};
export default Input;
