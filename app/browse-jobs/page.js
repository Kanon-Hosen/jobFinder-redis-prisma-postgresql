import { Suspense } from "react";
import Loading from "@/components/Loading";
import BrowseJobs from "@/components/browse-job/BrowseJobs";

export default function BrowseJobsPage() {
  return (
    <Suspense fallback={<Loading/>}>
      <BrowseJobs />
    </Suspense>
  );
}
