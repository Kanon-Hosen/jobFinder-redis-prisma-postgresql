import { Loader2 } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
