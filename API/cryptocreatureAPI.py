#!/usr/bin/env python3
#

import os.path
import tornado.escape
import tornado.httpserver
import tornado.ioloop
import tornado.locks
import tornado.options
import tornado.web
import threading
import requests
import math
import json
import time
import random, re
from web3 import Web3

from tornado.options import define, options

define("port", default=8777, help="run on the given port", type=int)


class Application(tornado.web.Application):
    coins = {}
    
    def __init__(self):
        self.factoryAddress = '0x79F572C27579fC9C8807E4E73F2BEC466d00baF8'
        self.cache = {}
        self.db = self.readDB("db.txt")
        self.w3 = Web3(Web3.HTTPProvider("https://data-seed-prebsc-2-s2.binance.org:8545/"))
        self.session = requests.session()
        self.cardTypes  = {'towers':{'desc': 'Tower NFTs', 'address': '0xe935fFc5C1c49BFEefC7ACD921a1D74272cc15d2', 'total': '23'},'creatures':{'desc': 'Creature NFTs', 'address': '0xB79aD97a99BB939910f89CA5A9c6e59106bB9E0F', 'total': '39'},'maps':{'desc': 'Map NFTs', 'address': '0x787cfFe5ABeAE6Cf8Da5ae6Dc16a47Daf42845fe', 'total': '1'}}
        self.url  = 'https://cryptocreatures.org'
        self.nftForSaleABI = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"gameFactory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"page","type":"uint8"},{"internalType":"uint8","name":"perPage","type":"uint8"}],"name":"getAllOnSale","outputs":[{"components":[{"internalType":"bool","name":"isForSale","type":"bool"},{"internalType":"bool","name":"isForBreeding","type":"bool"},{"internalType":"addresspayable","name":"owner","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"saleId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"}],"internalType":"structIGameFactory.TokenDetails[]","name":"","type":"tuple[]"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getCountOfSaleIdsForToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"idsForSale","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"saleId","type":"uint256"}],"name":"removeFromSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"saleIdsForToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"saleIndexForToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"saleId","type":"uint256"}],"name":"setForSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_gameFactory","type":"address"}],"name":"setGameFactory","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
        self.nftForBreedingABI = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"breedingIndexForToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gameFactory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"page","type":"uint8"},{"internalType":"uint8","name":"perPage","type":"uint8"}],"name":"getAllOnBreeding","outputs":[{"components":[{"internalType":"bool","name":"isForSale","type":"bool"},{"internalType":"bool","name":"isForBreeding","type":"bool"},{"internalType":"addresspayable","name":"owner","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"saleId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"}],"internalType":"structIGameFactory.TokenDetails[]","name":"","type":"tuple[]"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"page","type":"uint8"},{"internalType":"uint8","name":"perPage","type":"uint8"}],"name":"getAllOnSale","outputs":[{"components":[{"internalType":"bool","name":"isForSale","type":"bool"},{"internalType":"bool","name":"isForBreeding","type":"bool"},{"internalType":"addresspayable","name":"owner","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"saleId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"}],"internalType":"structIGameFactory.TokenDetails[]","name":"","type":"tuple[]"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getCountOfSaleIdsForToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"idsForBreeding","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"idsForSale","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"saleId","type":"uint256"}],"name":"removeFromBreeding","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"saleId","type":"uint256"}],"name":"removeFromSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"saleIdsForToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"saleIndexForToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"saleId","type":"uint256"}],"name":"setForBreeding","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"saleId","type":"uint256"}],"name":"setForSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_gameFactory","type":"address"}],"name":"setGameFactory","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
        self.nftABI = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"GameFactory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseTokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"exists","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"uint8","name":"","type":"uint8"}],"name":"mapObjects","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"mapSize","outputs":[{"internalType":"uint8","name":"x","type":"uint8"},{"internalType":"uint8","name":"y","type":"uint8"},{"internalType":"uint16","name":"ground","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"mapX","type":"uint8"},{"internalType":"uint8","name":"mapY","type":"uint8"},{"internalType":"uint16","name":"ground","type":"uint16"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint8","name":"mapX","type":"uint8"},{"internalType":"uint8","name":"mapY","type":"uint8"},{"internalType":"uint16","name":"ground","type":"uint16"}],"name":"mintFor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"mapId","type":"uint256"},{"internalType":"uint256[]","name":"_itemIds","type":"uint256[]"},{"internalType":"uint8[]","name":"_mapXs","type":"uint8[]"},{"internalType":"uint8[]","name":"_mapYs","type":"uint8[]"}],"name":"save","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_GameFactory","type":"address"}],"name":"setGameFactory","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
        self.factoryABI = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"tokenAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"saleId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"breedingTokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BreedingItemAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"tokenAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"saleId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"breedingTokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BreedingItemRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"tokenAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"saleId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"breedingTokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"BreedingItemSold","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"tokenAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"saleId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"PriceItemAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"tokenAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"saleId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"PriceItemRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"tokenAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"saleId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"PriceItemSold","type":"event"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"saleId","type":"uint256"},{"internalType":"bool","name":"isBreeding","type":"bool"},{"internalType":"uint256","name":"tokenIdForBreeding","type":"uint256"}],"name":"buyItem","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claimFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"creatureItemsToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"creaturesToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"eggsToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gameToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mapItemsToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mapsToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"address","name":"minter","type":"address"}],"name":"mintFromEgg","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"mapX","type":"uint8"},{"internalType":"uint8","name":"mapY","type":"uint8"},{"internalType":"uint16","name":"ground","type":"uint16"}],"name":"mintMap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"nftsForSale","outputs":[{"internalType":"bool","name":"isForSale","type":"bool"},{"internalType":"bool","name":"isForBreeding","type":"bool"},{"internalType":"addresspayable","name":"owner","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"saleId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"mapId","type":"uint256"},{"internalType":"uint256[]","name":"_itemIds","type":"uint256[]"},{"internalType":"uint8[]","name":"_mapXs","type":"uint8[]"},{"internalType":"uint8[]","name":"_mapYs","type":"uint8[]"}],"name":"saveMap","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"isBreeding","type":"bool"}],"name":"sellItem","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"saleId","type":"uint256"},{"internalType":"bool","name":"isBreeding","type":"bool"}],"name":"sellItemCancel","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_claimFee","type":"uint256"}],"name":"setClaimFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_creatureItemsToken","type":"address"}],"name":"setCreatureItemsToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_creaturesToken","type":"address"}],"name":"setCreaturesToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_eggsToken","type":"address"}],"name":"setEggsToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_gameToken","type":"address"}],"name":"setGameToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_mapItemsToken","type":"address"}],"name":"setMapItemsToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_mapsToken","type":"address"}],"name":"setMapsToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_towerItemsToken","type":"address"}],"name":"setTowerItemsToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_towersToken","type":"address"}],"name":"setTowersToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"towerItemsToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"towersToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]'
        threading.Timer(30.0, self.wathcher).start()
        handlers = [
            (r'/api/v1/subscribe', subscribeHandler),
            (r'/api/v1/newplayer', newplayerHandler),
            (r'/api/v1/(\w+)', NFTHandler),
            (r'/api/v1/(\w+)/getAllOnSale', getAllOnSaleHandler),
            (r'/api/v1/(\w+)/getAllOnEgg', getAllOnEggHandler),
            (r'/api/v1/breeds/getAllOnBreeding', getAllOnBreedingHandler),
            
            (r'/api/v1/(\w+)/nftsForSale/([0-9]+)', nftsForSaleHandler),
            (r'/api/v1/(\w+)/ownerOf/([0-9]+)', ownerOfHandler),
            (r'/api/v1/(\w+)/([0-9]+)', CARDHandler),
            (r'/.*', NotFoundHandler)
        ]
        settings = dict(
            template_path=os.path.join(os.path.dirname(__file__), "templates"),
            cookie_secret="6ffsdkSmGiddP9FTLLWFDfDv8bezffM3dJ",
            debug=True,
        )
        super(Application, self).__init__(handlers, **settings)


    def wathcher(self):
        newcache = self.cache.copy()
        for key, value in newcache.items():
          try:
            if value['time'] < int(round(time.time()))-61:
                del self.cache[key]
          except Exception as e: print(e)
        threading.Timer(60.0, self.wathcher).start()


    def isCardExist(self, card):
        if str(card) in self.db:
          return True
        else:
          return False

    def getAllOnSale(self, cardType,page,pagescount):
      key = 'getAllOnSale_'+cardType+'_'+str(page)+'_'+str(pagescount)
      if key in self.cache:
        print("from cache")
        return self.cache[key]['data']
      else:
        salecontract = self.w3.eth.contract(address=self.cardTypes[cardType]['address'], abi=self.nftForSaleABI)
        allcards = salecontract.functions.getAllOnSale(page,pagescount).call()
        jblock = {'time':int(round(time.time())), 'data':allcards}
        self.cache[key] = jblock
        return allcards

    def getAllOnEgg(self, cardType,page,pagescount):
      key = 'getAllOnEgg_'+cardType+'_'+str(page)+'_'+str(pagescount)
      if key in self.cache:
        print("from cache")
        return self.cache[key]['data']
      else:
        salecontract = self.w3.eth.contract(address=self.cardTypes[cardType]['address'], abi=self.nftForBreedingABI)
        allcards = salecontract.functions.getAllOnEgg(page,pagescount).call()
        jblock = {'time':int(round(time.time())), 'data':allcards}
        self.cache[key] = jblock
        return allcards


    def getAllOnBreeding(self, page,pagescount):
      key = 'getAllOnBreeding_'+str(page)+'_'+str(pagescount)
      if key in self.cache:
        print("from cache")
        return self.cache[key]['data']
      else:
        salecontract = self.w3.eth.contract(address=self.cardTypes['creatures']['address'], abi=self.nftForBreedingABI)
        allcards = salecontract.functions.getAllOnBreeding(page,pagescount).call()
        jblock = {'time':int(round(time.time())), 'data':allcards}
        self.cache[key] = jblock
        return allcards

    def ownerOf(self, cardType,tokenid):
        nftcontract = self.w3.eth.contract(address=self.cardTypes[cardType]['address'], abi=self.nftABI)
        card = nftcontract.functions.ownerOf(int(tokenid)).call()
        return card

    def nftsForSale(self, cardType,tokenid):
        factorycontract = self.w3.eth.contract(address=self.factoryAddress, abi=self.factoryABI)
        allcards = factorycontract.functions.nftsForSale(self.cardTypes[cardType]['address'],int(tokenid)).call()
        return allcards

    def getSavedName(self, card):
        return self.db[str(card)]['name']

    def getSavedIcon(self, card):
        return self.db[str(card)]['icon']

    def getSavedImage(self, card):
        return self.db[str(card)]['image']

    def getSavedMovie(self, card):
        return self.db[str(card)]['movie']

    def readDB(self, filename):
        myvars = {}
        
        with open(filename) as myfile:
            for line in myfile:
                tokenid, name, icon, img, movie = line.split("=||=")
                myvars[str(tokenid)] = {'name': name, 'icon': icon, 'image': img, 'movie': movie.strip('\n')}
        print(myvars)
        return myvars
      

class BaseHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')

    def write_error(self, status_code, **kwargs):
        if status_code == 404:
            self.response(status_code,
                          'Resource not found. Check the URL.')
        elif status_code == 405:
            self.response(status_code, 
                          'Method not allowed in this resource.')
        else:
            self.response(status_code,
                          'Internal server error on specific module.')
    def post(self):  # for all methods
        self.write({"code": 404,"msg": "Invalid API resource path."})
        
    def options(self):
        self.set_status(204)
        self.finish()

class NotFoundHandler(BaseHandler):
    def get(self):  # for all methods
        self.write({"code": 404,"msg": "Invalid API resource path."})
        

class NFTHandler(BaseHandler):
    def get(self, cardType):
      if cardType in self.application.cardTypes:
        self.write({"name":cardType.capitalize(),"description":self.application.cardTypes[cardType]['desc'],"address":self.application.cardTypes[cardType]['address'],"total":self.application.cardTypes[cardType]['total']})
      else:
        self.write({"code": 404,"msg": "Invalid API resource path."})

class getAllOnSaleHandler(BaseHandler):
    def get(self, cardType):
      if cardType in self.application.cardTypes:
        page       = int(self.get_argument('page', 1))
        pagescount = int(self.get_argument('pages', 40))
        responce = self.application.getAllOnSale(cardType,page,pagescount)
        # responce[0][7] = [True, True, "0x661fB502E24Deb30e927E39A38Bd2CC44D67339F", 8, 8, 1, 8000000000000001]
        print(responce)
        self.write({"data": responce})
      else:
        self.write({"code": 404,"msg": "Invalid API resource path."})

