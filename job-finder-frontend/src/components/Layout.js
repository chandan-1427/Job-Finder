import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const location = useLocation();
  
  // ❌ Hide footer on these pages
  const hideFooterPages = ["/login", "/register"];
  const shouldShowFooter = !hideFooterPages.includes(location.pathname);

  return (
    <>
      <Navbar />
      <main>{children}</main>
      {shouldShowFooter && <Footer />}
    </>
  );
};

export default Layout;
