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
  primaryKey,
  jsonb,
  pgEnum
} from "drizzle-orm/pg-core";

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


// ================= USERS =================

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: varchar("phone", { length: 15 }).notNull(),
  password: text("password").notNull(),
  emailVerified: boolean("email_verified").default(false),
  rewardOrderCoins: integer("reward_order_coins").default(0),
  referralCoins: integer("referral_coins").default(0),


  otp: varchar("otp", { length: 6 }),
  otpExpiresAt: timestamp("otp_expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const rewardCoinsHistory = pgTable("reward_coins_history", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  coins: integer("coins").notNull(),
  type: varchar("type"),
  orderId: uuid("order_id").references(() => order.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const referralCoinHistory = pgTable("referral_coin_history", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  coins: integer("coins").notNull(),
  type: varchar("type"),
  newUserName: varchar("new_user_name"),
  newUserId: uuid("new_user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
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


// ================= CATEGORY =================

export const category = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  slug: varchar("slug").unique().notNull(),
  bannerImage: varchar("banner_image"),
  description: varchar("description"),
  priority: integer("priority").default(1),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const productBrandEnum = pgEnum("product_brand", ["ovy", "loway"]);


// ================= PRODUCT =================

export const product = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  parentId: uuid("parent_id").references((): any => product.id),

  sku: varchar("sku").notNull().unique(),
  slug: varchar("slug").unique().notNull(),

  name: varchar("name"),
  description: varchar("description"),

  basePrice: integer("base_price"),
  strikethroughPrice: integer("strikethrough_price"),

  bannerImage: varchar("banner_image"),
  highlights: varchar("highlights").array(),
  brand: productBrandEnum("brand").default("ovy"),
  type: varchar("type"),

  hasVarientBox: boolean("has_variant_box").default(false),
  allowCycleSync: boolean("allow_cycle_sync").default(false),
  allowSubscription: boolean("allow_subscription").default(false),
  isMixBox: boolean("is_mix_box").default(false),
  minBoxQuintity: integer("min_box_quintity"),
  custimizeBoxInfo: text("custimize_box_info"),

  isInStock: boolean("is_in_stock").default(true),

  rateing5Star: integer("rateing_5_star").default(0),
  rateing4Star: integer("rateing_4_star").default(0),
  rateing3Star: integer("rateing_3_star").default(0),
  rateing2Star: integer("rateing_2_star").default(0),
  rateing1Star: integer("rateing_1_star").default(0),

  size: varchar("size").array(),
  flowType: varchar("flow_type").array(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
},
  (table) => [
    index("name_idx").on(table.name),
    index("slug_idx").on(table.slug),
  ]
);

export const productVarientBox = pgTable("product_varient_box", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id").references(() => product.id),
  name: varchar("name"),
  description: varchar("description"),
  image: varchar("image"),
});

// ============== Featured Product ===============

export const featuredProduct = pgTable("featured_product", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id").notNull().references(() => product.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const featuredCategory = pgTable("featured_category", {
  id: uuid("id").primaryKey().defaultRandom(),
  categoryId: uuid("category_id").references(() => category.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

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

// ================= PRODUCT FILTER =================

export const productFilter = pgTable("product_filter", {
  productId: uuid("product_id").references(() => product.id),
  filter: varchar("filter"),
},
  (table) => [
    primaryKey({ columns: [table.productId, table.filter] }),
    index("filter_idx").on(table.filter),
    index("product_id_idx").on(table.productId),
  ]
);


// ================= PRODUCT MEDIA =================

export const productMedia = pgTable("product_media", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id").references(() => product.id),
  mediaType: varchar("media_type"),
  mediaURL: varchar("media_url"),
});


// ================= PRODUCT ATTRIBUTE =================

export const productAttribute = pgTable("product_attribute", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id").references(() => product.id),
  attribute: varchar("attribute"),
  value: text("value"),
});


// ================= REVIEW =================

export const review = pgTable("reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  productId: uuid("product_id").references(() => product.id),
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

// ================= SUBSCRIPTIONS =================

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  startDate: timestamp("start_date").defaultNow(),
  endDate: timestamp("end_date"),
  frequencyInMonths: integer("frequency_in_months"),
  nextOrderDate: timestamp("next_order_date"),
  subscriptionType: varchar("subscription_type"),
  mixBoxRecipe: jsonb("mix_box_recipe"),
  cycleLength: integer("cycle_length"),
  periodLength: integer("period_length"),
  lastPeriodDate: timestamp("last_period_date"),
  nextPeriodDate: timestamp("next_period_date"),
  arrivalDate: timestamp("arrival_date"),
  chargeDate: timestamp("charge_date"),
  status: text("status").default("active"),
  orderId: uuid("order_id")
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
  cartId: uuid("cart_id").references(() => cart.id).notNull(),
  productId: uuid("product_id").references(() => product.id).notNull(),
  productVarientBox: uuid("product_varient_box_id").references(() => productVarientBox.id),
  isTypeSubscription: boolean("is_type_subscription").default(false),
  frequencyInMonths: integer("frequency_in_months"),
  clientCartItemId: uuid("client_cart_item_id"), //can be same for different varient for same product item added at a time which means a single cart item.
  quantity: integer("quantity").default(1),
  mixBoxRecipe: jsonb("mix_box_recipe"),
  mixBoxLQuantity: integer("mix_box_l_quantity"),
  mixBoxXLQuantity: integer("mix_box_xl_quantity"),
  mixBoxXLPlusQuantity: integer("mix_box_xl_plus_quantity"),
  totalPads: integer("total_pads"),
  boxCount: integer("box_count"),
  freeLiners: integer("free_liners"),
  purchaseType: varchar("purchase_type"),
  subscriptionType: varchar("subscription_type"),
  cycleLength: integer("cycle_length"),
  periodLength: integer("period_length"),
  lastPeriodDate: timestamp("last_period_date"),
  nextPeriodDate: timestamp("next_period_date"),
  arrivalDate: timestamp("arrival_date"),
  chargeDate: timestamp("charge_date"),
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
  productId: uuid("product_id").references(() => product.id),
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

  totalAmount: integer("total_amount"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});


// ================= ORDER ITEM =================

export const orderItem = pgTable("order_item", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id").references(() => order.id),
  productId: uuid("product_id").references(() => product.id),
  productVarientBox: varchar("product_varient_box"),
  quantity: integer("quantity"),
  mixBoxRecipe: jsonb("mix_box_recipe"),
  mixBoxLQuantity: integer("mix_box_l_quantity"),
  mixBoxXLQuantity: integer("mix_box_xl_quantity"),
  mixBoxXLPlusQuantity: integer("mix_box_xl_plus_quantity"),
  totalPads: integer("total_pads"),
  boxCount: integer("box_count"),
  freeLiners: integer("free_liners"),
  purchaseType: varchar("purchase_type"),
  subscriptionType: varchar("subscription_type"),

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
  paymentOrderId: varchar("payment_order_id"),
  paymentMeta: jsonb("payment_meta"),
  createdAt: timestamp("created_at").defaultNow(),
});


//================cancel req============

export const cancelRequest = pgTable("cancel_request", {

  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => order.id),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  userReason: text("user_reason"),
  adminReason: text("admin_reason"),
  status: cancelRequestStatusEnum("status").default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});


