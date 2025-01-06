import React from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  ariaInvalid?: boolean;
  type: string;
  error?: string;
  value?: string;
  disabled?: boolean;
  autocomplete?: string;
  autofocus?: boolean;
  inputClassName?: string;
  placeholder?: string;
}

const Input = React.forwardRef<HTMLInputElement, IProps>(
  (
    {
      className,
      type,
      ariaInvalid,
      error,
      value,
      disabled,
      autocomplete,
      autofocus,
      inputClassName,
      placeholder,
      ...props
    },
    ref
  ) => {
    return (
      <>
        {/* 인풋창이랑 사이즈 딱맞는 바깥박스 */}
        <div
          className={`${error ? "animate-shake" : ""} ${
            className ?? ""
          } relative`}
        >
          {/* 인풋창 */}
          <input
            ref={ref}
            {...props}
            className={`peer w-full rounded-lg ${
              error ? "border-red-500" : ""
            } ${inputClassName ?? ""} placeholder-gray-500`}
            type={type}
            aria-invalid={!ariaInvalid ? undefined : error ? "true" : "false"}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            autoFocus={autofocus}
            autoComplete={autocomplete}
          />

          {/* placeholder 부분 */}
          {error && (
            <small
              role="alert"
              className={`${error ? "animate-shake" : ""} text-red-500`}
            >
              {error}
            </small>
          )}
        </div>
      </>
    );
  }
);

Input.displayName = "Input";

export default Input;
