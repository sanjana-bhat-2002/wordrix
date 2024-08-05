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
      className={`w-12 h-12 bg-background rounded-sm border-2 border-[#a1a1a1] text-center text-white font-semibold text-lg ${className}`}
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
