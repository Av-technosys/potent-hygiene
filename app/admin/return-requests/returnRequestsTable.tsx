"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ImageIcon } from "lucide-react";

export type ReturnRequestRow = {
  id: string;
  orderItemId: string;
  userId: string;
  reason: string;
  adminReason: string | null;
  status: "pending" | "approved" | "rejected" | "refunded" | null;
  createdAt: Date;
  productName: string | null;
  productSku: string | null;
  productImage: string | null;
  productPrice: number | null;
  quantity: number | null;
  orderId: string | null;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  images: { id: string; imageUrl: string }[];
};

interface Props {
  requests: ReturnRequestRow[];
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

function statusClass(status: ReturnRequestRow["status"]) {
  if (status === "approved") return "bg-green-100 text-green-700";
  if (status === "rejected") return "bg-red-100 text-red-700";
  if (status === "refunded") return "bg-blue-100 text-blue-700";
  return "bg-orange-100 text-orange-700";
}

const ReturnRequestsTable = ({ requests, page, pageSize }: Props) => {
  const startIndex = (page - 1) * pageSize;

  return (
    <div className="mt-8 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Images</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {requests.length > 0 ? (
            requests.map((request, index) => (
              <TableRow key={request.id}>
                <TableCell>{startIndex + index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3 min-w-[240px]">
                    {request.productImage ? (
                      <img
                        src={request.productImage}
                        alt={request.productName ?? "Product"}
                        className="h-12 w-12 rounded-md object-cover border"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-md border bg-muted" />
                    )}
                    <div>
                      <p className="font-medium">{request.productName ?? "-"}</p>
                      <p className="text-xs text-muted-foreground">{request.productSku ?? "-"}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{request.orderId ?? "-"}</TableCell>
                <TableCell>
                  <div className="min-w-[180px]">
                    <p className="font-medium">{request.customerName ?? "-"}</p>
                    <p className="text-xs text-muted-foreground">{request.customerEmail ?? "-"}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={statusClass(request.status)}>{request.status ?? "pending"}</Badge>
                </TableCell>
                <TableCell>{formatAmount(request.productPrice)}</TableCell>
                <TableCell>
                  <p className="max-w-[320px] line-clamp-3 text-sm text-muted-foreground">
                    {request.reason}
                  </p>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={request.images.length === 0}
                        className="gap-2"
                      >
                        <ImageIcon className="h-4 w-4" />
                        {request.images.length}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Return Request Images</DialogTitle>
                        <DialogDescription>
                          Images uploaded for {request.productName ?? "this return request"}.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {request.images.map((image) => (
                          <a
                            key={image.id}
                            href={image.imageUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="block overflow-hidden rounded-md border bg-muted"
                          >
                            <img
                              src={image.imageUrl}
                              alt="Return request attachment"
                              className="h-48 w-full object-cover"
                            />
                          </a>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center text-gray-600">
                No return requests found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReturnRequestsTable;
