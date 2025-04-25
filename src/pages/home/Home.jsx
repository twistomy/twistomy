import HeroSection from "../../components/hero/HeroSection";
import chevronDown from "/icons/arrows/chevron-down.svg";
import TwistomyGenCapWafer from "../../assets/pictures/Twistomy_gen_cap_wafer.png";
import Twist from "../../assets/pictures/Twisted.png";
import ContinentAssembly from "../../assets/pictures/continent_assembly_exploded.png";
import ExcretoryAssembly from "../../assets/pictures/excretory_assembly_collapsed.png";
import Table from "../../assets/pictures/Table.png";
import ContentWithImage from "../../components/contentWithImage/ContentWithImage";
import SectionDivider from "../../components/sectionDivider/sectionDivider";

const Home = () => {
  return (
    <main className="bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-black text-white h-[93vh]">
        <HeroSection />

        {/* Bouncing Arrow */}
        <div
          className="absolute z-20 bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={() => {
            const detailsSection = document.getElementById("details-section");
            if (detailsSection) {
              detailsSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <img
            src={chevronDown}
            alt="Scroll Down"
            className="animate-bounce w-10 h-10 cursor-pointer invert-[44%] sepia-[73%] saturate-[3210%] hue-rotate-[165deg] brightness-[99%] contrast-[109%]"
          />
        </div>
      </section>
      <SectionDivider text="About Us" />

      <div id="details-section">
        {/* Details Section */}
        <ContentWithImage
          imageSrc={TwistomyGenCapWafer}
          imageAlt="About Twistomy™"
          content={[
            { type: "header", text: "About Twistomy™" },
            {
              type: "paragraph",
              text: "Twistomy was created by biomedical engineers Devon Horton (B.S), Lily Williams (B.S), and Danielle Piper (B.S) in collaboration with GI professionals Dr. Steven Moulton (M.D.) and Sara Fidanza (CNS-BC, CPNP-BC) from Children’s Hospital Colorado (CHCO) who were frustrated with the burdens of current ostomy care solutions for adult and pediatric ostomy patients and the lack of improvement in the ostomy care space. Together, through the University of Colorado Denver’s Senior Capstone Program, they developed Twistomy, a continent ostomy device that has the potential to revolutionize the current standard of ostomy care.",
            },
          ]}
          imageOnLeft={true}
          containerStyle="px-6 md:px-12"
          imageStyle="rounded-lg"
          textStyle="text-center md:text-left"
        />

        <ContentWithImage
          imageSrc={TwistomyGenCapWafer}
          imageAlt="The Problem"
          content={[
            { type: "header", text: "The Problem" },
            {
              type: "paragraph",
              text: "An ostomy is an external facing, surgically diverted segment of small or large bowel created by a surgeon that results in the formation of a temporary or permanent stoma. Stoma output is managed with an obtrusive ostomy pouch system, composed of a peristomal wafer with an adhesive backing and a heavy-duty plastic bag to collect fecal material. Nearly 70% of ostomy patients experience leakage from underneath the wafer, resulting in malodor, embarrassment, and peristomal skin complications.  Peristomal skin complications result in frequent hospital visits, longer stays, and higher readmission rates. Pouching systems also produce unsolicited noise, malodor, and pose significant psychosocial challenges often leading to social isolation, depression in nearly half, and reduced quality of life.",
            },
          ]}
          imageOnLeft={false}
          containerStyle="px-6 md:px-12"
          imageStyle="rounded-lg"
          textStyle="text-center md:text-left"
        />
        <SectionDivider text="Our Solution" />
        <ContentWithImage
          imageSrc={ContinentAssembly}
          imageAlt="The Twistomy™ Solution"
          content={[
            { type: "header", text: "The Twistomy™ Solution" },
            {
              type: "paragraph",
              text: "As a team, we set out to address the challenges associated with current ostomy pouch systems and have developed Twistomy™, an innovative, minimally invasive continent device designed to give ostomy patients control over their fecal output, minimize leakage, odor, and noises, and significantly improve quality of life.",
            },
          ]}
          imageOnLeft={true}
          containerStyle="px-6 md:px-12"
          imageStyle="rounded-lg"
          textStyle="text-center md:text-left"
        />
        <ContentWithImage
          imageSrc={Twist}
          imageAlt="Core Features"
          content={[
            { type: "header", text: "Core Features" },
            {
              type: "paragraph",
              text: "The device is composed of a soft flexible inner ring and twistable thin plastic sleeve that sit within the stoma channeling waste. The low-profile external housing unit twists the conduit shut to prevent leakage and odor escape until the user decides to untwist it for excretion.",
            },
          ]}
          imageOnLeft={false}
          containerStyle="px-6 md:px-12"
          imageStyle="rounded-lg"
          textStyle="text-center md:text-left"
        />
        <ContentWithImage
          imageSrc={ExcretoryAssembly}
          imageAlt="Seamless Integration & User Control"
          content={[
            { type: "header", text: "Seamless Integration & User Control" },
            {
              type: "paragraph",
              text: "The low-profile external housing unit attaches to standard stoma wafer using a compatible “clip-on” mechanism. When it is time to evacuate one’s stoma, a user attaches an ostomy pouch to the housing unit and untwists the conduit, opening the channel for fecal output in a controlled and effective manner. When finished, a user twists the conduit closed, discards the ostomy pouch, and recaps the housing unit.",
            },
          ]}
          imageOnLeft={true}
          containerStyle="px-6 md:px-12"
          imageStyle="rounded-lg"
          textStyle="text-center md:text-left"
        />
        <SectionDivider text="Competition" />
        <ContentWithImage
          imageSrc={Table}
          imageAlt="What makes Twistomy™ different?"
          content={[
            { type: "header", text: "What makes Twistomy™ different?" },
            {
              type: "paragraph",
              text: "Traditional pouching systems fail to address the key challenges in the ostomy care space. Current ostomy care suppliers own and offer variations of the traditional wafer and pouch system—differing in shape, size, and style—but none address the core physical, emotional, and social issues.",
            },
          ]}
          imageOnLeft={true}
          containerStyle="px-6 md:px-12"
          imageStyle="rounded-lg"
          textStyle="text-center md:text-left"
        />
        <ContentWithImage
          imageAlt="Why Twistomy™?"
          content={[
            { type: "header", text: "Why Twistomy™?" },
            {
              type: "paragraph",
              text: "At Twistomy, we believe no one should have to choose between a medical necessity and their sense of dignity. By reducing bulk by over half, Twistomy offers a discreet, leak- and odor-resistant alternative that minimizes complications and empowers ostomy patients to regain control, confidence, and quality of life.",
            },
          ]}
          imageOnLeft={false}
          containerStyle="px-6 md:px-12"
          imageStyle="rounded-lg"
          textStyle="text-center md:text-left"
        />
      </div>
    </main>
  );
};

export default Home;
