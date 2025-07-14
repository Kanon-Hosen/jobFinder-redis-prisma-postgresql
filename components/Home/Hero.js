"use client";

import { CheckCircle } from "lucide-react";
import { Sparkles } from "lucide-react";
import { Star } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MapPin } from "lucide-react";

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();
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
          <h1 className="text-5xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Your Career Adventure
            <span className="block bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent">
              {" "}
              Begins Here
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg font-normal text-emerald-100 mb-6 max-w-3xl mx-auto leading-relaxed ">
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
  );
}
