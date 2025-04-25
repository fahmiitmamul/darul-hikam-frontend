"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function DynamicBreadcrumb({
  homeLabel = "Dashboard",
  showHomeIcon = true,
  capitalizeItems = true,
  maxItems = 4,
}) {
  const pathname = usePathname();

  // Skip rendering breadcrumb on home page
  if (pathname === "/") {
    return null;
  }

  // Split the pathname into segments and remove empty strings
  const segments = pathname.split("/").filter(Boolean);

  // Handle case when there are too many segments
  const displaySegments =
    segments.length > maxItems
      ? [...segments.slice(0, 1), ...segments.slice(-maxItems + 1)]
      : segments;

  // Format a segment for display
  const formatSegment = (segment) => {
    // Replace hyphens and underscores with spaces
    const formatted = segment.replace(/[-_]/g, " ");
    // Capitalize if the option is enabled
    return capitalizeItems
      ? formatted.charAt(0).toUpperCase() + formatted.slice(1)
      : formatted;
  };

  // Build the breadcrumb path for each segment
  const getBreadcrumbPaths = () => {
    return displaySegments.map((segment, index) => {
      const path = `/${displaySegments.slice(0, index + 1).join("/")}`;
      return {
        label: formatSegment(segment),
        path,
        isLast: index === displaySegments.length - 1,
      };
    });
  };

  const breadcrumbPaths = getBreadcrumbPaths();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/" className="flex items-center gap-1">
              {showHomeIcon && <Home className="h-3.5 w-3.5" />}
              {homeLabel}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4" />
        </BreadcrumbSeparator>

        {/* Show ellipsis if segments were truncated */}
        {segments.length > maxItems && (
          <>
            <BreadcrumbItem>
              <span className="text-muted-foreground">...</span>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
          </>
        )}

        {breadcrumbPaths.map((item, index) => (
          <React.Fragment key={item.path}>
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.path}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>

            {!item.isLast && (
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
