import '@/styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from "next/app";
import Head from 'next/head';
import { getDefaultWallets, RainbowKitProvider, } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { MantineProvider } from '@mantine/core';
import { WalletProvider } from '@/contexts/WalletContext';
import { Layout } from '@/components/Layout';

export default function App(props: AppProps) {
    const apiKey: string | undefined = process.env.NEXT_PUBLIC_ALCHEMY_KEY ?? 'No alchemy key entered.';
    const alchemyConfig = { apiKey };

    const { chains, publicClient } = configureChains(
        [mainnet],
        [alchemyProvider(alchemyConfig), publicProvider()]
    );

    const { connectors } = getDefaultWallets({
        appName: 'Whale Tracker',
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? 'No alchemy key entered.',
        chains
    });

    const wagmiConfig = createConfig({
        autoConnect: true,
        connectors,
        publicClient
    });

    const { Component, pageProps } = props;

    return (
        <>
            <Head>
                <title>Page title</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <WagmiConfig config={wagmiConfig}>
                <RainbowKitProvider chains={chains}>
                    <MantineProvider
                        withGlobalStyles
                        withNormalizeCSS
                        theme={{
                            /** Put your mantine theme override here */
                            colorScheme: 'light',
                        }}
                    >
                        <WalletProvider>
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </WalletProvider>
                    </MantineProvider>
                </RainbowKitProvider>
            </WagmiConfig>
        </>
    );
}
