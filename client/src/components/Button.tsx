import React from "react";

type Props = {
  text: string;
  onClick: any;
  variant: "primary" | "outlined";
  className?: string;
};

const Button = ({ text, onClick, variant, className = "" }: Props) => {

  const getVariantStyles = (variant: "primary" | "outlined") => {
    switch (variant) {
      case "primary": 
        return "bg-primary text-white";
      case "outlined":
        return "border border-primary text-primary hover:bg-primary hover:text-white";
    }
  }

  return (
    <button
      className={`${className} rounded-lg py-2 px-4 self-start mt-3 ${getVariantStyles(variant)}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
