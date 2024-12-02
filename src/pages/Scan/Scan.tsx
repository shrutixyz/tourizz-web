import { Transaction } from "@mysten/sui/transactions";
import React, { useEffect, useState } from "react";
import { useSignAndExecuteTransaction, useSuiClient, ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { Container, Button } from "@radix-ui/themes";
import ClipLoader from "react-spinners/ClipLoader";
import money from "../../assets/images/coin.svg"
import Styles from "./Scan.module.css"
import { useNavigate } from "react-router-dom";

function MintNFTForm() {
  const nftPackageId = "0x71c12c0d62334ea07b6758a50d7812327b596626e9e46ca9f118ac7ef68c9623"; // Replace with your package ID
  const suiClient = useSuiClient();

  const {
    mutate: signAndExecute,
    isSuccess,
    isPending,
  } = useSignAndExecuteTransaction();

  // const [valueArrname, setName] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState("0");
  const [longitude, setLongitude] = useState("0");

  useEffect(() => {
    mintNFT();
  }, [])

  const [add, setAdd] = useState("")
  const account = useCurrentAccount();
  useEffect(()=>{
    if(account){
      setAdd(account?.address);
    }
  }, [account])

  async function mintNFT() {
    const tx = new Transaction();
    tx.setGasBudget(50000000);
    const values =  localStorage.getItem("currentNFT")??"";
    const valueArr = values?.split(":")
    // console.log(valueArr[1], valueArr[2], valueArr[3], valueArr[4])
    tx.moveCall({
      target: `${nftPackageId}::nft::mint_tourist_place_nft`,
      arguments: [
        tx.pure.string(valueArr[1] !== undefined ? valueArr[1] : ""),
        tx.pure.string(valueArr[2] !== undefined ? valueArr[2] : ""),
        tx.pure.string(valueArr[3] !== undefined ? valueArr[3] : ""),
        tx.pure.string(valueArr[4] !== undefined ? valueArr[4] : "")
      ],
    });
   
    signAndExecute(
      { transaction: tx },
      {
        onSuccess: async ({ digest }) => {
          const { effects } = await suiClient.waitForTransaction({
            digest: digest,
            options: { showEffects: true },
          });

          console.log("Transaction effects:", effects);
          // onMinted(effects?.created?.[0]?.reference?.objectId!);
        },
        onError: (error) => {
          console.error("Minting NFT failed:", error);
        },
      }
    );
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("submit")
    mintNFT();
  };
  const navigate = useNavigate()

  return (
    
    <Container>
      <div className={Styles.mainbody}>
      <img src={money} alt="" />
      <p>Woohoo!! Collectible added into your vault</p>
      <p className={Styles.inter} onClick={()=>{
        
        window.location.href=`/collectibles?address=${add}`
      }}>{"View it here -->"}</p>
      </div>

      {/* <ConnectButton /> */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
        />
        <input
          type="number"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Latitude"
        />
        <input
          type="number"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Longitude"
        />
        <Button
          size="3"
          type="submit"
          disabled={isSuccess || isPending}
        >
          {isSuccess || isPending ? <ClipLoader size={20} /> : "Mint NFT"}
        </Button>
      </form>
    </Container>
  );
}

export default MintNFTForm;