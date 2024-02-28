import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      
      <nav>
        <Link href="/sims">Home</Link> |{" "} 
        <Link href="/sims/glasses">Glasses</Link> |{" "}
        <Link href="/sims/testScript">Ts test</Link> |{" "}
        <a href="/api/users">uwu API</a> |{" "}
      </nav>
    </header>
      <hr />
    {children}
  </div>
);

export default Layout;
