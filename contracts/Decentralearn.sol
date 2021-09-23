//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title Decentralized Learn & Earn DApp
 * @author Shivali, Daniel, Dilan @ EthOnline Sep-Oct, 2021 
 **/
contract Decentralearn {
    address public owner;
    uint public campaignId;
    
    mapping(address => string) tokenIPFS;  //Token Address & IPFS CID
    mapping(address => uint) tokenBalance; //Token Address & Balance
    mapping(address => bool) isCampaignLive; //Token Address & Active Indicator
    mapping(address => string) tokenAddName; //Token Address & Name

    mapping(address => uint) campaignIdToken; //CampaignID & Token Address

    event NewCampaignCreated(string TokenName, address TokenAddress, uint campaignId, string IPFSCID);
    event CampaignStarted(string TokenName, address TokenAddress, uint campaignId, uint TokenBalance);
    

    constructor(address _owner) {
              owner = _owner;  
    }


    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized!");
        _;
    }

    modifier hasTokenBalance(address _tokenAddress) {
        uint tokenAmount = tokenBalance[_tokenAddress];
        require(IERC20(_tokenAddress).balanceOf(address(this)) >= tokenAmount, "Not enough tokens!");
        _;
    }

    modifier noDuplicateCampaign(address _tokenAddress){
      //require(isCampaignLive[_tokenAddress]==false, "Campaign Already Live!");
      _;
    }

    /**
 * @notice This function is called from script after the campaign material has been uploaded on IPFS
 * @dev Add the token related information in all the mappings
 * @param _tokenName string
   @param _tokenAddress address
   @param _numOftokens uint
   @param _cid string
 **/
    function createCampaign(
        string calldata _tokenName, 
        address _tokenAddress, 
        uint _numOftokens, 
        string calldata _cid) 
        external
        returns (uint) 
        {
        require(_numOftokens > 0, "Campaign cannot start with 0 give-away tokens");
        require(IERC20(_tokenAddress).totalSupply() > 0, "Token does not have supply");
        tokenIPFS[_tokenAddress]=_cid;
        tokenBalance[_tokenAddress]=_numOftokens;
        isCampaignLive[_tokenAddress]=false;
        tokenAddName[_tokenAddress]=_tokenName;      
        campaignId++;
        campaignIdToken[_tokenAddress]=campaignId;

        emit NewCampaignCreated(_tokenName, _tokenAddress, campaignId, _cid);
        return campaignId;        
    }


 /**
 * @notice This function is called from script after the campaign material has been uploaded on IPFS
 * @dev Add the token related information in all the mappings
 * @param _tokenAddress address
 **/
    function startCampaign(address _tokenAddress, uint _campaignId) external hasTokenBalance(_tokenAddress) {
            require(campaignIdToken[_tokenAddress]==_campaignId, "Campaign ID does not match");
            isCampaignLive[_tokenAddress]=true;
            emit CampaignStarted(tokenAddName[_tokenAddress], _tokenAddress, campaignIdToken[_tokenAddress], tokenBalance[_tokenAddress]);
        }
}
