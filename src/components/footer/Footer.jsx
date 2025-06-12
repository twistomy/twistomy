export default function Footer() {
  const navLinks = [
    { text: "Home", link: "/" },
    { text: "Team", link: "/team" },
    { text: "News", link: "/news" },
    { text: "FAQ", link: "/faq" },
    { text: "Contact", link: "/contact" },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300 py-12">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center md:justify-between space-y-6 md:space-y-0">
        {/* Logo */}
        <div>
          <a href="/">
            <img
              src="/logos/Logo_NoBackground.png"
              alt="Twistomy Logo"
              className="h-16 w-auto mx-auto md:mx-0"
            />
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center md:justify-start space-x-4 text-sm">
          {navLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="px-2 py-1 border-b-2 border-transparent hover:border-base-pink hover:text-base-pink transition font-medium"
            >
              {item.text}
            </a>
          ))}
        </nav>

        {/* Contact Info */}
        <div className="text-sm flex flex-col items-center md:items-end space-y-4">
          <p>
            Mail:{" "}
            <a
              href="mailto:info@twistomy.com"
              className="hover:text-base-pink transition font-medium"
            >
              info@twistomy.com
            </a>
          </p>

          <a
            href="https://linkedin.com/in/twistomy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-base-pink transition font-medium"
          >
            <img
              src="/logos/LI-In-Bug.png"
              alt="LinkedIn"
              className="w-5 h-5 mr-2"
            />
            Connect with us on LinkedIn
          </a>

          <a
            href="https://www.youtube.com/channel/UCO6MQy880XJwRmR5V0Q9wMQ"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-base-pink transition font-medium"
          >
            <img
              src="/logos/yt_logo_mono_dark.png"
              alt="YouTube"
              className="w-5 h-5 mr-2"
            />
            Visit our YouTube Channel
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Twistomy. All rights reserved.
      </div>
    </footer>
  );
}
