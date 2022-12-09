import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import MarketplaceCreatures from "./Creatures/MarketplaceCreatures";
import MarketplaceMaps from "./Maps/MarketplaceMaps";
import MarketplaceTowers from "./Towers/MarketplaceTowers";

const Marketplace = (props) => {
  const storename = props.match.params.store;
  const [activeTab, setActiveTab] = useState('Towers');

  useEffect(() => {
    if (storename) {
      if (storename == 'Towers') setActiveTab('Towers');
      if (storename == 'Creatures') setActiveTab('Creatures');
      if (storename == 'Maps') setActiveTab('Maps');
    }
  }, []);
  
  const changetab = (tab) => {
    setActiveTab(tab);
    props.history.replace({ pathname: `/marketplace/${tab}`});
  };

  const renderCreatures = () => (<MarketplaceCreatures/>);
  
  const renderTowers = () => (<MarketplaceTowers/>);

  const renderMaps = () => (<MarketplaceMaps/>);

  return (
    <div className="markets container">
      <div className="mtabs">
        <a onClick={() => changetab("Towers")} className={ activeTab === 'Towers' ? 'active' : ''}>
          {
            activeTab === 'Towers' 
            ? <img className="tabimg" src="/img/towers_h.png" width="50" height="50"/>
            : <img className="tabimg" src="/img/towers.png" width="50" height="50"/>
          }
          <div className="overlay">Towers</div>
        </a>
        <a onClick={() => changetab("Creatures")} className={ activeTab === 'Creatures' ? 'active' : ''}>
          {
            activeTab === 'Creatures' 
            ? <img className="tabimg" src="/img/creatures_h.png" width="50" height="50"/>
            : <img className="tabimg" src="/img/creatures.png" width="50" height="50"/>
          }
          <div className="overlay">Creatures</div>
        </a>
        <a onClick={() => changetab("Maps")} className={ activeTab === 'Maps' ? 'active' : ''}>
          {
            activeTab === 'Maps' 
            ? <img className="tabimg" src="/img/maps_h.png" width="50" height="50"/>
            : <img className="tabimg" src="/img/maps.png" width="50" height="50"/>
          }
          <div className="overlay">Maps</div>
        </a>
      </div>
      <div className="tabs">
        { activeTab === 'Towers' && renderTowers() }
        { activeTab === 'Creatures' && renderCreatures() }
        { activeTab === 'Maps' && renderMaps() }
      </div>
    </div>
  );
}



export default withRouter(Marketplace);
