"use client";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Clock,
  Filter,
  TrendingUp,
  Users,
  Zap,
  Edit,
  Trash2,
  Eye,
  MapPin,
  Calendar,
  CheckCircle,
  AlertCircle,
  XCircle,
  Target,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import useCurrentUser from "@/hooks/useCurrentUser";
import Link from "next/link";
import Loading from "@/components/Loading";

export default function MyJobs() {
  const router = useRouter();
  const { user, loading: userLoading } = useCurrentUser();
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userLoading) {
      if (!user?.email || user?.role !== "EMPLOYER") {
        router.push("/login");
      }
    }
  }, [user, userLoading, router]);

  useEffect(() => {
    async function fetchMyJobs() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/my-jobs", {
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    if (user?.email) {
      fetchMyJobs();
    }
  }, [user, userLoading]);

  const filteredJobs = useMemo(() => {
    let filtered = jobs;
    if (filter !== "All") {
      filtered = jobs.filter(
        (job) => job.type === filter || job.workSetting === filter
      );
    }
    return filtered.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [jobs, filter]);

  const filterOptions = [
    { type: "All", count: jobs.length },
    {
      type: "Full-time",
      count: jobs.filter((j) => j.type === "Full-time").length,
    },
    {
      type: "Part-time",
      count: jobs.filter((j) => j.type === "Part-time").length,
    },
    {
      type: "Contract",
      count: jobs.filter((j) => j.type === "Contract").length,
    },
    {
      type: "Internship",
      count: jobs.filter((j) => j.type === "Internship").length,
    },
    {
      type: "Remote",
      count: jobs.filter((j) => j.workSetting === "Remote").length,
    },
    {
      type: "Hybrid",
      count: jobs.filter((j) => j.workSetting === "Hybrid").length,
    },
  ];

  const handleDelete = async (id) => {
    if (
      !confirm(
        "Are you sure you want to delete this job? This action cannot be undone."
      )
    )
      return;

    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setJobs((prev) => prev.filter((job) => job.id !== id));
      } else {
        alert("Failed to delete the job.");
      }
    } catch (err) {
      alert("An error occurred while deleting the job.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatSalary = (salary) => {
    if (!salary) return "Not specified";
    // Handle if salary is already formatted or just a number
    const numericSalary = salary.toString().replace(/[^0-9]/g, "");
    if (numericSalary) {
      return `$${Number(numericSalary).toLocaleString()}`;
    }
    return salary;
  };

  const isDeadlinePassed = (deadline) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  if (userLoading || loading) {
    return (
    <Loading/>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Enhanced Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto md:px-6 px-2 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Floating Badge */}
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-8">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 bg-purple-400 rounded-full border-2 border-white"></div>
                <div className="w-6 h-6 bg-indigo-400 rounded-full border-2 border-white"></div>
                <div className="w-6 h-6 bg-blue-400 rounded-full border-2 border-white"></div>
              </div>
              <span className="text-white font-medium">My Job Listings</span>
              <Briefcase className="w-4 h-4 text-white" />
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Manage Your
              <span className="block bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent">
                Job Listings
              </span>
            </h1>

            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Track applications, manage candidates, and grow your team with
              powerful hiring tools.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="group bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:bg-white/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-3xl font-bold text-white">
                    {jobs.length}
                  </div>
                  <Briefcase className="w-6 h-6 text-purple-200 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-purple-100 text-sm font-medium">
                  Total Jobs
                </div>
              </div>
              <div className="group bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:bg-white/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-3xl font-bold text-white">
                    {jobs.reduce(
                      (total, job) => total + (job.applies?.length || 0),
                      0
                    )}
                  </div>
                  <Users className="w-6 h-6 text-blue-300 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-purple-100 text-sm font-medium">
                  Total Applications
                </div>
              </div>
              <div className="group bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:bg-white/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-3xl font-bold text-white">
                    {
                      jobs.filter(
                        (job) =>
                          new Date() - new Date(job.createdAt) <
                          7 * 24 * 60 * 60 * 1000
                      ).length
                    }
                  </div>
                  <Zap className="w-6 h-6 text-yellow-300 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-purple-100 text-sm font-medium">
                  New This Week
                </div>
              </div>
              <div className="group bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:bg-white/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-3xl font-bold text-white">
                    {
                      jobs.filter((job) => (job.applies?.length || 0) > 0)
                        .length
                    }
                  </div>
                  <TrendingUp className="w-6 h-6 text-green-300 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-purple-100 text-sm font-medium">
                  Active Jobs
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-20 fill-slate-50">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Enhanced Filter Section */}
          <Card className="mb-8 bg-white/95 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Filter className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-xl font-bold text-gray-900">
                  Filter by Job Type & Work Setting
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {filterOptions.map(({ type, count }) => (
                  <Button
                    key={type}
                    onClick={() => setFilter(type)}
                    variant={filter === type ? "default" : "outline"}
                    className={`h-16 flex flex-col items-center justify-center gap-1 transition-all duration-300 transform hover:scale-105 rounded-2xl ${
                      filter === type
                        ? "bg-gradient-to-br from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white border-0 shadow-lg"
                        : "hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-sm font-medium">{type}</span>
                    <span className="text-xs opacity-75">({count})</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {error ? (
            <Card className="text-center py-16 bg-red-50 border-red-200 shadow-lg">
              <CardContent>
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">😞</span>
                </div>
                <h3 className="text-xl font-semibold text-red-800 mb-2">
                  Error loading jobs
                </h3>
                <p className="text-red-600">{error}</p>
              </CardContent>
            </Card>
          ) : filteredJobs.length === 0 ? (
            <Card className="text-center py-20 bg-gradient-to-br from-gray-50 to-slate-100 border-0 shadow-xl">
              <CardContent>
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Briefcase className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {jobs.length === 0
                    ? "No jobs posted yet"
                    : "No matching jobs"}
                </h3>
                <p className="text-gray-600 text-lg mb-8">
                  {jobs.length === 0
                    ? "Start building your team by posting your first job opportunity."
                    : "Try adjusting your filters to see more results."}
                </p>
                <div className="flex justify-center gap-4">
                  {jobs.length === 0 ? (
                    <Link
                      href="/post-job"
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-8 py-3 rounded-xl"
                    >
                      Post Your First Job
                    </Link>
                  ) : (
                    <Button
                      onClick={() => setFilter("All")}
                      variant="outline"
                      className="px-8 py-3 rounded-xl border-2"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Results Header */}
              <div className="mb-8 p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      <span className="text-purple-600">
                        {filteredJobs.length}
                      </span>{" "}
                      job
                      {filteredJobs.length !== 1 ? "s" : ""} found
                    </h2>
                    <p className="text-gray-600">
                      Showing {filter !== "All" ? filter.toLowerCase() : "all"}{" "}
                      positions you&apos;ve posted
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link
                      href="/post-job"
                      className="bg-gradient-to-r text-white font-semibold py-2 from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl px-6 shadow-lg"
                    >
                      Post New Job
                    </Link>
                  </div>
                </div>
              </div>

              {/* Enhanced Jobs Table */}
              <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        <th className="px-2 py-2 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                          Job Details
                        </th>
                        <th className="px-2 py-2 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                          Type & Setting
                        </th>
                        <th className="px-2 py-2 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                          Posted / Deadline
                        </th>
                        <th className="px-2 py-2 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                          Applications
                        </th>
                        <th className="px-2 py-2 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredJobs.map((job, index) => (
                        <tr
                          key={job.id}
                          className="hover:bg-gray-50 transition-colors duration-200 group"
                          style={{
                            animationDelay: `${index * 100}ms`,
                            animation: "fadeInUp 0.6s ease-out forwards",
                          }}
                        >
                          <td className="px-2 py-2">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                                {job.title?.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                                  {job.title}
                                </h3>
                                <p className="text-gray-600 font-medium">
                                  {job.company}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  {job.salary && (
                                    <p className="text-sm text-emerald-600 font-semibold">
                                      ${job.salary}
                                    </p>
                                  )}
                                  {job.experienceLevel && (
                                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                                      {job.experienceLevel}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-2 py-2">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Badge
                                  className={`px-3 py-1 text-sm font-semibold ${
                                    job.type === "Full-time"
                                      ? "bg-blue-100 text-blue-800 border-blue-200"
                                      : job.type === "Part-time"
                                      ? "bg-orange-100 text-orange-800 border-orange-200"
                                      : "bg-purple-100 text-purple-800 border-purple-200"
                                  }`}
                                >
                                  {job.type}
                                </Badge>
                                {job.workSetting && (
                                  <Badge
                                    className={`px-3 py-1 text-sm font-semibold ${
                                      job.workSetting === "Remote"
                                        ? "bg-green-100 text-green-800 border-green-200"
                                        : job.workSetting === "Hybrid"
                                        ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                        : "bg-gray-100 text-gray-800 border-gray-200"
                                    }`}
                                  >
                                    {job.workSetting}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <MapPin className="w-4 h-4" />
                                {job.location}
                              </div>
                            </div>
                          </td>
                          <td className="px-2 py-2">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar className="w-4 h-4" />
                                {formatDate(job.createdAt)}
                              </div>
                              {job.applicationDeadline && (
                                <div
                                  className={`flex items-center gap-2 text-sm ${
                                    isDeadlinePassed(job.applicationDeadline)
                                      ? "text-red-600"
                                      : "text-orange-600"
                                  }`}
                                >
                                  <Target className="w-4 h-4" />
                                  Deadline:{" "}
                                  {formatDate(job.applicationDeadline)}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-2 py-2">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-gray-400" />
                                <span className="text-2xl font-bold text-gray-900">
                                  {job.applies?.length || 0}
                                </span>
                              </div>
                              {(job.applies?.length || 0) > 0 && (
                                <Badge className="bg-orange-100 text-orange-800 border-orange-200 text-xs">
                                  {(job.applies?.length || 0) > 10
                                    ? "High Interest"
                                    : "Active"}
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="px-2 py-2">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 rounded-lg bg-transparent"
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              <Link
                                href={`/my-jobs/applications/${job.id}`}
                                variant="outline"
                                className="border-2 flex items-center gap-1 px-2 py-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 rounded-lg bg-transparent"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View({job.applies?.length || 0})
                              </Link>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(job.id)}
                                className="border-2 border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 rounded-lg"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </>
          )}
        </div>
      </section>

      {/* Applications Modal */}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
