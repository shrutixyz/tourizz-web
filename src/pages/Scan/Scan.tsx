import { Transaction } from "@mysten/sui/transactions";
import React, { useState } from "react";
import { useSignAndExecuteTransaction, useSuiClient, ConnectButton } from "@mysten/dapp-kit";
import { Container, Button } from "@radix-ui/themes";
import ClipLoader from "react-spinners/ClipLoader";
import money from "../../assets/images/coin.svg"
import Styles from "./Scan.module.css"
import { useNavigate } from "react-router-dom";

function MintNFTForm({
  onMinted,
}: {
  onMinted: (id: string) => void;
}) {
  const nftPackageId = "0xda5f593df36c5e92b0d243f437ce27261175039aa768b9ff8640dba213a0382c"; // Replace with your package ID
  const suiClient = useSuiClient();

  const {
    mutate: signAndExecute,
    isSuccess,
    isPending,
  } = useSignAndExecuteTransaction();

  const [valueArrname, setName] = useState("");
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState("0");
  const [longitude, setLongitude] = useState("0");

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
          onMinted(effects?.created?.[0]?.reference?.objectId!);
        },
        onError: (error) => {
          console.error("Minting NFT failed:", error);
        },
      }
    );
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mintNFT();
  };
  const navigate = useNavigate()

  return (
    
    <Container>
      <div className={Styles.mainbody}>
      <img src={money} alt="" />
      <p>Woohoo!! Collectible added into your vault</p>
      <p className={Styles.inter} onClick={()=>navigate('/collectibles')}>{"View it here -->"}</p>
      </div>

      {/* <ConnectButton /> */}
      {/* <form onSubmit={handleSubmit}>
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
      </form> */}
    </Container>
  );
}

export default MintNFTForm;