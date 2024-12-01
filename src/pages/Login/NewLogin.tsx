// Login.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Typography, Stack } from "@mui/material";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { generateNonce, generateRandomness } from "@mysten/zklogin";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import queryString from "query-string";
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

const NewLogin = () => {
    const [ephemeralKeyPair, setEphemeralKeyPair] = useState<Ed25519Keypair>();
    const [nonce, setNonce] = useState("");
    const [oauthParams, setOauthParams] = useState<queryString.ParsedQuery<string>>();
    const [jwtString, setJwtString] = useState("");
    const [decodedJwt, setDecodedJwt] = useState<any>();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const res = queryString.parse(location.hash);
        setOauthParams(res);
    }, [location]);

    useEffect(() => {
        if (oauthParams && oauthParams.id_token) {
            const decodedJwt = jwtDecode(oauthParams.id_token as string);
            setJwtString(oauthParams.id_token as string);
            setDecodedJwt(decodedJwt);
            if (oauthParams?.id_token) {
                window.localStorage.setItem("jwtString", oauthParams.id_token.toString());
              } else {
                console.warn("ID token is missing or undefined.");
              }
        }
    }, [oauthParams]);

    const createEphemeralKeyPair = () => {
        const keyPair = Ed25519Keypair.generate();
        setEphemeralKeyPair(keyPair);
        window.sessionStorage.setItem(KEY_PAIR_SESSION_STORAGE_KEY, keyPair.export().privateKey);
        console.log( keyPair.export().privateKey)
    };

    const generateNonceAndLogin = async () => {
        if (!ephemeralKeyPair) return;
        const randomness = generateRandomness();
        const generatedNonce = generateNonce(ephemeralKeyPair.getPublicKey(), 10, randomness);
        setNonce(generatedNonce);
        const params = new URLSearchParams({
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            response_type: "id_token",
            scope: "openid",
            nonce: generatedNonce,
        });
        const loginURL = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
        console.log(loginURL)
        window.location.replace(loginURL);
    };

    return (
        <Stack spacing={2}>
            <Typography variant="h5">Login Segment</Typography>
            <Button variant="contained" onClick={createEphemeralKeyPair}>
                Create Ephemeral KeyPair
            </Button>
            <Button variant="contained" disabled={!ephemeralKeyPair} onClick={generateNonceAndLogin}>
                Sign In With Google
            </Button>
        </Stack>
    );
};

export default NewLogin;