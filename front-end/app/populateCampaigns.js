import Decentralearn from './artifacts/contracts/Decentralearn.sol/Decentralearn.json';
import {address} from './__config';
import {ethers} from 'ethers';
import buildCampaigns from './campaigns';

export default async function populateCampaigns() {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const contract = new ethers.Contract(address, Decentralearn.abi, provider);
  const code = await provider.getCode(address);
  const campaigns = [];
  if(code !== "0x") {
    const campaignsIds = await contract.awaitingUpkeep();
    for(let i = 0; i < campaignsIds.length; i++) {
      const tokenAddress = campaignsIds[i];
      const attributes = await contract.campaigns(tokenAddress);
        if(attributes.isActive){
          campaigns.push({ tokenAddress, attributes});
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
