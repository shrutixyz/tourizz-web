import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login.tsx";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import {
  SuiClientProvider,
  WalletProvider,
  createNetworkConfig
} from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui.js/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import i18n from "i18next";
import NewLogin from "./pages/Login/NewLogin.tsx";
import Profile from "./pages/Profile/Profile.jsx";
import Transaction from "./pages/Transaction/Transaction.jsx";
import { Counter } from "./pages/Contract/Counter.tsx";
import TestContract from "./pages/Test/Test.jsx";
import MintNFTForm from "./pages/Scan/Scan.tsx";
import Explore from "./pages/Explore/Explore";
import QRScanner from "./components/QRScanner/QRScanner.jsx";
import ImageGenerator from "./components/ImageGenerator/ImageGenerator.jsx";
import Collectibles from "./pages/Collectibles/Collectibles.jsx";
// import { resources } from "./lang/resources";

function App() {
  const { networkConfig } = createNetworkConfig({
    devnet: { url: getFullnodeUrl("devnet") },
  });

  const queryClient = new QueryClient();

  // i18n
  //   .use(initReactI18next) // passes i18n down to react-i18next
  //   .init({
  //     // the translations
  //     // (tip move them in a JSON file and import them,
  //     // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
  //     resources: resources,
  //     lng: "en", // if you're using a language detector, do not define the lng option
  //     fallbackLng: "en",
  //     interpolation: {
  //       escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  //     },
  //   });

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork="devnet">
          {/* <StyledSnackbarProvider maxSnack={4} autoHideDuration={3000} /> */}
          <WalletProvider autoConnect>
            
            <Routes>
              <Route path="/" element={<Landing />} />
              {/* <Route path="/login" element={<Login />} /> */}
              <Route path="/login" element={<NewLogin />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/transaction" element={<Transaction />} />
              {/* <Route path="/check" element={<SuiComponent />} /> */}
              <Route path="/create" element={<TestContract/>} />
              <Route path="/counter" element={<Counter />} />
              <Route path="/scan" element={<MintNFTForm />} />
              <Route path="/qr" element={<QRScanner />} />
              <Route path="/image" element={<ImageGenerator />} />
              <Route path="/collectibles" element={<Collectibles />} />

            </Routes>
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
