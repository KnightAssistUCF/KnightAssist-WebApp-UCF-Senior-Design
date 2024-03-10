import {React, useState} from "react";
import "./toggle.css";

export const DarkModeToggle = () => {
    const [toggle, setToggle] = useState(false);
  return (
    <>
        <div className="t1">Turn {toggle ? 'off' : 'on'} the dark mode</div>
       
        <div className='toggle-container' onClick={() =>  setToggle({
                toggle: !toggle
            })}>
            <div className={`toggle-btn ${!toggle ? "disable" : ""}`}>
                {toggle ? "ON" : "OFF"}
            </div>
        </div>

        <span className="emo">{toggle ? "🦉" : "🌤️"}</span>       
    </>
   
  );
};