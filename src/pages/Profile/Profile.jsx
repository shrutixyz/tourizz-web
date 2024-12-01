// Verification.tsx
import React, { useState } from 'react';
import { Button, Typography, Stack, Alert } from "@mui/material";
import { generateRandomness } from "@mysten/zklogin";
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

const Profile = () => {
    const jwtString =  window.localStorage.getItem(
        "jwtString"
      );
      const [userSalt, setUserSalt] = useState()


    const generateUserSalt = () => {
        const salt = generateRandomness();
        setUserSalt(salt);
        window.localStorage.setItem(USER_SALT_LOCAL_STORAGE_KEY, salt);
    };

    return (
        <Stack spacing={2}>
            <Typography variant="h5">Verification Segment</Typography>
            {jwtString && (
                <Alert severity="success">Successfully logged in via Google!</Alert>
            )}
            <Button variant="contained" onClick={generateUserSalt}>
                Generate User Salt
            </Button>
            {userSalt && (
                <Typography>User Salt: <code>{userSalt}</code></Typography>
            )}
        </Stack>
    );
};

export default Profile;