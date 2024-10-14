import NavBar from "./Nav";
import Footer from "./Footer"

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <div>{children}</div>
      <Footer/>
    </div>
  );
};

export default Layout;