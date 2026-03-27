import React from "react";

const CodingProfileSkeleton = () => {
  return (
    <section className="relative py-16 md:py-24 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Skeleton */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block mb-6">
            <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
          </div>
          <div className="h-12 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-5 w-96 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto animate-pulse" />
        </div>

        {/* Stats Overview Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50"
            >
              <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Platform Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-white/80 dark:bg-gray-800/80"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
                <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
              </div>
              <div className="mb-6">
                <div className="h-7 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
              <div className="space-y-4 mb-8">
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
              <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CodingProfileSkeleton;
