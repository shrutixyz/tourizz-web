import { Transaction } from "@mysten/sui/transactions";
import { Button, Container } from "@radix-ui/themes";
import { useSignAndExecuteTransaction, useSuiClient, ConnectButton } from "@mysten/dapp-kit";
import { useNetworkVariable } from "./networkConfigs.ts";
import ClipLoader from "react-spinners/ClipLoader";
import React from "react";
import { error } from "console";
import Styles from './Counter.module.css'
export function CreateCounter({
  onCreated,
}: {
  onCreated: (id: string) => void;
}) {
  const counterPackageId = "0x36f8117d98de9138990ab91b4e9e8c036c7c16ce4be1cfde432fe3c711280b50";
  console.log(counterPackageId)
  const suiClient = useSuiClient();
  const {
    mutate: signAndExecute,
    isSuccess,
    isPending,
  } = useSignAndExecuteTransaction();

  function create() {
    const tx = new Transaction();

    tx.moveCall({
      arguments: [],
      target: `${counterPackageId}::counter::create`,
    });

    tx.setGasBudget(20000000);


    console.log(tx)

    signAndExecute(
      {
        transaction: tx,
      },
      {
        onSuccess: async ({ digest }) => {
          console.log("heh")
          const { effects } = await suiClient.waitForTransaction({
            digest: digest,
            options: {
              showEffects: true,
            },
          });

          console.log(effects);

          onCreated(effects?.created?.[0]?.reference?.objectId!);
        },
        onError: (error) => {
          console.error("Transaction failed:", error);
        },
      },
    );
  }

  return (
    <Container>
       <ConnectButton style={{
        backgroundColor: "red"
       }}/>
      <Button
        size="3"
        onClick={() => {
          create();
        }}
        disabled={isSuccess || isPending}
      >
        {isSuccess || isPending ? <ClipLoader size={20} /> : "Create Counter"}
      </Button>
    </Container>
  );
}