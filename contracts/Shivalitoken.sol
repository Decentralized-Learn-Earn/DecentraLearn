//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
//import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title Decentralized Learn & Earn DApp
 * @author Shivali, Daniel, Dilan, Jayesh @ EthOnline Sep-Oct, 2021 
 **/
contract Shivalitoken is ERC20 {
constructor(uint256 initialSupply) ERC20("Star", "STR") {
        _mint(msg.sender, initialSupply);
    }

}