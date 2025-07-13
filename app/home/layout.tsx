import React, { ReactNode, Suspense } from "react";

interface HomeLayoutProps {
  banner: ReactNode;
  categories: ReactNode;
  children: ReactNode;
}

export default function HomeLayout({
  children,
  banner,
  categories,
}: HomeLayoutProps) {
  return (
    <React.Fragment>
      <Suspense fallback={<div>ddd</div>}>{banner}</Suspense>
      {children}
      <Suspense fallback={<div>ddd</div>}>{categories}</Suspense>
    </React.Fragment>
  );
}
