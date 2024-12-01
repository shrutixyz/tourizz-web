import {
    useCurrentAccount,
    useSignAndExecuteTransaction,
    useSuiClient,
    useSuiClientQuery,
  } from "@mysten/dapp-kit";
  import type { SuiObjectData } from "@mysten/sui/client";
  import { Transaction } from "@mysten/sui/transactions";
  import { Button, Flex, Heading, Text } from "@radix-ui/themes";
  import { useNetworkVariable } from "./networkConfigs.ts";
  import React from "react";
  
  export function Counter({ id }: { id: string }) {
    const counterPackageId ="0x8234478aaca7b8d366c8c429a0dfb8852e9b53c74c1ca11469cf38a060749cc3";
    const suiClient = useSuiClient();
    const currentAccount = useCurrentAccount();
    const { mutate: signAndExecute } = useSignAndExecuteTransaction({
      execute: async ({ bytes, signature }) =>
        await suiClient.executeTransactionBlock({
          transactionBlock: bytes,
          signature,
          options: {
            // Raw effects are required so the effects can be reported back to the wallet
            showRawEffects: true,
            showEffects: true,
          },
        }),
    });	
    const { data, isPending, error, refetch } = useSuiClientQuery("getObject", {
      id,
      options: {
        showContent: true,
        showOwner: true,
      },
    });
  
    const executeMoveCall = (method: "increment" | "reset") => {
      const tx = new Transaction();
  
      if (method === "reset") {
        tx.moveCall({
          arguments: [tx.object(id), tx.pure.u64(0)],
          target: `${counterPackageId}::counter::set_value`,
        });
      } else {
        tx.moveCall({
          arguments: [tx.object(id)],
          target: `${counterPackageId}::counter::increment`,
        });
      }
  
      signAndExecute(
        {
          transaction: tx,
        },
        {
          onSuccess: async () => {
            console.log("successs")
            await refetch();
          },
        },
      );
    };
  
    if (isPending) return <Text>Loading...</Text>;
  
    if (error) return <Text>Error: {error.message}</Text>;
  
    if (!data.data) return <Text>Not found</Text>;
  
    const ownedByCurrentAccount =
      getCounterFields(data.data)?.owner === currentAccount?.address;
  
    return (
      <>
        <Heading size="3">Counter {id}</Heading>
  
        <Flex direction="column" gap="2">
          <Text>Count: {getCounterFields(data.data)?.value}</Text>
          <Flex direction="row" gap="2">
            <Button onClick={() => executeMoveCall("increment")}>
              Increment
            </Button>
            {ownedByCurrentAccount ? (
              <Button onClick={() => executeMoveCall("reset")}>Reset</Button>
            ) : null}
          </Flex>
        </Flex>
      </>
    );
  }
  function getCounterFields(data: SuiObjectData) {
    if (data.content?.dataType !== "moveObject") {
      return null;
    }
  
    return data.content.fields as { value: number; owner: string };
  }