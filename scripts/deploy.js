
   
const { Signer } = require("@ethersproject/abstract-signer");
const { ethers } = require("hardhat");
const hre = require("hardhat");
const ethernal = require('hardhat-ethernal');


async function main() {
  
  signer0 = await hre.ethers.provider.getSigner(0);
     addr0 = await signer0.getAddress(); 

    const Contract = await ethers.getContractFactory("Decentralearn");
    contract = await Contract.deploy(addr0);
    await contract.deployed();

    const initialSupply = await ethers.utils.parseEther("5000");
    const Token = await ethers.getContractFactory("Shivalitoken");
    token = await Token.deploy(initialSupply);
    await token.deployed();

//*Use below to deploy with ethernal*
  //await hre.ethernal.push({
 // name: 'Decentralearn',
 // address: contract.address,
  
//});
  //*remove comments and comment out ethernal to deploy without ethernal*
 // await contract.deployed();

  console.log("DecentraLearn deployed to:", contract.address);
  console.log("ShivaliToken deployed to:", token.address);
}




main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });