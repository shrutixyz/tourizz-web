import { JsonRpcProvider, Ed25519Keypair, RawSigner } from '@mysten/sui';


import React, { useState } from 'react';

function MintNFTForm() {
    const provider = new JsonRpcProvider('https://fullnode.devnet.sui.io'); // Use the appropriate network
    const privateKey = window.sessionStorage.getItem(
        KEY_PAIR_SESSION_STORAGE_KEY
      );

      const keypair =   Ed25519Keypair.fromSecretKey(
        fromB64(privateKey)
      );

// const keypair = Ed25519Keypair.fromSecretKey('<YOUR_SECRET_KEY>'); // Use your keypair
const signer = new RawSigner(keypair, provider);

async function mintTouristPlaceNFT(name, city, latitude, longitude) {
    const tx = {
        packageObjectId: '0xf178ab747aec8326ee48a9a93c73d27ed5d9d486b48323e97fb33ce2e432372b', // Replace with your package ID
        module: 'nft', // Replace with your module name
        function: 'mint_tourist_place_nft',
        typeArguments: [],
        arguments: [
            name,
            city,
            latitude,
            longitude
        ],
        gasBudget: 2000000, // Adjust as needed
    };

    try {
        const response = await signer.executeMoveCall(tx);
        console.log('Transaction response:', response);
    } catch (error) {
        console.error('Error minting NFT:', error);
    }
}


    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        mintTouristPlaceNFT(name, city, latitude, longitude);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
            <input type="number" value={latitude} onChange={(e) => setLatitude(Number(e.target.value))} placeholder="Latitude" />
            <input type="number" value={longitude} onChange={(e) => setLongitude(Number(e.target.value))} placeholder="Longitude" />
            <button type="submit">Mint NFT</button>
        </form>
    );
}

export default MintNFTForm;
