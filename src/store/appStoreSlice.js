import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  inProcess: false,
  darkTheme: true,
  connected: false,

  gameTokenAddress:"0xF15a39f477644509d6391E89966e5665876f0006",
  gameFactoryAddress:"0x72f48732619E3130D4549454E518E54049923BfF",
  mapsAddress:"0xc03D46157770Cd1447330783B4c6F05787AdE56D",
  creaturesAddress:"0x805132a56dc7C80B2590B96F333273BA5e058fd2",
  creatureItemsAddress:"0xeF5924C4A80A67eac8cE90a9E1dEB047EE772Bc3",
  mapItemsAddress:"0xd51869d41d8d65C05c8532157D8A613B6E7BeC93",
  towersAddress:"0x4D65ecC9E99E9C0ddA36592a89d4a1B3941Eda94",
  towerItemsAddress:"0x93208F20Fe09F33708B16856e90DA23d3996923E",  
  eggsAddress:"0xEbc6F4b007127737A199b512Dd7cB485a333a6a3",
  
//   gameTokenAddress:"0x5Dcd6C0207b4d8f2e156BF1A3588CA3a93b889f2",   cronos
//   gameFactoryAddress:"0x128c0f3425613798f3ce6bAE52c7017Ed6CD15e9",
//   mapsAddress:"0xF88Fb46e1B3DED8d6d9235CA14C8b9C6C42a59Cb",
//   creaturesAddress:"0xe21B3f8d3944b2a4f36dD6355806e1Bcae3b1922",
//   creatureItemsAddress:"0x85427890Ac86FAC204763e73CEF4324255ACB764",
//   mapItemsAddress:"0x898F978cC92332e2b527E796091aa53DaaD3ec96",
//   towersAddress:"0x14e7bc0352511330430DD6fc30B4f35aAcb54443",
//   towerItemsAddress:"0xa425A03B1380B74FDB7D2c857C455d1094D8992a",

  // gameTokenAddress:"0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",    //local
  // gameFactoryAddress:"0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",   //local
  // mapsAddress:"0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",           //local
  // creaturesAddress:"0x5FbDB2315678afecb367f032d93F642f64180aa3",      //local
  // creatureItemsAddress:"0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",   //local
  // mapItemsAddress:"0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",       //local
  // towersAddress:"0x0165878A594ca255338adfa4d48449f69242Eb8F",         //local
  // towerItemsAddress:"0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",     //local
  // eggsAddress:"0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6",   //local

  accountAddress:null,
  mapsNFT:0,
  creaturesNFT: 0,
  towersNFT: 0,
  eggsNFT: 0,
  gameToken:0,
  ethbalance:0,
  netId:0,
  mainNetId: 97,
  // mainNetId: 338,
  // mainNetId: 31337,       //local
  tikerName:"GMP",
  NFTS:{
    maps:[],
    towers:[],
    creatures:[],
    eggs:[],
  },
  TowerNFTs:[
    {
      logo: "/img/towers/t1.png",
      title: "Tower1",
      id:1,
      price: 8,
      pd:8,
      pk:15,
      ps:65,
      pc:77,
      ph:25,
      total:100,
      suply:0,
      amount:0,
      side:'towers',
    },
    {
      logo: "/img/towers/t2.png",
      title: "Tower2",
      id:2,
      price: 48,
      pd:18,
      pk:5,
      ps:6,
      pc:12,
      ph:7,
      total:50,
      suply:0,
      amount:0,
      side:'towers',
    },
    
  ],

  CreatureNFTs:[
    {
      logo: "/img/creatures/c1.png",
      title: "Creature1",
      id:1,
      price: 8,
      pd:8,
      pk:15,
      ps:65,
      pc:77,
      ph:25,
      total:100,
      suply:0,
      amount:0,
      side:'creatures',
    },
    
  ],

  MapNFTs:[
    {
      logo: "/img/maps/m1.png",
      title: "Map1",
      id:1,
      price: 8,
      pd:8,
      pk:15,
      ps:65,
      pc:77,
      ph:25,
      total:100,
      suply:0,
      amount:0,
      side:'maps',
    },
    
  ],
  creatureAttributes: [],
  towerAttributes: [],
};

export const appStoreSlice = createSlice({
  name: "appStore",
  initialState: initialState,
  reducers: {
    setData: (state, action) => ({ ...state, ...action.payload }),
  }
});

export const { setData } = appStoreSlice.actions;

export const getData = (state) => state.appStore;

export default appStoreSlice.reducer;

