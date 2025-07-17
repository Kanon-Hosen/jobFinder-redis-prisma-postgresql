"use client";
import { Card, CardContent } from "./ui/card";
import {
  MapPin,
  Clock,
  Users,
  CalendarDays,
  DollarSign,
  Star,
  TrendingUp,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import { Badge } from "./ui/badge";
import Link from "next/link";

const jobTypeStyles = {
  "Full-time": {
    gradient: "from-emerald-400 to-teal-500",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    shadow: "shadow-emerald-200",
  },
  "Part-time": {
    gradient: "from-amber-400 to-orange-500",
    bg: "bg-amber-50",
    text: "text-amber-700",
    shadow: "shadow-amber-200",
  },
  Contract: {
    gradient: "from-violet-400 to-purple-500",
    bg: "bg-violet-50",
    text: "text-violet-700",
    shadow: "shadow-violet-200",
  },
  Internship: {
    gradient: "from-orange-400 to-red-500",
    bg: "bg-orange-50",
    text: "text-orange-700",
    shadow: "shadow-orange-200",
  },
  Remote: {
    gradient: "from-green-400 to-emerald-500",
    bg: "bg-green-50",
    text: "text-green-700",
    shadow: "shadow-green-200",
  },
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

function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default function JobCard({ job }) {
  const jobStyle = jobTypeStyles[job.type] || jobTypeStyles["Full-time"];
  const applicantCount = job.applies?.length || 0;
  const isHotJob = applicantCount > 15;
  const isNewJob =
    job.createdAt &&
    new Date() - new Date(job.createdAt) < 3 * 24 * 60 * 60 * 1000;
  const deadlineDate =
    new Date(job?.applicationDeadline).toLocaleDateString() < new Date();

  return (
    <Link href={`/job/${job.title}?id=${job.id}`}>
      <Card className="h-full group relative bg-white border-0 shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden transform hover:-translate-y-2">
        {/* Background Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${jobStyle.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
        />
        <div
          className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${jobStyle.gradient} opacity-10 rounded-bl-full`}
        />
        <CardContent className="relative px-4 sm:px-6 py-4 space-y-3 sm:space-y-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                  {job.title || "Job Title"}
                </h3>
                {isNewJob && (
                  <Badge className="bg-green-500 absolute -top-2 right-4 text-white text-xs px-2 py-0.5">
                    <Zap className="w-3 h-3 mr-1" />
                    NEW
                  </Badge>
                )}
              </div>
              <p className="text-sm sm:text-base text-gray-600 font-medium">
                {job.company || "Company Name"}
              </p>
            </div>
          </div>

          {/* Job Type + Tags */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Badge
              className={`${jobStyle.bg} ${jobStyle.text} border-0 px-3 py-1.5 font-semibold text-sm ${jobStyle.shadow} shadow-sm`}
            >
              <div
                className={`w-2 h-2 bg-gradient-to-r ${jobStyle.gradient} rounded-full mr-2 animate-pulse`}
              />
              {job?.type || "Full-time"}
            </Badge>

            {isHotJob && (
              <Badge className="bg-red-500 text-white border-0 px-2 py-1 text-xs font-bold">
                <TrendingUp className="w-3 h-3 mr-1" />
                HOT
              </Badge>
            )}

            {job.experienceLevel && (
              <Badge className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-1 text-xs">
                <Star className="w-3 h-3 mr-1" />
                {job.experienceLevel}
              </Badge>
            )}
          </div>

          {/* Description */}
          <div className="relative">
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-2">
              {job.description || "Job description not available"}
            </p>
            <div className="absolute bottom-0 right-0 w-8 h-4 bg-gradient-to-l from-white to-transparent" />
          </div>

          {/* Location + Time */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 text-gray-500">
              <div className="p-1 bg-gray-100 rounded-full">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
              <span className="font-medium">{job.location || "Remote"}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <div className="p-1 bg-gray-100 rounded-full">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
              <span>{job.createdAt ? timeAgo(job.createdAt) : "Recently"}</span>
            </div>
          </div>

          {/* Benefits */}
          {job.benefits && job.benefits.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {job.benefits.slice(0, 3).map((benefit, i) => (
                <span
                  key={i}
                  className="text-xs bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 px-3 py-1.5 rounded-full border border-gray-200 font-medium"
                >
                  {benefit}
                </span>
              ))}
              {job.benefits.length > 3 && (
                <span className="text-xs text-gray-500 px-2 py-1.5 font-medium">
                  +{job.benefits.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Bottom Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 gap-3 border-t border-gray-100">
            <div className="flex flex-wrap items-center gap-4">
              {job.salary && (
                <div className="flex items-center gap-1.5">
                  <div
                    className={`p-1.5 bg-gradient-to-r ${jobStyle.gradient} rounded-full`}
                  >
                    <DollarSign className="w-3 h-3 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 text-sm">
                      ${job.salary}
                    </span>
                    <span className="text-xs text-gray-500">per year</span>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-sm">
                <div className="relative">
                  <Users className="w-4 h-4 text-gray-400" />
                  {applicantCount > 10 && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                  )}
                </div>
                <span className="text-gray-600 font-medium">
                  {applicantCount}
                </span>
                <span className="text-gray-500">applied</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-gray-400 group-hover:text-emerald-600 transition-colors">
              <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Apply
              </span>
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
          </div>

          {/* Deadline */}
          {job.applicationDeadline && (
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-gray-400" />
                {deadlineDate ? (
                  <span className="text-sm text-gray-600">
                    Deadline{" "}
                    <span className="font-semibold text-red-400">End</span>
                  </span>
                ) : (
                  <span className="text-sm text-gray-600">
                    Deadline{" "}
                    <span className="font-semibold text-red-400">
                      {formatDate(job.applicationDeadline)}
                    </span>
                  </span>
                )}
              </div>
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
            </div>
          )}
        </CardContent>

        {/* Hover Glow */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${jobStyle.gradient} opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-500 pointer-events-none`}
        />
      </Card>
    </Link>
  );
}
