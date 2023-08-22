import { createContext, useContext, useState, ReactNode, Context } from 'react';

interface WalletProviderProps {
    children: ReactNode;
}

interface WalletContextType {
    connectedWalletAddress: string;
    setConnectedWalletAddress: (newAddress: string) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function useWalletContext() {
    const context = useContext(WalletContext);
    return context;
}

export function WalletProvider({ children }: WalletProviderProps) {
    const [connectedWalletAddress, setConnectedWalletAddress] = useState('');

    const contextValue = {
        connectedWalletAddress,
        setConnectedWalletAddress
    }

    return (
        <WalletContext.Provider value={contextValue}>
            {children}
        </WalletContext.Provider>
    );
}
