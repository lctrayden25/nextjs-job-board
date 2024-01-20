import React from "react";
import JobListItem from "./JobListItem";
import { JobFilterValues } from "@/lib/validation";

interface JobResultsProps {
  filterValues: JobFilterValues;
}

const JobResults = async ({
  filterValues: { q, location, remote, type },
}: JobResultsProps) => {
  const jobs = await prisma?.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="grow space-y-4">
      {jobs?.map((job) => <JobListItem job={job} key={job?.id} />)}
    </div>
  );
};

export default JobResults;
