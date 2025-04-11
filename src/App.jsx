import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AppBuilder } from "@aleks-ey/dynamic-app-builder";
import "./App.css";

// import pages
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Team from "./pages/team/Team";
import Faq from "./pages/faq/FAQ";
import Contact from "./pages/contact/Contact";

function App() {
  // header and footer configs should be made here or imported from a file, default configs are imported from globalConfigs folder
  // const headerConfig = {}; or import headerConfig from "./HeaderConfig";
  // const footerConfig = {}; or import footerConfig from "./FooterConfig";

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
