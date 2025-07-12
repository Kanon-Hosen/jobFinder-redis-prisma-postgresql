"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  FileText,
  Building,
  Users,
  CheckCircle,
  Sparkles,
  Star,
  TrendingUp,
  AlertCircle,
  Loader2,
  Eye,
  Plus,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
const workSetting = ["In Person", "Remote", "Hybrid"];

const benefits = [
  "Health Insurance",
  "Dental Insurance",
  "Vision Insurance",
  "401(k)",
  "Paid Time Off",
  "Remote Work",
  "Flexible Hours",
  "Professional Development",
  "Stock Options",
  "Gym Membership",
  "Mental Health Support",
  "Parental Leave",
];

const experienceLevels = [
  "Entry Level",
  "Mid Level",
  "Senior Level",
  "Lead/Principal",
  "Executive",
];

export default function PostJob() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setUser(null);
      })
      .finally(() => {
        setisLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!isLoading && !user?.email) {
      return router.replace("/login");
    }
  }, [user, isLoading]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    type: "",
    workSetting: "",
    salary: "",
    company: "",
    requirements: "",
    benefits: [],
    experienceLevel: "",
    applicationDeadline: "",
  });

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

  const handleBenefitToggle = (benefit) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.includes(benefit)
        ? prev.benefits.filter((b) => b !== benefit)
        : [...prev.benefits, benefit],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Job title is required";
    if (!formData.company.trim())
      newErrors.company = "Company name is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.type) newErrors.type = "Job type is required";
    if (!formData.description.trim())
      newErrors.description = "Job description is required";
    if (formData.description.length < 100)
      newErrors.description = "Description should be at least 100 characters";

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
      const response = await fetch("/api/jobs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          createdAt: new Date().toISOString(),
          applies: [],
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/browse-jobs");
        }, 2000);
      } else {
        throw new Error("Failed to post job");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      setErrors({ submit: "Failed to post job. Please try again." });
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
              Job Posted Successfully!
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              Your job listing is now live and visible to thousands of talented
              candidates.
            </p>
            <div className="flex items-center justify-center gap-2 text-emerald-600 mb-4">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">
                Already getting views!
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Redirecting to browse jobs...
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
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Enhanced Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Floating Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-8">
              <Briefcase className="w-4 h-4 text-white" />
              <span className="text-white font-medium">Post a Job</span>
              <Sparkles className="w-4 h-4 text-yellow-300" />
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Find Your Next
              <span className="block bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent">
                Team Member
              </span>
            </h1>

            <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with thousands of talented professionals actively seeking
              their next opportunity. Post your job and start receiving
              applications today.
            </p>

            {/* Stats */}
            <div className="flex justify-center items-center gap-8 mb-8">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Users className="w-4 h-4 text-green-300" />
                <span className="text-white text-sm font-medium">
                  50,000+ Active Candidates
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <TrendingUp className="w-4 h-4 text-yellow-300" />
                <span className="text-white text-sm font-medium">
                  95% Match Rate
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-20 fill-slate-50">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 -mt-16 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader className="text-center pb-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-t-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                Create Job Listing
              </CardTitle>
              <p className="text-gray-600 text-lg">
                Fill in the details below to attract the perfect candidates for
                your role
              </p>
            </CardHeader>

            <CardContent className="p-8">
              {errors.submit && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.submit}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <Building className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Basic Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        Job Title *
                      </label>
                      <Input
                        placeholder="e.g. Senior Frontend Developer"
                        value={formData.title}
                        onChange={(e) =>
                          handleInputChange("title", e.target.value)
                        }
                        className={`h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 ${
                          errors.title ? "border-red-500" : ""
                        }`}
                      />
                      {errors.title && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.title}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        Company Name *
                      </label>
                      <Input
                        placeholder="e.g. TechCorp Inc."
                        value={user.company}
                        onChange={(e) =>
                          handleInputChange("company", e.target.value)
                        }
                        className={`h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 ${
                          errors.company ? "border-red-500" : ""
                        }`}
                      />
                      {errors.company && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.company}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Location *
                      </label>
                      <Input
                        placeholder="e.g. San Francisco, CA or Remote"
                        value={formData.location}
                        onChange={(e) =>
                          handleInputChange("location", e.target.value)
                        }
                        className={`h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 ${
                          errors.location ? "border-red-500" : ""
                        }`}
                      />
                      {errors.location && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.location}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Job Type *
                      </label>
                      <Select
                        value={formData?.type}
                        onValueChange={(value) =>
                          handleInputChange("type", value)
                        }
                      >
                        <SelectTrigger
                          className={`h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 ${
                            errors.type ? "border-red-500" : ""
                          }`}
                        >
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                          {jobTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.type && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.type}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Work Setting *
                      </label>
                      <Select
                        value={formData?.workSetting}
                        onValueChange={(value) =>
                          handleInputChange("workSetting", value)
                        }
                      >
                        <SelectTrigger
                          className={`h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 ${
                            errors.type ? "border-red-500" : ""
                          }`}
                        >
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                          {workSetting.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.type && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.type}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        Experience Level
                      </label>
                      <Select
                        value={formData?.experienceLevel}
                        onValueChange={(value) =>
                          handleInputChange("experienceLevel", value)
                        }
                      >
                        <SelectTrigger className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          {experienceLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Salary Range
                      </label>
                      <Input
                        placeholder="e.g. $80,000 - $120,000 per year"
                        value={formData.salary}
                        onChange={(e) =>
                          handleInputChange("salary", e.target.value)
                        }
                        className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Application Deadline
                      </label>
                      <Input
                        type="date"
                        value={formData.applicationDeadline}
                        onChange={(e) =>
                          handleInputChange(
                            "applicationDeadline",
                            e.target.value
                          )
                        }
                        className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Job Details */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-teal-100 rounded-lg">
                      <FileText className="w-5 h-5 text-teal-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Job Details
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Job Description *
                    </label>
                    <Textarea
                      placeholder="Describe the role, responsibilities, company culture, and what makes this opportunity exciting..."
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      rows={6}
                      className={`border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 resize-none ${
                        errors.description ? "border-red-500" : ""
                      }`}
                    />
                    <div className="flex justify-between items-center">
                      {errors.description && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 ml-auto">
                        {formData.description.length}/100 minimum characters
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Requirements & Qualifications
                    </label>
                    <Textarea
                      placeholder="List the required skills, experience, education, and qualifications..."
                      value={formData.requirements}
                      onChange={(e) =>
                        handleInputChange("requirements", e.target.value)
                      }
                      rows={4}
                      className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 resize-none"
                    />
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Sparkles className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Benefits & Perks
                    </h3>
                    <Badge className="bg-emerald-100 text-emerald-700 border-0">
                      Optional
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {benefits.map((benefit) => (
                      <div
                        key={benefit}
                        onClick={() => handleBenefitToggle(benefit)}
                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                          formData.benefits.includes(benefit)
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-lg"
                            : "border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{benefit}</span>
                          {formData.benefits.includes(benefit) ? (
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Plus className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {formData.benefits.length > 0 && (
                    <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                      <p className="text-sm font-medium text-emerald-800 mb-2">
                        Selected Benefits:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {formData.benefits.map((benefit) => (
                          <Badge
                            key={benefit}
                            className="bg-emerald-100 text-emerald-700 border-emerald-300 hover:bg-emerald-200 cursor-pointer"
                            onClick={() => handleBenefitToggle(benefit)}
                          >
                            {benefit}
                            <X className="w-3 h-3 ml-1" />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Preview */}
                {formData.title && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Eye className="w-5 h-5 text-orange-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Preview
                      </h3>
                      <Badge className="bg-orange-100 text-orange-700 border-0">
                        How it will look
                      </Badge>
                    </div>

                    <Card className="border-2 border-dashed border-emerald-200 bg-emerald-50/30">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                              {formData.title.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-1">
                                {formData.title}
                              </h3>
                              {formData.company && (
                                <p className="text-gray-600 font-medium">
                                  {formData.company}
                                </p>
                              )}
                            </div>
                          </div>
                          {formData.type && (
                            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                              {formData.type}
                            </Badge>
                          )}
                        </div>

                        {formData.description && (
                          <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">
                            {formData.description}
                          </p>
                        )}

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          {formData.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {formData.location}
                            </div>
                          )}
                          {formData.salary && (
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              {formData.salary}
                            </div>
                          )}
                          {formData.experienceLevel && (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4" />
                              {formData.experienceLevel}
                            </div>
                          )}
                        </div>

                        {formData.benefits.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex flex-wrap gap-2">
                              {formData.benefits.slice(0, 3).map((benefit) => (
                                <Badge
                                  key={benefit}
                                  className="bg-green-100 text-green-700 border-0 text-xs"
                                >
                                  {benefit}
                                </Badge>
                              ))}
                              {formData.benefits.length > 3 && (
                                <Badge className="bg-gray-100 text-gray-600 border-0 text-xs">
                                  +{formData.benefits.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-center pt-8">
                  <Button
                    type="submit"
                    disabled={
                      loading ||
                      !formData.title ||
                      !formData.description ||
                      !formData.location ||
                      !formData.type
                    }
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-12 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 rounded-2xl"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Posting Job...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Post Job & Go Live
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Enhanced Tips Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              Pro Tips
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Create a Standout Job Posting
            </h2>
            <p className="text-xl text-gray-600">
              Follow these best practices to attract top talent
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">
                  Be Specific & Clear
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Include detailed job requirements and responsibilities to
                  attract the right candidates and reduce irrelevant
                  applications.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">
                  Include Salary Range
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Transparent salary ranges help attract serious candidates,
                  save time, and increase application rates by up to 30%.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">
                  Highlight Culture
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Showcase your company culture, values, and unique benefits to
                  stand out from other opportunities and attract culture fits.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">
                  Optimize for Search
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Use relevant keywords and industry terms that candidates
                  search for to improve visibility and reach the right talent.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Success Stats */}
          <div className="mt-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-6">
              Join Successful Companies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="text-emerald-100">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">2.5x</div>
                <div className="text-emerald-100">Faster Hiring</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">50k+</div>
                <div className="text-emerald-100">Active Candidates</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
