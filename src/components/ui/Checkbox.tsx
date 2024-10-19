import React from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  className?: string;
  ariaInvalid?: boolean;
  type: string;
  error?: string;
  value?: string;
  disabled?: boolean;
  inputClassName?: string;
}

const LABEL_CLASS = `text-gray-500 duration absolute ml-6 scale-75 bg-white transition-all origin-left	
peer-placeholder-shown:top-7 peer-placeholder-shown:left-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-slate-500
peer-focus:top-px  peer-focus:scale-75 peer-checked:text-black pointer-events-none  hover:text-red-500`;

const Checkbox = React.forwardRef<HTMLInputElement, IProps>(
  (
    {
      labelText,
      className,
      type,
      ariaInvalid,
      error,
      value,
      disabled,
      inputClassName,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <label className="w-full">
          <div
            className={`flex items-center ${error ? "animate-shake" : ""} ${
              className ?? ""
            } relative`}
          >
            <input
              ref={ref}
              {...props}
              className={`text-gray-700 peer hidden rounded-lg ${
                error ? "border-red-500" : ""
              } ${inputClassName ?? ""}`}
              type={type}
              aria-invalid={!ariaInvalid ? undefined : error ? "true" : "false"}
              value={value}
              disabled={disabled}
            />
            <div className="w-5 h-5 bg-gray-200 rounded-lg flex items-center justify-center peer-checked:bg-violet-500" />
            <label className={LABEL_CLASS}>{labelText}</label>
            {error && (
              <small
                role="alert"
                className={`${error ? "animate-shake" : ""} text-red-500`}
              >
                {error}
              </small>
            )}
          </div>
        </label>
      </>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
