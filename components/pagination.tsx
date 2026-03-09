"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
}

function buildPageHref(pathname: string, searchParams: URLSearchParams, page: number) {
  const params = new URLSearchParams(searchParams.toString());

  if (page <= 1) {
    params.delete("page");
  } else {
    params.set("page", String(page));
  }

  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}

export default function ProductPagination({ currentPage, totalPages }: ProductPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const normalizedCurrentPage = Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1;
  const normalizedTotalPages = Number.isFinite(totalPages) && totalPages > 0 ? totalPages : 1;

  const prevPage = Math.max(1, normalizedCurrentPage - 1);
  const nextPage = Math.min(normalizedTotalPages, normalizedCurrentPage + 1);

  if (normalizedTotalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-4 flex items-center justify-between gap-3">
      <p className="text-sm text-muted-foreground">
        Page {normalizedCurrentPage} of {normalizedTotalPages}
      </p>

      <div className="flex items-center gap-2">
        <Button asChild variant="outline" size="sm" disabled={normalizedCurrentPage <= 1}>
          <Link
            href={buildPageHref(pathname, new URLSearchParams(searchParams.toString()), prevPage)}
            aria-disabled={normalizedCurrentPage <= 1}
            tabIndex={normalizedCurrentPage <= 1 ? -1 : undefined}
            className={normalizedCurrentPage <= 1 ? "pointer-events-none" : undefined}
          >
            Previous
          </Link>
        </Button>

        <Button asChild variant="outline" size="sm" disabled={normalizedCurrentPage >= normalizedTotalPages}>
          <Link
            href={buildPageHref(pathname, new URLSearchParams(searchParams.toString()), nextPage)}
            aria-disabled={normalizedCurrentPage >= normalizedTotalPages}
            tabIndex={normalizedCurrentPage >= normalizedTotalPages ? -1 : undefined}
            className={normalizedCurrentPage >= normalizedTotalPages ? "pointer-events-none" : undefined}
          >
            Next
          </Link>
        </Button>
      </div>
    </div>
  );
}
