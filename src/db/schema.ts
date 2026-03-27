// import {
//   boolean,
//   pgTable,
//   timestamp,
//   uuid,
//   varchar,
//   text,
//   serial,
//   integer,
//   index,
//   primaryKey

// } from "drizzle-orm/pg-core";
// import {} from "drizzle-orm/pg-core";

// export const users = pgTable("users", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   name: text("name").notNull(),
//   email: text("email").notNull().unique(),
//   phone: varchar("phone", { length: 15 }).notNull(),
//   password: text("password").notNull(), // Will store hashed password
//   emailVerified: boolean("email_verified").default(false),
//   otp: varchar("otp", { length: 6 }),
//   otpExpiresAt: timestamp("otp_expires_at"),
//   createdAt: timestamp("created_at").defaultNow(),
//   updatedAt: timestamp("updated_at").defaultNow(),
// });


// export const admins = pgTable("admins", {
//   id: serial("id").primaryKey(),
//   fullName: text("full_name").notNull(),
//   email: text("email").notNull().unique(),
//   phone: text("phone").notNull(),
//   cognitoId: text("cognito_id"),
//   createdAt: timestamp("created_at").defaultNow()
// });

// export const blog = pgTable("blog", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   title: varchar("title"),
//   metaDescription: varchar("meta_description"),
//   blogCategory: varchar("blog_category"),
//   image: varchar("image"),
//   tags: varchar("tags").array(),
//   date: varchar("date"),
//   data: text("data"),
//   userImage: varchar("user_image"),
//   userName: varchar("user_name"),
//   slug: varchar("slug"),
//   isVisible: boolean("is_visible").default(true),
// });


// export const address = pgTable("address", {
//   id: serial("id").primaryKey(),

//   fullName: varchar("full_name"),
//   phone: varchar("phone"),
//   email: varchar("email"),

//   street: text("street"),
//   locality: varchar("locality"),
//   city: varchar("city"),
//   state: varchar("state"),
//   pincode: varchar("pincode"),
//   country: varchar("country"),

//   isDefault: boolean("is_default").default(false),

//   createdAt: timestamp("created_at").defaultNow(),
// });

// export const category: any = pgTable("categories", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   name: varchar("name").notNull(),
//   slug: varchar("slug").unique().notNull(),
//   bannerImage: varchar("banner_image"),
//   parentId: uuid("parent_id").references(() => category.id),
//   parentCount: integer("parent_count").notNull().default(0),
//   description: varchar("description"),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
//   updatedAt: timestamp("updated_at").notNull().defaultNow(),
// });


// export const product = pgTable(
//   "products",
//   {
//     id: uuid("id").primaryKey().defaultRandom(),
//     // timestamp
//     createdAt: timestamp("created_at").notNull().defaultNow(),
//     updatedAt: timestamp("updated_at").notNull().defaultNow(),
//   }
// );


// export const productVariant = pgTable("product_variant", {
//   // about product
//   id: uuid("id").primaryKey().defaultRandom(),
//   name: varchar("name"),
//   sku: varchar("sku").notNull().unique(),
//   productId: uuid("product_id").references(() => product.id),
//   description: varchar("description"),
//   shortDescription: varchar("short_description"),
//   basePrice: integer("base_price"),
//   strikethroughPrice: integer("strikethrough_price"),
//   slug: varchar("slug").unique().notNull(),
//   bannerImage: varchar("banner_image"),
//   isInStock: boolean("is_in_stock").notNull().default(true),
//   isReturnable: boolean("is_returnable").notNull().default(false),
//   isCancelable: boolean("is_cancelable").notNull().default(false),
//   isReplacement: boolean("is_replacement").notNull().default(false),
//   returnDays: integer("return_days").notNull().default(0),
//   replacementDays: integer("replacement_days").notNull().default(0),
//   rating: integer("rating").notNull().default(0),
//   reviewCount: integer("review_count").notNull().default(0),

