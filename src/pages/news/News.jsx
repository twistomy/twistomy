import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import AGA1 from "../../assets/pictures/news/AGA/2025_Shark_Tank_Winner.jpg";
import AGA2 from "../../assets/pictures/news/AGA/AGA_shark_tank_win.jpeg";
import AGA3 from "../../assets/pictures/news/AGA/IMG_2687.jpg";
import Capstone1 from "../../assets/pictures/news/Capstone/Senior Capstone Win.jpg";
import Capstone2 from "../../assets/pictures/news/Capstone/IMG_5493.jpg";
import Capstone3 from "../../assets/pictures/news/Capstone/IMG_9426.jpg";
import EMIVC1 from "../../assets/pictures/news/EMIVC/Photo placeholder.png";

const newsData = [
  {
    title: "Big news from Twistomy!",
    description: `We’re honored to share that Twistomy was awarded both Judge’s Pick and Audience Favorite at the 2025 AGA Tech Summit Shark Tank in Chicago!
      Co-founders Devon Horton and Lily Williams pitched alongside four other outstanding finalist teams, engaging with an inspiring community of innovators in gastrointestinal health. We're especially excited to announce that Twistomy will be advancing to present at the Digestive Disease Week (DDW) Shark Tank in San Diego, May 3–6, 2025.
      A heartfelt thank you to the AGA and the Shark Tank judges for their belief in our mission to transform ostomy care. This was a major milestone for our team — and an incredible opportunity to learn, grow, and connect with leaders driving the future of digestive health.
      Stay tuned for what’s next, and thank you to everyone who continues to support us on this journey!
      `,
    images: [AGA1, AGA2, AGA3],
  },
  {
    title:
      "Twistomy Wins 1st Place at CU Denver Senior Capstone Design Showcase",
    // description: `We’re proud to share that Twistomy earned 1st place out of 50+ engineering projects across all departments at the 2024 CU Denver College of Engineering, Design, and Computing Senior Capstone Design Showcase!
    //   From conceptualization to the final prototype and provisional patent filing, this milestone represents 10 months of rigorous design, testing, and iteration to develop the Continent Ostomy Device. A heartfelt thank you to our mentors, Dr. Steven Moulton, and Sara Fidanza at Children’s Hospital Colorado for their unwavering support and guidance throughout the project.
    //   Winning this capstone competition is just the beginning. We’re excited to carry this momentum forward as we continue refining the device and advancing toward clinical and commercial impact in the years to come.
    //   For more information, visit here.`,
    description: (
      <>
        <p>
          We’re proud to share that Twistomy earned 1st place out of 50+
          engineering projects across all departments at the 2024 CU Denver
          College of Engineering, Design, and Computing Senior Capstone Design
          Showcase!
        </p>
        <p>
          From conceptualization to the final prototype and provisional patent
          filing, this milestone represents 10 months of rigorous design,
          testing, and iteration to develop the Continent Ostomy Device. A
          heartfelt thank you to our mentors, Dr. Steven Moulton, and Sara
          Fidanza at Children’s Hospital Colorado for their unwavering support
          and guidance throughout the project.
        </p>
        <p>
          Winning this capstone competition is just the beginning. We’re excited
          to carry this momentum forward as we continue refining the device and
          advancing toward clinical and commercial impact in the years to come.
          For more information, visit{" "}
          <a
            href="https://ucdengineeringnews.com/2024/05/23/college-of-engineering-design-and-computings-graduating-seniors-show-out-at-the-senior-capstone-design-expo/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-700"
          >
            here
          </a>
          .
        </p>
      </>
    ),
    images: [Capstone1, Capstone2, Capstone3],
  },
  {
    title:
      "Twistomy Wins Top Prize at 2025 Emerging Medical Innovation Valuation Competition!",
    description: `We’re thrilled to announce that Twistomy has been awarded first place at the 2025 Emerging Medical Innovation Valuation Competition (EMIVC), held during the DMD Conference in Minneapolis. The EMIVC recognizes groundbreaking technologies with strong investment potential, and our novel ostomy device impressed a panel of industry leaders with its scalability, IP and regulatory strategy, reimbursement potential, and projected return on investment.
      This recognition is a major milestone for Twistomy as we continue pushing forward to improve quality of life for ostomates everywhere. A huge thank you to the EMIVC judges and organizers for this opportunity and their invaluable feedback!
      Stay tuned for what’s next—this is just the beginning.
      `,
    images: [EMIVC1],
  },
];

const News = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0b1120] text-black dark:text-white px-4 py-6 md:py-8">
      <h1 className="text-6xl md:text-4xl font-bold text-center mb-10">News</h1>
      <div className="space-y-12 py-8 md:py-0 max-w-4xl mx-auto">
        {newsData.map((newsItem, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6"
          >
            <h2 className="text-2xl font-semibold mb-2">{newsItem.title}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {newsItem.description}
            </p>
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              autoPlay
              interval={5000}
              emulateTouch
              className="rounded-xl overflow-hidden"
              renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    className="hidden md:block absolute left-2 top-1/2 transform -translate-y-1/2 bg-base-pink bg-opacity-50 text-white px-4 py-2 rounded-full shadow-md z-10 hover:bg-opacity-100 transition"
                  >
                    ‹
                  </button>
                )
              }
              renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    className="hidden md:block absolute right-2 top-1/2 transform -translate-y-1/2 bg-base-pink bg-opacity-50 text-white px-4 py-2 rounded-full shadow-md z-10 hover:bg-opacity-100 transition"
                  >
                    ›
                  </button>
                )
              }
            >
              {newsItem.images.map((img, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center h-[20rem] md:h-[28rem]"
                >
                  <img
                    src={img}
                    alt={`News ${index + 1} Image ${i + 1}`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
