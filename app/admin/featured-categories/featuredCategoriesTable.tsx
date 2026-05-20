"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type FeaturedCategoryRow = {
  id: string;
  categoryId: string | null;
  createdAt: Date;
  categoryName: string | null;
  categorySlug: string | null;
  bannerImage: string | null;
  description: string | null;
};

interface Props {
  categories: FeaturedCategoryRow[];
  page: number;
  pageSize: number;
}

const FeaturedCategoriesTable = ({ categories, page, pageSize }: Props) => {
  const startIndex = (page - 1) * pageSize;

  return (
    <div className="mt-8 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.length > 0 ? (
            categories.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{startIndex + index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3 min-w-[220px]">
                    {item.bannerImage ? (
                      <img
                        src={item.bannerImage}
                        alt={item.categoryName ?? "Category"}
                        className="h-12 w-12 rounded-md object-cover border"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-md border bg-muted" />
                    )}
                    <span className="font-medium">{item.categoryName ?? "-"}</span>
                  </div>
                </TableCell>
                <TableCell>{item.categorySlug ?? "-"}</TableCell>
                <TableCell>
                  <p className="max-w-[520px] line-clamp-2 text-sm text-muted-foreground">
                    {item.description ?? "-"}
                  </p>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center text-gray-600">
                No featured categories found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default FeaturedCategoriesTable;