//   //   all the filters
//   isFreeDelivery: boolean("is_free_delivery").notNull().default(false),
// // Naye attributes jo aapne soche hain
//   size: varchar("size"), // Example: "Medium (280mm)"
//   flowType: varchar("flow_type"), // Example: "Regular Flow"
//   // timestamp
//   createdAt: timestamp("created_at").notNull().defaultNow(),
//   updatedAt: timestamp("updated_at").notNull().defaultNow(),
// },
//   (table) => [
//     index("name_idx").on(table.name),
//     index("slug_idx").on(table.slug),
//   ]
// );

// export const productCategory = pgTable("product_category", {
//   productId: uuid("product_id").notNull().references(() => product.id),
//   categoryId: uuid("category_id").notNull().references(() => category.id),
// }, (table) => ({
//   pk: primaryKey({ columns: [table.productId, table.categoryId] }),
// }));

// export const productVarientMedia = pgTable("product_varient_media", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   productVarientId: uuid("product_varient_id").notNull().references(() => productVariant.id),
//   mediaType: varchar("media_type").notNull(),
//   mediaURL: varchar("media_url").notNull(),
// });

// export const productVarientAttribute = pgTable("product_varient_attribute", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   productVarientId: uuid("product_varient_id").notNull().references(() => productVariant.id),
//   attribute: varchar("attribute").notNull(),
//   value: varchar("value").notNull(),
// });

// export const featuredProductVarient = pgTable("featured_product_varient", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   productVarientId: uuid("product_varient_id").notNull().references(() => productVariant.id),
// });

// export const featuredCategory = pgTable("featured_category", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   categoryId: uuid("category_id").references(() => category.id),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
//   updatedAt: timestamp("updated_at").notNull().defaultNow(),
// });


// export const review = pgTable("reviews", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   userId: uuid("user_id").notNull().references(() => users.id),
//   productVarientId: uuid("product_varient_id").notNull().references(() => productVariant.id),
//   name: varchar("name"),
//   email: varchar("email"),
//   rating: integer("rating").notNull(),
//   message: varchar("message"),
//   isAdminApproved: boolean("is_admin_approved").notNull().default(false),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
// });

// export const reviewMedia = pgTable("review_media", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   reviewId: uuid("review_id").notNull().references(() => review.id),
//   mediaType: varchar("media_type").notNull(),
//   mediaURL: varchar("media_url"),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
// });

// export const order = pgTable("order", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   userId: uuid("user_id")
//     .notNull()
//     .references(() => users.id),
//   status: varchar("status").notNull().default("pending"),
//   subscriptionId: integer("subscription_id").references(() => subscriptionPlans.id),
//   addressLine1: varchar("address_line_1"),
//   addressLine2: varchar("address_line_2"),
//   city: varchar("city"),
//   state: varchar("state"),
//   pincode: varchar("pincode"),
//   latitude: varchar("latitude"),
//   longitude: varchar("longitude"),

//   totalAmountPaid: integer("total_amount_paid"),

//   createdAt: timestamp("created_at").notNull().defaultNow(),
//   updatedAt: timestamp("updated_at").notNull().defaultNow(),
// });

// export const orderItem = pgTable("order_item", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   orderId: uuid("order_id")
//     .notNull()
//     .references(() => order.id),
//   productVarientId: uuid("product_varient_id").references(() => productVariant.id),
//   quantity: integer("quantity"),
//   productName: varchar("product_name").notNull(),
//   productSlug: varchar("product_slug").notNull(),
//   productImage: varchar("product_image"),
//   productPrice: integer("product_price").notNull(),
//   productSKU: varchar("product_sku"),
// });

// export const payment = pgTable("payment", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   orderId: uuid("order_id")
//     .notNull()
//     .references(() => order.id),
//   paymentId: varchar("payment_id").notNull(),
//   paymentStatus: varchar("payment_status"),
//   paymentMethod: varchar("payment_method"),
//   paymentAmount: integer("payment_amount"),
//   paymentCurrency: varchar("payment_currency"),
//   paymentDescription: varchar("payment_description"),
//   paymentMetadata: varchar("payment_metadata"),
//   paymentGatewayOrderId: varchar("payment_gateway_order_id"),

//   createdAt: timestamp("created_at").notNull().defaultNow(),
//   updatedAt: timestamp("updated_at").notNull().defaultNow(),
// });

