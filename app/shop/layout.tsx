import type React from "react";

export default function ShopLayout({
  children,
  filters,
}: {
  children: React.ReactNode;
  filters: React.ReactNode;
}) {
  return (
    <div className="px-4 pb-8  pt-24">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">{filters}</aside>

        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
