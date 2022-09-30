import { Link, Routes, Route } from 'react-router-dom';
import { Fragment, useState } from 'react';
import { ethers } from 'ethers';

import MusicNFTMarketplaceAbi from '../contractsData/MusicNFTMarketplace-DCP.json';
import MusicNFTMarketplaceAddress from '../contractsData/MusicNFTMarketplace-DCP-address.json';

import { Spinner, Navbar, Nav, Button, Container } from 'react-bootstrap';

import logo from './logo.png';
import Home from './Home.js';
import MyTokens from './MyTokens.js';
import MyResales from './MyResales.js';

import './App.css';
import { formatEther } from 'ethers/lib/utils';
import config from '../../config/config.json';

function App() {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [contract, setContract] = useState({});
  const [chainId, setChainId] = useState(null);

  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    setAccount(accounts[0]);
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Get signer
    const signer = provider.getSigner();
    // Get balance
    const readBalance = (await signer.getBalance()).toString();

    const getChainId = await signer.getChainId();

    setBalance(formatEther(readBalance));
    setChainId(getChainId);
    loadContract(signer);
  };

  const loadContract = async (signer) => {
    // Get deployed copy of music nft marketplace contract
    const getContract = new ethers.Contract(
      MusicNFTMarketplaceAddress.address,
      MusicNFTMarketplaceAbi.abi,
      signer
    );
    setContract(getContract);
    setLoading(false);
  };
  return (
    <div className='App'>
      <>
        <Navbar
          expand='lg'
          variant='dark'
          style={{ backgroundColor: '#00b5ad' }}
        >
          <Container>
            <Navbar.Brand href='/'>
              <img
                src={logo}
                width='40'
                height='40'
                className=''
                alt=''
                style={{ borderRadius: '50%' }}
              />
              &nbsp; Music NFT player
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className='me-auto'>
                <Nav.Link as={Link} to='/'>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to='/my-tokens'>
                  My Tokens
                </Nav.Link>
                <Nav.Link as={Link} to='/my-resales'>
                  My Resales
                </Nav.Link>
              </Nav>
              <Nav style={{ alignItems: 'baseline' }}>
                {account ? (
                  <Fragment>
                    <Nav.Link
                      href={`${config[chainId]?.explorerURL}${account}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='button nav-button btn-sm mx-4'
                    >
                      <Button variant='outline-light'>
                        {account.slice(0, 5) + '...' + account.slice(38, 42)}
                      </Button>
                    </Nav.Link>
                    <p style={{ color: '#fff' }}>{balance} ETH</p>
                  </Fragment>
                ) : (
                  <Button onClick={web3Handler} variant='outline-light'>
                    Connect Wallet
                  </Button>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
      <div>
        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '80vh',
            }}
          >
            <Spinner animation='border' style={{ display: 'flex' }} />
            <p className='mx-3 my-0'>Awaiting Metamask Connection...</p>
          </div>
        ) : (
          <Routes>
            <Route path='/' element={<Home contract={contract} />} />
            <Route
              path='/my-tokens'
              element={<MyTokens contract={contract} />}
            />
            <Route
              path='/my-resales'
              element={<MyResales contract={contract} account={account} />}
            />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
