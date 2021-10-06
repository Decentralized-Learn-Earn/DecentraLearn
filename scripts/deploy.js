const hre = require("hardhat");


async function main() {
     const signer0 = await hre.ethers.provider.getSigner(0);
     const addr0 = await signer0.getAddress(); 

    const Contract = await ethers.getContractFactory("Decentralearn");
    const contract = await Contract.deploy(addr0);
    await contract.deployed();

    const initialSupply = await ethers.utils.parseEther("5000");
    const Token = await ethers.getContractFactory("Shivalitoken");
    const token = await Token.deploy(initialSupply);
    await token.deployed();

    const initialSupply2 = await ethers.utils.parseEther("10000");
    const Token2 = await ethers.getContractFactory("Danieltoken");
    const token2 = await Token2.deploy(initialSupply);
    await token2.deployed();

//*Use below to deploy with ethernal*
  //await hre.ethernal.push({
 // name: 'Decentralearn',
 // address: contract.address,
  
//});
  //*remove comments and comment out ethernal to deploy without ethernal*
 // await contract.deployed();

  console.log("DecentraLearn deployed to:", contract.address);
  console.log("ShivaliToken deployed to:", token.address);
  console.log("DanielToken deployed to:", token2.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });