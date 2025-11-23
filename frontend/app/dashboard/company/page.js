export default function CompanyDashboard() {
  const items = [
    {
      title: "Post a Job",
      desc: "Create and publish new job openings for applicants.",
      link: "/dashboard/company/post-job",
    },
    {
      title: "Manage Jobs",
      desc: "View, edit or delete all jobs posted by your company.",
      link: "/dashboard/company/manage-jobs",
    },
    {
      title: "Company Profile",
      desc: "Update company logo, description and contact information.",
      link: "/profile",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Company Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition block"
          >
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-600">{item.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
