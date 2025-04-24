import HeroSection from "../../components/hero/HeroSection";
import chevronDown from "/icons/arrows/chevron-down.svg";
import TwistomyGenCapWafer from "../../assets/pictures/Twistomy_gen_cap_wafer.png"; // Adjust the path as necessary
import ContentWithImage from "../../components/contentWithImage/ContentWithImage";
import SectionDivider from "../../components/sectionDivider/sectionDivider";

const Home = () => {
  return (
    <main className="bg-white text-black">
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
          /*
          [Primary Photo of the Device should be somewhere toward the top of site here (photo labeled: twistomy cap and wafer photo) *VRML file of same photo labeled “continent assembly collapsed” has also been added to google drive for cooler shadow animation that you wanted to do]
          */
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
          imageStyle="rounded-lg shadow-lg"
          textStyle="text-center md:text-left"
        />

        <ContentWithImage
          imageSrc={TwistomyGenCapWafer}
          /*
          [Insert “Ostomy Pouch Cleaning” Video in Drive somewhere near this problem blurb if possible]
          */
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
          imageStyle="rounded-lg shadow-lg"
          textStyle="text-center md:text-left"
        />
      </div>
      <SectionDivider text="About Us" />
    </main>
  );
};

export default Home;
