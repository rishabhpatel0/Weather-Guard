import "./Layout.css";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {

  return (

    <div className="layout">

      <Sidebar />

      <div className="content">

        <Navbar />

        <main>

          {children}

        </main>

      </div>

    </div>

  );
}

export default Layout;