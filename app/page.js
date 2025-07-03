"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Search,
  Briefcase,
  Users,
  Building,
  TrendingUp,
  ArrowRight,
  MapPin,
  Clock,
  Star,
  Award,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function timeAgo(dateString) {
  const now = new Date();
  const postedDate = new Date(dateString);
  const diff = Math.floor((now - postedDate) / 1000);

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

const jobTypeColors = {
  "Full-time": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Part-time": "bg-blue-100 text-blue-800 border-blue-200",
  Contract: "bg-purple-100 text-purple-800 border-purple-200",
  Internship: "bg-orange-100 text-orange-800 border-orange-200",
};

const stats = [
  { icon: Briefcase, label: "Active Jobs", value: "12,000+" },
  { icon: Users, label: "Job Seekers", value: "50,000+" },
  { icon: Building, label: "Companies", value: "2,500+" },
  { icon: TrendingUp, label: "Success Rate", value: "95%" },
];

const categories = [
  {
    name: "Technology",
    count: "3,200+ jobs",
    color: "bg-blue-100 text-blue-800",
  },
  {
    name: "Marketing",
    count: "1,800+ jobs",
    color: "bg-green-100 text-green-800",
  },
  {
    name: "Design",
    count: "1,200+ jobs",
    color: "bg-purple-100 text-purple-800",
  },
  {
    name: "Sales",
    count: "2,100+ jobs",
    color: "bg-orange-100 text-orange-800",
  },
  { name: "Finance", count: "900+ jobs", color: "bg-red-100 text-red-800" },
  {
    name: "Healthcare",
    count: "1,500+ jobs",
    color: "bg-teal-100 text-teal-800",
  },
];

export default function HomePage() {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalJobs, setTotalJobs] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch("/api/jobs/");

        if (!res.ok) {
          console.error("API response not ok:", res.status, res.statusText);
          setFeaturedJobs([]);
          setTotalJobs(0);
          return;
        }

        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          console.error("Response is not JSON:", contentType);
          setFeaturedJobs([]);
          setTotalJobs(0);
          return;
        }

        const data = await res.json();
        if (Array.isArray(data)) {
          setFeaturedJobs(data.slice(0, 3));
          setTotalJobs(data.length);
        } else {
          console.error("Data is not an array:", data);
          setFeaturedJobs([]);
          setTotalJobs(0);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        setFeaturedJobs([]);
        setTotalJobs(0);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set("search", searchTerm.trim());
    if (location.trim()) params.set("location", location.trim());

    const queryString = params.toString();
    const url = queryString ? `/browse-jobs?${queryString}` : "/browse-jobs";
    window.location.href = url;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePopularSearch = (term) => {
    setSearchTerm(term);
    const params = new URLSearchParams();
    params.set("search", term);
    if (location.trim()) params.set("location", location.trim());

    const queryString = params.toString();
    window.location.href = `/browse-jobs?${queryString}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Compact Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-20 right-20 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-10 left-1/3 w-56 h-56 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-20 z-10">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-white text-sm font-medium">
                #1 Job Platform
              </span>
              <Award className="w-4 h-4 text-yellow-400" />
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Your Next
              <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Career Move
              </span>
              Starts Here
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-blue-100 mb-3 max-w-3xl mx-auto leading-relaxed font-light">
              Join over{" "}
              <span className="font-bold text-yellow-400">50,000+</span>{" "}
              professionals who found their dream jobs
            </p>
            <p className="text-base md:text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
              Connect with top companies • Remote & On-site • All experience
              levels
            </p>

            {/* Enhanced Search Bar */}
            <div className="max-w-3xl mx-auto mb-8">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-2 shadow-2xl border border-white/20">
                <div className="flex flex-col lg:flex-row gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Job title, skills, or company..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pl-12 h-12 border-0 bg-transparent text-gray-900 placeholder:text-gray-500 text-base font-medium focus:ring-0"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="City, state, or remote"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pl-12 h-12 border-0 bg-transparent text-gray-900 placeholder:text-gray-500 text-base font-medium focus:ring-0"
                    />
                  </div>
                  <Button
                    onClick={handleSearch}
                    className="h-12 px-8 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Find Jobs
                  </Button>
                </div>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="flex flex-wrap justify-center gap-2 text-blue-100 mb-8">
              <span className="text-blue-200 font-medium text-sm">
                Trending:
              </span>
              {[
                "Remote Developer",
                "Product Manager",
                "Data Scientist",
                "UX Designer",
                "Marketing Manager",
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => handlePopularSearch(term)}
                  className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-105 text-sm"
                >
                  {term}
                </button>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-blue-100">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="font-medium text-sm">Instant Matching</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-400" />
                <span className="font-medium text-sm">Verified Companies</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="font-medium text-sm">4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const value =
                stat.label === "Active Jobs" && totalJobs > 0
                  ? `${totalJobs}+`
                  : stat.value;
              return (
                <Card
                  key={index}
                  className="text-center p-6 bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <CardContent className="p-0">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {value}
                    </h3>
                    <p className="text-gray-600 font-medium">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hand-picked jobs from top companies looking for talent like you
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-4 text-gray-600">
                Loading featured jobs...
              </span>
            </div>
          ) : featuredJobs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {featuredJobs.map((job) => (
                  <Card
                    key={job.id}
                    className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-105"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {job.title?.charAt(0)?.toUpperCase() || "J"}
                        </div>
                        <Badge
                          className={`${
                            jobTypeColors[job.type] ||
                            "bg-gray-100 text-gray-800"
                          } border font-medium`}
                        >
                          {job.type || "Full-time"}
                        </Badge>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {job.title || "Job Title"}
                      </h3>
                      <p className="text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                        {job.description || "Job description not available"}
                      </p>

                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location || "Location not specified"}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-sm text-gray-500 font-medium">
                          {job.applies?.length || 0} applicants
                        </span>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {job.createAt
                            ? timeAgo(job.createAt)
                            : "Recently posted"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Link href="/browse-jobs">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    Explore All Jobs
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <Card className="text-center py-12 bg-white/90 backdrop-blur-sm">
              <CardContent>
                <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">
                  No featured jobs available at the moment.
                </p>
                <p className="text-gray-400 mb-6">
                  Be the first to post an opportunity!
                </p>
                <Link href="/post-job">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-semibold">
                    Post the First Job
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find opportunities in your field of expertise
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-105"
              >
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <Badge className={`${category.color} border-0 font-medium`}>
                    {category.count}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have found their dream jobs
            through our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Get Started Free
              </Button>
            </Link>
            <Link href="/browse-jobs">
              <Button
                variant="outline"
                className="border-white text-black hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Browse Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">JobFinder</span>
              </div>
              <p className="text-gray-400">
                Connecting talent with opportunity. Find your next career move
                with us.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Job Seekers</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/browse-jobs"
                    className="hover:text-white transition-colors"
                  >
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="hover:text-white transition-colors"
                  >
                    Create Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/applies-jobs"
                    className="hover:text-white transition-colors"
                  >
                    My Applications
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Employers</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/post-job"
                    className="hover:text-white transition-colors"
                  >
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link
                    href="/total-applications"
                    className="hover:text-white transition-colors"
                  >
                    Manage Applications
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 JobFinder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
