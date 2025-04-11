const footerConfig = {
  type: "FooterComponent",
  props: {
    footer: {
      style: {
        backgroundColor: "bg-accent",
        padding: "py-10 px-10",
      },
    },
    slogo: {
      logo: {
        src: "/logos/react.svg",
        alt: "Company/Website Logo",
        logoStyle: {
          className: "h-24 md:h-32 w-auto",
        },
      },
    },
    navLinks: {
      links: [
        { text: "Link1", link: "/" },
        { text: "Link2", link: "/" },
        { text: "Link3", link: "/" },
        { text: "Link4", link: "/" },
        { text: "Contact", link: "/" },
      ],
      linkStyle: {
        font: "font-montserrat",
        fontSize: "text-sm",
        backgroundColor: "bg-transparent",
        color: "text-white",
        padding: "px-2 py-2",
        border: "border-transparent",
        hoverColors: "hover:text-main hover:border-b hover:border-b-main",
        activeColors: "active:text-main active:border-main",
        focusStyle: "focus:outline-none",
      },
      style: {
        display:
          "flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2",
      },
    },
    contactInfo: {
      items: [
        { text: "Mail: info@info.org" },
        { text: "Phone: +1 (234) 567-890" },
        {
          isLink: true,
          link: "https://facebook.com/",
          text: "Facebook",
          icon: {
            iconUrl: "/path/to/facebook-icon.png",
            className: "w-4 h-4 mr-2",
          },
          customStyle: {
            display: "flex",
            direction: "flex-row",
          },
        },
      ],
      style: {
        font: "font-montserrat text-sm",
        display: "flex flex-col items-center space-y-2 text-white",
      },
    },
  },
};

export default footerConfig;
