import populateCampaigns from "./populateCampaigns";
//import populateInfo from "./populateInfo";
import Decentralearn from './artifacts/contracts/Decentralearn.sol/Decentralearn.json';
import {address} from './__config';
import {ethers} from 'ethers';

const url = "https://eth-kovan.alchemyapi.io/v2/KzzLGcuM4BIAvxpd2vEb8T3MDM3pT2t7"
export default async function setupEvents() {
  const provider = new ethers.providers.Web3Provider(url);
  await window.ethereum.request({ method: 'eth_requestAccounts' });

  const signer = provider.getSigner();
  const contract = new ethers.Contract(address, Decentralearn.abi, signer);

  populateCampaigns();
  
  const code = await provider.getCode(address);
  if(code !== "0x") {
    contract.on('CampaignStarted', () => {
      populateCampaigns();
    });
  }
}

window.ethereum.on('chainChanged', () => {
  setupEvents();
});
