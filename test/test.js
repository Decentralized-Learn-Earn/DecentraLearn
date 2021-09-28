const hre = require("hardhat");
const { assert } = require("chai");
const { ethers } = require("hardhat");
let contract;
let signer0, addr0, Owner;
let token;

const {abi} = require("/Users/dhana/Documents/GitHub/LearnEarn/src/artifacts/contracts/Shivalitoken.sol/Shivalitoken.json");

describe("Decentralearn", function () {
  before(async () => {  
     signer0 = await hre.ethers.provider.getSigner(0);
     addr0 = await signer0.getAddress(); 

    const Contract = await ethers.getContractFactory("Decentralearn");
    contract = await Contract.deploy(addr0);
    await contract.deployed();
    console.log("Contract deployed at: "+ contract.address);  
    
  const initialSupply = await ethers.utils.parseEther("5000");
  const SHIVToken = await hre.ethers.getContractFactory("Shivalitoken");
  token = await SHIVToken.deploy(initialSupply);

  await token.deployed();

  console.log("Token deployed to:", token.address);
  });
  
  describe('Verify Constructor Arguments are set correctly', () => {  
  
    it('should have set signer(0) as Owner ', async () => {
      Owner = await contract.owner();            
      assert.equal((Owner), addr0);
    });  
  }); 


  describe('Uploader 1: CREATES CAMPAIGN', () => {
    before(async () => {
              let signer1 = await hre.ethers.provider.getSigner(1);
              //let addr1 = await signer1.getAddress();          
              //address _tokenAddress, uint _totalNumOftokens, uint  _NumOftokensPerTrng,string calldata _cid    
              const tokenAddress = token.address;
              const cID = "QmV46tyKPs6qRnpDWYV9Dxd99CWPCcqw2oYsTGmYJ1nMc4";
              await contract.connect(signer1).createCampaign(tokenAddress, 100, 2, cID); 
              console.log("********CREATES CAMPAIGN***************");          
    });
  
    it('should have created a new campaign and ID incremented to 1 ', async () => {
               assert.equal((await contract.campaignId()), 1);   //should be 1 not 0    
    });     
  }); 
  
  describe('Uploader 1: STARTS CAMPAIGN', () => {
    before(async () => {
              let signer1 = await hre.ethers.provider.getSigner(1);
              //let addr1 = await signer1.getAddress();          
              //address _tokenAddress, uint campaignId    
              const tokenAddress = token.address;

    //Add Tokens to Contract
    const to = await contract.address;
    const value = ethers.utils.parseEther('10');    
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
               assert.equal((await contract.campaignId()), 1);   //should be 1 not 0    
    });     
  }); 
  
});
