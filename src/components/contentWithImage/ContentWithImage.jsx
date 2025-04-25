import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { motion, useAnimation, useInView } from "framer-motion";

const ContentWithImage = ({
  imageSrc,
  imageAlt = "",
  imageOnLeft = false,
  content = [],
  containerStyle = "",
  imageStyle = "",
  textStyle = "",
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const imageControls = useAnimation();
  const textControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      if (imageSrc) {
        imageControls.start({
          x: 0,
          opacity: 1,
          transition: { duration: 0.8 },
        });
      }
      textControls.start({ x: 0, opacity: 1, transition: { duration: 0.8 } });
    }
  }, [isInView]);

  const renderContent = () =>
    content.map((item, index) => {
      switch (item.type) {
        case "header":
          return (
            <h2
              key={index}
              className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight text-gray-900 dark:text-white"
            >
              {item.text}
            </h2>
          );
        case "subheader":
          return (
            <h3
              key={index}
              className="text-xl md:text-2xl font-semibold mb-3 leading-snug text-gray-800 dark:text-gray-200"
            >
              {item.text}
            </h3>
          );
        case "paragraph":
          return (
            <p
              key={index}
              className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed"
            >
              {item.text}
            </p>
          );
        default:
          return null;
      }
    });

  const imageInitial = { x: imageOnLeft ? "100vw" : "-100vw", opacity: 0 };
  const textInitial = { x: imageOnLeft ? "-100vw" : "100vw", opacity: 0 };

  return (
    <section
      ref={ref}
      className={`py-20 px-6 md:px-16 bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden ${containerStyle}`}
    >
      <div
        className={`flex flex-col md:flex-row items-center justify-between gap-10 md:gap-14 ${
          imageOnLeft ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Conditionally render image block */}
        {imageSrc && (
          <motion.div
            initial={imageInitial}
            animate={imageControls}
            className="w-full md:w-[44%]"
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              className={`w-full object-cover rounded-2xl ${imageStyle}`}
            />
          </motion.div>
        )}

        {/* Text Box */}
        <motion.div
          initial={textInitial}
          animate={textControls}
          className={`w-full ${
            imageSrc ? "md:w-[48%]" : "md:w-full"
          } ${textStyle}`}
        >
          <div className="bg-[#F5F5F5] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 transition-colors duration-300">
            {renderContent()}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContentWithImage;

ContentWithImage.propTypes = {
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  imageOnLeft: PropTypes.bool,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(["header", "subheader", "paragraph"]).isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  containerStyle: PropTypes.string,
  imageStyle: PropTypes.string,
  textStyle: PropTypes.string,
};
