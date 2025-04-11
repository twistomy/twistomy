const Team = () => {
  const teamMembers = [
    { id: 1, name: "John Johnson", role: "Project Manager" },
    { id: 2, name: "Bob Bobbinson", role: "Frontend Developer" },
    { id: 3, name: "Charlie Charlison", role: "Backend Developer" },
    { id: 4, name: "Mary Maryson", role: "UI/UX Designer" },
  ];

  return (
    <main className="min-h-screen bg-white text-black p-5 text-center">
      <h1>Meet Our Team</h1>
      <div>
        {teamMembers.map((member) => (
          <div key={member.id} className="mb-4">
            <h2>{member.name}</h2>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Team;
