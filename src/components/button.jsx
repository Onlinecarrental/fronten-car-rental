import React from "react";
import { Link } from "react-router-dom";
function Button({
  title,
  iconRight = null,
  to = "/",
  height = "50px",
  width = "150px",
  bgColor = "#5937E0",
  hoverBgColor = "#A9A9A9",
  hoverTextColor = "white",
  activeColor = "#000000",
  boxShadow = true,
  rounded = "rounded-[10px]",
  onClick = null,
}) {
  return (
    <Link to={onClick ? "#" : to} onClick={onClick || null}>
      <button
        className={`font-jakarta text-[20px] font-[500] px-4 lg:px-5 transition duration-300 ease-in-out flex items-center justify-center gap-2 ${rounded}`}
        style={{
          backgroundColor: bgColor,
          color: "Black",
          height: height,
          width: width,
          transition: "background-color 0.2s, color 0.2s, transform 0.2s",
          boxShadow: boxShadow ? "4px 10px 30px 0px rgba(0, 0, 0, 0.3)" : "none",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = hoverBgColor;
          e.target.style.color = hoverTextColor;
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = bgColor;
          e.target.style.color = "Black";
        }}
        onMouseDown={(e) => (e.target.style.backgroundColor = activeColor)}
        onMouseUp={(e) => {
          e.target.style.backgroundColor = hoverBgColor;
          e.target.style.color = hoverTextColor;
        }}
      >
        {title}
        {iconRight && <span className="ml-2">{iconRight}</span>}
      </button>
    </Link>
  );
}

export default Button;
