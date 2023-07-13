import './index.css';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  goerli,
  polygonMumbai,
  optimismGoerli,
  arbitrumGoerli,
  zkSyncTestnet,
  hardhat,
  bscTestnet,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

import Layout from './components/layout';
import FundToFarm from './pages/FundToFarm';
import Dashboard from './pages/Dashboard';
import Rewards from './pages/Rewards';
import BuidlDetails from './pages/BuidlDetails';
import Projects from './pages/Projects';
import Contributions from './pages/Contributions';
import MintDomain from './pages/MintDomain';
import CreateProject from './pages/CreateProject';
import WidthdrawRequest from './pages/WidthdrawRequest';

const { chains, publicClient } = configureChains(
  [bscTestnet, goerli, optimismGoerli, arbitrumGoerli],
  [
    // alchemyProvider({ apiKey: 'ZbcJUctTzRg0qySTHx0jmolpmxP-5V3g' }),
    publicProvider(),
  ],
  // [
  //   jsonRpcProvider({
  //     rpc: (chain) => ({
  //       https: `https://data-seed-prebsc-1-s1.binance.org:8545`,
  //     }),
  //   }),
  // ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/projects',
        element: <Projects />,
      },
      {
        path: '/buidls/:slug',
        element: <BuidlDetails />,
      },
      {
        path: '/buidls/:slug/widthdraw-request',
        element: <WidthdrawRequest />,
      },
      {
        path: '/donations',
        element: <Contributions />,
      },
      {
        path: '/rewards',
        element: <Rewards />,
      },
      {
        path: '/fund-to-farm',
        element: <FundToFarm />,
      },
      {
        path: '/create-project',
        element: <CreateProject />,
      },
      {
        path: '/min-domain',
        element: <MintDomain />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains}>
      <RouterProvider router={router} />
    </RainbowKitProvider>
  </WagmiConfig>
);
