//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";

/**
 * @title Decentralized Learn & Earn DApp
 * @author Shivali, Daniel, Dilan @ EthOnline Sep-Oct, 2021 
 **/
contract Decentralearn is AccessControl, KeeperCompatibleInterface {
    uint public campaignId;
    address public owner;
    address [] public awaitingUpkeep;
    //address [] public readyPerformUpkeep;
    enum CampaignState {ended, setup, live}

    struct CampaignCreator {
        address tokenAddress;
        address uploader;
        uint totalNumOftokens;
        uint  NumOftokensPerTrng;
        string cid;
        uint campaignId;
        bool isActive;
        CampaignState state;
    }
            
    mapping(address => CampaignCreator) public campaigns;

    mapping(address => mapping(address => bool)) userCompletedTraining; 
    mapping(address => mapping(address => bool)) payoutForTraining;

    event NewCampaignCreated(address indexed TokenAddress, uint CampaignId, uint NumOftokensPerTrng, string IPFSCID);
    event CampaignStarted(address indexed TokenAddress, uint CampaignId, uint TokenBalance);
    event AccessGranted(address indexed User, address TokenAddress);
    event ClaimProcessed(address User, address TokenAddress, uint amount , uint ContractBalance);
    event CampaignDeleted(address TokenAddress, uint CampaignId, string IPFSCID, bool isActive);
    event CampaignEnded(address TokenAddress,  uint CampaignId, string IPFSCID, bool isActive);  


    constructor(address _owner) {
              owner = _owner; 
              _setupRole(DEFAULT_ADMIN_ROLE, _owner);
              //_setupRole(bytes32("UPLOADER_ROLE"), _owner); 
              _setupRole(bytes32("USER_ROLE"), _owner); 
    }

    //modifier onlyOwner() {
    //    require(msg.sender == owner, "Not authorized!");
    //    _;
    //}

    modifier hasTokenBalance(address _tokenAddress) {
        //CampaignCreator memory campaign = campaigns[_tokenAddress];        
        require(ERC20(_tokenAddress).balanceOf(address(this)) >= campaigns[_tokenAddress].totalNumOftokens, "Token balance not same as mentioned at the time of create campaign!");
        _;
    }

    modifier hasEnoughTokenBalance(address _tokenAddress) {
        //CampaignCreator memory campaign = campaigns[_tokenAddress];        
        require(ERC20(_tokenAddress).balanceOf(address(this)) >= campaigns[_tokenAddress].NumOftokensPerTrng, "Not enough tokens to incentivize!");
        _;
    }

    modifier isCampLive(address _tokenAddress) {
        require(campaigns[_tokenAddress].isActive == true, "Sorry, campaign has ended!");
        _;
    }


    modifier noDuplicateCampaign(address _tokenAddress){                        // This can be handled on UI by listening to event NewCampaignCreated for Token Address
      if(campaigns[_tokenAddress].campaignId > 0 && campaigns[_tokenAddress].state != CampaignState.ended) revert("Campaign already exists for this Token!");
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
        require(_totalNumOftokens > 0, "Campaign cannot be created with 0 tokens");
        require(_NumOftokensPerTrng > 0, "Campaign cannot be created with 0 give-away tokens per training");
        ERC20 token = ERC20(_tokenAddress);        
        require(token.totalSupply() > 0, "Token does not have enough supply");
        console.log(token.totalSupply());
        console.log(token.name());

        ++campaignId;
        CampaignCreator storage campaign = campaigns[_tokenAddress];
        campaign.tokenAddress = _tokenAddress;
        campaign.uploader = msg.sender;
        campaign.totalNumOftokens=_totalNumOftokens;
        campaign.NumOftokensPerTrng=_NumOftokensPerTrng;
        campaign.cid=_cid;
        campaign.campaignId=campaignId;
        campaign.state = CampaignState.setup;                 
        awaitingUpkeep.push(_tokenAddress);        
        emit NewCampaignCreated(_tokenAddress,  campaignId, _NumOftokensPerTrng, _cid);             
     
    }

/**
     * @notice Function to get Campaign Information
     * @dev Return the CreateCampaign struct information from campaigns mapping
     * @param _tokenAddress address
*/
function getCampaignInfo(address _tokenAddress) public view returns(address addrs, uint totalAmount, uint amtPerTraining, string memory _IPFSCid, uint _campaignId, bool _isActive, CampaignState _state) {
         addrs = campaigns[_tokenAddress].tokenAddress;
         totalAmount = campaigns[_tokenAddress].totalNumOftokens;
         amtPerTraining= campaigns[_tokenAddress].NumOftokensPerTrng;
         _IPFSCid = campaigns[_tokenAddress].cid;
         _campaignId= campaigns[_tokenAddress].campaignId;
         _isActive = campaigns[_tokenAddress].isActive;
         _state=campaigns[_tokenAddress].state;
}    


 /**
  @notice This function is called from script after the campaign material has been uploaded onto IPFS & this contract is funded with the Tokens
  @dev Mark isCampaignLive as true
  @param _tokenAddress address
 **/
    function startCampaign(address _tokenAddress) public hasTokenBalance(_tokenAddress) {
            CampaignCreator storage campaign = campaigns[_tokenAddress];
            require(campaign.state== CampaignState.setup, "Campaign is not in setup state");            
            //require(ERC20(_tokenAddress).balanceOf(address(this)) >= campaign.totalNumOftokens, "Not enough tokens!");
            campaign.isActive = true;
            campaign.state = CampaignState.live;            
            emit CampaignStarted(_tokenAddress, campaign.campaignId, IERC20(_tokenAddress).balanceOf(address(this)));
        }

/**
  @notice This function is only called by the owner to assign user role
  @dev Campaign must still be live with enough funds
  @param _user EOA address of the user completing the training
  @param _tokenAddress address of the token for which training completed
**/
function markTrainingCompleted(address _user, address _tokenAddress) external onlyRole(DEFAULT_ADMIN_ROLE) hasEnoughTokenBalance(_tokenAddress) isCampLive(_tokenAddress){
            userCompletedTraining[_user][_tokenAddress]=true;
            grantRole(bytes32("USER_ROLE"), _user);                        
            emit AccessGranted(_user, _tokenAddress);
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
function submitTokenClaim(address _user,address _tokenAddress) external onlyRole(bytes32("USER_ROLE")) hasEnoughTokenBalance(_tokenAddress) isCampLive(_tokenAddress) {
    require(userCompletedTraining[_user][_tokenAddress]==true, "You have not completed the training yet!");
    require(payoutForTraining[msg.sender][_tokenAddress]==false, "You already claimed the tokens for this training!");    
            payoutForTraining[msg.sender][_tokenAddress] = true;
            CampaignCreator memory campaign = campaigns[_tokenAddress];
            uint amount = campaign.NumOftokensPerTrng; 
            console.log(amount);
            ERC20 token = ERC20(_tokenAddress);
            token.transfer(_user, amount);
            emit ClaimProcessed(_user, _tokenAddress, amount , ERC20(_tokenAddress).balanceOf(address(this)));
}

/**
     * @notice This function is called to remove a campaign (active/inactive)
     * @dev Ensure caller is admin
     * @param _tokenAddress token address
     * @param _campaignId Campaign ID
*/
function removeCampaign(address _tokenAddress, uint _campaignId) external onlyRole(DEFAULT_ADMIN_ROLE){
        CampaignCreator storage campaign = campaigns[_tokenAddress];
        require(campaign.campaignId== _campaignId, "Campaign ID does not match");       
        emit CampaignDeleted(_tokenAddress,  campaign.campaignId, campaign.cid, campaign.isActive);
        delete campaigns[_tokenAddress];        
}


/**
     * @notice This function is called to end an existing campaign (setup or live state)
     * @dev Ensure caller is admin
     * @param _tokenAddress token address
     * @param _campaignId Campaign ID
*/
function endCampaign(address _tokenAddress, uint _campaignId) external {
        CampaignCreator storage campaign = campaigns[_tokenAddress];
        require(campaign.uploader== msg.sender, "Only campaign uploader can end the campaign");
        require(campaign.campaignId== _campaignId, "Campaign ID does not match"); 
        require(campaign.isActive== true, "Campaign is not in active status");              
        campaign.isActive = false;
        campaign.state = CampaignState.ended;        
        emit CampaignEnded(_tokenAddress,  campaign.campaignId, campaign.cid, campaign.isActive);
}



function changeOwnership(address _newowner) external onlyRole(DEFAULT_ADMIN_ROLE){
    owner = _newowner;
}

receive() external payable{

}

function checkUpkeep(bytes calldata checkData) external view override returns (bool upkeepNeeded, bytes memory performData) {
        
        bool foundToken;        
        for (uint i=0;i<awaitingUpkeep.length;i++){
                address tokenAwaitingtoStart = awaitingUpkeep[i];                                
                CampaignCreator memory campaign = campaigns[tokenAwaitingtoStart];
                if(ERC20(tokenAwaitingtoStart).balanceOf(address(this)) >= campaign.totalNumOftokens && campaign.isActive==false){
                   // readyPerformUpkeep.push(tokenAwaitingtoStart);
                    foundToken=true;
                    console.log("foundToken");
                }
        }
        upkeepNeeded=foundToken;
        performData=checkData;
    }

function performUpkeep(bytes calldata) external override {
             for (uint i=0;i<awaitingUpkeep.length;i++){
                 CampaignCreator memory campaign = campaigns[awaitingUpkeep[i]];
                if(ERC20(awaitingUpkeep[i]).balanceOf(address(this)) >= campaign.totalNumOftokens && campaign.isActive==false){
                   startCampaign(awaitingUpkeep[i]);                   
                }                    
             }
            //delete readyPerformUpkeep;
    } 


}