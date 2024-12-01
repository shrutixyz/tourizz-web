import { Transaction } from "@mysten/sui/transactions";
import { Button, Container } from "@radix-ui/themes";
import { useSignAndExecuteTransaction, useSuiClient, ConnectButton } from "@mysten/dapp-kit";
import { useNetworkVariable } from "./networkConfigs.ts";
import ClipLoader from "react-spinners/ClipLoader";
import React from "react";
import { error } from "console";

export function CreateCounter({
  onCreated,
}: {
  onCreated: (id: string) => void;
}) {
  const counterPackageId = useNetworkVariable("counterPackageId");
  const suiClient = useSuiClient();
  const {
    mutate: signAndExecute,
    isSuccess,
    isPending,
  } = useSignAndExecuteTransaction();

  function create() {
    const tx = new Transaction();

    // tx.moveCall({
    //   arguments: [],
    //   target: `${counterPackageId}::counter::create`,
    // });

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
       <ConnectButton />
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