export const returnRequest = pgTable("return_request", {
  id: uuid("id").primaryKey().defaultRandom(),

  orderItemId: uuid("order_item_id")
    .notNull()
    .references(() => orderItem.id),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  reason: text("reason").notNull(),
  adminReason: text("admin_reason"),
  status: returnRequestStatusEnum("status").default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const returnRequestImage = pgTable("return_request_image", {
  id: uuid("id").primaryKey().defaultRandom(),
  returnRequestId: uuid("return_request_id")
    .notNull()
    .references(() => returnRequest.id, { onDelete: "cascade" }),
  imageUrl: varchar("image_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ================= SUBSCRIPTION PAYMENT =================

export const subscriptionPayment = pgTable("subscription_payment", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const paymentGatewayPlans = pgTable("payment_gateway_plans", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  price: integer("price").notNull(),
  descirption: varchar("descirption"),
  billingFrequency: varchar("billing_frequency").notNull(),
  planId: varchar("plan_id").notNull().unique(),
  frequencyType: varchar("frequency_type").notNull().default("monthly"),
});

export const paymentGatewaySubscription = pgTable("payment_gateway_subscription", {
  id: uuid("id").primaryKey().defaultRandom(),
  planId: varchar("plan_id").notNull().references(() => paymentGatewayPlans.planId),
  totalCount: integer("total_count"),
  remainingCount: integer("remaining_count"),
  quantity: integer("quantity"),
  customerNotify: boolean("customer_notify").default(false),
  startAt: timestamp("start_at"),
  expireBy: timestamp("expire_by"),
  shourURL: varchar("shour_url"),
  startDate: timestamp("start_date").defaultNow(),
});


// ================= Coupon =================

export const coupon = pgTable("coupon", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 20 }).notNull(),
  description: varchar("description", { length: 100 }),
  code: varchar("code", { length: 20 }).notNull().unique(),
  isDiscountPercentage: boolean("is_discount_percentage").notNull().default(false),
  discountPercentage: integer("discount_percentage"),
  discountFixedAmount: integer("discount_fixed_amount"),
  minimumOrderValue: integer("minimum_order_value").notNull().default(0),
  maximumDiscountAmount: integer("maximum_discount_amount").notNull().default(0),
  useOnce: boolean("use_once").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const couponTransaction = pgTable("coupon_transaction", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  couponId: uuid("coupon_id")
    .notNull()
    .references(() => coupon.id),
  code: varchar("code", { length: 20 }).notNull(),
  isDiscountPercentage: boolean("is_discount_percentage").notNull().default(false),
  discountPercentage: integer("discount_percentage"),
  discountFixedAmount: integer("discount_fixed_amount"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const contactUs = pgTable("contact_us", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name"),
  email: varchar("email"),
  number: varchar("number"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ================= PRODUCT FAQ =================

export const productFaq = pgTable("product_faq", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id")
    .references(() => product.id, { onDelete: "cascade" })
    .notNull(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});