//import Decentralearn from './artifacts/contracts/Decentralearn.sol/Decentralearn.json';
//import {address} from './__config';
import {ethers} from 'ethers';
//const ethers = require('ethers');
//import buildCampaigns from './campaigns';
const url = process.env.KOVAN_URL; 

 export default async function populateCampaigns() {
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
  //const provider = new ethers.providers.Web3Provider(ethereum);
  //const contract = new ethers.Contract(address, Decentralearn.abi, provider);
  const code = await provider.getCode(contractAddress);
  console.log("Length:")
  const campaigns = [];
  if(code !== "0x") {
    let campaignsIds =[];
    campaignsIds= await contract.awaitingUpkeep();
    for(let i = 0; i < campaignsIds.length; i++) {
      const tokenAddress = campaignsIds[i];
      const attributes = await contract.campaigns(tokenAddress);
        if(attributes.isActive){
          campaigns.push({ tokenAddress, attributes});
          console.log("Length:" + campaigns.length)
        }            
    }
  }
  renderCampaigns(provider, contract, campaigns);
}

function renderCampaigns(provider, contract, campaigns) {
  const container = document.getElementById("container");
  container.innerHTML = campaigns.map(buildCampaigns).join("");
  campaigns.forEach(({ tokenAddress }) => {
    document.getElementById(`learn-${id}`).addEventListener('click', async () => {
      /*
      await ethereum.request({ method: 'eth_requestAccounts' });
      const signer = provider.getSigner();
      await contract.connect(signer).confirmTransaction(id);
      */
     //instead of above line the button should be 'Learn' and on click it should go to IPFS bring the JSON and Display
  });
});
}


