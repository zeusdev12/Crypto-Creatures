import React, { useEffect, useState } from "react";
import "./Header.css";
import { slide as Menu } from "react-burger-menu";
import Parser from 'html-react-parser';
import { NavLink, Link, withRouter } from "react-router-dom";
import { getData } from '../../store/appStoreSlice';
import { connect, shortAddress } from '../../utils/util'
import { useSelector } from "react-redux";

const Header = (props) => {
  const [connectButton, setConnectButton] = useState("CONNECT WALLET");
  const {
    accountAddress,
    mapsNFT,
    gameToken,
    netId,
    mainNetId,
    inProcess,
    tikerName,
    darkTheme
  } = useSelector(getData);

  const changeStatus = () => {
    if (!inProcess) {
      if ( accountAddress && netId == mainNetId ) {

      } else {
        connect();
      }
    }
  }

  useEffect(() => {
    if (accountAddress) {
      setConnectButton(shortAddress(accountAddress));
      if (netId != mainNetId) {
        if (inProcess)
          setConnectButton("waiting ...");
        else
          setConnectButton("Wrong Network");
      }
    }
  }, [accountAddress, netId, inProcess]);
  
  return (
    <header
      id="header"
      className={darkTheme ? null : "lightTheme"}
    >
      <Menu
        right
        width={"100%"}
        outerContainerId={"root"}
        pageWrapId={"main"}
      >
        <div className="mobile_menu_header">
          <Link exact to="/">
            <img className="mobile-logo" src="/img/logo.png" />
          </Link>
          <div></div>
        </div>
        <Link className="menu-item"  exact to="/">
          Home
        </Link>
        <Link className="menu-item" exact to="/play-game">
          Play Now
        </Link>
        <Link className="menu-item" exact to="/dashboard">
          Dashboard
        </Link>
        <Link className="menu-item" exact to="/marketplace/Towers">
          Marketplace
        </Link>
        <Link className="menu-item" exact to="/stats">
          Stats
        </Link>
        <Link className="menu-item" exact to="/about">
          About
        </Link>
        <a className="menu-item" href="/CC_White_Paper.pdf" target="_blank">
          Whitepaper
        </a>

        <div className="connect_wallet">
          <a onClick={changeStatus}>
            {Parser(connectButton)}
          </a>
        </div>

        <ul className="mobile_soc">
          <li>
            <div className="theme_toggle">
              <input
                type="checkbox"
                id="toggle-1"
                className="toggle--checkbox"
                checked={darkTheme}
                onChange={() => {
                  props.toggleTheme();
                }}
              />
              <label htmlFor="toggle-1" className="toggle--label">
                <span className="toggle--label-background"></span>
              </label>
            </div>
          </li>
          <li>
            <a href="https://twitter.com/Cryptocreaturez" target="_blank">
              <svg
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0)">
                  <path
                    d="M18.0003 3.61708C17.2921 3.9386 16.5838 4.13938 15.876 4.22003C16.6754 3.7137 17.2162 2.99838 17.498 2.07413C16.7667 2.53216 15.9863 2.84553 15.1565 3.01439C14.4254 2.19461 13.5271 1.78455 12.4609 1.78455C11.4407 1.78455 10.5708 2.16425 9.85101 2.92381C9.13158 3.68334 8.77183 4.60151 8.77183 5.67845C8.77183 5.96774 8.80223 6.26523 8.8632 6.57061C7.35553 6.49025 5.94123 6.09041 4.62006 5.37108C3.29897 4.65167 2.17778 3.69322 1.25649 2.49572C0.921456 3.09838 0.75388 3.75352 0.75388 4.46077C0.75388 5.12786 0.902334 5.74681 1.19944 6.31746C1.49635 6.88802 1.89619 7.3501 2.39876 7.70379C1.80474 7.67964 1.24893 7.51483 0.731238 7.20941V7.25763C0.731238 8.19805 1.01107 9.0237 1.57064 9.73522C2.1303 10.4466 2.83656 10.8945 3.68929 11.0794C3.36946 11.1677 3.04578 11.2119 2.71843 11.2119C2.50521 11.2119 2.27295 11.1919 2.02172 11.152C2.25775 11.9314 2.69179 12.5722 3.32369 13.0747C3.95571 13.5771 4.67146 13.836 5.47098 13.8525C4.13093 14.9614 2.6043 15.5159 0.891093 15.5159C0.563621 15.5159 0.266752 15.5001 0.000205994 15.4678C1.71345 16.6331 3.60176 17.2157 5.66524 17.2157C6.97489 17.2157 8.20461 16.9969 9.354 16.5588C10.504 16.1209 11.4861 15.5341 12.3009 14.7985C13.1155 14.0632 13.818 13.2172 14.4081 12.2609C14.9981 11.3044 15.4377 10.3059 15.7273 9.26507C16.0165 8.22406 16.1612 7.18145 16.1612 6.13644C16.1612 5.91137 16.1574 5.74267 16.1498 5.6301C16.8733 5.07579 17.49 4.40456 18.0003 3.61708Z"
                    fill="#9F9F9F"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="18" height="19" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </li>
          <li>
            <a href="https://t.me/cryptocreaturez" target="_blank">
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none"
              >
                <path 
                  d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"
                  fill="#9F9F9F"
                />
              </svg>
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/channel/UCsWeiOGWxeAUpD1KOAdxo-Q" target="_blank">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              version="1.1" width="30" height="30" viewBox="80 48 256 256"
            >
              <g transform="translate(128 128) scale(1.94 1.94)">
                <path 
                  d="M 88.119 23.338 c -1.035 -3.872 -4.085 -6.922 -7.957 -7.957 C 73.144 13.5 45 13.5 45 13.5 s -28.144 0 -35.162 1.881 c -3.872 1.035 -6.922 4.085 -7.957 7.957 C 0 30.356 0 45 0 45 s 0 14.644 1.881 21.662 c 1.035 3.872 4.085 6.922 7.957 7.957 C 16.856 76.5 45 76.5 45 76.5 s 28.144 0 35.162 -1.881 c 3.872 -1.035 6.922 -4.085 7.957 -7.957 C 90 59.644 90 45 90 45 S 90 30.356 88.119 23.338 z M 36 58.5 v -27 L 59.382 45 L 36 58.5 z"  
                  fill="#9F9F9F"
                />
              </g>
            </svg>
            </a>
          </li>
        </ul>
      </Menu>
      
      
      <div className="container">
        <div className="header_main">
          {/* <div className="header_main_state">
            <span>Money:{gameToken}{tikerName}</span>
            <span>Maps:{mapsNFT} </span>
            <span>Towers:0 </span>
            <span>Creatures:0 </span>
          </div> */}
          <div className="header_main_left">
            <div className="header_logo">
              <Link exact to="/">
                <img src="/img/logo.png" />
              </Link>
            </div>
            <div className="header_menu">
              <ul>
                <li>
                  <NavLink exact to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink exact to="/play-game">Play Now</NavLink>
                </li>
                <li>
                  <NavLink exact to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <NavLink exact to="/marketplace/Towers">Marketplace</NavLink>
                </li>
                <li>
                  <NavLink exact to="/stats">Stats</NavLink>
                </li>
                <li>
                  <NavLink exact to="/about">About</NavLink>
                </li>
                <li>
                  <a href="/CC_White_Paper.pdf" target="_blank">Whitepaper</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="header_soc">
            <div className="theme_toggle">
              <input
                type="checkbox"
                id="toggle-2"
                className="toggle--checkbox"
                checked={darkTheme}
                onChange={() => {
                  props.toggleTheme();
                }}
              />
              <label htmlFor="toggle-2" className="toggle--label">
                <span className="toggle--label-background"></span>
              </label>
            </div>
            <div className="header_soc_menu">
              <ul>
                <li>
                  <a href="https://twitter.com/Cryptocreaturez" target="_blank">
                    <svg
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0)">
                        <path
                          d="M18.0003 3.61708C17.2921 3.9386 16.5838 4.13938 15.876 4.22003C16.6754 3.7137 17.2162 2.99838 17.498 2.07413C16.7667 2.53216 15.9863 2.84553 15.1565 3.01439C14.4254 2.19461 13.5271 1.78455 12.4609 1.78455C11.4407 1.78455 10.5708 2.16425 9.85101 2.92381C9.13158 3.68334 8.77183 4.60151 8.77183 5.67845C8.77183 5.96774 8.80223 6.26523 8.8632 6.57061C7.35553 6.49025 5.94123 6.09041 4.62006 5.37108C3.29897 4.65167 2.17778 3.69322 1.25649 2.49572C0.921456 3.09838 0.75388 3.75352 0.75388 4.46077C0.75388 5.12786 0.902334 5.74681 1.19944 6.31746C1.49635 6.88802 1.89619 7.3501 2.39876 7.70379C1.80474 7.67964 1.24893 7.51483 0.731238 7.20941V7.25763C0.731238 8.19805 1.01107 9.0237 1.57064 9.73522C2.1303 10.4466 2.83656 10.8945 3.68929 11.0794C3.36946 11.1677 3.04578 11.2119 2.71843 11.2119C2.50521 11.2119 2.27295 11.1919 2.02172 11.152C2.25775 11.9314 2.69179 12.5722 3.32369 13.0747C3.95571 13.5771 4.67146 13.836 5.47098 13.8525C4.13093 14.9614 2.6043 15.5159 0.891093 15.5159C0.563621 15.5159 0.266752 15.5001 0.000205994 15.4678C1.71345 16.6331 3.60176 17.2157 5.66524 17.2157C6.97489 17.2157 8.20461 16.9969 9.354 16.5588C10.504 16.1209 11.4861 15.5341 12.3009 14.7985C13.1155 14.0632 13.818 13.2172 14.4081 12.2609C14.9981 11.3044 15.4377 10.3059 15.7273 9.26507C16.0165 8.22406 16.1612 7.18145 16.1612 6.13644C16.1612 5.91137 16.1574 5.74267 16.1498 5.6301C16.8733 5.07579 17.49 4.40456 18.0003 3.61708Z"
                          fill="#9F9F9F"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0">
                          <rect width="18" height="19" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="https://t.me/cryptocreaturez" target="_blank">
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none"
                    >
                      <path 
                        d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"
                        fill="#9F9F9F"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="https://youtu.be/NFhmaR4zGWg" target="_blank">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    version="1.1" width="30" height="30" viewBox="90 120 256 256"
                  >
                    <g transform="translate(128 128) scale(1.94 1.94)">
                      <path 
                        d="M 88.119 23.338 c -1.035 -3.872 -4.085 -6.922 -7.957 -7.957 C 73.144 13.5 45 13.5 45 13.5 s -28.144 0 -35.162 1.881 c -3.872 1.035 -6.922 4.085 -7.957 7.957 C 0 30.356 0 45 0 45 s 0 14.644 1.881 21.662 c 1.035 3.872 4.085 6.922 7.957 7.957 C 16.856 76.5 45 76.5 45 76.5 s 28.144 0 35.162 -1.881 c 3.872 -1.035 6.922 -4.085 7.957 -7.957 C 90 59.644 90 45 90 45 S 90 30.356 88.119 23.338 z M 36 58.5 v -27 L 59.382 45 L 36 58.5 z"  
                        fill="#9F9F9F"
                      />
                    </g>
                  </svg>
                  </a>
                </li>
              </ul>
            </div>
            <div className="connect_wallet">
              <a onClick={changeStatus}>
                {Parser(connectButton)}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default withRouter(Header);
