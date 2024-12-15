/*
 * Copyright PT Len Innovation Technology
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INNOVATION TECHNOLOGY, AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INNOVATION TECHNOLOGY, NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INNOVATION TECHNOLOGY, AS APPLICABLE.
 *
 * Author             : Ibnu
 * Version, Date      : 1.0.0, 2 Dec 2024
 * Description        : Input component is a component that creates a input that accept name and another props dynamically
 */

import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  disabled?: boolean;
  value?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, disabled, value, ...rest } = props;

  return (
    <div className="relative w-full">
      <input
        ref={ref}
        disabled={disabled}
        className={
          "cursor-text outline-none focus:ring-2 rounded-md focus:ring-red-500 placeholder:text-sm bg-[#262d28] text-white text-lg py-2 px-6 border-none w-full pr-10"
        }
        {...rest}
      />
    </div>
  );
});

Input.displayName = "Input";

export default Input;
