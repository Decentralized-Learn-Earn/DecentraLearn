require('dotenv').config()
const ethers = require('ethers');
const ContractArtifact = require('/Users/dhana/Documents/GitHub/LearnEarn/src/artifacts/contracts/Decentralearn.sol/Decentralearn.json');

// TO DO: Copy-paste your Alchemy Kovan HTTP Endpoint
const url = process.env.KOVAN_URL; 

// connect to JSON-RPC provider
const provider = new ethers.providers.JsonRpcProvider(url);

// import private key from .env file and initialize a wallet
const privateKey = process.env.PRIVATE_KEY;
let wallet = new ethers.Wallet(privateKey, provider);
wallet = wallet.connect(provider);

//addresses and ABIs necessary
const contractAddress = "0xb7Fc4930206472f1727F12415eBDb1fa4b9aFB1f";
//const contractAddress = process.env.CONTRACT_ADDRESS
const contractABI = ContractArtifact.abi;

// connect contract to its abi so that we can communicate with it via this instance
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// start of async function where we will make the function call
async function main() {

  //connect contract instance to wallet and call markTrainingCompleted() function
    
    const userAdd="0xa8b2586165fCf2138282b724e9F6E6509532c6B3";
    const tokenAdderss = "0x6c0e31d6D129052a77B00834285Dfb331c04ca02";
    const tx = await contract.markTrainingCompleted(userAdd, tokenAdderss, {gasLimit:200000} )
    console.log("Access granted");
    const campaignId = await contract.campaignId()
    console.log("campaignId " + campaignId)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});