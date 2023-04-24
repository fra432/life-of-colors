import { client } from "lib/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { Footer, Navbar } from "..";
import Banner from "../Banner/Banner";

const Layout = ({ children }) => {
  const router = useRouter();
  const isDetailsPage = router.pathname.includes("/paint");

  return (
    <div className="layout">
      <Head>
        <title>Life of Colors</title>
      </Head>
      <header>
        <Banner />
        {!isDetailsPage && <Navbar />}
        <main className="main-container">{children}</main>
        <Footer />
      </header>
    </div>
  );
};

export default Layout;
