"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Calendar,
  MapPin,
  Building,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Trash2,
  Filter,
  Search,
  Users,
  FileText,
  Star,
  ArrowRight,
  Download,
  MoreVertical,
  RefreshCw,
  Target,
  Zap,
  Award,
  Send,
  ExternalLink,
  Phone,
  Globe,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import useCurrentUser from "@/hooks/useCurrentUser";
import Loading from "@/components/Loading";

const statusStyles = {
  Pending: {
    bg: "bg-gradient-to-r from-yellow-50 to-amber-50",
    text: "text-yellow-700",
    border: "border-yellow-300",
    icon: Clock,
    dot: "bg-yellow-500",
    glow: "shadow-yellow-200",
  },
  reviewing: {
    bg: "bg-gradient-to-r from-blue-50 to-indigo-50",
    text: "text-blue-700",
    border: "border-blue-300",
    icon: Eye,
    dot: "bg-blue-500",
    glow: "shadow-blue-200",
  },
  accepted: {
    bg: "bg-gradient-to-r from-green-50 to-emerald-50",
    text: "text-green-700",
    border: "border-green-300",
    icon: CheckCircle,
    dot: "bg-green-500",
    glow: "shadow-green-200",
  },
  rejected: {
    bg: "bg-gradient-to-r from-red-50 to-pink-50",
    text: "text-red-700",
    border: "border-red-300",
    icon: XCircle,
    dot: "bg-red-500",
    glow: "shadow-red-200",
  },
  withdrawn: {
    bg: "bg-gradient-to-r from-gray-50 to-slate-50",
    text: "text-gray-700",
    border: "border-gray-300",
    icon: AlertCircle,
    dot: "bg-gray-500",
    glow: "shadow-gray-200",
  },
};

