"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type FeaturedProductRow = {
  id: string;
  productId: string;
  createdAt: Date;
  productName: string | null;
  productSku: string | null;
  productSlug: string | null;
  bannerImage: string | null;
  basePrice: number | null;
  isInStock: boolean | null;
};

interface Props {
  products: FeaturedProductRow[];
  page: number;
  pageSize: number;
}

function formatAmount(amount: number | null) {
  if (amount === null || amount === undefined) return "-";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

const FeaturedProductsTable = ({ products, page, pageSize }: Props) => {
  const startIndex = (page - 1) * pageSize;

  return (
    <div className="mt-8 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.length > 0 ? (
            products.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{startIndex + index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3 min-w-[220px]">
                    {item.bannerImage ? (
                      <img
                        src={item.bannerImage}
                        alt={item.productName ?? "Product"}
                        className="h-12 w-12 rounded-md object-cover border"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-md border bg-muted" />
                    )}
                    <span className="font-medium">{item.productName ?? "-"}</span>
                  </div>
                </TableCell>
                <TableCell>{item.productSku ?? "-"}</TableCell>
                <TableCell>{item.productSlug ?? "-"}</TableCell>
                <TableCell>{formatAmount(item.basePrice)}</TableCell>
                <TableCell>
                  <Badge variant={item.isInStock ? "secondary" : "outline"}>
                    {item.isInStock ? "In stock" : "Out of stock"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-gray-600">
                No featured products found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default FeaturedProductsTable;
