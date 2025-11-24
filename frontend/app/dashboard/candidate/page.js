"use client";

import Link from "next/link";
import {
  FileText,
  Search,
  Calendar,
  Bookmark,
  ClipboardList,
  Briefcase,
  User,
} from "lucide-react";

export default function CandidateDashboard() {
  // Dummy Data (replace later with API)
  const stats = [
    { label: "Total Applications", value: 12, icon: <FileText size={26} /> },
    { label: "In Review", value: 4, icon: <Search size={26} /> },
    { label: "Interviews Scheduled", value: 2, icon: <Calendar size={26} /> },
    { label: "Saved Jobs", value: 8, icon: <Bookmark size={26} /> },
  ];

  const cards = [
    {
      title: "My Applications",
      desc: "View all jobs you applied for and track your status.",
      href: "/dashboard/candidate/applications",
      icon: <ClipboardList size={32} />,
    },
    {
      title: "Browse Jobs",
      desc: "Find new opportunities and apply easily.",
      href: "/jobs",
      icon: <Briefcase size={32} />,
    },
    {
      title: "My Profile",
      desc: "Update bio, resume, and personal information.",
      href: "/profile",
      icon: <User size={32} />,
    },
  ];

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">Candidate Dashboard</h1>

      {/* QUICK STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 shadow bg-white hover:shadow-md transition flex items-center gap-3"
          >
            <div className="text-blue-600">{item.icon}</div>

            <div>
              <p className="text-sm text-gray-600">{item.label}</p>
              <h2 className="text-2xl font-bold mt-1">{item.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN NAV CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <Link
            key={i}
            href={card.href}
            className="border p-6 rounded-xl shadow hover:bg-gray-100 transition flex gap-4 items-start"
          >
            <div className="text-blue-600">{card.icon}</div>

            <div>
              <h2 className="text-xl font-bold">{card.title}</h2>
              <p className="text-gray-600 mt-2">{card.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
