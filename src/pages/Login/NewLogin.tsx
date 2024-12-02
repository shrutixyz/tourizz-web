// Login.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Typography, Stack } from "@mui/material";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { generateNonce, generateRandomness } from "@mysten/zklogin";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import queryString from "query-string";
import { useSignAndExecuteTransaction, useSuiClient, ConnectButton } from "@mysten/dapp-kit";
import Styles from "./Login.module.css"
import logo from "../../assets/icons/logo.svg"
import googleimg from "../../assets/icons/google.png"
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
      const jwtString = localStorage.getItem("jwtString");
      if (jwtString) {
        navigate("/explore");
      }
    }, [navigate]);

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

    const fullLogin = async () =>{
        await createEphemeralKeyPair()
        await generateNonceAndLogin()
    }
    const createEphemeralKeyPair = async () => {
        const keyPair = Ed25519Keypair.generate();
       await setEphemeralKeyPair(keyPair);
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
       <main>
        <div className={Styles.header}>
            <img src={logo} alt="" className={Styles.headerimage} />
            <h1 className={Styles.login}>Login</h1>
        </div>

        <div className={Styles.loginbutton} onClick={fullLogin}>
            <img src={googleimg} className={Styles.googleimg} alt="" />
            <p>Login with Google (ZK Login)</p>
        </div>
        
       </main>
    );
};

export default NewLogin;