"use client";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { MapPin, Clock, Users } from "lucide-react";
import { Badge } from "./ui/badge";
import Link from "next/link";

const jobTypeColors = {
  "Full-time": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Part-time": "bg-amber-50 text-amber-700 border-amber-200",
  Contract: "bg-violet-50 text-violet-700 border-violet-200",
  Internship: "bg-orange-50 text-orange-700 border-orange-200",
  Remote: "bg-green-50 text-green-700 border-green-200",
};

function timeAgo(dateString) {
  const now = new Date();
  const postedDate = new Date(dateString);
  const diff = Math.floor((now - postedDate) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function JobCard({ job }) {
  return (
    <Link href={`/job/${job.title}?id=${job.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-200 hover:border-gray-300 bg-white">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
                {job.title || "Job Title"}
              </h3>
              <p className="text-gray-600 text-sm font-medium">
                {job.company || "Company Name"}
              </p>
            </div>
            <Badge
              className={`${
                jobTypeColors[job.type] || "bg-gray-50 text-gray-700"
              } border text-xs font-medium`}
            >
              {job?.type || "Full-time"}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {job.description || "Job description not available"}
          </p>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            {job.location || "Location not specified"}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center text-sm text-gray-500">
              <Users className="w-4 h-4 mr-1 text-gray-400" />
              <span>{job.applies?.length || 0} applicants</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1 text-gray-400" />
              <span>{job.createdAt ? timeAgo(job.createdAt) : "Recently"}</span>
            </div>
          </div>

          {/* Salary */}
          {job.salary && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <span className="text-emerald-600 font-semibold text-sm">
                ${Number(job.salary).toLocaleString()}/year
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
