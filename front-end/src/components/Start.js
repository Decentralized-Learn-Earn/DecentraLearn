import { IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import React from 'react';

const Start = ({ onQuizStart }) => {
  return(
    <div className="card">
      <div className="card-content">
        <div className="content">
          <p>Uniswap is a decentralized finance protocol that is used to exchange cryptocurrencies. Uniswap is also the name of the company that initially built the Uniswap protocol. The protocol facilitates automated transactions between cryptocurrency tokens on the Ethereum blockchain through the use of smart contracts. The native token of Uniswap is the UNI Token, which allows holders of the token to vote.The Uniswap V3 core whitew paper was written in March 2021, has five authors and nine pages. Uniswap provides a large ecosystem for developers, traders, and liquidity providers. to learn more, please visit our website at uniswap.org.  </p>
          
          <Button color="primary" variant="contained" className="button is-info is-medium" onClick={onQuizStart}>Start Quiz</Button>
        </div>
      </div>
    </div>
  );
}

export default Start; 