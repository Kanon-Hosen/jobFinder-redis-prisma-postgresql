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
  TrendingUp,
  Users,
  FileText,
  Loader2,
  Star,
  ArrowRight,
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
import Link from "next/link";

const statusColors = {
  pending: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-yellow-200",
    icon: Clock,
  },
  reviewing: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    icon: Eye,
  },
  accepted: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
    icon: CheckCircle,
  },
  rejected: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    icon: XCircle,
  },
  withdrawn: {
    bg: "bg-gray-50",
    text: "text-gray-700",
    border: "border-gray-200",
    icon: AlertCircle,
  },
};

export default function ApplicationsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  console.log(user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if user is logged in
        const userRes = await fetch("/api/me", { credentials: "include" });
        const userData = await userRes.json();

        if (!userData?.email) {
          router.push("/login");
          return;
        }

        setUser(userData);

        // Fetch user's applications
        const appsRes = await fetch("/api/apply", {
          credentials: "include",
        });
        if (appsRes.ok) {
          const appsData = await appsRes.json();
          setApplications(JSON.parse(appsData));
          setFilteredApplications(JSON.parse(appsData));
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
          app.title?.toLowerCase().includes(term) ||
          app.company?.toLowerCase().includes(term) ||
          app.location?.toLowerCase().includes(term)
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    setFilteredApplications(filtered);
  }, [applications, searchTerm, statusFilter]);

  const handleWithdraw = async (applicationId) => {
    if (!confirm("Are you sure you want to withdraw this application?")) return;

    try {
      const response = await fetch(`/api/apply/${applicationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "withdrawn" }),
      });

      if (response.ok) {
        setApplications((prev) =>
          prev.map((app) =>
            app.id === applicationId ? { ...app, status: "withdrawn" } : app
          )
        );
      }
    } catch (error) {
      console.error("Error withdrawing application:", error);
    }
  };

  const getStatusStats = () => {
    const stats = {
      total: applications.length,
      pending: applications.filter((app) => app.status === "pending").length,
      reviewing: applications.filter((app) => app.status === "reviewing")
        .length,
      accepted: applications.filter((app) => app.status === "accepted").length,
      rejected: applications.filter((app) => app.status === "rejected").length,
    };
    return stats;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading your applications...</p>
        </div>
      </div>
    );
  }

  const stats = getStatusStats();
  console.log("filter:", filteredApplications);
  console.log("apply:", applications);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-8">
              <FileText className="w-4 h-4 text-white" />
              <span className="text-white font-medium">My Applications</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Track Your
              <span className="block bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent">
                Career Journey
              </span>
            </h1>

            <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Monitor your job applications, track their progress, and stay
              organized in your job search journey.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                <div className="text-2xl font-bold text-white">
                  {stats.total}
                </div>
                <div className="text-emerald-100 text-sm">Total Applied</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                <div className="text-2xl font-bold text-white">
                  {stats.pending}
                </div>
                <div className="text-emerald-100 text-sm">Pending</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                <div className="text-2xl font-bold text-white">
                  {stats.reviewing}
                </div>
                <div className="text-emerald-100 text-sm">Under Review</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                <div className="text-2xl font-bold text-white">
                  {stats.accepted}
                </div>
                <div className="text-emerald-100 text-sm">Accepted</div>
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
          {/* Search and Filter */}
          <Card className="mb-8 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by job title, company, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
                <div className="flex gap-3">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48 h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Applications</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="reviewing">Under Review</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="withdrawn">Withdrawn</SelectItem>
                    </SelectContent>
                  </Select>
                  <Link href="/browse-jobs">
                    <Button className="h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-6">
                      <Briefcase className="w-4 h-4 mr-2" />
                      Find More Jobs
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Applications List */}
          {filteredApplications.length === 0 ? (
            <Card className="text-center py-16 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
              <CardContent>
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {applications.length === 0
                    ? "No applications yet"
                    : "No matching applications"}
                </h3>
                <p className="text-gray-600 text-lg mb-8">
                  {applications.length === 0
                    ? "Start your job search journey by applying to positions that match your skills."
                    : "Try adjusting your search terms or filters to find what you're looking for."}
                </p>
                <div className="flex justify-center gap-4">
                  {applications.length === 0 ? (
                    <Link href="/browse-jobs">
                      <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-8 py-3 text-lg">
                        <Briefcase className="w-5 h-5 mr-2" />
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
                      className="px-8 py-3"
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
                  statusColors[application.status] || statusColors.pending;
                const StatusIcon = statusConfig.icon;

                return (
                  <Card
                    key={application.id}
                    className="bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            {application?.job.title?.charAt(0).toUpperCase() ||
                              "J"}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                              {application.job.title}
                            </h3>
                            <p className="text-gray-600 font-medium flex items-center gap-1 mb-2">
                              <Building className="w-4 h-4" />
                              {application.job.company}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {application.job.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                Applied{" "}
                                {new Date(
                                  application.applyDate
                                ).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            className={`${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} border font-medium`}
                          >
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {application.status.charAt(0).toUpperCase() +
                              application.status.slice(1)}
                          </Badge>
                        </div>
                      </div>

                      {application.coverLetter && (
                        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700 line-clamp-2">
                            {application.coverLetter}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          {application.expectedSalary && (
                            <div className="flex items-center gap-1">
                              <span className="text-emerald-600 font-semibold">
                                {application.job.salary}
                              </span>
                            </div>
                          )}
                          {application.availableFrom && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Available from{" "}
                              {new Date(
                                application.availableFrom
                              ).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {application.jobId && (
                            <Link
                              href={`/job/${application.job.title}?id=${application.jobId}`}
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-transparent"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View Job
                              </Button>
                            </Link>
                          )}
                          {application.status === "pending" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleWithdraw(application.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Withdraw
                            </Button>
                          )}
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

      {/* Tips Section */}
      {applications.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Keep Your Job Search Active
              </h2>
              <p className="text-xl text-gray-600">
                Tips to improve your application success rate
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">
                    Follow Up
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Send a polite follow-up email 1-2 weeks after applying to
                    show continued interest.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">
                    Network
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Connect with employees at companies you're interested in
                    through LinkedIn and professional events.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Star className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">
                    Keep Applying
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Apply to multiple positions regularly. The more applications
                    you submit, the higher your chances.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Link href="/browse-jobs">
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Continue Job Search
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
