import React from "react";
import HeadShotWithText from "../../components/headShotWithText/headShotWithText";
import DrMoulton from "../../assets/pictures/headshots/Dr_moulton.jpg";
import SaraFidanza from "../../assets/pictures/headshots/Sara_Fidanza.png";
import LilyWilliams from "../../assets/pictures/headshots/Lily_headshot.jpg";
import DevonHorton from "../../assets/pictures/headshots/Devon_headshot.png";
import MichaelPizzalato from "../../assets/pictures/headshots/Pizzalato_headshot.jpg";

const teamMembers = [
  {
    imageSrc: DrMoulton,
    name: "Steven L. Moulton, MD",
    role: "Professor of Surgery",
    bio: "Department of Surgery, University of Colorado School of Medicine and Children’s Hospital Colorado",
  },
  {
    imageSrc: DevonHorton,
    name: "Devon Horton, BS",
    role: "Senior Bioengineer",
    bio: "Department of Surgery, University of Colorado Anschutz Medical Campus",
  },
  {
    imageSrc: LilyWilliams,
    name: "Lily Williams, BS",
    role: "Bioengineer",
    bio: "Department of Surgery, University of Colorado Anschutz Medical Campus",
  },
  {
    imageSrc: SaraFidanza,
    name: "Sara Fidanza, CNS-BC, CPNP-PC",
    role: "Pediatric Nurse Practitioner",
    bio: "Department of GI, University of Colorado Anschutz Medical Campus",
  },
];

const Team = () => {
  return (
    <main className="bg-white dark:bg-gray-900 min-h-screen flex flex-col">
      <div className="px-4 py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Meet the Team
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            The passionate professionals behind Twistomy — dedicated to
            transforming ostomy care through innovation and compassion.
          </p>
        </div>
        <HeadShotWithText members={teamMembers} />
      </div>
    </main>
  );
};

export default Team;
