// Verification.tsx
import React, { useEffect, useState } from "react";
import { Button, Typography, Stack, Alert } from "@mui/material";
import { generateRandomness } from "@mysten/zklogin";
import Styles from "./Profile.module.css"
import logo from "../../assets/icons/logo.svg"
import { ConnectButton, useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit';

import pfp from "../../assets/images/pfp.svg"
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
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [collectibles, setCollectibles] = useState(0)
    const account = useCurrentAccount();
  const jwtString = window.localStorage.getItem("jwtString");
  const [userSalt, setUserSalt] = useState();
const [address, setAddress] = useState("")
  const generateUserSalt = () => {
    const salt = generateRandomness();
    setUserSalt(salt);
    window.localStorage.setItem(USER_SALT_LOCAL_STORAGE_KEY, salt);
    alert("Your profile is verified, the user salt is "+ salt)
  };
const navigate = useNavigate()
  useEffect(()=>{
    if(account){
        setAddress(account.address);
    }
    
  }, [account])

  const logout = () =>{
    window.localStorage.removeItem("jwtString")
    navigate('/')
  }

  const { data, isLoading, error } = useSuiClientQuery("getOwnedObjects", {
    owner: address,
    showContent: true,
    showOwner: true,
  });

  useEffect(()=> {
    if (data) {
        setCollectibles(data.length==null?0:data.length)
    }
  }, [data])

  return (
    <main>
      <div className={Styles.header}>
        <img src={logo} className="logoheader" alt="" />
        <p>PROFILE</p>
      </div>

      <div className={Styles.pfp}>
      <img src={pfp} alt="" />
      <div className={Styles.address}>
        <p className={Styles.text}>{address}</p>
        </div>

        <p className={Styles.verify} onClick={generateUserSalt}>Verify Account</p>

        <div className={Styles.collectibles}>
            <p className={Styles.number}>{collectibles}</p>
            <p className={Styles.subtitles}>Collectibles Grabbed</p>
        </div>
      </div>

     <div>
       <p className={Styles.interGetStarted} onClick={logout}>{"Logout -->"}</p>
     </div>
    </main>
    // <Stack spacing={2}>
    //     <Typography variant="h5">Verification Segment</Typography>
    //     {jwtString && (
    //         <Alert severity="success">Successfully logged in via Google!</Alert>
    //     )}
    //     <Button variant="contained" onClick={generateUserSalt}>
    //         Generate User Salt
    //     </Button>
    //     {userSalt && (
    //         <Typography>User Salt: <code>{userSalt}</code></Typography>
    //     )}
    // </Stack>
  );
};

export default Profile;
