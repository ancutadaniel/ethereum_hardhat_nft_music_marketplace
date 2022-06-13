require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

// console.log(process.env);

module.exports = {
  solidity: '0.8.4',
  networks: {
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [`${process.env.ROPSTEN_PRIVATE_KEY}`],
    },
  },
  paths: {
    artifacts: './src/backend/artifacts',
    sources: './src/backend/contracts',
    cache: './src/backend/cache',
    tests: './src/backend/test',
  },
};
