import React from 'react';
import PropTypes from 'prop-types';

const HeadShotWithText = ({ members }) => {
  return (
    <section className="py-12 px-6 md:px-16 bg-white dark:bg-[#0f172a] transition-colors duration-300">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-10 text-center">
          Meet The Team
        </h2>
      <div className="flex flex-wrap justify-center gap-10">
        {members.map((member, index) => (
          <div
            key={index}
            className="w-full sm:w-[280px] md:w-[300px] h-full flex flex-col items-center text-center bg-gray-100 dark:bg-gray-800 p-6 rounded-lg min-h-[320px] transition-colors duration-300"
          >
            <img
              src={member.imageSrc}
              alt={member.name}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <div className="flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {member.role}
                </p>
              </div>
              {member.bio && (
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  {member.bio}
                </p>
              )}
            </div>
          </div>
        ))}
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
