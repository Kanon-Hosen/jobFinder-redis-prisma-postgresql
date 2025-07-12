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
  Code,
  Megaphone,
  Palette,
  ShoppingCart,
  Calculator,
  Heart,
  Sparkles,
  Star,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import JobCard from "@/components/JobCard";
import { useRouter } from "next/navigation";
import Cta from "@/components/Cta";

const stats = [
  {
    icon: Briefcase,
    label: "Active Jobs",
    value: "12,000+",
    color: "bg-emerald-500",
  },
  {
    icon: Users,
    label: "Job Seekers",
    value: "50,000+",
    color: "bg-violet-500",
  },
  {
    icon: Building,
    label: "Companies",
    value: "2,500+",
    color: "bg-orange-500",
  },
  {
    icon: TrendingUp,
    label: "Success Rate",
    value: "95%",
    color: "bg-teal-500",
  },
];

const categories = [
  {
    name: "Technology",
    count: "3,200+ jobs",
    icon: Code,
    color: "from-emerald-400 to-teal-500",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
    description: "Software, AI, Web Development",
  },
  {
    name: "Marketing",
    count: "1,800+ jobs",
    icon: Megaphone,
    color: "from-pink-400 to-rose-500",
    bgColor: "bg-pink-50",
    textColor: "text-pink-700",
    description: "Digital, Content, Growth",
  },
  {
    name: "Design",
    count: "1,200+ jobs",
    icon: Palette,
    color: "from-purple-400 to-violet-500",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
    description: "UI/UX, Graphic, Product",
  },
  {
    name: "Sales",
    count: "2,100+ jobs",
    icon: ShoppingCart,
    color: "from-orange-400 to-amber-500",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
    description: "B2B, SaaS, Enterprise",
  },
  {
    name: "Finance",
    count: "900+ jobs",
    icon: Calculator,
    color: "from-blue-400 to-cyan-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    description: "Fintech, Banking, Investment",
  },
  {
    name: "Healthcare",
    count: "1,500+ jobs",
    icon: Heart,
    color: "from-red-400 to-pink-500",
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    description: "Medical, Nursing, Research",
  },
];

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Matching",
    description:
      "Our smart algorithm finds the perfect job matches for your skills",
  },
  {
    icon: CheckCircle,
    title: "Verified Companies",
    description: "All companies are verified and trusted by our community",
  },
  {
    icon: Star,
    title: "Premium Support",
    description: "Get personalized career guidance from our expert team",
  },
];

export default function HomePage() {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalJobs, setTotalJobs] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

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
    router.push(url);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Reduced Height Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700">
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Floating Badge */}
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-8">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 bg-yellow-400 rounded-full border-2 border-white"></div>
                <div className="w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
                <div className="w-6 h-6 bg-pink-400 rounded-full border-2 border-white"></div>
              </div>
              <span className="text-white font-medium">
                Join 50,000+ professionals
              </span>
              <Sparkles className="w-4 h-4 text-yellow-300" />
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Your Career
              <span className="block bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent">
                Adventure
              </span>
              Begins Here
            </h1>

            {/* Subheading */}
            <p className="text-xl text-emerald-100 mb-6 max-w-3xl mx-auto leading-relaxed font-light">
              Discover extraordinary opportunities, connect with innovative
              companies, and take the leap into your dream career
            </p>

            <p className="text-base md:text-lg text-emerald-200 mb-8 max-w-2xl mx-auto">
              Connect with top companies • Remote & On-site • All experience
              levels
            </p>

            {/* Enhanced Search Bar */}
            <div className="max-w-3xl mx-auto mb-8">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-3 shadow-2xl border border-white/20">
                <div className="flex flex-col lg:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Dream job, company, or skills..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pl-12 h-12 border-0 bg-transparent text-gray-900 placeholder:text-gray-500 text-base font-medium focus:ring-0 rounded-2xl"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Anywhere in the world..."
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pl-12 h-12 border-0 bg-transparent text-gray-900 placeholder:text-gray-500 text-base font-medium focus:ring-0 rounded-2xl"
                    />
                  </div>
                  <Button
                    onClick={handleSearch}
                    className="h-12 px-8 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-base rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Explore Now
                  </Button>
                </div>
              </div>
            </div>

            {/* Trending Keywords */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <span className="text-emerald-200 font-medium">Trending:</span>
              {[
                "Remote Developer",
                "AI Engineer",
                "Product Designer",
                "Growth Marketer",
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchTerm(term);
                    const params = new URLSearchParams();
                    params.set("search", term);
                    router.push(`/browse-jobs?${params.toString()}`);
                  }}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 text-white text-sm font-medium hover:scale-105"
                >
                  {term}
                </button>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-emerald-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="font-medium text-sm">Instant Matching</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="font-medium text-sm">Verified Companies</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="font-medium text-sm">4.9/5 Rating</span>
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
      </section>

      {/* Floating Stats Section */}
      <section className="py-16 -mt-16 relative z-10">
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
                  className="text-center p-6 bg-white/90 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group"
                >
                  <CardContent className="p-0">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
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
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              Hand-picked for you
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Opportunities
            </h2>
            <p className="text-xl text-gray-600">
              Premium jobs from top companies
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200"></div>
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-600 border-t-transparent absolute top-0"></div>
              </div>
              <span className="ml-6 text-xl text-gray-600">
                Curating the best opportunities...
              </span>
            </div>
          ) : featuredJobs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {featuredJobs.map((job, index) => (
                  <div
                    key={index}
                    className="transform hover:scale-105 transition-all duration-300"
                  >
                    <JobCard job={job} />
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Link href="/browse-jobs">
                  <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl">
                    Discover All Opportunities
                    <ArrowRight className="ml-3 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <Card className="text-center py-16 bg-white shadow-lg">
              <CardContent>
                <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  No featured jobs yet
                </h3>
                <p className="text-gray-600 mb-8">
                  Be the first to post an amazing opportunity!
                </p>
                <Link href="/post-job">
                  <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-8 py-3 font-semibold rounded-xl">
                    Post the First Job
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
      {/* Unique Categories Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Explore Opportunities
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Find Your Perfect
              <span className="block text-emerald-600">Career Path</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover thousands of opportunities across diverse industries and
              find where your passion meets purpose
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 bg-white overflow-hidden hover:scale-105"
                >
                  <CardContent className="p-0">
                    {/* Gradient Header */}
                    <div
                      className={`h-32 bg-gradient-to-br ${category.color} relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="absolute top-4 right-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-6">
                        <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 font-medium">
                          {category.count}
                        </Badge>
                      </div>
                      {/* Decorative Elements */}
                      <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
                      <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/10 rounded-full"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-sm font-semibold ${category.textColor}`}
                        >
                          View Opportunities
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose JobFinder?
            </h2>
            <p className="text-xl text-gray-600">
              Experience the future of job searching
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <Cta />
    </div>
  );
}
