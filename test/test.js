const hre = require("hardhat");
const { assert } = require("chai");
const { ethers } = require("hardhat");
let contract;
let signer0, addr0, Owner;
let signer1, addr1, signer2, addr2;
let token, tokenAddress, cID, token2, tokenAddress2;

const {abi} = require("/Users/dhana/Documents/GitHub/LearnEarn/src/artifacts/contracts/Shivalitoken.sol/Shivalitoken.json");

describe("Decentralearn", function () {
  before(async () => {  
    signer0 = await hre.ethers.provider.getSigner(0);
    addr0 = await signer0.getAddress(); 
    signer1 = await hre.ethers.provider.getSigner(1);
    addr1 = await signer1.getAddress();  
    signer2 = await hre.ethers.provider.getSigner(2);
    addr2 = await signer2.getAddress();          
    
    const Contract = await ethers.getContractFactory("Decentralearn");
    contract = await Contract.deploy(addr0);
    await contract.deployed();
    console.log("Contract deployed at: "+ contract.address);  
    
  const initialSupply = await ethers.utils.parseEther("5000");
  const SHIVToken = await hre.ethers.getContractFactory("Shivalitoken");
  token = await SHIVToken.deploy(initialSupply);
  tokenAddress = token.address;    

  await token.deployed();

  console.log("Token1 deployed to:", token.address);

  const initialSupply2 = await ethers.utils.parseEther("10000");
  const DanielToken = await hre.ethers.getContractFactory("Danieltoken");
  token2 = await DanielToken.deploy(initialSupply2);
  tokenAddress2 = token2.address;    

  await token2.deployed();

  console.log("Token2 deployed to:", token2.address);

  });
  
  describe('Verify Constructor Arguments are set correctly', () => {  
  
    it('should have set signer(0) as Owner ', async () => {
      Owner = await contract.owner();            
      assert.equal((Owner), addr0);
    });     
  }); 


  describe('Uploader 1: CREATES CAMPAIGN', () => {
    before(async () => {                      
              //address _tokenAddress, uint _totalNumOftokens, uint  _NumOftokensPerTrng,string calldata _cid    
              tokenAddress = token.address;
              cID = "QmV46tyKPs6qRnpDWYV9Dxd99CWPCcqw2oYsTGmYJ1nMc4";
              await contract.connect(signer1).createCampaign(tokenAddress, 3000, 5, cID); 
              console.log("********CREATES CAMPAIGN***************");          
    });
  
    it('should have created a new campaign and ID incremented to 1 ', async () => {
               assert.equal((await contract.campaignId()), 1);   //should be 1 not 0    
    });
    
    it('should NOT create a Duplicate Campaign ', async () => {
      await contract.connect(signer1).createCampaign(tokenAddress, 200, 1, cID); 
      //assert.equal((await contract.campaignId()), 1);   //should be 1 not 0    
    });
  }); 

  describe('Uploader 2: CREATES CAMPAIGN 2', () => {
    before(async () => {                      
              //address _tokenAddress, uint _totalNumOftokens, uint  _NumOftokensPerTrng,string calldata _cid    
              tokenAddress2 = token2.address;
              cID = "QmV46tyKPs6qRnpDWYV9Dxd99CWPCcqw2oYsTGmYJ1nMc4";
              await contract.connect(signer2).createCampaign(tokenAddress2, 5000, 1, cID); 
              console.log("********CREATES CAMPAIGN 2***************");          
    });
  
    it('should have created a new campaign and ID incremented to 2 ', async () => {
               assert.equal((await contract.campaignId()), 2);   //should be 1 not 0    
    });  

    it('should have set campaign correctly with isActive as False', async () => {    
      let {addrs, totalAmount, amtPerTraining, _IPFSCid, _campaignId, _isActive} = await contract.getCampaignInfo(tokenAddress2);  
      console.log("****************************************"); 
      console.log(addrs);
      console.log(totalAmount);
      console.log(amtPerTraining);
      console.log(_IPFSCid);
      console.log(_campaignId);  
      console.log(_isActive);  
      console.log("****************************************");     
    });
    
  }); 

  
  describe('Uploader 1: STARTS CAMPAIGN', () => {
    before(async () => {           

    //Add Tokens to Contract
    const to = await contract.address;
    const value = ethers.utils.parseEther('3000');    
    const tokenContract = new hre.ethers.Contract(tokenAddress, abi, signer0);
    const transferTx = await tokenContract.transfer(to, value);
    await transferTx.wait();
    
    const x = await tokenContract.balanceOf(contract.address);  
    console.log("Contract's Token Balance: "+ await (ethers.utils.formatEther(x)));
    console.log("****************************************");

              await contract.connect(signer1).startCampaign(tokenAddress, 1); 
              console.log("********START CAMPAIGN***************");          
    });
  
    it('should start campaign ', async () => {
      let {addrs, totalAmount, amtPerTraining, _IPFSCid, _campaignId, _isActive} = await contract.getCampaignInfo(tokenAddress); 
               assert.equal(_campaignId, 1);   //should be 1 not 0    
    }); 
    
    it('should have set campaign correctly', async () => {    
      let {addrs, totalAmount, amtPerTraining, _IPFSCid, _campaignId, _isActive} = await contract.getCampaignInfo(tokenAddress);  
      console.log("****************************************"); 
      console.log(addrs);
      console.log(totalAmount);
      console.log(amtPerTraining);
      console.log(_IPFSCid);
      console.log(_campaignId);  
      console.log(_isActive);  
      console.log("****************************************");     
    });
  }); 
  
  describe('User 1: COMPLETES TRAINING', () => {
    before(async () => {                 
    console.log("****************************************");

              await contract.connect(signer0).markTrainingCompleted(addr2, tokenAddress); 
              console.log("********USER INFO UPDATED***************");          
    });
  
    it('should set the information for user ', async () => {
       console.log("User Setup: " + await contract.getUserCompldTraingInfo(addr2,tokenAddress));         
    }); 
    
    it('should NOT have set the information for user 1 ', async () => {
      console.log("User Setup: " + await contract.getUserCompldTraingInfo(addr1,tokenAddress));         
   }); 
    
  }); 

  describe('User 1: CLAIM TOKEN', () => {
    before(async () => {
               
    console.log("****************************************");
              await contract.connect(signer2).submitTokenClaim(addr2, tokenAddress);                         
    });
  
    it('should be able to claim ', async () => {
      console.log("********ABLE TO CLAIM***************"); 
      const tokenContract = new hre.ethers.Contract(tokenAddress, abi, signer0);
      const x = await tokenContract.balanceOf(contract.address);  
      console.log("Contract's Token Balance: "+ await (x)); //await (ethers.utils.formatEther(x)));
      console.log("****************************************");      
    }); 
     
    it('should not be able to claim ', async () => {
      await contract.connect(signer1).submitTokenClaim(addr1, tokenAddress);
      console.log("********NOT ABLE TO CLAIM***************");       
    });

    it('should not be able to claim second time ', async () => {
      await contract.connect(signer2).submitTokenClaim(addr2, tokenAddress);
      console.log("********NOT ABLE TO CLAIM***************");       
    });
    
  }); 

  describe('Owner: REMOVES CAMPAIGN 2', () => {
    before(async () => {                      
              //address _tokenAddress, uint _totalNumOftokens, uint  _NumOftokensPerTrng,string calldata _cid                  
              await contract.connect(signer0).removeCampaign(tokenAddress2, 2); 
              console.log("********REMOVE CAMPAIGN 2***************");          
    });
      

    it('should have removed campaign 2', async () => {    
      let {addrs, totalAmount, amtPerTraining, _IPFSCid, _campaignId, _isActive} = await contract.getCampaignInfo(tokenAddress2);  
      console.log("****************************************"); 
      console.log(addrs);
      console.log(totalAmount);
      console.log(amtPerTraining);
      console.log(_IPFSCid);
      console.log(_campaignId);  
      console.log(_isActive);  
      console.log("****************************************");     
    });
    
  }); 




});
