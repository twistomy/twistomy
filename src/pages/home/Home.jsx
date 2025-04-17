import HeroSection from "../../components/hero/HeroSection";
import chevronDown from "/icons/arrows/chevron-down.svg";

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
        <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <img
              className="w-full h-48 object-cover mb-4"
              src="/path-to-detail-image1.jpg"
              alt="Detail 1"
            />
            <p className="text-gray-700">
              Detail 1: Description about the first detail.
            </p>
          </div>
          <div className="text-center">
            <img
              className="w-full h-48 object-cover mb-4"
              src="/path-to-detail-image2.jpg"
              alt="Detail 2"
            />
            <p className="text-gray-700">
              Detail 2: Description about the second detail.
            </p>
          </div>
          <div className="text-center">
            <img
              className="w-full h-48 object-cover mb-4"
              src="/path-to-detail-image3.jpg"
              alt="Detail 3"
            />
            <p className="text-gray-700">
              Detail 3: Description about the third detail.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
