import { Briefcase } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl">JobFinder</span>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Connecting extraordinary talent with innovative companies. Your
              career adventure starts here.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                <span className="text-sm font-bold">f</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                <span className="text-sm font-bold">t</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                <span className="text-sm font-bold">in</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-6">For Job Seekers</h3>
            <ul className="space-y-4 text-gray-400">
              <li>
                <Link
                  href="/browse-jobs"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Create Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/career-advice"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Career Advice
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-6">For Employers</h3>
            <ul className="space-y-4 text-gray-400">
              <li>
                <Link
                  href="/post-job"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Contact Sales
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>
            &copy; 2024 JobFinder. Crafted with ❤️ for dreamers and achievers.
          </p>
        </div>
      </div>
    </footer>
  );
}
