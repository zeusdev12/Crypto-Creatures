import React, { useEffect, useState } from "react";
import "./Slider.css";
import Slider from "react-slick";
import { Link, withRouter } from "react-router-dom";
import { getFilePathFromID } from "../../utils/util";


const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <img src="img/right-arrow.png" onClick={onClick} className="right_arrow" />
  );
}

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <img src="img/left-arrow.png" onClick={onClick} className="left_arrow" />
  );
}

const SliderMain = (props) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [url, setURL] = useState([]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    beforeChange: (current, next) => setActiveSlide(next),
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    centerMode: true,
    dots: false,
    centerPadding: "0",
    swipeToSlide: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1490,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const templateImages = Array(30).fill(0).map((_, index) => {
    return (
      <div
        className={index === activeSlide ? "activeSlide" : "slide"}
        key={index}
      >
        <div className="slideWrapper">
          <img src={url[index]} />
        </div>
      </div>
    );
  });

  useEffect(async () => {
    const resultArray = await Promise.all(Array(30).fill(0).map((_, index) => getFilePathFromID(index + 1, "creatures", true)));
    setURL(resultArray.map((item) => item.resultURL));
  }, []);
  
  return (
    <div
      id="slider"
      className={props.darkTheme ? "slider" : "slider lightTheme"}
    >
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <div className="container">
        <div className="main_slider">
          <p className="">LEGENDARY CREATURES</p>
          <Slider {...settings}>
            {templateImages}
          </Slider>
          <span>
            Buy, breed & sell our legendary creatures. 
            These creatures are killed to earn Greater mana potion (GMP),
            those that survive the gauntlet earn you some tokens that 
            can in turn be used to upgrade your towers and expand your maps.
          </span>
          {/* <div className="slider_count">{activeSlide + 1}/30</div> */}
          <Link className="all_cards" exact to="/marketplace/Creatures">View All</Link>
        </div>
      </div>
    </div>
  );
}

export default SliderMain;