export default function ApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [isloading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState(null);

  const { user, loading } = useCurrentUser();

  useEffect(() => {
    if (!loading) {
      if (!user?.email || user?.role !== "SEEKER") {
        router.push("/login");
      }
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appsRes = await fetch("/api/apply", {
          credentials: "include",
        });
        if (appsRes.ok) {
          const appsData = await appsRes.json();
          setApplications(appsData);
          setFilteredApplications(appsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  useEffect(() => {
    let filtered = applications;

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (app) =>
          app.job?.title?.toLowerCase().includes(term) ||
          app.job?.company?.toLowerCase().includes(term) ||
          app.job?.location?.toLowerCase().includes(term) ||
          app.fullName?.toLowerCase().includes(term)
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    setFilteredApplications(filtered);
  }, [applications, searchTerm, statusFilter]);

  const handleWithdraw = async (applicationId) => {
    if (
      !confirm("Are you sure you want to withdraw (delete) this application?")
    )
      return;

    try {
      const response = await fetch(`/api/apply/${applicationId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setApplications((prev) =>
          prev.filter((app) => app.id !== applicationId)
        );
      }
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  const getStatusStats = () => {
    const stats = {
      total: applications.length,
      pending: applications.filter((app) => app.status === "Pending").length,
      reviewing: applications.filter((app) => app.status === "reviewing")
        .length,
      accepted: applications.filter((app) => app.status === "accepted").length,
      rejected: applications.filter((app) => app.status === "rejected").length,
    };
    return stats;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  if (isloading) {
    return <Loading/>
  }

  const stats = getStatusStats();
  console.log(applications)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Enhanced Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Floating Badge */}
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-8">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 bg-yellow-400 rounded-full border-2 border-white"></div>
                <div className="w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
                <div className="w-6 h-6 bg-blue-400 rounded-full border-2 border-white"></div>
              </div>
              <span className="text-white font-medium">My Applications</span>
              <FileText className="w-4 h-4 text-white" />
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Track Your
              <span className="block bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent">
                Career Journey
              </span>
            </h1>

            <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Monitor your job applications, track their progress, and stay
              organized in your job search journey with real-time updates.
            </p>

            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="group bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:bg-white/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-3xl font-bold text-white">
                    {stats.total}
                  </div>
                  <Target className="w-6 h-6 text-emerald-200 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-emerald-100 text-sm font-medium">
                  Total Applied
                </div>
              </div>
              <div className="group bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:bg-white/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-3xl font-bold text-white">
                    {stats.pending}
                  </div>
                  <Clock className="w-6 h-6 text-yellow-300 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-emerald-100 text-sm font-medium">
                  Pending
                </div>
              </div>
              <div className="group bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:bg-white/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-3xl font-bold text-white">
                    {stats.reviewing}
                  </div>
                  <Eye className="w-6 h-6 text-blue-300 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-emerald-100 text-sm font-medium">
                  Under Review
                </div>
              </div>
              <div className="group bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:bg-white/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-3xl font-bold text-white">
                    {stats.accepted}
                  </div>
                  <Award className="w-6 h-6 text-green-300 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-emerald-100 text-sm font-medium">
                  Accepted
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-20 fill-slate-50">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Enhanced Search and Filter */}
          <Card className="mb-8 bg-white/95 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Search className="h-5 w-5" />
                  </div>
                  <Input
                    placeholder="Search by job title, company, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-emerald-400 focus:ring-emerald-400 rounded-2xl bg-gray-50/50 focus:bg-white transition-all duration-300"
                  />
                </div>
                <div className="flex gap-4">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-56 h-14 border-2 border-gray-200 focus:border-emerald-400 focus:ring-emerald-400 rounded-2xl bg-gray-50/50">
                      <Filter className="w-5 h-5 mr-2 text-gray-500" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Applications</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="reviewing">Under Review</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="withdrawn">Withdrawn</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="h-14 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 border-2 border-gray-200 rounded-2xl">
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Refresh
                  </Button>
                  <Link href="/browse-jobs">
                    <Button className="h-14 px-8 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <Briefcase className="w-5 h-5 mr-2" />
                      Find More Jobs
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Applications List */}
          {filteredApplications.length === 0 ? (
            <Card className="text-center py-20 bg-white/95 backdrop-blur-sm border-0 shadow-xl">
              <CardContent>
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
                  <FileText className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {applications.length === 0
                    ? "No applications yet"
                    : "No matching applications"}
                </h3>
                <p className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto">
                  {applications.length === 0
                    ? "Start your job search journey by applying to positions that match your skills and interests."
                    : "Try adjusting your search terms or filters to find what you're looking for."}
                </p>
                <div className="flex justify-center gap-4">
                  {applications.length === 0 ? (
                    <Link href="/browse-jobs">
                      <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-10 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <Briefcase className="w-6 h-6 mr-2" />
                        Browse Jobs
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      onClick={() => {
                        setSearchTerm("");
                        setStatusFilter("all");
                      }}
                      variant="outline"
                      className="px-10 py-4 text-lg rounded-2xl border-2"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {filteredApplications.map((application) => {
                const statusConfig =
                  statusStyles[application.status] || statusStyles.Pending;
                const StatusIcon = statusConfig.icon;
                const isRecent =
                  new Date() - new Date(application.applyDate) <
                  7 * 24 * 60 * 60 * 1000;

                return (
                  <Card
                    key={application.id}
                    className="group bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                  >
                    {/* Status indicator bar */}
                    <div
                      className={`h-1.5 ${statusConfig.dot} transition-all duration-300 group-hover:h-2`}
                    />

                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start gap-6">
                          {/* Company logo placeholder */}
                          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                            {application.job?.title?.charAt(0).toUpperCase() ||
                              "J"}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                                {application.job?.title || "Job Title"}
                              </h3>
                              {isRecent && (
                                <Badge className="bg-green-500 text-white text-xs px-2 py-1">
                                  <Zap className="w-3 h-3 mr-1" />
                                  RECENT
                                </Badge>
                              )}
                              <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs px-2 py-1">
                                {application.job?.type || "Full-time"}
                              </Badge>
                            </div>
                            <p className="text-gray-600 font-semibold text-lg mb-3 flex items-center gap-2">
                              <Building className="w-5 h-5 text-gray-400" />
                              {application.job?.company || "Company Name"}
                            </p>
                            <div className="flex items-center gap-6 text-sm text-gray-500">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span className="font-medium">
                                  {application.job?.location || "Remote"}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  Applied {formatDate(application.applyDate)}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{getTimeAgo(application.applyDate)}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Status badge and actions */}
                        <div className="flex items-center gap-4">
                          <Badge
                            className={`${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} border-2 font-bold px-4 py-2 text-sm ${statusConfig.glow} shadow-lg`}
                          >
                            <StatusIcon className="w-4 h-4 mr-2" />
                            {application.status}
                          </Badge>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-10 w-10 rounded-full hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-300"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/job/${application.job?.title}?id=${application.jobId}`}
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Job Details
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  setSelectedApplication(application)
                                }
                                className="cursor-pointer"
                              >
                                <FileText className="w-4 h-4 mr-2" />
                                View Application Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {application.resume && (
                                <DropdownMenuItem asChild>
                                  <a
                                    href={application.resume}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    Download Resume
                                  </a>
                                </DropdownMenuItem>
                              )}
                              {application.portfolio && (
                                <DropdownMenuItem asChild>
                                  <a
                                    href={application.portfolio}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    View Portfolio
                                  </a>
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              {application.status === "Pending" && (
                                <DropdownMenuItem
                                  onClick={() => handleWithdraw(application.id)}
                                  className="text-red-600 focus:text-red-600 cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Withdraw Application
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {/* Enhanced Application details */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6 border-t border-gray-100">
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                            Job Salary
                          </p>
                          <p className="text-lg font-bold text-emerald-600">
                            {application.job?.salary
                              ? `$${Number(
                                  application.job.salary
                                ).toLocaleString()}`
                              : "Not specified"}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                            Expected Salary
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            {application.expectedSalary
                              ? `$${Number(
                                  application.expectedSalary
                                ).toLocaleString()}`
                              : "Not specified"}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                            Available From
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            {application.available
                              ? formatDate(application.available)
                              : "Immediately"}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                            Work Setting
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            {application.job?.workSetting || "Not specified"}
                          </p>
                        </div>
                      </div>

                      {/* Skills and Contact Info */}
                      

                      {/* Action buttons */}
                      <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-6">
                        <div className="flex items-center gap-4">
                          <Link
                            href={`/job/${application.job?.title}?id=${application.jobId}`}
                          >
                            <Button
                              variant="outline"
                              className="border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 rounded-xl px-6 py-2 bg-transparent"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Job
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            onClick={() => setSelectedApplication(application)}
                            className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 rounded-xl px-6 py-2 bg-transparent"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                          {application.status === "Pending" && (
                            <Button
                              variant="outline"
                              onClick={() => handleWithdraw(application.id)}
                              className="border-2 border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 rounded-xl px-6 py-2"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Withdraw
                            </Button>
                          )}
                        </div>

                        <div className="text-sm text-gray-500">
                          Application #{application.id?.slice(-6) || "000000"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Application Details Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Application Details
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedApplication(null)}
                  className="rounded-full h-20 w-20 text-3xl p-0"
                >
                  ×
                </Button>
              </div>

              <div className="space-y-8">
                {/* Job Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Job Information
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {selectedApplication.job?.title}
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {selectedApplication.job?.company}
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedApplication.job?.description}
                    </p>
                  </div>
                </div>

                {/* Personal Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Full Name
                        </label>
                        <p className="text-gray-900 font-semibold">
                          {selectedApplication.fullName}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Phone
                        </label>
                        <p className="text-gray-900">
                          {selectedApplication.phone}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Location
                        </label>
                        <p className="text-gray-900">
                          {selectedApplication.location}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Expected Salary
                        </label>
                        <p className="text-gray-900 font-semibold">
                          $
                          {Number(
                            selectedApplication.expectedSalary
                          ).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Available From
                        </label>
                        <p className="text-gray-900">
                          {formatDate(selectedApplication.available)}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Skills
                        </label>
                        <p className="text-gray-900">
                          {selectedApplication.skills}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cover Letter */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Cover Letter
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {selectedApplication.coverLetter}
                    </p>
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Experience
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {selectedApplication.experience}
                    </p>
                  </div>
                </div>

                {/* Links */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Links & Documents
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {selectedApplication.portfolio && (
                      <Button
                        asChild
                        variant="outline"
                        className="rounded-xl bg-transparent"
                      >
                        <a
                          href={selectedApplication.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Globe className="w-4 h-4 mr-2" />
                          Portfolio
                        </a>
                      </Button>
                    )}
                    {selectedApplication.linkedIn && (
                      <Button
                        asChild
                        variant="outline"
                        className="rounded-xl bg-transparent"
                      >
                        <a
                          href={selectedApplication.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          LinkedIn
                        </a>
                      </Button>
                    )}
                    {selectedApplication.resume && (
                      <Button
                        asChild
                        variant="outline"
                        className="rounded-xl bg-transparent"
                      >
                        <a
                          href={selectedApplication.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Resume
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Enhanced Tips Section */}
      {applications.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Star className="w-4 h-4" />
                Pro Tips
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Keep Your Job Search Active
              </h2>
              <p className="text-xl text-gray-600">
                Expert strategies to improve your application success rate
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="group bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-4 text-xl">
                    Follow Up Strategically
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Send a thoughtful follow-up email 1-2 weeks after applying
                    to demonstrate genuine interest and professionalism.
                  </p>
                </CardContent>
              </Card>

              <Card className="group bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-4 text-xl">
                    Network Actively
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Connect with employees at target companies through LinkedIn,
                    industry events, and professional communities.
                  </p>
                </CardContent>
              </Card>

              <Card className="group bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-4 text-xl">
                    Stay Consistent
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Apply to multiple positions regularly and maintain momentum.
                    Consistency is key to landing your dream job.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-16">
              <Link href="/browse-jobs">
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-12 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-2xl">
                  <Briefcase className="w-6 h-6 mr-2" />
                  Continue Job Search
                  <ArrowRight className="w-6 h-6 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
