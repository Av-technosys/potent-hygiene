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

export type CancelRequestRow = {
  id: string;
  orderId: string;
  userId: string;
  userReason: string | null;
  adminReason: string | null;
  status: "pending" | "approved" | "rejected" | "refunded" | null;
  createdAt: Date;
  orderStatus: string | null;
  totalAmount: number | null;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
};

interface Props {
  requests: CancelRequestRow[];
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

function statusClass(status: CancelRequestRow["status"]) {
  if (status === "approved") return "bg-green-100 text-green-700";
  if (status === "rejected") return "bg-red-100 text-red-700";
  if (status === "refunded") return "bg-blue-100 text-blue-700";
  return "bg-orange-100 text-orange-700";
}

const CancelRequestsTable = ({ requests, page, pageSize }: Props) => {
  const startIndex = (page - 1) * pageSize;

  return (
    <div className="mt-8 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>User Reason</TableHead>
            <TableHead>Admin Reason</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {requests.length > 0 ? (
            requests.map((request, index) => (
              <TableRow key={request.id}>
                <TableCell>{startIndex + index + 1}</TableCell>
                <TableCell className="font-medium">{request.orderId}</TableCell>
                <TableCell>
                  <div className="min-w-[180px]">
                    <p className="font-medium">{request.customerName ?? "-"}</p>
                    <p className="text-xs text-muted-foreground">{request.customerEmail ?? "-"}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={statusClass(request.status)}>{request.status ?? "pending"}</Badge>
                </TableCell>
                <TableCell className="capitalize">{request.orderStatus ?? "-"}</TableCell>
                <TableCell>{formatAmount(request.totalAmount)}</TableCell>
                <TableCell>
                  <p className="max-w-[320px] line-clamp-3 text-sm text-muted-foreground">
                    {request.userReason ?? "-"}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="max-w-[320px] line-clamp-3 text-sm text-muted-foreground">
                    {request.adminReason ?? "-"}
                  </p>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center text-gray-600">
                No cancel requests found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CancelRequestsTable;