class getAllOnBreedingHandler(BaseHandler):
    def get(self):
        page       = int(self.get_argument('page', 1))
        pagescount = int(self.get_argument('perPage', 40))
        responce = self.application.getAllOnBreeding(page,pagescount)
        self.write({"data": responce})

class getAllOnEggHandler(BaseHandler):
    def get(self, cardType):
      if cardType in self.application.cardTypes:
        page       = int(self.get_argument('page', 1))
        pagescount = int(self.get_argument('perPage', 40))
        responce = self.application.getAllOnEgg(cardType,page,pagescount)
        # responce[0][7] = [True, True, "0x661fB502E24Deb30e927E39A38Bd2CC44D67339F", 8, 8, 1, 8000000000000001]
        print(responce)
        self.write({"data": responce})
      else:
        self.write({"code": 404,"msg": "Invalid API resource path."})

class ownerOfHandler(BaseHandler):
    def get(self, cardType, tokenid):
      if cardType in self.application.cardTypes:
        responce = self.application.ownerOf(cardType,tokenid)
        print(responce)
        self.write({"data": responce})
      else:
        self.write({"code": 404,"msg": "Invalid API resource path."})

class newplayerHandler(BaseHandler):
    def get(self):
      email       = self.get_argument('email', "")
      name       = self.get_argument('name', "")
      address       = self.get_argument('address', "")
      regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
      
      with open("players.txt", "a") as myfile:
        myfile.write(name + " \t " + email + " \t " + address + "\n")
        self.write({"data": "done"})


