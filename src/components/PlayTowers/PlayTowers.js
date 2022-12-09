import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getData } from '../../store/appStoreSlice';
import { connect } from '../../utils/util';
import { useSelector } from "react-redux";

const PlayTowers = (props) => {
  const { 
    accountAddress,
    CreatureNFTs,
    TowerNFTs,
    MapNFTs,
    haveNFT,
    mainNetId,
    netId
  } = useSelector(getData);
  const [activeTab, setActiveTab] = useState('Towers'); 
  
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/TowerDefence/main.js";
    script.async = true;
    document.body.appendChild(script);
    
    if (window.towerInit)
      window.towerInit();

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  const changetab = (tab) => {
    setActiveTab(tab);
  };
  
  return (
    <div className="play container">
      <div className="mtabs container">
        <a onClick={() => changetab("Towers")} className={ activeTab === 'Towers' ? 'active' : ''}>
          <img className="tabimg" src="/img/card-1.png" />
          <div className="overlay">Towers</div>
        </a>
      </div>
      <div>
        {/* <div  className={accountAddress ? "hidden" : "troverlay" }>
          <div className="messages">
            <a className="play_now" onClick={changeStatus}>Connect Wallet</a>
          </div>
        </div>
        <h2>No Towers found</h2>
        <div className="tabs">
          <Link className="play_now" exact to="/marketplace/Towers">Buy Now</Link>
        </div>
      </div> */}
        <div id="wave-starting-text"></div>
        <div id="toMainMenuButtonGameFinishedContainer">
          <div className="gamebutton red-button noselect" id="toMainMenuButtonGameFinished">
            MAIN MENU
          </div>
        </div>
        <div id="main-menu-container" className="game-menu">
          <div className="gametitle">CryptoCreatures Tower Defense</div>
          <div className="blurred-bg"></div>
          <div className="main-menu-panel">
            <div id="levels-panel"></div>
            <div className="gamebutton yellow-button noselect" id="tutorialButton">
              GAME INSTRUCTIONS
            </div>
          </div>
        </div>
        <div id="game-buttons-container" className="game-menu">
          <div className="gamebutton yellow-button noselect margin-left-16px" id="goToShopButton">
            SHOP
          </div>
          <div className="gamebutton blue-button noselect margin-right-16px" id="nextWaveButton">
            START WAVE
          </div>
        </div>
        <div id="in-game-container" className="game-menu noselect">
          <div className="margin-left">
            <span>Lives: </span>
            <span className="game-value" id="lives-value">3</span>
            <div id="remove-lives-value"></div>
          </div>
          <div>
            <span>Money: </span>
            <span className="game-value" id="money-value">100</span>
            <div id="add-money-value"></div>
          </div>
          <div>
            <span>Wave: </span>
            <span className="game-value" id="wave-value"></span>
          </div>
          <div className="margin-right">
            <span>Enemies Left: </span>
            <span className="game-value" id="ememies-left-value"></span>
          </div>
        </div>
        <div id="game-main-container" className="game-menu noselect">
          <div className="gametitle noselect ">Game Paused</div>
          <div className="gamebutton green-button noselect" id="resumeButton">
            RESUME
          </div>
          <div className="game-menu-volume-panel">
            <div className="volume-div">
              <div>Game Effects Volume</div>
              <img className="volume-img" src="TowerDefence/assets/images/volume_up.png" id="effectsVolume"/>
            </div>
            <div className="volume-div">
              <div>Game Music Volume</div>
              <img className="volume-img" src="TowerDefence/assets/images/volume_up.png" id="musicVolume"/>
            </div>
          </div>
          <div className="gamebutton red-button noselect" id="toMainMenuButton">
            MAIN MENU
          </div>
        </div>
        <div id="control-freezed-text">Controls Freezed</div>
        <div className="tutorial-div" id="tutorial-panel">
          <div className="tutorial-title">INSTRUCTIONS</div>
          <div>
            <span>Rotate Around</span>
            <br/>
            <span className="game-value">Right Mouse Button</span>
          </div>
          <div>
            <span>Move Around</span>
            <br/>
            <span className="game-value">Left Mouse Button</span>
          </div>
          <div>
            <span>Zoom</span>
            <br/>
            <span className="game-value">Middle Mouse Button</span>
          </div>
          <div>
            <span>Open Shop</span>
            <br/>
            <span className="game-value">Key: S</span>
          </div>
          <div>
            <span>Place turret</span>
            <br/>
            <span className="game-value">Left Mouse Button</span>
          </div>
          <div>
            <span>Cancel Turret placing</span>
            <br/>
            <span className="game-value">Right Mouse Button</span>
          </div>
          <div>
            <span>Lock Controls</span>
            <br/>
            <span className="game-value">Key: F</span>
          </div>
          <div>
            <span>Toggle Game Menu</span>
            <br/>
            <span className="game-value">Key: Escape</span>
          </div>
          <div>
            <span>After placing a turret</span>
            <br/>
            <span className="game-value">Click on it for more info</span>
          </div>
          <div>
            <span>Money can be obtained</span>
            <br/>
            <span className="game-value">by killing the enemies</span>
          </div>
        </div>
        <div id="turret-details-container" className="game-menu">
          <div>
            <span>Name: </span>
            <span className="game-value" id="turret-name-value"></span>
          </div>
          <div>
            <span>Reach Distance: </span>
            <span className="game-value" id="turret-reach-distance-value"></span>
          </div>
          <div>
            <span>Firing Speed: </span>
            <span className="game-value" id="turret-firing-speed-value"></span>
          </div>
          <div>
            <span>Damage: </span>
            <span className="game-value" id="turret-damage-value"></span>
          </div>
        </div>

        <div id="shop-container" className="game-menu">
          <div id="shop-content-container">
          </div>
        </div>
        <div id="app"></div>
      </div>
    </div>
  );
}

export default PlayTowers;
