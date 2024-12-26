import ModuleCard from "./ModuleCard";


const ModuleListt = () => {
  const modules = [
    {
      name: "Module -2",
      description: "Introduction to Social Media Marketing",
      progress: 90,
    },
    {
      name: "Module -3",
      description: "Introduction to Advanced Marketing",
      progress: 75,
    },
  ];

  return (
    <div className="p-6 space-y-4 max-w-4xl mx-auto">
      {modules.map((module, index) => (
        <ModuleCard key={index} module={module} />
      ))}
    </div>
  );
};

export default ModuleListt;
