"use client";
import { useEffect, useState, useMemo } from "react";
import {
  Briefcase,
  Clock,
  Filter,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import JobCard from "@/components/JobCard";

export default function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMyJobs() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/my-jobs");
        if (!res.ok) throw new Error("Failed to fetch your jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchMyJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    let filtered =
      filter === "All" ? jobs : jobs.filter((job) => job.type === filter);
    return filtered.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [jobs, filter]);

  const filterOptions = [
    "All",
    "Full-time",
    "Remote",
    "Part-time",
    "Contract",
    "Internship",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-white mb-4">
            Your Posted Jobs
          </h1>
          <p className="text-indigo-100 text-lg">
            Manage and track your job listings in one place.
          </p>
        </div>
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-16 left-20 w-64 h-64 bg-white/10 blur-3xl rounded-full animate-pulse" />
          <div className="absolute bottom-10 right-16 w-80 h-80 bg-white/10 blur-3xl rounded-full animate-pulse delay-1000" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
        <Card className="mb-12 shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Filter className="h-5 w-5 text-indigo-600" />
              <span className="text-lg font-semibold text-gray-800">
                Filter by Job Type
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {filterOptions.map((type) => (
                <Button
                  key={type}
                  onClick={() => setFilter(type)}
                  variant={filter === type ? "default" : "outline"}
                  className={`h-16 flex flex-col items-center justify-center gap-1 transition-all duration-300 transform hover:scale-105 rounded-2xl ${
                    filter === type
                      ? "bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-lg"
                      : "hover:bg-gray-50 border-2 border-gray-200"
                  }`}
                >
                  <span className="text-xs font-medium">{type}</span>
                  <span className="text-xs opacity-75">
                    (
                    {
                      jobs.filter((j) => type === "All" || j.type === type)
                        .length
                    }
                    )
                  </span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Loading / Error / Results */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin h-16 w-16 border-4 border-indigo-300 border-t-transparent mx-auto rounded-full mb-6" />
            <p className="text-lg font-semibold text-gray-700">
              Loading your jobs...
            </p>
          </div>
        ) : error ? (
          <Card className="text-center py-16 bg-red-50 border-red-200 shadow-lg">
            <CardContent>
              <div className="text-3xl mb-4">😞</div>
              <h3 className="text-xl font-semibold text-red-800 mb-2">
                Error loading jobs
              </h3>
              <p className="text-red-600">{error}</p>
            </CardContent>
          </Card>
        ) : filteredJobs.length === 0 ? (
          <Card className="text-center py-20 bg-gray-50 border border-gray-200 shadow-md">
            <CardContent>
              <Briefcase className="w-12 h-12 text-gray-400 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No Jobs Found
              </h3>
              <p className="text-gray-600">You haven't posted any jobs yet.</p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-8 p-6 bg-white rounded-2xl shadow-md border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {filteredJobs.length} Job
                {filteredJobs.length > 1 ? "s" : ""} Found
              </h2>
              <p className="text-gray-600">
                Showing{" "}
                <span className="font-semibold text-indigo-600">{filter}</span>{" "}
                jobs posted by you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
