import HeroSection from "../../components/hero/HeroSection";
import chevronDown from "/icons/arrows/chevron-down.svg";
import TwistomyGenCapWafer from "../../assets/pictures/Twistomy_gen_cap_wafer.png"; // Adjust the path as necessary
import ContentWithImage from "../../components/contentWithImage/ContentWithImage";

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

      {/* Details Section */}
      <section id="details-section" className="py-16 bg-white">
        <div className="justify-center items-center flex flex-col md:flex-row md:space-x-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">About Twistomy</h2>
            <p className="text-lg text-gray-700 mb-4">
              Twistomy was created by biomedical engineers Devon Horton (B.S),
              Lily Williams (B.S), and Danielle Piper (B.S) in collaboration
              with GI professionals Dr. Steven Moulton (M.D.) and Sara Fidanza
              (CNS-BC, CPNP-BC) from Children’s Hospital Colorado (CHCO) who
              were frustrated with the burdens of current ostomy care solutions
              for adult and pediatric ostomy patients and the lack of
              improvement in the ostomy care space. Together, through the
              University of Colorado Denver’s Senior Capstone Program, they
              developed Twistomy, a continent ostomy device that has the
              potential to revolutionize the current standard of ostomy care.
            </p>
          </div>
          <img
            className="w-1/2 object-cover mb-4"
            src={TwistomyGenCapWafer}
            alt="Detail 1"
          />
        </div>
      </section>

      <ContentWithImage
        imageSrc={TwistomyGenCapWafer}
        imageAlt="Twistomy Gen Cap Wafer"
        content={[
          { type: "header", text: "Twistomy Gen Cap Wafer" },
          {
            type: "paragraph",
            text: "The Twistomy Gen Cap Wafer is a revolutionary device designed to improve the quality of life for ostomy patients. It offers a secure and comfortable fit, reducing leaks and skin irritation.",
          },
        ]}
        imageOnLeft={false}
        containerStyle="px-6 md:px-12"
        imageStyle="rounded-lg shadow-lg"
        textStyle="text-center md:text-left"
      />
      <ContentWithImage
        imageSrc={TwistomyGenCapWafer}
        imageAlt="Twistomy Gen Cap Wafer"
        content={[
          { type: "header", text: "Features" },
          {
            type: "paragraph",
            text: "The Twistomy Gen Cap Wafer features a unique design that allows for easy application and removal, making it user-friendly for patients of all ages.",
          },
        ]}
        imageOnLeft={true}
        containerStyle="px-6 md:px-12"
        imageStyle="rounded-lg shadow-lg"
        textStyle="text-center md:text-left"
      />
    </main>
  );
};

export default Home;
