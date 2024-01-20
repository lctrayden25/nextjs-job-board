"use client";

import H1 from "@/components/ui/h1";

export default function Error() {
  return (
    <main className="m-auto my-10 flex h-screen max-w-5xl flex-col items-center justify-center space-y-5 px-3 text-center">
      <H1>Error</H1>
      <p>An unexpected error occured</p>
    </main>
  );
}
