const { formatUnits } = require('ethers/lib/utils');
const { ethers, artifacts } = require('hardhat');

async function main() {
  console.log('dirname: ', __dirname);
  const [deployer, artist] = await ethers.getSigners();

  const toWei = (num) => ethers.utils.parseEther(num.toString());

  let prices = [
    toWei(1),
    toWei(2),
    toWei(3),
    toWei(4),
    toWei(5),
    toWei(6),
    toWei(7),
    toWei(8),
  ];

  let royaltyFee = toWei(0.01);
  let deploymentFees = toWei(prices.length * 0.01);
  let nftMarketplace;

  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Artist account:', artist.address);
  console.log(
    'Deployer account balance:',
    formatUnits(await deployer.getBalance())
  );
  console.log(
    'Artist account balance:',
    formatUnits(await artist.getBalance())
  );

  // deploy contracts - new contract instance
  const NFTMarketplaceFactory = await ethers.getContractFactory(
    'MusicNFTMarketplace'
  );

  nftMarketplace = await NFTMarketplaceFactory.deploy(
    royaltyFee,
    artist.address,
    prices,
    { value: deploymentFees }
  );

  await nftMarketplace.deployed();

  console.log('Smart contract address:', nftMarketplace.address);

  /*
     For each contract, pass the deployed contract and name to this function
     to save a copy of the contract ABI and address to the front end.
    */
  saveFrontendFiles(
    nftMarketplace,
    'MusicNFTMarketplace',
    await nftMarketplace.symbol()
  );
}

// Save a copy of the contract ABI and address to the front end
function saveFrontendFiles(contract, name, symbol) {
  const fs = require('fs');
  const contractsDir = __dirname + '/../../frontend/contractsData';

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-${symbol}-address.json`,
    JSON.stringify({ address: contract.address, symbol: symbol }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}-${symbol}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
