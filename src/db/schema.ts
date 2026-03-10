import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
  text,
  serial,
  integer // Text import kiya bade content ke liye
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: varchar("phone", { length: 15 }).notNull(),
  password: text("password").notNull(), // Will store hashed password
  emailVerified: boolean("email_verified").default(false),
  otp: varchar("otp", { length: 6 }),
  otpExpiresAt: timestamp("otp_expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const blog = pgTable("blog", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title"),
  metaDescription: varchar("meta_description"),
  blogCategory: varchar("blog_category"),
  image: varchar("image"),
  tags: varchar("tags").array(),
  date: varchar("date"),

  // Blog Content - varchar ki jagah text use kiya taaki error na aaye
  data: text("data"), 
  userImage: varchar("user_image"),
  userName: varchar("user_name"),
  slug: varchar("slug"),
  isVisible: boolean("is_visible").default(true),
});