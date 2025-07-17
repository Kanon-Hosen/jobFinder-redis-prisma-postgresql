import { Star } from "lucide-react";
import JobCard from "../JobCard";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Briefcase } from "lucide-react";
import { ArrowRight } from "lucide-react";

export default function FeaturedJobs({loading, featuredJobs}) {
      
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto md:px-6 px-2">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Hand-picked for you
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Opportunities
          </h2>
          <p className="text-xl text-gray-600">
            Premium jobs from top companies
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-600 border-t-transparent absolute top-0"></div>
            </div>
            <span className="ml-6 text-xl text-gray-600">
              Curating the best opportunities...
            </span>
          </div>
        ) : featuredJobs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {featuredJobs.map((job, index) => (
                <div
                  key={index}
                  className="transform transition-all duration-300"
                >
                  <JobCard job={job} />
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/browse-jobs">
                <Button
                  size="lg"
                  className="bg-gradient-to-r cursor-pointer from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl"
                >
                  Discover All Opportunities
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <Card className="text-center py-16 bg-white shadow-lg">
            <CardContent>
              <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                No featured jobs yet
              </h3>
              <p className="text-gray-600 mb-8">
                Be the first to post an amazing opportunity!
              </p>
              <Link href="/post-job">
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-8 py-3 font-semibold rounded-xl">
                  Post the First Job
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
