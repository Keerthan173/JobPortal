'use client';

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";


export default function HRDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    pendingApplications: 0
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setStats({
          totalJobs: 24,
          activeJobs: 15,
          totalApplications: 156,
          pendingApplications: 42
        });

        setRecentJobs([
          { id: 1, title: 'Senior React Developer', location: 'Bangalore', applicants: 23, status: 'Active', postedDate: '2025-10-01' },
          { id: 2, title: 'UI/UX Designer', location: 'Mumbai', applicants: 15, status: 'Active', postedDate: '2025-09-28' },
          { id: 3, title: 'Product Manager', location: 'Delhi', applicants: 31, status: 'Closed', postedDate: '2025-09-25' },
          { id: 4, title: 'Backend Developer', location: 'Hyderabad', applicants: 18, status: 'Active', postedDate: '2025-09-20' },
        ]);

        setRecentApplications([
          { id: 1, candidate: 'Rahul Sharma', job: 'Senior React Developer', status: 'Pending', appliedDate: '2025-10-04' },
          { id: 2, candidate: 'Priya Patel', job: 'UI/UX Designer', status: 'Reviewed', appliedDate: '2025-10-03' },
          { id: 3, candidate: 'Amit Kumar', job: 'Backend Developer', status: 'Pending', appliedDate: '2025-10-03' },
          { id: 4, candidate: 'Sneha Reddy', job: 'Product Manager', status: 'Shortlisted', appliedDate: '2025-10-02' },
          { id: 5, candidate: 'Vikram Singh', job: 'Senior React Developer', status: 'Pending', appliedDate: '2025-10-01' },
        ]);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'closed': return 'bg-red-500/20 text-red-400 border-red-500';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'reviewed': return 'bg-blue-500/20 text-blue-400 border-blue-500';
      case 'shortlisted': return 'bg-purple-500/20 text-purple-400 border-purple-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-400 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">HR Dashboard</h1>
          <p className="text-gray-400 text-sm">Manage your job postings and applications</p>
        </div>

        {/* Stats Cards - Compact Design */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-blue-500 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs mb-1">Total Jobs</p>
                <h3 className="text-2xl font-bold text-white">{stats.totalJobs}</h3>
              </div>
              <div className="text-3xl opacity-80">💼</div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-green-500 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs mb-1">Active</p>
                <h3 className="text-2xl font-bold text-green-400">{stats.activeJobs}</h3>
              </div>
              <div className="text-3xl opacity-80">✅</div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-purple-500 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs mb-1">Applications</p>
                <h3 className="text-2xl font-bold text-purple-400">{stats.totalApplications}</h3>
              </div>
              <div className="text-3xl opacity-80">📝</div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-yellow-500 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs mb-1">Pending</p>
                <h3 className="text-2xl font-bold text-yellow-400">{stats.pendingApplications}</h3>
              </div>
              <div className="text-3xl opacity-80">⏳</div>
            </div>
          </div>
        </div>

        {/* Quick Actions - Compact */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mb-6">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {/* Post Job */}
            <button
              onClick={() => router.push("/hr-dashboard/post-job")}
              className="flex-1 min-w-[140px] bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition shadow-lg shadow-blue-500/30 flex items-center justify-center"
            >
              <span className="mr-1.5">➕</span> Post Job
            </button>

            {/* Applications */}
            <button
              onClick={() => router.push("/hr-dashboard/applications")}
              className="flex-1 min-w-[140px] bg-gray-700 hover:bg-gray-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition border border-gray-600 flex items-center justify-center"
            >
              <span className="mr-1.5">👥</span> Applications
            </button>

            {/* Analytics */}
            {/* <button
              onClick={() => router.push("/hr-dashboard/analytics")}
              className="flex-1 min-w-[140px] bg-gray-700 hover:bg-gray-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition border border-gray-600 flex items-center justify-center"
            >
              <span className="mr-1.5">📊</span> Analytics
            </button> */}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Recent Jobs - Compact */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Recent Jobs</h2>
              <button className="text-blue-400 hover:text-blue-300 text-xs font-medium transition">
                View All →
              </button>
            </div>
            <div className="divide-y divide-gray-700">
              {recentJobs.map((job) => (
                <div key={job.id} className="p-4 hover:bg-gray-700/30 transition cursor-pointer">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium text-sm truncate">{job.title}</h3>
                      <p className="text-gray-400 text-xs mt-1">📍 {job.location}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-blue-400 text-xs font-medium">
                      {job.applicants} applicants
                    </span>
                    <span className="text-gray-500 text-xs">
                      {new Date(job.postedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Applications - Compact */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Recent Applications</h2>
              <button className="text-blue-400 hover:text-blue-300 text-xs font-medium transition">
                View All →
              </button>
            </div>
            <div className="divide-y divide-gray-700">
              {recentApplications.map((app) => (
                <div key={app.id} className="p-4 hover:bg-gray-700/30 transition cursor-pointer">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium text-sm">{app.candidate}</h3>
                      <p className="text-gray-400 text-xs mt-1 truncate">{app.job}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-gray-500 text-xs">
                      {new Date(app.appliedDate).toLocaleDateString()}
                    </span>
                    <button className="text-blue-400 hover:text-blue-300 text-xs font-medium transition">
                      Review →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
