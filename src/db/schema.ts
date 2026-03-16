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

export const order = pgTable("order", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  status: varchar("status").notNull().default("pending"),

  addressLine1: varchar("address_line_1"),
  addressLine2: varchar("address_line_2"),
  city: varchar("city"),
  state: varchar("state"),
  pincode: varchar("pincode"),
  latitude: varchar("latitude"),
  longitude: varchar("longitude"),

  totalAmountPaid: integer("total_amount_paid"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const orderItem = pgTable("order_item", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => order.id),
  productVarientId: uuid("product_varient_id").references(() => productVariant.id),
  quantity: integer("quantity"),
  productName: varchar("product_name").notNull(),
  productSlug: varchar("product_slug").notNull(),
  productImage: varchar("product_image"),
  productPrice: integer("product_price").notNull(),
  productSKU: varchar("product_sku"),
});

export const payment = pgTable("payment", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => order.id),
  paymentId: varchar("payment_id").notNull(),
  paymentStatus: varchar("payment_status"),
  paymentMethod: varchar("payment_method"),
  paymentAmount: integer("payment_amount"),
  paymentCurrency: varchar("payment_currency"),
  paymentDescription: varchar("payment_description"),
  paymentMetadata: varchar("payment_metadata"),
  paymentGatewayOrderId: varchar("payment_gateway_order_id"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const cart = pgTable("cart", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const cartItem = pgTable("cart_item", {
  id: uuid("id").primaryKey().defaultRandom(),
  cartId: uuid("cart_id").notNull().references(() => cart.id),
  productVariantId: uuid("product_variant_id").references(() => productVariant.id),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});