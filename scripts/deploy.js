const hre = require("hardhat");
const fs = require('fs');


async function main() {
     const signer0 = await hre.ethers.provider.getSigner(0);
     const addr0 = await signer0.getAddress(); 

    const Contract = await ethers.getContractFactory("Decentralearn");
    const contract = await Contract.deploy(addr0);
    await contract.deployed();
 /*
    const initialSupply = await ethers.utils.parseEther("50000");
    const Token = await ethers.getContractFactory("DLEtoken1");
    const token = await Token.deploy(initialSupply);
    await token.deployed();

    const initialSupply2 = await ethers.utils.parseEther("50000");
    const Token2 = await ethers.getContractFactory("DLEtoken2");
    const token2 = await Token2.deploy(initialSupply2);
    await token2.deployed();

    const initialSupply3 = await ethers.utils.parseEther("50000");
    const Token3 = await ethers.getContractFactory("DLE2token3");
    const token3 = await Token3.deploy(initialSupply3);
    await token3.deployed();
 */  
//*Use below to deploy with ethernal*
  //await hre.ethernal.push({
 // name: 'Decentralearn',
 // address: contract.address,
  
//});
  //*remove comments and comment out ethernal to deploy without ethernal*
 // await contract.deployed();

  console.log("DecentraLearn deployed to:", contract.address);
  //console.log("DLEtoken1 deployed to:", token.address);
  //console.log("DLEtoken2 deployed to:", token2.address);
  //console.log("DLEtoken3 Token deployed to:", token3.address);
  const config = { address: contract.address }
  fs.writeFileSync("./front-end/app/__config.json", JSON.stringify(config, null, 2));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
