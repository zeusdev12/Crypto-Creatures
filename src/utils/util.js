import { useCallback, useState } from "react";
import Web3 from 'web3';
import {
  erc20ABI, nftABI, nftForSaleABI, factoryABI, nftForBreedingABI, nftForEggABI
} from './contract';
import { setData } from '../store/appStoreSlice';
import store from '../store';
import _ from 'lodash';

const setStore = (payload) => {
  store.dispatch(setData(payload));
};

export const setReady = (inProcess) => {
  store.dispatch(setData({inProcess}));
}

const getStore = () => {
  return store.getState().appStore;
};

const getAccountsCallback = (
  updateAccountAddress, 
) => (error, accounts) => {
  if (error) {
    const message = "Can't retrieve accounts.";
  } else {
    const accountAddress = accounts.length === 0 ? null : accounts[0];
    updateAccountAddress(accountAddress);
    setStore({ connected: true });
    checkNet();
    checkNFT();
    initAttrImages();
  }
};

export var web3 = null;

export const updateState = (key) => {
  return (value) => {
    setStore({ [key]: value });
  };
}

export const geTokentBalance = async (tokenAddress, isNFT = false) => {
  const { accountAddress } =  getStore();
  let contract = new web3.eth.Contract(isNFT ? nftABI : erc20ABI, tokenAddress)
  var balance = await contract.methods.balanceOf(accountAddress).call({ from: accountAddress });
  return isNFT ? balance : parseFloat(balance)/10**18;
}

export const geETHBalance = async () => {
  const { accountAddress } =  getStore();
  var balance = await web3.eth.getBalance(accountAddress);
  return parseFloat(balance)/10**18;
}

export const getBalances = async () => {
  const { gameTokenAddress } =  getStore();

  const resultArray = await Promise.all([
    geETHBalance(),
    geTokentBalance(gameTokenAddress),
  ]);

  setStore({ 
    ethbalance: resultArray[0],
    gameToken: resultArray[1]
  });
    
  await getNFTBalances();
}

export const connect = async () => {
  setReady(true);
  if (window.ethereum) { // Modern dapp browsers...
    web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      web3.eth.getAccounts(
        getAccountsCallback(
          updateState('accountAddress'),
        ),
      );
    } catch (error) {
      setReady(false);
      console.error(error);
    }
  } else if (window.web3) { // Legacy dapp browsers...
    web3 = new Web3(window.web3.currentProvider);
    web3.eth.getAccounts(
      getAccountsCallback(
        updateState('accountAddress'),
      ),
    );
    
  }
}

export const setTheme = (darkTheme) => {
  setStore({ darkTheme });
  const bodyElement = document.getElementsByTagName("body")[0];
  if (darkTheme)
    bodyElement.style.backgroundColor = "";
  else
    bodyElement.style.backgroundColor = "#073e30";
}

export const checkNet = async () => {
    const { mainNetId } =  getStore();
    var netId = await web3.eth.net.getId()
    setStore({ netId: netId });
    return (mainNetId === netId);
}

const tokenOfOwnerByIndex = async (nftBalance, tokenAddress) => {
  const { accountAddress } = getStore();

  if (nftBalance > 0) {
    let contract = new web3.eth.Contract(nftABI, tokenAddress);
    let arr = Array.apply( 0, { length: nftBalance } );
    let nfts = await Promise.all(arr.fill(0).map(async (_,i) => {
      const mapsId = await contract.methods.tokenOfOwnerByIndex(accountAddress, i).call({ from: accountAddress, });
      return mapsId;
    }));

    return nfts;
  }
  return [];
}

export const checkNFT = async () => {
  await getBalances();
  const { mapsNFT, towersNFT, creaturesNFT, eggsNFT, NFTS, mapsAddress, towersAddress, creaturesAddress, eggsAddress } = getStore();

  const resultArray = await Promise.all([
    tokenOfOwnerByIndex(mapsNFT, mapsAddress),
    tokenOfOwnerByIndex(towersNFT, towersAddress),
    tokenOfOwnerByIndex(creaturesNFT, creaturesAddress),
    tokenOfOwnerByIndex(eggsNFT, eggsAddress),
  ]);

  const maps = await getOwnedAllItems(mapsAddress, resultArray[0]);
  const towers = await getOwnedAllItems(towersAddress, resultArray[1]);
  const creatures = await getOwnedAllItems(creaturesAddress, resultArray[2]);
  const eggs = await getOwnedAllItems(eggsAddress, resultArray[3]);

  setStore({ NFTS: { 
    ...NFTS, 
    maps,
    towers,
    creatures,
    eggs
  } });
  setReady(false);
}

export const getNFTBalances = async () => {
  const { mapsAddress, towersAddress, creaturesAddress, eggsAddress } =  getStore();

  const resultArray = await Promise.all([
    geTokentBalance(mapsAddress, true),
    geTokentBalance(towersAddress, true), 
    geTokentBalance(creaturesAddress, true), 
    geTokentBalance(eggsAddress, true),
  ]);

  setStore({ 
    mapsNFT: resultArray[0],
    towersNFT: resultArray[1],
    creaturesNFT: resultArray[2],
    eggsNFT: resultArray[3]
  });
}

export const checkMarket = async () => {
    try {
      const { accountAddress, dwarfAddress, dwarfABI } = getStore();
      const dwarfContract = new web3.eth.Contract(dwarfABI, dwarfAddress);
      var opened = await dwarfContract.methods.isOpened(accountAddress).call({ from: accountAddress, });

      setStore({ opened: opened });
      var staked = await dwarfContract.methods.staked(accountAddress).call({ from: accountAddress, });
      if (staked) {
        const resultArray = await Promise.all([
          dwarfContract.methods.stakedJedi(accountAddress).call({ from: accountAddress, }),
          dwarfContract.methods.stakedDarth(accountAddress).call({ from: accountAddress, }),
          dwarfContract.methods.canClaim(accountAddress).call({ from: accountAddress, })
        ]);
        
        setStore({ 
          stakedJedi: parseFloat(resultArray[0])/10**18,
          stakedDarth: parseFloat(resultArray[1])/10**18,
          canClaim: resultArray[2]
        });
      }
      setStore({ staked: staked });
    } catch(error) {
      console.log(error);
    }
}

export const useSellList = (key) => {
  const [NFTSForSale, setNFTSForSale] = useState({maps: [], towers: [], creatures: []});
  const [countSale, setCountSale] = useState({mapsNFTSale: 0, towersNFTSale: 0, mapsNFTSale: 0, breedsNFTSale: 0});

  const getSellList = useCallback( async () => {
    setReady(true);
    const response = await fetch(`https://cryptocreatures.org/api/v1/${key}/getAllOnSale`);
    const jsondata = await response.json();
    const result = jsondata["data"];
    if (!result) {
      setReady(false);
      return;
    }
      
    if (result[0].length != parseInt(result[1])) {
      setNFTSForSale({ ...NFTSForSale, [key]: result[0].slice(0, parseInt(result[1])).map((item) => ({isForSale: item[0], isForBreeding: item[1], owner: item[2], tokenId: item[3], id: item[4], amount: item[5], price: item[6] })) });
      setCountSale({ ...countSale, [`${key}NFTSale`]: parseInt(result[2]) });
    } else {
      setNFTSForSale({ ...NFTSForSale, [key]: result[0].map((item) => ({isForSale: item[0], isForBreeding: item[1], owner: item[2], tokenId: item[3], id: item[4], amount: item[5], price: item[6] })) });
      setCountSale({ ...countSale, [`${key}NFTSale`]: parseInt(result[2]) });
    }
    setReady(false);
  }, [])
  
  return { getSellList, NFTSForSale, countSale };
}