// export const cart = pgTable("cart", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   userId: uuid("user_id").notNull().references(() => users.id),
//    productId: uuid("product_id"),
//   subscriptionPlanId: integer("subscription_plan_id"),
//    quantity: integer("quantity").default(1),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
//   updatedAt: timestamp("updated_at").notNull().defaultNow(),
// });

// export const cartItem = pgTable("cart_item", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   cartId: uuid("cart_id").notNull().references(() => cart.id),
//   productVariantId: uuid("product_variant_id").references(() => productVariant.id),
//   quantity: integer("quantity").notNull().default(1),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
//   updatedAt: timestamp("updated_at").notNull().defaultNow(),
// });

// export const subscriptionPlans = pgTable("subscription_plans", {
//   id: serial("id").primaryKey(),
//   name: text("name").notNull(),
//   intervalMonths: integer("interval_months").notNull(),
//   price: integer("price").notNull()
// });

// export const subscriptions = pgTable("subscriptions", {
//   id: serial("id").primaryKey(),

//   userId: text("user_id").notNull(),

//   planId: integer("plan_id").notNull(),

//   startDate: timestamp("start_date").defaultNow(),

//   nextBillingDate: timestamp("next_billing_date").notNull(),

//   status: text("status").default("active")
// });




















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


// ================= USERS =================

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: varchar("phone", { length: 15 }).notNull(),
  password: text("password").notNull(),
  emailVerified: boolean("email_verified").default(false),
  otp: varchar("otp", { length: 6 }),
  otpExpiresAt: timestamp("otp_expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});


// ================= ADMINS =================

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  cognitoId: text("cognito_id"),
  createdAt: timestamp("created_at").defaultNow()
});


// ================= BLOG =================

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


// ================= ADDRESS =================

export const address = pgTable("address", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
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


// ================= CATEGORY =================

export const category = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  slug: varchar("slug").unique().notNull(),
  bannerImage: varchar("banner_image"),
  parentId: uuid("parent_id"),
  parentCount: integer("parent_count").default(0),
  description: varchar("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});


// ================= PRODUCT =================

export const product = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});


// ================= PRODUCT VARIANT =================

export const productVariant = pgTable(
  "product_variant",
  {
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
    highlights: varchar("highlights").array(),

    isInStock: boolean("is_in_stock").default(true),
    isReturnable: boolean("is_returnable").default(false),
    isCancelable: boolean("is_cancelable").default(false),
    isReplacement: boolean("is_replacement").default(false),

    returnDays: integer("return_days").default(0),
    replacementDays: integer("replacement_days").default(0),

    rating: integer("rating").default(0),
    reviewCount: integer("review_count").default(0),

    isFreeDelivery: boolean("is_free_delivery").default(false),

    size: varchar("size"),
    flowType: varchar("flow_type"),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("name_idx").on(table.name),
    index("slug_idx").on(table.slug),
  ]
);


// ================= PRODUCT CATEGORY =================

export const productCategory = pgTable(
  "product_category",
  {
    productId: uuid("product_id").notNull().references(() => product.id),
    categoryId: uuid("category_id").notNull().references(() => category.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.productId, table.categoryId] }),
  })
);


// ================= PRODUCT MEDIA =================

export const productVariantMedia = pgTable("product_variant_media", {
  id: uuid("id").primaryKey().defaultRandom(),
  productVariantId: uuid("product_variant_id").references(() => productVariant.id),
  mediaType: varchar("media_type"),
  mediaURL: varchar("media_url"),
});


// ================= PRODUCT ATTRIBUTE =================

export const productVariantAttribute = pgTable("product_variant_attribute", {
  id: uuid("id").primaryKey().defaultRandom(),
  productVariantId: uuid("product_variant_id").references(() => productVariant.id),
  attribute: varchar("attribute"),
  value: text("value"),
});


// ================= FEATURED PRODUCT =================

export const featuredProductVariant = pgTable("featured_product_variant", {
  id: uuid("id").primaryKey().defaultRandom(),
  productVariantId: uuid("product_variant_id").references(() => productVariant.id),
});


