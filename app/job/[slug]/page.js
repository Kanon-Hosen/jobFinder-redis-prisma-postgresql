"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Briefcase,
  Building2,
  MapPin,
  Clock,
  DollarSign,
  CalendarDays,
  Sparkles,
  Users,
  ExternalLink,
  Loader2,
} from "lucide-react";
import ApplyJob from "@/components/ApplyJob";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function JobDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [job, setJob] = useState(null);
  const [isloading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openModal, setopenModal] = useState(false);
  const { user, loading } = useCurrentUser();


  useEffect(() => {
    if (loading) return;
    if (!user.email) {
      router.replace("/login");
    }
  }, [user, loading]);
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    fetch(`/api/jobs/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch job");
        return res.json();
      })
      .then((data) => setJob(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  console.log(job);
  if (isloading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex justify-center items-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading job details...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex justify-center items-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ExternalLink className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-red-600 text-lg font-medium">{error}</p>
        </div>
      </div>
    );

  if (!job)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex justify-center items-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600 text-lg">No job found.</p>
        </div>
      </div>
    );

  // const handleApply = async () => {
  //   try {
  //     const res = await fetch("/api/apply", {
  //       method: "POST",
  //       headers: {
  //         "conten-type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         jobId: job.id,
  //       }),
  //     });
  //     console.log(res)
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // };

  // open modal ::::::::::::::::::::::::::::::::::::::::::::

  if (openModal) {
    return <ApplyJob setopenModal={setopenModal} />;
  }

  const deadlineDate = new Date(job.applicationDeadline);
  const deadlineOver = deadlineDate < new Date();

  const isApplied = job.applies.some((apply) => user?.id === apply.userId);
  console.log(isApplied);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-8 md:px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 text-white">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                    <Briefcase className="w-8 h-8" />
                  </div>
                  {job.title}
                </h1>
                <div className="space-y-3">
                  <p className="flex items-center gap-3 text-emerald-100 text-lg">
                    <Building2 size={20} />
                    {job.company}
                  </p>
                  <p className="flex items-center gap-3 text-emerald-100">
                    <MapPin size={18} />
                    {job.location}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <span
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm ${
                    job.type === "Remote"
                      ? "bg-green-500/20 text-green-100 border border-green-400/30"
                      : job.type === "Full-time"
                      ? "bg-blue-500/20 text-blue-100 border border-blue-400/30"
                      : job.type === "Part-time"
                      ? "bg-yellow-500/20 text-yellow-100 border border-yellow-400/30"
                      : "bg-purple-500/20 text-purple-100 border border-purple-400/30"
                  }`}
                >
                  <Clock size={16} />
                  {job.type}
                </span>
                <div className="flex items-center gap-3 text-emerald-100">
                  <Users size={18} />
                  <span className="text-sm">
                    <span className="font-semibold text-white">
                      {job.applies?.length || "0"}
                    </span>{" "}
                    applications
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="p-8 bg-gray-50/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <DollarSign className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Salary</p>
                  <p className="text-xl font-bold text-gray-900">
                    ${job.salary}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-teal-100 rounded-xl">
                  <CalendarDays className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Posted</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Applications</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {job.applies?.length || "0"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Briefcase className="w-5 h-5 text-emerald-600" />
                </div>
                Job Description
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="whitespace-pre-line text-gray-700 leading-relaxed text-lg">
                  {job.description}
                </p>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Clock className="w-5 h-5 text-teal-600" />
                </div>
                Requirements
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="whitespace-pre-line text-gray-700 leading-relaxed text-lg">
                  {job.requirements}
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Sparkles className="w-5 h-5 text-green-600" />
                </div>
                Benefits & Perks
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {job.benefits?.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Ready to Apply?
                </h3>
                <p className="text-gray-600 text-sm">
                  Join {job.applies?.length || "0"} other candidates
                </p>
              </div>
              {isApplied && (
                <div className="flex items-center justify-center py-3 font-semibold text-green-500">
                  <span>Already Applied</span>
                </div>
              )}
              {loading ? (
                <p>Loading...</p>
              ) : (
                <button
                  onClick={() => {
                    if (user?.role !== "EMPLOYER") setopenModal(true);
                  }}
                  disabled={
                    user?.role === "EMPLOYER" || isApplied || deadlineOver
                  }
                  className={`w-full px-6 py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 font-semibold text-lg shadow-lg transform hover:-translate-y-0.5 ${
                    user?.role === "EMPLOYER" || deadlineDate
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 hover:shadow-xl"
                  }`}
                >
                  <Briefcase size={20} />
                  Apply Now
                </button>
              )}

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Application Status</span>
                  <span className="text-emerald-600 font-medium">Open</span>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-gray-600" />
                About {job.company}
              </h3>
              <p>Coming soon</p>
            </div>

            {/* Application Stats */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-600" />
                Application Insights
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Total Applications
                  </span>
                  <span className="font-bold text-orange-600 text-lg">
                    {job.applies?.length || "0"}
                  </span>
                </div>
                <div className="w-full bg-orange-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full"
                    style={{
                      width: `${Math.min(
                        (job.applies?.length / 200) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">
                  {job.applies?.length < 50
                    ? "Low competition"
                    : job.applies?.length < 100
                    ? "Moderate competition"
                    : "High competition"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
