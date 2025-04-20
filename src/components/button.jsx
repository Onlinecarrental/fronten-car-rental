import React from "react";
import { Link } from "react-router-dom";

function Button({
  title,
  iconRight = null,
  to = "/",
  height = "50px",
  width = "150px",
  bgColor = "bg-[#5937e0]",
  textColor = "text-white",
  hoverBgColor = "hover:bg-[#a9a9a9]",     // Ensure lowercase color hex code
  hoverTextColor = "hover:text-white",
  rounded = "rounded-[10px]",
  shadow = "shadow-lg",
  onClick = null,
}) {
  return (
    <Link to={onClick ? "#" : to} onClick={onClick || null}>
      <button
        className={`font-jakarta text-[20px] font-[500] px-4 lg:px-5 flex items-center justify-center gap-2 
          ${bgColor} ${textColor} ${hoverBgColor} ${hoverTextColor} ${rounded} ${shadow} transition-all duration-300`}
        style={{ height, width }}
      >
        {title}
        {iconRight && <span className="ml-2">{iconRight}</span>}
      </button>
    </Link>
  );
}

export default Button;
