"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Building,
  MapPin,
  Calendar,
  Target,
  Gift,
  Users,
  Mail,
  Phone,
  DollarSign,
  Award,
  Globe,
  ExternalLink,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useCurrentUser from "@/hooks/useCurrentUser";

const statusStyles = {
  Pending: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border-yellow-300",
    icon: Clock,
  },
  Reviewing: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-300",
    icon: Eye,
  },
  Accepted: {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-300",
    icon: CheckCircle,
  },
  Rejected: {
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-300",
    icon: XCircle,
  },
  Withdrawn: {
    bg: "bg-gray-100",
    text: "text-gray-800",
    border: "border-gray-300",
    icon: AlertCircle,
  },
};

export default function JobApplications() {
  const params = useParams();
  const jobId = params.jobId;
  const { user, loading } = useCurrentUser();
  const [selectedJob, setSelectedJob] = useState(null);
  const router = useRouter();
  const [loadingApplications, setLoadingApplications] = useState(false);

  // Utility functions
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatSalary = (salary) => {
    if (!salary) return "Not specified";
    return `$${Number(salary).toLocaleString()}`;
  };

  const isDeadlinePassed = (deadline) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  const getApplicationStats = () => {
    if (!selectedJob?.applies) return { total: 0 };

    const applications = selectedJob.applies;
    return {
      total: applications.length,
      Pending: applications.filter((app) => app.status === "Pending").length,
      Reviewing: applications.filter((app) => app.status === "Reviewing")
        .length,
      Accepted: applications.filter((app) => app.status === "Accepted").length,
      Rejected: applications.filter((app) => app.status === "Rejected").length,
    };
  };

  const updateApplicationStatus = async (applicationId, newStatus) => {
    try {
      const response = await fetch(`/api/apply/${applicationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
        credentials: "include",
      });

      if (response.ok) {
        // Update the local state
        setSelectedJob((prev) => ({
          ...prev,
          applies: prev.applies.map((app) =>
            app.id === applicationId ? { ...app, status: newStatus } : app
          ),
        }));
      } else {
        console.error("Failed to update application status");
      }
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user || user.role !== "EMPLOYER") {
      router.replace("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchApplications() {
      setLoadingApplications(true);
      try {
        const res = await fetch(`/api/jobs/${jobId}`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setSelectedJob(data);
        } else {
          setSelectedJob(null);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
        setSelectedJob(null);
      } finally {
        setLoadingApplications(false);
      }
    }

    if (jobId) {
      fetchApplications();
    }
  }, [jobId]);

  if (loading || !user || user.role !== "EMPLOYER") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-4 border-purple-200"></div>
            <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-4 border-purple-600 border-t-transparent absolute top-0"></div>
          </div>
          <div className="space-y-2">
            <p className="text-xl sm:text-2xl font-semibold text-gray-700">
              Loading...
            </p>
            <p className="text-sm sm:text-base text-gray-500">
              Checking permissions
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0">
                {selectedJob?.title?.charAt(0).toUpperCase() || "J"}
              </div>
              <span className="break-words">
                Applications for {selectedJob?.title || "Job Position"}
              </span>
            </CardTitle>

            {selectedJob && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm text-purple-100 mt-4 sm:mt-6">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{selectedJob.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{selectedJob.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">
                      Posted {formatDate(selectedJob.createdAt)}
                    </span>
                  </div>
                  <div
                    className={`flex items-center gap-2 ${
                      isDeadlinePassed(selectedJob.applicationDeadline)
                        ? "text-red-300"
                        : "text-orange-300"
                    }`}
                  >
                    <Target className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">
                      Deadline{" "}
                      {selectedJob.applicationDeadline
                        ? formatDate(selectedJob.applicationDeadline)
                        : "Not set"}
                    </span>
                  </div>
                </div>

                {/* Job Details Summary */}
                <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-white/20 backdrop-blur-sm rounded-xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
                    <div>
                      <span className="font-medium text-purple-200">Type:</span>
                      <p className="font-semibold text-white break-words">
                        {selectedJob.type}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-purple-200">
                        Work Setting:
                      </span>
                      <p className="font-semibold text-white break-words">
                        {selectedJob.workSetting}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-purple-200">
                        Experience:
                      </span>
                      <p className="font-semibold text-white break-words">
                        {selectedJob.experienceLevel}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-purple-200">
                        Salary:
                      </span>
                      <p className="font-semibold text-white break-words">
                        {formatSalary(selectedJob.salary)}
                      </p>
                    </div>
                  </div>

                  {selectedJob.benefits && selectedJob.benefits.length > 0 && (
                    <div className="mt-4">
                      <span className="font-medium text-purple-200 flex items-center gap-2 mb-3">
                        <Gift className="w-4 h-4 flex-shrink-0" />
                        Benefits:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.benefits.map((benefit, index) => (
                          <Badge
                            key={index}
                            className="bg-green-500/20 text-green-100 border-green-400/30 text-xs"
                          >
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </CardHeader>

          <CardContent className="p-4 sm:p-6 lg:p-8">
            {loadingApplications ? (
              <div className="flex items-center justify-center py-16 sm:py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-purple-200 border-t-purple-600 mx-auto mb-4"></div>
                  <p className="text-gray-600 text-base sm:text-lg">
                    Loading applications...
                  </p>
                </div>
              </div>
            ) : !selectedJob?.applies || selectedJob.applies.length === 0 ? (
              <div className="text-center py-16 sm:py-20">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  No applications yet
                </h3>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg px-4">
                  This job hasn't received any applications yet. Share the job
                  posting to attract candidates.
                </p>
              </div>
            ) : (
              <div className="space-y-6 sm:space-y-8">
                {/* Application Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                  {Object.entries(getApplicationStats()).map(([key, value]) => {
                    const config = statusStyles[key] || statusStyles.Pending;
                    const Icon = config.icon;
                    return (
                      <div
                        key={key}
                        className={`${config.bg} rounded-xl p-3 sm:p-4 border ${config.border} hover:scale-105 transition-transform duration-200`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Icon
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${config.text} flex-shrink-0`}
                          />
                          <span
                            className={`text-lg sm:text-2xl font-bold ${config.text}`}
                          >
                            {value}
                          </span>
                        </div>
                        <p
                          className={`text-xs sm:text-sm font-medium ${config.text} capitalize truncate`}
                        >
                          {key === "total" ? "Total" : key}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Applications List */}
                <div className="space-y-4 sm:space-y-6">
                  {selectedJob.applies.map((application) => {
                    const statusConfig =
                      statusStyles[application.status] || statusStyles.Pending;
                    const StatusIcon = statusConfig.icon;

                    return (
                      <Card
                        key={application.id}
                        className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/95 backdrop-blur-sm"
                      >
                        <CardContent className="p-4 sm:p-6 lg:p-8">
                          <div className="flex flex-col sm:flex-row items-start justify-between mb-4 sm:mb-6 gap-4">
                            <div className="flex items-start gap-3 sm:gap-4 w-full sm:w-auto">
                              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg flex-shrink-0">
                                {application.fullName?.charAt(0).toUpperCase()}
                              </div>
                              <div className="min-w-0 flex-1">
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 break-words">
                                  {application.fullName}
                                </h3>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm text-gray-600 mb-3">
                                  <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 flex-shrink-0" />
                                    <span className="truncate">
                                      {application.user?.email}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 flex-shrink-0" />
                                    <span className="truncate">
                                      {application.phone}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 flex-shrink-0" />
                                    <span className="truncate">
                                      {application.location}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                                  <Calendar className="w-4 h-4 flex-shrink-0" />
                                  <span>
                                    Applied {formatDate(application.applyDate)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                              <Badge
                                className={`${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} border-2 font-bold px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm`}
                              >
                                <StatusIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                {application.status}
                              </Badge>
                            </div>
                          </div>

                          <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-4 sm:mb-6 h-auto">
                              <TabsTrigger
                                value="overview"
                                className="text-xs sm:text-sm py-2"
                              >
                                Overview
                              </TabsTrigger>
                              <TabsTrigger
                                value="cover-letter"
                                className="text-xs sm:text-sm py-2"
                              >
                                Cover Letter
                              </TabsTrigger>
                              <TabsTrigger
                                value="experience"
                                className="text-xs sm:text-sm py-2"
                              >
                                Experience
                              </TabsTrigger>
                              <TabsTrigger
                                value="links"
                                className="text-xs sm:text-sm py-2"
                              >
                                Links & Files
                              </TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="space-y-4">
                              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                                <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                                  <p className="text-xs sm:text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                                    <DollarSign className="w-4 h-4 flex-shrink-0" />
                                    Expected Salary
                                  </p>
                                  <p className="text-lg sm:text-xl font-bold text-gray-900 break-words">
                                    {application.expectedSalary
                                      ? formatSalary(application.expectedSalary)
                                      : "Not specified"}
                                  </p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                                  <p className="text-xs sm:text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 flex-shrink-0" />
                                    Available From
                                  </p>
                                  <p className="text-lg sm:text-xl font-bold text-gray-900 break-words">
                                    {application.available
                                      ? formatDate(application.available)
                                      : "Immediately"}
                                  </p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                                  <p className="text-xs sm:text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                                    <Award className="w-4 h-4 flex-shrink-0" />
                                    Skills
                                  </p>
                                  <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                                    {application.skills
                                      ?.split(",")
                                      .map((skill, index) => (
                                        <Badge
                                          key={index}
                                          className="bg-blue-100 text-blue-800 border-blue-200 text-xs"
                                        >
                                          {skill.trim()}
                                        </Badge>
                                      ))}
                                  </div>
                                </div>
                              </div>
                            </TabsContent>

                            <TabsContent value="cover-letter">
                              <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                                <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line break-words">
                                  {application.coverLetter ||
                                    "No cover letter provided."}
                                </p>
                              </div>
                            </TabsContent>

                            <TabsContent value="experience">
                              <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                                <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line break-words">
                                  {application.experience ||
                                    "No experience details provided."}
                                </p>
                              </div>
                            </TabsContent>

                            <TabsContent value="links" className="space-y-4">
                              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                                {application.portfolio && (
                                  <Button
                                    asChild
                                    variant="outline"
                                    className="rounded-xl bg-transparent w-full sm:w-auto"
                                  >
                                    <a
                                      href={application.portfolio}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <Globe className="w-4 h-4 mr-2 flex-shrink-0" />
                                      <span className="truncate">
                                        Portfolio
                                      </span>
                                    </a>
                                  </Button>
                                )}
                                {application.linkedIn && (
                                  <Button
                                    asChild
                                    variant="outline"
                                    className="rounded-xl bg-transparent w-full sm:w-auto"
                                  >
                                    <a
                                      href={application.linkedIn}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <ExternalLink className="w-4 h-4 mr-2 flex-shrink-0" />
                                      <span className="truncate">LinkedIn</span>
                                    </a>
                                  </Button>
                                )}
                                {application.resume && (
                                  <Button
                                    asChild
                                    variant="outline"
                                    className="rounded-xl bg-transparent w-full sm:w-auto"
                                  >
                                    <a
                                      href={application.resume}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <Download className="w-4 h-4 mr-2 flex-shrink-0" />
                                      <span className="truncate">Resume</span>
                                    </a>
                                  </Button>
                                )}
                              </div>
                            </TabsContent>
                          </Tabs>

                          {/* Action Buttons */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 sm:pt-6 border-t border-gray-200 mt-4 sm:mt-6 gap-4">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                              {application.status === "Pending" && (
                                <>
                                  <Button
                                    onClick={() =>
                                      updateApplicationStatus(
                                        application.id,
                                        "Reviewing"
                                      )
                                    }
                                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 sm:px-6 py-2 w-full sm:w-auto text-sm"
                                  >
                                    <Eye className="w-4 h-4 mr-2 flex-shrink-0" />
                                    Review
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      updateApplicationStatus(
                                        application.id,
                                        "Accepted"
                                      )
                                    }
                                    className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-4 sm:px-6 py-2 w-full sm:w-auto text-sm"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                                    Accept
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      updateApplicationStatus(
                                        application.id,
                                        "Rejected"
                                      )
                                    }
                                    variant="outline"
                                    className="border-red-200 text-red-700 hover:bg-red-50 rounded-xl px-4 sm:px-6 py-2 w-full sm:w-auto text-sm"
                                  >
                                    <XCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                                    Reject
                                  </Button>
                                </>
                              )}
                              {application.status === "Reviewing" && (
                                <>
                                  <Button
                                    onClick={() =>
                                      updateApplicationStatus(
                                        application.id,
                                        "Accepted"
                                      )
                                    }
                                    className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-4 sm:px-6 py-2 w-full sm:w-auto text-sm"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                                    Accept
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      updateApplicationStatus(
                                        application.id,
                                        "Rejected"
                                      )
                                    }
                                    variant="outline"
                                    className="border-red-200 text-red-700 hover:bg-red-50 rounded-xl px-4 sm:px-6 py-2 w-full sm:w-auto text-sm"
                                  >
                                    <XCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                                    Reject
                                  </Button>
                                </>
                              )}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500 w-full sm:w-auto text-left sm:text-right">
                              Application #
                              {application.id?.slice(-6) || "000000"}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
