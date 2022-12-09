import React from "react";
import "./AboutPage.css";

class AboutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        id="about"
        className={this.props.darkTheme ? "about" : "about lightTheme"}
      >
        <div className="container">
          <div className="about_wrapper">
            <div className="about_background"/>
            <div className="about_main">
              <p>ABOUT US</p>
              <div className="video">
                <iframe
                  width={window.innerWidth > 450 ? window.innerWidth * 0.38 : "400"}
                  height={window.innerWidth > 450 ? window.innerWidth * 0.38 * 0.56 : "225"}
                  src="https://www.youtube.com/embed/GwZvip416NU"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="about_text">
                Cryptocreatures is a metaverse Built on Solana and Binance smart chain. 
                We seek to enable all users to proactively engage in the future of gaming 
                and Non-fungible tokens by remaking a classic tower defense with blockchain 
                and NFT elements incorporated. <br/><br/>
                Users can earn tokens by killing creatures, 
                tower upgrades allow users to kill the toughest of creatures. 
                Users can not only create their own maps and sell them on the market place 
                but breed their own creatures.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutPage;