class subscribeHandler(BaseHandler):
    def get(self):
      email       = self.get_argument('email', None)
      regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
      
      if email and (re.fullmatch(regex, email)):
          with open("subscribers.txt", "a") as myfile:
            myfile.write(email + "\n")
            self.write({"data": "done"})
      else:
          self.write({"code": 815,"msg": "Invalid email."})

class nftsForSaleHandler(BaseHandler):
    def get(self, cardType, tokenid):
      if cardType in self.application.cardTypes:
        responce = self.application.nftsForSale(cardType,tokenid)
        print(responce)
        self.write({"data": responce})
      else:
        self.write({"code": 404,"msg": "Invalid API resource path."})

class CARDHandler(BaseHandler):
    def get(self, cardType, cardid):
      card = cardType + str(cardid)
      if cardType in self.application.cardTypes and self.application.isCardExist(card):
        path = self.application.url + "/api/" + cardType + "/"
        self.write({
              "type": cardType.capitalize(),
              "name": self.application.getSavedName(card),
              "icon": path + self.application.getSavedIcon(card),
              "image": path + self.application.getSavedImage(card),
              "movie": path + self.application.getSavedMovie(card)
            })
      else:
        self.write({"code": 404,"msg": "Invalid API resource path."})
        
    def post(self):  # for all methods
        self.write({"code": 404,"msg": "Invalid API resource path."})


def main():
    tornado.options.parse_command_line()
    app = Application()
    app.listen(options.port, address='0.0.0.0')
    tornado.ioloop.IOLoop.current().start()

if __name__ == "__main__":
    main()
