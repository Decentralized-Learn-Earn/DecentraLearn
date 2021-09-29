//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
/**
 * @title Decentralized Learn & Earn DApp
 * @author Shivali, Daniel, Dilan, Jayesh @ EthOnline Sep-Oct, 2021 
 **/
contract Decentralearn is AccessControl, KeeperCompatibleInterface {
    uint public campaignId; 
    address public owner;
    uint [] public awaitingUpkeep;
    uint [] public upkeepFulfilled;
    uint public upkeepCampaignId;

    struct CampaignCreator {
        address tokenAddress;
        uint totalNumOftokens;
        uint  NumOftokensPerTrng;
        string cid;
        uint campaignId;
        bool isActive;
    }
            
    mapping(address => CampaignCreator) campaigns;

    mapping(address => mapping(address => bool)) public userCompletedTraining; 
    mapping(address => mapping(address => bool)) public payoutForTraining;

    event NewCampaignCreated(address indexed TokenAddress,string TokenName, uint CampaignId, uint NumOftokensPerTrng, string IPFSCID);
    event CampaignStarted(address indexed TokenAddress,string TokenName, uint CampaignId, uint TokenBalance);
    event AccessGranted(address indexed User, address TokenAddress, string TokenName);
    event ClaimProcessed(address User, address TokenAddress, string TokenName, uint amount , uint ContractBalance);
    event CampaignDeleted(address TokenAddress, string TokenName,  uint CampaignId, string IPFSCID, bool isActive);


    constructor(address _owner) {
              owner = _owner; 
              _setupRole(DEFAULT_ADMIN_ROLE, _owner); 
              _setupRole(bytes32("USER_ROLE"), _owner); 
    }

    //modifier onlyOwner() {
    //    require(msg.sender == owner, "Not authorized!");
    //    _;
    //}

    modifier hasTokenBalance(address _tokenAddress) {
        require(ERC20(_tokenAddress).balanceOf(address(this)) > 0, "Not enough tokens!");
        _;
    }

    modifier isCampLive(address _tokenAddress) {
        require(campaigns[_tokenAddress].isActive == true, "Sorry, campaign has ended!");
        _;
    }


    modifier noDuplicateCampaign(address _tokenAddress){                        // This can be handled on UI by listening to event NewCampaignCreated for Token Address
      if(campaigns[_tokenAddress].campaignId > 0) revert("Campaign already exists for this Token!");
      _;
    }


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
        noDuplicateCampaign(_tokenAddress)        
        {
        require(_totalNumOftokens > 0, "Campaign cannot start with 0 give-away tokens");
        ERC20 token = ERC20(_tokenAddress);        
        require(token.totalSupply() > 0, "Token does not have enough supply");
        console.log(token.totalSupply());
        console.log(token.name());

        ++campaignId;
        awaitingUpkeep.push(campaignId);
        CampaignCreator storage campaign = campaigns[_tokenAddress];
        campaign.tokenAddress = _tokenAddress;
        campaign.totalNumOftokens=_totalNumOftokens;
        campaign.NumOftokensPerTrng=_NumOftokensPerTrng;
        campaign.cid=_cid;
        campaign.campaignId=campaignId;                 
                
        emit NewCampaignCreated(_tokenAddress, token.name(),  campaignId, _NumOftokensPerTrng, _cid);             
     
    }

/**
     * @notice Function to get Campaign Information
     * @dev Return the CreateCampaign struct information from campaigns mapping
     * @param _tokenAddress address
*/
function getCampaignInfo(address _tokenAddress) public view returns(address addrs, uint totalAmount, uint amtPerTraining, string memory _IPFSCid, uint _campaignId, bool _isActive) {
         addrs = campaigns[_tokenAddress].tokenAddress;
         totalAmount = campaigns[_tokenAddress].totalNumOftokens;
         amtPerTraining= campaigns[_tokenAddress].NumOftokensPerTrng;
         _IPFSCid = campaigns[_tokenAddress].cid;
         _campaignId= campaigns[_tokenAddress].campaignId;
         _isActive = campaigns[_tokenAddress].isActive;
}    


 /**
  @notice This function is called from script after the campaign material has been uploaded onto IPFS & this contract is funded with the Tokens
  @dev Mark isCampaignLive as true
  @param _tokenAddress address
  @param _campaignId uint
 **/
    function startCampaign(address _tokenAddress, uint _campaignId) internal hasTokenBalance(_tokenAddress) {
            CampaignCreator storage campaign = campaigns[_tokenAddress];
            require(campaign.campaignId== _campaignId, "Campaign ID does not match");            
            require(ERC20(_tokenAddress).balanceOf(address(this)) >= campaign.totalNumOftokens, "Not enough tokens!");
            campaign.isActive = true;
            ++upkeepCampaignId;
            upkeepFulfilled.push(upkeepCampaignId);
            ERC20 token = ERC20(_tokenAddress);
            emit CampaignStarted(_tokenAddress, token.name(), _campaignId, IERC20(_tokenAddress).balanceOf(address(this)));
        }

/**
  @notice This function is only called by the owner to assign user role
  @dev Campaign must still be live with enough funds
  @param _user EOA address of the user completing the training
  @param _tokenAddress address of the token for which training completed
**/
function markTrainingCompleted(address _user, address _tokenAddress) external onlyRole(DEFAULT_ADMIN_ROLE) hasTokenBalance(_tokenAddress) isCampLive(_tokenAddress){
            userCompletedTraining[_user][_tokenAddress]=true;
            grantRole(bytes32("USER_ROLE"), _user);
            ERC20 token = ERC20(_tokenAddress);             
            emit AccessGranted(_user, _tokenAddress, token.name());
}

/**
     * @notice Function to get User Completed Training Information
     * @dev Return the information from User Completed Training mapping
     * @param _user address
*/
function getUserCompldTraingInfo(address _user, address _tokenAddress) public view returns(bool) {
    return userCompletedTraining[_user][_tokenAddress];
}

/**
     * @notice This function is called when user has successfully completed the training
     * @dev Ensure user has role assigned and not duplicate claim
     * @param _user user address
     * @param _tokenAddress token address
*/
function submitTokenClaim(address _user,address _tokenAddress) external onlyRole(bytes32("USER_ROLE")) hasTokenBalance(_tokenAddress) isCampLive(_tokenAddress){
    require(payoutForTraining[msg.sender][_tokenAddress]==false, "You already claimed the tokens");
            payoutForTraining[msg.sender][_tokenAddress] = true;
            CampaignCreator memory campaign = campaigns[_tokenAddress];
            uint amount = campaign.NumOftokensPerTrng; 
            console.log(amount);
            ERC20 token = ERC20(_tokenAddress);
            token.transfer(_user, amount);
            emit ClaimProcessed(_user, _tokenAddress, token.name(), amount , ERC20(_tokenAddress).balanceOf(address(this)));
}

/**
     * @notice This function is called to remove a campaign (active/inactive)
     * @dev Ensure caller is admin
     * @param _tokenAddress token address
     * @param _campaignId Campaign ID
*/
function removeCampaign(address _tokenAddress, uint _campaignId) external onlyRole(DEFAULT_ADMIN_ROLE){
        ERC20 token = ERC20(_tokenAddress);
        CampaignCreator storage campaign = campaigns[_tokenAddress];
        require(campaign.campaignId== _campaignId, "Campaign ID does not match");       
        emit CampaignDeleted(_tokenAddress, token.name(),  campaign.campaignId, campaign.cid, campaign.isActive);
        delete campaigns[_tokenAddress];        
}

  function checkUpkeep(bytes calldata checkData) external override returns (bool upkeepNeeded, bytes memory performData ) {
     upkeepNeeded = (awaitingUpkeep.length > upkeepCampaignId);
     performData = checkData;
    
  }

    function performUpkeep(bytes calldata) external override {
    
    startCampaign(0x1b673506C3a3405f40205AB460111831ed2E082a, campaignId);
        
    }

function changeOwnership(address _newowner) external onlyRole(DEFAULT_ADMIN_ROLE){
    owner = _newowner;
}

receive() external payable{

}

}
