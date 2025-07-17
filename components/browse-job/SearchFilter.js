"use client";

import { Card, CardContent } from "../ui/card";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Filter } from "lucide-react";
import { Badge } from "../ui/badge";

export default function SearchFilter({
  setSearchTerm,
  searchTerm,
  filterOptions,
  setFilter,
  filter,
}) {
  return (
    <Card className="mb-12  shadow-md border-0 bg-white/95 backdrop-blur-xl">
      <CardContent className="p-8">
        {/* Advanced Search Bar */}
        <div className="relative mb-8">
          <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search className="h-6 w-6" />
          </div>
          <Input
            type="text"
            placeholder="Search by title, company, skills, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-16 h-16 text-lg border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:border-emerald-300 transition-all duration-300 rounded-2xl shadow-sm"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            <Badge className="bg-emerald-100  text-emerald-700 border-0">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
            <Button
              size="sm"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-xl px-6 shadow-lg"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Smart Filters */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Filter className="h-5 w-5 text-emerald-600" />
            </div>
            <span className="text-lg font-semibold text-gray-800">
              Smart Filters
            </span>
            <Badge className="bg-orange-100 text-orange-700 border-0 text-xs">
              Real-time
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {filterOptions.map(({ type, icon, count }) => (
              <Button
                key={type}
                onClick={() => setFilter(type)}
                variant={filter === type ? "default" : "outline"}
                className={`h-16 flex flex-col items-center justify-center gap-1 transition-all duration-300 transform hover:scale-105 rounded-2xl ${
                  filter === type
                    ? "bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-lg"
                    : "hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="text-lg">{icon}</span>
                <span className="text-xs font-medium">{type}</span>
                <span className="text-xs opacity-75">({count})</span>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
