import HeroSection from "../../components/hero/HeroSection";
import chevronDown from "/icons/arrows/chevron-down.svg";
import Img_01_A from "../../assets/pictures/model/01_a.png";
import Img_01_C from "../../assets/pictures/model/01_c.png";
import Img_02_A from "../../assets/pictures/model/02_a.png";
import Img_03_A from "../../assets/pictures/model/03_a.png";
import Img_04_B from "../../assets/pictures/model/04_b.png";
import Competition from "../../assets/pictures/competition.png";
import ContentWithImage from "../../components/contentWithImage/ContentWithImage";
import SectionDivider from "../../components/sectionDivider/sectionDivider";

const Home = () => {
  return (
    <main className="bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-black text-white min-h-[93vhz] md:h-[93vh]">
        <HeroSection />

        {/* Bouncing Arrow */}
        <div
          className="hidden md:block absolute z-20 bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
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

      <div id="details-section" className="pt-10">
        <SectionDivider text="About Us" />
        {/* Details Section */}
        <ContentWithImage
          imageSrc={Img_01_A}
          imageAlt="About Twistomy™"
          content={[
            { type: "header", text: "About Twistomy™" },
            {
              type: "paragraph",
              text: "Twistomy™ was born from a collaboration between former bioengineering students—Lily Williams (BS), Devon Horton (BS), and Danielle Piper (BS)—at the University of Colorado Anschutz and gastrointestinal specialists Dr. Steven Moulton (MD) and Sara Fidanza (CNS-BC, CPNP-BC) at Children’s Hospital Colorado. Together, our team developed a patented, discreet, and low-profile continent ostomy device that empowers patients to regain control of their bowel habits. Twistomy™ is designed to minimize peristomal complications, reduce the physical burden of traditional ostomies, and support a more confident, active lifestyle by enhancing overall quality of life.",
            },
          ]}
          imageOnLeft={true}
          containerStyle="px-6 md:px-12 pb-10"
          imageStyle="rounded-lg"
          textStyle="text-center md:text-left"
        />

        <ContentWithImage
          imageSrc={Img_02_A}
          imageAlt="The Problem"
          content={[
            { type: "header", text: "The Problem" },
            {
              type: "paragraph",
              text: "An ostomy is an external facing, surgically diverted segment of small or large bowel created by a surgeon that results in the formation of a temporary or permanent stoma. Stoma output is managed with an obtrusive ostomy pouch system, composed of a peristomal wafer with an adhesive backing and a heavy-duty plastic bag to collect fecal material. Nearly 70% of ostomy patients experience leakage from underneath the wafer, resulting in malodor, embarrassment, and peristomal skin complications.  Peristomal skin complications result in frequent hospital visits, longer stays, and higher readmission rates. Pouching systems also produce unsolicited noise, malodor, and pose significant psychosocial challenges often leading to social isolation, depression in nearly half, and reduced quality of life.",
            },
          ]}
          imageOnLeft={false}
          containerStyle="px-6 md:px-12 py-10"
          imageStyle="rounded-lg"
          textStyle="text-center md:text-left"
        />
        <SectionDivider text="Our Solution" />
        <ContentWithImage
          imageSrc={Img_01_C}
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
          imageSrc={Img_03_A}
          imageAlt="Core Features"
          content={[
            { type: "header", text: "Core Features" },
            {
              type: "paragraph",
              text: "The device is composed of a soft flexible sleeve and internal ring that sit within the stoma channeling waste. The low-profile external housing unit twists the sleeve close to prevent leakage and odor scape until the user decides to untwist it for excretion.",
            },
          ]}
          imageOnLeft={false}
          containerStyle="px-6 md:px-12 py-10"
          imageStyle="rounded-lg"
          textStyle="text-center md:text-left"
        />
        <ContentWithImage
          imageSrc={Img_04_B}
          imageAlt="Seamless Integration & User Control"
          content={[
            { type: "header", text: "Seamless Integration & User Control" },
            {
              type: "paragraph",
              text: "When it is time to empty one’s bowels, a pouch adapter lightly threads onto the external housing unit and an ostomy pouch clips on to the pouch adapter. The housing unit twists counterclockwise into the pouch adapter, untwisting the seal to create an open channel for the flow of waste into the pouch. When finished, the primary housing unit is twisted clockwise to reseal the channel. The used pouch is discarded, the adapter cleaned and stored for future use, and housing unit is recapped.",
            },
          ]}
          imageOnLeft={true}
          containerStyle="px-6 md:px-12 py-10"
          imageStyle="rounded-lg"
          textStyle="text-center md:text-left"
        />
        <SectionDivider text="Competition" />
        <ContentWithImage
          imageSrc={Competition}
          imageAlt="What makes Twistomy™ different?"
          content={[
            { type: "header", text: "What makes Twistomy™ different?" },
            {
              type: "paragraph",
              text: "Traditional pouching systems fail to address the key challenges in the ostomy care space. Current ostomy care suppliers own and offer variations of the traditional wafer and pouch system—differing in shape, size, and style—but none address the core physical, emotional, and social issues.",
            },
          ]}
          imageOnLeft={true}
          containerStyle="px-6 md:px-12 py-10"
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
          containerStyle="px-6 md:px-12 py-10"
          imageStyle="rounded-lg"
          textStyle="text-center md:text-left"
        />
      </div>
    </main>
  );
};

export default Home;
