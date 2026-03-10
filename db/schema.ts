import { pgTable, serial, varchar, text, boolean } from "drizzle-orm/pg-core";

export const address = pgTable("address", {
  id: serial("id").primaryKey(),

  fullName: varchar("full_name"),
  phone: varchar("phone"),

  street: text("street"),
  locality: varchar("locality"),
  city: varchar("city"),
  state: varchar("state"),
  pincode: varchar("pincode"),
  country: varchar("country"),

  isDefault: boolean("is_default").default(false),
});