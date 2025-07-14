"use client";
import {
  ArrowRight,
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


import Cta from "@/components/Cta";
import Hero from "@/components/Home/Hero";
import FloatingStats from "@/components/Home/FloatingStats";
import FeaturedJobs from "@/components/Home/FeaturedJobs";
import { useEffect, useState } from "react";
import Categories from "@/components/Home/Categories";



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
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <Hero />
      <FloatingStats totalJobs={totalJobs} />
      {/* Featured Jobs Section */}
      <FeaturedJobs loading={loading} featuredJobs={featuredJobs} />
      {/* Unique Categories Section */}
     <Categories/>

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