export const useBreedingList = () => {
  const [NFTSForBreeding, setNFTSForBreeding] = useState([]);
  const [countBreeding, setCountBreeding] = useState(0);

  const getBreedingList = useCallback( async () => {
    setReady(true);
    // const response = await fetch(`https://cryptocreatures.org/api/v1/breeds/getAllOnBreeding`);
    // const jsondata = await response.json();
    // const result = jsondata["data"];
    // if (!result) {
    //   setReady(false);
    //   return;
    // }

    const { creaturesAddress, connected } =  getStore();
    if (!web3 || !connected) {
      setReady(false);
      return;
    }
    const contract = new web3.eth.Contract(nftForBreedingABI, creaturesAddress);
    const result = await contract.methods.getAllOnBreeding(1, 40).call();
      
    if (result[0].length != parseInt(result[1])) {
      setNFTSForBreeding(result[0].slice(0, parseInt(result[1])).map((item) => ({isForSale: item[0], isForBreeding: item[1], owner: item[2], tokenId: item[3], id: item[4], amount: item[5], price: item[6] })));
      setCountBreeding(parseInt(result[2]));
    } else {
      setNFTSForBreeding(result[0].map((item) => ({isForSale: item[0], isForBreeding: item[1], owner: item[2], tokenId: item[3], id: item[4], amount: item[5], price: item[6] })));
      setCountBreeding(parseInt(result[2]));
    }
    setReady(false);
  }, [])
  
  return { getBreedingList, NFTSForBreeding, countBreeding };
}

export const getSellItem = async (store, tokenAddress, tokenId, id) => {
  const { gameFactoryAddress, connected } =  getStore();

  if (!connected && store) {
    let response = await fetch(`https://cryptocreatures.org/api/v1/${store}/nftsForSale/${id}`);
    let jsondata = await response.json();
    let result = jsondata["data"];
      
    response = await fetch(`https://cryptocreatures.org/api/v1/${store}/ownerOf/${tokenId}`);
    jsondata = await response.json();
    let owner = jsondata["data"];

    if (result && result.length >= 6)
      return {id, owner, tokenId, isForSale: result[0], isForBreeding: result[1], amount: result[5], price: result[6]};
    else
      return { id, owner, tokenId };
  }

  if (!web3 || !tokenAddress)
    return;

  let contract = new web3.eth.Contract(factoryABI, gameFactoryAddress);
  let result = await contract.methods.nftsForSale(tokenAddress, id).call();
  
  contract = new web3.eth.Contract(nftABI, tokenAddress);
  let owner = await contract.methods.ownerOf(tokenId).call();

  if (store == "eggs") {
    contract = new web3.eth.Contract(nftForEggABI, tokenAddress);
    let egg = await contract.methods.Eggs(tokenId).call();
    return { ...result, id, tokenId, ...egg };
  }

  return {...result, id, owner};
}

export const getSaleIdFromToken = async (tokenAddress, tokenId) => {
  let saleId = 0;
  if (!web3 || !tokenAddress)
    return saleId;

  const contract = new web3.eth.Contract(nftForSaleABI, tokenAddress);
  const length = await contract.methods.getCountOfSaleIdsForToken(tokenId).call();
  if (length > 0)
    saleId = await contract.methods.saleIdsForToken(tokenId, 0).call();
  
  return saleId;
}

export const getOwnedAllItems = async (tokenAddress, ids) => {
  if (!web3 || !tokenAddress)
    return;

  const { accountAddress } =  getStore();
  const contract = new web3.eth.Contract(nftForSaleABI, tokenAddress);

  const resultArray = await Promise.all(ids.map(async (id) => {
    let saleId = await getSaleIdFromToken(tokenAddress, id);
    return getSellItem("", tokenAddress, id, saleId);
  }));
  return resultArray.map((result, index) => ({...result, tokenId: ids[index], amount: 1, owner: accountAddress}));
}

export const mintFromEgg = async (eggId) => {
  if (!web3)
    return;
  const { accountAddress, eggsAddress, creaturesAddress } =  getStore();
  let contract = new web3.eth.Contract(nftForEggABI, eggsAddress)
  await contract.methods.mintFromEgg(eggId, creaturesAddress).send( { from: accountAddress /*, type: '0x2'*/ });

  checkNFT();
}

