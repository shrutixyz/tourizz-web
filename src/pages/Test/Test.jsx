import {
  ConnectButton,
  useCurrentAccount,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import { isValidSuiObjectId } from "@mysten/sui/utils";
import { Box, Container, Flex, Heading } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Counter } from "../Contract/Counter.tsx";
import { CreateCounter } from "../Contract/CreateCounter.tsx";
import MintNFTForm from "../Scan/Scan.tsx";
import { getFullnodeUrl } from "@mysten/sui.js/client";

function TestContract() {
  const currentAccount = useCurrentAccount();
  const [counterId, setCounter] = useState(() => {
    const hash = window.location.hash.slice(1);
    return isValidSuiObjectId(hash) ? hash : null;
  });

  const [nft, setNft] = useState(() => {
    const hash = window.location.hash.slice(1);
    return isValidSuiObjectId(hash) ? hash : null;
  });

  const { data, isLoading, error } = useSuiClientQuery("getOwnedObjects", {
    owner: "0x1bd23d61b5f9c4b283feab4e16e231e4ba4e64b7d37ac8649ef2be89aca70aeb",
    showContent: true,
    showOwner: true

  });

  useEffect(() => {
    // console.log(data, "data");
    if (data) {
      const dataArray = data.data; // Replace with actual object IDs
      const objectIDs = dataArray.map((item) => item.data?.objectId);
      console.log(objectIDs, "befiore")
      getObjectDetails(objectIDs)
      
    }
  }, [data]);

  async function getObjectDetails(objectIds) {
    const rpcUrl = getFullnodeUrl("devnet"); // Use the appropriate network URL
    const data = {
      jsonrpc: '2.0',
      method: 'sui_multiGetObjects',
      params: [
          objectIds, 
          {
          "showType": true,
          "showOwner": true,
          "showPreviousTransaction": true,
          "showDisplay": true,
          "showContent": true,
          "showBcs": true,
          "showStorageRebate": true
        }
      ],
      id: 1,
    };
  
    try {
      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log('Object Details:', result, objectIds);
    } catch (error) {
      console.error('Error fetching object details:', error);
    }
  }
  
  // Example usage

  return (
    <>
      <Flex
        position="sticky"
        px="4"
        py="2"
        justify="between"
        style={{
          borderBottom: "1px solid var(--gray-a2)",
        }}
      >
        <Box>
          <Heading>dApp Starter Template</Heading>
        </Box>

        <Box>
          <ConnectButton />
        </Box>
      </Flex>
      <Container>
        <Container>
     
  
        </Container>
        <Container
          mt="5"
          pt="2"
          px="4"
          style={{ background: "var(--gray-a2)", minHeight: 500 }}
        >
          {currentAccount ? (
            counterId ? (
              <Counter id={counterId} />
            ) : (
              <CreateCounter
                onCreated={(id) => {
                  window.location.hash = id;
                  setCounter(id);
                }}
              />
            )
          ) : (
            <Heading>Please connect your wallet</Heading>
          )}
        </Container>
        <Container>
          <p>Mint {nft}</p>
          <MintNFTForm
            onMinted={(id) => {
              window.location.hash = id;
              setNft(id);
            }}
          />
        </Container>
      </Container>
    </>
  );
}

export default TestContract;
