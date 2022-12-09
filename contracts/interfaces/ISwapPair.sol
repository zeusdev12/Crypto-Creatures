//SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

interface ISwapPair {
  function sync() external;
  function totalSupply() external view returns (uint256);
  function balanceOf(address account) external view returns (uint256);
}