import React, { cache } from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import JobDetail from "@/components/JobDetail";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: {
    slug: string;
  };
}

const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: { slug },
  });

  if (!job) notFound();

  return job;
});

//caching the dynamic page with slug
export async function generateStaticParams() {
    const jobs = await prisma.job.findMany({
      where: { approved: true },
      select: { slug: true },
    });
  
    return jobs?.map(({ slug }) => slug);
  };

export const generateMetadata = async ({
  params: { slug },
}: PageProps): Promise<Metadata> => {
  const job = await prisma.job.findUnique({
    where: { slug },
  });
  return {
    title: job?.title,
  };
};

const page = async ({ params: { slug } }: PageProps) => {
  const job = await getJob(slug);

  const applicationLink = job?.applicationEmail
    ? `mailto:${job?.applicationEmail}`
    : job?.applicationUrl;

  if (!applicationLink) {
    console.log("Link not found");
    notFound();
  }

  return (
    <main className="mx-auto my-10 flex max-w-5xl flex-col items-center gap-5 p-3 md:flex-row md:items-start">
      <JobDetail job={job} />
      <aside>
        <Button asChild>
          <a href={applicationLink} className="w-full md:w-fit">Apply Now</a>
        </Button>
      </aside>
    </main>
  );
};

export default page;
