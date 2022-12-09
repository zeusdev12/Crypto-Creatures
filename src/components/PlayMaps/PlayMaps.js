import React, { useState } from "react";
import { Link } from "react-router-dom";
import { factoryABI } from '../../utils/contract';
import { getData } from '../../store/appStoreSlice';
import { checkNFT, connect, web3 } from '../../utils/util';
import { useSelector } from "react-redux";

const PlayMaps = (props) => {
  const { 
    accountAddress, 
    mapsNFT, 
    NFTS, 
    tikerName, 
    dwarfAddress, 
    dwarfABI, 
    gameTokenAddress, 
    gameFactoryAddress,
    haveNFT,
    mainNetId,
    netId
   } = useSelector(getData);
  const [activeTab, setActiveTab] = useState('Maps');
  const [showmapcreator, setShowmapcreator] = useState(false);
  const [mapX, setMapX] = useState(8);
  const [mapY, setMapY] = useState(8);
  const [mapPrice, setMapPrice] = useState(16);
  const [minVal, setMinVal] = useState(8);
  const [maxVal, setMaxVal] = useState(8);
  const [inProcess, setInProcess] = useState('');
    
  const mintNFT = async () => {
    const gameFactoryContract = new web3.eth.Contract(factoryABI, gameFactoryAddress);
    try {
      await gameFactoryContract.methods.mintMap(mapX, mapY, 0).send({ from: accountAddress, })
        .on('confirmation', function(confirmationNumber, receipt){
          if(confirmationNumber == 1) {
            checkNFT();
          }
        })

    } catch(error) {
      console.log(error)
    }
    checkNFT();
  }
  
  const changetab = (tab) => {
    setActiveTab(tab);
  };
  
  const createmap = () => {
    setShowmapcreator(true);
  };

  const onChange = (event) => {
    let val = []
    if ( event.target.id == "mapX" ) {
      var mapPrice = event.target.value * mapY;
      setMapPrice(mapPrice);
    }
    if ( event.target.id == "mapY" ) {
      var mapPrice = event.target.value * mapX;
      setMapPrice(mapPrice);
    }
  }

  const renderMaps = (NFTS) => {
    return NFTS.maps.map((NFT) => {
      return renderNFT(NFT)
    })
  }

  const changeStatus = () => {
    if (!inProcess) {
      if ( accountAddress && netId == mainNetId ) {

      } else {
        connect();
      }
    }
  }

  const renderNFT = (NFT) => {
    return (
            <div className="nfblock">
              <div className="nfblockMine">
                <span>{NFT}</span>
              </div>
              <img src={ "/img/maps/m" + NFT + ".png"} />
              <p>{NFT}</p>


              <Link exact to={ "/maps/" + NFT }>Edit</Link>
            </div>
    )
  }
  
  return (
    <div className="markets">
      <div className="mtabs container">
        <a onClick={() => changetab("Maps")} className={ activeTab === 'Maps' ? 'active' : ''}>
          <img className="tabimg" src="/img/card-1.png" />
          <div className="overlay">Maps</div>
        </a>

      </div>
      <div  className="relative container">
      
        <div  className={accountAddress ? "hidden" : "troverlay" }>
          <div className="messages">
            <a className="play_now" onClick={changeStatus}>Connect Wallet</a>
          </div>
        </div>
        {(() => {
        if ( showmapcreator ) {
          return (
                <div  className="createmap">
                  <div className="dialog">
                    <h2>Create new map</h2>
                    <p>Select map size (from {minVal}x{minVal} to {maxVal}x{maxVal})</p>

                    <div className="centerflex">
                      <div><input
                        name="mapX"
                        type="number"
                        min={minVal}
                        max={maxVal}
                        id={ 'mapX' }
                        placeholder="X"
                        value={mapX}
                        onChange={onChange} 
                      ></input></div>
                      <div>x</div>
                      <div><input
                        name="mapY"
                        type="number"
                        min={minVal}
                        max={maxVal}
                        id={ 'mapY' }
                        placeholder="Y"
                        value={mapY}
                        onChange={onChange} 
                      ></input></div>
                    
                    </div>
                    <p>Amount:{mapPrice}{tikerName}</p>
                    <a className="play_now" onClick={mintNFT}>Create new map</a>
                  </div>
                </div>
        )
        } else if (mapsNFT > 0) {
          return (
              <div  className="maps">
                <h2>My Maps</h2>
                <div className="tabs">
                  {renderMaps(NFTS)}
                </div>
                <div className="tabs">
                  <Link className="play_now" exact to="/marketplace/Maps">Buy Now</Link>
                  <a className="play_now" onClick={() => createmap()}>Create New</a>
                </div>
              </div>
        )
        } else {
          return (
              <div  className="maps">
                <h2>No Maps found</h2>
                <div className="tabs">
                  <Link className="play_now" exact to="/marketplace/Maps">Buy Now</Link>
                  <a className="play_now" onClick={() => createmap()}>Create New</a>
                </div>
              </div>
          )
        }
        })()}
      </div>
    </div>
  );
}

export default PlayMaps;
