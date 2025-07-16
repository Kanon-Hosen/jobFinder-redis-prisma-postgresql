"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Briefcase } from "lucide-react";
import { Users } from "lucide-react";
import { Building } from "lucide-react";
import { TrendingUp } from "lucide-react";
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
    value: "12,000+",
    color: "bg-teal-500",
  },
];

export default function FloatingStats({ totalJobs }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    try {
      fetch("/api/users")
        .then((res) => res.json())
        .then((data) => setUsers(data));
    } catch (error) {
      console.log(error.message);
      setUsers([]);
    }
  }, []);
  console.log(users);
  const seeker = users.filter((u) => u.role === "SEEKER");
  const employer = users.filter((u) => u.role === "EMPLOYER");
  console.log(seeker);

  return (
    <section className="py-16 -mt-16 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const value =
              stat.label === "Active Jobs" && totalJobs > 0
                ? `${totalJobs}+`
                : stat.label === "Job Seekers"
                ? `${seeker.length}+`
                : stat.label === "Companies"
                ? `${employer.length}+`
                : stat.label === "Success Rate"
                ? `95%`
                : "95%";
            return (
              <Card
                key={index}
                className="text-center p-6 bg-white/90 backdrop-blur-sm border-1 shadow-md  hover:shadow-3xl transition-all duration-500 hover:scale-105 group"
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
  );
}
