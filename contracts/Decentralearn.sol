//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title Decentralized Learn & Earn DApp
 * @author Shivali, Daniel, Dilan, Jayesh @ EthOnline Sep-Oct, 2021 
 **/
contract Decentralearn {
    uint public campaignId;
    address public owner;
    
    mapping(address => string) tokenIPFS;  //Token Address & IPFS CID
    //mapping(address => uint) tokenBalance; //Token Address & Balance
    mapping(address => bool) isCampaignLive; //Token Address & Active Indicator
    //mapping(address => string) tokenAddName; //Token Address & Name
    mapping(address => uint) tokenCampaignId; //CampaignID & Token Address    

    event NewCampaignCreated(address indexed TokenAddress,string TokenName, uint CampaignId, uint NumOftokensPerTrng, string IPFSCID);
    event CampaignStarted(address indexed TokenAddress,string TokenName, uint CampaignId, uint TokenBalance);
    event claimSubmitted(address indexed User, address TokenAddress, string TokenName, uint CurrentTokenBalance );

    constructor(address _owner) {
              owner = _owner;  
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized!");
        _;
    }

    modifier hasTokenBalance(address _tokenAddress) {
        //uint tokenAmount = tokenBalance[_tokenAddress];
        require(IERC20(_tokenAddress).balanceOf(address(this)) > 0, "Not enough tokens!");
        _;
    }

    modifier isCampLive(address _tokenAddress) {
        require(isCampaignLive[_tokenAddress] == true, "Sorry, campaign has ended!");
        _;
    }

/*
    modifier noDuplicateCampaign(address _tokenAddress){                        // This can be handled on UI by listening to event NewCampaignCreated for Token Address
      require(isCampaignLive[_tokenAddress]==false, "Campaign Already Live!");
      _;
    }
*/

/**
  @notice This function is called from script after the campaign material has been uploaded on IPFS
  @dev Add the token related information in all the mappings * 
  @param _tokenAddress address
  @param _totalNumOftokens uint
  @param _NumOftokensPerTrng uint
  @param _cid string
 **/
    function createCampaign(         
        address _tokenAddress, 
        uint _totalNumOftokens,
        uint  _NumOftokensPerTrng,
        string calldata _cid) 
        external         
        {
        require(_totalNumOftokens > 0, "Campaign cannot start with 0 give-away tokens");
        
        IERC20 tokenI = IERC20(_tokenAddress);
        ERC20 token = ERC20(_tokenAddress);
        
        require(tokenI.totalSupply() > 0, "Token does not have enough supply");
        console.log(tokenI.totalSupply());
        
        string memory _tokenName = token.name(); 
        console.log(_tokenName);  

        tokenIPFS[_tokenAddress]=_cid;
        isCampaignLive[_tokenAddress]=false;
        ++campaignId;
        tokenCampaignId[_tokenAddress]=campaignId;
        
        emit NewCampaignCreated(_tokenAddress, _tokenName,  campaignId, _NumOftokensPerTrng, _cid);              
     
    }


 /**
  @notice This function is called from script after the campaign material has been uploaded onto IPFS & this contract is funded with the Tokens
  @dev Mark isCampaignLive as true
  @param _tokenAddress address
  @param _campaignId uint
 **/
    function startCampaign(address _tokenAddress, uint _campaignId) external hasTokenBalance(_tokenAddress) {
            require(tokenCampaignId[_tokenAddress]==_campaignId, "Campaign ID does not match");
            isCampaignLive[_tokenAddress]=true;
            ERC20 token = ERC20(_tokenAddress);
            //string memory _tokenName = token.name();            
            emit CampaignStarted(_tokenAddress, token.name(), _campaignId, IERC20(_tokenAddress).balanceOf(address(this)));
        }

/**
  @notice Once user successfully completes the training then they can submit claims
  @dev Campaign must still be live with enough funds
  @param _user EOA address of the user completing the training
  @param _tokenAddress address 
**/
function submitTokenClaim(address _user, address _tokenAddress) external hasTokenBalance(_tokenAddress) isCampLive(_tokenAddress){
            isCampaignLive[_tokenAddress]=true;
            ERC20 token = ERC20(_tokenAddress);
            //string memory _tokenName = token.name(); 
            emit claimSubmitted(_user, _tokenAddress, token.name(), IERC20(_tokenAddress).balanceOf(address(this)));
}


function changeOwnership(address _newowner) external onlyOwner{
    owner = _newowner;
}

receive() external payable{

}

}
