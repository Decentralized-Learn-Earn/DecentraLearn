require('dotenv').config()
import {ethers} from 'ethers';
import ContractArtifact from '../src/artifacts/contracts/Decentralearn.sol/Decentralearn.json';
import {address} from '../front-end/app/__config.json';
import "../front-end/app/index.css";

//addresses and ABIs necessary
const contractAddress = "0xb7Fc4930206472f1727F12415eBDb1fa4b9aFB1f";
//const contractAddress = process.env.CONTRACT_ADDRESS
const contractABI = ContractArtifact.abi;


async function newCampaign() {
  const provider = new ethers.providers.Web3Provider(ethereum);
  await ethereum.request({ method: 'eth_requestAccounts' });

  const signer = provider.getSigner();
  const addr = await signer.getAddress();
  const contract = new ethers.Contract(contractAddress, contractABI, provider);
  let tokenAddress = "0x6c0e31d6D129052a77B00834285Dfb331c04ca02";
  await contract.connect(signer).submitTokenClaim(addr,tokenAddress); 
}
document.getElementById("deploy").addEventListener("click", newCampaign);
