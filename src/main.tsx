import React from "react";
import ReactDOM from "react-dom/client";
import "@mysten/dapp-kit/dist/index.css";
import "@radix-ui/themes/styles.css";
import App from "./App";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { getFullnodeUrl } from '@mysten/sui/client';
import "@mysten/dapp-kit/dist/index.css";
import { networkConfig } from "./networkConfig";
import "./index.css";

const queryClient = new QueryClient();
// const networks = {
//     devnet: { url: getFullnodeUrl('devnet') },
//     mainnet: { url: getFullnodeUrl('mainnet') },
// };

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="devnet">
        <WalletProvider>
          <App />
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
