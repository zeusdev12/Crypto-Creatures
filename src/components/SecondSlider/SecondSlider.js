import React from "react";
import "./SecondSlider.css";
import { Link } from "react-router-dom";


class SecondSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeSlide: 0 };
  }

  render() {

    return (
      <div
        id="slider"
        className={
          this.props.darkTheme ? "second_slider" : "second_slider lightTheme"
        }
      >
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <div className="container">
          <div className="main_second_slider">
            <p className="">BUILD YOUR OWN MAP</p>
            <div className="content">
              <div className="select_menu">
                <div className="main_second_slide">
                  <h5>Play tower defense</h5>
                  <Link exact to="/towers" ><img src="img/card-2.png" /></Link>
                </div>
                <div className="main_second_slide">
                  <h5>Breed Creatures</h5>
                  <Link exact to="/creatures" ><img src="img/card-1.png" width="341" height="193" /></Link>
                </div>
                <div className="main_second_slide">
                  <h5>Create a map &nbsp;</h5>
                  <Link exact to="/maps" ><img src="img/card-3.png" /></Link>
                </div>
              </div>
              <div className="background"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SecondSlider;
