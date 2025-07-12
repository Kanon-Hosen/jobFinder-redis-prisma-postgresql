import { Sparkles } from 'lucide-react';
import React from 'react'
import { Button } from './ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Cta() {
  return (
    <section className="py-24 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </div>
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold text-white mb-6">
          Ready to Transform
          <span className="block text-yellow-300">Your Career?</span>
        </h2>
        <p className="text-xl text-emerald-100 mb-12 max-w-3xl mx-auto leading-relaxed">
          Join thousands of professionals who have discovered their dream
          careers through our platform. Your next adventure is just one click
          away.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/register">
            <Button className="bg-white text-emerald-600 hover:bg-gray-100 px-10 py-5 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-2xl">
              Start Your Journey
              <Sparkles className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/browse-jobs">
            <Button
              variant="outline"
              className="border-2 border-white py-5 text-white hover:bg-white hover:text-emerald-600 px-10 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-transparent rounded-2xl"
            >
              Explore Opportunities
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
