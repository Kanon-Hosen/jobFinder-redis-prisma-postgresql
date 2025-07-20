"use client";
import {
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
import FeatureSection from "@/components/Home/FeatureSection";



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
     <FeatureSection features={features}/>

      {/* CTA Section */}
      <Cta />
    </div>
  );
}
