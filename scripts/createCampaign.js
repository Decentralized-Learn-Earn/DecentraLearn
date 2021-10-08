require('dotenv').config()
import {ethers} from 'ethers';
import ContractArtifact from '../src/artifacts/contracts/Decentralearn.sol/Decentralearn.json';
import {address} from '../front-end/app/__config.json';
import "../front-end/app/index.css";

//addresses and ABIs necessary
const contractAddress = "0xb7Fc4930206472f1727F12415eBDb1fa4b9aFB1f";
//const contractAddress = process.env.CONTRACT_ADDRESS
const contractABI = ContractArtifact.abi;
setupEvents();

async function newCampaign() {
  const provider = new ethers.providers.Web3Provider(ethereum);
  await ethereum.request({ method: 'eth_requestAccounts' });

  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, provider);
  let tokenAddress = "0x8C758E54573717a46F9143c27216db9B09D8cb3E";
  let cID = "QmV46tyKPs6qRnpDWYV9Dxd99CWPCcqw2oYsTGmYJ1nG12";
  await contract.connect(signer).createCampaign(tokenAddress, ethers.utils.parseEther('5000'), 10, cID); 
}
document.getElementById("deploy").addEventListener("click", newCampaign);
