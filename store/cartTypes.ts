export type CartAttribute = {
  attribute: string; 
  value: string;    
};

export type CartItem = {
  productVariantId: string;
  sku?: string;
  slug: string;
  title: string;
  image: string;
  price: number;          
  originalPrice?: number; 
  quantity: number;

  addedAt: number;
};
