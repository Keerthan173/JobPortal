"use client";

import { useEffect, useState } from "react";
import {
  GraduationCap,
  Briefcase,
  Wrench,
  Linkedin,
  Globe,
  FileText,
  Mail,
  User,
} from "lucide-react";

export default function ApplicationDetails({ jobId, candidateId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!jobId || !candidateId) return;

    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `/api/applications/details?job_id=${jobId}&candidate_id=${candidateId}`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [jobId, candidateId]);

  if (loading) {
    return (
      <div className="mt-6 p-6 border rounded-lg bg-gray-50 animate-pulse">
        Loading candidate details...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mt-6 p-6 border rounded-lg bg-red-50 text-red-600">
        No candidate data found
      </div>
    );
  }

  return (
    <div className="mt-6 max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
      {/* HEADER */}
      <div className="flex items-center gap-3 border-b pb-4 mb-5">
        <User className="text-blue-600" />
        <h2 className="text-2xl font-bold">{data.name}</h2>
      </div>

      {/* INFO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InfoItem icon={<GraduationCap />} label="Education" value={data.education} />
        <InfoItem icon={<Briefcase />} label="Experience" value={data.experience} />
        <InfoItem icon={<Wrench />} label="Skills" value={data.skills} />
      </div>

      {/* LINKS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        {data.linkedin && (
          <LinkItem
            icon={<Linkedin />}
            label="LinkedIn"
            href={data.linkedin}
          />
        )}

        {data.portfolio && (
          <LinkItem
            icon={<Globe />}
            label="Portfolio"
            href={data.portfolio}
          />
        )}

        {data.resume_url && (
          <LinkItem
            icon={<FileText />}
            label="Resume"
            href={data.resume_url}
            text="View Resume"
          />
        )}
      </div>

      {/* COVER LETTER */}
      {data.cover_letter && (
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-2 font-semibold">
            <Mail className="w-5 h-5" />
            Cover Letter
          </div>
          <p className="bg-gray-50 p-4 rounded-lg text-gray-700 whitespace-pre-line">
            {data.cover_letter}
          </p>
        </div>
      )}
    </div>
  );
}

/* Reusable Components */

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex gap-3 items-start bg-gray-50 p-4 rounded-lg">
      <span className="text-blue-600">{icon}</span>
      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-gray-700">{value || "—"}</p>
      </div>
    </div>
  );
}

function LinkItem({ icon, label, href, text }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-3 items-center bg-gray-50 p-4 rounded-lg hover:bg-blue-50 transition"
    >
      <span className="text-blue-600">{icon}</span>
      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-blue-600 underline">
          {text || href}
        </p>
      </div>
    </a>
  );
}
