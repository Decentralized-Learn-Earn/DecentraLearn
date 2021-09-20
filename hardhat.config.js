require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
//require('@openzeppelin/hardhat-upgrades');
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");



module.exports = {
  //solidity: "0.8.0",  
  solidity: {
    compilers: [
      {
        version: "0.8.0",
      },
      {
        version: "0.6.6",
        settings: {},
      },
    ],
  },
  paths: {
    artifacts: './src/artifacts',
  },
  etherscan: {
    apiKey:process.env.ETHERSCAN_KEY
  },
  networks: {
    hardhat: {
      forking: {
        url: process.env.ALCHEMY_FORK,
        blockNumber: 9287019
      }
    },
    rinkeby: {
      url: process.env.RINKEBY_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
    ropsten: {
      url: process.env.ROPSTEN_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
    kovan: {
      url: process.env.KOVAN_URL,
      accounts: [process.env.PRIVATE_KEY]
  }
},
};