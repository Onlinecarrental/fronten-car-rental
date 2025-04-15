import React from "react";
import { Link } from "react-router-dom";

function Button({
  title,
  to = "/",                      // Default route
  height = "50px",
  width = "150px",
  bgColor = "#5937E0 ",            // Default background color
  hoverBgColor = "#A9A9A9",       // Hover background color
  hoverTextColor = "white",       // Hover text color
  activeColor = "#000000",        // Active color
  boxShadow = true,               // Shadow enabled by default
  rounded = "rounded-[10px]",     // ✅ Tailwind border radius (dynamic)
  onClick = null,                 // Optional click
}) {
  return (
    <Link to={onClick ? "#" : to} onClick={onClick || null}>
      <button
        className={`font-jakarta text-[20px] font-[500] px-4 lg:px-5 transition duration-300 ease-in-out ${rounded}`}
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
      </button>
    </Link>
  );
}

export default Button;
