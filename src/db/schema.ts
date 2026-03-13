import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
  text,
  serial,
  integer,
  index,
  primaryKey
       
} from "drizzle-orm/pg-core";
import {} from "drizzle-orm/pg-core";

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


export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  cognitoId: text("cognito_id"),
  createdAt: timestamp("created_at").defaultNow()
});

export const blog = pgTable("blog", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title"),
  metaDescription: varchar("meta_description"),
  blogCategory: varchar("blog_category"),
  image: varchar("image"),
  tags: varchar("tags").array(),
  date: varchar("date"),
  data: text("data"),
  userImage: varchar("user_image"),
  userName: varchar("user_name"),
  slug: varchar("slug"),
  isVisible: boolean("is_visible").default(true),
});


export const address = pgTable("address", {
  id: serial("id").primaryKey(),

  fullName: varchar("full_name"),
  phone: varchar("phone"),
  email: varchar("email"),

  street: text("street"),
  locality: varchar("locality"),
  city: varchar("city"),
  state: varchar("state"),
  pincode: varchar("pincode"),
  country: varchar("country"),

  isDefault: boolean("is_default").default(false),

  createdAt: timestamp("created_at").defaultNow(),
});

export const category: any = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  slug: varchar("slug").unique().notNull(),
  bannerImage: varchar("banner_image"),
  parentId: uuid("parent_id").references(() => category.id),
  parentCount: integer("parent_count").notNull().default(0),
  description: varchar("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});


export const product = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    // timestamp
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  }
);


export const productVariant = pgTable("product_variant", {
  // about product
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name"),
  sku: varchar("sku").notNull().unique(),
  productId: uuid("product_id").references(() => product.id),
  description: varchar("description"),
  shortDescription: varchar("short_description"),
  basePrice: integer("base_price"),
  strikethroughPrice: integer("strikethrough_price"),
  slug: varchar("slug").unique().notNull(),
  bannerImage: varchar("banner_image"),
  isInStock: boolean("is_in_stock").notNull().default(true),
  isReturnable: boolean("is_returnable").notNull().default(false),
  isCancelable: boolean("is_cancelable").notNull().default(false),
  isReplacement: boolean("is_replacement").notNull().default(false),
  returnDays: integer("return_days").notNull().default(0),
  replacementDays: integer("replacement_days").notNull().default(0),
  rating: integer("rating").notNull().default(0),
  reviewCount: integer("review_count").notNull().default(0),

  //   all the filters
  isFreeDelivery: boolean("is_free_delivery").notNull().default(false),
// Naye attributes jo aapne soche hain
  size: varchar("size"), // Example: "Medium (280mm)"
  flowType: varchar("flow_type"), // Example: "Regular Flow"
  // timestamp
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
},
  (table) => [
    index("name_idx").on(table.name),
    index("slug_idx").on(table.slug),
  ]
);

export const productCategory = pgTable("product_category", {
  productId: uuid("product_id").notNull().references(() => product.id),
  categoryId: uuid("category_id").notNull().references(() => category.id),
}, (table) => ({
  pk: primaryKey({ columns: [table.productId, table.categoryId] }),
}));

export const productVarientMedia = pgTable("product_varient_media", {
  id: uuid("id").primaryKey().defaultRandom(),
  productVarientId: uuid("product_varient_id").notNull().references(() => productVariant.id),
  mediaType: varchar("media_type").notNull(),
  mediaURL: varchar("media_url").notNull(),
});

export const productVarientAttribute = pgTable("product_varient_attribute", {
  id: uuid("id").primaryKey().defaultRandom(),
  productVarientId: uuid("product_varient_id").notNull().references(() => productVariant.id),
  attribute: varchar("attribute").notNull(),
  value: varchar("value").notNull(),
});

export const featuredProductVarient = pgTable("featured_product_varient", {
  id: uuid("id").primaryKey().defaultRandom(),
  productVarientId: uuid("product_varient_id").notNull().references(() => productVariant.id),
});

export const featuredCategory = pgTable("featured_category", {
  id: uuid("id").primaryKey().defaultRandom(),
  categoryId: uuid("category_id").references(() => category.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});


export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),

  userId: integer("user_id").notNull(),

  productName: varchar("product_name", { length: 255 }).notNull(),

  orderId: varchar("order_id", { length: 100 }),

  rating: integer("rating").notNull(),

  comment: text("comment"),

  deliveredDate: varchar("delivered_date", { length: 100 }),

  createdAt: timestamp("created_at").defaultNow(),
});