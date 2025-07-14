"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  User,
  FileText,
  Upload,
  Briefcase,
  MapPin,
  Calendar,
  CheckCircle,
  AlertCircle,
  Loader2,
  Building,
  Star,
  Send,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function ApplyJob({ setopenModal }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("id");
  console.log(searchParams);
  const [user, setUser] = useState(null);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const jobTitle = job?.title;
  console.log(job, user)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    coverLetter: "",
    experience: "",
    skills: "",
    portfolio: "",
    linkedIn: "",
    expectedSalary: "",
    availableFrom: "",
    resume: "",
    jobId,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userRes = await fetch("/api/me", { credentials: "include" });
        const userData = await userRes.json();
        setUser(userData);

        // Pre-fill email if user is logged in
        if (userData?.email) {
          setFormData((prev) => ({
            ...prev,
            email: userData.email,
          }));
        }

        // Fetch job data if jobId is provided
        if (jobId) {
          const jobRes = await fetch(`/api/jobs/${jobId}`);
          if (jobRes.ok) {
            const jobData = await jobRes.json();
            setJob(jobData);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [jobId]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     if (file.size > 5 * 1024 * 1024) {
  //       // 5MB limit
  //       setErrors((prev) => ({
  //         ...prev,
  //         resume: "File size must be less than 5MB",
  //       }));
  //       return;
  //     }
  //     if (!file.type.includes("pdf") && !file.type.includes("doc")) {
  //       setErrors((prev) => ({
  //         ...prev,
  //         resume: "Please upload a PDF or DOC file",
  //       }));
  //       return;
  //     }
  //     setFormData((prev) => ({
  //       ...prev,
  //       resume: file,
  //     }));
  //     setErrors((prev) => ({
  //       ...prev,
  //       resume: "",
  //     }));
  //   }
  // };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.coverLetter.trim())
      newErrors.coverLetter = "Cover letter is required";
    if (formData.coverLetter.length < 100)
      newErrors.coverLetter = "Cover letter should be at least 100 characters";
    if (!formData.experience.trim())
      newErrors.experience = "Experience details are required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Create FormData for file upload
      // const submitData = new FormData();
      // Object.keys(formData).forEach((key) => {
      //   if (formData[key] !== null && formData[key] !== "") {
      //     submitData.append(key, formData[key]);
      //   }
      // });

      // Add job and application metadata
      // submitData.append("jobId", jobId || "");
      // submitData.append("jobTitle", jobTitle || "");
      // submitData.append("applyDate", new Date().toISOString());
      // submitData.append("status", "pending");
      // console.log(submitData)
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/applies-jobs");
        }, 3000);
      } else {
        const errorData = await response.json();
        setErrors({
          submit: errorData.message || "Failed to submit application",
        });
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center">
        <Card className="max-w-lg mx-auto text-center bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
          <CardContent className="p-12">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Application Submitted!
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              Your application has been successfully submitted. The employer
              will review it and get back to you soon.
            </p>
            <div className="flex items-center justify-center gap-2 text-emerald-600 mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">
                We`&apos;`ll notify you of any updates
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Redirecting to your applications...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading application form...</p>
        </div>
      </div>
    );
  }
  const deadlineDate =
    new Date(job?.applicationDeadline).toLocaleDateString() >= new Date();
  
  if (deadlineDate) {
     router.push("/")
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-10">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <button
              onClick={() => setopenModal(false)}
              className="inline-flex items-center cursor-pointer gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-2 text-white mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to {jobId ? "Job Details" : "Browse Jobs"}</span>
            </button>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-6">
                <Send className="w-4 h-4 text-white" />
                <span className="text-white font-medium">
                  Apply for Position
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                Apply for
                <span className="block bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  {jobTitle || "This Position"}
                </span>
              </h1>

              <p className="text-xl text-emerald-100 mb-4 max-w-3xl mx-auto leading-relaxed">
                Take the next step in your career journey. Fill out the
                application below and showcase why you`&apos;`re the perfect
                fit.
              </p>
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
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Application Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-t-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900">
                        Application Form
                      </CardTitle>
                      <p className="text-gray-600">
                        Tell us about yourself and why you`&apos;`re interested
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-8">
                  {errors.submit && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.submit}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Personal Information */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                          <User className="w-5 h-5 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">
                          Personal Information
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">
                            Full Name *
                          </label>
                          <Input
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={(e) =>
                              handleInputChange("fullName", e.target.value)
                            }
                            className={`h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 ${
                              errors.fullName ? "border-red-500" : ""
                            }`}
                          />
                          {errors.fullName && (
                            <p className="text-sm text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.fullName}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">
                            Email Address *
                          </label>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            className={`h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 ${
                              errors.email ? "border-red-500" : ""
                            }`}
                          />
                          {errors.email && (
                            <p className="text-sm text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">
                            Phone Number *
                          </label>
                          <Input
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            value={formData.phone}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                            className={`h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 ${
                              errors.phone ? "border-red-500" : ""
                            }`}
                          />
                          {errors.phone && (
                            <p className="text-sm text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.phone}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">
                            Location
                          </label>
                          <Input
                            placeholder="City, State/Country"
                            value={formData.location}
                            onChange={(e) =>
                              handleInputChange("location", e.target.value)
                            }
                            className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Resume Upload */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-teal-100 rounded-lg">
                          <Upload className="w-5 h-5 text-teal-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">
                          Resume
                        </h3>
                      </div>

                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors">
                        <Input
                          placeholder="Enter your resume drive link"
                          value={formData.resume}
                          onChange={(e) =>
                            handleInputChange("resume", e.target.value)
                          }
                          className={`h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 ${
                            errors.fullName ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                    </div>

                    {/* Cover Letter */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">
                          Cover Letter *
                        </h3>
                      </div>

                      <div className="space-y-2">
                        <Textarea
                          placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                          value={formData.coverLetter}
                          onChange={(e) =>
                            handleInputChange("coverLetter", e.target.value)
                          }
                          rows={6}
                          className={`border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 resize-none ${
                            errors.coverLetter ? "border-red-500" : ""
                          }`}
                        />
                        <div className="flex justify-between items-center">
                          {errors.coverLetter && (
                            <p className="text-sm text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.coverLetter}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 ml-auto">
                            {formData.coverLetter.length}/100 minimum characters
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Experience & Skills */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Briefcase className="w-5 h-5 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">
                          Experience & Skills
                        </h3>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">
                          Work Experience *
                        </label>
                        <Textarea
                          placeholder="Describe your relevant work experience, achievements, and responsibilities..."
                          value={formData.experience}
                          onChange={(e) =>
                            handleInputChange("experience", e.target.value)
                          }
                          rows={4}
                          className={`border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 resize-none ${
                            errors.experience ? "border-red-500" : ""
                          }`}
                        />
                        {errors.experience && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.experience}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">
                          Key Skills
                        </label>
                        <Textarea
                          placeholder="List your key skills, technologies, and competencies relevant to this role..."
                          value={formData.skills}
                          onChange={(e) =>
                            handleInputChange("skills", e.target.value)
                          }
                          rows={3}
                          className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 resize-none"
                        />
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <Star className="w-5 h-5 text-orange-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">
                          Additional Information
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">
                            Portfolio/Website
                          </label>
                          <Input
                            type="url"
                            placeholder="https://yourportfolio.com"
                            value={formData.portfolio}
                            onChange={(e) =>
                              handleInputChange("portfolio", e.target.value)
                            }
                            className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">
                            LinkedIn Profile
                          </label>
                          <Input
                            type="url"
                            placeholder="https://linkedin.com/in/yourprofile"
                            value={formData.linkedIn}
                            onChange={(e) =>
                              handleInputChange("linkedIn", e.target.value)
                            }
                            className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">
                            Expected Salary
                          </label>
                          <Input
                            placeholder="e.g. $80,000 - $100,000"
                            value={formData.expectedSalary}
                            onChange={(e) =>
                              handleInputChange(
                                "expectedSalary",
                                e.target.value
                              )
                            }
                            className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">
                            Available From
                          </label>
                          <Input
                            type="date"
                            value={formData.availableFrom}
                            onChange={(e) =>
                              handleInputChange("availableFrom", e.target.value)
                            }
                            className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-8">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-12 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 rounded-2xl"
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Submitting Application...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Send className="w-5 h-5" />
                            Submit Application
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Job Summary */}
              {job && (
                <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg sticky top-8">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-emerald-600" />
                      Job Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {job.company}
                      </p>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      {job.salary && (
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-600 font-semibold">
                            ${Number(job.salary).toLocaleString()}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Posted {new Date(job.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    {job.type && (
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                        {job.type}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Application Tips */}
              <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                    Application Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Tailor your cover letter to the specific role and company
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Highlight relevant experience and achievements</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Keep your resume updated and error-free</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Include links to your portfolio or relevant work
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
