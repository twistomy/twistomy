import React from "react";
import PropTypes from "prop-types";

const ContentWithImage = ({
  imageSrc,
  imageAlt = "",
  imageOnLeft = false,
  content = [], // array of objects: { type: 'header' | 'subheader' | 'paragraph', text: string }
  containerStyle = "",
  imageStyle = "",
  textStyle = "",
}) => {
  const renderContent = () =>
    content.map((item, index) => {
      switch (item.type) {
        case "header":
          return (
            <h2 key={index} className="text-4xl font-bold mb-4 leading-snug">
              {item.text}
            </h2>
          );
        case "subheader":
          return (
            <h3
              key={index}
              className="text-2xl font-semibold mb-3 leading-snug"
            >
              {item.text}
            </h3>
          );
        case "paragraph":
          return (
            <p
              key={index}
              className="text-lg text-gray-700 mb-4 leading-relaxed"
            >
              {item.text}
            </p>
          );
        default:
          return null;
      }
    });

  return (
    <section className={`py-16 px-6 md:px-12 bg-white ${containerStyle}`}>
      <div
        className={`flex flex-col ${
          imageOnLeft ? "md:flex-row-reverse" : "md:flex-row"
        } items-center justify-center md:space-x-8`}
      >
        {imageSrc && (
          <img
            src={imageSrc}
            alt={imageAlt}
            className={`w-full md:w-1/2 object-cover rounded-2xl shadow-lg mb-6 md:mb-0 ${imageStyle}`}
          />
        )}

        {content.length > 0 && (
          <div className={`max-w-xl text-center md:text-left ${textStyle}`}>
            {renderContent()}
          </div>
        )}
      </div>
    </section>
  );
};

export default ContentWithImage;

ContentWithImage.propTypes = {
  imageSrc: PropTypes.string.isRequired,
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
