import React, { useState } from 'react';
import { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } from '@solana/web3.js';

const SOLANA_CONNECTION = new Connection(clusterApiUrl('devnet'));
const AIRDROP_AMOUNT = 1 * LAMPORTS_PER_SOL; // 1 SOL

const App = () => {
  const [address, setAddress] = useState('');

  const handleSubmit = async () => {
    console.log(`Requesting airdrop for ${address}`);
    const signature = await SOLANA_CONNECTION.requestAirdrop(
      new PublicKey(address),
      AIRDROP_AMOUNT
    );
    const { blockhash, lastValidBlockHeight } = await SOLANA_CONNECTION.getLatestBlockhash();
    await SOLANA_CONNECTION.confirmTransaction(
      {
        blockhash,
        lastValidBlockHeight,
        signature,
      },
      'finalized'
    );
    console.log(`Tx Complete: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
  };

  return (
    <div>
      <div className="container">
        <h1>Solana Airdrop</h1>
        <p>Enter your wallet address</p>
        <input
          className="input"
          type="text"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default App;
