"use client";

import { useState } from "react";
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
];

export default function PostJob() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    type: "",
    salary: "",
    company: "",
    requirements: "",
    benefits: [],
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBenefitToggle = (benefit) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.includes(benefit)
        ? prev.benefits.filter((b) => b !== benefit)
        : [...prev.benefits, benefit],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    console.log(formData)
    // try {
    //   const response = await fetch("/api/jobs/", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       ...formData,
    //       applies: [],
    //     }),
    //   });

    //   if (response.ok) {
    //     setSuccess(true);
    //     setTimeout(() => {
    //       router.push("/browse-jobs");
    //     }, 2000);
    //   } else {
    //     throw new Error("Failed to post job");
    //   }
    // } catch (error) {
    //   console.error("Error posting job:", error);
    //   alert("Failed to post job. Please try again.");
    // } finally {
    //   setLoading(false);
    // }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Job Posted Successfully!
            </h2>
            <p className="text-gray-600 mb-4">
              Your job listing is now live and visible to candidates.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to browse jobs...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <Briefcase className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">Post a Job</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Your Next Team Member
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Post your job opening and connect with talented professionals
            looking for their next opportunity
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 -mt-8 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Job Details
              </CardTitle>
              <p className="text-gray-600">
                Fill in the information below to post your job listing
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
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
                      required
                      className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Company Name *
                    </label>
                    <Input
                      placeholder="e.g. TechCorp Inc."
                      value={formData.company}
                      onChange={(e) =>
                        handleInputChange("company", e.target.value)
                      }
                      required
                      className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      required
                      className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Job Type *
                    </label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) =>
                        handleInputChange("type", value)
                      }
                      required
                    >
                      <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
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
                  </div>
                </div>

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
                    className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                {/* Job Description */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Job Description *
                  </label>
                  <Textarea
                    placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    required
                    rows={6}
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
                  />
                </div>

                {/* Requirements */}
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
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
                  />
                </div>

                {/* Benefits */}
                <div className="space-y-4">
                  <label className="text-sm font-semibold text-gray-700">
                    Benefits & Perks
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {benefits.map((benefit) => (
                      <div
                        key={benefit}
                        onClick={() => handleBenefitToggle(benefit)}
                        className={`cursor-pointer p-3 rounded-lg border-2 transition-all duration-200 ${
                          formData.benefits.includes(benefit)
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{benefit}</span>
                          {formData.benefits.includes(benefit) && (
                            <CheckCircle className="w-4 h-4 text-blue-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                {formData.title && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Preview
                    </h3>
                    <Card className="border-2 border-dashed border-gray-200">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                            {formData.title.charAt(0).toUpperCase()}
                          </div>
                          {formData.type && (
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                              {formData.type}
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {formData.title}
                        </h3>
                        {formData.company && (
                          <p className="text-gray-600 mb-2">
                            {formData.company}
                          </p>
                        )}
                        {formData.description && (
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {formData.description}
                          </p>
                        )}
                        {formData.location && (
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <MapPin className="w-4 h-4 mr-1" />
                            {formData.location}
                          </div>
                        )}
                        {formData.salary && (
                          <div className="flex items-center text-sm text-gray-500">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {formData.salary}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <Button
                    type="submit"
                    disabled={
                      loading ||
                      !formData.title ||
                      !formData.description ||
                      !formData.location ||
                      !formData.type
                    }
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Posting Job...
                      </>
                    ) : (
                      <>
                        <Briefcase className="w-5 h-5 mr-2" />
                        Post Job
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Tips for a Great Job Posting
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Be Specific
                </h3>
                <p className="text-gray-600 text-sm">
                  Include detailed job requirements and responsibilities to
                  attract the right candidates.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Include Salary
                </h3>
                <p className="text-gray-600 text-sm">
                  Transparent salary ranges help attract serious candidates and
                  save everyone time.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Highlight Culture
                </h3>
                <p className="text-gray-600 text-sm">
                  Showcase your company culture and benefits to stand out from
                  other opportunities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
