import { Sparkles } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Code } from "lucide-react";
import { Megaphone } from "lucide-react";
import { Palette } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Calculator } from "lucide-react";
import { Heart } from "lucide-react";
const categories = [
  {
    name: "Technology",
    count: "3,200+ jobs",
    icon: Code,
    color: "from-emerald-400 to-teal-500",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
    description: "Software, AI, Web Development",
  },
  {
    name: "Marketing",
    count: "1,800+ jobs",
    icon: Megaphone,
    color: "from-pink-400 to-rose-500",
    bgColor: "bg-pink-50",
    textColor: "text-pink-700",
    description: "Digital, Content, Growth",
  },
  {
    name: "Design",
    count: "1,200+ jobs",
    icon: Palette,
    color: "from-purple-400 to-violet-500",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
    description: "UI/UX, Graphic, Product",
  },
  {
    name: "Sales",
    count: "2,100+ jobs",
    icon: ShoppingCart,
    color: "from-orange-400 to-amber-500",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
    description: "B2B, SaaS, Enterprise",
  },
  {
    name: "Finance",
    count: "900+ jobs",
    icon: Calculator,
    color: "from-blue-400 to-cyan-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    description: "Fintech, Banking, Investment",
  },
  {
    name: "Healthcare",
    count: "1,500+ jobs",
    icon: Heart,
    color: "from-red-400 to-pink-500",
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    description: "Medical, Nursing, Research",
  },
];
export default function Categories() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Explore Opportunities
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Find Your Perfect
            <span className="block text-emerald-600">Career Path</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover thousands of opportunities across diverse industries and
            find where your passion meets purpose
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 bg-white overflow-hidden hover:scale-105"
              >
                <CardContent className="p-0">
                  {/* Gradient Header */}
                  <div
                    className={`h-32 bg-gradient-to-br ${category.color} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-4 right-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-6">
                      <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 font-medium">
                        {category.count}
                      </Badge>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
                    <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/10 rounded-full"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm font-semibold ${category.textColor}`}
                      >
                        View Opportunities
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
