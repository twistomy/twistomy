import React from 'react';
import HeadShotWithText from '../../components/headShotWithText/headShotWithText';
import TwistomyGenCapWafer from '../../assets/pictures/Twistomy_gen_cap_wafer.png'

const teamMembers = [
  {
    imageSrc: TwistomyGenCapWafer,
    name: 'Steven L. Moulton, MD',
    role: 'Professor of Surgery',
    bio: 'Department of Surgery, University of Colorado School of Medicine and Children’s Hospital Colorado',
  },
  {
    imageSrc: TwistomyGenCapWafer,
    name: 'Sara Fidanza, CNS-BC, CPNP-PC',
    role: 'Pediatric Nurse Practitioner',
    bio: 'Department of GI, University of Colorado Anschutz Medical Campus',
  },
  {
    imageSrc: TwistomyGenCapWafer,
    name: 'Lily Williams, BS',
    role: 'Bioengineer',
    bio: 'Department of Surgery, University of Colorado Anschutz Medical Campus',
  },
  {
    imageSrc: TwistomyGenCapWafer,
    name: 'Devon Horton, BS',
    role: 'Senior Bioengineer',
    bio: 'Department of Surgery, University of Colorado Anschutz Medical Campus',
  },
  {
    imageSrc: TwistomyGenCapWafer,
    name: 'Michael Pizzalato, MBA, MS',
    role: 'Financial Consultant',
    bio: '',
  },
];

const Team = () => {
  return (
    <div>
      <HeadShotWithText members={teamMembers} />
    </div>
  );
};

export default Team;
