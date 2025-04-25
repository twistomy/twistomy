// Header.jsx
import { useState } from "react";
// import { supabase } from "../../../supabaseClient";
// import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useLocation } from "react-router-dom"; // ✅ Used to detect active route

const Header = ({ darkMode, setDarkMode }) => {
  //   const [user, setUser] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     const getUser = async () => {
  //       const { data } = await supabase.auth.getUser();
  //       setUser(data.user);
  //     };
  //     getUser();
  //   }, []);

  //   const handleLogout = async () => {
  //     await supabase.auth.signOut();
  //     window.location.reload();
  //   };

  const navLinks = [
    { text: "Home", link: "/" },
    { text: "Team", link: "/team" },
    { text: "News", link: "/news" },
    { text: "FAQ", link: "/faq" },
    { text: "Contact", link: "/contact" },
  ];

  return (
    <header className="sticky top-0 w-full z-40 flex items-center justify-between px-4 py-2 bg-white dark:bg-[#0b1120] shadow text-black dark:text-white transition-colors duration-300">
      {/* Logo + Identity */}
      <div className="flex items-center space-x-2">
        <a href="/home">
          <img
            src="/logos/SmallerLogo.PNG"
            alt="Logo"
            className="h-12 w-auto"
          />
        </a>
        <a href="/home" className="flex flex-col leading-tight">
          <span className="font-semibold text-xl">Twistomy</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Continent Ostomy
          </span>
        </a>
      </div>

      {/* Hamburger - mobile */}
      <div
        className="md:hidden cursor-pointer text-3xl"
        onClick={() => setIsDrawerOpen(true)}
      >
        ☰
      </div>

      {/* Desktop Nav Links */}
      <nav className="hidden md:flex gap-4 items-center">
        {navLinks.map((item, i) => {
          const isActive = location.pathname === item.link;
          return (
            <a
              key={i}
              href={item.link}
              className={`px-3 py-2 text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                isActive ? "text-base-pink font-bold" : ""
              }`}
            >
              {item.text}
            </a>
          );
        })}

        {/* Dark mode toggle */}
        <IconButton
          onClick={() => setDarkMode((prev) => !prev)}
          color="inherit"
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </nav>

      {/* Account menu */}
      {/* {user && (
        <div className="relative group">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer">
            👤
          </div>
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            <ul className="text-sm text-gray-700">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/my-account")}>
                Account Settings
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Notifications</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Billing</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Help Center</li>
              <li
                className="border-t px-4 py-2 text-red-600 hover:bg-red-100 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      )} */}

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center pt-10">
          <img
            src="/src/assets/react.svg"
            alt="Drawer Logo"
            className="h-20 w-auto mb-4"
          />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Name
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Slogan
          </span>
        </div>
        <nav className="flex flex-col mt-6 space-y-4 px-6">
          {navLinks.map((item, i) => (
            <a
              key={i}
              href={item.link}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-base"
              onClick={() => setIsDrawerOpen(false)}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
