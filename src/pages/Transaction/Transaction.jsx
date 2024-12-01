// Transaction.tsx
import React, { useState } from 'react';
import { Button, Typography, Stack, Alert } from "@mui/material";
import { generateRandomness, jwtToAddress } from "@mysten/zklogin";
import axios from "axios";
import {
    CLIENT_ID,
    FULLNODE_URL,
    KEY_PAIR_SESSION_STORAGE_KEY,
    MAX_EPOCH_LOCAL_STORAGE_KEY,
    RANDOMNESS_SESSION_STORAGE_KEY,
    REDIRECT_URI,
    STEPS_LABELS_TRANS_KEY,
    SUI_DEVNET_FAUCET,
    SUI_PROVER_DEV_ENDPOINT,
    USER_SALT_LOCAL_STORAGE_KEY,
  } from "../../constant.ts";

const Transaction = () => {
    const [zkLoginUserAddress, setZkLoginUserAddress] = useState("");
    const [requestingFaucet, setRequestingFaucet] = useState(false);
    const generateUserSalt = () => {
        const salt = generateRandomness();
       return salt;
    };
    const jwtString =  window.localStorage.getItem(
        "jwtString"
      );
      const userSalt =generateUserSalt()

  
    
    const generateZkLoginAddress = () => {
        if (!userSalt || !jwtString) return;
        const address = jwtToAddress(jwtString, userSalt);
        setZkLoginUserAddress(address);
    };

    const requestFaucet = async () => {
        if (!zkLoginUserAddress) return;
        try {
            setRequestingFaucet(true);
            await axios.post(SUI_DEVNET_FAUCET, {
                FixedAmountRequest: {
                    recipient: zkLoginUserAddress,
                },
            });
            console.log("Faucet request successful");
        } catch (error) {
            console.error("Faucet request failed", error);
        } finally {
            setRequestingFaucet(false);
        }
    };

    return (
        <Stack spacing={2}>
            <Typography variant="h5">Transaction Segment</Typography>
            <Button variant="contained" onClick={generateZkLoginAddress}>
                Generate zkLogin Address
            </Button>
            {zkLoginUserAddress && (
                <Typography>
                    zkLogin Address: <code>{zkLoginUserAddress}</code>
                </Typography>
            )}
            <Button
                variant="contained"
                disabled={!zkLoginUserAddress}
                onClick={requestFaucet}
                loading={requestingFaucet}
            >
                Request Test SUI Token
            </Button>
            {zkLoginUserAddress && (
                <Alert severity="success">
                    Successfully generated zkLogin address! You can request test SUI tokens.
                </Alert>
            )}
        </Stack>
    );
};

export default Transaction;