export const buyItem = async (tokenAddress, saleId, price, isBreeding, tokenIdForBreeding = 0) => {
  if (!web3 || !tokenAddress)
    return;

  const { accountAddress, gameFactoryAddress } =  getStore();
  let contract = new web3.eth.Contract(factoryABI, gameFactoryAddress)
  await contract.methods.buyItem(tokenAddress, saleId, isBreeding, tokenIdForBreeding).send( { from: accountAddress, value: price/*, type: '0x2'*/ });

  checkNFT();
}

export const sellItem = async (tokenAddress, tokenId, price, amount, isBreeding) => {
  if (!web3 || !tokenAddress)
    return;

  const { accountAddress, gameFactoryAddress } =  getStore();
  let contract = new web3.eth.Contract(factoryABI, gameFactoryAddress)
  await contract.methods.sellItem(tokenAddress, tokenId, web3.utils.toWei(price, 'ether'), amount, isBreeding).send( { from: accountAddress/*, type: '0x2'*/ });

  checkNFT();
}

export const distibuteTokens = async (amount) => {
  if (!web3)
    return;

  const { accountAddress, gameFactoryAddress } =  getStore();
  let contract = new web3.eth.Contract(factoryABI, gameFactoryAddress)
  await contract.methods.distibuteTokens(web3.utils.toWei(amount, 'ether')).send( { from: accountAddress/*, type: '0x2'*/ });

  getBalances();
}


export const shortAddress = (address) => {
  return address.substr(0, 7) + '...' + address.substr(address.length-5, address.length);
}

export const numberWithCommas = (value)=> value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const priceFormatter = (num) => {
  if(num > 999 && num < 1000000){
      return '$' + (num/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
  }else if(num > 1000000){
      return '$' + (num/1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
  }else if(num < 900){
      return '$' + num; // if value < 1000, nothing to do
  }
}

export const getUSDFromETH = (ethAmount) => {
  const price = 400.0;
  return (ethAmount * price).toFixed(2);
}

export const getFilePathFromID = async (id, store, isIcon = true) => {
  let index;

  if (store.toLowerCase() === "creatures")
    index = (Number(id) - 1) % 39;
  else if (store.toLowerCase() === "towers")
    index = (Number(id) - 1) % 23;
  else
    return "";
    
  const response = await fetch(`https://cryptocreatures.org/api/v1/${store}/${index}`);
  const data = await response.json();
  return { 
    resultURL: isIcon ? data["icon"] : data["movie"],
    resultName: data["name"]
  };
}

export const getNFTTotalSupply = async (tokenAddress) => {
  const { accountAddress } =  getStore();
  const contract = new web3.eth.Contract(nftABI, tokenAddress);
  var balance = await contract.methods.totalSupply().call({ from: accountAddress });
  return balance;
}

export const initAttrImages = async () => {
  const { towersAddress, creaturesAddress, creatureAttributes } =  getStore();
  if (creatureAttributes.length > 0)
    return;

  const creatureItems = [
    "/img/creatures/speed.jpeg",
    "/img/creatures/armor.jpeg",
    "/img/creatures/HP.PNG",
    "/img/creatures/heal.jpeg"
  ];
  const towerItems = [
    "/img/towers/splash_damage.png",
    "/img/towers/rapid_fire.PNG",
    "/img/towers/poison.PNG",
    "/img/towers/frost.png",
    "/img/towers/light.PNG",
  ];
  // const resultArray = await Promise.all([
  //   getNFTTotalSupply(creaturesAddress), 
  //   getNFTTotalSupply(towersAddress), 
  // ]);

  let creatureAttrs = [];
  let towerAttrs = [];
  
  for (let i = 0; i < 60; i++)
    creatureAttrs.push(_.sampleSize(creatureItems, Math.round(Math.random() * creatureItems.length) + 1));
  for (let i = 0; i < 40; i++)
    towerAttrs.push(_.sampleSize(towerItems, Math.round(Math.random() * towerItems.length) + 1));
  
  setStore({
    creatureAttributes: creatureAttrs,
    towerAttributes: towerAttrs,
  });
}
