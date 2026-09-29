import React from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { categories, products } from "@/data/robotics";
import { solutionsData } from "@/data/solutions";
import { applicationsData } from "@/data/applications";
import { technologiesData } from "@/data/technologies";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumbs() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  // Don't render breadcrumbs on homepage
  if (pathname === "/" || pathname === "") {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];
  let currentPath = "";

  segments.forEach((seg, idx) => {
    currentPath += `/${seg}`;

    // Resolve human-readable labels
    let label = seg
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    // Check custom mappings
    if (seg === "products") label = "Products";
    else if (seg === "solutions") label = "Solutions";
    else if (seg === "applications") label = "Applications";
    else if (seg === "technology") label = "Technology";
    else if (seg === "resources") label = "Resources";
    else if (seg === "about") label = "About";
    else if (seg === "contact") label = "Contact";
    else if (seg === "engineering-enquiry") label = "Engineering Enquiry";
    else if (seg === "faqs") label = "FAQs & Knowledge";
    else if (seg === "engineering") label = "Engineering Approach";
    else {
      // Check categories
      const cat = categories.find((c) => c.slug === seg);
      if (cat) label = cat.title;

      // Check products
      const prod = products.find((p) => p.slug === seg || p.id === seg);
      if (prod) label = prod.name;

      // Check solutions
      const sol = solutionsData.find((s) => s.id === seg);
      if (sol) label = sol.title;

      // Check applications
      const app = applicationsData.find((a) => a.id === seg);
      if (app) label = app.title;

      // Check technologies
      const tech = technologiesData.find((t) => t.id === seg);
      if (tech) label = tech.title;
    }

    breadcrumbs.push({ label, href: currentPath });
  });

  const parentBreadcrumb =
    breadcrumbs.length > 2 ? breadcrumbs[breadcrumbs.length - 2] : breadcrumbs[0];

  return (
    <div className="border-b border-border/30 bg-card/60 px-5 py-3 text-xs lg:px-10">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-2">
        {/* Clickable Trail */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center space-x-1.5 overflow-x-auto text-muted-foreground"
        >
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <React.Fragment key={item.href}>
                {index > 0 && (
                  <ChevronRight size={12} className="shrink-0 text-muted-foreground/40" />
                )}
                {isLast ? (
                  <span
                    className="font-bold text-foreground truncate max-w-[200px] sm:max-w-none"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.href}
                    className="hover:text-signal transition-colors font-medium hover:underline shrink-0"
                  >
                    {item.label}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </nav>

        {/* Back navigation link (Section 44) */}
        {breadcrumbs.length > 2 && (
          <Link
            to={parentBreadcrumb.href}
            className="hidden items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:text-signal sm:inline-flex"
          >
            <ArrowLeft size={12} />
            Back to {parentBreadcrumb.label}
          </Link>
        )}
      </div>
    </div>
  );
}
