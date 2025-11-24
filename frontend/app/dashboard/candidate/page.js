"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  Search,
  Calendar,
  ClipboardList,
  Briefcase,
  User,
} from "lucide-react";

export default function CandidateDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState([]);
  const [recentApps, setRecentApps] = useState([]);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch("/api/candidate/dashboard", {
          credentials: "include",
        });
        const data = await res.json();

        // Quick Stats
        setStats([
          {
            label: "Total Applications",
            value: data.overview?.total_applications || 0,
            icon: <FileText size={26} />,
            url: "candidate/applications",
          },
          {
            label: "Pending",
            value: data.statusSummary?.pending || 0,
            icon: <Search size={26} />,
            url: "candidate/applications",
          },
          {
            label: "Reviewed",
            value: data.statusSummary?.reviewed || 0,
            icon: <Calendar size={26} />,
            url: "candidate/applications",
          },
          {
            label: "Accepted",
            value: data.statusSummary?.accepted || 0,
            icon: <ClipboardList size={26} />,
            url: "candidate/applications",
          },
        ]);

        setRecentApps(data.recentApplications || []);
        setProfile(data.profile || {});
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  if (loading) return <p className="p-6">Loading dashboard...</p>;

  const cards = [
    {
      title: "My Applications",
      desc: "View all jobs you applied for and track progress.",
      href: "/dashboard/candidate/applications",
      icon: <ClipboardList size={32} />,
    },
    {
      title: "Browse Jobs",
      desc: "Discover opportunities tailored to your skills.",
      href: "/jobs",
      icon: <Briefcase size={32} />,
    },
    {
      title: "My Profile",
      desc: "Update your bio, resume, and personal info.",
      href: "/profile",
      icon: <User size={32} />,
    },
  ];

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {profile.candidate_name || ""}
      </h1>

      {/* QUICK STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className="rounded-xl p-4 shadow bg-white border hover:shadow-lg transition cursor-pointer flex items-center gap-3"
            onClick={() => router.push(item.url)}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {cards.map((card, i) => (
          <Link
            key={i}
            href={card.href}
            className="border p-6 rounded-xl shadow bg-white hover:bg-gray-50 hover:shadow-md transition flex gap-4 items-start"
          >
            <div className="text-blue-600">{card.icon}</div>
            <div>
              <h2 className="text-xl font-bold">{card.title}</h2>
              <p className="text-gray-600 mt-2">{card.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* RECENT APPLICATIONS */}
      <h2 className="text-2xl font-bold mb-4">Recent Applications</h2>

      {recentApps.length === 0 ? (
        <p>No recent applications.</p>
      ) : (
        <div className="space-y-4">
          {recentApps.map((app) => (
            <div
              key={app.application_id}
              className="border p-4 rounded-lg bg-white shadow hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{app.job_title}</h3>
                  <p className="text-sm text-gray-600">
                    {app.company_name} • {app.location} • {app.job_type}
                  </p>
                  <p className="text-sm text-gray-500">
                    Applied on: {new Date(app.applied_at).toLocaleDateString()}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    app.status === "pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : app.status === "reviewed"
                      ? "bg-blue-200 text-blue-800"
                      : app.status === "accepted"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {app.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
