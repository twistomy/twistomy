import React, { useState } from "react";
import PropTypes from "prop-types";

const HeadShotWithText = ({ members }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleClick = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-12 px-6 md:px-16 bg-white dark:bg-gray-900 rounded-lg">
      <div className="flex flex-wrap justify-center gap-10">
        {members.map((member, index) => {
          const isExpanded = expandedIndex === index;

          return (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className="relative w-full sm:w-[280px] md:w-[300px] h-full cursor-pointer bg-white dark:bg-gray-800 border-base-pink-lightest dark:border-base-pink-dark border-2 p-6 rounded-lg min-h-[320px] group overflow-hidden"
            >
              <img
                src={member.imageSrc}
                alt={member.name}
                className={`absolute transition-all duration-300 ease-in-out object-cover ${
                  isExpanded
                    ? "top-0 left-0 w-full h-full z-10 rounded-none"
                    : "w-24 h-24 rounded-full z-10 group-hover:scale-105 top-6 left-1/2 -translate-x-1/2"
                }`}
              />

              {/* Content fades when expanded */}
              <div
                className={`relative z-20 transition-opacity duration-300 ${
                  isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                <div className="mt-28 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-base-pink mb-2">
                    {member.role}
                  </p>
                  {member.bio && (
                    <p className="text-sm text-gray-700 dark:text-gray-400 mt-2">
                      {member.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

HeadShotWithText.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      imageSrc: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      bio: PropTypes.string,
    })
  ).isRequired,
};

export default HeadShotWithText;
