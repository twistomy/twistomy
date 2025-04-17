export default function Footer() {
  // Slogo (logo only in this JSON)
  const slogoLogoSrc = "/logos/Logo_NoBackground.png";
  const slogoLogoAlt = "Logo";

  // Nav links
  const navLinks = [
    { text: "Home", link: "/home" },
    { text: "About", link: "/about" },
    { text: "The Team", link: "/team" },
    { text: "FAQ", link: "/faq" },
    { text: "Contact", link: "/contact" },
  ];

  // Nav link styling
  const navLinkClass =
    "font-montserrat text-sm bg-transparent text-white px-2 py-2 " +
    "border-transparent hover:text-main hover:border-b hover:border-b-main " +
    "active:text-main active:border-main focus:outline-none";

  // Container style for nav links
  const navLinksContainerClass =
    "flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2";

  // Contact info
  const contactItems = [
    { text: "Mail: info@twistomy.com" },
    { text: "Phone: +1 (234) 567-890" },
    {
      isLink: true,
      link: "https://LinkedIn.com/",
      text: "Connect with us on LinkedIn",
      icon: {
        iconUrl: "/logos/LI-In-Bug.png",
        className: "w-5 h-4 mr-2",
      },
      customStyle: {
        display: "flex",
        direction: "flex-row",
      },
    },
    {
      isLink: true,
      link: "https://youtube.com/",
      text: "Visit the official Twistomy Channel",
      icon: {
        iconUrl: "/logos/yt_logo_mono_dark.png",
        className: "w-20 h-4 mr-2",
      },
      customStyle: {
        display: "flex",
        direction: "flex-row",
      },
    },
  ];

  // Contact info container style
  // "font-montserrat text-sm flex flex-col items-center space-y-2 text-white"
  const contactContainerClass =
    "font-montserrat text-sm flex flex-col items-center space-y-2 text-white";

  // -------------------------------------------------------------------
  // 2) Inline Markup
  // -------------------------------------------------------------------
  return (
    <footer className="bg-accent py-10 px-10">
      <div className="flex flex-col items-center space-y-8">
        {/* ----------------------------------------------- 
                2A) Logo Section (Slogo)
               ----------------------------------------------- */}
        <div>
          <a href="/home">
            <img
              src={slogoLogoSrc}
              alt={slogoLogoAlt}
              className="h-24 md:h-32 w-auto"
            />
          </a>
        </div>

        {/* ----------------------------------------------- 
                2B) Nav Links
               ----------------------------------------------- */}
        <div className={navLinksContainerClass}>
          {navLinks.map((linkItem, index) => (
            <a key={index} href={linkItem.link} className={navLinkClass}>
              {linkItem.text}
            </a>
          ))}
        </div>

        {/* ----------------------------------------------- 
                2C) Contact Info
               ----------------------------------------------- */}
        <div className={contactContainerClass}>
          {contactItems.map((item, index) => {
            if (item.isLink) {
              const customStyleClasses = Object.values(item.customStyle).join(
                " "
              );
              return (
                <a key={index} href={item.link} className={customStyleClasses}>
                  {item.icon && (
                    <img
                      src={item.icon.iconUrl}
                      className={item.icon.className}
                      alt=""
                    />
                  )}
                  {item.text}
                </a>
              );
            } else {
              return <p key={index}>{item.text}</p>;
            }
          })}
        </div>
      </div>
    </footer>
  );
}
