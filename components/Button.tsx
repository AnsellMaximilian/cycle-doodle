import clsx from "clsx";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary", // Default to primary if no variant is specified
  className,
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-200",
    ghost: "bg-transparent text-gray-800 hover:bg-gray-100 focus:ring-gray-200",
  };

  const combinedStyles = clsx(baseStyles, variantStyles[variant], className);

  return (
    <button className={combinedStyles} {...props}>
      {children}
    </button>
  );
};

export default Button;
