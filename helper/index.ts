// category
export {
  createCategory,
  updateCategory,
  attachProductCategory,
  getCategories,
  getProductCategory,
  updateProductCategory,
  getCategoriesPagination,
  deleteCategory,
} from "./category/action";

// order
export {
  fetchOrders,
  fetchOrderDetails,
  changeOrderStatus,
  updateOrderStatus,
  createOrder,
} from "./order/action";

export {getAddresses} from "./user/action";

//cart
export {
  addToCart,
  removeFromCart,
  syncCartWithDatabase,
  updateCartItemQuantity,
  clearCart ,
} from "./cart/action";

//auth
export {
  signIn,
  signUp,
  refreshToken,
  verifyOtp,
  confirmForgotPassword,
  resendOtp,
  forgotPassword
} from "./auth/action"
export {createWishlist,getUserWishlist,removeItemFromWishlist,addWishlistItemToCart} from "./wishlist/action";

export {useFileUpload} from "./useFileUpload";

export {getProductSimilarProducts,getFullProduct} from "./product/action";