// ================= REVIEW =================

export const review = pgTable("reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  productVariantId: uuid("product_variant_id").references(() => productVariant.id),
  name: varchar("name"),
  email: varchar("email"),
  rating: integer("rating"),
  message: varchar("message"),
  isAdminApproved: boolean("is_admin_approved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});


// ================= REVIEW MEDIA =================

export const reviewMedia = pgTable("review_media", {
  id: uuid("id").primaryKey().defaultRandom(),
  reviewId: uuid("review_id").references(() => review.id),
  mediaType: varchar("media_type"),
  mediaURL: varchar("media_url"),
  createdAt: timestamp("created_at").defaultNow(),
});


// ================= SUBSCRIPTION PLANS =================

export const subscriptionPlans = pgTable("subscription_plans", {
  id: serial("id").primaryKey(),
  name: text("name"),
  intervalMonths: integer("interval_months"),
  price: integer("price")
});

export const productVariantSubscriptionPlan = pgTable(
  "product_variant_subscription_plan",
  {
    productVariantId: uuid("product_variant_id").notNull().references(() => productVariant.id),
    subscriptionPlanId: integer("subscription_plan_id").notNull().references(() => subscriptionPlans.id),
    discountPercentage: integer("discount_percentage").default(0),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.productVariantId, table.subscriptionPlanId] }),
  })
);

// ================= SUBSCRIPTIONS =================

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  planId: integer("plan_id").references(() => subscriptionPlans.id),
  startDate: timestamp("start_date").defaultNow(),
  nextBillingDate: timestamp("next_billing_date"),
  status: text("status").default("active")
});


// ================= CART =================

export const cart = pgTable("cart", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});


// ================= CART ITEMS =================

export const cartItem = pgTable("cart_item", {
  id: uuid("id").primaryKey().defaultRandom(),
  cartId: uuid("cart_id").references(() => cart.id),
  productVariantId: uuid("product_variant_id").references(() => productVariant.id),
  subscriptionPlanId: integer("subscription_plan_id").references(() => subscriptionPlans.id),
  quantity: integer("quantity").default(1),
  createdAt: timestamp("created_at").defaultNow(),
});

// ================= wishlist =================


export const wishlist = pgTable("wishlist", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});


// ================= wishlist ITEMS =================

export const wishlistItem = pgTable("wishlist_item", {
  id: uuid("id").primaryKey().defaultRandom(),
  wishlistId: uuid("wishlist_id").references(() => wishlist.id),
  productVariantId: uuid("product_variant_id").references(() => productVariant.id),
  createdAt: timestamp("created_at").defaultNow(),
});


// ================= ORDER =================

export const order = pgTable("order", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  status: varchar("status").default("pending"),

  subscriptionId: integer("subscription_id").references(() => subscriptions.id),

  addressLine1: varchar("address_line_1"),
  addressLine2: varchar("address_line_2"),
  city: varchar("city"),
  state: varchar("state"),
  pincode: varchar("pincode"),

  totalAmountPaid: integer("total_amount_paid"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});


// ================= ORDER ITEM =================

export const orderItem = pgTable("order_item", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id").references(() => order.id),
  productVariantId: uuid("product_variant_id").references(() => productVariant.id),

  quantity: integer("quantity"),

  productName: varchar("product_name"),
  productSlug: varchar("product_slug"),
  productImage: varchar("product_image"),
  productPrice: integer("product_price"),
  productSKU: varchar("product_sku"),
});


// ================= PAYMENT =================

export const payment = pgTable("payment", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id").references(() => order.id),

  paymentId: varchar("payment_id"),
  paymentStatus: varchar("payment_status"),
  paymentMethod: varchar("payment_method"),

  paymentAmount: integer("payment_amount"),
  paymentCurrency: varchar("payment_currency"),
  // paymentGatewayOrderId: varchar("payment_gateway_order_id"),
  createdAt: timestamp("created_at").defaultNow(),
});


// ================= SUBSCRIPTION PAYMENT =================

export const subscriptionPayment = pgTable("subscription_payment", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});