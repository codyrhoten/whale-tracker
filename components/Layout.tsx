import { useAccount } from "wagmi";
import { HeaderSimple } from "./HeaderSimple";

export function Layout({ children }: { children: React.ReactNode }) {
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

    // useEffect here that depends on wagmi's watchAccount event?

  return (
    <>
      <HeaderSimple links={links}/>
      {children}
    </>
  );
}
