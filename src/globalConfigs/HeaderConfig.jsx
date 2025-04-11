const logo = {
  src: "/logos/react.svg",
  alt: "Company/Website Logo",
  logoStyle: {
    height: "max-w-fit h-20 lg:h-24 w-auto",
    objectFit: "object-cover",
  },
};

const identity = {
  name: "Company/Website Name",
  nameStyle: {
    font: "font-montserrat",
    fontSize: "md:text-xl lg:text-3xl",
  },
  slogan: "Company/Website Slogan",
  sloganStyle: {
    font: "font-montserrat",
    fontSize: "md:text-xl lg:text-3xl",
  },
};

const navLinks = [
  { text: "Link1", link: "/" },
  { text: "Link2", link: "/" },
  { text: "Link3", link: "/" },
  { text: "Link4", link: "/" },
  { text: "Contact", link: "/" },
];

const linkStyle = {
  font: "font-montserrat",
  fontSize: "text-lg",
  backgroundColor: "bg-transparent",
  color: "text-black",
  padding: "px-2 lg:px-5 py-2",
  border: "border-transparent",
  hoverColors: "hover:text-main hover:border-b hover:border-b-main",
  activeColors: "active:text-main active:border-main",
  focusStyle: "focus:outline-none",
};

const navLinksStyle = {
  display: "flex",
  direction: "flex-row",
  spacing: "space-y-4 md:space-y-0 md:space-x-0 lg:space-x-6",
};

const drawerLogo = {
  src: "/logos/react.svg",
  alt: "Company/Website Logo",
  logoStyle: {
    height: "h-24 w-auto",
    objectFit: "object-cover",
    padding: "mb-2",
  },
};

const drawerLinksStyle = {
  font: "font-montserrat",
  fontSize: "text-lg",
  textAlign: "text-left",
  backgroundColor: "bg-transparent",
  color: "text-accent",
  padding: "px-5 py-2",
  border: "border-transparent",
  hoverColors: "hover:text-main hover:border-b hover:border-b-main",
  activeColors: "active:text-main active:border-main",
  focusStyle: "focus:outline-none",
};

const headerLinks = {
  links: navLinks,
  linkStyle: linkStyle,
  style: navLinksStyle,
};

const drawerLinks = {
  style: {
    display: "flex",
    direction: "flex-col",
    spacing: "space-y-4",
    padding: "px-4",
  },
  links: navLinks,
  linkStyle: drawerLinksStyle,
};

const headerConfig = {
  type: "HeaderComponent",
  props: {
    style: {
      backgroundColor: "bg-gray-400",
      textColor: "text-white",
    },
    slogoProps: {
      logo: logo,
      identity: identity,
      style: {
        textColor: "text-black",
        space: "space-x-2",
      },
    },
    navLinks: {
      type: "NavLinksComponent",
      props: headerLinks,
    },
    drawer: {
      style: {
        hidden: "md:hidden space-y-20",
      },
      content: [
        {
          type: "SlogoComponent",
          props: {
            logo: drawerLogo,
            identity: identity,
            style: {
              flexDirection: "flex-col text-black pt-10",
            },
          },
        },
        {
          type: "NavLinksComponent",
          props: drawerLinks,
        },
      ],
    },
    hamburger: {
      style: {
        hidden: "lg:hidden text-white",
      },
      icon: "", // this is the same as if we didn't include the icon field here
    },
  },
};

export default headerConfig;
