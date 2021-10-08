require('dotenv').config();
import populateCampaigns from "./populateCampaigns";
//import populateInfo from "./populateInfo";
import Decentralearn from '/Users/dhana/Documents/GitHub/LearnEarn/src/artifacts/contracts/Decentralearn.sol/Decentralearn.json';
import {address} from './__config';
import {ethers} from 'ethers';
const url = process.env.KOVAN_URL; 
export default async function setupEvents() {
  //const provider = new ethers.providers.Web3Provider(ethereum);
  const provider = new ethers.providers.JsonRpcProvider(url);
  const privateKey = process.env.PRIVATE_KEY;
  let wallet = new ethers.Wallet(privateKey, provider);
  wallet = wallet.connect(provider);
  await ethereum.request({ method: 'eth_requestAccounts' });
  //addresses and ABIs necessary
  const contractAddress = "0xb7Fc4930206472f1727F12415eBDb1fa4b9aFB1f";
  //const contractAddress = process.env.CONTRACT_ADDRESS
  const contractABI = ContractArtifact.abi;

  // connect contract to its abi so that we can communicate with it via this instance
  const contract = new ethers.Contract(contractAddress, contractABI, wallet);
  //const signer = provider.getSigner();
  //const contract = new ethers.Contract(address, Decentralearn.abi, provider);

  populateCampaigns();
  
  const code = await provider.getCode(address);
  if(code !== "0x") {
    contract.on('CampaignStarted', () => {
      populateCampaigns();
    });
  }
}

ethereum.on('chainChanged', () => {
  setupEvents();
});
