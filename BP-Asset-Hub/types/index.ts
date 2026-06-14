// User Types
export interface User {
  id: string;
  email: string;
  username: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
  role: 'customer' | 'seller' | 'admin';
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  long_description: string;
  price: number;
  category: ProductCategory;
  tags: string[];
  thumbnail_url: string;
  images: string[];
  seller_id: string;
  seller?: User;
  downloads: number;
  rating: number;
  reviews_count: number;
  created_at: string;
  updated_at: string;
  featured: boolean;
  status: 'active' | 'inactive' | 'pending';
}

export type ProductCategory =
  | 'scripts'
  | 'vehicles'
  | 'maps'
  | 'ui-systems'
  | 'uniforms'
  | 'liveries'
  | 'models'
  | 'systems';

// Review Types
export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  user?: User;
  rating: number;
  title: string;
  content: string;
  helpful_count: number;
  created_at: string;
  updated_at: string;
}

// Order Types
export interface Order {
  id: string;
  user_id: string;
  product_id: string;
  product?: Product;
  amount: number;
  stripe_payment_id: string;
  status: 'completed' | 'failed' | 'pending';
  download_key: string;
  created_at: string;
  expires_at: string;
}

// Cart Types
export interface CartItem {
  product_id: string;
  product?: Product;
  quantity: number;
  added_at: string;
}

// Wishlist Types
export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  product?: Product;
  created_at: string;
}

// Analytics Types
export interface AnalyticsData {
  total_revenue: number;
  total_sales: number;
  total_customers: number;
  average_rating: number;
  top_products: Product[];
  sales_by_category: Record<ProductCategory, number>;
  monthly_revenue: { month: string; revenue: number }[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
