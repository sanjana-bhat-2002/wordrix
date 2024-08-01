import React, { ForwardedRef } from "react";

interface BoxProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: ForwardedRef<HTMLInputElement>;
  className?: string;
  disabled: boolean;
}

const Box: React.FC<BoxProps> = ({
  value,
  onChange,
  onKeyUp,
  inputRef,
  className,
  disabled,
}) => {
  return (
    <input
      type="text"
      className={`w-16 h-16 border border-gray-300 text-center text-black text-lg ${className}`}
      maxLength={1}
      value={value}
      onChange={onChange}
      onKeyUp={onKeyUp}
      ref={inputRef}
      disabled={disabled}
    />
  );
};

export default Box;
