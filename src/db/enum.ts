import { pgEnum } from "drizzle-orm/pg-core";


export const cancelRequestStatusEnum = pgEnum("cancel_request_status", [
  "pending",
  "approved",
  "rejected",
  "refunded",
]);

export const returnRequestStatusEnum = pgEnum("return_request_status", [
  "pending",
  "approved",
  "rejected",
  "refunded",
]);
