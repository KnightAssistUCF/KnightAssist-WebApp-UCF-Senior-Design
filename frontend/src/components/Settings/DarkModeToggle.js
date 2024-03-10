import {React, useState, useEffect} from "react";
import "./toggle.css";

export const DarkModeToggle = () => {
    const [toggle, setToggle] = useState(false);

    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const themeData = defaultDark ? 'dark' : 'light';
const [theme, setTheme] = useState(sessionStorage.getItem("theme"));
sessionStorage.setItem("theme", themeData);

    useEffect(() => {
        if (toggle) {
          document.body.classList.add('dark');
        } else {
          document.body.classList.remove('dark');
        }
        switchTheme();
      },); 

      const switchTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
      }
  return (
    <>
        <div className="t1" data-theme={theme}>Turn {toggle ? 'off' : 'on'} the dark mode</div>
       
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