import { useAccount } from 'wagmi';
import { useWalletContext } from "@/contexts/WalletContext";
import { useEffect } from 'react';
import { HeaderSimple } from "./HeaderSimple";

export function Layout({ children }: { children: React.ReactNode }) {
    const { address, isDisconnected } = useAccount();
    const walletContext = useWalletContext();
    
    const links = [
        {
            link: "/about",
             label: "About"
        },
        {
            link: "/contact",
            label: "Contact"
        }
    ];

    useEffect(() => {
        if (address) {
            walletContext?.setConnectedWalletAddress(address);
        }

        if (isDisconnected) {
            walletContext?.setConnectedWalletAddress('');
        }
    }, [address]);

  return (
    <>
      <HeaderSimple links={links}/>
      {children}
    </>
  );
}
