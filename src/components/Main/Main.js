import React, { useRef, useState } from "react";
import "./Main.css";
import { Link } from "react-router-dom";

const Main = (props) => {
  // const [posData, setPosData] = useState({x: 0, y: 0, rotate: 1, height: null, width: null});
  // const { darkTheme } = props;
  // const item = useRef();
  // const transform = {
  //   transform: `scale(${posData.rotate}) translate(${posData.x}px, ${posData.y}px)`,
  //   transition: "0.5s",
  //   pointerEvents: "none",
  // };

  // const handleMouseMove = (event) => {
  //   let x;
  //   let y;
  //   const height = document.getElementById("main").offsetHeight;
  //   const width = document.getElementById("main").offsetWidth;
  //   if (((event.clientX / width) * 100).toFixed(0) > 50) {
  //     x = ((event.clientX / width) * 100 - 50).toFixed(0);
  //   } else {
  //     x = -(50 - ((event.clientX / width) * 100).toFixed(0));
  //   }
  //   if (((event.clientY / height) * 100).toFixed(0) > 50) {
  //     y = ((event.clientY / height) * 100 - 50).toFixed(0);
  //   } else {
  //     y = -(50 - ((event.clientY / height) * 100).toFixed(0));
  //   }
  //   setPosData({
  //     ...posData,
  //     x,
  //     y,
  //     rotate: "1.08",
  //   });

  //   if (item.current.style.pointerEvents != "auto")
  //     item.current.style.pointerEvents = "auto";
  // }

  // const handleMouseLeave = () => {
  //   setPosData({ x: 0, y: 0, rotate: 1 });
  //   if (item.current.style.pointerEvents != "auto")
  //     item.current.style.pointerEvents = "auto";
  // }

  // const handleMouseScroll = (event)=>  {
  //   if (item.current.style.pointerEvents != "none")
  //     item.current.style.pointerEvents = "none";
  // }

  return (
    <div className="wrapper_main">
      <div className="container">
        <div className="main-logo">
          <img src="img/main-logo.png" />
          <a className="play_now" href="/cryptocreatures.zip">PLAY NOW</a>
        </div>
      </div>

      {/* <div
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onWheel={handleMouseScroll}
        className={darkTheme ? "main" : "main lightTheme"}
        style={transform}
        ref={item}
      > */}
        <div className={window.innerWidth <= 1980 && window.innerWidth > 450 ? "fullscreen" : "big-fullscreen"}>
          { window.innerWidth <= 1980 && window.innerWidth > 450 ? <img src="/main.png"/> : <></> }
          {/* <video autoPlay={true} muted={true} loop={true} id="videofullscreen">
            <source src="/main.mp4" type="video/mp4" />
          </video> */}
        </div>
      </div>
    // </div>
  );
}

export default Main;
