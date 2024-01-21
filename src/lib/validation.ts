import { optional, z } from "zod";
import { jobTypes, locationType } from "./job-types";

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

const requiredString = z.string().min(1, "Requried");
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");

const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).url().optional().or(z.literal("")),
  })
  .refine((data) => data?.applicationEmail || data?.applicationUrl, {
    message: "Email or url is required.",
    path: ["applicationEmail"],
  });

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) =>
      !file || (file instanceof File && file?.type?.startsWith("image/")),
    "File must be an image file",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "File must be less than 2MB");

const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (value) => locationType?.includes(value),
      "Invalid location type",
    ),
    location: z.string().optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "Remote" || data.location,
    {
      message: "Location is reuqired for on-site jobs",
      path: ["location"],
    },
  );

export const createJobsSchema = z
  .object({
    title: requiredString.max(100),
    type: requiredString.refine(
      (value) => jobTypes?.includes(value),
      "Invalid job type",
    ),
    companyName: requiredString.max(100),
    companyLogo: companyLogoSchema,
    description: z.string().max(100).optional(),
    salary: numericRequiredString.max(9, "Number cannot larger than 9 digits"),
  })
  .and(applicationSchema)
  .and(locationSchema);

export type JobFilterValues = z.infer<typeof jobFilterSchema>;
export type CreateJobValues = z.infer<typeof createJobsSchema>;
