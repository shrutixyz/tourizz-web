import { getFullnodeUrl } from "@mysten/sui/client";
import {
  DEVNET_COUNTER_PACKAGE_ID,
//   TESTNET_COUNTER_PACKAGE_ID,
//   MAINNET_COUNTER_PACKAGE_ID,
} from "../../constant.ts"
import { createNetworkConfig } from "@mysten/dapp-kit";

const { networkConfig, useNetworkVariable, useNetworkVariables } =
  createNetworkConfig({
    devnet: {
      url: getFullnodeUrl("devnet"),
      variables: {
        counterPackageId: DEVNET_COUNTER_PACKAGE_ID,
      },
    },
    // testnet: {
    //   url: getFullnodeUrl("testnet"),
    //   variables: {
    //     counterPackageId: DEVNET_COUNTER_PACKAGE_ID,
    //   },
    // },
    // mainnet: {
    //   url: getFullnodeUrl("mainnet"),
    //   variables: {
    //     counterPackageId: DEVNET_COUNTER_PACKAGE_ID,
    //   },
    // },
  });

export { useNetworkVariable, useNetworkVariables, networkConfig };