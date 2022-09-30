# NFT Music Player

## Technology Stack & Tools

- Solidity (Writing Smart Contract)
- Javascript (React & Testing)
- [Ethers](https://docs.ethers.io/v5/) (Blockchain Interaction)
- [Hardhat](https://hardhat.org/) (Development Framework)
- [Ipfs](https://ipfs.io/) (Metadata storage)
- [React routers](https://v5.reactrouter.com/) (Navigational components)

## Requirements For Initial Setup

- Install [NodeJS](https://nodejs.org/en/), should work with any node version below 16.5.0
- Install [Hardhat](https://hardhat.org/)

## Setting Up

### 1. Clone/Download the Repository

### 2. Install Dependencies:

```
$ yarn install
```

### 3. Boot up local development blockchain

```
$ npx hardhat node
```

### 4. Connect development blockchain accounts to Metamask

- Copy private key of the addresses and import to Metamask
- Connect your metamask to hardhat blockchain, network 127.0.0.1:8545.

### 5. Run deploy script to migrate smart contracts

`yarn deploy`

`yarn deploy goerli`

### 6. Run Tests

`$ npx hardhat test`

### 7. Run Specific Task - like accounts

`$ npx hardhat accounts`

### 8. Launch Frontend

`$ yarn start`

### 9. Migrate Smart Contracts

```shell
npx hardhat help
npx hardhat test

npx hardhat node

npx hardhat accounts - run specific tasks

npx hardhat run hardhat.config.js

npx hardhat run src/backend/scripts/deploy.js --network localhost
npx hardhat run src/backend/scripts/deploy.js --network goerli

```

## License

MIT
