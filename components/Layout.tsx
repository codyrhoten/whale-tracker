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
    ]
  return (
    <>
      <HeaderSimple links={links}/>
      {children}
    </>
  );
}
