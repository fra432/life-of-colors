import Head from "next/head";
import { Footer, Navbar } from "..";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Life of Colors</title>
      </Head>
      <header>
        <Navbar />
        <main className="main-container">{children}</main>
        <Footer />
      </header>
    </div>
  );
};

export default Layout;
