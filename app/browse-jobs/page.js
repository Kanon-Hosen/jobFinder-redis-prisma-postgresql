"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo, Suspense } from "react";
import {
  Search,
  Briefcase,
  Filter,
  Sparkles,
  TrendingUp,
  Users,
  Clock,
  Star,
  Zap,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import JobCard from "@/components/JobCard";

export default function BrowseJobs() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const location = searchParams.get("location") || "";

  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setSearchTerm(search);
  }, [search]);

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/jobs");
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    let filtered =
      filter === "All" ? jobs : jobs.filter((job) => job.type === filter);
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(term) ||
          job.description.toLowerCase().includes(term)
      );
    }
    if (location.trim() !== "") {
      const loc = location.toLowerCase();
      filtered = filtered.filter((job) =>
        job.location?.toLowerCase().includes(loc)
      );
    }
    return filtered.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [jobs, filter, searchTerm, location]);

  const filterOptions = [
    { type: "All", icon: "", count: jobs.length },
    {
      type: "Full-time",
      icon: "",
      count: jobs.filter((j) => j.type === "Full-time").length,
    },
    {
      type: "Remote",
      icon: "",
      count: jobs.filter((j) => j.workSetting === "Remote").length,
    },
    {
      type: "Part-time",
      icon: "",
      count: jobs.filter((j) => j.type === "Part-time").length,
    },
    {
      type: "Contract",
      icon: "",
      count: jobs.filter((j) => j.type === "Contract").length,
    },
    {
      type: "Internship",
      icon: "",
      count: jobs.filter((j) => j.type === "Internship").length,
    },
  ];

  return (
    <Suspense>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
        {/* Unique Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-6 py-20">
            <div className="text-center max-w-4xl mx-auto">
              {/* Floating Stats */}
              <div className="flex justify-center items-center gap-8 mb-8">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <TrendingUp className="w-4 h-4 text-yellow-300" />
                  <span className="text-white text-sm font-medium">
                    {jobs.length}+ Live Jobs
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <Users className="w-4 h-4 text-green-300" />
                  <span className="text-white text-sm font-medium">
                    500+ Companies
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <Zap className="w-4 h-4 text-orange-300" />
                  <span className="text-white text-sm font-medium">
                    Updated Daily
                  </span>
                </div>
              </div>

              <h1 className="text-5xl w-full md:text-6xl font-black text-white mb-6 leading-tight">
                Discover Your
                <span className="block bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  Dream Career
                </span>
              </h1>

              <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Explore thousands of opportunities from innovative companies
                worldwide. Your perfect job is waiting for you.
              </p>

              {/* Live Search Stats */}
              <div className="flex justify-center items-center gap-6 text-emerald-200 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Live Updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm font-medium">
                    Verified Companies
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-300" />
                  <span className="text-sm font-medium">
                    Real-time Matching
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Wave Bottom */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" className="w-full h-20 fill-slate-50">
              <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
            </svg>
          </div>
        </div>

        <div className="max-w-7xl  mx-auto px-6 -mt-16 relative z-10">
          {/* Enhanced Search Section */}
          <Card className="mb-12  shadow-md border-0 bg-white/95 backdrop-blur-xl">
            <CardContent className="p-8">
              {/* Advanced Search Bar */}
              <div className="relative mb-8">
                <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search className="h-6 w-6" />
                </div>
                <Input
                  type="text"
                  placeholder="Search by title, company, skills, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-16 h-16 text-lg border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:border-emerald-300 transition-all duration-300 rounded-2xl shadow-sm"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  <Badge className="bg-emerald-100  text-emerald-700 border-0">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI Powered
                  </Badge>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-xl px-6 shadow-lg"
                  >
                    Search
                  </Button>
                </div>
              </div>

              {/* Smart Filters */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Filter className="h-5 w-5 text-emerald-600" />
                  </div>
                  <span className="text-lg font-semibold text-gray-800">
                    Smart Filters
                  </span>
                  <Badge className="bg-orange-100 text-orange-700 border-0 text-xs">
                    Real-time
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {filterOptions.map(({ type, icon, count }) => (
                    <Button
                      key={type}
                      onClick={() => setFilter(type)}
                      variant={filter === type ? "default" : "outline"}
                      className={`h-16 flex flex-col items-center justify-center gap-1 transition-all duration-300 transform hover:scale-105 rounded-2xl ${
                        filter === type
                          ? "bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-lg"
                          : "hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span className="text-lg">{icon}</span>
                      <span className="text-xs font-medium">{type}</span>
                      <span className="text-xs opacity-75">({count})</span>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="relative mb-8">
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-emerald-200"></div>
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-emerald-600 border-t-transparent absolute top-0"></div>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-700 mb-2">
                  Finding perfect matches...
                </p>
                <p className="text-gray-500">
                  Our AI is searching through thousands of opportunities
                </p>
              </div>
            </div>
          ) : error ? (
            <Card className="text-center py-16 bg-red-50 border-red-200 shadow-lg">
              <CardContent>
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">😞</span>
                </div>
                <h3 className="text-xl font-semibold text-red-800 mb-2">
                  Oops! Something went wrong
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
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  No matches found
                </h3>
                <p className="text-gray-600 text-lg mb-3">
                  We couldn`&apos;`t find any jobs matching your criteria.
                </p>
                <p className="text-gray-500 mb-8">
                  Try adjusting your search terms or filters to discover more
                  opportunities.
                </p>
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setFilter("All");
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Clear Filters
                  </Button>
                  <Button variant="outline">Browse All Jobs</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Enhanced Results Header */}
              <div className="mb-8 p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="md:flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {filteredJobs.length} opportunities found
                    </h2>
                    <p className="text-gray-600">
                      Showing {filter !== "All" ? filter.toLowerCase() : "all"}{" "}
                      positions
                      {searchTerm && (
                        <span>
                          {" "}
                          matching `&quot;`
                          <span className="font-semibold text-gray-900">
                            {searchTerm}
                          </span>
                          `&quot;`
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Live results</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full bg-transparent"
                    >
                      Sort by relevance
                    </Button>
                  </div>
                </div>
              </div>

              {/* Jobs Grid with Animation */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
                {filteredJobs.map((job, index) => (
                  <div
                    key={job.id || index}
                    className="transform hover:scale-105 transition-all duration-300"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: "fadeInUp 0.6s ease-out forwards",
                    }}
                  >
                    <JobCard job={job} />
                  </div>
                ))}
              </div>

              {/* Load More Section */}
              <div className="text-center py-16">
                <div className="inline-flex flex-col items-center gap-6 bg-white rounded-3xl px-12 py-8 shadow-xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    <Sparkles className="w-6 h-6 text-emerald-600" />
                    <span className="text-xl font-semibold text-gray-800">
                      Want to see more opportunities?
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      Load More Jobs
                    </Button>
                    <Button
                      variant="outline"
                      className="border-2 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 px-8 py-3 rounded-2xl bg-transparent"
                    >
                      Set Job Alert
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

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
    </Suspense>
  );
}
