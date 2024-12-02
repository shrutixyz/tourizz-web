import { Transaction } from "@mysten/sui/transactions";
import React, { useState } from "react";
import { useSignAndExecuteTransaction, useSuiClient, ConnectButton } from "@mysten/dapp-kit";
import { Container, Button } from "@radix-ui/themes";
import ClipLoader from "react-spinners/ClipLoader";

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

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState("0");
  const [longitude, setLongitude] = useState("0");

  async function mintNFT() {
    const tx = new Transaction();
    tx.setGasBudget(50000000);
    console.log(name, city, latitude, longitude)
    tx.moveCall({
      target: `${nftPackageId}::nft::mint_tourist_place_nft`,
      arguments: [
        tx.pure.string(name),
        tx.pure.string(city),
        tx.pure.string(latitude),
        tx.pure.string(longitude),
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

  return (
    <Container>
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